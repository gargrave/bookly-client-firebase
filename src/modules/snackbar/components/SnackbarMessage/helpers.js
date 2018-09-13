// @flow

// clamp between MIN/MAX duration, with DEFAULT_DURATION as fallback
export const calculateDuration = (duration?: number): number => {
  const DEFAULT_DURATION = 3250
  const MAX_DURATION = 10000
  const MIN_DURATION = 1000

  return Math.max(
    MIN_DURATION,
    Math.min(duration || DEFAULT_DURATION, MAX_DURATION),
  )
}
