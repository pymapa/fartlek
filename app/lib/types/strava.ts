import { z } from "zod";
import { activitySummarySchema, sportTypeSchema } from "../schemas/strava";

type SportType = z.infer<typeof sportTypeSchema>;

type ActivitySummary = z.infer<typeof activitySummarySchema>;

export type { SportType, ActivitySummary };