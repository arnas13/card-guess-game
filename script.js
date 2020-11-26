let clickedCard = null;
let preventClick = false;
let combosFound = 0;

const congrats = document.querySelector('.congrats')

const colors = [
    'red',
    'orange',
    'yellow',
    'lightYellow',
    'lightGreen',
    'green',
    'otherGreen',
    'electric',
    'lightBlue',
    'lightBlue1',
    'blue',
    'darkBlue',
    'purple',
    'lightPurple',
    'pink',
    'violet',
    'gray',
    'cadetblue',
]

const startGame = document.querySelector('.startGame')

const cards = [...document.querySelectorAll('.card')];
for (let color of colors) {
    const cardAIndex = parseInt(Math.random() * cards.length);
    const cardA = cards[cardAIndex]
    cards.splice(cardAIndex, 1);
    cardA.className += ` ${color}`
    cardA.setAttribute('data-color', color)

    const cardBIndex = parseInt(Math.random() * cards.length);
    const cardB = cards[cardBIndex]
    cards.splice(cardBIndex, 1);
    cardB.className += ` ${color}`
    cardB.setAttribute('data-color', color)
}

function cardClick(e) {
    congrats.innerHTML = ""
    const target = e.currentTarget
    if(target === clickedCard || target.className.includes('done')) {
        return
    }
    target.className = target.className
        .replace('hideColor', '')
        .trim();
    target.className += ' done'

    if (!clickedCard) {
        
    clickedCard = target;
    } else if (clickedCard) {
        preventClick = true;
        if(clickedCard.getAttribute('data-color') !== target.getAttribute('data-color')) {
            preventClick = true;
            
            setTimeout (() => {
                clickedCard.className = clickedCard.className.replace('done', '').trim() + ' hideColor';
                target.className = target.className.replace('done', '').trim() + ' hideColor';
                clickedCard = null;
                preventClick = false;                
            }, 200)
        } else {
            combosFound++;
            clickedCard = null;
            if(combosFound === 18) {
                congrats.innerHTML += "Congratulations, You won"
            }
        }
    }
}

function beginGame() {
    startGame.innerHTML = "";
    
}

function timer() {
    timerSeconds = timerSeconds - 1;
    if (timerSeconds < 200) {
        timeCounter.innerHTML = timerSeconds
    }
    if (timerSeconds < 1) {
        window.clearInterval(update);
    }
}

update = setInterval("timer()", 1000);

