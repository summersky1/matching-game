document.addEventListener('DOMContentLoaded', () => {
    const cardArray = [
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            name: 'pizza',
            img: 'images/pizza.png'
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png'
        },
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            name: 'pizza',
            img: 'images/pizza.png'
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png'
        }
    ]

    const grid = document.querySelector('.grid')
    const score = document.querySelector('#score')

    let chosenCardNames = []
    let chosenCardIds = []
    let clearedCards = []

    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            let card = document.createElement('img')
            card.setAttribute('src', 'images/blank.png')
            card.setAttribute('data-id', i)
            card.addEventListener('click', flipCard)
            grid.appendChild(card)
        }
    }

    function checkForMatch() {
        let cards = document.querySelectorAll('img')
        const firstCardId = chosenCardIds[0]
        const secondCardId = chosenCardIds[1]
        if (chosenCardNames[0] === chosenCardNames[1]) {
            alert('You found a match')
            cards[firstCardId].setAttribute('src', 'images/white.png')
            cards[secondCardId].setAttribute('src', 'images/white.png')
            clearedCards.push(chosenCardNames)
        } else {
            cards[firstCardId].setAttribute('src', 'images/blank.png')
            cards[secondCardId].setAttribute('src', 'images/blank.png')
            alert('Sorry, try again')
        }
        chosenCardNames = []
        chosenCardIds = []
        score.textContent = clearedCards.length * 2
        if (clearedCards.length === cardArray.length / 2) {
            score.textContent = 'Congratulations! You found them all!'
        }
    }

    function flipCard() {
        let cardId = this.getAttribute('data-id')
        chosenCardNames.push(cardArray[cardId].name)
        chosenCardIds.push(cardId)
        this.setAttribute('src', cardArray[cardId].img)
        if (chosenCardNames.length === 2) {
            setTimeout(checkForMatch, 400)
        }
    }

    createBoard()
})
