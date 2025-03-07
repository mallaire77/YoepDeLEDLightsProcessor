export default () => {
    const args = process.argv.slice(2)
    const options = {
        version: '20250102',
        wheel: undefined,
        preprocess: undefined,
        settings: {
            left: 3,
            middle: 16,
            right: 3,
            leds: undefined,
            brightness: undefined,
            customLeftStart: undefined,
            customMiddleStart: undefined,
            customRightStart: undefined,
            reverseLeftModule: undefined,
            reverseRightModule: undefined,
        }
    }
    for (let i = 0; i < args.length; i++) {
        if (args[i].startsWith('--')) {
            switch (args[i]) {
                case '--version':
                    options.version = args[i + 1]
                    i++
                    break

                case '--left':
                    options.settings.left = parseInt(args[i + 1], 10)
                    i++
                    break

                case '--middle':
                    options.settings.middle = parseInt(args[i + 1], 10)
                    i++
                    break

                case '--right':
                    options.settings.right = parseInt(args[i + 1], 10)
                    i++
                    break

                case '--leds':
                    options.settings.leds = parseInt(args[i + 1], 10)
                    i++
                    break

                case '--brightness':
                    options.settings.brightness = parseInt(args[i + 1], 10)
                    i++
                    break

                case '--custom-left-start':
                    options.settings.customLeftStart = parseInt(args[i + 1], 10)
                    i++
                    break

                case '--custom-middle-start':
                    options.settings.customMiddleStart = parseInt(args[i + 1], 10)
                    i++
                    break

                case '--custom-right-start':
                    options.settings.customRightStart = parseInt(args[i + 1], 10)
                    i++
                    break

                case '--reverse-left-module':
                    options.settings.reverseLeftModule = true
                    break

                case '--reverse-right-module':
                    options.settings.reverseRightModule = true
                    break

                case '--wheel':
                    options.wheel = args[i + 1]
                    i++
                    break

                case '--pre-process':
                    options.preprocess = true
                    break

                default:
                    console.error(`Unknown option: ${args[i]}`)
                    process.exit(1)
            }
        } else {
            console.error(`Unknown argument: ${args[i]}`)
            process.exit(1)
        }
    }

    if (!options.version || options.settings.left > 3 || options.settings.middle > 16 || options.settings.right > 3) {
        console.error('Invalid options! See man page for more information.')
        process.exit(1)
    } else {
        return options
    }
}