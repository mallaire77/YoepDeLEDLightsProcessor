// {
//   "CarModel": "McLaren 720S GT3 EVO",
//   "LedContainers": [
//     {
//       "LedContainers": [
//         {
//           "TriggerFormula": {
//             "Expression": "in(isnull([Gear],0),'R','N')"
//           },
//           "LedContainers": [
//             {
//               "BlinkDelay": 125,
//               "Segments": [
//                 "1;4175;Lime;0;",
//                 "1;4590;Lime;0;",
//                 "1;5010;#FFFF00;0;",
//                 "1;5430;#FFFF00;0;",
//                 "2;5850;#FF5200;0;",
//                 "1;6270;#FF5200;0;",
//                 "1;6690;#FF0000;0;",
//                 "1;7110;#FF0000;0;"
//               ],
//               "SegmentsCount": 8,
//               "BlinkEnabled": false,
//               "RpmMode": 2,
//               "RelativeToRedline": false,
//               "BlinkOnLastGear": false,
//               "StartPosition": 4,
//               "ContainerType": "RPMSegments"
//             },
//             {
//               "TriggerFormula": {
//                 "Expression": "isnull([Rpms],0)>=7530"
//               },
//               "ClearBackgroundWhenActive": true,
//               "LedContainers": [
//                 {
//                   "IdleBlinkingColor": "Transparent",
//                   "EnableIdleBlinking": false,
//                   "LedCount": 11,
//                   "Color": "Blue",
//                   "BlinkingColor": "Transparent",
//                   "BlinkEnabled": false,
//                   "BlinkDelay": 250,
//                   "StartPosition": 4,
//                   "ContainerType": "StaticColor"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "1st Redline"
//             },
//             {
//               "TriggerFormula": {
//                 "Expression": "isnull([Rpms],0)>=7950"
//               },
//               "LedContainers": [
//                 {
//                   "Animation": {
//                     "Columns": 11,
//                     "Rows": 1,
//                     "Frames": [
//                       {
//                         "Colors": "0,0,Red;0,2,Red;0,4,Red;0,5,Red;0,6,Red;0,8,Red;0,10,Red",
//                         "FrameDuration": 100
//                       }
//                     ],
//                     "PenColor": "Red"
//                   },
//                   "StartPosition": 4,
//                   "ContainerType": "Animation"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "2nd Redline"
//             }
//           ],
//           "ContainerType": "Groups.CustomConditionalGroup",
//           "Description": "R / N"
//         },
//         {
//           "TriggerFormula": {
//             "Expression": "in(isnull([Gear],0),1)"
//           },
//           "LedContainers": [
//             {
//               "BlinkDelay": 125,
//               "Segments": [
//                 "1;5185;Lime;0;",
//                 "1;5442;Lime;0;",
//                 "1;5695;#FFFF00;0;",
//                 "1;5953;#FFFF00;0;",
//                 "2;6212;#FF5200;0;",
//                 "1;6472;#FF5200;0;",
//                 "1;6727;#FF0000;0;",
//                 "1;6983;#FF0000;0;"
//               ],
//               "SegmentsCount": 8,
//               "BlinkEnabled": false,
//               "RpmMode": 2,
//               "RelativeToRedline": false,
//               "BlinkOnLastGear": false,
//               "StartPosition": 4,
//               "ContainerType": "RPMSegments"
//             },
//             {
//               "TriggerFormula": {
//                 "Expression": "isnull([Rpms],0)>=7245"
//               },
//               "ClearBackgroundWhenActive": true,
//               "LedContainers": [
//                 {
//                   "IdleBlinkingColor": "Transparent",
//                   "EnableIdleBlinking": false,
//                   "LedCount": 11,
//                   "Color": "Blue",
//                   "BlinkingColor": "Transparent",
//                   "BlinkEnabled": false,
//                   "BlinkDelay": 250,
//                   "StartPosition": 4,
//                   "ContainerType": "StaticColor"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "1st Redline"
//             },
//             {
//               "TriggerFormula": {
//                 "Expression": "isnull([Rpms],0)>=7500"
//               },
//               "LedContainers": [
//                 {
//                   "Animation": {
//                     "Columns": 11,
//                     "Rows": 1,
//                     "Frames": [
//                       {
//                         "Colors": "0,0,Red;0,2,Red;0,4,Red;0,5,Red;0,6,Red;0,8,Red;0,10,Red",
//                         "FrameDuration": 100
//                       }
//                     ],
//                     "PenColor": "Red"
//                   },
//                   "StartPosition": 4,
//                   "ContainerType": "Animation"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "2nd Redline"
//             }
//           ],
//           "ContainerType": "Groups.CustomConditionalGroup",
//           "Description": "1"
//         },
//         {
//           "TriggerFormula": {
//             "Expression": "in(isnull([Gear],0),2)"
//           },
//           "LedContainers": [
//             {
//               "BlinkDelay": 125,
//               "Segments": [
//                 "1;5480;Lime;0;",
//                 "1;5675;Lime;0;",
//                 "1;5872;#FFFF00;0;",
//                 "1;6067;#FFFF00;0;",
//                 "2;6265;#FF5200;0;",
//                 "1;6460;#FF5200;0;",
//                 "1;6657;#FF0000;0;",
//                 "1;6850;#FF0000;0;"
//               ],
//               "SegmentsCount": 8,
//               "BlinkEnabled": false,
//               "RpmMode": 2,
//               "RelativeToRedline": false,
//               "BlinkOnLastGear": false,
//               "StartPosition": 4,
//               "ContainerType": "RPMSegments"
//             },
//             {
//               "TriggerFormula": {
//                 "Expression": "isnull([Rpms],0)>=7050"
//               },
//               "ClearBackgroundWhenActive": true,
//               "LedContainers": [
//                 {
//                   "IdleBlinkingColor": "Transparent",
//                   "EnableIdleBlinking": false,
//                   "LedCount": 11,
//                   "Color": "Blue",
//                   "BlinkingColor": "Transparent",
//                   "BlinkEnabled": false,
//                   "BlinkDelay": 250,
//                   "StartPosition": 4,
//                   "ContainerType": "StaticColor"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "1st Redline"
//             },
//             {
//               "TriggerFormula": {
//                 "Expression": "isnull([Rpms],0)>=7250"
//               },
//               "LedContainers": [
//                 {
//                   "Animation": {
//                     "Columns": 11,
//                     "Rows": 1,
//                     "Frames": [
//                       {
//                         "Colors": "0,0,Red;0,2,Red;0,4,Red;0,5,Red;0,6,Red;0,8,Red;0,10,Red",
//                         "FrameDuration": 100
//                       }
//                     ],
//                     "PenColor": "Red"
//                   },
//                   "StartPosition": 4,
//                   "ContainerType": "Animation"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "2nd Redline"
//             }
//           ],
//           "ContainerType": "Groups.CustomConditionalGroup",
//           "Description": "2"
//         },
//         {
//           "TriggerFormula": {
//             "Expression": "in(isnull([Gear],0),3)"
//           },
//           "LedContainers": [
//             {
//               "BlinkDelay": 125,
//               "Segments": [
//                 "1;5675;Lime;0;",
//                 "1;5830;Lime;0;",
//                 "1;5995;#FFFF00;0;",
//                 "1;6155;#FFFF00;0;",
//                 "2;6315;#FF5200;0;",
//                 "1;6478;#FF5200;0;",
//                 "1;6641;#FF0000;0;",
//                 "1;6803;#FF0000;0;"
//               ],
//               "SegmentsCount": 8,
//               "BlinkEnabled": false,
//               "RpmMode": 2,
//               "RelativeToRedline": false,
//               "BlinkOnLastGear": false,
//               "StartPosition": 4,
//               "ContainerType": "RPMSegments"
//             },
//             {
//               "TriggerFormula": {
//                 "Expression": "isnull([Rpms],0)>=6964"
//               },
//               "ClearBackgroundWhenActive": true,
//               "LedContainers": [
//                 {
//                   "IdleBlinkingColor": "Transparent",
//                   "EnableIdleBlinking": false,
//                   "LedCount": 11,
//                   "Color": "Blue",
//                   "BlinkingColor": "Transparent",
//                   "BlinkEnabled": false,
//                   "BlinkDelay": 250,
//                   "StartPosition": 4,
//                   "ContainerType": "StaticColor"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "1st Redline"
//             },
//             {
//               "TriggerFormula": {
//                 "Expression": "isnull([Rpms],0)>=7125"
//               },
//               "LedContainers": [
//                 {
//                   "Animation": {
//                     "Columns": 11,
//                     "Rows": 1,
//                     "Frames": [
//                       {
//                         "Colors": "0,0,Red;0,2,Red;0,4,Red;0,5,Red;0,6,Red;0,8,Red;0,10,Red",
//                         "FrameDuration": 100
//                       }
//                     ],
//                     "PenColor": "Red"
//                   },
//                   "StartPosition": 4,
//                   "ContainerType": "Animation"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "2nd Redline"
//             }
//           ],
//           "ContainerType": "Groups.CustomConditionalGroup",
//           "Description": "3"
//         },
//         {
//           "TriggerFormula": {
//             "Expression": "in(isnull([Gear],0),4)"
//           },
//           "LedContainers": [
//             {
//               "BlinkDelay": 125,
//               "Segments": [
//                 "1;5803;Lime;0;",
//                 "1;5939;Lime;0;",
//                 "1;6071;#FFFF00;0;",
//                 "1;6208;#FFFF00;0;",
//                 "2;6346;#FF5200;0;",
//                 "1;6479;#FF5200;0;",
//                 "1;6617;#FF0000;0;",
//                 "1;6751;#FF0000;0;"
//               ],
//               "SegmentsCount": 8,
//               "BlinkEnabled": false,
//               "RpmMode": 2,
//               "RelativeToRedline": false,
//               "BlinkOnLastGear": false,
//               "StartPosition": 4,
//               "ContainerType": "RPMSegments"
//             },
//             {
//               "TriggerFormula": {
//                 "Expression": "isnull([Rpms],0)>=6888"
//               },
//               "ClearBackgroundWhenActive": true,
//               "LedContainers": [
//                 {
//                   "IdleBlinkingColor": "Transparent",
//                   "EnableIdleBlinking": false,
//                   "LedCount": 11,
//                   "Color": "Blue",
//                   "BlinkingColor": "Transparent",
//                   "BlinkEnabled": false,
//                   "BlinkDelay": 250,
//                   "StartPosition": 4,
//                   "ContainerType": "StaticColor"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "1st Redline"
//             },
//             {
//               "TriggerFormula": {
//                 "Expression": "isnull([Rpms],0)>=7025"
//               },
//               "LedContainers": [
//                 {
//                   "Animation": {
//                     "Columns": 11,
//                     "Rows": 1,
//                     "Frames": [
//                       {
//                         "Colors": "0,0,Red;0,2,Red;0,4,Red;0,5,Red;0,6,Red;0,8,Red;0,10,Red",
//                         "FrameDuration": 100
//                       }
//                     ],
//                     "PenColor": "Red"
//                   },
//                   "StartPosition": 4,
//                   "ContainerType": "Animation"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "2nd Redline"
//             }
//           ],
//           "ContainerType": "Groups.CustomConditionalGroup",
//           "Description": "4"
//         },
//         {
//           "TriggerFormula": {
//             "Expression": "in(isnull([Gear],0),5)"
//           },
//           "LedContainers": [
//             {
//               "BlinkDelay": 125,
//               "Segments": [
//                 "1;5910;Lime;0;",
//                 "1;6027;Lime;0;",
//                 "1;6144;#FFFF00;0;",
//                 "1;6264;#FFFF00;0;",
//                 "2;6382;#FF5200;0;",
//                 "1;6501;#FF5200;0;",
//                 "1;6617;#FF0000;0;",
//                 "1;6736;#FF0000;0;"
//               ],
//               "SegmentsCount": 8,
//               "BlinkEnabled": false,
//               "RpmMode": 2,
//               "RelativeToRedline": false,
//               "BlinkOnLastGear": false,
//               "StartPosition": 4,
//               "ContainerType": "RPMSegments"
//             },
//             {
//               "TriggerFormula": {
//                 "Expression": "isnull([Rpms],0)>=6857"
//               },
//               "ClearBackgroundWhenActive": true,
//               "LedContainers": [
//                 {
//                   "IdleBlinkingColor": "Transparent",
//                   "EnableIdleBlinking": false,
//                   "LedCount": 11,
//                   "Color": "Blue",
//                   "BlinkingColor": "Transparent",
//                   "BlinkEnabled": false,
//                   "BlinkDelay": 250,
//                   "StartPosition": 4,
//                   "ContainerType": "StaticColor"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "1st Redline"
//             },
//             {
//               "TriggerFormula": {
//                 "Expression": "isnull([Rpms],0)>=6973"
//               },
//               "LedContainers": [
//                 {
//                   "Animation": {
//                     "Columns": 11,
//                     "Rows": 1,
//                     "Frames": [
//                       {
//                         "Colors": "0,0,Red;0,2,Red;0,4,Red;0,5,Red;0,6,Red;0,8,Red;0,10,Red",
//                         "FrameDuration": 100
//                       }
//                     ],
//                     "PenColor": "Red"
//                   },
//                   "StartPosition": 4,
//                   "ContainerType": "Animation"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "2nd Redline"
//             }
//           ],
//           "ContainerType": "Groups.CustomConditionalGroup",
//           "Description": "5"
//         },
//         {
//           "TriggerFormula": {
//             "Expression": "in(isnull([Gear],0),6)"
//           },
//           "LedContainers": [
//             {
//               "BlinkDelay": 125,
//               "Segments": [
//                 "1;6775;Lime;0;",
//                 "1;6948;Lime;0;",
//                 "1;7121;#FFFF00;0;",
//                 "1;7298;#FFFF00;0;",
//                 "2;7475;#FF5200;0;",
//                 "1;7648;#FF5200;0;",
//                 "1;7823;#FF0000;0;",
//                 "1;8000;#FF0000;0;"
//               ],
//               "SegmentsCount": 8,
//               "BlinkEnabled": false,
//               "RpmMode": 2,
//               "RelativeToRedline": false,
//               "BlinkOnLastGear": false,
//               "StartPosition": 4,
//               "ContainerType": "RPMSegments"
//             },
//             {
//               "TriggerFormula": {
//                 "Expression": "isnull([Rpms],0)>=8010"
//               },
//               "ClearBackgroundWhenActive": true,
//               "LedContainers": [
//                 {
//                   "IdleBlinkingColor": "Transparent",
//                   "EnableIdleBlinking": false,
//                   "LedCount": 11,
//                   "Color": "Blue",
//                   "BlinkingColor": "Transparent",
//                   "BlinkEnabled": false,
//                   "BlinkDelay": 250,
//                   "StartPosition": 4,
//                   "ContainerType": "StaticColor"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "1st Redline"
//             },
//             {
//               "TriggerFormula": {
//                 "Expression": "isnull([Rpms],0)>=8020"
//               },
//               "LedContainers": [
//                 {
//                   "Animation": {
//                     "Columns": 11,
//                     "Rows": 1,
//                     "Frames": [
//                       {
//                         "Colors": "0,0,Red;0,2,Red;0,4,Red;0,5,Red;0,6,Red;0,8,Red;0,10,Red",
//                         "FrameDuration": 100
//                       }
//                     ],
//                     "PenColor": "Red"
//                   },
//                   "StartPosition": 4,
//                   "ContainerType": "Animation"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "2nd Redline"
//             }
//           ],
//           "ContainerType": "Groups.CustomConditionalGroup",
//           "Description": "6"
//         }
//       ],
//       "ContainerType": "Base.Group",
//       "Description": "RPM"
//     },
//     {
//       "LedContainers": [
//         {
//           "IdleBlinkingColor": "Transparent",
//           "EnableIdleBlinking": false,
//           "LedCount": 11,
//           "Color": "Lime",
//           "BlinkingColor": "Transparent",
//           "BlinkEnabled": false,
//           "StartPosition": 4,
//           "ContainerType": "StaticColor",
//           "Description": "Pit Speed safe"
//         },
//         {
//           "TriggerFormula": {
//             "Expression": "if(isnull([SpeedKmh],0)>.5+(left(isnull([GameRawData.SessionData.WeekendInfo.TrackPitSpeedLimit],0),0,5)),true,false)"
//           },
//           "LedContainers": [
//             {
//               "IdleBlinkingColor": "Transparent",
//               "EnableIdleBlinking": false,
//               "LedCount": 11,
//               "Color": "Black",
//               "BlinkingColor": "Transparent",
//               "BlinkEnabled": false,
//               "StartPosition": 4,
//               "ContainerType": "StaticColor",
//               "Description": "Blackout"
//             },
//             {
//               "TriggerFormula": {
//                 "Expression": "if(isnull([SpeedKmh],0)>=.5+(left(isnull([GameRawData.SessionData.WeekendInfo.TrackPitSpeedLimit],0),0,5)),true,false)"
//               },
//               "ClearBackgroundWhenActive": true,
//               "LedContainers": [
//                 {
//                   "Animation": {
//                     "Columns": 11,
//                     "Rows": 1,
//                     "Frames": [
//                       {
//                         "Colors": "0,5,#FFFF00;0,4,#FFFF00;0,6,Yellow",
//                         "FrameDuration": 100
//                       }
//                     ],
//                     "PenColor": "Yellow"
//                   },
//                   "StartPosition": 4,
//                   "ContainerType": "Animation"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "1-4 over"
//             },
//             {
//               "TriggerFormula": {
//                 "Expression": "if(isnull([SpeedKmh],0)>=3+(left(isnull([GameRawData.SessionData.WeekendInfo.TrackPitSpeedLimit],0),0,5)),true,false)"
//               },
//               "ClearBackgroundWhenActive": true,
//               "LedContainers": [
//                 {
//                   "Animation": {
//                     "Columns": 11,
//                     "Rows": 1,
//                     "Frames": [
//                       {
//                         "Colors": "0,7,#FFFF00;0,3,#FFFF00;0,2,#FFFF00;0,8,Yellow",
//                         "FrameDuration": 100
//                       }
//                     ],
//                     "PenColor": "Yellow"
//                   },
//                   "StartPosition": 4,
//                   "ContainerType": "Animation"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "4-10 over"
//             },
//             {
//               "TriggerFormula": {
//                 "Expression": "if(isnull([SpeedKmh],0)>=10+(left(isnull([GameRawData.SessionData.WeekendInfo.TrackPitSpeedLimit],0),0,5)),true,false)"
//               },
//               "ClearBackgroundWhenActive": true,
//               "LedContainers": [
//                 {
//                   "Animation": {
//                     "Columns": 11,
//                     "Rows": 1,
//                     "Frames": [
//                       {
//                         "Colors": "0,0,Red;0,1,Red;0,9,Red;0,10,Red",
//                         "FrameDuration": 100
//                       }
//                     ],
//                     "PenColor": "Red"
//                   },
//                   "StartPosition": 4,
//                   "ContainerType": "Animation"
//                 }
//               ],
//               "ContainerType": "Groups.CustomConditionalGroup",
//               "Description": "10-20 over"
//             },
//             {
//               "EnabledFormula": {
//                 "Expression": "if(isnull([SpeedKmh],0)>=20+(left(isnull([GameRawData.SessionData.WeekendInfo.TrackPitSpeedLimit],0),0,5)),true,false)"
//               },
//               "BlinkFormula": {
//                 "Expression": ""
//               },
//               "IdleColor": "Transparent",
//               "IdleBlinkingColor": "Transparent",
//               "EnableIdleBlinking": false,
//               "LedCount": 11,
//               "Color": "Black",
//               "BlinkingColor": "Transparent",
//               "BlinkEnabled": false,
//               "StartPosition": 4,
//               "ContainerType": "CustomStatus",
//               "Description": "20+ over"
//             }
//           ],
//           "ContainerType": "Groups.CustomConditionalGroup",
//           "Description": "Pit Speed High"
//         }
//       ],
//       "ContainerType": "Groups.GameCarSpeedLimiterGroup"
//     }
//   ],
//   "ContainerType": "Groups.GameCarModelGroup",
//   "Description": "McLaren 720S GT3 EVO"
// }