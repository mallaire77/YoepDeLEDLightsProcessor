// - The maximum number of leds when the targetNumLeds is even will be 16
// - The maximum number of leds when the targetNumLeds is uneven will be 15
// - We're not sure what the minimum number of leds are, but it's possible it's less than targetNumLeds
// - If targetNumLeds is even the the number of leds will have an even number
// - If targetNumLeds is uneven the number of leds will have be an uneven number
// - targetNumLeds is a range from 0-16

export const downsizeRPMSegmentsContainer = (segmentContainer, targetNumLeds, startPosition = 1) => {
  const numLeds = countSegmentLeds(segmentContainer.Segments)
  if (numLeds <= targetNumLeds) {
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
  const numLeds = countFrameLeds(animationContainer.Animation.Frames[0])
  if (numLeds < targetNumLeds) {
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
        Columns: countFrameLeds(downsizedFrames[0]),
        Frames: downsizedFrames
      }
    }
  }
}

export const countFrameLeds = (frame) => {
  return frame.Colors.split(',').length
}

export const countSegmentLeds = (segments) => {
  return segments.reduce((acc, segment) => {
    const parts = segment.split(';')
    return acc + parseInt(parts[0])
  }, 0)
}

export const downsizeSegmentLeds = (segments, targetLedCount) => {
  const parseSegment = (segment) => {
    const [count, position, color, hasTrail, trailColor] = segment.split(';')
    const segments = []
    for (let i = 0; i < count; i++) {
      segments.push({ count: 1, position, color, hasTrail, trailColor })
    }
    return segments
  }

  const formatSegment = (segment) => {
    return `${segment.count};${segment.position};${segment.color};${segment.hasTrail};${segment.trailColor}`
  }

  const downsize = (segments, targetLedCount) => {
    if (targetLedCount === 0) {
      return []
    } else if (targetLedCount === 1) {
      return segments.sort((a, b) => parseFloat(b.position) - parseFloat(a.position)).slice(0, 1)
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
            const sortedColorGroup = colorGroup.sort((a, b) => parseFloat(b.position) - parseFloat(a.position))
            return sortedColorGroup
          })
          .sort((a, b) => parseFloat(b[0].position) - parseFloat(a[0].position))

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
        return result.sort((a, b) => parseFloat(a.position) - parseFloat(b.position))
      } else {
        //Right to left
        return result.sort((a, b) => parseFloat(b.position) - parseFloat(a.position))
      }
    }
  }

  const parsedSegments = segments.flatMap(parseSegment)
  if (targetLedCount === 0) {
    return []
  } else if (parsedSegments.length <= targetLedCount) {
    return segments.map(formatSegment)
  } else if (parsedSegments[0].position === parsedSegments[parsedSegments.length - 1].position && parsedSegments.length % 2 === 0 && targetLedCount % 2 === 0) {
    // Middle based, even number of segments
    const leftHalf = downsize(parsedSegments.slice(0, parsedSegments.length / 2), targetLedCount / 2)
    return [...leftHalf, ...leftHalf.reverse()].map(formatSegment)
  } else if (parsedSegments[0].position === parsedSegments[parsedSegments.length - 1].position && parsedSegments.length % 2 !== 0 && targetLedCount % 2 !== 0) {
    // Middle based, unever number of segments
    const midpoint = Math.floor(parsedSegments.length / 2)
    const leftHalf = downsize(parsedSegments.slice(0, midpoint), Math.floor(targetLedCount / 2))
    return [...leftHalf, parsedSegments[midpoint + 1], ...leftHalf.reverse()].map(formatSegment)
  } else {
    // Left to right based
    return downsize(parsedSegments, targetLedCount).map(formatSegment)
  }
}

export const downsizeFrames = (frames, targetNumLeds) => {
  return frames.map(frame => {
    const leds = frame.Colors.split(',')
    const slice = Math.round((leds.length - targetNumLeds) / 2)
    const updatedLeds = leds.slice(slice, -slice).join(',')
    return {
      ...frame,
      Colors: updatedLeds
    }
  })
}