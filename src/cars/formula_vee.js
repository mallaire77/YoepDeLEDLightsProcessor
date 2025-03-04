import { downsizeRPMSegmentsContainer } from './common.js'

// {
//   "CarModel": "Formula Vee",
//   "LedContainers": [
//     {
//       "BlinkDelay": 125,
//       "Segments": [
//         "1;81.081;Red;1;Blue",
//         "1;83.784;Red;1;Blue",
//         "1;86.486;Red;1;Blue",
//         "1;89.189;Red;1;Blue",
//         "1;91.892;Red;1;Blue"
//       ],
//       "SegmentsCount": 5,
//       "BlinkEnabled": false,
//       "RpmMode": 0,
//       "RelativeToRedline": false,
//       "BlinkOnLastGear": false,
//       "StartPosition": 4,
//       "ContainerType": "RPMSegments",
//       "Description": "Show leds solid color segments based on car RPMs"
//     }
//   ],
//   "StartPosition": 4,
//   "ContainerType": "Groups.GameCarModelGroup",
//   "Description": "Formula Vee"
// }
export const formulaVee = (numLeds) => (car) => {
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

  return {
    ...processContainers(car),
    StartPosition: 1
  }
}