// Root
const rootPath = []

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
const mercedesW12ContainerPath = [...mercedesW12Path, 'LedContainers', { field: 'ContainerType', value: 'Groups.CustomConditionalGroup' }, 'LedContainers']
const mercedesW13Path = [...openWheelFormula1Path, 'LedContainers', { field: 'CarModel', value: 'Mercedes-AMG W13 E Performance' }]
const mercedesW13ContainerPath = [...mercedesW13Path, 'LedContainers', { field: 'ContainerType', value: 'Groups.CustomConditionalGroup' }, 'LedContainers']

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
    hpdArx01PathEven: ['LedContainers', { field: 'Description', value: 'RPM' }, 'LedContainers', { field: 'Description', value: 'Rightside focused' }, 'LedContainers', { field: 'CarModel', value: 'HPD ARX-01c' }],
    hpdArx01PathUneven: ['LedContainers', { field: 'Description', value: 'RPM' }, 'LedContainers', { field: 'Description', value: 'Rightside focused' }, 'LedContainers', { field: 'Description', value: 'Prototype' }, 'LedContainers', { field: 'CarModel', value: 'HPD ARX-01c' }],
    leftModuleFormula1Path: [...leftModulePath, 'LedContainers', { field: 'Description', value: 'Open Wheel' }, 'LedContainers', { field: 'Description', value: 'Formula 1' }],
    leftModuleMercedesW12DrsPath: [...leftModulePath, 'LedContainers', { field: 'Description', value: 'Open Wheel' }, 'LedContainers', { field: 'Description', value: 'Formula 1' }, 'LedContainers', { field: 'CarModel', value: 'Mercedes W12' }, 'LedContainers', { field: 'ContainerType', value: 'Groups.CustomConditionalGroup' }, 'LedContainers', { field: 'Description', value: 'DRS' }],
    leftModuleMercedesW13DrsPath: [...leftModulePath, 'LedContainers', { field: 'Description', value: 'Open Wheel' }, 'LedContainers', { field: 'Description', value: 'Formula 1' }, 'LedContainers', { field: 'CarModel', value: 'Mercedes-AMG W13 E Performance' }, 'LedContainers', { field: 'ContainerType', value: 'Groups.CustomConditionalGroup' }, 'LedContainers', { field: 'Description', value: 'DRS' }]
}

export const paths = {
    rootPath,
    leftModulePath,
    rightModulePath,
    carsPath,
    gt3Path,
    gt4Path,
    prototypePath,
    openWheelPath,
    fiaF4Path,
    mercedesW12Path,
    mercedesW12ContainerPath,
    mercedesW13Path,
    mercedesW13ContainerPath,
    carsNotRunningPath,
    gameNotRunningPath
}