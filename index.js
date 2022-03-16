import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv'
import connect from './config/db.js';
import book from './routes/book.js';
import login from './routes/auth.js';
import sign from './routes/test.js';

const app = express();
connect();
config()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(cors());

app.use('/api', login)
app.use('/book', book)
app.use('/sign', sign)

app.get('/', (req, res) => {
    res.send('Muffidbooks APIga xush kelibsiz!')
})

app.post('/yangi-kitob', async (req, res) => {
    res.send(req.body)
})

const PORT = 5000;

app.listen(process.env.PORT || PORT, () => {
    console.log('server ishga tushdi')
})