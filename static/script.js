function ageInDays() {
    var birthYear = prompt('What year were you born?');
    var result = (new Date().getFullYear() - birthYear) *365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('you are ' + result + ' days old at least');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1); 
}

function reset() {
    document.getElementById('ageInDays').remove();
}

function generateCat() {
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src = "https://thecatapi.com/api/images/get?format=src&type=gif&size=small"
    div.appendChild(image);
}




function rpsGame(yourChoice) {
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());

    result= decideWinner(humanChoice, botChoice);

    message = finalMessage(result); 
    rpsFrontEnd(yourChoice.id, botChoice, message);

}

function randToRpsInt() {
    return Math.floor(Math.random() *3);
}

function numberToChoice(number) {
    return ['rock', 'paper', 'scissors'] [number]
}

function decideWinner(yourChoice, botChoice) {
    var rpsDatabase = {
        'rock': {'scissors': 1 , 'rock': 0.5 , 'paper': 0},
        'paper': {'scissors': 0 , 'rock': 1 , 'paper': 0.5},
        'scissors': {'scissors': 0.5 , 'rock': 0 , 'paper': 1}
    }
    var yourScore = rpsDatabase[yourChoice][botChoice];
    var botScore = rpsDatabase[botChoice][yourChoice];
    return(yourScore,botScore);
}

function finalMessage(yourScore) {
    if (yourScore === 0) {
        return {'message' : 'You lost!', 'color' :'red'}
    }
    else if (yourScore === 0.5) {
        return {'message' : 'You tied!', 'color' :'yellow'}
    }
    else {
        return {'message' : 'You won!', 'color' :'green'}
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    var imageDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();
    
    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imageDatabase[humanImageChoice] + "' height=150 width-150 style='box-shadow: 0px 10px 50px rgba(37,50,233,1);'>"
    messageDiv.innerHTML ="<h1 style='color:" + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML = "<img src='" + imageDatabase[botImageChoice] + "' height=150 width-150 style='box-shadow: 0px 10px 50px rgba(244,38, 233,0.7);'>"
  
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);

}

var all_btns = document.getElementsByTagName('button');

var copyAllButtons = [];
for (let i=0; i < all_btns.length; i++) {
    copyAllButtons.push(all_btns[i].classList[1]);
}

function buttonColorChange(buttonInfo) {
    if(buttonInfo.value ==='red') {
        buttonsRed();
    }
    else if (buttonInfo.value === 'green') {
        buttonsGreen();
    }
    else if (buttonInfo.value === 'reset') {
        buttonsReset();
    }
    else if (buttonInfo.value === 'random') {
        buttonsRandom();
    }
}

function buttonsRed() {
    for (let i=0; i<all_btns.length; i++) {
        all_btns[i].classList.remove(all_btns[i].classList[1]);
        all_btns[i].classList.add('btn-danger');
    }
}

function buttonsGreen() {
    for (let i=0; i<all_btns.length; i++) {
        all_btns[i].classList.remove(all_btns[i].classList[1]);
        all_btns[i].classList.add('btn-success');
    }
}

function buttonsReset() {
    for (let i=0; i<all_btns.length; i++) {
        all_btns[i].classList.remove(all_btns[i].classList[1]);
        all_btns[i].classList.add(copyAllButtons[i]);
    }
}

function buttonsRandom() {
    let choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning']
    for( let i=0; i<all_btns.length; i++) {
        var randomnumber = Math.floor(Math.random() * 4);
        all_btns[i].classList.remove(all_btns[i].classList[1]);
        all_btns[i].classList.add(choices[randomnumber]);
    } 
}



