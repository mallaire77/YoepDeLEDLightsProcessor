import { downsizeRPMSegmentsContainer, downsizeAnimationContainer } from './common.js'

// {
//   "CarModel": "Mercedes W12",
//   "LedContainers": [
//     {
//       "TriggerFormula": {
//         "Expression": "if(inertia([GameRawData.Telemetry.Voltage],150)=1,1,\r\n\r\nif(isincreasing(3000,[GameRawData.Telemetry.Voltage]),0,\r\n\r\nif(isdecreasing(3000,[GameRawData.Telemetry.EnterExitReset]),\r\n\r\nif(isincreasing(3000,[IsInPitLane]),0,1)\r\n\r\n,1)\r\n\r\n))"
//       },
//       "LedContainers": [
//         {
//           "LedContainers": [
//             {
//               "TriggerFormula": {
//                 "Expression": "[Gear] = 'R' || [Gear] = '1' "
//               },
//               "LedContainers": [
//                 {
//                   "BlinkDelay": 250,
//                   "Segments": [
//                     "1;4910;Red;0;",
//                     "1;6110;Red;0;",
//                     "1;7310;Red;0;",
//                     "1;8510;Red;1;Red",
//                     "1;9310;Red;0;",
//                     "6;10110;Cyan;0;"
//                   ],
//                   "SegmentsCount": 6,
//                   "BlinkEnabled": false,
//                   "RpmMode": 2,
//                   "RelativeToRedline": false,
//                   "BlinkOnLastGear": false,
//                   "StartPosition": 6,
//                   "ContainerType": "RPMSegments",
//                   "Description": "Show leds solid color segments based on car RPMs copy"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "N/1"
//             },
//             {
//               "TriggerFormula": {
//                 "Expression": "[Gear] = '2'"
//               },
//               "LedContainers": [
//                 {
//                   "BlinkDelay": 250,
//                   "Segments": [
//                     "1;4395;Red;0;",
//                     "1;5695;Red;0;",
//                     "1;6995;Red;0;",
//                     "1;8260;Red;1;Red",
//                     "1;9127;Red;0;",
//                     "6;9990;Cyan;0;"
//                   ],
//                   "SegmentsCount": 6,
//                   "BlinkEnabled": false,
//                   "RpmMode": 2,
//                   "RelativeToRedline": false,
//                   "BlinkOnLastGear": false,
//                   "StartPosition": 6,
//                   "ContainerType": "RPMSegments",
//                   "Description": "Show leds solid color segments based on car RPMs copy"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "2nd gear"
//             },
//             {
//               "TriggerFormula": {
//                 "Expression": "[Gear] = '3'"
//               },
//               "LedContainers": [
//                 {
//                   "BlinkDelay": 250,
//                   "Segments": [
//                     "1;5670;Red;0;",
//                     "1;6715;Red;0;",
//                     "1;7770;Red;0;",
//                     "1;8820;Red;1;Red",
//                     "1;9490;Red;0;",
//                     "6;10210;Cyan;0;"
//                   ],
//                   "SegmentsCount": 6,
//                   "BlinkEnabled": false,
//                   "RpmMode": 2,
//                   "RelativeToRedline": false,
//                   "BlinkOnLastGear": false,
//                   "StartPosition": 6,
//                   "ContainerType": "RPMSegments",
//                   "Description": "Show leds solid color segments based on car RPMs copy"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "3rd gear"
//             },
//             {
//               "TriggerFormula": {
//                 "Expression": "[Gear] = '4'"
//               },
//               "LedContainers": [
//                 {
//                   "BlinkDelay": 250,
//                   "Segments": [
//                     "1;10260;Red;0;",
//                     "1;10560;Red;0;",
//                     "1;10860;Red;0;",
//                     "1;11160;Red;1;Red",
//                     "1;11360;Red;0;",
//                     "6;11560;Cyan;0;"
//                   ],
//                   "SegmentsCount": 6,
//                   "BlinkEnabled": false,
//                   "RpmMode": 2,
//                   "RelativeToRedline": false,
//                   "BlinkOnLastGear": false,
//                   "StartPosition": 6,
//                   "ContainerType": "RPMSegments",
//                   "Description": "Show leds solid color segments based on car RPMs copy"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "4th gear"
//             },
//             {
//               "TriggerFormula": {
//                 "Expression": "[Gear] = '5'"
//               },
//               "LedContainers": [
//                 {
//                   "BlinkDelay": 250,
//                   "Segments": [
//                     "1;10570;Red;0;",
//                     "1;10830;Red;0;",
//                     "1;11105;Red;0;",
//                     "1;11375;Red;1;Red",
//                     "1;11550;Red;0;",
//                     "6;11730;Cyan;0;"
//                   ],
//                   "SegmentsCount": 6,
//                   "BlinkEnabled": false,
//                   "RpmMode": 2,
//                   "RelativeToRedline": false,
//                   "BlinkOnLastGear": false,
//                   "StartPosition": 6,
//                   "ContainerType": "RPMSegments",
//                   "Description": "Show leds solid color segments based on car RPMs copy"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "5th gear "
//             },
//             {
//               "TriggerFormula": {
//                 "Expression": "[Gear] = '6'"
//               },
//               "LedContainers": [
//                 {
//                   "BlinkDelay": 250,
//                   "Segments": [
//                     "1;10850;Red;0;",
//                     "1;11030;Red;0;",
//                     "1;11210;Red;0;",
//                     "1;11390;Red;1;Red",
//                     "1;11515;Red;0;",
//                     "6;11630;Cyan;0;"
//                   ],
//                   "SegmentsCount": 6,
//                   "BlinkEnabled": false,
//                   "RpmMode": 2,
//                   "RelativeToRedline": false,
//                   "BlinkOnLastGear": false,
//                   "StartPosition": 6,
//                   "ContainerType": "RPMSegments",
//                   "Description": "Show leds solid color segments based on car RPMs copy"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "6th"
//             },
//             {
//               "TriggerFormula": {
//                 "Expression": "in([Gear],7)"
//               },
//               "LedContainers": [
//                 {
//                   "BlinkDelay": 250,
//                   "Segments": [
//                     "1;11400;Red;0;",
//                     "1;11445;Red;0;",
//                     "1;11490;Red;0;",
//                     "1;11535;Red;1;Red",
//                     "1;11560;Red;0;",
//                     "6;11595;Cyan;0;"
//                   ],
//                   "SegmentsCount": 6,
//                   "BlinkEnabled": false,
//                   "RpmMode": 2,
//                   "RelativeToRedline": false,
//                   "BlinkOnLastGear": false,
//                   "StartPosition": 6,
//                   "ContainerType": "RPMSegments",
//                   "Description": "Show leds solid color segments based on car RPMs copy"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "7th"
//             },
//             {
//               "TriggerFormula": {
//                 "Expression": "in([Gear],8)"
//               },
//               "LedContainers": [
//                 {
//                   "BlinkDelay": 250,
//                   "Segments": [
//                     "1;13250;Red;0;",
//                     "1;13280;Red;0;",
//                     "1;13310;Red;0;",
//                     "1;13340;Red;1;Red",
//                     "1;13362;Red;0;",
//                     "6;13385;Cyan;0;"
//                   ],
//                   "SegmentsCount": 6,
//                   "BlinkEnabled": false,
//                   "RpmMode": 2,
//                   "RelativeToRedline": false,
//                   "BlinkOnLastGear": false,
//                   "StartPosition": 6,
//                   "ContainerType": "RPMSegments",
//                   "Description": "Show leds solid color segments based on car RPMs copy"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "8th"
//             }
//           ],
//           "ContainerType": "Base.Group",
//           "Description": "REV lights"
//         },
//         {
//           "TriggerFormula": {
//             "Expression": "if(isnull([GameRawData.Telemetry.OilPress],0)<1.6,true,false)"
//           },
//           "ClearBackgroundWhenActive": true,
//           "LedContainers": [
//             {
//               "Animation": {
//                 "Columns": 15,
//                 "Rows": 1,
//                 "Frames": [
//                   {
//                     "Colors": "0,0,LawnGreen;0,2,LawnGreen;0,4,LawnGreen;0,6,Red;0,8,Red;0,10,Turquoise;0,12,Turquoise;0,14,Turquoise",
//                     "FrameDuration": 150
//                   },
//                   {
//                     "Colors": "0,1,LawnGreen;0,3,LawnGreen;0,5,Red;0,7,Red;0,9,Red;0,11,Turquoise;0,13,Turquoise",
//                     "FrameDuration": 150
//                   }
//                 ],
//                 "PenColor": "Red"
//               },
//               "StartPosition": 2,
//               "ContainerType": "Animation"
//             }
//           ],
//           "ContainerType": "Groups.CustomConditionalGroup"
//         },
//         {
//           "ClearBackgroundWhenActive": true,
//           "LedContainers": [
//             {
//               "Animation": {
//                 "Columns": 15,
//                 "Rows": 1,
//                 "Frames": [
//                   {
//                     "Colors": "0,0,#000000;0,7,Red;0,5,#000000;0,3,#000000;0,4,#00FF00;0,2,#000000;0,6,#000000;0,1,#000000;0,8,#000000;0,9,#000000;0,10,#00FFFF;0,11,#000000;0,12,#000000;0,13,#000000;0,14,#000000",
//                     "FrameDuration": 100
//                   }
//                 ],
//                 "PenColor": "Black"
//               },
//               "ContainerType": "Animation"
//             }
//           ],
//           "StartPosition": 2,
//           "ContainerType": "Groups.GameCarSpeedLimiterGroup"
//         },
//         {
//           "LedContainers": [
//             {
//               "EnabledFormula": {
//                 "Expression": "[GameRawData.Telemetry.DRS_Status] = '1' "
//               },
//               "BlinkFormula": {
//                 "Expression": ""
//               },
//               "IdleColor": "Transparent",
//               "IdleBlinkingColor": "Transparent",
//               "EnableIdleBlinking": false,
//               "LedCount": 1,
//               "Color": "Chartreuse",
//               "BlinkingColor": "Transparent",
//               "BlinkEnabled": false,
//               "StartPosition": 4,
//               "ContainerType": "CustomStatus"
//             },
//             {
//               "IdleColor": "Transparent",
//               "IdleBlinkingColor": "Transparent",
//               "EnableIdleBlinking": false,
//               "LedCount": 2,
//               "Color": "Chartreuse",
//               "BlinkingColor": "Transparent",
//               "BlinkEnabled": true,
//               "BlinkDelay": 150,
//               "StartPosition": 4,
//               "ContainerType": "Status.DrsAvailable",
//               "Description": "Generates a static color when the DRS is available"
//             },
//             {
//               "IdleColor": "Transparent",
//               "IdleBlinkingColor": "Transparent",
//               "EnableIdleBlinking": false,
//               "LedCount": 4,
//               "Color": "Chartreuse",
//               "BlinkingColor": "Transparent",
//               "BlinkEnabled": false,
//               "StartPosition": 4,
//               "ContainerType": "Status.DrsOn",
//               "Description": "Generates a static color when the DRS is ON"
//             }
//           ],
//           "ContainerType": "Base.Group",
//           "Description": "DRS"
//         }
//       ],
//       "ContainerType": "Groups.CustomConditionalGroup"
//     }
//   ],
//   "ContainerType": "Groups.GameCarModelGroup",
//   "Description": "Mercedes W12"
// }


export const mercedesW12 = (numLeds) => (car) => {
  const drsLeds = numLeds < 14 ? 2 : 4
  const actualNumLeds = numLeds < drsLeds ? numLeds : numLeds - drsLeds

  const processContainers = (container) => {
    const result = { ...container }

    if (result.LedContainers) {
      result.LedContainers = result.LedContainers.map(processContainers)
    }

    switch (result.ContainerType) {
      case "RPMSegments":
        return downsizeRPMSegmentsContainer(result, actualNumLeds, drsLeds + 1)

      case "Animation":
        return downsizeAnimationContainer(result, numLeds)

      case "CustomStatus":
        return {
          ...result,
          StartPosition: 1,
          LedCount: 1
        }

      case "Groups.GameCarSpeedLimiterGroup":
        return {
          ...result,
          StartPosition: 1,
        }

      case "Status.DrsAvailable":
        return {
          ...result,
          StartPosition: 1,
          LedCount: drsLeds - (drsLeds == 4 ? 2 : 1)
        }

      case "Status.DrsOn":
        return {
          ...result,
          StartPosition: 1,
          LedCount: drsLeds
        }

      default:
        return result
    }
  }

  return processContainers(car)
}