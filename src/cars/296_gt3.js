import { downsizeRPMSegmentsContainer, downsizeAnimationContainer } from '../common.js'

// {
//   "CarModel": "Ferrari 296 GT3",
//   "LedContainers": [
//     {
//       "TriggerFormula": {
//         "Expression": "if(inertia([GameRawData.Telemetry.Voltage],150)=1,1,\r\n\r\nif(isincreasing(5000,[GameRawData.Telemetry.Voltage]),0,\r\n\r\nif(isdecreasing(5000,[GameRawData.Telemetry.EnterExitReset]),\r\n\r\nif(isincreasing(5000,[IsInPitLane]),0,1)\r\n\r\n,1)\r\n\r\n))"
//       },
//       "LedContainers": [
//         {
//           "LedContainers": [
//             {
//               "TriggerFormula": {
//                 "Expression": "isnull([Gear],0)='R' || isnull([Gear],0)='N'"
//               },
//               "LedContainers": [
//                 {
//                   "BlinkDelay": 250,
//                   "Segments": [
//                     "1;56.25;Lime;0;",
//                     "1;62.5;Lime;0;",
//                     "1;68.75;Yellow;0;",
//                     "2;75;Yellow;0;",
//                     "1;81.25;Red;0;",
//                     "1;87.5;Red;0;"
//                   ],
//                   "SegmentsCount": 6,
//                   "BlinkEnabled": false,
//                   "RpmMode": 0,
//                   "RelativeToRedline": false,
//                   "BlinkOnLastGear": true,
//                   "StartPosition": 6,
//                   "ContainerType": "RPMSegments",
//                   "Description": "Show leds solid color segments based on car RPMs copy"
//                 },
//                 {
//                   "EnabledFormula": {
//                     "Expression": "isnull([Rpms],0)>=7500"
//                   },
//                   "BlinkFormula": {
//                     "Expression": ""
//                   },
//                   "IdleColor": "Transparent",
//                   "IdleBlinkingColor": "Transparent",
//                   "EnableIdleBlinking": false,
//                   "LedCount": 7,
//                   "Color": "Red",
//                   "BlinkingColor": "Transparent",
//                   "BlinkEnabled": false,
//                   "StartPosition": 6,
//                   "ContainerType": "CustomStatus",
//                   "Description": "First Redline"
//                 },
//                 {
//                   "TriggerFormula": {
//                     "Expression": "isnull([Rpms],0)>=8000"
//                   },
//                   "ClearBackgroundWhenActive": true,
//                   "LedContainers": [
//                     {
//                       "IdleBlinkingColor": "Transparent",
//                       "EnableIdleBlinking": false,
//                       "LedCount": 7,
//                       "Color": "Red",
//                       "BlinkingColor": "Transparent",
//                       "BlinkEnabled": true,
//                       "BlinkDelay": 250,
//                       "StartPosition": 6,
//                       "ContainerType": "StaticColor"
//                     }
//                   ],
//                   "ContainerType": "Groups.CustomConditionalGroup",
//                   "Description": "Second Redline"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "N/R"
//             },
//             {
//               "TriggerFormula": {
//                 "Expression": "isnull([Gear],0)=1"
//               },
//               "LedContainers": [
//                 {
//                   "BlinkDelay": 250,
//                   "Segments": [
//                     "1;84.5;Lime;0;",
//                     "1;85.75;Lime;0;",
//                     "1;87;Yellow;0;",
//                     "2;88.25;Yellow;0;",
//                     "1;89.5;Red;0;",
//                     "1;90.75;Red;0;"
//                   ],
//                   "SegmentsCount": 6,
//                   "BlinkEnabled": false,
//                   "RpmMode": 0,
//                   "RelativeToRedline": false,
//                   "BlinkOnLastGear": true,
//                   "StartPosition": 6,
//                   "ContainerType": "RPMSegments",
//                   "Description": "Show leds solid color segments based on car RPMs copy"
//                 },
//                 {
//                   "EnabledFormula": {
//                     "Expression": "isnull([Rpms],0)>=7360"
//                   },
//                   "BlinkFormula": {
//                     "Expression": ""
//                   },
//                   "IdleColor": "Transparent",
//                   "IdleBlinkingColor": "Transparent",
//                   "EnableIdleBlinking": false,
//                   "LedCount": 7,
//                   "Color": "Red",
//                   "BlinkingColor": "Transparent",
//                   "BlinkEnabled": false,
//                   "StartPosition": 6,
//                   "ContainerType": "CustomStatus",
//                   "Description": "First Redline"
//                 },
//                 {
//                   "TriggerFormula": {
//                     "Expression": "isnull([Rpms],0)>=7460"
//                   },
//                   "ClearBackgroundWhenActive": true,
//                   "LedContainers": [
//                     {
//                       "IdleBlinkingColor": "Transparent",
//                       "EnableIdleBlinking": false,
//                       "LedCount": 7,
//                       "Color": "Red",
//                       "BlinkingColor": "Transparent",
//                       "BlinkEnabled": true,
//                       "BlinkDelay": 250,
//                       "StartPosition": 6,
//                       "ContainerType": "StaticColor"
//                     }
//                   ],
//                   "ContainerType": "Groups.CustomConditionalGroup",
//                   "Description": "Second Redline"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "1st"
//             },
//             {
//               "TriggerFormula": {
//                 "Expression": "isnull([Gear],0)=2"
//               },
//               "LedContainers": [
//                 {
//                   "BlinkDelay": 250,
//                   "Segments": [
//                     "1;85.5;Lime;0;",
//                     "1;86.75;Lime;0;",
//                     "1;88;Yellow;0;",
//                     "2;89.25;Yellow;0;",
//                     "1;90.5;Red;0;",
//                     "1;91.75;Red;0;"
//                   ],
//                   "SegmentsCount": 6,
//                   "BlinkEnabled": false,
//                   "RpmMode": 0,
//                   "RelativeToRedline": false,
//                   "BlinkOnLastGear": true,
//                   "StartPosition": 6,
//                   "ContainerType": "RPMSegments",
//                   "Description": "Show leds solid color segments based on car RPMs copy"
//                 },
//                 {
//                   "EnabledFormula": {
//                     "Expression": "isnull([Rpms],0)>=7440"
//                   },
//                   "BlinkFormula": {
//                     "Expression": ""
//                   },
//                   "IdleColor": "Transparent",
//                   "IdleBlinkingColor": "Transparent",
//                   "EnableIdleBlinking": false,
//                   "LedCount": 7,
//                   "Color": "Red",
//                   "BlinkingColor": "Transparent",
//                   "BlinkEnabled": false,
//                   "StartPosition": 6,
//                   "ContainerType": "CustomStatus",
//                   "Description": "First Redline"
//                 },
//                 {
//                   "TriggerFormula": {
//                     "Expression": "isnull([Rpms],0)>=7460"
//                   },
//                   "ClearBackgroundWhenActive": true,
//                   "LedContainers": [
//                     {
//                       "IdleBlinkingColor": "Transparent",
//                       "EnableIdleBlinking": false,
//                       "LedCount": 7,
//                       "Color": "Red",
//                       "BlinkingColor": "Transparent",
//                       "BlinkEnabled": true,
//                       "BlinkDelay": 250,
//                       "StartPosition": 6,
//                       "ContainerType": "StaticColor"
//                     }
//                   ],
//                   "ContainerType": "Groups.CustomConditionalGroup",
//                   "Description": "Second Redline"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "2nd"
//             },
//             {
//               "TriggerFormula": {
//                 "Expression": "isnull([Gear],0)=3"
//               },
//               "LedContainers": [
//                 {
//                   "BlinkDelay": 250,
//                   "Segments": [
//                     "1;85.25;Lime;0;",
//                     "1;86.5;Lime;0;",
//                     "1;87.75;Yellow;0;",
//                     "2;89;Yellow;0;",
//                     "1;90.25;Red;0;",
//                     "1;91.5;Red;0;"
//                   ],
//                   "SegmentsCount": 6,
//                   "BlinkEnabled": false,
//                   "RpmMode": 0,
//                   "RelativeToRedline": false,
//                   "BlinkOnLastGear": true,
//                   "StartPosition": 6,
//                   "ContainerType": "RPMSegments",
//                   "Description": "Show leds solid color segments based on car RPMs copy"
//                 },
//                 {
//                   "EnabledFormula": {
//                     "Expression": "isnull([Rpms],0)>=7420"
//                   },
//                   "BlinkFormula": {
//                     "Expression": ""
//                   },
//                   "IdleColor": "Transparent",
//                   "IdleBlinkingColor": "Transparent",
//                   "EnableIdleBlinking": false,
//                   "LedCount": 7,
//                   "Color": "Red",
//                   "BlinkingColor": "Transparent",
//                   "BlinkEnabled": false,
//                   "StartPosition": 6,
//                   "ContainerType": "CustomStatus",
//                   "Description": "First Redline"
//                 },
//                 {
//                   "TriggerFormula": {
//                     "Expression": "isnull([Rpms],0)>=7520"
//                   },
//                   "ClearBackgroundWhenActive": true,
//                   "LedContainers": [
//                     {
//                       "IdleBlinkingColor": "Transparent",
//                       "EnableIdleBlinking": false,
//                       "LedCount": 7,
//                       "Color": "Red",
//                       "BlinkingColor": "Transparent",
//                       "BlinkEnabled": true,
//                       "BlinkDelay": 250,
//                       "StartPosition": 6,
//                       "ContainerType": "StaticColor"
//                     }
//                   ],
//                   "ContainerType": "Groups.CustomConditionalGroup",
//                   "Description": "Second Redline"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "3rd"
//             },
//             {
//               "TriggerFormula": {
//                 "Expression": "isnull([Gear],0)=4"
//               },
//               "LedContainers": [
//                 {
//                   "BlinkDelay": 250,
//                   "Segments": [
//                     "1;84.5;Lime;0;",
//                     "1;85.75;Lime;0;",
//                     "1;87;Yellow;0;",
//                     "2;88.25;Yellow;0;",
//                     "1;89.5;Red;0;",
//                     "1;90.75;Red;0;"
//                   ],
//                   "SegmentsCount": 6,
//                   "BlinkEnabled": false,
//                   "RpmMode": 0,
//                   "RelativeToRedline": false,
//                   "BlinkOnLastGear": true,
//                   "StartPosition": 6,
//                   "ContainerType": "RPMSegments",
//                   "Description": "Show leds solid color segments based on car RPMs copy"
//                 },
//                 {
//                   "EnabledFormula": {
//                     "Expression": "isnull([Rpms],0)>=7360"
//                   },
//                   "BlinkFormula": {
//                     "Expression": ""
//                   },
//                   "IdleColor": "Transparent",
//                   "IdleBlinkingColor": "Transparent",
//                   "EnableIdleBlinking": false,
//                   "LedCount": 7,
//                   "Color": "Red",
//                   "BlinkingColor": "Transparent",
//                   "BlinkEnabled": false,
//                   "StartPosition": 6,
//                   "ContainerType": "CustomStatus",
//                   "Description": "First Redline"
//                 },
//                 {
//                   "TriggerFormula": {
//                     "Expression": "isnull([Rpms],0)>=7460"
//                   },
//                   "ClearBackgroundWhenActive": true,
//                   "LedContainers": [
//                     {
//                       "IdleBlinkingColor": "Transparent",
//                       "EnableIdleBlinking": false,
//                       "LedCount": 7,
//                       "Color": "Red",
//                       "BlinkingColor": "Transparent",
//                       "BlinkEnabled": true,
//                       "BlinkDelay": 250,
//                       "StartPosition": 6,
//                       "ContainerType": "StaticColor"
//                     }
//                   ],
//                   "ContainerType": "Groups.CustomConditionalGroup",
//                   "Description": "Second Redline"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "4th"
//             },
//             {
//               "TriggerFormula": {
//                 "Expression": "isnull([Gear],0)=5"
//               },
//               "LedContainers": [
//                 {
//                   "BlinkDelay": 250,
//                   "Segments": [
//                     "1;84.375;Lime;0;",
//                     "1;85.625;Lime;0;",
//                     "1;86.875;Yellow;0;",
//                     "2;88.125;Yellow;0;",
//                     "1;89.375;Red;0;",
//                     "1;90.625;Red;0;"
//                   ],
//                   "SegmentsCount": 6,
//                   "BlinkEnabled": false,
//                   "RpmMode": 0,
//                   "RelativeToRedline": false,
//                   "BlinkOnLastGear": true,
//                   "StartPosition": 6,
//                   "ContainerType": "RPMSegments",
//                   "Description": "Show leds solid color segments based on car RPMs copy"
//                 },
//                 {
//                   "EnabledFormula": {
//                     "Expression": "isnull([Rpms],0)>=7350"
//                   },
//                   "BlinkFormula": {
//                     "Expression": ""
//                   },
//                   "IdleColor": "Transparent",
//                   "IdleBlinkingColor": "Transparent",
//                   "EnableIdleBlinking": false,
//                   "LedCount": 7,
//                   "Color": "Red",
//                   "BlinkingColor": "Transparent",
//                   "BlinkEnabled": false,
//                   "StartPosition": 6,
//                   "ContainerType": "CustomStatus",
//                   "Description": "First Redline"
//                 },
//                 {
//                   "TriggerFormula": {
//                     "Expression": "isnull([Rpms],0)>=7450"
//                   },
//                   "ClearBackgroundWhenActive": true,
//                   "LedContainers": [
//                     {
//                       "IdleBlinkingColor": "Transparent",
//                       "EnableIdleBlinking": false,
//                       "LedCount": 7,
//                       "Color": "Red",
//                       "BlinkingColor": "Transparent",
//                       "BlinkEnabled": true,
//                       "BlinkDelay": 250,
//                       "StartPosition": 6,
//                       "ContainerType": "StaticColor"
//                     }
//                   ],
//                   "ContainerType": "Groups.CustomConditionalGroup",
//                   "Description": "Second Redline"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "5th"
//             },
//             {
//               "TriggerFormula": {
//                 "Expression": "isnull([Gear],0)=6"
//               },
//               "LedContainers": [
//                 {
//                   "BlinkDelay": 250,
//                   "Segments": [
//                     "1;83.75;Lime;0;",
//                     "1;86.25;Lime;0;",
//                     "1;88.75;Yellow;0;",
//                     "2;91.25;Yellow;0;",
//                     "1;93.75;Red;0;",
//                     "1;96.25;Red;0;"
//                   ],
//                   "SegmentsCount": 6,
//                   "BlinkEnabled": false,
//                   "RpmMode": 0,
//                   "RelativeToRedline": false,
//                   "BlinkOnLastGear": true,
//                   "StartPosition": 6,
//                   "ContainerType": "RPMSegments",
//                   "Description": "Show leds solid color segments based on car RPMs copy"
//                 },
//                 {
//                   "EnabledFormula": {
//                     "Expression": "isnull([Rpms],0)>=7900"
//                   },
//                   "BlinkFormula": {
//                     "Expression": ""
//                   },
//                   "IdleColor": "Transparent",
//                   "IdleBlinkingColor": "Transparent",
//                   "EnableIdleBlinking": false,
//                   "LedCount": 7,
//                   "Color": "Red",
//                   "BlinkingColor": "Transparent",
//                   "BlinkEnabled": false,
//                   "StartPosition": 6,
//                   "ContainerType": "CustomStatus",
//                   "Description": "First Redline"
//                 },
//                 {
//                   "TriggerFormula": {
//                     "Expression": "isnull([Rpms],0)>=8000"
//                   },
//                   "ClearBackgroundWhenActive": true,
//                   "LedContainers": [
//                     {
//                       "IdleBlinkingColor": "Transparent",
//                       "EnableIdleBlinking": false,
//                       "LedCount": 7,
//                       "Color": "Red",
//                       "BlinkingColor": "Transparent",
//                       "BlinkEnabled": true,
//                       "BlinkDelay": 250,
//                       "StartPosition": 6,
//                       "ContainerType": "StaticColor"
//                     }
//                   ],
//                   "ContainerType": "Groups.CustomConditionalGroup",
//                   "Description": "Second Redline"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "6th"
//             }
//           ],
//           "ContainerType": "Base.Group",
//           "Description": "RPM per Gear"
//         },
//         {
//           "EnabledFormula": {
//             "Expression": "isnull([GameRawData.Telemetry.OilPress],0)<1.6"
//           },
//           "BlinkFormula": {
//             "Expression": ""
//           },
//           "IdleColor": "Transparent",
//           "IdleBlinkingColor": "Transparent",
//           "EnableIdleBlinking": false,
//           "LedCount": 2,
//           "Color": "Orange",
//           "BlinkingColor": "Transparent",
//           "BlinkEnabled": true,
//           "StartPosition": 4,
//           "ContainerType": "CustomStatus",
//           "Description": "OIL PRESS"
//         },
//         {
//           "EnabledFormula": {
//             "Expression": "if(isnull([DataCorePlugin.Computed.Fuel_Percent],0)<0.75961538,\r\n\r\nif(isnull([YoepGt.HideFuelWarning],0)=true,false,true)\r\n\r\n,false)"
//           },
//           "BlinkFormula": {
//             "Expression": ""
//           },
//           "IdleColor": "Transparent",
//           "IdleBlinkingColor": "Transparent",
//           "EnableIdleBlinking": false,
//           "LedCount": 2,
//           "Color": "Orange",
//           "BlinkingColor": "Transparent",
//           "BlinkEnabled": true,
//           "StartPosition": 4,
//           "ContainerType": "CustomStatus",
//           "Description": "Fuel PRESS"
//         },
//         {
//           "IdleColor": "Transparent",
//           "IdleBlinkingColor": "Transparent",
//           "EnableIdleBlinking": false,
//           "LedCount": 16,
//           "Color": "White",
//           "BlinkingColor": "Transparent",
//           "BlinkEnabled": true,
//           "ContainerType": "Status.SpeedLimiter",
//           "Description": "Generates a static color when the speed limiter is ON copy"
//         }
//       ],
//       "ContainerType": "Groups.CustomConditionalGroup"
//     }
//   ],
//   "ContainerType": "Groups.GameCarModelGroup",
//   "Description": "Ferrari 296 GT3"
// }
export default (numLeds) => (car) => {
  const processContainers = (container) => {
    const result = { ...container }

    if (result.LedContainers) {
      result.LedContainers = result.LedContainers.map(processContainers)
    }

    switch (result.ContainerType) {
      case "RPMSegments":
        return downsizeRPMSegmentsContainer(result, numLeds)

      case "Animation":
        return downsizeAnimationContainer(result, numLeds)

      case "CustomStatus":
      case "StaticColor":
      case "Status.SpeedLimiter":
        if (
          result.EnabledFormula && result.EnabledFormula.Expression === "isnull([GameRawData.Telemetry.OilPress],0)<1.6" ||
          result.EnabledFormula && result.EnabledFormula.Expression === "if(isnull([DataCorePlugin.Computed.Fuel_Percent],0)<0.75961538,\r\n\r\nif(isnull([YoepGt.HideFuelWarning],0)=true,false,true)\r\n\r\n,false)"
        ) {
          return {
            ...result,
            StartPosition: 1,
            LedCount: Math.min(numLeds, 2)
          }
        } else if (parseInt(container.LedCount, 10) <= numLeds) {
          return {
            ...result,
            StartPosition: 1 + Math.round((numLeds - parseInt(container.LedCount, 10)) / 2),
            LedCount: parseInt(container.LedCount, 10)
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