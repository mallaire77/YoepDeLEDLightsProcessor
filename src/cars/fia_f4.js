import { downsizeRPMSegmentsContainer } from './common.js'

// {
//   "CarModel": "FIA F4",
//     "LedContainers": [
//       {
//         "BlinkDelay": 125,
//         "Segments": [
//           "1;86.301;Lime;1;Black",
//           "1;89.041;Lime;1;Black",
//           "2;90.411;Lime;1;Lime",
//           "1;91.781;Lime;1;Lime",
//           "1;93.151;Red;1;Red",
//           "1;94.521;Red;1;Red"
//         ],
//         "SegmentsCount": 6,
//         "BlinkEnabled": false,
//         "RpmMode": 0,
//         "RelativeToRedline": false,
//         "BlinkOnLastGear": false,
//         "StartPosition": 6,
//         "ContainerType": "RPMSegments",
//         "Description": "Show leds solid color segments based on car RPMs"
//       },
//       {
//         "EnabledFormula": {
//           "Expression": "if([Rpms]>=7000,true,false)"
//         },
//         "BlinkFormula": {
//           "Expression": ""
//         },
//         "IdleColor": "Transparent",
//         "IdleBlinkingColor": "Transparent",
//         "EnableIdleBlinking": false,
//         "LedCount": 7,
//         "Color": "Black",
//         "BlinkingColor": "Transparent",
//         "BlinkEnabled": true,
//         "BlinkDelay": 170,
//         "StartPosition": 6,
//         "ContainerType": "CustomStatus",
//         "Description": "redline"
//       }
//     ],
//     "ContainerType": "Groups.GameCarModelGroup",
//     "Description": "FIA F4"
// }
export const fiaF4 = (numLeds) => (car) => {
  const processContainers = (container) => {
    const result = { ...container }

    if (result.LedContainers) {
      result.LedContainers = result.LedContainers.map(processContainers)
    }

    switch (result.ContainerType) {
      case "RPMSegments":
        return downsizeRPMSegmentsContainer(result, numLeds)

      case "CustomStatus":
        return {
          ...result,
          StartPosition: 1,
          LedCount: numLeds
        }

      default:
        return result
    }
  }

  return processContainers(car)
}