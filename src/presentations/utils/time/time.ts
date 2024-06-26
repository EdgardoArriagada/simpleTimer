export const formatSecondsToClock = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes < 10 && remainingSeconds < 10) {
    return `0${minutes}:0${remainingSeconds}`;
  }

  if (minutes < 10) {
    return `0${minutes}:${remainingSeconds}`;
  }

  return `${minutes}:${remainingSeconds}`;
};
