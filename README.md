# Yoep-de-LEDLights Processor
Tool to downsize Yoep de Light profiles.

## Usage
```
node src/main.js --file <profile.json> --left <count> --middle <count> --right <count>
```

## Required Parameters
| Parameter | Description | Valid Range |
|-----------|-------------|-------------|
| --file | Path to the JSON profile file to modify | Valid file path |
| --left | Number of LED segments for the left module | 0-3 |
| --middle | Number of LED segments for the middle/RPM module | 6-16 |
| --right | Number of LED segments for the right module | 0-3 |

## Optional Parameters
| Parameter | Description |
|-----------|-------------|
| --debug | Outputs a specific path from the profile instead of saving the file |


## Example
```
node src/main.js --file 20250102_Yoep_de_LEDLights_3_15_3.ledsprofile --left 3 --middle 9 --right 3
```

This command will:
- Configure the left module with 3 segments starting at position 1
- Configure the middle/RPM module with 9 segments starting after the left module
- Configure the right module with 3 segments starting after the middle module