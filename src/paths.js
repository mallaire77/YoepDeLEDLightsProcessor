// Left Module  
const leftModulePath = ['LedContainers', { field: 'Description', value: 'LEFT MODULE' }]

// Right Module
const rightModulePath = ['LedContainers', { field: 'Description', value: 'RIGHT MODULE' }]

// Cars
const carsPath = ['LedContainers', { field: 'Description', value: 'Cars' }]

// Car Classes
const gt3Path = [...carsPath, 'LedContainers', { field: 'Description', value: 'GT3' }]
const gt4Path = [...carsPath, 'LedContainers', { field: 'Description', value: 'GT4' }]
const prototypePath = [...carsPath, 'LedContainers', { field: 'Description', value: 'Prototype' }]
const openWheelPath = [...carsPath, 'LedContainers', { field: 'Description', value: 'Open Wheel' }]

// Open Wheel - Feeder Series
const openWheelFeederSeriesPath = [...openWheelPath, 'LedContainers', { field: 'Description', value: 'Feeder Series' }]
const fiaF4Path = [...openWheelFeederSeriesPath, 'LedContainers', { field: 'Description', value: 'FIA F4' }]

// Open Wheel - Formula 1
const openWheelFormula1Path = [...openWheelPath, 'LedContainers', { field: 'Description', value: 'Formula 1' }]
const mercedesW12Path = [...openWheelFormula1Path, 'LedContainers', { field: 'CarModel', value: 'Mercedes W12' }]
const mercedesW13Path = [...openWheelFormula1Path, 'LedContainers', { field: 'CarModel', value: 'Mercedes-AMG W13 E Performance' }]

// Open Wheel - Super Formula
const openWheelSuperFormulaPath = [...openWheelPath, 'LedContainers', { field: 'Description', value: 'Super Formula' }]

// Open Wheel - Various
const openWheelVariousPath = [...openWheelPath, 'LedContainers', { field: 'Description', value: 'Various' }]

// Miscellaneous
const carsNotRunningPath = ['LedContainers', { field: 'Description', value: 'ENGINE OFF' }]
const gameNotRunningPath = ['LedContainers', { field: 'Description', value: 'iRACING NOT RUNNING = OFF' }]

export const deprecatedPaths = {
    rpmPath: ['LedContainers', { field: 'Description', value: 'RPM' }],
    rightSideFocusedPath: ['LedContainers', { field: 'Description', value: 'RPM' }, 'LedContainers', { field: 'Description', value: 'Rightside focused' }],
    middleFocusedPath: ['LedContainers', { field: 'Description', value: 'RPM' }, 'LedContainers', { field: 'Description', value: 'Middle Focused ' }],
    middleFocusedPrototypePath: ['LedContainers', { field: 'Description', value: 'RPM' }, 'LedContainers', { field: 'Description', value: 'Middle Focused ' }, 'LedContainers', { field: 'Description', value: 'Prototype' }, 'LedContainers'],
    movedMiddleFocusedPath: ['LedContainers', { field: 'Description', value: 'Middle Focused ' }],
    wipPath: ['LedContainers', { field: 'Description', value: 'WIP' }],
    testLedsGameDataPath: ['TestLedsGameData'],
    hpdArx01Path: ['LedContainers', { field: 'Description', value: 'RPM' }, 'LedContainers', { field: 'Description', value: 'Rightside focused' }, 'LedContainers', { field: 'Description', value: 'Prototype' }, 'LedContainers', { field: 'CarModel', value: 'HPD ARX-01c' }],
}

export const paths = {
    leftModulePath,
    rightModulePath,
    carsPath,
    gt3Path,
    gt4Path,
    prototypePath,
    openWheelPath,
    fiaF4Path,
    mercedesW12Path,
    mercedesW13Path,
    carsNotRunningPath,
    gameNotRunningPath
}