import fs from 'fs'
import crypto from 'crypto'
import { createMutator, createReader } from './common.js'
import { deprecatedPaths, paths } from './paths.js'
import { getArguments } from './arguments.js'

// Various
import { mx5 } from './cars/mx5.js'
import { gr86 } from './cars/gr86.js'
import { m2 } from './cars/m2.js'

// Prototype
import { p499 } from './cars/499p.js'
import { p217 } from './cars/p217.js'
import { vSeriesR } from './cars/v_series_r.js'

// Open Wheel
import { formulaVee } from './cars/formula_vee.js'
import { formulaFord } from './cars/formula_ford.js'
import { formula2000 } from './cars/formula_2000.js'
import { f4 } from './cars/f4.js'
import { f3 } from './cars/f3.js'
import { superFormulaLights } from './cars/super_formula_lights.js'
import { superFormula } from './cars/super_formula.js'
import { mercedesW12 } from './cars/mercedes_w12.js'

const profilesDir = './profiles'
if (!fs.existsSync(profilesDir)) {
    console.error(`Error: Profiles directory not found at ${profilesDir}`)
    console.error('Please create a "profiles" directory in the project root and add your profile files there.')
    process.exit(1)
}

// Scaffold
const options = getArguments()
const isEven = options.middle % 2 === 0
const configuration = isEven ? '3_16_3' : '3_15_3'
const profile = JSON.parse(fs.readFileSync(`./profiles/${options.version}_Yoep_de_LEDLights_${configuration}.ledsprofile`, 'utf8'))
const leftStartPosition = 1
const middleStartPosition = options.left + 1
const rightStartPosition = options.left + options.middle + 1
const total = options.left + options.middle + options.right

// Validate original profile
const reader = createReader(profile)
for (const path in deprecatedPaths) {
    reader.exists(deprecatedPaths[path])
}

let profileSpecificPreProcess
if (isEven) {
    reader.exists(deprecatedPaths.hpdArx01PathEven)
    // Pre-process original profile (modify structure)
    profileSpecificPreProcess =
        createMutator(profile)
            .move(deprecatedPaths.hpdArx01PathEven, deprecatedPaths.middleFocusedPrototypePath)
            .delete(deprecatedPaths.rightSideFocusedPath)
            .result()
} else {
    reader.exists(deprecatedPaths.hpdArx01PathUneven)
    profileSpecificPreProcess =
        createMutator(profile)
            .move(deprecatedPaths.hpdArx01PathUneven, deprecatedPaths.middleFocusedPrototypePath)
            .delete(deprecatedPaths.rightSideFocusedPath)
            .result()
}

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
            Name: `${container.Name.substring(0, container.Name.indexOf("LEDLights") + "LEDLights".length)} ${options.left}-${options.middle}-${options.right} v2`,
            ProfileId: crypto.randomUUID()
        }))
        // Micro Re-structure
        .move(deprecatedPaths.leftModuleMercedesW12DrsPath, paths.mercedesW12ContainerPath)
        .move(deprecatedPaths.leftModuleMercedesW13DrsPath, paths.mercedesW13ContainerPath)
        // Cleanup
        .delete(deprecatedPaths.leftModuleFormula1Path)
        .delete(deprecatedPaths.wipPath)
        .delete(deprecatedPaths.testLedsGameDataPath)
        .result()

// Validate pre-processed profile
const preProcessedReader = createReader(preProcessedProfile)
for (const path in paths) {
    preProcessedReader.exists(paths[path])
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
    let macroUpdatedProfile =
        createMutator(preProcessedProfile)
            .mutate(paths.leftModulePath, container => ({
                ...container,
                IsEnabled: options.left > 0,
                StartPosition: leftStartPosition
            }))
            .mutate(paths.rightModulePath, container => ({
                ...container,
                IsEnabled: options.right > 0,
                StartPosition: rightStartPosition
            }))
            .mutate(paths.carsPath, container => ({
                ...container,
                IsEnabled: options.middle > 0,
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
            .result()

    let updatedLeftModule = macroUpdatedProfile
    if (options.left > 0 && options.left < 3) {
    }

    let updatedRightModule = updatedLeftModule
    if (options.right > 0 && options.right < 3) {
    }

    let finalProfile = updatedRightModule
    if (options.middle > 0 && options.middle < 15) {
        finalProfile =
            createMutator(finalProfile)
                .mutate(paths.mx5Path, mx5(options.middle))
                .mutate(paths.gr86Path, gr86(options.middle))
                .mutate(paths.m2Path, m2(options.middle))
                .mutate(paths.p499Path, p499(options.middle))
                .mutate(paths.p217Path, p217(options.middle))
                .mutate(paths.vSeriesRPath, vSeriesR(options.middle))
                .mutate(paths.formulaVeePath, formulaVee(options.middle))
                .mutate(paths.formulaFordPath, formulaFord(options.middle))
                .mutate(paths.formula2000Path, formula2000(options.middle))
                .mutate(paths.f4Path, f4(options.middle))
                .mutate(paths.f3Path, f3(options.middle))
                .mutate(paths.superFormulaLightsPath, superFormulaLights(options.middle))
                .mutate(paths.superFormulaHondaPath, superFormula(options.middle))
                .mutate(paths.superFormulaToyotaPath, superFormula(options.middle))
                .mutate(paths.mercedesW12Path, mercedesW12(options.middle))
                .result()
    }

    // Debug or save profile
    if (options.debug) {
        console.log(createReader(finalProfile).get(paths[options.debug]))
        process.exit(0)
    } else {
        if (!fs.existsSync('./outputs')) {
            fs.mkdirSync('./outputs', { recursive: true })
        }

        const outputFile = `./outputs/${options.left}-${options.middle}-${options.right}.ledsprofile`
        fs.writeFileSync(outputFile, JSON.stringify(finalProfile, null, 2), 'utf8')
        console.log(`Profile saved to ${outputFile}!`)
        process.exit(0)
    }
}