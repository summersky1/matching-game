document.addEventListener('DOMContentLoaded', () => {
    const imagePath = 'images/'
    const fileExtension = '.png'
    const coverImage = imagePath + 'blank' + fileExtension
    const blankImage = imagePath + 'white' + fileExtension

    const cardNames = [
        'fries',
        'cheeseburger',
        'ice-cream',
        'pizza',
        'milkshake',
        'hotdog'
    ]

    // create cards from names
    const uniqueCards = cardNames.map(name => ({
        name,
        img: imagePath + name + fileExtension
    }))

    // create array of cards using two of every card
    const cardArray = uniqueCards.concat(uniqueCards)

    const grid = document.querySelector('.grid')
    const score = document.querySelector('#score')

    let lastClickedId = null
    let chosenCardNames = []
    let chosenCardIds = []
    let clearedCards = []

    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            let card = document.createElement('img')
            card.setAttribute('src', coverImage)
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
            cards[firstCardId].setAttribute('src', blankImage)
            cards[secondCardId].setAttribute('src', blankImage)
            clearedCards.push(chosenCardNames)
        } else {
            cards[firstCardId].setAttribute('src', coverImage)
            cards[secondCardId].setAttribute('src', coverImage)
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
        if (checkClicked(cardId)) {
            chosenCardNames.push(cardArray[cardId].name)
            chosenCardIds.push(cardId)
            this.setAttribute('src', cardArray[cardId].img)
            if (chosenCardNames.length === 2) {
                setTimeout(checkForMatch, 400)
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

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffleArray(cardArray)
    createBoard()
})
