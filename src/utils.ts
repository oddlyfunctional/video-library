export const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / (60 * 60));
  const minutes = Math.floor((duration % (60 * 60)) / 60);
  const seconds = duration % 60;

  const parts = [];
  if (hours > 0) {
    parts.push(hours);
  }
  parts.push(minutes);
  parts.push(seconds);

  return parts.map((p) => String(p).padStart(2, "0")).join(":");
};

export const formatRelativeDate = (date: Date) => {
  const diffInSeconds = Math.floor((date.getTime() - Date.now()) / 1000);

  if (Math.abs(diffInSeconds) < 60) {
    return "just now";
  }

  const formatter = new Intl.RelativeTimeFormat("en", { style: "long" });

  let diff = Math.floor(diffInSeconds / 60);
  if (Math.abs(diff) < 60) {
    return formatter.format(diff, "minutes");
  }

  diff = Math.floor(diff / 60);
  if (Math.abs(diff) < 24) {
    return formatter.format(diff, "hours");
  }

  diff = Math.floor(diff / 24);
  if (Math.abs(diff) < 7) {
    return formatter.format(diff, "days");
  }

  if (Math.abs(diff) < 30) {
    return formatter.format(Math.floor(diff / 7), "weeks");
  }

  if (Math.abs(diff) < 365) {
    return formatter.format(Math.floor(diff / 30), "months");
  }

  return formatter.format(Math.floor(diff / 365), "years");
};

export const formatCount = (count: number) => {
  if (count < 1_000) {
    return String(count);
  }

  if (count < 1_000_000) {
    return Math.floor(count / 1_000) + "K";
  }

  return Math.floor(count / 1_000_000) + "M";
};
