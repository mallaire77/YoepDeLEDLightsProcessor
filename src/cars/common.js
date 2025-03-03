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
  return {
    ...animationContainer,
    Columns: targetNumLeds,
    StartPosition: startPosition,
    Frames: downsizeFrames(animationContainer.Frames, targetNumLeds)
  }
}

const countSegmentLeds = (segments) => {
  return segments.reduce((acc, segment) => {
    const parts = segment.split(';')
    return acc + parseInt(parts[0])
  }, 0)
}

// "Segments": [
//   "1;13250;Red;0;",
//   "1;13280;Red;0;",
//   "1;13310;Red;0;",
//   "1;13340;Red;1;Red",
//   "1;13362;Red;0;",
//   "6;13385;Cyan;0;"
// ]
//
// "Segments": [
//   "1;13250;Red;0;",
//   "1;13280;Red;0;",
//   "1;13310;Red;0;",
//   "1;13340;Red;1;Red",
//   "1;13362;Red;0;",
//   "6;13385;Cyan;0;"
// ]
//
// "Segments": [
//   "1;77.295;Lime;1;Blue",
//   "1;82.126;Lime;1;Blue",
//   "1;86.957;Yellow;1;Blue",
//   "1;91.787;Yellow;1;Blue",
//   "1;96.618;Red;1;Blue"
// ]
//
// "Segments": [
//   "1;79.385;Lime;1;Blue",
//   "1;83.541;Lime;1;Blue",
//   "1;87.697;Yellow;1;Blue",
//   "1;91.854;Yellow;1;Blue",
//   "1;95.179;Red;1;Blue",
//   "1;95.179;#FF0000;1;Blue",
//   "1;91.854;#FFFF00;1;Blue",
//   "1;87.697;#FFFF00;1;Blue",
//   "1;83.541;#00FF00;1;Blue",
//   "1;79.385;#00FF00;1;Blue"
// ]
//
// "Segments": [
//   "1;0;Lime;1;Blue",
//   "1;0;#00FF00;1;Blue",
//   "1;0;#00FF00;1;Blue",
//   "1;22.5;#00FF00;1;Blue",
//   "1;25;#00FF00;1;Blue",
//   "1;27.5;#FF0000;1;Blue",
//   "1;30;#FF0000;1;Blue",
//   "1;32.5;#FF0000;1;Blue",
//   "1;35;#FF0000;1;Blue",
//   "1;37.5;#FF0000;1;Blue",
//   "1;40;#00FFFF;1;Blue",
//   "1;42.5;#00FFFF;1;Blue",
//   "1;45;#00FFFF;1;Blue",
//   "1;47.5;#00FFFF;1;Blue",
//   "1;50;#00FFFF;1;Blue"
// ]
//
// "Segments": [
//   "1;0;Lime;1;Blue",
//   "1;0;Lime;1;Blue",
//   "1;0;#00FF00;1;Blue",
//   "1;0;#00FF00;1;Blue",
//   "1;22.5;#00FF00;1;Blue",
//   "1;25;#00FF00;1;Blue",
//   "1;27.5;#FF0000;1;Blue",
//   "1;30;#FF0000;1;Blue",
//   "1;32.5;#FF0000;1;Blue",
//   "1;35;#FF0000;1;Blue",
//   "1;37.5;#FF0000;1;Blue",
//   "1;40;#00FFFF;1;Blue",
//   "1;42.5;#00FFFF;1;Blue",
//   "1;45;#00FFFF;1;Blue",
//   "1;47.5;#00FFFF;1;Blue",
//   "1;50;#00FFFF;1;Blue"
// ]
const downsizeSegmentLeds = (segments, targetNumLeds) => {
  if (!segments || segments.length === 0 || targetNumLeds <= 0) {
    return segments
  }

  // Count the total segments in the original array
  const totalOriginalSegments = countSegmentLeds(segments)

  // If we already have fewer segments than requested, return unchanged
  if (totalOriginalSegments <= targetNumLeds) {
    return segments
  }

  // Parse all segments to extract their properties
  const parsedSegments = segments.map(segment => {
    const [count, position, color, hasTrail, trailColor] = segment.split(';')
    return {
      count: parseInt(count),
      position: parseFloat(position),
      color,
      hasTrail: parseInt(hasTrail) === 1,
      trailColor: trailColor || '',
      original: segment
    }
  })

  // Sort by position (RPM value)
  parsedSegments.sort((a, b) => a.position - b.position)

  // If we're downsizing to 3 or more segments, ensure we keep:
  // 1. The highest RPM segment (most important for shift timing)
  // 2. The lowest RPM segment (start of the range)
  // 3. Distribute the rest evenly

  const newSegments = []

  if (targetNumLeds >= 3) {
    // Always keep the highest RPM segment
    const highestRpmSegment = [...parsedSegments].sort((a, b) => b.position - a.position)[0]
    newSegments.push(`1;${highestRpmSegment.position};${highestRpmSegment.color};${highestRpmSegment.hasTrail ? 1 : 0};${highestRpmSegment.trailColor}`)

    // Always keep the lowest RPM segment
    const lowestRpmSegment = parsedSegments[0]
    newSegments.push(`1;${lowestRpmSegment.position};${lowestRpmSegment.color};${lowestRpmSegment.hasTrail ? 1 : 0};${lowestRpmSegment.trailColor}`)

    // Distribute the remaining segments evenly
    const remainingCount = targetNumLeds - 2
    if (remainingCount > 0) {
      // Filter out the segments we've already added
      const remainingSegments = parsedSegments.filter(seg =>
        seg.position !== highestRpmSegment.position &&
        seg.position !== lowestRpmSegment.position
      )

      // If we have remaining segments to distribute
      if (remainingSegments.length > 0) {
        const step = remainingSegments.length / remainingCount

        for (let i = 0; i < remainingCount; i++) {
          const index = Math.min(Math.floor(i * step), remainingSegments.length - 1)
          const segment = remainingSegments[index]

          newSegments.push(`1;${segment.position};${segment.color};${segment.hasTrail ? 1 : 0};${segment.trailColor}`)
        }
      }
    }
  } else {
    // For 1-2 segments, just pick the highest and/or lowest
    if (targetNumLeds >= 1) {
      const highestRpmSegment = [...parsedSegments].sort((a, b) => b.position - a.position)[0]
      newSegments.push(`1;${highestRpmSegment.position};${highestRpmSegment.color};${highestRpmSegment.hasTrail ? 1 : 0};${highestRpmSegment.trailColor}`)
    }

    if (targetNumLeds >= 2) {
      const lowestRpmSegment = parsedSegments[0]
      newSegments.push(`1;${lowestRpmSegment.position};${lowestRpmSegment.color};${lowestRpmSegment.hasTrail ? 1 : 0};${lowestRpmSegment.trailColor}`)
    }
  }

  // Sort the new segments by position to maintain the visual order
  newSegments.sort((a, b) => {
    const posA = parseFloat(a.split(';')[1])
    const posB = parseFloat(b.split(';')[1])
    return posA - posB
  })

  // If we have more segments than requested (due to duplicates), trim the excess
  if (newSegments.length > targetNumLeds) {
    // Keep highest and lowest, remove from the middle
    const highest = newSegments.pop()
    const lowest = newSegments.shift()

    // Trim the middle segments to fit
    while (newSegments.length > targetNumLeds - 2) {
      // Remove from the middle
      newSegments.splice(Math.floor(newSegments.length / 2), 1)
    }

    // Add back the highest and lowest
    if (lowest) newSegments.unshift(lowest)
    if (highest) newSegments.push(highest)
  }

  // If we have fewer segments than requested, duplicate some to reach the target
  while (newSegments.length < targetNumLeds) {
    // Find the largest gap between segments
    let maxGap = 0
    let maxGapIndex = 0

    for (let i = 0; i < newSegments.length - 1; i++) {
      const posA = parseFloat(newSegments[i].split(';')[1])
      const posB = parseFloat(newSegments[i + 1].split(';')[1])
      const gap = posB - posA

      if (gap > maxGap) {
        maxGap = gap
        maxGapIndex = i
      }
    }

    // Insert a new segment in the middle of the largest gap
    const segA = newSegments[maxGapIndex].split(';')
    const segB = newSegments[maxGapIndex + 1].split(';')

    const posA = parseFloat(segA[1])
    const posB = parseFloat(segB[1])
    const midPos = (posA + posB) / 2

    // Use the color of the segment with the closest position
    const color = Math.abs(midPos - posA) < Math.abs(midPos - posB) ? segA[2] : segB[2]
    const hasTrail = segA[3] === '1' || segB[3] === '1' ? '1' : '0'
    const trailColor = hasTrail === '1' ? (segA[4] || segB[4] || '') : ''

    const newSegment = `1;${midPos.toFixed(3)};${color};${hasTrail};${trailColor}`
    newSegments.splice(maxGapIndex + 1, 0, newSegment)
  }

  return newSegments
}

