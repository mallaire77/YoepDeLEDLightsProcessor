import { countSegments, downsizeSegments } from './common'

describe('countSegments', () => {
  test('should count segments correctly', () => {
    const segments = [
      "1;13250;Red;0;",
      "1;13280;Red;0;",
      "1;13310;Red;0;",
      "1;13340;Red;1;Red",
      "1;13362;Red;0;",
      "6;13385;Cyan;0;"
    ]

    expect(countSegments(segments)).toBe(11) // 1+1+1+1+1+6 = 11
  })

  test('should handle empty array', () => {
    expect(countSegments([])).toBe(0)
  })

  test('should handle segments with large numbers', () => {
    const segments = [
      "100;13250;Red;0;",
      "250;13280;Blue;0;"
    ]

    expect(countSegments(segments)).toBe(350) // 100+250 = 350
  })

  test('should handle malformed segments gracefully', () => {
    const segments = [
      "5;13250;Red;0;",
      "invalid",
      "10;13280;Blue;0;"
    ]

    // The invalid segment will result in NaN, which when added becomes NaN
    expect(countSegments(segments)).toBeNaN()
  })
})

describe('downsizeSegments', () => {
  test('should return original segments if count is already less than requested', () => {
    const segments = [
      "1;0;Red;0;",
      "1;50;Blue;0;"
    ]
    expect(downsizeSegments(segments, 3)).toBe(segments)
  })

  test('should downsize segments to requested count', () => {
    const segments = [
      "1;0;Red;1;Blue",
      "1;25;Red;1;Blue",
      "1;50;Green;1;Blue",
      "1;75;Green;1;Blue",
      "1;100;Blue;1;Blue"
    ]
    const result = downsizeSegments(segments, 3)
    expect(result.length).toBe(3)
    expect(countSegments(result)).toBe(3)
  })

  test('should maintain color distribution when downsizing', () => {
    const segments = [
      "1;0;Red;1;Blue",
      "1;20;Red;1;Blue",
      "1;40;Green;1;Blue",
      "1;60;Green;1;Blue",
      "1;80;Blue;1;Blue",
      "1;100;Blue;1;Blue"
    ]
    const result = downsizeSegments(segments, 3)

    // Should have one of each color
    const colors = result.map(s => s.split(';')[2])
    expect(colors).toContain('Red')
    expect(colors).toContain('Green')
    expect(colors).toContain('Blue')
  })

  test('should handle invalid numberOfSegments', () => {
    const segments = [
      "1;0;Red;1;Blue",
      "1;50;Green;1;Blue",
      "1;100;Blue;1;Blue"
    ]
    expect(downsizeSegments(segments, 0)).toBe(segments)
    expect(downsizeSegments(segments, -1)).toBe(segments)
  })

  test('should preserve trail information', () => {
    const segments = [
      "1;0;Red;1;Blue",
      "1;25;Red;1;Blue",
      "1;50;Green;1;Blue",
      "1;75;Green;0;",
      "1;100;Blue;0;"
    ]
    const result = downsizeSegments(segments, 3)

    // Check that trail information is preserved
    const firstSegment = result[0].split(';')
    expect(firstSegment[3]).toBe('1') // hasTrail
    expect(firstSegment[4]).toBe('Blue') // trailColor
  })

  test('should handle segments with count > 1', () => {
    const segments = [
      "2;0;Red;1;Blue",
      "3;50;Green;1;Blue",
      "5;100;Blue;0;"
    ]
    const result = downsizeSegments(segments, 5)
    expect(result.length).toBe(5)
    expect(countSegments(result)).toBe(5)
  })

  test('should handle left-to-right pattern with multiple LEDs per segment', () => {
    const segments = [
      "2;0;Red;1;Blue",    // 2 LEDs at position 0
      "3;25;Red;1;Blue",   // 3 LEDs at position 25
      "2;50;Green;1;Blue", // 2 LEDs at position 50
      "3;75;Green;1;Blue", // 3 LEDs at position 75
      "2;100;Blue;1;Blue"  // 2 LEDs at position 100
    ]
    // Total: 12 LEDs, downsize to 6
    const result = downsizeSegments(segments, 6)
    expect(countSegments(result)).toBe(6)

    // Check positions are still in ascending order
    const positions = result.map(s => parseFloat(s.split(';')[1]))
    expect(positions).toEqual([...positions].sort((a, b) => a - b))
  })

  test('should handle middle-out pattern', () => {
    // Middle-out pattern: starts in middle and expands outward
    const segments = [
      "2;50;Yellow;1;Blue",  // Middle
      "2;25;Green;1;Blue",   // Left of middle
      "2;75;Green;1;Blue",   // Right of middle
      "2;0;Red;1;Blue",      // Far left
      "2;100;Red;1;Blue"     // Far right
    ]
    // Total: 10 LEDs, downsize to 5
    const result = downsizeSegments(segments, 5)
    expect(countSegments(result)).toBe(5)

    // Check that we have segments from different positions
    const positions = result.map(s => parseFloat(s.split(';')[1]))
    const uniquePositions = new Set(positions)
    expect(uniquePositions.size).toBeGreaterThan(1)
  })

  test('should handle middle-in pattern', () => {
    // Middle-in pattern: starts at edges and moves inward
    const segments = [
      "2;0;Red;1;Blue",      // Far left
      "2;100;Red;1;Blue",    // Far right
      "2;25;Green;1;Blue",   // Left middle
      "2;75;Green;1;Blue",   // Right middle
      "2;50;Yellow;1;Blue"   // Center
    ]
    // Total: 10 LEDs, downsize to 4
    const result = downsizeSegments(segments, 4)
    expect(countSegments(result)).toBe(4)

    // Check that we have a good distribution of positions
    const positions = result.map(s => parseFloat(s.split(';')[1]))
    expect(Math.max(...positions) - Math.min(...positions)).toBeGreaterThan(50)
  })

  test('should handle complex patterns with varying LED counts', () => {
    const segments = [
      "3;0;Red;1;Blue",      // 3 LEDs at left
      "1;20;Red;1;Blue",     // 1 LED
      "4;40;Green;1;Blue",   // 4 LEDs
      "2;60;Green;1;Blue",   // 2 LEDs
      "5;80;Blue;1;Blue",    // 5 LEDs
      "3;100;Blue;1;Blue"    // 3 LEDs at right
    ]
    // Total: 18 LEDs, downsize to 9
    const result = downsizeSegments(segments, 9)
    expect(countSegments(result)).toBe(9)

    // Check that all colors are represented
    const colors = result.map(s => s.split(';')[2])
    expect(colors).toContain('Red')
    expect(colors).toContain('Green')
    expect(colors).toContain('Blue')
  })

  test('should handle segments with same position but different colors', () => {
    const segments = [
      "2;0;Red;1;Blue",      // 2 LEDs at position 0, red
      "2;0;Green;1;Blue",    // 2 LEDs at position 0, green
      "2;50;Yellow;1;Blue",  // 2 LEDs at position 50
      "2;100;Blue;1;Blue",   // 2 LEDs at position 100
      "2;100;Cyan;1;Blue"    // 2 LEDs at position 100, different color
    ]
    // Total: 10 LEDs, downsize to 5
    const result = downsizeSegments(segments, 5)
    expect(countSegments(result)).toBe(5)

    // Check that we have segments from different positions
    const positions = result.map(s => parseFloat(s.split(';')[1]))
    expect([...new Set(positions)].length).toBeGreaterThanOrEqual(2)
  })
})