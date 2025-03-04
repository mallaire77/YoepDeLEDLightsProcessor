import { downsizeRPMSegmentsContainer } from './common.js'

// {
//   "CarModel": "Cadillac V-Series.R",
//   "LedContainers": [
//     {
//       "TriggerFormula": {
//         "Expression": "if(isnull([GameRawData.Telemetry.Voltage],0)=0,false,(in(isnull([Gear],0),'N','R')))"
//       },
//       "LedContainers": [
//         {
//           "BlinkDelay": 125,
//           "Segments": [
//             "1;15.909;Lime;0;",
//             "1;31.818;Lime;0;",
//             "1;40.909;Yellow;0;",
//             "1;45.455;Yellow;0;",
//             "3;50;Red;0;",
//             "1;45.455;#FFFF00;1;Blue",
//             "1;40.909;#FFFF00;1;Blue",
//             "1;31.818;#00FF00;1;Blue",
//             "1;15.909;#00FF00;1;Blue"
//           ],
//           "SegmentsCount": 9,
//           "BlinkEnabled": false,
//           "RpmMode": 0,
//           "RelativeToRedline": false,
//           "BlinkOnLastGear": false,
//           "StartPosition": 4,
//           "ContainerType": "RPMSegments",
//           "Description": "Show leds solid color segments based on car RPMs copy"
//         },
//         {
//           "EnabledFormula": {
//             "Expression": "isnull([Rpms],0) >= '5200'"
//           },
//           "BlinkFormula": {
//             "Expression": ""
//           },
//           "IdleColor": "Transparent",
//           "IdleBlinkingColor": "Transparent",
//           "EnableIdleBlinking": false,
//           "LedCount": 11,
//           "Color": "Blue",
//           "BlinkingColor": "Transparent",
//           "BlinkEnabled": false,
//           "StartPosition": 4,
//           "ContainerType": "CustomStatus",
//           "Description": "REDLINE 5200"
//         }
//       ],
//       "ContainerType": "Groups.CustomConditionalGroup",
//       "Description": "R/N"
//     },
//     {
//       "TriggerFormula": {
//         "Expression": "isnull([Gear],0)=1"
//       },
//       "LedContainers": [
//         {
//           "BlinkDelay": 125,
//           "Segments": [
//             "1;50.568;Lime;0;",
//             "1;57.386;Lime;0;",
//             "1;66.477;Yellow;0;",
//             "1;75.568;Yellow;0;",
//             "3;84.659;Red;0;",
//             "1;75.568;#FFFF00;1;Blue",
//             "1;66.477;#FFFF00;1;Blue",
//             "1;57.386;#00FF00;1;Blue",
//             "1;50.568;#00FF00;1;Blue"
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
//             "Expression": "isnull([Rpms],0) >= '8250'"
//           },
//           "BlinkFormula": {
//             "Expression": ""
//           },
//           "IdleColor": "Transparent",
//           "IdleBlinkingColor": "Transparent",
//           "EnableIdleBlinking": false,
//           "LedCount": 11,
//           "Color": "Blue",
//           "BlinkingColor": "Transparent",
//           "BlinkEnabled": false,
//           "StartPosition": 4,
//           "ContainerType": "CustomStatus",
//           "Description": "REDLINE 8250"
//         }
//       ],
//       "ContainerType": "Groups.CustomConditionalGroup",
//       "Description": "1st"
//     },
//     {
//       "TriggerFormula": {
//         "Expression": "isnull([Gear],0)=2"
//       },
//       "LedContainers": [
//         {
//           "BlinkDelay": 125,
//           "Segments": [
//             "1;60.975;Lime;0;",
//             "1;65.909;Lime;0;",
//             "1;73.295;Yellow;0;",
//             "1;80.682;Yellow;0;",
//             "3;87.5;Red;0;",
//             "1;80.682;#FFFF00;1;Blue",
//             "1;73.295;#FFFF00;1;Blue",
//             "1;65.909;#00FF00;1;Blue",
//             "1;60.975;#00FF00;1;Blue"
//           ],
//           "SegmentsCount": 9,
//           "BlinkEnabled": false,
//           "RpmMode": 0,
//           "RelativeToRedline": false,
//           "BlinkOnLastGear": false,
//           "StartPosition": 4,
//           "ContainerType": "RPMSegments",
//           "Description": "Show leds solid color segments based on car RPMs copy"
//         },
//         {
//           "EnabledFormula": {
//             "Expression": "isnull([Rpms],0) >= '8350'"
//           },
//           "BlinkFormula": {
//             "Expression": ""
//           },
//           "IdleColor": "Transparent",
//           "IdleBlinkingColor": "Transparent",
//           "EnableIdleBlinking": false,
//           "LedCount": 11,
//           "Color": "Blue",
//           "BlinkingColor": "Transparent",
//           "BlinkEnabled": false,
//           "StartPosition": 4,
//           "ContainerType": "CustomStatus",
//           "Description": "REDLINE 8350"
//         }
//       ],
//       "ContainerType": "Groups.CustomConditionalGroup",
//       "Description": "2nd"
//     },
//     {
//       "TriggerFormula": {
//         "Expression": "isnull([Gear],0)=3"
//       },
//       "LedContainers": [
//         {
//           "BlinkDelay": 125,
//           "Segments": [
//             "1;70.739;Lime;0;",
//             "1;74.659;Lime;0;",
//             "1;80.114;Yellow;0;",
//             "1;85.568;Yellow;0;",
//             "3;90.795;Red;0;",
//             "1;85.568;#FFFF00;1;Blue",
//             "1;80.114;#FFFF00;1;Blue",
//             "1;74.659;#00FF00;1;Blue",
//             "1;70.739;#00FF00;1;Blue"
//           ],
//           "SegmentsCount": 9,
//           "BlinkEnabled": false,
//           "RpmMode": 0,
//           "RelativeToRedline": false,
//           "BlinkOnLastGear": false,
//           "StartPosition": 4,
//           "ContainerType": "RPMSegments",
//           "Description": "Show leds solid color segments based on car RPMs copy"
//         },
//         {
//           "EnabledFormula": {
//             "Expression": "isnull([Rpms],0) >= '8500'"
//           },
//           "BlinkFormula": {
//             "Expression": ""
//           },
//           "IdleColor": "Transparent",
//           "IdleBlinkingColor": "Transparent",
//           "EnableIdleBlinking": false,
//           "LedCount": 11,
//           "Color": "Blue",
//           "BlinkingColor": "Transparent",
//           "BlinkEnabled": false,
//           "StartPosition": 4,
//           "ContainerType": "CustomStatus",
//           "Description": "REDLINE 8500"
//         }
//       ],
//       "ContainerType": "Groups.CustomConditionalGroup",
//       "Description": "3rd"
//     },
//     {
//       "TriggerFormula": {
//         "Expression": "isnull([Gear],0)=4"
//       },
//       "LedContainers": [
//         {
//           "BlinkDelay": 125,
//           "Segments": [
//             "1;82.102;Lime;0;",
//             "1;83.75;Lime;0;",
//             "1;87.443;Yellow;0;",
//             "1;90.625;Yellow;0;",
//             "3;94.602;Red;0;",
//             "1;90.625;#FFFF00;1;Blue",
//             "1;87.443;#FFFF00;1;Blue",
//             "1;83.75;#00FF00;1;Blue",
//             "1;82.102;#00FF00;1;Blue"
//           ],
//           "SegmentsCount": 9,
//           "BlinkEnabled": false,
//           "RpmMode": 0,
//           "RelativeToRedline": false,
//           "BlinkOnLastGear": false,
//           "StartPosition": 4,
//           "ContainerType": "RPMSegments",
//           "Description": "Show leds solid color segments based on car RPMs copy"
//         },
//         {
//           "EnabledFormula": {
//             "Expression": "isnull([Rpms],0) >= '8600'"
//           },
//           "BlinkFormula": {
//             "Expression": ""
//           },
//           "IdleColor": "Transparent",
//           "IdleBlinkingColor": "Transparent",
//           "EnableIdleBlinking": false,
//           "LedCount": 11,
//           "Color": "Blue",
//           "BlinkingColor": "Transparent",
//           "BlinkEnabled": false,
//           "StartPosition": 4,
//           "ContainerType": "CustomStatus",
//           "Description": "REDLINE 8600"
//         }
//       ],
//       "ContainerType": "Groups.CustomConditionalGroup",
//       "Description": "4th"
//     },
//     {
//       "TriggerFormula": {
//         "Expression": "isnull([Gear],0)=5"
//       },
//       "LedContainers": [
//         {
//           "BlinkDelay": 125,
//           "Segments": [
//             "1;87.5;Lime;0;",
//             "1;88.92;Lime;0;",
//             "1;91.761;Yellow;0;",
//             "1;93.75;Yellow;0;",
//             "3;96.023;Red;0;",
//             "1;93.75;#FFFF00;1;Blue",
//             "1;91.761;#FFFF00;1;Blue",
//             "1;88.92;#00FF00;1;Blue",
//             "1;87.5;#00FF00;1;Blue"
//           ],
//           "SegmentsCount": 9,
//           "BlinkEnabled": false,
//           "RpmMode": 0,
//           "RelativeToRedline": false,
//           "BlinkOnLastGear": false,
//           "StartPosition": 4,
//           "ContainerType": "RPMSegments",
//           "Description": "Show leds solid color segments based on car RPMs copy"
//         },
//         {
//           "EnabledFormula": {
//             "Expression": "isnull([Rpms],0) >= '8680'"
//           },
//           "BlinkFormula": {
//             "Expression": ""
//           },
//           "IdleColor": "Transparent",
//           "IdleBlinkingColor": "Transparent",
//           "EnableIdleBlinking": false,
//           "LedCount": 11,
//           "Color": "Blue",
//           "BlinkingColor": "Transparent",
//           "BlinkEnabled": false,
//           "StartPosition": 4,
//           "ContainerType": "CustomStatus",
//           "Description": "REDLINE 8680"
//         }
//       ],
//       "ContainerType": "Groups.CustomConditionalGroup",
//       "Description": "5th"
//     },
//     {
//       "TriggerFormula": {
//         "Expression": "isnull([Gear],0)=6"
//       },
//       "LedContainers": [
//         {
//           "BlinkDelay": 125,
//           "Segments": [
//             "1;91.477;Lime;0;",
//             "1;93.068;Lime;0;",
//             "1;94.886;Yellow;0;",
//             "1;96.591;Yellow;0;",
//             "3;98.068;Red;0;",
//             "1;96.591;#FFFF00;1;Blue",
//             "1;94.886;#FFFF00;1;Blue",
//             "1;93.068;#00FF00;1;Blue",
//             "1;91.477;#00FF00;1;Blue"
//           ],
//           "SegmentsCount": 9,
//           "BlinkEnabled": false,
//           "RpmMode": 0,
//           "RelativeToRedline": false,
//           "BlinkOnLastGear": false,
//           "StartPosition": 4,
//           "ContainerType": "RPMSegments",
//           "Description": "Show leds solid color segments based on car RPMs copy"
//         },
//         {
//           "EnabledFormula": {
//             "Expression": "isnull([Rpms],0) >= '8750'"
//           },
//           "BlinkFormula": {
//             "Expression": ""
//           },
//           "IdleColor": "Transparent",
//           "IdleBlinkingColor": "Transparent",
//           "EnableIdleBlinking": false,
//           "LedCount": 11,
//           "Color": "Blue",
//           "BlinkingColor": "Transparent",
//           "BlinkEnabled": false,
//           "StartPosition": 4,
//           "ContainerType": "CustomStatus",
//           "Description": "REDLINE 8750"
//         }
//       ],
//       "ContainerType": "Groups.CustomConditionalGroup",
//       "Description": "6th"
//     },
//     {
//       "TriggerFormula": {
//         "Expression": "isnull([Gear],0)=7"
//       },
//       "LedContainers": [
//         {
//           "BlinkDelay": 125,
//           "Segments": [
//             "1;95.227;Lime;0;",
//             "1;95.625;Lime;0;",
//             "1;96.307;Yellow;0;",
//             "1;97.727;Yellow;0;",
//             "3;98.864;Red;0;",
//             "1;97.727;#FFFF00;1;Blue",
//             "1;96.307;#FFFF00;1;Blue",
//             "1;95.625;#00FF00;1;Blue",
//             "1;95.227;#00FF00;1;Blue"
//           ],
//           "SegmentsCount": 9,
//           "BlinkEnabled": false,
//           "RpmMode": 0,
//           "RelativeToRedline": false,
//           "BlinkOnLastGear": false,
//           "StartPosition": 4,
//           "ContainerType": "RPMSegments",
//           "Description": "Show leds solid color segments based on car RPMs copy"
//         },
//         {
//           "EnabledFormula": {
//             "Expression": "isnull([Rpms],0) >= '8775'"
//           },
//           "BlinkFormula": {
//             "Expression": ""
//           },
//           "IdleColor": "Transparent",
//           "IdleBlinkingColor": "Transparent",
//           "EnableIdleBlinking": false,
//           "LedCount": 11,
//           "Color": "Blue",
//           "BlinkingColor": "Transparent",
//           "BlinkEnabled": false,
//           "StartPosition": 4,
//           "ContainerType": "CustomStatus",
//           "Description": "REDLINE 8775"
//         }
//       ],
//       "ContainerType": "Groups.CustomConditionalGroup",
//       "Description": "7th"
//     },
//     {
//       "TriggerFormula": {
//         "Expression": "[PitLimiterOn]"
//       },
//       "ClearBackgroundWhenActive": true,
//       "LedContainers": [
//         {
//           "IdleBlinkingColor": "Transparent",
//           "EnableIdleBlinking": false,
//           "LedCount": 10,
//           "Color": "Blue",
//           "BlinkingColor": "Transparent",
//           "BlinkEnabled": true,
//           "BlinkDelay": 250,
//           "StartPosition": 5,
//           "ContainerType": "StaticColor",
//           "Description": "Generates a static light effect copy"
//         }
//       ],
//       "ContainerType": "Groups.CustomConditionalGroup",
//       "Description": "PitLimiter"
//     }
//   ],
//   "ContainerType": "Groups.GameCarModelGroup",
//   "Description": "Cadillac V-Series.R GTP"
// }
export const vSeriesR = (numLeds) => (car) => {
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
