import fs from 'fs'
import crypto from 'crypto'
import args from './args.js'
import wheels from './wheels.js'
import { downsizeCar } from './cars/common.js'
import { createMutator, createReader } from './common.js'
import { deprecatedPaths, paths } from './paths.js'

// GT3
import gt3296 from './cars/296_gt3.js'

// Open Wheel
import mercedesW12 from './cars/mercedes_w12.js'

const profilesDir = './profiles'
if (!fs.existsSync(profilesDir)) {
    console.error(`Error: Profiles directory not found at ${profilesDir}`)
    console.error('Please create a "profiles" directory in the project root and add your profile files there.')
    process.exit(1)
}

// Scaffold
const options = args()
const settings = options.wheel ? wheels[options.wheel] : options.settings
const isEven = options.middle % 2 === 0
const configuration = isEven ? '3_16_3' : '3_15_3'
const profile = JSON.parse(fs.readFileSync(`./profiles/${options.version}_Yoep_de_LEDLights_${configuration}.ledsprofile`, 'utf8'))
const left = settings.left
const middle = settings.middle
const right = settings.right
const leftStartPosition = settings.customLeftStart ? settings.customLeftStart : 1
const middleStartPosition = settings.customMiddleStart ? settings.customMiddleStart : left + 1
const rightStartPosition = settings.customRightStart ? settings.customRightStart : middleStartPosition + 1
const total = left + middle + right

// Validate original profile
const reader = createReader(profile)
for (const path in deprecatedPaths) {
    if (path !== 'movedMiddleFocusedPath' && path !== 'hpdArx01PathEven' && path !== 'hpdArx01PathUneven' && reader.get(deprecatedPaths[path]) === undefined) {
        console.error(`Error: ${path} not found in original profile`)
        process.exit(1)
    }
}

let profileSpecificPreProcess
if (isEven) {
    if (reader.get(deprecatedPaths.hpdArx01PathEven) === undefined) {
        console.error(`Error: ${deprecatedPaths.hpdArx01PathEven} not found in original profile`)
        process.exit(1)
    }

    // Pre-process original profile (modify structure)
    profileSpecificPreProcess =
        createMutator(profile)
            .move(deprecatedPaths.hpdArx01PathEven, deprecatedPaths.middleFocusedPrototypePath)
            .delete(deprecatedPaths.rightSideFocusedPath)
            .result()
} else {
    if (reader.get(deprecatedPaths.hpdArx01PathUneven) === undefined) {
        console.error(`Error: ${deprecatedPaths.hpdArx01PathUneven} not found in original profile`)
        process.exit(1)
    }

    profileSpecificPreProcess =
        createMutator(profile)
            .move(deprecatedPaths.hpdArx01PathUneven, deprecatedPaths.middleFocusedPrototypePath)
            .delete(deprecatedPaths.rightSideFocusedPath)
            .result()
}

const profileName = options.wheel ? `${options.version} Yoep de LEDLights ${options.wheel} v2` : `${options.version} Yoep de LEDLights ${left}-${middle}-${right} v2`
const preProcessedProfile =
    createMutator(profileSpecificPreProcess)
        // Macro Re-structure
        .move(deprecatedPaths.middleFocusedPath, deprecatedPaths.rpmPath)
        .mutate(deprecatedPaths.movedMiddleFocusedPath, container => ({
            ...container,
            Description: 'Cars'
        }))
        .mutate([], container => ({
            ...container,
            Name: profileName,
            ProfileId: crypto.randomUUID()
        }))
        // Micro Re-structure
        .move(deprecatedPaths.leftModuleMercedesW12DrsPath, paths.mercedesW12ContainerPath)
        .move(deprecatedPaths.leftModuleMercedesW13DrsPath, paths.mercedesW13ContainerPath)
        .mutate(paths.formulaVeePath, car => ({
            ...car,
            StartPosition: 1
        }))
        .mutate([...paths.formulaFordPath, 'LedContainers', { field: 'ContainerType', value: 'Groups.CustomConditionalGroup' }], car => ({
            ...car,
            StartPosition: 1
        }))
        // Cleanup
        .delete(deprecatedPaths.leftModuleFormula1Path)
        .delete(deprecatedPaths.wipPath)
        .delete(deprecatedPaths.testLedsGameDataPath)
        .result()

