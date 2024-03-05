type MetaAthlete = {
  id: number;
};

type PolylineMap = {
  id: string;
  polyline: string;
  summary_polyline: string;
};

export type SportType =
  | 'AlpineSki'
  | 'BackcountrySki'
  | 'Badminton'
  | 'Canoeing'
  | 'Crossfit'
  | 'EBikeRide'
  | 'Elliptical'
  | 'EMountainBikeRide'
  | 'Golf'
  | 'GravelRide'
  | 'Handcycle'
  | 'HighIntensityIntervalTraining'
  | 'Hike'
  | 'IceSkate'
  | 'InlineSkate'
  | 'Kayaking'
  | 'Kitesurf'
  | 'MountainBikeRide'
  | 'NordicSki'
  | 'Pickleball'
  | 'Pilates'
  | 'Racquetball'
  | 'Ride'
  | 'RockClimbing'
  | 'RollerSki'
  | 'Rowing'
  | 'Run'
  | 'Sail'
  | 'Skateboard'
  | 'Snowboard'
  | 'Snowshoe'
  | 'Soccer'
  | 'Squash'
  | 'StairStepper'
  | 'StandUpPaddling'
  | 'Surfing'
  | 'Swim'
  | 'TableTennis'
  | 'Tennis'
  | 'TrailRun'
  | 'Velomobile'
  | 'VirtualRide'
  | 'VirtualRow'
  | 'VirtualRun'
  | 'Walk'
  | 'WeightTraining'
  | 'Wheelchair'
  | 'Windsurf'
  | 'Workout'
  | 'Yoga';

export type ActivitySummary = {
  id: number;
  external_id: string;
  upload_id: number;
  athlete: MetaAthlete;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  elev_high: number;
  elev_low: number;
  sport_type: SportType;
  start_date: string;
  start_date_local: string;
  timezone: string;
  start_latlng: Array<number>;
  end_latlng: Array<number>;
  achievement_count: number;
  kudos_count: number;
  comment_count: number;
  athlete_count: number;
  photo_count: number;
  total_photo_count: number;
  map: PolylineMap;
  trainer: boolean;
  commute: boolean;
  manual: boolean;
  private: boolean;
  flagged: boolean;
  workout_type: number;
  upload_id_str: string;
  average_speed: number;
  max_speed: number;
  has_kudoed: boolean;
  hide_from_home: boolean;
  gear_id: string;
  kilojoules: number;
  average_watts: number;
  device_watts: boolean;
  max_watts: number;
  weighted_average_watts: number;
};
