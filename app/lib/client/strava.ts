import strava, { AthleteResponse, DetailedActivityResponse } from "strava-v3";
import { ActivityDetails, ActivitySummary, Stats } from "../types/strava";
import logger from "@/logger";
import { activitySchema, getActivitiesResponseSchema, statsSchema } from "../schemas/strava";

export type StravaQueryArgs = {
  before?: number;
  after?: number;
  page?: number;
  per_page?: number;
};

const getAthlete = async (accessToken: string): Promise<AthleteResponse> => {
  logger.info(`Fetching athlete data for user`);
  const athlete = (await strava.athlete.get({
    access_token: accessToken,
  })) as AthleteResponse;
  return athlete;
};

const getActivities = async (
  accessToken: string,
  args?: StravaQueryArgs
): Promise<ActivitySummary[]> => {
  logger.info(`Fetching activities for user`);
  const activities = (await strava.athlete.listActivities({
    access_token: accessToken,
    ...args,
  }));
  const validatedActivities = getActivitiesResponseSchema.safeParse(activities);
  if (!validatedActivities.success) {
    throw new Error(`Failed to validate activities response: ${validatedActivities.error}`);
  }
  return validatedActivities.data;
};

const getStats = async (athleteId: string, accessToken: string): Promise<Stats> => {
  logger.info(`Fetching athlete stats for user`);
  const stats = await strava.athletes.stats({ id: athleteId, access_token: accessToken});
  const validatedStats = statsSchema.safeParse(stats);
  if (!validatedStats.success) {
    throw new Error(`Failed to validate stats response: ${validatedStats.error}`);
  }
  return validatedStats.data;
}

const getActivity = async (
  accessToken: string,
  id: number
): Promise<ActivityDetails> => {
  logger.info(`Fetching activity for user`);
  const activity = await strava.activities.get({ id, access_token: accessToken });
  const validatedActivity = activitySchema.safeParse(activity);
  if (!validatedActivity.success) {
    throw new Error(`Failed to validate activity response: ${validatedActivity.error}`);
  }

  return validatedActivity.data;
}


export { getAthlete, getActivities, getActivity, getStats };
