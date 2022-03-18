const {shuffleArray} = require('./utils')

let testArr = [1, 2, 3,]

describe('shuffleArray should', () => {
    // CODE HERE
    test("contain the number 1 from original array", () => {
        let testerArr = shuffleArray(testArr)
        expect(testerArr).toContain(1)
    })

    test("return matching lengths", () => {
        let returnedArr = shuffleArray(testArr)
        expect(returnedArr.length).toEqual(testArr.length)
    })

    test("return an array", () => {
        let shuffleReturn = shuffleArray(testArr)
        
        let tester = Array.isArray(shuffleReturn)

        expect(tester).toBeTruthy()
    })

})