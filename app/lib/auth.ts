import { NextAuthOptions } from "next-auth";
import { OAuthUserConfig } from "next-auth/providers/oauth";
import Strava, { StravaProfile } from "next-auth/providers/strava";

const stravaOptions: OAuthUserConfig<StravaProfile> = {
  clientId: process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID as string,
  clientSecret: process.env.STRAVA_CLIENT_SECRET as string,
  authorization: { params: { scope: "read,activity:read,activity:read_all" } },
};

export const authOptions: NextAuthOptions = {
  // Customize authentication pages
  pages: {
    signIn: "/login", // Redirect users to "/login" when signing in
  },
  // Configure session management
  session: {
    strategy: "jwt", // Use JSON Web Tokens (JWT) for session management
  },
  // added secret key
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [Strava(stravaOptions)],
};
