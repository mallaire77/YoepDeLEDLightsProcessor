// "Segments": [
//   "1;13250;Red;0;",
//   "1;13280;Red;0;",
//   "1;13310;Red;0;",
//   "1;13340;Red;1;Red",
//   "1;13362;Red;0;",
//   "6;13385;Cyan;0;"
// ]
export const countSegments = (segments) => {
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
export const downsizeSegments = (segments, numberOfSegments) => {
  const totalSegments = countSegments(segments)
  if (totalSegments <= numberOfSegments) return segments

  // Calculate how many segments to keep from each entry
  const ratio = numberOfSegments / totalSegments

  const result = []
  let segmentsAdded = 0

  for (let i = 0; i < segments.length; i++) {
    const parts = segments[i].split(';')
    const segmentCount = parseInt(parts[0])

    // Calculate how many segments to keep from this entry
    let keepSegments = Math.round(segmentCount * ratio)

    // Ensure we don't exceed the target number of segments
    if (segmentsAdded + keepSegments > numberOfSegments) {
      keepSegments = numberOfSegments - segmentsAdded
    }

    // If we need to keep at least one segment from this entry
    if (keepSegments > 0) {
      // Create a new segment entry with adjusted count
      parts[0] = keepSegments.toString()
      result.push(parts.join(';'))
      segmentsAdded += keepSegments
    }

    // Stop if we've reached the target
    if (segmentsAdded >= numberOfSegments) break
  }

  return result
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
export const downsizeFrames = (frames, numberOfSegments) => {
  if (!frames || frames.length === 0) return frames

  return frames.map(frame => {
    // Skip frames without Colors property
    if (!frame.Colors) return frame

    const colorEntries = frame.Colors.split(';')
    const maxSegmentIndex = colorEntries.reduce((max, entry) => {
      const parts = entry.split(',')
      const segmentIndex = parseInt(parts[1])
      return Math.max(max, segmentIndex)
    }, 0)

    // If we already have fewer segments than requested, return unchanged
    if (maxSegmentIndex < numberOfSegments - 1) return frame

    // Calculate scaling ratio
    const ratio = (numberOfSegments - 1) / maxSegmentIndex

    // Create new color entries with scaled positions
    const newColorEntries = colorEntries.map(entry => {
      const parts = entry.split(',')
      const module = parts[0]
      const originalPosition = parseInt(parts[1])
      const color = parts[2]

      // Calculate new position and round to nearest integer
      const newPosition = Math.round(originalPosition * ratio)

      return `${module},${newPosition},${color}`
    })

    // Remove duplicates (multiple colors mapped to same position)
    // Keep the last color for each position (as it would visually override earlier ones)
    const positionMap = new Map()
    newColorEntries.forEach(entry => {
      const [module, position, color] = entry.split(',')
      const key = `${module},${position}`
      positionMap.set(key, color)
    })

    const uniqueEntries = Array.from(positionMap.entries())
      .map(([key, color]) => `${key},${color}`)

    // Return new frame with updated Colors
    return {
      ...frame,
      Colors: uniqueEntries.join(';')
    }
  })
}
