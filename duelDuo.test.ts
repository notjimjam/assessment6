
import { Builder, Capabilities, By } from "selenium-webdriver"

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async () => {
   await driver.get('http://localhost:3000/')
})

afterAll(async () => {
   await driver.quit()
})

test('Title shows up when page loads', async () => {
    const title = await driver.findElement(By.id('title'))
    const displayed = await title.isDisplayed()
    expect(displayed).toBe(true)

    await driver.sleep(2000)
})

test("See all bots button shows all the bots", async () => {
    await driver.findElement(By.id("see-all")).click()

    const bots  = await driver.findElement(By.id("all-bots"))

    const displayed = bots.isDisplayed()

    expect(displayed).toBeTruthy

    await driver.sleep(2000)

})

test("clicking draw button displays choices", async () => {
    await driver.findElement(By.id("draw")).click()

    const choices = await driver.findElement(By.className("hide"))

    const displayed = choices.isDisplayed()

    expect(displayed).toBeTruthy

    await driver.sleep(2000)
})