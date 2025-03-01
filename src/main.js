import fs from 'fs'
import { cars } from './cars.js'
import { createMutator, createReader } from './functions.js'
import { paths } from './paths.js'

// Arguments
const args = process.argv.slice(2)
const options = {}
const requiredOptions = ['file', 'left', 'middle', 'right']
for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
        switch (args[i]) {
            case '--file':
                options.file = args[i + 1]
                i++
                break

            case '--left':
                options.left = parseInt(args[i + 1], 10)
                i++
                break

            case '--middle':
                options.middle = parseInt(args[i + 1], 10)
                i++
                break

            case '--right':
                options.right = parseInt(args[i + 1], 10)
                i++
                break

            case '--debug':
                options.debug = args[i + 1]
                i++
                break

            default:
                console.error(`Unknown option: ${args[i]}`)
                process.exit(1)
        }
    } else {
        console.error(`Unknown argument: ${args[i]}`)
        process.exit(1)
    }
}

if (requiredOptions.some(option => options[option] === undefined)) {
    console.error('Missing required options!')
    console.error('Usage: node src/main.js --file <file> --left <left> --middle <middle> --right <right>')
    process.exit(1)
}

if (options.left > 3 || options.middle > 15 || options.middle < 3 || options.right > 3) {
    console.error('Invalid number of segments!')
    console.error('Usage: node src/main.js --file <file> --left <left> --middle <middle> --right <right>')
    process.exit(1)
}

// Execution
const profile = JSON.parse(fs.readFileSync(options.file, 'utf8'))
const leftStartPosition = 1
const middleStartPosition = options.left + 1
const rightStartPosition = options.left + options.middle + 1
const numberOfSegments = options.middle

const reader = createReader(profile)
for (const path in paths) {
    if (reader.get(paths[path]) === undefined) {
        console.error(`Path ${path} not found in profile!`)
        process.exit(1)
    }
}

const updatedProfile =
    createMutator(profile)
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
        .mutate(paths.rightSideFocusedPath, container => ({
            ...container,
            StartPosition: middleStartPosition
        }))
        .mutate(paths.middleFocusedPath, container => ({
            ...container,
            StartPosition: middleStartPosition
        }))
        .mutate(paths.hpdArx01Path, cars.hpdArx01(numberOfSegments))
        .result()

// Output
if (!options.debug) {
    const outputFile = `${options.left}-${options.middle}-${options.right}.ledsprofile`
    fs.writeFileSync(outputFile, JSON.stringify(updatedProfile, null, 2), 'utf8')
    console.log(`Profile saved to ${outputFile}!`)
} else {
    console.log(createReader(updatedProfile).get(paths[options.debug]))
}
