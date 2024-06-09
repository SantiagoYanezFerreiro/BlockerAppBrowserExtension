export const calculateRemainingTime = (lockValue) => {
  const lockEndTime = new Date(lockValue);
  const currentTime = new Date();
  const timeDifference = lockEndTime - currentTime;

  if (timeDifference <= 0) {
    return "Block has ended";
  }

  const minutes = Math.floor(timeDifference / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""} remaining`;
  }
  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} remaining`;
  }
  if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} remaining`;
  }
  return `${minutes} minute${minutes > 1 ? "s" : ""} remaining`;
};
