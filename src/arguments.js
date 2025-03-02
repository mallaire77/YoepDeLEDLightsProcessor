export const getArguments = () => {
    const args = process.argv.slice(2)
    const options = {
        reference: '20250102',
        left: 3,
        middle: 15,
        right: 3,
        debug: false
    }
    const requiredOptions = ['reference', 'left', 'middle', 'right']
    for (let i = 0; i < args.length; i++) {
        if (args[i].startsWith('--')) {
            switch (args[i]) {
                case '--reference':
                    options.reference = args[i + 1]
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

    if (requiredOptions.some(option => options[option] === undefined || options[option] === null || (typeof options[option] === 'number' && isNaN(options[option])))) {
        console.error('Missing or invalid required options!')
        console.error('Usage: node src/main.js --file <file> --left <left> --middle <middle> --right <right>')
        process.exit(1)
    } else if (options.left > 3 || options.middle > 15 || options.middle < 5 || options.right > 3) {
        console.error('Invalid number of segments!')
        console.error('Usage: node src/main.js --file <file> --left <left> --middle <middle> --right <right>')
        process.exit(1)
    } else {
        return options
    }
}