require('dotenv').config()
const express = require('express')
const connectDatabase = require('./config/db')

const cors = require('cors')
const path = require('path');
const bodyParser = require('body-parser');
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], 
    exposedHeaders: ['Content-Type'],
  }

const app = express()


app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


connectDatabase()
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/auth', require('./routes/auth'))
app.use('/users', require('./routes/user'))
app.use('/posts', require('./routes/post'))
app.use('/rents', require('./routes/rent'))
app.use('/ratings', require('./routes/rating'))
app.use('/comments', require('./routes/comment'))


app.listen(5000, () => {
    console.log("Successfully running on port 5000")
})
