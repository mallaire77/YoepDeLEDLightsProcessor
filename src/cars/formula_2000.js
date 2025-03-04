import { downsizeRPMSegmentsContainer } from './common.js'

// {
//   "CarModel": "Skip Barber Formula 2000",
//   "LedContainers": [
//     {
//       "BlinkDelay": 125,
//       "Segments": [
//         "1;81.25;Lime;0;",
//         "1;82.813;Lime;0;",
//         "1;84.375;Lime;0;",
//         "1;85.938;Lime;0;",
//         "2;87.5;Yellow;0;",
//         "1;89.063;Yellow;0;",
//         "1;90.625;Yellow;0;",
//         "1;92.188;Yellow;0;",
//         "1;93.75;Red;0;",
//         "1;95.313;Red;0;"
//       ],
//       "SegmentsCount": 10,
//       "BlinkEnabled": false,
//       "RpmMode": 0,
//       "RelativeToRedline": false,
//       "BlinkOnLastGear": false,
//       "StartPosition": 4,
//       "ContainerType": "RPMSegments"
//     },
//     {
//       "TriggerFormula": {
//         "Expression": "if(isnull([Rpms],0)>6249,true,false)"
//       },
//       "ClearBackgroundWhenActive": true,
//       "LedContainers": [
//         {
//           "IdleBlinkingColor": "Transparent",
//           "EnableIdleBlinking": false,
//           "LedCount": 11,
//           "Color": "Cyan",
//           "BlinkingColor": "Transparent",
//           "BlinkEnabled": true,
//           "BlinkDelay": 100,
//           "StartPosition": 4,
//           "ContainerType": "StaticColor",
//           "Description": "redline blink"
//         }
//       ],
//       "ContainerType": "Groups.CustomConditionalGroup",
//       "Description": "Redline 6250"
//     }
//   ],
//   "ContainerType": "Groups.GameCarModelGroup",
//   "Description": "Skip Barber Formula 2000"
// }
export const formula2000 = (numLeds) => (car) => {
  const processContainers = (container) => {
    const result = { ...container }

    if (result.LedContainers) {
      result.LedContainers = result.LedContainers.map(processContainers)
    }

    switch (result.ContainerType) {
      case "RPMSegments":
        return downsizeRPMSegmentsContainer(result, numLeds)

      case "StaticColor":
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

