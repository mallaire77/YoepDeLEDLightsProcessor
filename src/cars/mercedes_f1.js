import { downsizeRPMSegmentsContainer, downsizeAnimationContainer } from '../common.js'

export default (numLeds) => (car) => {
  const drsLeds = numLeds < 14 ? 2 : 4
  const actualNumLeds = numLeds < drsLeds ? numLeds : numLeds - drsLeds

  const processContainers = (container) => {
    const result = { ...container }

    if (result.LedContainers) {
      result.LedContainers = result.LedContainers.map(processContainers)
    }

    switch (result.ContainerType) {
      case "RPMSegments":
        return downsizeRPMSegmentsContainer(result, actualNumLeds, drsLeds + 1)

      case "Animation":
        return downsizeAnimationContainer(result, numLeds)

      case "Groups.GameCarSpeedLimiterGroup":
        return {
          ...result,
          StartPosition: 1,
        }

      case "CustomStatus":
        return {
          ...result,
          StartPosition: 1,
          LedCount: 1
        }

      case "Status.DrsAvailable":
        return {
          ...result,
          StartPosition: 1,
          LedCount: drsLeds - (drsLeds == 4 ? 2 : 1)
        }

      case "Status.DrsOn":
        return {
          ...result,
          StartPosition: 1,
          LedCount: drsLeds
        }

      default:
        return result
    }
  }

  return processContainers(car)
}