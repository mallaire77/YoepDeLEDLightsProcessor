// - The maximum number of leds when the targetNumLeds is even will be 16
// - The maximum number of leds when the targetNumLeds is uneven will be 15
// - We're not sure what the minimum number of leds are, but it's possible it's less than targetNumLeds
// - If targetNumLeds is even the the number of leds will have an even number
// - If targetNumLeds is uneven the number of leds will have be an uneven number
// - targetNumLeds is a range from 0-16

export const downsizeRPMSegmentsContainer = (segmentContainer, targetNumLeds, startPosition = 1) => {
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
    const downsizedSegments = downsizeSegmentLeds(segmentContainer.Segments, targetNumLeds)
    return {
      ...segmentContainer,
      StartPosition: startPosition,
      Segments: downsizedSegments,
      SegmentsCount: downsizedSegments.length
    }
  }
}

export const downsizeAnimationContainer = (animationContainer, targetNumLeds, startPosition = 1) => {
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
  } else if (numLeds < targetNumLeds) {
    return {
      ...animationContainer,
      StartPosition: startPosition + Math.round((targetNumLeds - numLeds) / 2),
      Animation: {
        ...animationContainer.Animation,
        StartPostion: 1
      }
    }
  } else {
    const downsizedFrames = downsizeFrames(animationContainer.Animation.Frames, targetNumLeds)
    return {
      ...animationContainer,
      StartPosition: startPosition,
      Animation: {
        ...animationContainer.Animation,
        StartPostion: 1,
        Columns: countFramesLeds(downsizedFrames),
        Frames: downsizedFrames
      }
    }
  }
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

export const downsizeSegmentLeds = (segments, targetLedCount) => {
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

  const downsize = (segments, targetLedCount) => {
    if (targetLedCount === 1) {
      return segments.sort((a, b) => b.position - a.position).slice(0, 1)
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
          return {
            ...acc,
            [colorGroup[0].color]: {
              count: 0,
              proportionalCount: Math.round((Math.round(((colorGroup.length / segments.length) * 100)) / 100) * targetLedCount)
            }
          }
        }, {})

      const result = []
      let i = 0
      while (i < targetLedCount) {
        let j = 0
        while (j < sortedColorGroup.length && i < targetLedCount) {
          const segment = sortedColorGroup[j].shift()
          if (segment && ((i === 0 && j === 0) || (colors[segment.color].count < colors[segment.color].proportionalCount))) {
            colors[segment.color].count = colors[segment.color].count + 1
            result.push(segment)
            i++
          }
          j++
        }
      }

      if (segments[0].position < segments[segments.length - 1].position) {
        //Left to right
        return result.sort((a, b) => a.position - b.position)
      } else {
        //Right to left
        return result.sort((a, b) => b.position - a.position)
      }
    }
  }

  const parsedSegments = deserialize(segments)
  if (parsedSegments[0].position === parsedSegments[parsedSegments.length - 1].position && parsedSegments.length % 2 === 0 && targetLedCount % 2 === 0) {
    // Middle based, even number of segments
    const leftHalf = downsize(parsedSegments.slice(0, parsedSegments.length / 2), targetLedCount / 2)
    return serialize([...leftHalf, ...leftHalf.reverse()])
  } else if (parsedSegments[0].position === parsedSegments[parsedSegments.length - 1].position && parsedSegments.length % 2 !== 0 && targetLedCount % 2 !== 0) {
    // Middle based, unever number of segments
    const midpoint = Math.floor(parsedSegments.length / 2)
    const leftHalf = downsize(parsedSegments.slice(0, midpoint), Math.floor(targetLedCount / 2))
    return serialize([...leftHalf, parsedSegments[midpoint + 1], ...leftHalf.reverse()])
  } else {
    // Left to right based  
    return serialize(downsize(parsedSegments, targetLedCount))
  }
}

export const downsizeFrames = (frames, targetNumLeds) => {
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
  const slice = Math.round((numLeds - targetNumLeds) / 2)
  const min = slice
  const max = (numLeds - 1) - slice
  return serialize(parsedFrames.map((frame) => {
    return {
      ...frame,
      Colors:
        frame.Colors
          .filter(color => {
            return color.position >= min && color.position <= max
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