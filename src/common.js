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
        if (current.conditions.every(condition => result[i][condition.field] === condition.value)) {
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
    console.log('Source value is undefined, returning original object')
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

export const downsizeRPMSegmentsContainer = (segmentContainer, targetNumLeds, startPosition = 1, debug = false) => {
  const deserialize = (segments) => {
    return segments.reduce((acc, segment) => {
      const [count, position, color, hasTrail, trailColor] = segment.split(';')
      for (let i = 0; i < count; i++) {
        acc.push({ count: 1, position: parseFloat(position), color, hasTrail, trailColor })
      }
      return acc
    }, [])
  }

  const serialize = (segments) => {
    return segments.map(segment => `${segment.count};${segment.position};${segment.color};${segment.hasTrail};${segment.trailColor}`)
  }

  const downsize = (segments, targetNumLeds) => {
    if (targetNumLeds === 1) {
      const result = segments.sort((a, b) => b.position - a.position).slice(0, 1)
      return result
    } else {
      const colorGroups = segments.reduce((groups, segment) => {
        if (!groups[segment.color]) {
          groups[segment.color] = []
        }
        groups[segment.color].push(segment)
        return groups
      }, {})

      const sortedColorGroup =
        Object
          .keys(colorGroups)
          .map((color) => {
            const colorGroup = colorGroups[color]
            const sortedColorGroup = colorGroup.sort((a, b) => b.position - a.position)
            return sortedColorGroup
          })
          .sort((a, b) => b[0].position - a[0].position)

      const colors =
        sortedColorGroup.reduce((acc, colorGroup) => {
          const proportionalCount = Math.round((Math.round(((colorGroup.length / segments.length) * 100)) / 100) * targetNumLeds)
          return {
            ...acc,
            [colorGroup[0].color]: {
              count: 0,
              proportionalCount
            }
          }
        }, {})

      if (Object.values(colors).reduce((acc, color) => acc + color.proportionalCount, 0) < targetNumLeds) {
        colors[sortedColorGroup[0][0].color].proportionalCount++
      }

      const result = []
      let i = 0
      while (i < targetNumLeds) {
        let j = 0
        while (j < sortedColorGroup.length && i < targetNumLeds) {
          // Skip empty arrays
          if (sortedColorGroup[j].length === 0) {
            j++
            continue
          }

          // Peek at the segment without removing it yet
          const segment = sortedColorGroup[j][0]

          if ((i === 0 && j === 0) || (colors[segment.color].count < colors[segment.color].proportionalCount)) {
            // Only remove the segment if we're going to use it
            sortedColorGroup[j].shift()
            colors[segment.color].count = colors[segment.color].count + 1
            result.push(segment)
            i++
          }
          j++
        }
      }

      let sortedResult
      if (segments[0].position < segments[segments.length - 1].position) {
        sortedResult = result.sort((a, b) => a.position - b.position)
      } else {
        sortedResult = result.sort((a, b) => b.position - a.position)
      }
      return sortedResult
    }
  }


  const parsedSegments = deserialize(segmentContainer.Segments)
  const numLeds = parsedSegments.length
  if (targetNumLeds === 0) {
    return {
      ...segmentContainer,
      StartPosition: startPosition,
      Segments: [],
      SegmentsCount: 0,
    }
  } else if (numLeds <= targetNumLeds) {
    return {
      ...segmentContainer,
      StartPosition: startPosition + Math.round((targetNumLeds - numLeds) / 2),
    }
  } else if (parsedSegments[0].position === parsedSegments[parsedSegments.length - 1].position && parsedSegments.length % 2 === 0) {
    const leftHalf = downsize(parsedSegments.slice(0, parsedSegments.length / 2), targetNumLeds / 2)
    const result = [...leftHalf, ...leftHalf.reverse()]
    const serializedResult = serialize(result)
    return {
      ...segmentContainer,
      StartPosition: startPosition,
      Segments: serializedResult,
      SegmentsCount: serializedResult.length
    }
  } else if (parsedSegments[0].position === parsedSegments[parsedSegments.length - 1].position) {
    const midpoint = Math.floor(parsedSegments.length / 2)
    const leftHalf = downsize(parsedSegments.slice(0, midpoint), Math.floor(targetNumLeds / 2))
    const result = [...leftHalf, parsedSegments[midpoint + 1], ...leftHalf.reverse()]
    const serializedResult = serialize(result)
    return {
      ...segmentContainer,
      StartPosition: startPosition,
      Segments: serializedResult,
      SegmentsCount: serializedResult.length
    }
  } else {
    // Left to right based
    const result = downsize(parsedSegments, targetNumLeds)
    const serializedResult = serialize(result)
    return {
      ...segmentContainer,
      StartPosition: startPosition,
      Segments: serializedResult,
      SegmentsCount: serializedResult.length
    }
  }
}

export const downsizeAnimationContainer = (animationContainer, targetNumLeds, startPosition = 1, reverse = false, debug = false) => {
  const deserialize = (frames, numLeds) => {
    return frames.map(frame => {
      const convertedColors = frame.Colors
        .split(';')
        .map(_color => {
          const [unknown, position, color] = _color.split(',')
          return {
            unknown,
            position: parseInt(position, 10),
            color
          }
        })
        .sort((a, b) => a.position - b.position)

      let filledOutColors = []
      let i = 0
      let colorIndex = 0
      while (i < numLeds) {
        const color = convertedColors[colorIndex]
        if (color === undefined) {
          filledOutColors.push({
            unknown: '0',
            position: i,
            color: '#000000'
          })
          i++
        } else if (color.position !== i) {
          filledOutColors.push({
            unknown: '0',
            position: i,
            color: '#000000'
          })
          i++
        } else {
          filledOutColors.push(color)
          i++
          colorIndex++
        }
      }

      return {
        ...frame,
        Colors: filledOutColors
      }
    })
  }

  const serialize = (frame) => {
    return {
      ...frame,
      Colors: frame.Colors.map(color => `${color.unknown},${color.position},${color.color}`).join(';')
    }
  }

  const downsize = (frame, targetNumLeds, reverse) => {
    const numLeds = frame.Colors.length

    // Check if we have LEDs at start and end positions
    const hasStartLed = frame.Colors.length > 0 && frame.Colors[0].color !== '#000000'
    const hasEndLed = frame.Colors.length > 0 && frame.Colors[frame.Colors.length - 1].color !== '#000000'

    let min, max
    if (hasStartLed && !hasEndLed) {
      min = 0
      max = targetNumLeds - 1
    } else if (!hasStartLed && hasEndLed) {
      min = numLeds - targetNumLeds
      max = numLeds - 1
    } else {
      const startOffset = Math.floor((numLeds - targetNumLeds) / 2)
      min = startOffset
      max = startOffset + targetNumLeds - 1
    }

    const updatedColors = frame.Colors
      .filter(color => {
        return color.position >= min && color.position <= max
      })
      .map(color => {
        const normalizedPosition = color.position - min
        return {
          ...color,
          position: reverse ? (targetNumLeds - 1 - normalizedPosition) : normalizedPosition,
        }
      })
      .sort((a, b) => {
        return a.position - b.position
      })

    const updatedFrame = {
      ...frame,
      Colors: updatedColors
    }

    return updatedFrame
  }

  const numLeds = parseInt(animationContainer.Animation.Columns, 10)
  const parsedFrames = deserialize(animationContainer.Animation.Frames, numLeds)
  return {
    ...animationContainer,
    StartPosition: startPosition,
    Animation: {
      ...animationContainer.Animation,
      StartPosition: 1,
      Columns: targetNumLeds,
      Frames: parsedFrames.map(frame => {
        const isSymmetric = frame.Colors
          .slice(0, Math.floor(frame.Colors.length / 2))
          .every((color, colorIdx) => color.color.toLowerCase() === frame.Colors[frame.Colors.length - 1 - colorIdx].color.toLowerCase())

        if (targetNumLeds === 0) {
          return serialize({
            ...frame,
            Colors: []
          })
        } else if (numLeds <= targetNumLeds) {
          return serialize({
            ...frame,
            StartPosition: startPosition + Math.round((targetNumLeds - numLeds) / 2),
          })
        } else if (isSymmetric && numLeds % 2 === 0) {
          const half = frame.Colors.slice(0, numLeds / 2)

          const downsizedFrame = downsize({
            ...frame,
            Colors: half
          }, targetNumLeds / 2, reverse)

          const downsizedColors =
            [...downsizedFrame.Colors, ...downsizedFrame.Colors.reverse()].map((color, idx) => ({
              ...color,
              position: reverse ? (targetNumLeds - 1 - idx) : idx
            }))

          if (downsizedColors.length !== targetNumLeds) {
            console.warn('downsizedColors.length !== targetNumLeds', downsizedFrame.Colors.length, targetNumLeds)
          }

          return serialize({
            ...downsizedFrame,
            Colors: downsizedColors
          })
        } else if (isSymmetric) {
          const midpoint = Math.floor(frame.Colors.length / 2)
          const half = frame.Colors.slice(0, midpoint)

          const downsizedFrame = downsize({
            ...frame,
            Colors: half
          }, Math.floor(targetNumLeds / 2), reverse)

          const downsizedColors =
            [...downsizedFrame.Colors, frame.Colors[midpoint + 1], ...downsizedFrame.Colors.reverse()].map((color, idx) => ({
              ...color,
              position: reverse ? (targetNumLeds - 1 - idx) : idx
            }))

          if (downsizedColors.length !== targetNumLeds) {
            console.warn('downsizedColors.length !== targetNumLeds', downsizedFrame.Colors.length, targetNumLeds)
          }

          return serialize({
            ...downsizedFrame,
            Colors: downsizedColors
          })
        } else {
          const downsizedFrame = downsize(frame, targetNumLeds, reverse)
          if (downsizedFrame.Colors.length !== targetNumLeds) {
            console.warn('downsizedColors.length !== targetNumLeds', downsizedFrame.Colors.length, targetNumLeds)
          }

          return serialize(downsizedFrame)
        }
      })
    }
  }
}