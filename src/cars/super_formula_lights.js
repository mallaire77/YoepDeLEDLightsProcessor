import { downsizeRPMSegmentsContainer } from './common.js'

// {
//   "CarModel": "Super Formula Lights 324",
//   "LedContainers": [
//     {
//       "BlinkDelay": 250,
//       "Segments": [
//         "1;84.932;#FF0000;0;",
//         "1;86.301;#FF0000;0;",
//         "1;87.671;#FF0000;0;",
//         "2;89.041;#FF0000;0;",
//         "1;90.411;Red;0;",
//         "1;91.781;Red;0;",
//         "1;93.151;#FF0000;0;",
//         "1;94.521;#FF0000;0;"
//       ],
//       "SegmentsCount": 8,
//       "BlinkEnabled": false,
//       "RpmMode": 0,
//       "RelativeToRedline": false,
//       "BlinkOnLastGear": true,
//       "StartPosition": 5,
//       "ContainerType": "RPMSegments",
//       "Description": "Show leds solid color segments based on car RPMs"
//     }
//   ],
//   "ContainerType": "Groups.GameCarModelGroup",
//   "Description": "Dallara 324 - Super Formula Lights copy"
// }
export const superFormulaLights = (numLeds) => (car) => {
  const processContainers = (container) => {
    const result = { ...container }

    if (result.LedContainers) {
      result.LedContainers = result.LedContainers.map(processContainers)
    }

    switch (result.ContainerType) {
      case "RPMSegments":
        return downsizeRPMSegmentsContainer(result, numLeds)

      default:
        return result
    }
  }

  return processContainers(car)
}
