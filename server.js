const axios = require('axios').default;
const express = require('express');
const cors = require('cors');
const PORT = process.port || 3000;
require('dotenv').config()

const app = express();

app.use(cors());
app.use(express.json());

app.post('/get-solution', (req,res) => {
    const options = {
        method: 'POST',
        url: 'https://solve-sudoku.p.rapidapi.com/',
        headers: {
            'content-type': 'application/json',
            'x-rapidapi-host': 'solve-sudoku.p.rapidapi.com',
            'x-rapidapi-key': process.env.API_KEY,
        },
        data: {
            puzzle: req.body.numbers
        }
    };

    axios.request(options).then(response => {
        console.log(response.data);
        res.json(response.data);
    }).catch(error => {
        console.error(error);
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})