// Validate pre-processed profile
const preProcessedReader = createReader(preProcessedProfile)
for (const path in paths) {
    if (preProcessedReader.get(paths[path]) === undefined) {
        console.error(`Error: ${path} not found in pre-processed profile`)
        process.exit(1)
    }
}

if (options.preprocess) {
    if (!fs.existsSync('./profiles/v2')) {
        fs.mkdirSync('./profiles/v2', { recursive: true })
    }

    const outputFile = `./profiles/v2/${options.version}_Yoep_de_LEDLights_${configuration}.ledsprofile`
    fs.writeFileSync(outputFile, JSON.stringify(preProcessedProfile, null, 2), 'utf8')
    console.log(`Profile saved to ${outputFile}!`)
    process.exit(0)
} else {
    let updatedProfile =
        createMutator(preProcessedProfile)
            .mutate(paths.leftModulePath, container => ({
                ...container,
                IsEnabled: left > 0,
                StartPosition: leftStartPosition
            }))
            .mutate(paths.rightModulePath, container => ({
                ...container,
                IsEnabled: right > 0,
                StartPosition: rightStartPosition
            }))
            .mutate(paths.carsPath, container => ({
                ...container,
                IsEnabled: middle > 0,
                StartPosition: middleStartPosition
            }))
            .mutate(paths.carsNotRunningPath, container => ({
                ...container,
                StartPosition: leftStartPosition,
                LedContainers: container.LedContainers.map(ledContainer => ({
                    ...ledContainer,
                    LedCount: total
                }))
            }))
            .mutate(paths.gameNotRunningPath, container => ({
                ...container,
                StartPosition: leftStartPosition,
                LedContainers: container.LedContainers.map(ledContainer => ({
                    ...ledContainer,
                    LedCount: total
                }))
            }))
            .mutate(paths.mx5Path, downsizeCar(middle))
            .mutate(paths.gr86Path, downsizeCar(middle))
            .mutate(paths.m2Path, downsizeCar(middle))
            .mutate(paths.p499Path, downsizeCar(middle))
            .mutate(paths.p217Path, downsizeCar(middle))
            .mutate(paths.vSeriesRPath, downsizeCar(middle))
            .mutate(paths.gt3M4Path, downsizeCar(middle))
            .mutate(paths.gt3296Path, gt3296(middle))
            .mutate(paths.gt3720sPath, downsizeCar(middle, true))
            .mutate(paths.gt3911RPath, downsizeCar(middle))
            .mutate(paths.gt3Amg2020Path, downsizeCar(middle))
            .mutate(paths.formulaVeePath, downsizeCar(middle))
            .mutate(paths.formulaFordPath, downsizeCar(middle))
            .mutate(paths.formula2000Path, downsizeCar(middle))
            .mutate(paths.f4Path, downsizeCar(middle))
            .mutate(paths.f3Path, downsizeCar(middle))
            .mutate(paths.superFormulaLightsPath, downsizeCar(middle))
            .mutate(paths.superFormulaHondaPath, downsizeCar(middle))
            .mutate(paths.superFormulaToyotaPath, downsizeCar(middle))
            .mutate(paths.mercedesW12Path, mercedesW12(middle))
            .result()

    if (!fs.existsSync('./outputs')) {
        fs.mkdirSync('./outputs', { recursive: true })
    }

    const fileName = options.wheel ? `${options.wheel}.ledsprofile` : `${left}-${middle}-${right}.ledsprofile`
    const outputFile = `./outputs/${fileName}`
    fs.writeFileSync(outputFile, JSON.stringify(updatedProfile, null, 2), 'utf8')
    console.log(`Profile saved to ${outputFile}!`)
    process.exit(0)
}