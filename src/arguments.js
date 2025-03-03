export const getArguments = () => {
    const args = process.argv.slice(2)
    const options = {
        version: '20250102',
        left: 3,
        middle: 16,
        right: 3,
        preprocess: false,
        debug: undefined
    }
    for (let i = 0; i < args.length; i++) {
        if (args[i].startsWith('--')) {
            switch (args[i]) {
                case '--version':
                    options.version = args[i + 1]
                    i++
                    break

                case '--left':
                    options.left = parseInt(args[i + 1], 10)
                    i++
                    break

                case '--middle':
                    options.middle = parseInt(args[i + 1], 10)
                    i++
                    break

                case '--right':
                    options.right = parseInt(args[i + 1], 10)
                    i++
                    break

                case '--pre-process':
                    options.preprocess = true
                    break

                case '--debug':
                    options.debug = args[i + 1]
                    i++
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

    if (!options.version || options.left > 3 || options.middle > 16 || options.right > 3) {
        console.error('Invalid number of segments!')
        console.error('Usage: node src/main.js --version <version> --left <left> --middle <middle> --right <right> --debug <path>')
        process.exit(1)
    } else {
        return options
    }
}