import fs from 'fs'
import crypto from 'crypto'
import args from './args.js'
import wheels from './wheels.js'
import { downsizeCar } from './cars/common.js'
import { createMutator, createReader, downsizeModule } from './common.js'
import { deprecatedPaths, paths } from './paths.js'

// GT3
import gt3296 from './cars/296_gt3.js'

// Open Wheel
import mercedesF1 from './cars/mercedes_f1.js'

const profilesDir = './profiles'
if (!fs.existsSync(profilesDir)) {
    console.error(`Error: Profiles directory not found at ${profilesDir}`)
    console.error('Please create a "profiles" directory in the project root and add your profile files there.')
    process.exit(1)
}

// Scaffold
const options = args()
const settings = options.wheel ? wheels[options.wheel] : options.settings

if (!settings) {
    console.error(`Settings are undefined!`)
    process.exit(1)
}

const isEven = settings.middle % 2 === 0
const configuration = isEven ? '3_16_3' : '3_15_3'
const profile = JSON.parse(fs.readFileSync(`./profiles/${options.version}_Yoep_de_LEDLights_${configuration}.ledsprofile`, 'utf8'))
const brightness = settings.brightness
const left = settings.left
const middle = settings.middle
const right = settings.right
const leds = settings.leds ? settings.leds : left + middle + right
const leftStartPosition = settings.customLeftStart ? settings.customLeftStart : 1
const middleStartPosition = settings.customMiddleStart ? settings.customMiddleStart : left + 1
const rightStartPosition = settings.customRightStart ? settings.customRightStart : middleStartPosition + 1
const reverseLeftModule = settings.reverseLeftModule
const reverseRightModule = settings.reverseRightModule

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
        .mutate([], container => ({
            ...container,
            GlobalBrightness: brightness || container.GlobalBrightness,
            GlobalBrightnessPreset: {
                Brightness: brightness || container.GlobalBrightness,
                BrightnessSettings: {
                    Day: brightness || container.GlobalBrightness,
                    Night: brightness || container.GlobalBrightness
                }
            },
            Name: profileName,
            ProfileId: crypto.randomUUID()
        }))
        .move(deprecatedPaths.middleFocusedPath, deprecatedPaths.rpmPath)
        .mutate(deprecatedPaths.movedMiddleFocusedPath, container => ({
            ...container,
            Description: 'Cars'
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
                StartPosition: 1,
                LedContainers: container.LedContainers.map(ledContainer => ({
                    ...ledContainer,
                    LedCount: leds,
                    StartPosition: 1
                }))
            }))
            .mutate(paths.gameNotRunningPath, container => ({
                ...container,
                StartPosition: 1,
                LedContainers: container.LedContainers.map(ledContainer => ({
                    ...ledContainer,
                    LedCount: leds,
                    StartPosition: 1
                }))
            }))
            .mutate(paths.leftModulePath, (module) => left > 0 ? downsizeModule(left, reverseLeftModule)(module) : module)
            .mutate(paths.rightModulePath, (module) => right > 0 ? downsizeModule(right, reverseRightModule)(module) : module)
            .mutate(paths.mx5Path, downsizeCar(middle))
            .mutate(paths.gr86Path, downsizeCar(middle))
            .mutate(paths.m2Path, downsizeCar(middle))
            .mutate(paths.radicalSR8Path, downsizeCar(middle))
            .mutate(paths.radicalSR10Path, downsizeCar(middle))
            .mutate(paths.scaaSpecPath, downsizeCar(middle))
            .mutate(paths.p499Path, downsizeCar(middle))
            .mutate(paths.p217Path, downsizeCar(middle))
            .mutate(paths.vSeriesRPath, downsizeCar(middle))
            .mutate(paths.arx06Path, downsizeCar(middle))
            .mutate(paths.mHybridV8Path, downsizeCar(middle))
            .mutate(paths.porsche963Path, downsizeCar(middle))
            .mutate(paths.jsP320Path, downsizeCar(middle))
            .mutate(paths.gt3M4Path, downsizeCar(middle))
            .mutate(paths.gt3296Path, gt3296(middle))
            .mutate(paths.gt3720sPath, downsizeCar(middle))
            .mutate(paths.gt3911RPath, downsizeCar(middle))
            .mutate(paths.gt3Amg2020Path, downsizeCar(middle))
            .mutate(paths.gt3488Path, downsizeCar(middle))
            .mutate(paths.gt3NSXPath, downsizeCar(middle))
            .mutate(paths.gt3AudiPath, downsizeCar(middle))
            .mutate(paths.gt3LamborghiniPath, downsizeCar(middle))
            .mutate(paths.gt3911CupPath, downsizeCar(middle))
            .mutate(paths.gt3MustangPath, downsizeCar(middle))
            .mutate(paths.gt3CorvettePath, downsizeCar(middle))
            .mutate(paths.gt4718CaymanPath, downsizeCar(middle))
            .mutate(paths.gt4AmgPath, downsizeCar(middle))
            .mutate(paths.gt4570sPath, downsizeCar(middle))
            .mutate(paths.gt4M4G82Path, downsizeCar(middle))
            .mutate(paths.gt4M4Path, downsizeCar(middle))
            .mutate(paths.gt4VantagePath, downsizeCar(middle))
            .mutate(paths.formulaVeePath, downsizeCar(middle))
            .mutate(paths.formulaFordPath, downsizeCar(middle))
            .mutate(paths.formula2000Path, downsizeCar(middle))
            .mutate(paths.f4Path, downsizeCar(middle))
            .mutate(paths.f3Path, downsizeCar(middle))
            .mutate(paths.superFormulaLightsPath, downsizeCar(middle))
            .mutate(paths.superFormulaHondaPath, downsizeCar(middle))
            .mutate(paths.superFormulaToyotaPath, downsizeCar(middle))
            .mutate(paths.mercedesW12Path, mercedesF1(middle))
            .mutate(paths.mercedesW13Path, mercedesF1(middle))
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