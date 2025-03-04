import { downsizeRPMSegmentsContainer } from './common.js'

// {
//   "CarModel": "Mazda MX-5 Cup",
//   "LedContainers": [
//     {
//       "TriggerFormula": {
//         "Expression": "if(inertia([GameRawData.Telemetry.Voltage],150)=1,1,\r\n\r\nif(isincreasing(5000,[GameRawData.Telemetry.Voltage]),0,\r\n\r\nif(isdecreasing(5000,[GameRawData.Telemetry.EnterExitReset]),\r\n\r\nif(isincreasing(5000,[IsInPitLane]),0,1)\r\n\r\n,1)\r\n\r\n))"
//       },
//       "LedContainers": [
//         {
//           "BlinkDelay": 125,
//           "Segments": [
//             "1;61.13;Green;1;Blue",
//             "1;71.761;Green;1;Blue",
//             "1;81.063;Yellow;1;Blue",
//             "1;90.365;Yellow;1;Blue",
//             "3;95.861;Red;1;Blue",
//             "1;90.365;Yellow;1;Blue",
//             "1;81.063;Yellow;1;Blue",
//             "1;71.761;Green;1;Blue",
//             "1;61.13;Green;1;Blue"
//           ],
//           "SegmentsCount": 9,
//           "BlinkEnabled": false,
//           "RpmMode": 0,
//           "RelativeToRedline": false,
//           "BlinkOnLastGear": false,
//           "StartPosition": 4,
//           "ContainerType": "RPMSegments",
//           "Description": "Show leds solid color segments based on car RPMs"
//         },
//         {
//           "EnabledFormula": {
//             "Expression": "if([Rpms]>=7400,true,false)"
//           },
//           "BlinkFormula": {
//             "Expression": ""
//           },
//           "IdleColor": "Transparent",
//           "IdleBlinkingColor": "Transparent",
//           "EnableIdleBlinking": false,
//           "LedCount": 11,
//           "Color": "Black",
//           "BlinkingColor": "Transparent",
//           "BlinkEnabled": true,
//           "BlinkDelay": 300,
//           "StartPosition": 4,
//           "ContainerType": "CustomStatus",
//           "Description": "redline"
//         }
//       ],
//       "ContainerType": "Groups.CustomConditionalGroup"
//     }
//   ],
//   "ContainerType": "Groups.GameCarModelGroup",
//   "Description": "Mazda MX-5 Cup"
// }
export const mx5 = (numLeds) => (car) => {
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