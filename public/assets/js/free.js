

function handleButtonClick() {
    // Show the guess container
    document.getElementById('guessContainer').style.display = 'block';

    document.getElementById('free-btn').style.display = 'none';
}



function checkGuess() {
    // Get the user's guess
    const guess = parseInt(document.getElementById('guessInput').value);

    // Generate a random number between 0 and 5
    const randomNumber = Math.floor(Math.random() * 6);

    // Check if the guess is correct
    const isCorrect = guess === randomNumber;

    // Send the guess data to the server
    fetch('/free', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ guess, isCorrect })
    })
    .then(response => {
        if (response.ok) {
            // Handle successful response from the server
            return response.json();
        } else {
            // Handle error response from the server
            throw new Error('Failed to send guess data to the server');
        }
    })
    .then(data => {
        // Handle the server's response if necessary
        console.log(data);
    })
    .catch(error => {
        // Handle any errors that occurred during the request
        console.error('Error:', error);
    });

    // Display feedback to the user
    if (isCorrect) {
        alert('Congratulations! You guessed the correct number and earned 50 coins.');
    } else {
        alert('Sorry, your guess was incorrect. Try again.');
    }
}


