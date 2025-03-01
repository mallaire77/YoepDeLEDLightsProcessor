const fiaF4 = (numberOfSegments) => (car) => {
    return {
        ...car,
        LedContainers: car.LedContainers.map(container => {
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
    }
}

export const cars = {
    fiaF4
}
