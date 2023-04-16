import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table } from 'react-bootstrap';

const Stats = () => {
  const [gamesWon, setGamesWon] = useState(0);
  const [perfectScores, setPerfectScores] = useState(0);
  const [gamesLost, setGamesLost] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch IP address of the user
    const getIpAddress = async () => {
      try {
        const res = await axios.get('https://api.ipify.org/?format=json');
        const ipAddress = res.data.ip;

        // Send request to server to query stats collection using ipAddress
        const statsRes = await axios.post('/api/hangman/stats', { ipAddress });

        // Extract the stats from the response
        const stats = statsRes.data.stats;

        // Calculate the statistics based on the retrieved stats
        let gamesWonCount = 0;
        let perfectScoresCount = 0;
        let gamesLostCount = 0;
        let totalScore = 0;

        stats.forEach(stat => {
          if (stat.gameLife >= 1 && stat.gameLife <= 5) {
            gamesWonCount++;
            totalScore += stat.gameLife;
          }
          if (stat.gameLife === 5) {
            perfectScoresCount++;
          }
          if (stat.gameLife === 0) {
            gamesLostCount++;
          }
        });

        setGamesWon(gamesWonCount);
        setPerfectScores(perfectScoresCount);
        setGamesLost(gamesLostCount);
        setAverageScore(stats.length > 0 ? totalScore / stats.length : 0);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    getIpAddress();
  }, []);

  return (
    <Container>
      <h1 className="mt-4">Hangman Statistics</h1>
      {loading ? (
        <p className="mt-4">Loading...</p>
      ) : (
        <Table striped bordered hover className="mt-4" style={{ maxWidth: '300px' }}>
          <tbody>
            <tr>
              <td>Games won</td>
              <td>{gamesWon}</td>
            </tr>
            <tr>
              <td>Perfect scores</td>
              <td>{perfectScores}</td>
            </tr>
            <tr>
              <td>Games lost</td>
              <td>{gamesLost}</td>
            </tr>
            <tr>
              <td>Average score</td>
              <td>{averageScore.toFixed(2)}</td>
            </tr>
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Stats;
