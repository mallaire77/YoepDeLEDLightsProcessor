import { downsizeRPMSegmentsContainer } from './common.js'

// {
//   "CarModel": "Dallara P217 LMP2",
//   "LedContainers": [
//     {
//       "TriggerFormula": {
//         "Expression": "if([Gear]!='N',0,\r\n\r\nif(inertia([GameRawData.Telemetry.Voltage],150)=1,0,\r\n\r\nif(isincreasing(5000,[GameRawData.Telemetry.Voltage]),0,\r\n\r\nif(isdecreasing(5000,[GameRawData.Telemetry.EnterExitReset]),\r\n\r\nif(isincreasing(5000,[IsInPitLane]),0,1),\r\n\r\nif([Gear]='N',1,0)))))\r\n"
//       },
//       "LedContainers": [
//         {
//           "BlinkDelay": 125,
//           "Segments": [
//             "2;27;Chartreuse;0;",
//             "2;27;Red;0;",
//             "3;27;Red;0;",
//             "1;27;Red;0;",
//             "1;27;Cyan;0;",
//             "2;27;Cyan;0;"
//           ],
//           "SegmentsCount": 6,
//           "BlinkEnabled": false,
//           "RpmMode": 0,
//           "RelativeToRedline": false,
//           "BlinkOnLastGear": false,
//           "StartPosition": 4,
//           "ContainerType": "RPMSegments",
//           "Description": "Show leds solid color segments based on car RPMs"
//         }
//       ],
//       "ContainerType": "Groups.CustomConditionalGroup",
//       "Description": "N"
//     },
//     {
//       "TriggerFormula": {
//         "Expression": "if(inertia([GameRawData.Telemetry.Voltage],150)=1,1,\r\n\r\nif(isincreasing(5000,[GameRawData.Telemetry.Voltage]),0,\r\n\r\nif(isdecreasing(5000,[GameRawData.Telemetry.EnterExitReset]),\r\n\r\nif(isincreasing(5000,[IsInPitLane]),0,1)\r\n\r\n,1)\r\n\r\n))"
//       },
//       "LedContainers": [
//         {
//           "TriggerFormula": {
//             "Expression": "if(inertia([GameRawData.Telemetry.Voltage],150)=1,0,\r\n\r\nif(isincreasing(5000,[GameRawData.Telemetry.Voltage]),0,\r\n\r\nif(isdecreasing(5000,[GameRawData.Telemetry.EnterExitReset]),\r\n\r\nif(isincreasing(5000,[IsInPitLane]),0,0)\r\n\r\n,\r\n\r\nif([Gear]='R',1,0))))\r\n"
//           },
//           "LedContainers": [
//             {
//               "BlinkDelay": 125,
//               "Segments": [
//                 "2;2000;Chartreuse;0;",
//                 "2;4000;Red;0;",
//                 "3;5000;Red;0;",
//                 "1;6000;Red;0;",
//                 "1;6000;Cyan;0;",
//                 "2;7000;Cyan;0;"
//               ],
//               "SegmentsCount": 6,
//               "BlinkEnabled": false,
//               "RpmMode": 2,
//               "RelativeToRedline": false,
//               "BlinkOnLastGear": false,
//               "StartPosition": 4,
//               "ContainerType": "RPMSegments",
//               "Description": "Show leds solid color segments based on car RPMs"
//             }
//           ],
//           "ContainerType": "Groups.CustomConditionalGroup",
//           "Description": "R"
//         },
//         {
//           "TriggerFormula": {
//             "Expression": "[Gear] = '1'"
//           },
//           "LedContainers": [
//             {
//               "BlinkDelay": 125,
//               "Segments": [
//                 "2;6200;Chartreuse;0;",
//                 "2;6650;Red;0;",
//                 "3;7000;Red;0;",
//                 "1;7300;Red;0;",
//                 "1;7300;Cyan;0;",
//                 "2;7600;Cyan;0;"
//               ],
//               "SegmentsCount": 6,
//               "BlinkEnabled": false,
//               "RpmMode": 2,
//               "RelativeToRedline": false,
//               "BlinkOnLastGear": false,
//               "StartPosition": 4,
//               "ContainerType": "RPMSegments",
//               "Description": "Show leds solid color segments based on car RPMs"
//             }
//           ],
//           "ContainerType": "Groups.CustomConditionalGroup",
//           "Description": "1st"
//         },
//         {
//           "TriggerFormula": {
//             "Expression": "[Gear] = '2'"
//           },
//           "LedContainers": [
//             {
//               "BlinkDelay": 125,
//               "Segments": [
//                 "2;6400;Chartreuse;0;",
//                 "2;6800;Red;0;",
//                 "3;7200;Red;0;",
//                 "1;7550;Red;0;",
//                 "1;7550;Cyan;0;",
//                 "2;7750;Cyan;0;"
//               ],
//               "SegmentsCount": 6,
//               "BlinkEnabled": false,
//               "RpmMode": 2,
//               "RelativeToRedline": false,
//               "BlinkOnLastGear": false,
//               "StartPosition": 4,
//               "ContainerType": "RPMSegments",
//               "Description": "Show leds solid color segments based on car RPMs"
//             }
//           ],
//           "ContainerType": "Groups.CustomConditionalGroup",
//           "Description": "2nd"
//         },
//         {
//           "TriggerFormula": {
//             "Expression": "[Gear] = '3'"
//           },
//           "LedContainers": [
//             {
//               "BlinkDelay": 125,
//               "Segments": [
//                 "2;6800;Chartreuse;0;",
//                 "2;7100;Red;0;",
//                 "3;7400;Red;0;",
//                 "1;7650;Red;0;",
//                 "1;7650;Cyan;0;",
//                 "2;7800;Cyan;0;"
//               ],
//               "SegmentsCount": 6,
//               "BlinkEnabled": false,
//               "RpmMode": 2,
//               "RelativeToRedline": false,
//               "BlinkOnLastGear": false,
//               "StartPosition": 4,
//               "ContainerType": "RPMSegments",
//               "Description": "Show leds solid color segments based on car RPMs"
//             }
//           ],
//           "ContainerType": "Groups.CustomConditionalGroup",
//           "Description": "3rd"
//         },
//         {
//           "TriggerFormula": {
//             "Expression": "[Gear] = '4'"
//           },
//           "LedContainers": [
//             {
//               "BlinkDelay": 125,
//               "Segments": [
//                 "2;6850;Chartreuse;0;",
//                 "2;7150;Red;0;",
//                 "3;7450;Red;0;",
//                 "1;7650;Red;0;",
//                 "1;7650;Cyan;0;",
//                 "2;7850;Cyan;0;"
//               ],
//               "SegmentsCount": 6,
//               "BlinkEnabled": false,
//               "RpmMode": 2,
//               "RelativeToRedline": false,
//               "BlinkOnLastGear": false,
//               "StartPosition": 4,
//               "ContainerType": "RPMSegments",
//               "Description": "Show leds solid color segments based on car RPMs"
//             }
//           ],
//           "ContainerType": "Groups.CustomConditionalGroup",
//           "Description": "4th"
//         },
//         {
//           "TriggerFormula": {
//             "Expression": "[Gear] = '5'"
//           },
//           "LedContainers": [
//             {
//               "BlinkDelay": 125,
//               "Segments": [
//                 "2;7000;Chartreuse;0;",
//                 "2;7300;Red;0;",
//                 "3;7550;Red;0;",
//                 "1;7750;Red;0;",
//                 "1;7750;Cyan;0;",
//                 "2;7900;Cyan;0;"
//               ],
//               "SegmentsCount": 6,
//               "BlinkEnabled": false,
//               "RpmMode": 2,
//               "RelativeToRedline": false,
//               "BlinkOnLastGear": false,
//               "StartPosition": 4,
//               "ContainerType": "RPMSegments",
//               "Description": "Show leds solid color segments based on car RPMs"
//             }
//           ],
//           "ContainerType": "Groups.CustomConditionalGroup",
//           "Description": "5th"
//         },
//         {
//           "TriggerFormula": {
//             "Expression": "[Gear] = '6'"
//           },
//           "LedContainers": [
//             {
//               "BlinkDelay": 125,
//               "Segments": [
//                 "2;7500;Chartreuse;0;",
//                 "2;7800;Red;0;",
//                 "3;8000;Red;0;",
//                 "1;8200;Red;0;",
//                 "1;8200;Cyan;0;",
//                 "2;8400;Cyan;0;"
//               ],
//               "SegmentsCount": 6,
//               "BlinkEnabled": false,
//               "RpmMode": 2,
//               "RelativeToRedline": false,
//               "BlinkOnLastGear": false,
//               "StartPosition": 4,
//               "ContainerType": "RPMSegments",
//               "Description": "Show leds solid color segments based on car RPMs"
//             }
//           ],
//           "ContainerType": "Groups.CustomConditionalGroup",
//           "Description": "6th"
//         }
//       ],
//       "ContainerType": "Groups.CustomConditionalGroup"
//     }
//   ],
//   "ContainerType": "Groups.GameCarModelGroup",
//   "Description": "Dallara P217 LMP2"
// }
export const p217 = (numLeds) => (car) => {
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
