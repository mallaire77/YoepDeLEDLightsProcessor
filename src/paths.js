
// Left Module  
const leftModulePath = ['LedContainers', { field: 'Description', value: 'LEFT MODULE' }]

// Right Module
const rightModulePath = ['LedContainers', { field: 'Description', value: 'RIGHT MODULE' }]

// RPM
const rpmPath = ['LedContainers', { field: 'Description', value: 'RPM' }]

// Rightside focused
const rightSideFocusedPath = [...rpmPath, 'LedContainers', { field: 'Description', value: 'Rightside focused' }]
const hpdArx01Path = [...rightSideFocusedPath, 'LedContainers', { field: 'Description', value: 'Prototype' }, 'LedContainers', { field: 'CarModel', value: 'HPD ARX-01c' }]

// Middle focused
const middleFocusedPath = [...rpmPath, 'LedContainers', { field: 'Description', value: 'Middle Focused ' }]
const gt3Path = [...middleFocusedPath, 'LedContainers', { field: 'Description', value: 'GT3' }]
const gt4Path = [...middleFocusedPath, 'LedContainers', { field: 'Description', value: 'GT4' }]
const prototypePath = [...middleFocusedPath, 'LedContainers', { field: 'Description', value: 'Prototype' }]
const openWheelPath = [...middleFocusedPath, 'LedContainers', { field: 'Description', value: 'Open Wheel' }]

// Open Wheel
const openWheelFeederSeriesPath = [...openWheelPath, 'LedContainers', { field: 'Description', value: 'Feeder Series' }]
const openWheelSuperFormulaPath = [...openWheelPath, 'LedContainers', { field: 'Description', value: 'Super Formula' }]
const openWheelVariousPath = [...openWheelPath, 'LedContainers', { field: 'Description', value: 'Various' }]

export const paths = {
    leftModulePath,
    rightModulePath,
    rpmPath,
    rightSideFocusedPath,
    middleFocusedPath,
    hpdArx01Path
}