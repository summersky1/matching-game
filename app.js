document.addEventListener('DOMContentLoaded', () => {
    const imagePath = 'images/'
    const fileExtension = '.png'
    const coverImage = imagePath + 'card_back' + fileExtension

    const cardNumbers = ['01', '02', '10', '11', '12', '13']
    // clubs, diamonds, hearts, spades
    const cardTypes = ['c', 'd', 'h', 's']

    const cardArray = setupCards()

    const grid = document.querySelector('#grid')
    const score = document.querySelector('#score')

    let lastClickedId = null
    let chosenCards = []
    let clearedCards = []

    function setupCards() {
        let allCards = []
        for (const type of cardTypes) {
            for (const number of cardNumbers) {
                allCards.push(type + number)
            }
        }
        shuffleArray(allCards)
        let selectedCards = allCards.slice(0, 6)
        // create cards required for game using two of every card
        let cardsForGame = selectedCards.concat(selectedCards)
        cardsForGame = cardsForGame.map(name => ({
            name,
            img: imagePath + name + fileExtension
        }))
        shuffleArray(cardsForGame)
        return cardsForGame
    }

    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            let card = document.createElement('img')
            card.setAttribute('src', coverImage)
            card.setAttribute('data-id', i)
            card.classList.add('col-3', 'my-2')
            card.addEventListener('click', flipCard)
            grid.appendChild(card)
        }
    }

    function checkForMatch() {
        let cards = document.querySelectorAll('img')
        const firstCardId = chosenCards[0].id
        const secondCardId = chosenCards[1].id
        if (chosenCards[0].name === chosenCards[1].name) {
            cards[firstCardId].style.opacity = 0.5
            cards[secondCardId].style.opacity = 0.5
            cards[firstCardId].removeEventListener('click', flipCard)
            cards[secondCardId].removeEventListener('click', flipCard)
            clearedCards.push(chosenCards)
        } else {
            cards[firstCardId].setAttribute('src', coverImage)
            cards[secondCardId].setAttribute('src', coverImage)
            animateCard(cards[firstCardId])
            animateCard(cards[secondCardId])
        }
        lastClickedId = null
        chosenCards = []
        score.textContent = clearedCards.length * 2
        if (clearedCards.length === cardArray.length / 2) {
            score.textContent = 'Congratulations! You found them all!'
        }
    }

    function flipCard() {
        let chosenCardId = this.getAttribute('data-id')
        if (checkClicked(chosenCardId)) {
            chosenCards.push({ id: chosenCardId, name: cardArray[chosenCardId].name })
            this.setAttribute('src', cardArray[chosenCardId].img)
            animateCard(this)
            if (chosenCards.length === 2) {
                setTimeout(checkForMatch, 900)
            }
        }
    }

    // do not allow clicking same card twice
    function checkClicked(cardId) {
        if (lastClickedId === cardId) {
            return false
        }
        lastClickedId = cardId
        return true
    }

    function animateCard(card) {
        let animationClasses = ['animated', 'flipInY', 'fast']
        card.classList.remove(...animationClasses); // using spread operator from ES6
        card.offsetWidth // necessary to replay animation
        card.classList.add(...animationClasses);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    createBoard()
})