let blackjackGame = {
    'you' : {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer' : {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards' : ['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap' : {'2' : 2,'3' :3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
    'wins' : 0,
    'loses' : 0,
    'draws' : 0,
    'isStand' : false,
    'turnOver' : false
};

const You = blackjackGame['you'];
const Dealer = blackjackGame['dealer'];

const hitSound = new Audio('static/sounds/swish.m4a');
const winningSound = new Audio('static/sounds/cash.mp3');
const losingSound = new Audio('static/sounds/aww.mp3');

document.querySelector('#hit-btn').addEventListener('click', blackjackHit);
document.querySelector('#deal-btn').addEventListener('click', blackjackDeal);
document.querySelector('#stand-btn').addEventListener('click', dealerBotLogic);



function blackjackHit() {
    if (!blackjackGame['isStand']) {
    let card = randomCard();
    showCard(card,You);
    updateScore(card,You);
    showScore(You);
    }
}

function randomCard() {
    let randomCardIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomCardIndex];
}

function showCard(card, actviePlayer) {
    if (actviePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${card}.png`;
        document.querySelector(actviePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal() {
        if (blackjackGame['turnOver']) {

        
        showResult(decideWinner());
        
        let yourImage = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImage = document.querySelector('#dealer-box').querySelectorAll('img');
        
        for(i=0;i<yourImage.length;i++) {
            yourImage[i].remove();
        }
        for(i=0;i<dealerImage.length;i++) {
            dealerImage[i].remove();
        }
        You['score'] = 0;
        Dealer['score'] = 0;

        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;
        document.querySelector('#your-blackjack-result').style.color = '#000000';
        document.querySelector('#dealer-blackjack-result').style.color = '#000000';
        document.querySelector('#blackjack-result').textContent = "Let's Play";
        document.querySelector('#blackjack-result').style.color = 'black';

        blackjackGame['turnOver'] = true;
    }   
}

function updateScore(card,actviePlayer) {
    if (card === 'A'){
        if (actviePlayer['score'] + blackjackGame['cardsMap'][card][1]<=21) {
            actviePlayer['score'] += blackjackGame['cardsMap'][card][1];
        }
        else {
            actviePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    }
    else {
        actviePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(actviePlayer) {
    if (actviePlayer['score']> 21) {
        document.querySelector(actviePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(actviePlayer['scoreSpan']).style.color = 'red';
    }
    else {
        document.querySelector(actviePlayer['scoreSpan']).textContent = actviePlayer['score'];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));

}

async function dealerBotLogic() {
    blackjackGame['isStand'] = true;

    while(Dealer['score'] < 16 && blackjackGame['isStand']) {
        let card = randomCard();
        showCard(card,Dealer);
        updateScore(card,Dealer);
        showScore(Dealer);
        await sleep(1000);
    }

    blackjackGame['turnOver'] = true;
    let winner = decideWinner();
    showResult(winner);
    
}

function decideWinner() {
    let winner;
    // your score is greater than dealer
    
    if(You['score'] <= 21) {
        if (You['score'] > Dealer['score'] || (Dealer['score'] > 21)) {
            blackjackGame['wins']++;
            winner = You;
            }
        // your score is less than dealer
        else if(You['score'] < Dealer['score'] ) {
            blackjackGame['loses']++;
            winner = Dealer;
        }
        // your score is equal with dealer
        else if(You['score'] === Dealer['score'] ) {
            blackjackGame['draws']++;
        }
    }
    // you bust ,but dealer doesn't
    else if(You['score'] > 21 && Dealer['score'] <= 21) {
        blackjackGame['loses']++;
        winner = Dealer;
    }
    // both are bust
    else if(You['score'] > 21 && Dealer['score'] > 21) {
        blackjackGame['draws']++;
    }
    return winner;
}

function showResult(winner){ 
    let message, messageColor;

    if (blackjackGame['turnOver']) { 
        if(winner === You) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You Won!';
            messageColor = 'green';
            winningSound.play();
        }
        if(winner === Dealer) {
            document.querySelector('#loses').textContent = blackjackGame['loses'];
            message = 'You Lost!';
            messageColor = 'red';
            losingSound.play();
        }
        else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You Drew!';
            messageColor = 'black';
        }
        
    document.querySelector('#blackjack-result').textContent = message;  
    document.querySelector('#blackjack-result').style.color = messageColor; 

    }
}
