import { downsizeRPMSegmentsContainer } from './common.js'

// {
//   "CarModel": "Ray Formula 1600",
//   "LedContainers": [
//     {
//       "TriggerFormula": {
//         "Expression": "if(isnull([GameRawData.Telemetry.Voltage],0)=0,false,true)"
//       },
//       "LedContainers": [
//         {
//           "BlinkDelay": 250,
//           "Segments": [
//             "1;60.811;Lime;0;",
//             "1;74.324;Lime;0;",
//             "1;81.081;Yellow;0;",
//             "1;87.838;Red;0;",
//             "1;91.216;Cyan;0;"
//           ],
//           "SegmentsCount": 5,
//           "BlinkEnabled": false,
//           "RpmMode": 0,
//           "RelativeToRedline": false,
//           "BlinkOnLastGear": true,
//           "StartPosition": 4,
//           "ContainerType": "RPMSegments",
//           "Description": "Show leds solid color segments based on car RPMs"
//         }
//       ],
//       "StartPosition": 4,
//       "ContainerType": "Groups.CustomConditionalGroup"
//     }
//   ],
//   "ContainerType": "Groups.GameCarModelGroup",
//   "Description": "Ray Formula 1600"
// }
export const formulaFord = (numLeds) => (car) => {
  const processContainers = (container) => {
    const result = { ...container }

    if (result.LedContainers) {
      result.LedContainers = result.LedContainers.map(processContainers)
    }

    switch (result.ContainerType) {
      case "RPMSegments":
        return downsizeRPMSegmentsContainer(result, numLeds)

      case "Groups.CustomConditionalGroup":
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
