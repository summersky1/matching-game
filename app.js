document.addEventListener('DOMContentLoaded', () => {
    const imagePath = 'images/'
    const fileExtension = '.png'
    const coverImage = imagePath + 'cover' + fileExtension
    const blankImage = imagePath + 'blank' + fileExtension

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
    let chosenCards = []
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
        const firstCardId = chosenCards[0].id
        const secondCardId = chosenCards[1].id
        if (chosenCards[0].name === chosenCards[1].name) {
            alert('You found a match')
            cards[firstCardId].setAttribute('src', blankImage)
            cards[secondCardId].setAttribute('src', blankImage)
            cards[firstCardId].removeEventListener('click', flipCard)
            cards[secondCardId].removeEventListener('click', flipCard)
            clearedCards.push(chosenCards)
        } else {
            cards[firstCardId].setAttribute('src', coverImage)
            cards[secondCardId].setAttribute('src', coverImage)
            alert('Sorry, try again')
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

    shuffleArray(cardArray)
    createBoard()
})
