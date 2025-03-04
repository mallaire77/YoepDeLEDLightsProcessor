import { downsizeRPMSegmentsContainer } from './common.js'

// {
//   "CarModel": "Ferrari 499P",
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
//                 "Expression": "in(isnull([Gear],0),'R','N')"
//               },
//               "LedContainers": [
//                 {
//                   "BlinkDelay": 125,
//                   "Segments": [
//                     "1;0;#00FF00;0;",
//                     "1;0;#00FF00;0;",
//                     "1;3840;#00FF00;0;",
//                     "1;4370;#FFFF00;0;",
//                     "2;4900;#FFFF00;0;",
//                     "1;5430;#FFFF00;0;",
//                     "1;5961;#FFFF00;0;",
//                     "1;6490;#FF0000;0;",
//                     "1;7020;#FF0000;0;",
//                     "1;7550;#FF0000;0;"
//                   ],
//                   "SegmentsCount": 10,
//                   "BlinkEnabled": false,
//                   "RpmMode": 2,
//                   "RelativeToRedline": false,
//                   "BlinkOnLastGear": false,
//                   "StartPosition": 4,
//                   "ContainerType": "RPMSegments",
//                   "Description": "Show leds solid color segments based on car RPMs"
//                 },
//                 {
//                   "EnabledFormula": {
//                     "Expression": "isnull([Rpms],0) >= '7590'"
//                   },
//                   "BlinkFormula": {
//                     "Expression": ""
//                   },
//                   "IdleColor": "Transparent",
//                   "IdleBlinkingColor": "Transparent",
//                   "EnableIdleBlinking": false,
//                   "LedCount": 13,
//                   "Color": "Red",
//                   "BlinkingColor": "Black",
//                   "BlinkEnabled": true,
//                   "BlinkDelay": 250,
//                   "StartPosition": 2,
//                   "ContainerType": "CustomStatus",
//                   "Description": "REDLINE"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "R / N"
//             },
//             {
//               "TriggerFormula": {
//                 "Expression": "isnull([Gear],0)=1"
//               },
//               "LedContainers": [
//                 {
//                   "BlinkDelay": 125,
//                   "Segments": [
//                     "1;3818;#00FF00;0;",
//                     "1;4038;#00FF00;0;",
//                     "1;4330;#00FF00;0;",
//                     "1;4640;#FFFF00;0;",
//                     "2;4964;#FFFF00;0;",
//                     "1;5305;#FFFF00;0;",
//                     "1;5658;#FFFF00;0;",
//                     "1;6019;#FF0000;0;",
//                     "1;6378;#FF0000;0;",
//                     "1;6740;#FF0000;0;"
//                   ],
//                   "SegmentsCount": 10,
//                   "BlinkEnabled": false,
//                   "RpmMode": 2,
//                   "RelativeToRedline": false,
//                   "BlinkOnLastGear": false,
//                   "StartPosition": 4,
//                   "ContainerType": "RPMSegments",
//                   "Description": "Show leds solid color segments based on car RPMs"
//                 },
//                 {
//                   "EnabledFormula": {
//                     "Expression": "isnull([Rpms],0) >= '6779'"
//                   },
//                   "BlinkFormula": {
//                     "Expression": ""
//                   },
//                   "IdleColor": "Transparent",
//                   "IdleBlinkingColor": "Transparent",
//                   "EnableIdleBlinking": false,
//                   "LedCount": 13,
//                   "Color": "Red",
//                   "BlinkingColor": "Black",
//                   "BlinkEnabled": true,
//                   "BlinkDelay": 250,
//                   "StartPosition": 2,
//                   "ContainerType": "CustomStatus",
//                   "Description": "REDLINE"
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
//                   "BlinkDelay": 125,
//                   "Segments": [
//                     "1;5994;#00FF00;0;",
//                     "1;6125;#00FF00;0;",
//                     "1;6265;#00FF00;0;",
//                     "1;6400;#FFFF00;0;",
//                     "2;6530;#FFFF00;0;",
//                     "1;6660;#FFFF00;0;",
//                     "1;6795;#FFFF00;0;",
//                     "1;6925;#FF0000;0;",
//                     "1;7060;#FF0000;0;",
//                     "1;7185;#FF0000;0;"
//                   ],
//                   "SegmentsCount": 10,
//                   "BlinkEnabled": false,
//                   "RpmMode": 2,
//                   "RelativeToRedline": false,
//                   "BlinkOnLastGear": false,
//                   "StartPosition": 4,
//                   "ContainerType": "RPMSegments",
//                   "Description": "Show leds solid color segments based on car RPMs"
//                 },
//                 {
//                   "EnabledFormula": {
//                     "Expression": "isnull([Rpms],0) >= '7260'"
//                   },
//                   "BlinkFormula": {
//                     "Expression": ""
//                   },
//                   "IdleColor": "Transparent",
//                   "IdleBlinkingColor": "Transparent",
//                   "EnableIdleBlinking": false,
//                   "LedCount": 13,
//                   "Color": "Red",
//                   "BlinkingColor": "Black",
//                   "BlinkEnabled": true,
//                   "BlinkDelay": 250,
//                   "StartPosition": 3,
//                   "ContainerType": "CustomStatus",
//                   "Description": "REDLINE"
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
//                   "BlinkDelay": 125,
//                   "Segments": [
//                     "1;6460;#00FF00;0;",
//                     "1;6560;#00FF00;0;",
//                     "1;6660;#00FF00;0;",
//                     "1;6760;#FFFF00;0;",
//                     "2;6860;#FFFF00;0;",
//                     "1;6960;#FFFF00;0;",
//                     "1;7060;#FFFF00;0;",
//                     "1;7160;#FF0000;0;",
//                     "1;7260;#FF0000;0;",
//                     "1;7356;#FF0000;0;"
//                   ],
//                   "SegmentsCount": 10,
//                   "BlinkEnabled": false,
//                   "RpmMode": 2,
//                   "RelativeToRedline": false,
//                   "BlinkOnLastGear": false,
//                   "StartPosition": 4,
//                   "ContainerType": "RPMSegments",
//                   "Description": "Show leds solid color segments based on car RPMs"
//                 },
//                 {
//                   "EnabledFormula": {
//                     "Expression": "isnull([Rpms],0) >= '7395'"
//                   },
//                   "BlinkFormula": {
//                     "Expression": ""
//                   },
//                   "IdleColor": "Transparent",
//                   "IdleBlinkingColor": "Transparent",
//                   "EnableIdleBlinking": false,
//                   "LedCount": 13,
//                   "Color": "Red",
//                   "BlinkingColor": "Black",
//                   "BlinkEnabled": true,
//                   "BlinkDelay": 250,
//                   "StartPosition": 2,
//                   "ContainerType": "CustomStatus",
//                   "Description": "REDLINE"
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
//                   "BlinkDelay": 125,
//                   "Segments": [
//                     "1;6545;#00FF00;0;",
//                     "1;6645;#00FF00;0;",
//                     "1;6745;#00FF00;0;",
//                     "1;6845;#FFFF00;0;",
//                     "2;6945;#FFFF00;0;",
//                     "1;7045;#FFFF00;0;",
//                     "1;7145;#FFFF00;0;",
//                     "1;7240;#FF0000;0;",
//                     "1;7340;#FF0000;0;",
//                     "1;7435;#FF0000;0;"
//                   ],
//                   "SegmentsCount": 10,
//                   "BlinkEnabled": false,
//                   "RpmMode": 2,
//                   "RelativeToRedline": false,
//                   "BlinkOnLastGear": false,
//                   "StartPosition": 4,
//                   "ContainerType": "RPMSegments",
//                   "Description": "Show leds solid color segments based on car RPMs"
//                 },
//                 {
//                   "EnabledFormula": {
//                     "Expression": "isnull([Rpms],0) >= '7475'"
//                   },
//                   "BlinkFormula": {
//                     "Expression": ""
//                   },
//                   "IdleColor": "Transparent",
//                   "IdleBlinkingColor": "Transparent",
//                   "EnableIdleBlinking": false,
//                   "LedCount": 13,
//                   "Color": "Red",
//                   "BlinkingColor": "Black",
//                   "BlinkEnabled": true,
//                   "BlinkDelay": 250,
//                   "StartPosition": 2,
//                   "ContainerType": "CustomStatus",
//                   "Description": "REDLINE"
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
//                   "BlinkDelay": 125,
//                   "Segments": [
//                     "1;6665;#00FF00;0;",
//                     "1;6755;#00FF00;0;",
//                     "1;6850;#00FF00;0;",
//                     "1;6940;#FFFF00;0;",
//                     "2;7032;#FFFF00;0;",
//                     "1;7125;#FFFF00;0;",
//                     "1;7210;#FFFF00;0;",
//                     "1;7301;#FF0000;0;",
//                     "1;7389;#FF0000;0;",
//                     "1;7475;#FF0000;0;"
//                   ],
//                   "SegmentsCount": 10,
//                   "BlinkEnabled": false,
//                   "RpmMode": 2,
//                   "RelativeToRedline": false,
//                   "BlinkOnLastGear": false,
//                   "StartPosition": 4,
//                   "ContainerType": "RPMSegments",
//                   "Description": "Show leds solid color segments based on car RPMs"
//                 },
//                 {
//                   "EnabledFormula": {
//                     "Expression": "isnull([Rpms],0) >= '7515'"
//                   },
//                   "BlinkFormula": {
//                     "Expression": ""
//                   },
//                   "IdleColor": "Transparent",
//                   "IdleBlinkingColor": "Transparent",
//                   "EnableIdleBlinking": false,
//                   "LedCount": 13,
//                   "Color": "Red",
//                   "BlinkingColor": "Black",
//                   "BlinkEnabled": true,
//                   "BlinkDelay": 250,
//                   "StartPosition": 2,
//                   "ContainerType": "CustomStatus",
//                   "Description": "REDLINE"
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
//                   "BlinkDelay": 125,
//                   "Segments": [
//                     "1;6675;#00FF00;0;",
//                     "1;6785;#00FF00;0;",
//                     "1;6898;#00FF00;0;",
//                     "1;7008;#FFFF00;0;",
//                     "2;7118;#FFFF00;0;",
//                     "1;7228;#FFFF00;0;",
//                     "1;7338;#FFFF00;0;",
//                     "1;7450;#FF0000;0;",
//                     "1;7559;#FF0000;0;",
//                     "1;7670;#FF0000;0;"
//                   ],
//                   "SegmentsCount": 10,
//                   "BlinkEnabled": false,
//                   "RpmMode": 2,
//                   "RelativeToRedline": false,
//                   "BlinkOnLastGear": false,
//                   "StartPosition": 4,
//                   "ContainerType": "RPMSegments",
//                   "Description": "Show leds solid color segments based on car RPMs"
//                 },
//                 {
//                   "EnabledFormula": {
//                     "Expression": "isnull([Rpms],0) >= '7710'"
//                   },
//                   "BlinkFormula": {
//                     "Expression": ""
//                   },
//                   "IdleColor": "Transparent",
//                   "IdleBlinkingColor": "Transparent",
//                   "EnableIdleBlinking": false,
//                   "LedCount": 13,
//                   "Color": "Red",
//                   "BlinkingColor": "Black",
//                   "BlinkEnabled": true,
//                   "BlinkDelay": 250,
//                   "StartPosition": 2,
//                   "ContainerType": "CustomStatus",
//                   "Description": "REDLINE"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "6th"
//             },
//             {
//               "TriggerFormula": {
//                 "Expression": "isnull([Gear],0)=7"
//               },
//               "LedContainers": [
//                 {
//                   "BlinkDelay": 125,
//                   "Segments": [
//                     "1;6840;#00FF00;0;",
//                     "1;6953;#00FF00;0;",
//                     "1;7070;#00FF00;0;",
//                     "1;7182;#FFFF00;0;",
//                     "2;7294;#FFFF00;0;",
//                     "1;7408;#FFFF00;0;",
//                     "1;7520;#FFFF00;0;",
//                     "1;7632;#FF0000;0;",
//                     "1;7748;#FF0000;0;",
//                     "1;7863;#FF0000;0;"
//                   ],
//                   "SegmentsCount": 10,
//                   "BlinkEnabled": false,
//                   "RpmMode": 2,
//                   "RelativeToRedline": false,
//                   "BlinkOnLastGear": false,
//                   "StartPosition": 4,
//                   "ContainerType": "RPMSegments",
//                   "Description": "Show leds solid color segments based on car RPMs"
//                 },
//                 {
//                   "EnabledFormula": {
//                     "Expression": "isnull([Rpms],0) >= '7900'"
//                   },
//                   "BlinkFormula": {
//                     "Expression": ""
//                   },
//                   "IdleColor": "Transparent",
//                   "IdleBlinkingColor": "Transparent",
//                   "EnableIdleBlinking": false,
//                   "LedCount": 13,
//                   "Color": "Red",
//                   "BlinkingColor": "Black",
//                   "BlinkEnabled": true,
//                   "BlinkDelay": 250,
//                   "StartPosition": 2,
//                   "ContainerType": "CustomStatus",
//                   "Description": "REDLINE"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "7th"
//             }
//           ],
//           "ContainerType": "Base.Group",
//           "Description": "RPM"
//         },
//         {
//           "EnabledFormula": {
//             "Expression": "isnull([SpeedKmh],0)<117"
//           },
//           "BlinkFormula": {
//             "Expression": ""
//           },
//           "IdleColor": "Transparent",
//           "IdleBlinkingColor": "Transparent",
//           "EnableIdleBlinking": false,
//           "LedCount": 1,
//           "Color": "Red",
//           "BlinkingColor": "Transparent",
//           "BlinkEnabled": false,
//           "StartPosition": 3,
//           "ContainerType": "CustomStatus",
//           "Description": "'MGU' LED",
//           "IsEnabled": false
//         }
//       ],
//       "ContainerType": "Groups.CustomConditionalGroup",
//       "Description": "Power"
//     }
//   ],
//   "ContainerType": "Groups.GameCarModelGroup",
//   "Description": "Ferrari 499P"
// }
export const p499 = (numLeds) => (car) => {
  const processContainers = (container) => {
    const result = { ...container }

    if (result.LedContainers) {
      result.LedContainers = result.LedContainers.map(processContainers)
    }

    switch (result.ContainerType) {
      case "RPMSegments":
        console.log({ result })
        const after = downsizeRPMSegmentsContainer(result, numLeds)
        console.log({ after })
        return after

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
