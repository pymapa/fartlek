import { z } from "zod";
import { activitySchema, activitySummarySchema, polylineMapSchema, sportTypeSchema } from "../schemas/strava";

type SportType = z.infer<typeof sportTypeSchema>;

type ActivitySummary = z.infer<typeof activitySummarySchema>;

type ActivityDetails = z.infer<typeof activitySchema>;

type PolylineMap = z.infer<typeof polylineMapSchema>;

export type { SportType, ActivitySummary, ActivityDetails, PolylineMap };