# Yoep-de-LEDLights Processor
Tool to downsize default (*16 & 15 leds*) Yoep de Light profiles.

## Usage

**Run**
```
node src/main.js
```

## Optional Parameters
| Parameter | Description | Valid Range | Default |
|-----------|-------------|-------------|-------------|
| --version | The Yoep de Light profile version | N/A | 20250102 |
| --left | Number of LED segments for the left module | 0-3 | 3 |l
| --middle | Number of LED segments for the middle/RPM module | 0-16 | 16 |
| --right | Number of LED segments for the right module | 0-3 | 3 |
| --leds | How many total leds, used to determine how many leds we should turn off when car or game is not running | N/A | left + middle + right |
| --brightness | Set the profile brightness | N/A | 100 |
| --custom-left-start | Custom starting position for the left module | N/A | 1 |
| --custom-middle-start | Custom starting position for the middle module, this will ignore the logic to add the left module end position. | N/A | custom-left-start + 1 |
| --custom-right-start | Custom starting position for the middle module, this will ignore the logic to add the middle module end position. | N/A | custom-middle-start + 1 |
| --reverse-left-module | If specified, reverses the order of LED segments in the left module | N/A | false |
| --reverse-right-module | If specified, reverses the order of LED segments in the right module | N/A | false |
| --pre-process | Pre-process only | N/A | false |
| --wheel | If specified use the specified wheel's configuration, this will ignore all other parameters. Valid list of wheels below. | N/A | N/A |


## Wheels
| Wheel | Description | Key |
|-----------|-------------|-------------|
| Leoxz XGT Pro (*RPM Lights*) | This will generate the profile for the RPM led segments | *leoxz_xgt_pro_rpm* |
| Leoxz XGT Pro (*Button Lights*) | This will generate the profile for the left & right modules applied to the left and right most button clusters | *leoxz_xgt_pro_buttons*

## Example
```
node src/main.js --left 3 --middle 9 --right 3
```

This command will:
- Configure the left module with 3 segments starting at position 1
- Configure the middle/RPM module with 9 segments starting after the left module
- Configure the right module with 3 segments starting after the middle module
<br>
<br>
```
node src/main.js --wheel leoxz_xgt_pro_rpm
node src/main.js --wheel leoxz_xgt_pro_buttons
```

This command will:
- Create the profile perfectly for the Leoxz XGT Pro Wheel RPM lights
- Create the profile perfectly for the Leoxz XGT Pro Wheel Button lights

## Supported Cars

### Various
- Mazda MX-5 Cup
- Toyota GR86
- BMW M2 CS Racing
- Radical SR8
- Radical SR10
- SCCA Spec Racer Ford

### GT4
- Porsche 718 Cayman GT4
- Mercedes AMG GT4
- McLaren 570S GT4
- BMW M4 G82 GT4
- BMW M4 GT4
- Aston Martin Vantage GT4

### GT3
- Ferrari 296 GT3
- Ferrari 488 GT3 Evo
- Mercedes-AMG GT3 2020
- Porsche 911 GT3 R (992)
- Porsche 911 GT3 Cup (992)
- McLaren 720S GT3 EVO
- BMW M4 GT3
- Acura NSX GT3 EVO 22
- Audi R8 LMS EVO II GT3
- Lamborghini Huracan GT3 EVO
- Ford Mustang GT3
- Chevrolet Corvette Z06 GT3.R

### Prototype
- Ferrari 499P
- Dallara P217 LMP2
- Cadillac V-Series.R
- Acura ARX-06
- BMW M Hybrid V8
- Porsche 963 GTP
- Ligier JS P320

### Open-Wheel Various
- Formula Vee
- Ray Formula 1600
- Skip Barber Formula 2000

### Open-Wheel Feeder
- FIA F4
- Dallara F312 F3

### Open-Wheel Super Formula 
- Super Formula Lights 324
- Super Formula SF23 - Honda
- Super Formula SF23 - Toyota

### Open-Wheel Formuala 1
- Mercedes W12
- Mercedes-AMG W13 E Performance