import { downsizeAnimationContainer } from '../common.js'

export const downsizeModule = (numLeds, reverse = false, debug = false) => (container) => {
  const processContainers = (container) => {
    const result = { ...container }

    if (result.LedContainers) {
      result.LedContainers = result.LedContainers.map(processContainers)
    }

    switch (result.ContainerType) {
      case "Animation":
        return downsizeAnimationContainer(result, numLeds, 1, reverse, debug)

      case "CustomStatus":
      case "StaticColor":
      case "Flags.GreenFlag":
      case "Flags.YellowFlag":
      case "Flags.RedFlag":
      case "Flags.BlueFlag":
      case "Status.SpeedLimiter":
      case "Status.SpeedLimiterAnimation":
      case "Groups.GameCarSpeedLimiterGroup": {
        // Default values if not defined
        const originalStart = result.StartPosition || 1
        const originalCount = result.LedCount || 1

        if (reverse) {
          // When reversing, we flip the start position
          result.StartPosition = numLeds - originalStart - originalCount + 2
        }

        result.StartPosition = Math.max(1, Math.min(numLeds, result.StartPosition))
        result.LedCount = Math.min(originalCount, numLeds - result.StartPosition + 1)
        return result
      }
      default:
        return result
    }
  }

  return processContainers(container)
}