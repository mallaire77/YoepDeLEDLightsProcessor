
export function getValueFromPath(obj, path) {
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

export function createReader(initialObject) {
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

export function createMutator(initialObject) {
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