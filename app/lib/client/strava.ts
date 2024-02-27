import strava, { AthleteResponse, DetailedActivityResponse } from "strava-v3";
import { ActivitySummary } from "../types/strava";

export type StravaQueryArgs = {
  before?: number;
  after?: number;
  page?: number;
  per_page?: number;
};

const getAthlete = async (accessToken: string): Promise<AthleteResponse> => {
  const athlete = await strava.athlete.get({ access_token: accessToken }) as AthleteResponse;
  return athlete;
};

const getActivities = async (accessToken: string, args: StravaQueryArgs): Promise<Array<ActivitySummary>> => {
  return strava.athlete.listActivities({ access_token: accessToken, ...args });
}

export { getAthlete, getActivities};
