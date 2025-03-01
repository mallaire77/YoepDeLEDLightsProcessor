# Yoep-de-LEDLights Processor
This tool allows you to post-process a Yoep-de-LEDLights adding the ability to go down to 3 LEDs in the middle, and disabling the left & right modules completely.

## Usage
```
node main.js --file <profile.json> --left <count> --middle <count> --right <count>
```

## Required Parameters
| Parameter | Description | Valid Range |
|-----------|-------------|-------------|
| --file | Path to the JSON profile file to modify | Valid file path |
| --left | Number of LED segments for the left module | 0-3 |
| --middle | Number of LED segments for the middle/RPM module | 3-15 |
| --right | Number of LED segments for the right module | 0-3 |

## Example
```
node main.js --file 20250102_Yoep_de_LEDLights_3_15_3.ledsprofile --left 3 --middle 9 --right 3
```

This command will:
- Configure the left module with 3 segments starting at position 1
- Configure the middle/RPM module with 9 segments starting after the left module
- Configure the right module with 3 segments starting after the middle module