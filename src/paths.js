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
const variousMx5Path = [...variousPath, 'LedContainers', { field: 'CarModel', value: 'Mazda MX-5 Cup' }]
const variousGr86Path = [...variousPath, 'LedContainers', { field: 'CarModel', value: 'Toyota GR86' }]
const variousM2Path = [...variousPath, 'LedContainers', { field: 'CarModel', value: 'BMW M2 CS Racing' }]
const variousRadicalSR8Path = [...variousPath, 'LedContainers', { field: 'CarModel', value: 'Radical SR8' }]
const variousRadicalSR10Path = [...variousPath, 'LedContainers', { field: 'CarModel', value: 'Radical SR10' }]
const variousScaaSpecPath = [...variousPath, 'LedContainers', { field: 'CarModel', value: 'SCCA Spec Racer Ford' }]

// Prototype
const prototypePath = [...carsPath, 'LedContainers', { field: 'Description', value: 'Prototype' }]
const prototypeP499Path = [...prototypePath, 'LedContainers', { field: 'CarModel', value: 'Ferrari 499P' }]
const prototypeP217Path = [...prototypePath, 'LedContainers', { field: 'CarModel', value: 'Dallara P217 LMP2' }]
const prototypeVSeriesRPath = [...prototypePath, 'LedContainers', { field: 'CarModel', value: 'Cadillac V-Series.R' }]
const prototypeArx06Path = [...prototypePath, 'LedContainers', { field: 'CarModel', value: 'Acura ARX-06' }]
const prototypeMHybridV8Path = [...prototypePath, 'LedContainers', { field: 'CarModel', value: 'BMW M Hybrid V8' }]
const prototype963Path = [...prototypePath, 'LedContainers', { field: 'CarModel', value: 'Porsche 963 GTP' }]
const prototypeJsP320Path = [...prototypePath, 'LedContainers', { field: 'CarModel', value: 'Ligier JS P320' }]

// GT3
const gt3Path = [...carsPath, 'LedContainers', { field: 'Description', value: 'GT3' }]
const gt3296Path = [...gt3Path, 'LedContainers', { field: 'CarModel', value: 'Ferrari 296 GT3' }]
const gt3Amg2020Path = [...gt3Path, 'LedContainers', { field: 'CarModel', value: 'Mercedes-AMG GT3 2020' }]
const gt3911RPath = [...gt3Path, 'LedContainers', { field: 'CarModel', value: 'Porsche 911 GT3 R (992)' }]
const gt3720sPath = [...gt3Path, 'LedContainers', { field: 'CarModel', value: 'McLaren 720S GT3 EVO' }]
const gt3M4Path = [...gt3Path, 'LedContainers', { field: 'CarModel', value: 'BMW M4 GT3' }]
const gt3NSXPath = [...gt3Path, 'LedContainers', { field: 'CarModel', value: 'Acura NSX GT3 EVO 22' }]
const gt3AudiPath = [...gt3Path, 'LedContainers', { field: 'CarModel', value: 'Audi R8 LMS EVO II GT3' }]
const gt3LamborghiniPath = [...gt3Path, 'LedContainers', { field: 'CarModel', value: 'Lamborghini Huracan GT3 EVO' }]
const gt3MustangPath = [...gt3Path, 'LedContainers', { field: 'CarModel', value: 'Ford Mustang GT3' }]
const gt3CorvettePath = [...gt3Path, 'LedContainers', { field: 'CarModel', value: 'Chevrolet Corvette Z06 GT3.R' }]

// GT3 - Porsche Cup
const gt3PorscheCupPath = [...carsPath, 'LedContainers', { field: 'Description', value: 'Porsche Cup' }]
const gt3992CupPath = [...gt3PorscheCupPath, 'LedContainers', { field: 'CarModel', value: 'Porsche 911 GT3 Cup (992)' }]
const gt3991CupPath = [...gt3PorscheCupPath, 'LedContainers', { field: 'CarModel', value: 'Porsche 911 GT3 Cup (991)' }]

// GT4
const gt4Path = [...carsPath, 'LedContainers', { field: 'Description', value: 'GT4' }]
const gt4718CaymanPath = [...gt4Path, 'LedContainers', { field: 'CarModel', value: 'Porsche 718 Cayman GT4' }]
const gt4AmgPath = [...gt4Path, 'LedContainers', { field: 'CarModel', value: 'Mercedes AMG GT4' }]
const gt4570sPath = [...gt4Path, 'LedContainers', { field: 'CarModel', value: 'Mclaren 570s GT4' }]
const gt4M4G82Path = [...gt4Path, 'LedContainers', { field: 'CarModel', value: 'BMW M4 G82 GT4' }]
const gt4M4Path = [...gt4Path, 'LedContainers', { field: 'CarModel', value: 'BMW M4 GT4' }]
const gt4VantagePath = [...gt4Path, 'LedContainers', { field: 'CarModel', value: 'Aston Martin Vantage GT4' }]

