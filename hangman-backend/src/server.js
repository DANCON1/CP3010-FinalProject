import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient } from 'mongodb';

const app = express();
const port = 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, '../build')));

app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

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

//update user stat records
app.post('/api/hangman/update-stats', async (req, res) => {
    try{
    // Extract IP address and remainingLife from req
    const { ipAddress, remainingLife } = req.body;
  
    // Store the data in the "stats" collection in MongoDB
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    const db = client.db('hangman-db');
    await db.collection('stats').insertOne({ userIp: ipAddress, gameLife: remainingLife });
  
    res.json({ message: 'Stats added successfully' });
    }
    catch (error) {
        console.error('Error adding stats:', error);
        res.status(500).json({ error: 'Failed to add stats' });
    }
  });

//fetch stat records by IP address
app.post('/api/hangman/stats', async (req, res) => {
try {
    // Extract ipAddress from req
    const { ipAddress } = req.body;

    // Query the "stats" collection in MongoDB for records matching the ipAddress
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    const db = client.db('hangman-db');
    const stats = await db.collection('stats').find({ userIp: ipAddress }).toArray();

    res.json({ stats });
} catch (error) {
    console.error('Error querying stats:', error);
    res.status(500).json({ error: 'Failed to query stats' });
}
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
