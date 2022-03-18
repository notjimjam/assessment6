const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
const {bots, playerRecord} = require('./data')
const {shuffleArray} = require('./utils')
const Rollbar = require('rollbar')

app.use(express.json())
app.use(cors())

//rollbar stuff
var rollbar = new Rollbar({
    accessToken: 'be0c3edd65044088b78755398300911a',
    captureUncaught: true,
    captureUnhandledRejections: true,
  })

//generic rollbar message
rollbar.log('Hello world!')

app.get("/", function(req, res) {
    rollbar.info("HTML has been linked")
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.get("/js", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.js"))
})

app.get('/api/robots', (req, res) => {
    try {
        rollbar.info("someone can see all the bots")
        res.status(200).send(bots)
    } catch (error) {
        rollbar.error("there is an error getting bots")
        console.log('ERROR GETTING BOTS', error)
        res.sendStatus(400)
    }
})

app.get('/api/robots/five', (req, res) => {
    try {
        rollbar.info("someone drew 5 bots to choose from")
        let shuffled = shuffleArray(bots)
        let choices = shuffled.slice(0, 5)
        let compDuo = shuffled.slice(6, 8)
        res.status(200).send({choices, compDuo})
    } catch (error) {
        rollbar.error("someone didn't recieve 5 bots")
        console.log('ERROR GETTING FIVE BOTS', error)
        res.sendStatus(400)
    }
})

app.post('/api/duel', (req, res) => {
    try {
        rollbar.info("someone wants to duel")
        // getting the duos from the front end
        let {compDuo, playerDuo} = req.body

        // adding up the computer player's total health and attack damage
        let compHealth = compDuo[0].health + compDuo[1].health
        let compAttack = compDuo[0].attacks[0].damage + compDuo[0].attacks[1].damage + compDuo[1].attacks[0].damage + compDuo[1].attacks[1].damage
        
        // adding up the player's total health and attack damage
        let playerHealth = playerDuo[0].health + playerDuo[1].health
        let playerAttack = playerDuo[0].attacks[0].damage + playerDuo[0].attacks[1].damage + playerDuo[1].attacks[0].damage + playerDuo[1].attacks[1].damage
        
        // calculating how much health is left after the attacks on each other
        let compHealthAfterAttack = compHealth - playerAttack
        let playerHealthAfterAttack = playerHealth - compAttack

        // comparing the total health to determine a winner
        if (compHealthAfterAttack > playerHealthAfterAttack) {
            rollbar.warning("someone lost a duel")
            playerRecord.losses++
            res.status(200).send('You lost!')
        } else {
            rollbar.info("someone won a duel")
            playerRecord.wins++
            res.status(200).send('You won!')
        }
    } catch (error) {
        console.log('ERROR DUELING', error)
        res.sendStatus(400)
    }
})

app.get('/api/player', (req, res) => {
    try {
        res.status(200).send(playerRecord)
    } catch (error) {
        console.log('ERROR GETTING PLAYER STATS', error)
        res.sendStatus(400)
    }
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})