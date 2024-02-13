import express from 'express'
import cors from 'cors'
import { FRONTEND_URL } from './config.js'

const app = express();

app.use(cors({
    origin: FRONTEND_URL
}))

app.get('/users', (req, res) => {
    res.send({
        users: ["Me pelan toda la reata putos"]
    });
});

app.listen(3000, () => {
    console.log('server started')
});