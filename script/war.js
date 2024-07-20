
class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
        this.image = `./images/${rank}_of_${suit}.png`; // Assumes images are named like "2_of_hearts.png"
    }
}

class Deck {
    constructor() {
        this.cards = [];
        this.suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        this.ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        this.initializeDeck();
    }

    initializeDeck() {
        this.cards = [];
        for (let suit of this.suits) {
            for (let rank of this.ranks) {
                this.cards.push(new Card(suit, rank));
            }
        }
        this.shuffle();
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    deal() {
        return this.cards.pop();
    }

    isEmpty() {
        return this.cards.length === 0;
    }
}

class WarGame {
    constructor() {
        this.deck = new Deck();
        this.player1Card = null;
        this.player2Card = null;
        this.isPlayer1Turn = true;
        this.result = document.getElementById('result');

        const player1CardImage = document.getElementById('player1-card');
        const player2CardImage = document.getElementById('player2-card');

        player1CardImage.addEventListener('click', () => this.handleCardClick('player1'));
        player2CardImage.addEventListener('click', () => this.handleCardClick('player2'));
    }

    handleCardClick(player) {
        if (this.deck.isEmpty()) {
            this.result.textContent = 'No more cards in the deck!';
            return;
        }

        if (player === 'player1' && this.isPlayer1Turn) {
            this.player1Card = this.deck.deal();
            this.updateCardImage('player1', this.player1Card);
            this.isPlayer1Turn = false;
        } else if (player === 'player2' && !this.isPlayer1Turn) {
            this.player2Card = this.deck.deal();
            this.updateCardImage('player2', this.player2Card);
            this.isPlayer1Turn = true;
            this.determineWinner();
        }
    }

    updateCardImage(player, card) {
        const imageElement = document.getElementById(`${player}-card`);
        imageElement.src = card.image;
    }

    determineWinner() {
        if (!this.player1Card || !this.player2Card) return;

        const rankValues = {
            '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
            'J': 11, 'Q': 12, 'K': 13, 'A': 14
        };

        const player1Value = rankValues[this.player1Card.rank];
        const player2Value = rankValues[this.player2Card.rank];

        if (player1Value > player2Value) {
            this.result.textContent = 'Player 1 Wins!';
        } else if (player1Value < player2Value) {
            this.result.textContent = 'Player 2 Wins!';
        } else {
            this.result.textContent = 'It\'s a Tie!';
        }
    }
}

// Initialize the game
let game = new WarGame();
document.getElementById("restart").addEventListener("click", () => {
    game = new WarGame();
})