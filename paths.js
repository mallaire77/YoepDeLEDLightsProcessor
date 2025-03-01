const leftModulePath = ['LedContainers', { field: 'Description', value: 'LEFT MODULE' }]
const rightModulePath = ['LedContainers', { field: 'Description', value: 'RIGHT MODULE' }]
const rpmPath = ['LedContainers', { field: 'Description', value: 'RPM' }]
const rightSideFocusedPath = [...rpmPath, { field: 'Description', value: 'Rightside focused' }]
const middleFocusedPath = [...rpmPath, { field: 'Description', value: 'Middle Focused' }]
const gt3Path = [...middleFocusedPath, { field: 'Description', value: 'GT3' }]
const gt4Path = [...middleFocusedPath, { field: 'Description', value: 'GT4' }]
const prototypePath = [...middleFocusedPath, { field: 'Description', value: 'Prototype' }]
const openWheelPath = [...middleFocusedPath, { field: 'Description', value: 'Open Wheel' }]
const feederSeriesPath = [...openWheelPath, { field: 'Description', value: 'Feeder Series' }]
const superFormulaPath = [...openWheelPath, { field: 'Description', value: 'Super Formula' }]
const openWheelVariousPath = [...openWheelPath, { field: 'Description', value: 'Various' }]
const hpdArx01Path = [...rightSideFocusedPath, { field: 'Description', value: 'Prototype' }, { field: 'CarModel', value: 'HPD ARX-01c' }]

export const paths = {
    leftModulePath,
    rightModulePath,
    rpmPath,
    rightSideFocusedPath,
    middleFocusedPath,
    gt3Path,
    gt4Path,
    prototypePath,
    openWheelPath,
    feederSeriesPath,
    superFormulaPath,
    openWheelVariousPath,
    hpdArx01Path
}