// Open Wheel - Various
const openWheelPath = [...carsPath, 'LedContainers', { field: 'Description', value: 'Open Wheel' }]
const openWheelVariousPath = [...openWheelPath, 'LedContainers', { field: 'Description', value: 'Various' }]
const openWheelFormulaVeePath = [...openWheelVariousPath, 'LedContainers', { field: 'CarModel', value: 'Formula Vee' }]
const openWheelFormulaFordPath = [...openWheelVariousPath, 'LedContainers', { field: 'CarModel', value: 'Ray Formula 1600' }]
const openWheelFormula2000Path = [...openWheelVariousPath, 'LedContainers', { field: 'CarModel', value: 'Skip Barber Formula 2000' }]

// Open Wheel - Feeder Series
const openWheelFeederSeriesPath = [...openWheelPath, 'LedContainers', { field: 'Description', value: 'Feeder Series' }]
const openWheelF4Path = [...openWheelFeederSeriesPath, 'LedContainers', { field: 'CarModel', value: 'FIA F4' }]
const openWheelF3Path = [...openWheelFeederSeriesPath, 'LedContainers', { field: 'CarModel', value: 'Dallara F312 F3' }]

// Open Wheel - Super Formula
const openWheelSuperFormulaPath = [...openWheelPath, 'LedContainers', { field: 'Description', value: 'Super Formula' }]
const openWheelSuperFormulaLightsPath = [...openWheelSuperFormulaPath, 'LedContainers', { field: 'CarModel', value: 'Super Formula Lights 324' }]
const openWheelSuperFormulaHondaPath = [...openWheelSuperFormulaPath, 'LedContainers', { field: 'CarModel', value: 'Super Formula SF23 - Honda' }]
const openWheelSuperFormulaToyotaPath = [...openWheelSuperFormulaPath, 'LedContainers', { field: 'CarModel', value: 'Super Formula SF23 - Toyota' }]

// Open Wheel - Formula 1
const openWheelFormula1Path = [...openWheelPath, 'LedContainers', { field: 'Description', value: 'Formula 1' }]
const openWheelMercedesW12Path = [...openWheelFormula1Path, 'LedContainers', { field: 'CarModel', value: 'Mercedes W12' }]
const openWheelMercedesW12ContainerPath = [...openWheelMercedesW12Path, 'LedContainers', { field: 'ContainerType', value: 'Groups.CustomConditionalGroup' }, 'LedContainers']
const openWheelMercedesW13Path = [...openWheelFormula1Path, 'LedContainers', { field: 'CarModel', value: 'Mercedes-AMG W13 E Performance' }]
const openWheelMercedesW13ContainerPath = [...openWheelMercedesW13Path, 'LedContainers', { field: 'ContainerType', value: 'Groups.CustomConditionalGroup' }, 'LedContainers']

// Miscellaneous
const carsNotRunningPath = ['LedContainers', { field: 'Description', value: 'ENGINE OFF' }]
const gameNotRunningPath = ['LedContainers', { field: 'Description', value: 'iRACING NOT RUNNING = OFF' }]

export const paths = {
    rootPath,
    leftModulePath,
    rightModulePath,
    carsPath,
    carsNotRunningPath,
    gameNotRunningPath,

    // Various
    variousMx5Path,
    variousGr86Path,
    variousM2Path,
    variousRadicalSR8Path,
    variousRadicalSR10Path,
    variousScaaSpecPath,

    // Prototype
    prototypeP499Path,
    prototypeP217Path,
    prototypeVSeriesRPath,
    prototypeArx06Path,
    prototypeMHybridV8Path,
    prototype963Path,
    prototypeJsP320Path,

    // GT3
    gt3296Path,
    gt3Amg2020Path,
    gt3911RPath,
    gt3720sPath,
    gt3M4Path,
    gt3NSXPath,
    gt3AudiPath,
    gt3LamborghiniPath,
    gt3MustangPath,
    gt3CorvettePath,
    gt3992CupPath,
    gt3991CupPath,

    // GT4
    gt4718CaymanPath,
    gt4AmgPath,
    gt4570sPath,
    gt4M4G82Path,
    gt4M4Path,
    gt4VantagePath,

    // Open Wheel
    openWheelFormulaVeePath,
    openWheelFormulaFordPath,
    openWheelFormula2000Path,
    openWheelF4Path,
    openWheelF3Path,
    openWheelSuperFormulaLightsPath,
    openWheelSuperFormulaHondaPath,
    openWheelSuperFormulaToyotaPath,
    openWheelMercedesW12Path,
    openWheelMercedesW12ContainerPath,
    openWheelMercedesW13Path,
    openWheelMercedesW13ContainerPath,
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