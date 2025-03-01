import fs from 'fs'
import { cars } from './cars.js'
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

            default:
                console.error(`Unknown option: ${args[i]}`)
                process.exit(1)
        }
    } else {
        console.error(`Unknown argument: ${args[i]}`)
        process.exit(1)
    }
}

if (requiredOptions.some(option => !options[option])) {
    console.error('Missing required options!')
    console.error('Usage: node led-15-to-9.js --file <file> --left <left> --middle <middle> --right <right>')
    process.exit(1)
}

if (options.left > 3 || options.middle > 15 || options.middle < 3 || options.right > 3) {
    console.error('Invalid number of segments!')
    console.error('Usage: node led-15-to-9.js --file <file> --left <left> --middle <middle> --right <right>')
    process.exit(1)
}

console.log({ options })

// Execution
const profile = JSON.parse(fs.readFileSync(options.file, 'utf8'))
const leftStartPosition = 1
const middleStartPosition = options.left + 1
const rightStartPosition = options.left + options.middle + 1
const numberOfSegments = options.middle

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
        .mutate(cars.hpdArx01.path, cars.hpdArx01.fn(numberOfSegments))
        .result()

// Output
const outputFile = `${options.left}-${options.middle}-${options.right}.ledsprofile`
fs.writeFileSync(outputFile, JSON.stringify(updatedProfile, null, 2), 'utf8')
console.log(`Updated profile saved to ${outputFile}!`)

// Debug
// const reader = createReader(updatedProfile)
// const hpdArx01Containers = reader.get([
//     'LedContainers',
//     { field: 'Description', value: 'RPM' },
//     'LedContainers',
//     { field: 'Description', value: 'Rightside focused' },
// ])

// console.log({ hpdArx01Containers })

// Functions
function getValueFromPath(obj, path) {
    // Base case: empty path returns the object itself
    if (path.length === 0) {
        return obj
    }

    const [current, ...rest] = path

    // Handle null or undefined
    if (obj === null || obj === undefined) {
        return undefined
    }

    // Handle array with object matcher
    if (Array.isArray(obj) && typeof current === 'object') {
        // Match by field/value pair
        if (current.field && current.hasOwnProperty('value')) {
            const matchedItem = obj.find(item => item[current.field] === current.value)
            if (matchedItem) {
                return getValueFromPath(matchedItem, rest)
            }
        }
        // Match by multiple conditions
        else if (current.conditions && Array.isArray(current.conditions)) {
            const matchedItem = obj.find(item =>
                current.conditions.every(condition => item[condition.field] === condition.value)
            )
            if (matchedItem) {
                return getValueFromPath(matchedItem, rest)
            }
        }
        return undefined
    }

    // Handle array with numeric index
    if (Array.isArray(obj) && typeof current === 'number') {
        if (current >= 0 && current < obj.length) {
            return getValueFromPath(obj[current], rest)
        }
        return undefined
    }

    // Handle object property
    if (typeof obj === 'object' && current in obj) {
        return getValueFromPath(obj[current], rest)
    }

    return undefined
}

function mutateObject(obj, path, mutator) {
    if (path.length === 0) {
        return mutator(obj)
    }

    const [current, ...rest] = path
    const result = { ...obj }

    if (Array.isArray(result[current])) {
        result[current] = mutateArray(result[current], rest, mutator)
    } else if (typeof result[current] === 'object' && result[current] !== null) {
        result[current] = mutateObject(result[current], rest, mutator)
    } else if (rest.length === 0) {
        result[current] = mutator(result[current])
    }

    return result
}

function mutateArray(arr, path, mutator) {
    if (path.length === 0) {
        return mutator(arr)
    }

    const [current, ...rest] = path
    const result = [...arr]

    // Enhanced matching for array items
    if (typeof current === 'object') {
        // Match by field/value pair
        if (current.field && current.hasOwnProperty('value')) {
            for (let i = 0; i < result.length; i++) {
                if (result[i][current.field] === current.value) {
                    if (rest.length === 0) {
                        result[i] = mutator(result[i])
                    } else {
                        result[i] = mutateObject(result[i], rest, mutator)
                    }
                }
            }
        }
        // Match by multiple conditions
        else if (current.conditions && Array.isArray(current.conditions)) {
            for (let i = 0; i < result.length; i++) {
                if (current.conditions.every(condition =>
                    result[i][condition.field] === condition.value)) {
                    if (rest.length === 0) {
                        result[i] = mutator(result[i])
                    } else {
                        result[i] = mutateObject(result[i], rest, mutator)
                    }
                }
            }
        }
    }
    // Match by index
    else if (typeof current === 'number' && current >= 0 && current < result.length) {
        if (rest.length === 0) {
            result[current] = mutator(result[current])
        } else if (Array.isArray(result[current])) {
            result[current] = mutateArray(result[current], rest, mutator)
        } else if (typeof result[current] === 'object' && result[current] !== null) {
            result[current] = mutateObject(result[current], rest, mutator)
        }
    }

    return result
}

function createReader(initialObject) {
    return {
        get: function (path) {
            return getValueFromPath(initialObject, path)
        },

        // Optional: Add a method to check if a path exists
        exists: function (path) {
            return getValueFromPath(initialObject, path) !== undefined
        },

        // Optional: Add a method to get with default value
        getOrDefault: function (path, defaultValue) {
            const value = getValueFromPath(initialObject, path)
            return value !== undefined ? value : defaultValue
        }
    }
}

function createMutator(initialObject) {
    let currentObject = initialObject

    return {
        mutate: function (path, mutator) {
            currentObject = mutateObject(currentObject, path, mutator)
            return this
        },
        result: function () {
            return currentObject
        }
    }
}