import { downsizeRPMSegmentsContainer, downsizeAnimationContainer } from '../common.js'

export default (numLeds) => (car) => {
  const processContainers = (container) => {
    const result = { ...container }

    if (result.LedContainers) {
      result.LedContainers = result.LedContainers.map(processContainers)
    }

    switch (result.ContainerType) {
      case "RPMSegments":
        return downsizeRPMSegmentsContainer(result, numLeds)

      case "Animation":
        return downsizeAnimationContainer(result, numLeds)

      case "CustomStatus":
      case "StaticColor":
      case "Status.SpeedLimiter":
        if (
          result.EnabledFormula && result.EnabledFormula.Expression === "isnull([GameRawData.Telemetry.OilPress],0)<1.6" ||
          result.EnabledFormula && result.EnabledFormula.Expression === "if(isnull([DataCorePlugin.Computed.Fuel_Percent],0)<0.75961538,\r\n\r\nif(isnull([YoepGt.HideFuelWarning],0)=true,false,true)\r\n\r\n,false)"
        ) {
          return {
            ...result,
            StartPosition: 1,
            LedCount: Math.min(numLeds, 2)
          }
        } else if (parseInt(container.LedCount, 10) <= numLeds) {
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