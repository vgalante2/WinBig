const quotes = [
    'Winning isn\'t everything, but wanting to win is. - Vince Lombardi',
    'A quitter never wins-and-a winner never quits. - Napoleon Hill',
    'Why would I want to win anything other than a beautiful game? - Patrick Rothfuss',
    'You rarely win, but sometimes you do. - Harper Lee',
    'Where\'s the pleasure in bein\' the winner if the loser ain\'t alive to know they\'ve lost?. - Terry Pratchett',
    'You\'ve got to be sure of yourself before you can ever win a prize. - Napoleon Hill',
    'Focus on what you are and what you can rather than what others aren\'t & can\'t. You have to win; they don\'t necessarily have to lose for you! - Alok Mishra',
    'It\'s easy to win. Anybody can win.. - Philip K. Dick',
    'Sometimes in life you don\'t always feel like a winner, but that doesn\'t mean you\'re not a winner. - Lady Gaga',
    'If you lose your temper, you lose! - Richard Diaz',
    'It is deeply satisfying to win a prize in front of a lot of people. - E.B. White',
    'More powerful than the will to win is the courage to begin. - Orrin Woodward',
    'Winning isn\'t everything, it\'s just the ONLY thing. - Henry Sanders',
    'Associating with winners may not make you a winner, but associating with losers will definitely not make you one. - Jeffrey Fry',
    'I have no sense of humor about losing. - Rafael Nadal',
    'Winning is a state of mind that embraces everything you do. - Bryce Courtenay',
    'Obstacles are challenges for winners and excuses for losers. - M.E. Kerr',
    'No man can be a failure if he thinks he\'s a success; if he thinks he\'s a winner, then he is. - Robert W. Service'
]

function newQuote() {
    const randomNumber = Math.floor(Math.random() * (quotes.length));
    document.getElementById('quoteDisplay').innerHTML = quotes[randomNumber];
}