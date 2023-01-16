const getUserChoice = (userInput) => {
    userInput = userInput.toLowerCase()
    if (userInput === 'rock' || userInput === 'paper' || userInput === 'scissors') {
        return userInput
    } else {
        return "Error, try again"
    }
}


const computerChoice = () => {
    const randomNumber = Math.floor(Math.random() * 3)
    if (randomNumber === 1) {
        return 'rock'
    } else if (randomNumber === 2) {
        return 'paper'
    } else if (randomNumber === 0) {
        return 'scissors'
    } else {
        return 'choose a number betwen 0-3'
    }
}

const determineWinner = (getUserChoice, computerChoice) => {
    if (getUserChoice === computerChoice) {
        return 'tie'
    }
    if (getUserChoice === 'rock') {
        if (computerChoice === 'paper') {
            return ' computer won'
        } else {
            return 'Won'
        }
    }
    if (getUserChoice === 'paper') {
        if (computerChoice === 'scissors') {
            return 'computer Won'
        } else {
            return 'U Won'
        }
    }
    if (getUserChoice === 'scissors') {
        if (computerChoice === 'rock') {
            return 'computer Won'
        } else {
            return 'U Won'
        }
    }
}
// console.log(determineWinner('rock', 'scissors')) 

function playgame () {
    const userChioce = getUserChoice('paper');
    const cpChioce = computerChoice();
    console.log(userChioce, cpChioce)
    return console.log(determineWinner(userChioce, cpChioce))
}

playgame();


