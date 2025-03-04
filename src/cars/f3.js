import { downsizeRPMSegmentsContainer } from './common.js'

// {
//   "CarModel": "Dallara F312 F3",
//   "LedContainers": [
//     {
//       "BlinkDelay": 250,
//       "Segments": [
//         "1;87.755;#FF0000;0;",
//         "1;89.116;#FF0000;0;",
//         "1;90.476;#FF0000;0;",
//         "2;91.837;#FF0000;0;",
//         "1;93.197;Red;0;",
//         "1;94.558;Red;0;",
//         "1;95.918;#FF0000;0;",
//         "1;97.279;#FF0000;0;"
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
//   "Description": "Dallara F312 F3"
// }
export const f3 = (numLeds) => (car) => {
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
