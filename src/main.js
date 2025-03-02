import fs from 'fs'
import { createMutator, createReader } from './functions.js'
import { deprecatedPaths, paths } from './paths.js'
import { getArguments } from './arguments.js'

// Car Imports
import { fiaF4 } from './cars/fia_f4.js'
import { mercedesW12 } from './cars/mercedes_w12.js'

const profilesDir = './profiles'
if (!fs.existsSync(profilesDir)) {
    console.error(`Error: Profiles directory not found at ${profilesDir}`)
    console.error('Please create a "profiles" directory in the project root and add your profile files there.')
    process.exit(1)
}

// Scaffold
const options = getArguments()
const configuration = options.middle % 2 === 0 ? '3_16_3' : '3_15_3'
const profile = JSON.parse(fs.readFileSync(`./profiles/${options.reference}_Yoep_de_LEDLights_${configuration}.ledsprofile`, 'utf8'))
const leftStartPosition = 1
const middleStartPosition = options.left + 1
const rightStartPosition = options.left + options.middle + 1
const total = options.left + options.middle + options.right

// Validate original profile
const reader = createReader(profile)
for (const path in deprecatedPaths) {
    if (path !== 'movedMiddleFocusedPath' && reader.get(deprecatedPaths[path]) === undefined) {
        console.error(`Deprecated path ${path} not found in profile!`)
        process.exit(1)
    }
}

// Pre-process original profile (modify structure)
const preProcessedProfile =
    createMutator(profile)
        .move(deprecatedPaths.hpdArx01Path, deprecatedPaths.middleFocusedPrototypePath)
        .delete(deprecatedPaths.rightSideFocusedPath)
        .move(deprecatedPaths.middleFocusedPath, deprecatedPaths.rpmPath)
        .mutate(deprecatedPaths.movedMiddleFocusedPath, container => ({
            ...container,
            Description: 'Cars'
        }))
        .mutate([], container => ({
            ...container,
            Name: `${container.Name.substring(0, container.Name.indexOf("LEDLights") === -1 ? container.Name.length : container.Name.indexOf("LEDLights") + "LEDLights".length)} ${options.left}-${options.middle}-${options.right}`
        }))
        .delete(deprecatedPaths.wipPath)
        .delete(deprecatedPaths.testLedsGameDataPath)
        .result()

// Validate pre-processed profile
const preProcessedReader = createReader(preProcessedProfile)
for (const path in paths) {
    if (preProcessedReader.get(paths[path]) === undefined) {
        console.error(`Path ${path} not found in pre-processed profile!`)
        process.exit(1)
    }
}

// Update pre-processed profile cars according to arguments
const updatedProfile =
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
        .mutate(paths.fiaF4Path, fiaF4(options.middle))
        .mutate(paths.mercedesW12Path, mercedesW12(options.middle))
        .result()

// Debug or save profile
if (options.debug) {
    console.log(createReader(updatedProfile).get(paths[options.debug]))
    process.exit(0)
} else {
    if (!fs.existsSync('./outputs')) {
        fs.mkdirSync('./outputs', { recursive: true })
    }

    const outputFile = `./outputs/${options.left}-${options.middle}-${options.right}.ledsprofile`
    fs.writeFileSync(outputFile, JSON.stringify(updatedProfile, null, 2), 'utf8')
    console.log(`Profile saved to ${outputFile}!`)
    process.exit(0)
}