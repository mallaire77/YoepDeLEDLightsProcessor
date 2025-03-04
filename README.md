# Yoep-de-LEDLights Processor
Tool to downsize Yoep de Light profiles.

## Usage

**Run**
```
node src/main.js
```

**Test**
```
node --experimental-vm-modules node_modules/jest/bin/jest.js
``` 

## Optional Parameters
| Parameter | Description | Valid Range | Default |
|-----------|-------------|-------------|-------------|
| --version | The Yoep de Light profile version | N/A | 20250102 |
| --left | Number of LED segments for the left module | 0-3 | 3 |l
| --middle | Number of LED segments for the middle/RPM module | 0-16 | 16 |
| --right | Number of LED segments for the right module | 0-3 | 3 |
| --custom-left-start | Custom starting position for the left module | N/A | N/A |
| --custom-middle-start | Custom starting position for the middle module, this will ignore the logic to add the left module end position. | N/A | N/A |
| --custom-right-start | Custom starting position for the middle module, this will ignore the logic to add the middle module end position. | N/A | N/A |
| --wheel | If specified use the specified wheel's configuration, this will ignore all other parameters. Valid list of wheels below. | N/A | N/A |
| --pre-process | Pre-process only | N/A | N/A |
| --debug | Whether to output debug logs | N/A | N/A |

## Wheels
| Wheel | Description | Key |
|-----------|-------------|-------------|
| Leoxz XGT Pro (*RPM Lights*) | This will generate the profile for the RPM led segments | *leoxz_xgt_pro_rpm* |
| Leoxz XGT Pro (*Left & Right Modules*) | This will generate the profile for the left & right modules, this profile is meant to be applied to the button leds | *leoxz_xgt_pro_lr_modules*

## Example
```
node src/main.js --left 3 --middle 9 --right 3
```

This command will:
- Configure the left module with 3 segments starting at position 1
- Configure the middle/RPM module with 9 segments starting after the left module
- Configure the right module with 3 segments starting after the middle module