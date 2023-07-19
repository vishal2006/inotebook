const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
const dotenv = require('dotenv')

dotenv.config();
connectToMongo(process.env.MONGODB_URL);

const app = express()
const port = 5000

app.use(cors())

app.use(express.json())

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


app.listen(port, () => {
  console.log(`iNotebook listening on port ${port}`)
})