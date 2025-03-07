// - The maximum number of leds when the targetNumLeds is even will be 16
// - The maximum number of leds when the targetNumLeds is uneven will be 15
// - We're not sure what the minimum number of leds are, but it's possible it's less than targetNumLeds
// - If targetNumLeds is even the the number of leds will have an even number
// - If targetNumLeds is uneven the number of leds will have be an uneven number
// - targetNumLeds is a range from 0-16
export const downsizeCar = (numLeds, debug = false) => (car) => {
  const processContainers = (container) => {
    const result = { ...container }

    if (result.LedContainers) {
      result.LedContainers = result.LedContainers.map(processContainers)
    }

    switch (result.ContainerType) {
      case "RPMSegments":
        return downsizeRPMSegmentsContainer(result, numLeds, 1, debug)

      case "Animation":
        return downsizeAnimationContainer(result, numLeds, 1, debug)

      case "CustomStatus":
      case "StaticColor":
      case "Status.SpeedLimiter":
      case "Status.SpeedLimiterAnimation":
        if (parseInt(container.LedCount, 10) <= numLeds) {
          return {
            ...result,
            StartPosition: 1 + Math.round((numLeds - parseInt(container.LedCount, 10)) / 2),
            LedCount: parseInt(container.LedCount, 10)
          }
        } else {
          return {
            ...result,
            StartPosition: 1,
            LedCount: numLeds
          }
        }

      default:
        return result
    }
  }

  return processContainers(car)
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

export const downsizeAnimationContainer = (animationContainer, targetNumLeds, startPosition = 1, debug = false) => {
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

  const downsize = (frame, targetNumLeds) => {
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
          return {
              ...color,
              position: color.position - min,
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
          }, targetNumLeds / 2)

          const downsizedColors =
            [...downsizedFrame.Colors, ...downsizedFrame.Colors.reverse()].map((color, idx) => ({
              ...color,
              position: idx
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
          }, Math.floor(targetNumLeds / 2))

          const downsizedColors =
            [...downsizedFrame.Colors, frame.Colors[midpoint + 1], ...downsizedFrame.Colors.reverse()].map((color, idx) => ({
              ...color,
              position: idx
            }))

          if (downsizedColors.length !== targetNumLeds) {
            console.warn('downsizedColors.length !== targetNumLeds', downsizedFrame.Colors.length, targetNumLeds)
          }

          return serialize({
            ...downsizedFrame,
            Colors: downsizedColors
          })
        } else {
          const downsizedFrame = downsize(frame, targetNumLeds)
          if (downsizedFrame.Colors.length !== targetNumLeds) {
            console.warn('downsizedColors.length !== targetNumLeds', downsizedFrame.Colors.length, targetNumLeds)
          }

          return serialize(downsizedFrame)
        }
      })
    }
  }
}