import { downsizeRPMSegmentsContainer } from './common.js'

// {
//   "CarModel": "BMW M2 CS Racing",
//   "LedContainers": [
//     {
//       "LedContainers": [
//         {
//           "TriggerFormula": {
//             "Expression": "in(isnull([Gear],0),'N','R',1)"
//           },
//           "LedContainers": [
//             {
//               "BlinkDelay": 250,
//               "Segments": [
//                 "1;5970;Lime;1;Lime",
//                 "1;6240;Lime;1;Lime",
//                 "1;6510;Yellow;1;Yellow",
//                 "1;6780;Yellow;1;Yellow",
//                 "3;7050;Red;0;",
//                 "1;6780;Yellow;1;Yellow",
//                 "1;6510;Yellow;1;Yellow",
//                 "1;6240;Lime;1;Lime",
//                 "1;5970;Lime;1;Lime"
//               ],
//               "SegmentsCount": 9,
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
//           "Description": "R / N / 1st"
//         },
//         {
//           "TriggerFormula": {
//             "Expression": "in(isnull([Gear],0),2)"
//           },
//           "LedContainers": [
//             {
//               "BlinkDelay": 250,
//               "Segments": [
//                 "1;5990;Lime;1;Lime",
//                 "1;6230;Lime;1;Lime",
//                 "1;6470;Yellow;1;Yellow",
//                 "1;6710;Yellow;1;Yellow",
//                 "3;6950;Red;0;",
//                 "1;6710;Yellow;1;Yellow",
//                 "1;6470;Yellow;1;Yellow",
//                 "1;6230;Lime;1;Lime",
//                 "1;5990;Lime;1;Lime"
//               ],
//               "SegmentsCount": 9,
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
//             "Expression": "in(isnull([Gear],0),3)"
//           },
//           "LedContainers": [
//             {
//               "BlinkDelay": 250,
//               "Segments": [
//                 "1;6190;Lime;1;Lime",
//                 "1;6330;Lime;1;Lime",
//                 "1;6470;Yellow;1;Yellow",
//                 "1;6610;Yellow;1;Yellow",
//                 "3;6750;Red;0;",
//                 "1;6610;Yellow;1;Yellow",
//                 "1;6470;Yellow;1;Yellow",
//                 "1;6330;Lime;1;Lime",
//                 "1;6190;Lime;1;Lime"
//               ],
//               "SegmentsCount": 9,
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
//             "Expression": "in(isnull([Gear],0),4)"
//           },
//           "LedContainers": [
//             {
//               "BlinkDelay": 250,
//               "Segments": [
//                 "1;6450;Lime;1;Lime",
//                 "1;6500;Lime;1;Lime",
//                 "1;6550;Yellow;1;Yellow",
//                 "1;6600;Yellow;1;Yellow",
//                 "3;6650;Red;0;",
//                 "1;6600;Yellow;1;Yellow",
//                 "1;6550;Yellow;1;Yellow",
//                 "1;6500;Lime;1;Lime",
//                 "1;6450;Lime;1;Lime"
//               ],
//               "SegmentsCount": 9,
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
//             "Expression": "in(isnull([Gear],0),5,6,7)"
//           },
//           "LedContainers": [
//             {
//               "BlinkDelay": 250,
//               "Segments": [
//                 "1;6370;Lime;1;Lime",
//                 "1;6390;Lime;1;Lime",
//                 "1;6410;Yellow;1;Yellow",
//                 "1;6430;Yellow;1;Yellow",
//                 "3;6450;Red;0;",
//                 "1;6430;Yellow;1;Yellow",
//                 "1;6410;Yellow;1;Yellow",
//                 "1;6390;Lime;1;Lime",
//                 "1;6370;Lime;1;Lime"
//               ],
//               "SegmentsCount": 9,
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
//           "Description": "5th / 6th / 7th"
//         }
//       ],
//       "ContainerType": "Base.Group",
//       "Description": "RPM"
//     }
//   ],
//   "ContainerType": "Groups.GameCarModelGroup",
//   "Description": "BMW M2 CS Racing"
// }
export const m2 = (numLeds) => (car) => {
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