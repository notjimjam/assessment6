const {shuffleArray} = require('./utils')

describe('shuffleArray should', () => {
    // CODE HERE
    test("return an array", () => {
        expect(typeof shuffleArray).toHaveReturnedWith(Array)
    })

    test("return matching lengths", () => {
        expect(shuffleArray.length).toHaveLength(array.length)
    })
})