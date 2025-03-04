// Root
const rootPath = []

// Left Module  
const leftModulePath = ['LedContainers', { field: 'Description', value: 'LEFT MODULE' }]

// Right Module
const rightModulePath = ['LedContainers', { field: 'Description', value: 'RIGHT MODULE' }]

// Cars
const carsPath = ['LedContainers', { field: 'Description', value: 'Cars' }]

// Various
const variousPath = [...carsPath, 'LedContainers', { field: 'Description', value: 'Various' }]
const mx5Path = [...variousPath, 'LedContainers', { field: 'CarModel', value: 'Mazda MX-5 Cup' }]
const gr86Path = [...variousPath, 'LedContainers', { field: 'CarModel', value: 'Toyota GR86' }]
const m2Path = [...variousPath, 'LedContainers', { field: 'CarModel', value: 'BMW M2 CS Racing' }]

// Prototype
const prototypePath = [...carsPath, 'LedContainers', { field: 'Description', value: 'Prototype' }]
const p499Path = [...prototypePath, 'LedContainers', { field: 'CarModel', value: 'Ferrari 499P' }]
const p217Path = [...prototypePath, 'LedContainers', { field: 'CarModel', value: 'Dallara P217 LMP2' }]
const vSeriesRPath = [...prototypePath, 'LedContainers', { field: 'CarModel', value: 'Cadillac V-Series.R' }]

// GT3
const gt3Path = [...carsPath, 'LedContainers', { field: 'Description', value: 'GT3' }]
const gt3296Path = [...gt3Path, 'LedContainers', { field: 'CarModel', value: 'Ferrari 296 GT3' }]
const gt3Amg2020Path = [...gt3Path, 'LedContainers', { field: 'CarModel', value: 'Mercedes-AMG GT3 2020' }]
const gt3911RPath = [...gt3Path, 'LedContainers', { field: 'CarModel', value: 'Porsche 911 GT3 R (992)' }]
const gt3720sPath = [...gt3Path, 'LedContainers', { field: 'CarModel', value: 'McLaren 720S GT3 EVO' }]
const gt3M4Path = [...gt3Path, 'LedContainers', { field: 'CarModel', value: 'BMW M4 GT3' }]

// Open Wheel - Various
const openWheelPath = [...carsPath, 'LedContainers', { field: 'Description', value: 'Open Wheel' }]
const openWheelVariousPath = [...openWheelPath, 'LedContainers', { field: 'Description', value: 'Various' }]
const formulaVeePath = [...openWheelVariousPath, 'LedContainers', { field: 'CarModel', value: 'Formula Vee' }]
const formulaFordPath = [...openWheelVariousPath, 'LedContainers', { field: 'CarModel', value: 'Ray Formula 1600' }]
const formula2000Path = [...openWheelVariousPath, 'LedContainers', { field: 'CarModel', value: 'Skip Barber Formula 2000' }]

// Open Wheel - Feeder Series
const openWheelFeederSeriesPath = [...openWheelPath, 'LedContainers', { field: 'Description', value: 'Feeder Series' }]
const f4Path = [...openWheelFeederSeriesPath, 'LedContainers', { field: 'CarModel', value: 'FIA F4' }]
const f3Path = [...openWheelFeederSeriesPath, 'LedContainers', { field: 'CarModel', value: 'Dallara F312 F3' }]

// Open Wheel - Super Formula
const superFormulaPath = [...openWheelPath, 'LedContainers', { field: 'Description', value: 'Super Formula' }]
const superFormulaLightsPath = [...superFormulaPath, 'LedContainers', { field: 'CarModel', value: 'Super Formula Lights 324' }]
const superFormulaHondaPath = [...superFormulaPath, 'LedContainers', { field: 'CarModel', value: 'Super Formula SF23 - Honda' }]
const superFormulaToyotaPath = [...superFormulaPath, 'LedContainers', { field: 'CarModel', value: 'Super Formula SF23 - Toyota' }]

// Open Wheel - Formula 1
const openWheelFormula1Path = [...openWheelPath, 'LedContainers', { field: 'Description', value: 'Formula 1' }]
const mercedesW12Path = [...openWheelFormula1Path, 'LedContainers', { field: 'CarModel', value: 'Mercedes W12' }]
const mercedesW12ContainerPath = [...mercedesW12Path, 'LedContainers', { field: 'ContainerType', value: 'Groups.CustomConditionalGroup' }, 'LedContainers']
const mercedesW13Path = [...openWheelFormula1Path, 'LedContainers', { field: 'CarModel', value: 'Mercedes-AMG W13 E Performance' }]
const mercedesW13ContainerPath = [...mercedesW13Path, 'LedContainers', { field: 'ContainerType', value: 'Groups.CustomConditionalGroup' }, 'LedContainers']

// Miscellaneous
const carsNotRunningPath = ['LedContainers', { field: 'Description', value: 'ENGINE OFF' }]
const gameNotRunningPath = ['LedContainers', { field: 'Description', value: 'iRACING NOT RUNNING = OFF' }]

export const paths = {
    rootPath,
    leftModulePath,
    rightModulePath,
    carsPath,

    // Various
    variousPath,
    mx5Path,
    gr86Path,
    m2Path,

    // Prototype
    prototypePath,
    p499Path,
    p217Path,
    vSeriesRPath,

    // GT3
    gt3Path,
    gt3296Path,
    gt3Amg2020Path,
    gt3911RPath,
    gt3720sPath,
    gt3M4Path,

    // Open Wheel
    openWheelPath,
    formulaVeePath,
    formulaFordPath,
    formula2000Path,
    f4Path,
    f3Path,
    superFormulaLightsPath,
    superFormulaHondaPath,
    superFormulaToyotaPath,
    mercedesW12Path,
    mercedesW12ContainerPath,
    mercedesW13Path,
    mercedesW13ContainerPath,

    carsNotRunningPath,
    gameNotRunningPath
}

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