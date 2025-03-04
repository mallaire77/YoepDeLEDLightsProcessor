import { downsizeRPMSegmentsContainer } from './common.js'

// {
//   "CarModel": "Toyota GR86",
//   "LedContainers": [
//     {
//       "BlinkDelay": 125,
//       "Segments": [
//         "1;80;Lime;0;",
//         "1;86;Yellow;0;",
//         "1;89.333;#FFA500;0;",
//         "3;92.667;Red;0;",
//         "1;89.333;#FFA500;1;Blue",
//         "1;86;#FFFF00;1;Blue",
//         "1;80;#00FF00;1;Blue"
//       ],
//       "SegmentsCount": 7,
//       "BlinkEnabled": false,
//       "RpmMode": 0,
//       "RelativeToRedline": false,
//       "BlinkOnLastGear": false,
//       "StartPosition": 5,
//       "ContainerType": "RPMSegments"
//     },
//     {
//       "EnabledFormula": {
//         "Expression": "isnull([Rpms],0) >= '7250'"
//       },
//       "BlinkFormula": {
//         "Expression": ""
//       },
//       "IdleColor": "Transparent",
//       "IdleBlinkingColor": "Transparent",
//       "EnableIdleBlinking": false,
//       "LedCount": 9,
//       "Color": "CornflowerBlue",
//       "BlinkingColor": "Transparent",
//       "BlinkEnabled": false,
//       "StartPosition": 5,
//       "ContainerType": "CustomStatus",
//       "Description": "REDLINE 7250"
//     }
//   ],
//   "ContainerType": "Groups.GameCarModelGroup",
//   "Description": "Toyota GR86"
// }
export const gr86 = (numLeds) => (car) => {
  const processContainers = (container) => {
    const result = { ...container }

    if (result.LedContainers) {
      result.LedContainers = result.LedContainers.map(processContainers)
    }

    switch (result.ContainerType) {
      case "RPMSegments":
        return downsizeRPMSegmentsContainer(result, numLeds)

      case "CustomStatus":
        if (container.LedCount <= numLeds) {
          return {
            ...result,
            StartPosition: Math.round((numLeds - container.LedCount) / 2),
            LedCount: numLeds
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