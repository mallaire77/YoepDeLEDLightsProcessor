export function getValueFromPath(obj, path) {
    // Input validation
    if (path === undefined || path === null) {
        console.error("Error: path is undefined or null in getValueFromPath")
        return undefined
    }

    if (!Array.isArray(path)) {
        console.error(`Error: path must be an array, received ${typeof path}: ${JSON.stringify(path)}`)
        return undefined
    }

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

export function mutateObject(obj, path, mutator) {
    // Input validation
    if (path === undefined || path === null) {
        console.error("Error: path is undefined or null in mutateObject")
        return obj
    }

    if (!Array.isArray(path)) {
        console.error(`Error: path must be an array, received ${typeof path}: ${JSON.stringify(path)}`)
        return obj
    }

    if (typeof mutator !== 'function') {
        console.error("Error: mutator must be a function")
        return obj
    }

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

export function mutateArray(arr, path, mutator) {
    // Input validation
    if (path === undefined || path === null) {
        console.error("Error: path is undefined or null in mutateArray")
        return arr
    }

    if (!Array.isArray(path)) {
        console.error(`Error: path must be an array, received ${typeof path}: ${JSON.stringify(path)}`)
        return arr
    }

    if (typeof mutator !== 'function') {
        console.error("Error: mutator must be a function")
        return arr
    }

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

export function movePath(obj, sourcePath, targetPath) {
    // Input validation
    if (!Array.isArray(sourcePath)) {
        console.error(`Error: sourcePath must be an array, received ${typeof sourcePath}: ${JSON.stringify(sourcePath)}`)
        return obj
    }

    if (!Array.isArray(targetPath)) {
        console.error(`Error: targetPath must be an array, received ${typeof targetPath}: ${JSON.stringify(targetPath)}`)
        return obj
    }

    // Get the value at the source path
    const value = getValueFromPath(obj, sourcePath)

    // If the value doesn't exist, return the original object
    if (value === undefined) {
        return obj
    }

    // First delete the value from the source path
    const intermediateObj = deletePath(obj, sourcePath)

    // Check if the target is an array
    const targetParentPath = targetPath.slice(0, -1)
    const targetKey = targetPath[targetPath.length - 1]
    const targetParent = getValueFromPath(intermediateObj, targetParentPath)

    // If the target parent exists and the target key points to an array, append to it
    if (targetParent !== undefined && Array.isArray(targetParent[targetKey])) {
        return mutateObject(intermediateObj, targetParentPath, (parent) => {
            const result = { ...parent }
            result[targetKey] = [...parent[targetKey], value]
            return result
        })
    }

    // Otherwise, set the value at the target path as before
    return setValueAtPath(intermediateObj, targetPath, value)
}

export function deletePath(obj, path) {
    // Input validation
    if (path === undefined || path === null) {
        console.error("Error: path is undefined or null in deletePath")
        return obj
    }

    if (!Array.isArray(path)) {
        console.error(`Error: path must be an array, received ${typeof path}: ${JSON.stringify(path)}`)
        return obj
    }

    // Empty path is invalid for deletion
    if (path.length === 0) {
        return obj
    }

    // If path has only one segment, we can directly delete from the object
    if (path.length === 1) {
        const [current] = path

        // Handle different object types
        if (Array.isArray(obj)) {
            // For arrays, we need to handle numeric indices or object matchers
            if (typeof current === 'number') {
                return [...obj.slice(0, current), ...obj.slice(current + 1)]
            } else if (typeof current === 'object') {
                // Handle object matcher for arrays
                if (current.field && current.hasOwnProperty('value')) {
                    return obj.filter(item => item[current.field] !== current.value)
                } else if (current.conditions && Array.isArray(current.conditions)) {
                    return obj.filter(item =>
                        !current.conditions.every(condition => item[condition.field] === condition.value)
                    )
                }
            }
            return obj
        } else if (typeof obj === 'object' && obj !== null) {
            // For objects, create a new object without the specified property
            const result = { ...obj }
            delete result[current]
            return result
        }

        // If obj is not an object or array, we can't delete from it
        return obj
    }

    // For longer paths, we need to traverse the object
    const [current, ...rest] = path

    // Handle null or undefined
    if (obj === null || obj === undefined) {
        return obj
    }

    // Handle arrays
    if (Array.isArray(obj)) {
        if (typeof current === 'number') {
            // Numeric index for array
            if (current >= 0 && current < obj.length) {
                const result = [...obj]
                result[current] = deletePath(obj[current], rest)
                return result
            }
        } else if (typeof current === 'object') {
            // Object matcher for arrays
            const result = [...obj]

            if (current.field && current.hasOwnProperty('value')) {
                for (let i = 0; i < result.length; i++) {
                    if (result[i][current.field] === current.value) {
                        result[i] = deletePath(result[i], rest)
                    }
                }
            } else if (current.conditions && Array.isArray(current.conditions)) {
                for (let i = 0; i < result.length; i++) {
                    if (current.conditions.every(condition => result[i][condition.field] === condition.value)) {
                        result[i] = deletePath(result[i], rest)
                    }
                }
            }

            return result
        }
        return obj
    }

    // Handle objects
    if (typeof obj === 'object' && obj !== null) {
        if (!(current in obj)) {
            return obj
        }

        const result = { ...obj }
        result[current] = deletePath(obj[current], rest)
        return result
    }

    return obj
}

export function setValueAtPath(obj, path, value) {
    // Input validation
    if (path === undefined || path === null) {
        console.error("Error: path is undefined or null in setValueAtPath")
        return obj
    }

    if (!Array.isArray(path)) {
        console.error(`Error: path must be an array, received ${typeof path}: ${JSON.stringify(path)}`)
        return obj
    }

    // For empty path, replace the entire object
    if (path.length === 0) {
        return value
    }

    const [current, ...rest] = path

    // Handle null or undefined by creating appropriate container
    if (obj === null || obj === undefined) {
        // Create array if current is a number, otherwise create object
        obj = typeof current === 'number' ? [] : {}
    }

    if (Array.isArray(obj)) {
        const result = [...obj]

        if (typeof current === 'number') {
            // Ensure array has enough elements
            while (result.length <= current) {
                result.push(undefined)
            }

            result[current] = rest.length === 0
                ? value
                : setValueAtPath(result[current], rest, value)

            return result
        } else if (typeof current === 'object') {
            // Object matcher for arrays
            let found = false

            if (current.field && current.hasOwnProperty('value')) {
                for (let i = 0; i < result.length; i++) {
                    if (result[i] && result[i][current.field] === current.value) {
                        result[i] = rest.length === 0
                            ? value
                            : setValueAtPath(result[i], rest, value)
                        found = true
                    }
                }
            } else if (current.conditions && Array.isArray(current.conditions)) {
                for (let i = 0; i < result.length; i++) {
                    if (result[i] && current.conditions.every(condition =>
                        result[i][condition.field] === condition.value)) {
                        result[i] = rest.length === 0
                            ? value
                            : setValueAtPath(result[i], rest, value)
                        found = true
                    }
                }
            }

            // If no matching item was found, we can't set the value
            return result
        }

        // If current is not a number or object matcher, we can't set in array
        return obj
    }

    if (typeof obj === 'object') {
        const result = { ...obj }

        result[current] = rest.length === 0
            ? value
            : setValueAtPath(result[current], rest, value)

        return result
    }

    // If obj is not an object or array, we can't set properties on it
    return obj
}

export function createReader(initialObject) {
    return {
        get: function (path) {
            if (!Array.isArray(path)) {
                console.error(`Error: path must be an array, received ${typeof path}: ${JSON.stringify(path)}`)
                return undefined
            }
            return getValueFromPath(initialObject, path)
        },

        // Optional: Add a method to check if a path exists
        exists: function (path) {
            if (!Array.isArray(path)) {
                console.error(`Error: path must be an array, received ${typeof path}: ${JSON.stringify(path)}`)
                return false
            }
            return getValueFromPath(initialObject, path) !== undefined
        },

        // Optional: Add a method to get with default value
        getOrDefault: function (path, defaultValue) {
            if (!Array.isArray(path)) {
                console.error(`Error: path must be an array, received ${typeof path}: ${JSON.stringify(path)}`)
                return defaultValue
            }
            const value = getValueFromPath(initialObject, path)
            return value !== undefined ? value : defaultValue
        }
    }
}

export function createMutator(initialObject) {
    let currentObject = initialObject

    return {
        mutate: function (path, mutator) {
            if (!Array.isArray(path)) {
                console.error(`Error: path must be an array, received ${typeof path}: ${JSON.stringify(path)}`)
                return this
            }
            if (typeof mutator !== 'function') {
                console.error("Error: mutator must be a function")
                return this
            }
            currentObject = mutateObject(currentObject, path, mutator)
            return this
        },
        move: function (sourcePath, targetPath) {
            if (!Array.isArray(sourcePath)) {
                console.error(`Error: sourcePath must be an array, received ${typeof sourcePath}: ${JSON.stringify(sourcePath)}`)
                return this
            }
            if (!Array.isArray(targetPath)) {
                console.error(`Error: targetPath must be an array, received ${typeof targetPath}: ${JSON.stringify(targetPath)}`)
                return this
            }
            currentObject = movePath(currentObject, sourcePath, targetPath)
            return this
        },
        delete: function (path) {
            if (!Array.isArray(path)) {
                console.error(`Error: path must be an array, received ${typeof path}: ${JSON.stringify(path)}`)
                return this
            }
            currentObject = deletePath(currentObject, path)
            return this
        },
        set: function (path, value) {
            if (!Array.isArray(path)) {
                console.error(`Error: path must be an array, received ${typeof path}: ${JSON.stringify(path)}`)
                return this
            }
            currentObject = setValueAtPath(currentObject, path, value)
            return this
        },
        result: function () {
            return currentObject
        }
    }
}