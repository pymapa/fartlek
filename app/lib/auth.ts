import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { NextAuthOptions, getServerSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { OAuthUserConfig } from "next-auth/providers/oauth";
import Strava, { StravaProfile } from "next-auth/providers/strava";
import strava, { RefreshTokenResponse } from "strava-v3";
import logger from "../../logger";

const stravaScope = process.env.STRAVA_SCOPE as string;

const stravaOptions: OAuthUserConfig<StravaProfile> = {
  clientId: process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID as string,
  clientSecret: process.env.STRAVA_CLIENT_SECRET as string,
  authorization: { params: { scope: stravaScope } },
};

const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  logger.debug("Refreshing access token");
  strava.config({
    access_token: token.accessToken as string,
    client_id: process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID as string,
    client_secret: process.env.STRAVA_CLIENT_SECRET as string,
    redirect_uri: ""
  });

  let refreshedToken: RefreshTokenResponse;
  try {
    refreshedToken = await strava.oauth.refreshToken(token.refreshToken as string);
  } catch (error) {
    logger.error("Failed to refresh access token");
    logger.debug(error);
    return token;
  }

  return {
    ...token,
    accessToken: refreshedToken.access_token,
    refreshToken: refreshedToken.refresh_token,
    accessTokenExpires: refreshedToken.expires_at,
  };
}

const callBacks: NextAuthOptions["callbacks"] = {
  jwt: async ({ token, user, account }) => {
  logger.debug("JWT callback");
    if (account && user) {
      token.accessToken = account.access_token;
      token.refreshToken = account.refresh_token;
      if (account.expires_at) {
        token.accessTokenExpires = account.expires_at;
      }
    }
    const nowInSeconds = Math.floor(Date.now() / 1000);
    const istTokenExpired = token.accessToken && token.accessTokenExpires && nowInSeconds > token.accessTokenExpires;

    if (istTokenExpired) {
      return await refreshAccessToken(token);
    }

    return token;
  },
  session: async ({ session, token }) => {
    logger.debug("Session callback");
    session.accessToken = token.accessToken;
    return session;
  },
};

const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [Strava(stravaOptions)],
  callbacks: callBacks,
};

const auth = (
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) => {
  return getServerSession(...args, authOptions);
};

const getAccessToken = async (): Promise<string> => {
  const session = await auth();
  if (!session || !session.accessToken) {
    logger.error("Access token not found");
    throw new Error("Access token not found");
  }
  return session?.accessToken;
}

export { authOptions, auth, getAccessToken };
