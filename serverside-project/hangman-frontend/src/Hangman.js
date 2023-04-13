import React from "react";
import Container from 'react-bootstrap/Container';

const Hangman = (props) => {
    let word = props.word;

    if (word == null) {
        return <h1>Loading today's word...</h1>
    }

    return (
        <Container fluid='sm'>
            <h1>Hangman!</h1>

            <h2>Today's word is '{word.word}'!</h2>
        </Container>
    );
}

export default Hangman;