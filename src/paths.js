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

// // Open Wheel
const openWheelFeederSeriesPath = [...openWheelPath, 'LedContainers', { field: 'Description', value: 'Feeder Series' }]
const openWheelSuperFormulaPath = [...openWheelPath, 'LedContainers', { field: 'Description', value: 'Super Formula' }]
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
    carsNotRunningPath,
    gameNotRunningPath
}