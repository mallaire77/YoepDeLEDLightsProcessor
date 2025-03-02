# Yoep-de-LEDLights Processor
Tool to downsize Yoep de Light profiles.

## Usage
```
node src/main.js
```

## Optional Parameters
| Parameter | Description | Valid Range | Default |
|-----------|-------------|-------------|-------------|
| --version | The Yoep de Light profile version | N/A | 20250102 |
| --left | Number of LED segments for the left module | 0-3 | 3 |
| --middle | Number of LED segments for the middle/RPM module | 0-16 | 16 |
| --right | Number of LED segments for the right module | 0-3 | 3 |
| --debug | Outputs a specific path from the profile instead of saving the file | N/A | N/A |

## Example
```
node src/main.js --left 3 --middle 9 --right 3
```

This command will:
- Configure the left module with 3 segments starting at position 1
- Configure the middle/RPM module with 9 segments starting after the left module
- Configure the right module with 3 segments starting after the middle module