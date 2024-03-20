import { z } from "zod";
import { activitySchema, activitySummarySchema, lapSchema, polylineMapSchema, sportTypeSchema, statsSchema } from "../schemas/strava";

type SportType = z.infer<typeof sportTypeSchema>;

type ActivitySummary = z.infer<typeof activitySummarySchema>;

type ActivityDetails = z.infer<typeof activitySchema>;

type PolylineMap = z.infer<typeof polylineMapSchema>;

type Stats = z.infer<typeof statsSchema>;

type Lap = z.infer<typeof lapSchema>;

export type { SportType, ActivitySummary, ActivityDetails, PolylineMap, Stats, Lap };