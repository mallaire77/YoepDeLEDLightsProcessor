import { paths } from './paths.js'

const hpdArx01Path = [
    ...paths.rightSideFocusedPath,
    'LedContainers', { field: 'Description', value: 'Prototype' },
    'LedContainers', { field: 'CarModel', value: 'HPD ARX-01c' }
]

const hpdArx01Fn = (numberOfSegments) => (car) => {
    return {
        ...car,
        LedContainers: car.LedContainers.map(gearContainer => ({
            ...gearContainer,
            LedContainers: gearContainer.LedContainers.map(container => {
                if (container.ContainerType === "RPMSegments") {
                    return {
                        ...container,
                        SegmentsCount: numberOfSegments,
                        Segments: container.Segments ? container.Segments.slice(-numberOfSegments) : []
                    }
                } else if (container.ContainerType === "CustomStatus" && container.hasOwnProperty("LedCount")) {
                    return {
                        ...container,
                        LedCount: numberOfSegments
                    }
                } else {
                    return container
                }
            })
        }))
    }
}

export const cars = {
    hpdArx01: {
        path: hpdArx01Path,
        fn: hpdArx01Fn
    }
}