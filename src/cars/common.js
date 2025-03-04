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
      case "Status.SpeedLimiterAnimation":
        if (container.LedCount <= numLeds) {
          return {
            ...result,
            ...result,
            StartPosition: Math.round((numLeds - container.LedCount) / 2),
            LedCount: numLeds
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

export const countSegmentLeds = (segments) => {
  return segments.reduce((acc, segment) => {
    const parts = segment.split(';')
    return acc + parseInt(parts[0], 10)
  }, 0)
}

export const countFramesLeds = (frames) => {
  let highestPosition = 0
  for (const frame of frames) {
    for (const color of frame.Colors.split(';')) {
      const parts = color.split(',')
      const position = parseInt(parts[1], 10)
      if (position > highestPosition) {
        highestPosition = position
      }
    }
  }
  return highestPosition + 1
}

export const downsizeRPMSegmentsContainer = (segmentContainer, targetNumLeds, startPosition = 1, debug = false) => {
  const downsizeSegmentLeds = (segments, targetLedCount) => {
    if (debug) console.log('downsizeSegmentLeds input:', segments, 'targetLedCount:', targetLedCount)

    const deserialize = (segments) => {
      const result = segments.reduce((acc, segment) => {
        const [count, position, color, hasTrail, trailColor] = segment.split(';')
        for (let i = 0; i < count; i++) {
          acc.push({ count: 1, position: parseFloat(position), color, hasTrail, trailColor })
        }
        return acc
      }, [])
      if (debug) console.log('deserialize result:', result)
      return result
    }

    const serialize = (segments) => {
      const result = segments.map(segment => `${segment.count};${segment.position};${segment.color};${segment.hasTrail};${segment.trailColor}`)
      if (debug) console.log('serialize result:', result)
      return result
    }

    const downsize = (segments, targetLedCount) => {
      if (targetLedCount === 1) {
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
        if (debug) console.log('colorGroups:', colorGroups)

        const sortedColorGroup =
          Object
            .keys(colorGroups)
            .map((color) => {
              const colorGroup = colorGroups[color]
              const sortedColorGroup = colorGroup.sort((a, b) => b.position - a.position)
              return sortedColorGroup
            })
            .sort((a, b) => b[0].position - a[0].position)
        if (debug) console.log('sortedColorGroup:', sortedColorGroup)

        const colors =
          sortedColorGroup.reduce((acc, colorGroup) => {
            const proportionalCount = Math.round((Math.round(((colorGroup.length / segments.length) * 100)) / 100) * targetLedCount)
            return {
              ...acc,
              [colorGroup[0].color]: {
                count: 0,
                proportionalCount
              }
            }
          }, {})

        if (Object.values(colors).reduce((acc, color) => acc + color.proportionalCount, 0) < targetLedCount) {
          colors[sortedColorGroup[0][0].color].proportionalCount++
        }

        if (debug) {
          console.log('colors:', colors)
          console.log('targetLedCount:', targetLedCount)
          console.log('segments:', segments)
          console.log('sortedColorGroup:', sortedColorGroup)
          console.log(Object.values(colors).reduce((acc, color) => acc + color.proportionalCount, 0))
        }

        const result = []
        let i = 0
        while (i < targetLedCount) {
          let j = 0
          while (j < sortedColorGroup.length && i < targetLedCount) {
            // Skip empty arrays
            if (sortedColorGroup[j].length === 0) {
              j++
              continue
            }

            // Peek at the segment without removing it yet
            const segment = sortedColorGroup[j][0]

            // if (debug) {
            //   console.log(`i: ${i}, j: ${j}, segment: ${segment.color}, count: ${colors[segment.color].count}, proportionalCount: ${colors[segment.color].proportionalCount}`)
            //   console.log({ result })
            // }

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

    const parsedSegments = deserialize(segments)

    if (debug) {
      console.log('parsedSegments first position:', parsedSegments[0]?.position)
      console.log('parsedSegments last position:', parsedSegments[parsedSegments.length - 1]?.position)
      console.log('parsedSegments length:', parsedSegments.length, 'is even:', parsedSegments.length % 2 === 0)
      console.log('targetLedCount:', targetLedCount, 'is even:', targetLedCount % 2 === 0)
    }

    if (parsedSegments[0].position === parsedSegments[parsedSegments.length - 1].position && parsedSegments.length % 2 === 0 && targetLedCount % 2 === 0) {
      // Middle based, even number of segments
      if (debug) console.log('Using middle-based even strategy')
      const leftHalf = downsize(parsedSegments.slice(0, parsedSegments.length / 2), targetLedCount / 2)
      const result = [...leftHalf, ...leftHalf.reverse()]
      if (debug) console.log('Final result (middle-based even):', result)
      return serialize(result)
    } else if (parsedSegments[0].position === parsedSegments[parsedSegments.length - 1].position && parsedSegments.length % 2 !== 0 && targetLedCount % 2 !== 0) {
      // Middle based, uneven number of segments
      if (debug) console.log('Using middle-based uneven strategy')
      const midpoint = Math.floor(parsedSegments.length / 2)
      if (debug) console.log('Midpoint:', midpoint, 'Middle segment:', parsedSegments[midpoint])
      const leftHalf = downsize(parsedSegments.slice(0, midpoint), Math.floor(targetLedCount / 2))
      const result = [...leftHalf, parsedSegments[midpoint], ...leftHalf.reverse()]
      if (debug) console.log('Final result (middle-based uneven):', result)
      return serialize(result)
    } else {
      // Left to right based
      if (debug) console.log('Using left-to-right strategy')
      const result = downsize(parsedSegments, targetLedCount)
      if (debug) console.log('Final result (left-to-right):', result)
      return serialize(result)
    }
  }

  const numLeds = countSegmentLeds(segmentContainer.Segments)
  if (targetNumLeds === 0) {
    return {
      ...segmentContainer,
      Segments: [],
      SegmentsCount: 0
    }
  } else if (numLeds <= targetNumLeds) {
    return {
      ...segmentContainer,
      StartPosition: startPosition + Math.round((targetNumLeds - numLeds) / 2),
    }
  } else {
    const downsizedSegments = downsizeSegmentLeds(segmentContainer.Segments, targetNumLeds, debug)
    return {
      ...segmentContainer,
      StartPosition: startPosition,
      Segments: downsizedSegments,
      SegmentsCount: downsizedSegments.length
    }
  }
}

export const downsizeAnimationContainer = (animationContainer, targetNumLeds, startPosition = 1, debug = false) => {
  const downsizeFrames = (frames, targetNumLeds) => {
    const deserialize = (frames) => {
      return frames.map(frame => {
        return {
          ...frame,
          Colors: frame.Colors.split(';').map(_color => {
            const [unknown, position, color] = _color.split(',')
            return {
              unknown,
              position: parseInt(position, 10),
              color
            }
          })
        }
      })
    }

    const serialize = (frames) => {
      return frames.map(frame => ({
        ...frame,
        Colors: frame.Colors.map(color => `${color.unknown},${color.position},${color.color}`).join(';')
      }))
    }

    const parsedFrames = deserialize(frames)
    const numLeds = countFramesLeds(frames)
    const slice = numLeds <= targetNumLeds ? 0 : Math.round((numLeds - targetNumLeds) / 2)
    const min = slice
    const max = (targetNumLeds - 1) - slice

    if (debug) {
      console.log({ numLeds, targetNumLeds, slice, min, max })
    }

    return serialize(parsedFrames.map((frame) => {
      return {
        ...frame,
        Colors:
          frame.Colors
            .filter(color => {
              return numLeds <= targetNumLeds || color.position >= min && color.position <= max
            })
            .map(color => {
              return {
                ...color,
                position: color.position - slice,
              }
            })
            .sort((a, b) => {
              return a.position - b.position
            })
      }
    }))
  }

  const numLeds = countFramesLeds(animationContainer.Animation.Frames)
  if (targetNumLeds === 0) {
    return {
      ...animationContainer,
      StartPosition: startPosition,
      Animation: {
        ...animationContainer.Animation,
        StartPosition: 1,
        Columns: 0,
        Frames: []
      }
    }
  } else {
    const downsizedFrames = downsizeFrames(animationContainer.Animation.Frames, targetNumLeds, debug)
    return {
      ...animationContainer,
      // StartPosition: numLeds <= targetNumLeds ? startPosition + Math.round((targetNumLeds - numLeds) / 2) : startPosition,
      StartPosition: 1,
      Animation: {
        ...animationContainer.Animation,
        StartPostion: 1,
        Columns: countFramesLeds(downsizedFrames),
        Frames: downsizedFrames
      }
    }
  }
}