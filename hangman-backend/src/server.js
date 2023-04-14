import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.get('/api/hangman', async (req, res) => {

    console.log('get!');

    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();

    const db = client.db('hangman-db');

    // Get current date
    const today = new Date();
    const day = today.getDate();

    // Find a word where "day" value is equal to current date
    const wordData = await db.collection('words').findOne({ day });

    res.json(wordData);
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
//