// "Frames": [
//   {
//     "Colors": "0,0,LawnGreen;0,2,LawnGreen;0,4,LawnGreen;0,6,Red;0,8,Red;0,10,Turquoise;0,12,Turquoise;0,14,Turquoise",
//     "FrameDuration": 150
//   },
//   {
//     "Colors": "0,1,LawnGreen;0,3,LawnGreen;0,5,Red;0,7,Red;0,9,Red;0,11,Turquoise;0,13,Turquoise",
//     "FrameDuration": 150
//   }
// ]
//
// "Frames": [
//   {
//     "Colors": "0,0,#000000;0,7,Red;0,5,#000000;0,3,#000000;0,4,#00FF00;0,2,#000000;0,6,#000000;0,1,#000000;0,8,#000000;0,9,#000000;0,10,#00FFFF;0,11,#000000;0,12,#000000;0,13,#000000;0,14,#000000",
//     "FrameDuration": 100
//   }
// ]
// 
// "Frames": [
//   {
//     "Colors": "0,0,Lime;0,1,Lime;0,2,Yellow;0,3,Yellow;0,4,Red;0,5,Red;0,6,Red;0,7,Yellow;0,8,Yellow;0,9,Lime;0,10,Lime",
//     "FrameDuration": 500
//   },
//   {
//     "Colors": "",
//     "FrameDuration": 500
//   }
// ]
// 
// "Frames": [
//   {
//     "Colors": "0,0,Red;0,1,Red;0,9,Red;0,10,Red",
//     "FrameDuration": 100
//   }
// ]
export const downsizeFrames = (frames, targetNumLeds) => {
  if (!frames || frames.length === 0 || targetNumLeds <= 0) {
    return frames
  }

  return frames.map(frame => {
    // If the frame has no colors, return it unchanged
    if (!frame.Colors || frame.Colors === "") {
      return frame
    }

    // Parse the colors string into an array of color objects
    const colorEntries = frame.Colors.split(';').filter(entry => entry.trim() !== '')

    // If there are no color entries, return the frame unchanged
    if (colorEntries.length === 0) {
      return frame
    }

    // Parse each color entry into an object with position and color
    const parsedColors = colorEntries.map(entry => {
      const [layer, position, color] = entry.split(',')
      return {
        layer,
        position: parseInt(position),
        color,
        original: entry
      }
    })

    // Find the maximum position to determine the current number of LEDs
    const maxPosition = Math.max(...parsedColors.map(c => c.position))

    // If we already have fewer or equal LEDs than requested, return unchanged
    if (maxPosition < targetNumLeds) {
      return frame
    }

    // Group colors by position to handle multiple colors at the same position
    const colorsByPosition = {}
    parsedColors.forEach(color => {
      if (!colorsByPosition[color.position]) {
        colorsByPosition[color.position] = []
      }
      colorsByPosition[color.position].push(color)
    })

    // Get all unique positions
    const positions = Object.keys(colorsByPosition).map(Number).sort((a, b) => a - b)

    // If we have fewer positions than targetNumLeds, return unchanged
    if (positions.length <= targetNumLeds) {
      return frame
    }

    // Select positions to keep
    let positionsToKeep = []

    // Always keep the first and last positions
    positionsToKeep.push(positions[0])
    positionsToKeep.push(positions[positions.length - 1])

    // Distribute the remaining positions evenly
    if (targetNumLeds > 2) {
      const remainingCount = targetNumLeds - 2
      const step = (positions.length - 2) / (remainingCount + 1)

      for (let i = 1; i <= remainingCount; i++) {
        const index = Math.min(Math.floor(i * step) + 1, positions.length - 2)
        positionsToKeep.push(positions[index])
      }
    }

    // Sort the positions to keep
    positionsToKeep.sort((a, b) => a - b)

    // Map the old positions to new positions (0 to targetNumLeds-1)
    const positionMap = {}
    positionsToKeep.forEach((oldPos, index) => {
      positionMap[oldPos] = index
    })

    // Create the new colors string
    const newColorEntries = []
    positionsToKeep.forEach(position => {
      const colorsAtPosition = colorsByPosition[position]
      colorsAtPosition.forEach(color => {
        const newPosition = positionMap[position]
        newColorEntries.push(`${color.layer},${newPosition},${color.color}`)
      })
    })

    return {
      ...frame,
      Colors: newColorEntries.join(';')
    }
  })
}
