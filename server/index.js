const express = require('express')
const ConnectDataBase = require('./Db')
const  UserRoute  = require('./Route/UserRoute')
const cors = require('cors')

const app = express()
const port = 5000

app.use(express.json())
app.use(cors())

ConnectDataBase()

app.use("/api/user", UserRoute)


// GET THE IMAGE FROM BACKEND TO FRONT-END
app.use("/api/image", express.static('./upload'))

app.listen(port, () => {
    console.log(`Server running in ${port}`);
})