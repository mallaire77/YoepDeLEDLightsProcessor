import { downsizeRPMSegmentsContainer, downsizeAnimationContainer } from './common'

describe('downsizeRPMSegmentsContainer', () => {
    test('should return original container when number of LEDs is less than target', () => {
        const input = {
            Segments: ['2;1;#FF0000;false;#000000'],  // 2 LEDs
            StartPosition: 1
        }
        const result = downsizeRPMSegmentsContainer(input, 4)
        expect(result.StartPosition).toBe(2) // (4 - 2) / 2 + 1 = 2
        expect(result.Segments).toEqual(input.Segments)
    })

    test('should downsize segments when number of LEDs exceeds target', () => {
        const input = {
            Segments: ['4;1;#FF0000;false;#000000'],  // 4 LEDs
            StartPosition: 1
        }
        const result = downsizeRPMSegmentsContainer(input, 2)
        expect(result.StartPosition).toBe(1)
        expect(result.Segments.length).toBe(2)
        expect(result.SegmentsCount).toBe(2)
    })

    test('should handle empty segments', () => {
        const input = {
            Segments: [],
            StartPosition: 1
        }
        const result = downsizeRPMSegmentsContainer(input, 2)
        expect(result.StartPosition).toBe(2)
        expect(result.Segments).toEqual([])
    })
})

describe('downsizeAnimationContainer', () => {
    test('should return adjusted container when number of LEDs is less than target', () => {
        const input = {
            StartPosition: 1,
            Animation: {
                Frames: [{
                    Colors: '1,0,#FF0000;1,1,#FF0000'  // 2 LEDs
                }],
                StartPostion: 1
            }
        }
        const result = downsizeAnimationContainer(input, 4)
        expect(result.StartPosition).toBe(2) // (4 - 2) / 2 + 1 = 2
        expect(result.Animation.StartPostion).toBe(1)
        expect(result.Animation.Frames).toEqual(input.Animation.Frames)
    })

    test('should downsize frames when number of LEDs exceeds target', () => {
        const input = {
            StartPosition: 1,
            Animation: {
                Frames: [{
                    Colors: '1,0,#FF0000;1,1,#FF0000;1,2,#FF0000;1,3,#FF0000'  // 4 LEDs
                }],
                StartPostion: 1
            }
        }
        const result = downsizeAnimationContainer(input, 2)
        expect(result.StartPosition).toBe(1)
        expect(result.Animation.StartPostion).toBe(1)
        expect(result.Animation.Columns).toBe(2)
        expect(result.Animation.Frames[0].Colors).toMatch(/^1,0,#FF0000;1,1,#FF0000$/)
    })

    test('should handle empty frames', () => {
        const input = {
            StartPosition: 1,
            Animation: {
                Frames: [],
                StartPostion: 1
            }
        }
        const result = downsizeAnimationContainer(input, 2)
        expect(result.StartPosition).toBe(2)
        expect(result.Animation.Frames).toEqual([])
    })
}) 