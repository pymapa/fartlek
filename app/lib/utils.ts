// Speed utils
export const metersPerSecondToKmPerHour = (metersPerSecond: number) => {
  return (metersPerSecond * 3.6).toFixed(1);
}

// Distance utils
export const metersToKilometers = (meters: number) => {
  return (meters / 1000).toFixed(1);
}