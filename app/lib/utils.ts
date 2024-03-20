import { SportType } from "./types/strava";

// Speed utils
export const metersPerSecondToKmPerHour = (metersPerSecond: number) => {
  return (metersPerSecond * 3.6).toFixed(1);
};

export const metersPerSecondToMinPerKm = (metersPerSecond: number) => {
  const value = 1000 / 60 / metersPerSecond;
  const minutes = Math.floor(value);
  const seconds = Math.round((value - minutes) * 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export const formatSpeed = (metersPerSecond: number, sportType: SportType, showUnits?: boolean) => {
  if (sportType === "Run") {
    return metersPerSecondToMinPerKm(metersPerSecond) + (showUnits ? " min/km" : "");
  }
  return metersPerSecondToKmPerHour(metersPerSecond) + (showUnits ? " km/h" : "");
}

// Distance utils
export const metersToKilometers = (meters: number) => {
  return (meters / 1000).toFixed(1);
};

// Time utils
export const formatSeconds = (seconds: number) => {
  const date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().substring(11, 19);
};
