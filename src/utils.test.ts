import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { formatCount, formatDuration, formatRelativeDate } from "./utils.ts";

describe("formatDuration", () => {
  test("formats duration less than 1 minute", () => {
    const actual = formatDuration(60 - 1);
    expect(actual).toEqual("00:59");
  });

  test("formats duration less than 1 hour", () => {
    const actual = formatDuration(60 * 60 - 1);
    expect(actual).toEqual("59:59");
  });

  test("formats duration more than 1 hour", () => {
    const actual = formatDuration(60 * 60 + 1);
    expect(actual).toEqual("01:00:01");
  });
});

describe("formatRelativeDate", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  test("formats date less than 1 minute ago", () => {
    vi.setSystemTime(new Date("2025-01-01 00:00:59"));
    const actual = formatRelativeDate(new Date("2025-01-01 00:00:00"));
    expect(actual).toEqual("just now");
  });

  test("formats date less than 1 hour ago", () => {
    vi.setSystemTime(new Date("2025-01-01 00:59:00"));
    const actual = formatRelativeDate(new Date("2025-01-01 00:00:00"));
    expect(actual).toEqual("59 minutes ago");
  });

  test("formats date less than 1 day ago", () => {
    vi.setSystemTime(new Date("2025-01-01 23:00:00"));
    const actual = formatRelativeDate(new Date("2025-01-01 00:00:00"));
    expect(actual).toEqual("23 hours ago");
  });

  test("formats date less than 1 week ago", () => {
    vi.setSystemTime(new Date("2025-01-06 23:00:00"));
    const actual = formatRelativeDate(new Date("2025-01-01 00:00:00"));
    expect(actual).toEqual("6 days ago");
  });

  test("formats date less than 1 month ago", () => {
    vi.setSystemTime(new Date("2025-01-29 00:00:00"));
    const actual = formatRelativeDate(new Date("2025-01-01 00:00:00"));
    expect(actual).toEqual("4 weeks ago");
  });

  test("formats date less than 1 year ago", () => {
    vi.setSystemTime(new Date("2025-12-01 00:00:00"));
    const actual = formatRelativeDate(new Date("2025-01-01 00:00:00"));
    expect(actual).toEqual("12 months ago");
  });

  test("formats date more than 1 year ago", () => {
    vi.setSystemTime(new Date("2026-12-01 00:00:00"));
    const actual = formatRelativeDate(new Date("2025-01-01 00:00:00"));
    expect(actual).toEqual("2 years ago");
  });
});

describe("formatCount", () => {
  test("formats number smaller than a thousand", () => {
    const actual = formatCount(999);
    expect(actual).toEqual("999");
  });

  test("formats number smaller than a million", () => {
    const actual = formatCount(999_999);
    expect(actual).toEqual("999K");
  });

  test("formats number larger than a million", () => {
    const actual = formatCount(2_999_999);
    expect(actual).toEqual("2M");
  });
});
