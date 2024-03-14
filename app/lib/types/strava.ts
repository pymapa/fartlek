import { z } from "zod";
import { activitySchema, activitySummarySchema, polylineMapSchema, sportTypeSchema, statsSchema } from "../schemas/strava";

type SportType = z.infer<typeof sportTypeSchema>;

type ActivitySummary = z.infer<typeof activitySummarySchema>;

type ActivityDetails = z.infer<typeof activitySchema>;

type PolylineMap = z.infer<typeof polylineMapSchema>;

type Stats = z.infer<typeof statsSchema>;

export type { SportType, ActivitySummary, ActivityDetails, PolylineMap, Stats };