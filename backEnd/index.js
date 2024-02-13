import express from 'express'
import cors from 'cors'

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}))

app.get('/users', (req, res) => {
    res.send({
        users: []
    });
});

app.listen(3000, () => {
    console.log('server started')
});