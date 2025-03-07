import { downsizeRPMSegmentsContainer, downsizeAnimationContainer } from '../common.js'

export const downsizeCar = (numLeds, debug = false) => (car) => {
  const processContainers = (container) => {
    const result = { ...container }

    if (result.LedContainers) {
      result.LedContainers = result.LedContainers.map(processContainers)
    }

    switch (result.ContainerType) {
      case "RPMSegments":
        return downsizeRPMSegmentsContainer(result, numLeds, 1, debug)

      case "Animation":
        return downsizeAnimationContainer(result, numLeds, 1, false, debug)

      case "CustomStatus":
      case "StaticColor":
      case "Status.SpeedLimiter":
      case "Status.SpeedLimiterAnimation":
        if (parseInt(container.LedCount, 10) <= numLeds) {
          return {
            ...result,
            StartPosition: 1 + Math.round((numLeds - parseInt(container.LedCount, 10)) / 2),
            LedCount: parseInt(container.LedCount, 10)
          }
        } else {
          return {
            ...result,
            StartPosition: 1,
            LedCount: numLeds
          }
        }

      default:
        return result
    }
  }

  return processContainers(car)
}