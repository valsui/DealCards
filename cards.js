const VALUES = {
    'A': [1, 14],
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    'J': 11,
    'Q': 12,
    'K': 13
};

class Card {
    constructor(suit, face) {
        this.suit = suit;
        this.face = face;
        this.color = (this.suit === 'diamond' || this.suit === 'heart' ? 'red' : 'black');
        this.value = VALUES[this.face];
    }
}

class Deck {
    constructor(cards) {
        this.cards = cards || this.initialize();
        this.count = this.cards.length;
    }

    initialize() {
        let cards = [];
        const suits = ['club', 'diamond', 'spade', 'heart'];
        const faces = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < faces.length; j++) {
                cards.push(new Card(suits[i], faces[j]));
            }
        }

        return cards;
    }

    shuffle() {
        let currentIdx = this.count;
        let tempIdx, tempVal;

        while (currentIdx !== 0) {
            //get a random index
            tempIdx = Math.floor(Math.random() * currentIdx);
            currentIdx--;

            tempVal = this.cards[currentIdx];
            this.cards[currentIdx] = this.cards[tempIdx];
            this.cards[tempIdx] = tempVal;

        }
    }

    deal(count) {
        let dealtCards = [];
        if (count <= this.count) {
            dealtCards = this.cards.splice(0, count);
            this.count -= count;
        }
        return dealtCards;
    }

    add(cards) {
        this.cards.concat(cards);
        return this.cards;
    }
}

let deck = new Deck();
deck.shuffle();

const dealButtom = document.getElementById('deal');
const cardsLeft = document.querySelector('.cards-left')
const newDeck = document.getElementById('new-deck');

// deal.addEventListener('click', () => {
//   let dealCards = [];
//   if(deck.count >= 5){
//      dealCards = deck.deal(5);
//   }else{
//     dealCards = deck.deal(deck.count);
//   }

//   dealCards.forEach((card, idx) => {
//     const cardDiv = document.querySelector(`.card-${idx+1}`);
//     cardDiv.children[0].innerText = card.face;
//     cardDiv.children[2].innerText = card.face;
//     cardDiv.children[1].innerText = card.suit;
//     cardDiv.style.color = card.color;
//   })
//   cardsLeft.innerText = `Cards Left:${deck.count}`;
// })

//dynamic version 
const getNumCards = () => {
    const dealNum = document.getElementById('deal-num')
    return dealNum.value;
}

const createCard = (card, number) => {

    let thing = `<div class='card card-${number}' style='color:${card.color}'>
  <div class='value-top'>${card.face}</div>
  <div class='suit'>${card.suit}</div>
  <div class='value-bottom'>${card.face}</div>
  </div>`;

    return thing;
}

const createCards = (cards) => {
    let allCards = '';

    cards.forEach((c, idx) => {
        allCards += createCard(c, idx);
    })

    return allCards;
}

deal.addEventListener('click', () => {
    let dealCards = [];
    const num = getNumCards();
    if (deck.count >= num) {
        deckCards = deck.deal(num);
    } else {
        deckCards = deck.deal(deck.count);
    }

    deck.count = deck.cards.length;
    const cardsDiv = createCards(deckCards);

    document.querySelector('.cards').innerHTML = cardsDiv;
    cardsLeft.innerText = `Cards Left: ${deck.count}`;

});

newDeck.addEventListener('click', () => {
    deck = new Deck();
    deck.shuffle();
    console.log(deck);
    cardsLeft.innerText = `Cards Left: ${deck.count}`;
    document.querySelector('.cards').innerHTML = '';
})