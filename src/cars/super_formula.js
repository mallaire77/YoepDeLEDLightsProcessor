import { downsizeRPMSegmentsContainer } from './common.js'

// {
//   "CarModel": "Super Formula SF23 - Honda",
//   "LedContainers": [
//     {
//       "LedContainers": [
//         {
//           "TriggerFormula": {
//             "Expression": "isnull([Gear],0)='N' || isnull([Gear],0)='R'"
//           },
//           "LedContainers": [
//             {
//               "TriggerFormula": {
//                 "Expression": "if(inertia([GameRawData.Telemetry.Voltage],150)=1,1,\r\n\r\nif(isincreasing(3600,[GameRawData.Telemetry.Voltage]),0,\r\n\r\nif(isdecreasing(3600,[GameRawData.Telemetry.EnterExitReset]),\r\n\r\nif(isincreasing(3600,[IsInPitLane]),0,1)\r\n\r\n,1)\r\n\r\n))"
//               },
//               "LedContainers": [
//                 {
//                   "BlinkDelay": 250,
//                   "Segments": [
//                     "1;0;Lime;0;",
//                     "1;33.78;Lime;0;",
//                     "1;44.826;Lime;0;",
//                     "1;50.509;Lime;0;",
//                     "2;56.086;Yellow;0;",
//                     "1;61.769;Yellow;0;",
//                     "1;67.346;Yellow;0;",
//                     "1;72.922;Yellow;0;",
//                     "1;78.606;Red;0;",
//                     "1;84.182;Red;0;"
//                   ],
//                   "SegmentsCount": 10,
//                   "BlinkEnabled": false,
//                   "RpmMode": 0,
//                   "RelativeToRedline": false,
//                   "BlinkOnLastGear": true,
//                   "StartPosition": 4,
//                   "ContainerType": "RPMSegments",
//                   "Description": "Show leds solid color segments based on car RPMs"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup"
//             },
//             {
//               "TriggerFormula": {
//                 "Expression": "isnull([Rpms],0)>=8050"
//               },
//               "ClearBackgroundWhenActive": true,
//               "LedContainers": [
//                 {
//                   "IdleBlinkingColor": "Transparent",
//                   "EnableIdleBlinking": false,
//                   "LedCount": 11,
//                   "Color": "Red",
//                   "BlinkingColor": "Transparent",
//                   "BlinkEnabled": true,
//                   "BlinkDelay": 250,
//                   "StartPosition": 4,
//                   "ContainerType": "StaticColor"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "Redline 8050"
//             }
//           ],
//           "ContainerType": "Groups.CustomConditionalGroup",
//           "Description": "N/R"
//         },
//         {
//           "TriggerFormula": {
//             "Expression": "isnull([Gear],0)=1"
//           },
//           "LedContainers": [
//             {
//               "BlinkDelay": 250,
//               "Segments": [
//                 "1;76.311;Lime;0;",
//                 "1;78.831;Lime;0;",
//                 "1;81.34;Lime;0;",
//                 "1;83.324;Lime;0;",
//                 "2;85.265;Yellow;0;",
//                 "1;87.024;Yellow;0;",
//                 "1;88.686;Yellow;0;",
//                 "1;90.349;Yellow;0;",
//                 "1;92.011;Red;0;",
//                 "1;93.727;Red;0;"
//               ],
//               "SegmentsCount": 10,
//               "BlinkEnabled": false,
//               "RpmMode": 0,
//               "RelativeToRedline": false,
//               "BlinkOnLastGear": true,
//               "StartPosition": 4,
//               "ContainerType": "RPMSegments",
//               "Description": "Show leds solid color segments based on car RPMs"
//             },
//             {
//               "TriggerFormula": {
//                 "Expression": "isnull([Rpms],0)>=8940"
//               },
//               "ClearBackgroundWhenActive": true,
//               "LedContainers": [
//                 {
//                   "IdleBlinkingColor": "Transparent",
//                   "EnableIdleBlinking": false,
//                   "LedCount": 11,
//                   "Color": "Red",
//                   "BlinkingColor": "Transparent",
//                   "BlinkEnabled": true,
//                   "BlinkDelay": 250,
//                   "StartPosition": 4,
//                   "ContainerType": "StaticColor"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "Redline 8940"
//             }
//           ],
//           "ContainerType": "Groups.CustomConditionalGroup",
//           "Description": "1st"
//         },
//         {
//           "TriggerFormula": {
//             "Expression": "isnull([Gear],0)=2"
//           },
//           "LedContainers": [
//             {
//               "BlinkDelay": 250,
//               "Segments": [
//                 "1;78.552;Lime;0;",
//                 "1;80.751;Lime;0;",
//                 "1;83.056;Lime;0;",
//                 "1;85.255;Lime;0;",
//                 "2;87.507;Yellow;0;",
//                 "1;89.491;Yellow;0;",
//                 "1;91.475;Yellow;0;",
//                 "1;92.601;Yellow;0;",
//                 "1;93.727;Red;0;",
//                 "1;94.853;Red;0;"
//               ],
//               "SegmentsCount": 10,
//               "BlinkEnabled": false,
//               "RpmMode": 0,
//               "RelativeToRedline": false,
//               "BlinkOnLastGear": true,
//               "StartPosition": 4,
//               "ContainerType": "RPMSegments",
//               "Description": "Show leds solid color segments based on car RPMs"
//             },
//             {
//               "TriggerFormula": {
//                 "Expression": "isnull([Rpms],0)>=8940"
//               },
//               "ClearBackgroundWhenActive": true,
//               "LedContainers": [
//                 {
//                   "IdleBlinkingColor": "Transparent",
//                   "EnableIdleBlinking": false,
//                   "LedCount": 11,
//                   "Color": "Red",
//                   "BlinkingColor": "Transparent",
//                   "BlinkEnabled": true,
//                   "BlinkDelay": 250,
//                   "StartPosition": 4,
//                   "ContainerType": "StaticColor"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "Redline 8940"
//             }
//           ],
//           "ContainerType": "Groups.CustomConditionalGroup",
//           "Description": "2nd"
//         },
//         {
//           "TriggerFormula": {
//             "Expression": "isnull([Gear],0)=3"
//           },
//           "LedContainers": [
//             {
//               "BlinkDelay": 250,
//               "Segments": [
//                 "1;83.056;Lime;0;",
//                 "1;84.718;Lime;0;",
//                 "1;86.434;Lime;0;",
//                 "1;88.097;Lime;0;",
//                 "2;89.759;Yellow;0;",
//                 "1;91.164;Yellow;0;",
//                 "1;92.708;Yellow;0;",
//                 "1;93.458;Yellow;0;",
//                 "1;94.316;Red;0;",
//                 "1;95.174;Red;0;"
//               ],
//               "SegmentsCount": 10,
//               "BlinkEnabled": false,
//               "RpmMode": 0,
//               "RelativeToRedline": false,
//               "BlinkOnLastGear": true,
//               "StartPosition": 4,
//               "ContainerType": "RPMSegments",
//               "Description": "Show leds solid color segments based on car RPMs"
//             },
//             {
//               "TriggerFormula": {
//                 "Expression": "isnull([Rpms],0)>=8970"
//               },
//               "ClearBackgroundWhenActive": true,
//               "LedContainers": [
//                 {
//                   "IdleBlinkingColor": "Transparent",
//                   "EnableIdleBlinking": false,
//                   "LedCount": 11,
//                   "Color": "Red",
//                   "BlinkingColor": "Transparent",
//                   "BlinkEnabled": true,
//                   "BlinkDelay": 250,
//                   "StartPosition": 4,
//                   "ContainerType": "StaticColor"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "Redline 8970"
//             }
//           ],
//           "ContainerType": "Groups.CustomConditionalGroup",
//           "Description": "3rd"
//         },
//         {
//           "TriggerFormula": {
//             "Expression": "isnull([Gear],0)=4"
//           },
//           "LedContainers": [
//             {
//               "BlinkDelay": 250,
//               "Segments": [
//                 "1;83.646;Lime;0;",
//                 "1;85.255;Lime;0;",
//                 "1;86.863;Lime;0;",
//                 "1;88.579;Lime;0;",
//                 "2;90.349;Yellow;0;",
//                 "1;91.475;Yellow;0;",
//                 "1;92.547;Yellow;0;",
//                 "1;93.619;Yellow;0;",
//                 "1;94.799;Red;0;",
//                 "1;95.979;Red;0;"
//               ],
//               "SegmentsCount": 10,
//               "BlinkEnabled": false,
//               "RpmMode": 0,
//               "RelativeToRedline": false,
//               "BlinkOnLastGear": true,
//               "StartPosition": 4,
//               "ContainerType": "RPMSegments",
//               "Description": "Show leds solid color segments based on car RPMs"
//             },
//             {
//               "TriggerFormula": {
//                 "Expression": "isnull([Rpms],0)>=9050"
//               },
//               "ClearBackgroundWhenActive": true,
//               "LedContainers": [
//                 {
//                   "IdleBlinkingColor": "Transparent",
//                   "EnableIdleBlinking": false,
//                   "LedCount": 11,
//                   "Color": "Red",
//                   "BlinkingColor": "Transparent",
//                   "BlinkEnabled": true,
//                   "BlinkDelay": 250,
//                   "StartPosition": 4,
//                   "ContainerType": "StaticColor"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "Redline 9050"
//             }
//           ],
//           "ContainerType": "Groups.CustomConditionalGroup",
//           "Description": "4th"
//         },
//         {
//           "TriggerFormula": {
//             "Expression": "isnull([Gear],0)=5"
//           },
//           "LedContainers": [
//             {
//               "BlinkDelay": 250,
//               "Segments": [
//                 "1;85.255;Lime;0;",
//                 "1;86.971;Lime;0;",
//                 "1;88.654;Lime;0;",
//                 "1;90.027;Lime;0;",
//                 "2;91.475;Yellow;0;",
//                 "1;92.547;Yellow;0;",
//                 "1;93.619;Yellow;0;",
//                 "1;94.531;Yellow;0;",
//                 "1;95.389;Red;0;",
//                 "1;96.247;Red;0;"
//               ],
//               "SegmentsCount": 10,
//               "BlinkEnabled": false,
//               "RpmMode": 0,
//               "RelativeToRedline": false,
//               "BlinkOnLastGear": true,
//               "StartPosition": 4,
//               "ContainerType": "RPMSegments",
//               "Description": "Show leds solid color segments based on car RPMs"
//             },
//             {
//               "TriggerFormula": {
//                 "Expression": "isnull([Rpms],0)>=9070"
//               },
//               "ClearBackgroundWhenActive": true,
//               "LedContainers": [
//                 {
//                   "IdleBlinkingColor": "Transparent",
//                   "EnableIdleBlinking": false,
//                   "LedCount": 11,
//                   "Color": "Red",
//                   "BlinkingColor": "Transparent",
//                   "BlinkEnabled": true,
//                   "BlinkDelay": 250,
//                   "StartPosition": 4,
//                   "ContainerType": "StaticColor"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "Redline 9070"
//             }
//           ],
//           "ContainerType": "Groups.CustomConditionalGroup",
//           "Description": "5th"
//         },
//         {
//           "TriggerFormula": {
//             "Expression": "isnull([Gear],0)=6"
//           },
//           "LedContainers": [
//             {
//               "BlinkDelay": 250,
//               "Segments": [
//                 "1;81.538;Lime;0;",
//                 "1;83.179;Lime;0;",
//                 "1;84.79;Lime;0;",
//                 "1;85.846;Lime;0;",
//                 "2;86.923;Yellow;0;",
//                 "1;88;Yellow;0;",
//                 "1;89.077;Yellow;0;",
//                 "1;90.154;Yellow;0;",
//                 "1;91.282;Red;0;",
//                 "1;92.308;Red;0;"
//               ],
//               "SegmentsCount": 10,
//               "BlinkEnabled": false,
//               "RpmMode": 0,
//               "RelativeToRedline": false,
//               "BlinkOnLastGear": true,
//               "StartPosition": 4,
//               "ContainerType": "RPMSegments",
//               "Description": "Show leds solid color segments based on car RPMs"
//             },
//             {
//               "TriggerFormula": {
//                 "Expression": "isnull([Rpms],0)>=9100"
//               },
//               "ClearBackgroundWhenActive": true,
//               "LedContainers": [
//                 {
//                   "IdleBlinkingColor": "Transparent",
//                   "EnableIdleBlinking": false,
//                   "LedCount": 11,
//                   "Color": "Red",
//                   "BlinkingColor": "Transparent",
//                   "BlinkEnabled": true,
//                   "BlinkDelay": 250,
//                   "StartPosition": 4,
//                   "ContainerType": "StaticColor"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "Redline 9100"
//             }
//           ],
//           "ContainerType": "Groups.CustomConditionalGroup",
//           "Description": "6th"
//         }
//       ],
//       "ContainerType": "Base.Group",
//       "Description": "RPMs"
//     }
//   ],
//   "ContainerType": "Groups.GameCarModelGroup",
//   "Description": "Super Formula SF23 - Honda"
// }
export const superFormula = (numLeds) => (car) => {
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