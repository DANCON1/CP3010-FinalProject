import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const Hangman = (props) => {
    let word = props.word;
    console.log(word);

    const [guesses, setGuesses] = useState([]);
    const [life, setLife] = useState(5);
    const [lastGuess, setLastGuess] = useState(null);
    const [error, setError] = useState(null);
    const [ipAddress, setIpAddress] = useState(null);


    const getIP = async () => {
        const res = await axios.get("https://api.ipify.org/?format=json");
        console.log(res.data);
        setIpAddress(res.data.ip);
        console.log(ipAddress);
    };

    useEffect(() => {
        // Fetch IP address when component mounts
        getIP();
    }, []);

    useEffect(() => {
        // Load guesses and life from localStorage when component mounts
        const storedGuesses = localStorage.getItem("hangmanGuesses");
        const storedLife = localStorage.getItem("hangmanLife");
        if (storedGuesses) {
            setGuesses(JSON.parse(storedGuesses));
        }
        if (storedLife) {
            setLife(parseInt(storedLife));
        }
    }, []);

    useEffect(() => {
        // Save guesses and life to localStorage whenever they change
        localStorage.setItem("hangmanGuesses", JSON.stringify(guesses));
        localStorage.setItem("hangmanLife", life.toString());
    }, [guesses, life]);

    if (word == null) {
        return <h1>Loading today's word...</h1>
    }

    // Convert word string into an array of characters
    let wordArray = word.word.split('');

    // Event handler for handling guess submission
    const handleGuessSubmit = (e) => {
        e.preventDefault();
        const guess = e.target.guess.value.toUpperCase();
        if (guess.length === 1 && /^[a-zA-Z]$/.test(guess) && !isGameWon && life > 0) {
          if (guesses.includes(guess)) {
            setError("You already guessed that letter!");
          } else {
            setError(null);
            // Update guesses with correct guesses
            setGuesses([...guesses, guess]);
            // Update life based on incorrect guesses
            if (!word.word.toLowerCase().includes(guess.toLowerCase())) {
              setLife(life - 1);
            }
            // Set lastGuess for status update
            setLastGuess(guess);
          }
        }
        // Reset input field
        e.target.guess.value = '';
        
        //For dev, restarts game on letter guess + refresh
        //localStorage.removeItem("hangmanGuesses");
        //localStorage.removeItem("hangmanLife");
    }

    // Calculate remaining life
    const remainingLife = life;

    // Check if game is won
    const isGameWon = wordArray.every((char) => guesses.includes(char.toUpperCase()));

    // Status update
    const statusUpdate = () => {
        if (lastGuess === null) {
          return "";
        } else if (isGameWon) {
          return "Congratulations, you win!";
        } else if (error) {
          return error;
        } else if (wordArray.includes(lastGuess.toLowerCase())) {
          return `Correct guess! The letter "${lastGuess.toUpperCase()}" is in the word.`;
        } else {
          return `Incorrect guess! The letter "${lastGuess.toUpperCase()}" is not in the word. You have ${remainingLife} life${remainingLife === 1 ? '' : 's'} remaining.`;
        }
      };
      

    return (
        <Container fluid='sm'>
            <Row>
                <Col>
                    <h1>Hangman!</h1>
                </Col>
            </Row>
            <Row></Row>
            <Row>
                <Col>
                    <h2>LIFE: {life}/5</h2>
                </Col>
                <Col>
                    <Image src={`${life}.png`} fluid />
                </Col>
                <Col>
                <p>
                    <h3>LETTERS GUESSED:</h3>
                    <h3>{guesses.join(", ")}</h3>
                </p>
                </Col>
            </Row>
            <Row>
                <Col>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4>WORD:</h4>
                    <h4><p>
                        {wordArray.map((char, index) => (
                            <span key={index}>
                                {guesses.includes(char.toUpperCase()) ? char.toUpperCase() : "_ "}
                            </span>
                        ))}
                    </p></h4>
                </Col>
                <Col></Col>
                <Col>
                    <Form onSubmit={handleGuessSubmit}>
                        <Form.Label>Guess a letter:</Form.Label>
                        <Row>
                            <Col>
                                <Form.Control type="text" name="guess"
                                placeholder="..."
                                maxLength={1}
                                pattern="[a-zA-Z]"
                                required
                            />
                            </Col>
                            <Col>
                                <Button type="submit">Submit</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row>
                <p>{statusUpdate()}</p>
            </Row>
            <Row>
                <p>{ipAddress && <p>IP Address: {ipAddress}</p>}</p>
            </Row>
        </Container>
    );
};

export default Hangman;
