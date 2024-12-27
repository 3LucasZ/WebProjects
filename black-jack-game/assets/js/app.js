var deckOfCards = [];
var playerCardValSum = 0;
var dealerCardValSum = 0;
var hit = document.querySelector('.hit');
var hold = document.querySelector('.hold');
var newGame = document.querySelector('.new-game');
var bet = document.querySelector('.bet');
var allIn = document.querySelector('.allIn')
//var rules = document.querySelector('.rules')
var money = 500;
var betAmount = 0;
var deplaceModalurn = false;
var endGame = true
var numOfPlayerCards = 0;
var numOfDealerCards = 0;
var score = 0;
var canHold = true
//var mySound;
//var myMusic;
//var slider = document.getElementById("myRange");
//var output = document.getElementById("betAmountLbl");

 // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
// slider.oninput = function()
//   output.innerHTML = this.value;
//   var bet = this.value
//   money -= this.value
//   document.getElementById('money').innerHTML = 'Money: ' + money;
// }

// function sound(src) {
//   this.sound = document.createElement("audio");
//   this.sound.src = src;
//   this.sound.setAttribute("preload", "auto");
//   this.sound.setAttribute("controls", "none");
//   this.sound.style.display = "none";
//   document.body.appendChild(this.sound);
//   this.play = function(){
//     this.sound.play();
//   }
//   this.stop = function(){
//     this.sound.pause();
//   }
// }
//var hasAceP = false
//var hasAceD = false

// place modal will generate modal and place it

//rules.addEventListener('click', function(e) {
  //placeModal('The point of the game is to get either 21 points from your cards or get closer to 21 than the computer. However, once you get over 21, you lose. If you and the computer get over 21, you tie. Each cards points is its face value, or if it is a royalty it is a ten. Aces are 1 or 11, depending which would help you the most. You can Hit(placing a card), Hold(Computer places his cards), and bet to earn money. Your personal Highscore will be recorded. HAVE FUN :)')


//})
//myMusic = new sound("gametheme.mp3");
//myMusic.play()

function placeModal(content) {
  var modal = document.createElement('div');
  modal.className = 'modal';
  var modalContent = `
    <div class="modal-content">
      <h1>${content}!</h1>
      <button class="modalButton">Continue</button>
    </div>`;
  modal.innerHTML = modalContent;
  var modalButton = modal.querySelector('.modalButton');
  var body = document.querySelector('body');
  body.insertBefore(modal, body.children[0]);
  modalButton.addEventListener('click', function(e){
    body.removeChild(modal);
  });
}

bet.addEventListener('click', function(e) {
  if (endGame == true) {
    var button = e.target;
    var bet = parseInt(button.textContent);
    if (bet > money) {
      placeModal("Sorry, you don't have enough money to bet that much!")
  }
  else {
    money -= bet;
    betAmount += bet;
  }
  document.getElementById('money').innerHTML = 'Money: ' + money;
  document.getElementById('betAmountLbl').innerHTML = 'Bet this round: ' + betAmount;
  }
  else {
    placeModal("You can only bet at the start of your turn!")
  }
});
hit.addEventListener('click', function(e) {
  canHold = true
  endGame = false;
  var firstHit = true;
  var nextCard = deckOfCards.pop();
  if (playerCardValSum < 21){
    if(nextCard !== undefined) {
        numOfPlayerCards += 1;
        var cardSplit = nextCard.split("_");
        var cardVal = cardSplit[1];
        if (cardVal == "jack" || cardVal == "queen" || cardVal == "king") {
          cardVal = 10;
        }
        else if (cardVal == "1"){
          if (playerCardValSum > 10) {
            cardVal = 1
          }
          else {
            //hasAceP = true
            cardVal = 11
          }
        }
        else {
          cardVal = parseInt(cardVal);
        }
        playerCardValSum += cardVal;
        var img = document.createElement("img"); // <img>
        img.src = "img/cards/1x/" + nextCard + ".png"; // <img src="">
        img.style.top = (numOfPlayerCards * 30 - 30) + "px";
        var src = document.getElementById("nextPlayCard")
          src.appendChild(img);

          deplaceModalurn = true;
        }
        //if (hasAceP == true && playerCardValSum > 21) {
          //playerCardValSum -= 10
        //}
        document.getElementById('sumOfPlayerCards').innerHTML = playerCardValSum;
    }
});
hold.addEventListener('click', function(e) {
  if (canHold == true) {
    canHold = false
  numOfDealerCards = 0
    if (deplaceModalurn === true) {
      //while (dealerCardValSum < 16) {
      var cardInterval = setInterval(dealerCardPlace, 500);
      function dealerCardPlace() {
        if (dealerCardValSum > 16) {
          clearInterval(cardInterval);
        }
        else {
        nextCard = deckOfCards.pop();
        if(nextCard !== undefined) {
          numOfDealerCards += 1
          cardSplit = nextCard.split("_");
          cardVal = cardSplit[1];

          if (cardVal == "jack" || cardVal == "queen" || cardVal == "king") {
            cardVal = 10;
          }
          else if (cardVal == "1"){
            if (dealerCardValSum > 10) {
              cardVal = 1
            }
            else {
              //hasAceD = true
              cardVal = 11
            }
          }
          else {
            cardVal = parseInt(cardVal);
          }
          dealerCardValSum += cardVal;
          var img2 = document.createElement("img");
          img2.src = "img/cards/1x/" + nextCard + ".png";
          img2.style.top = (numOfDealerCards * 30 + 120) + "px";
          var src2 = document.getElementById("dealerPlayCard");

            document.getElementById('sumOfDealerCards').innerHTML = dealerCardValSum;
            src2.appendChild(img2);

          }
        }
      }

          //if (hasAceD == true && dealerCardValSum > 21){
            //dealerCardValSum -= 10
        //}

      //}
  if (numOfDealerCards == 2 || numOfDealerCards == 3) {
      setTimeout(function(){
        if (playerCardValSum == 21 && dealerCardValSum != 21) {
          placeModal('BlackJack! You win!');
          money += 2 * betAmount;
        }
        else if (dealerCardValSum == 21 && playerCardValSum != 21) {
          placeModal('BlackJack of Dealer! You Lose!');
        }
        else if (dealerCardValSum == 21 && playerCardValSum == 21){
          placeModal('Two way BlackJack! Push!')
          money += betAmount;
        }
        else if(playerCardValSum == dealerCardValSum){
          placeModal ('Push!');
          money += betAmount;
        }
        else if (playerCardValSum > 21 && dealerCardValSum > 21){
          placeModal('Two way Bust! Push!');
          money += betAmount;
        }
        else if (playerCardValSum > 21 && dealerCardValSum < 21) {
          placeModal('BUST! You lose!');
        }
        else if(dealerCardValSum > 21 && playerCardValSum < 21) {
          placeModal ('Dealer BUST! You win!');
          money += 2 * betAmount;
        }
        else if (playerCardValSum > dealerCardValSum) {
          placeModal('You Win!');
          money += 2 * betAmount;
        }
        else if (dealerCardValSum > playerCardValSum){
          placeModal('You Lose!');
        }
      betAmount = 0;
      document.getElementById('money').innerHTML = 'Money: ' + money;
      document.getElementById('betAmountLbl').innerHTML = 'Bet this round: ' + betAmount
      if (money < 5) {
        placeModal("Sorry, you have no more money!");
      }
      hasAceD = false
      hasAceP = false
      numOfPlayerCards = 0;
      playerCardValSum = 0;
      document.getElementById('sumOfPlayerCards').innerHTML = playerCardValSum;
      dealerCardValSum = 0;
      document.getElementById('sumOfDealerCards').innerHTML = dealerCardValSum;
      deplaceModalurn = false;
      endGame = true
      document.getElementById('dealerPlayCard').innerHTML = ''
      document.getElementById('nextPlayCard').innerHTML = ''
      // clear the <img> tags from dealer...
      cardsArr = ["club_jack", "club_queen", "club_king", "diamond_jack", "diamond_queen", "diamond_king", "heart_jack", "heart_queen", "heart_king", "spade_jack", "spade_queen", "spade_king"];
      for (i=1; i<=10; i++) {
        cardsArr.push("club_" + i);
        cardsArr.push("diamond_" + i);
        cardsArr.push("heart_" + i);
        cardsArr.push("spade_" + i);
      }
        deckOfCards = shuffle(cardsArr);
        score = money
        highscoreTracker.click()
        var img3 = document.createElement("img");
        var img4 = document.createElement("img");
        img3.src = "img/cards/1x/back-red.png";
        var src3 = document.getElementById("nextPlayCard");
        src3.appendChild(img3);
        img4.src = "img/cards/1x/back-red.png";
        var src4 = document.getElementById("dealerPlayCard");
        src4.appendChild(img4);
      }, 2000);
    }
    if (numOfDealerCards == 4 || numOfDealerCards == 5) {
        setTimeout(function(){
          if (playerCardValSum == 21 && dealerCardValSum != 21) {
            placeModal('BlackJack! You win!');
            money += 2 * betAmount;
          }
          else if (dealerCardValSum == 21 && playerCardValSum != 21) {
            placeModal('BlackJack of Dealer! You Lose!');
          }
          else if (dealerCardValSum == 21 && playerCardValSum == 21){
            placeModal('Two way BlackJack! Push!')
            money += betAmount;
          }
          else if(playerCardValSum == dealerCardValSum){
            placeModal ('Push!');
            money += betAmount;
          }
          else if (playerCardValSum > 21 && dealerCardValSum > 21){
            placeModal('Two way Bust! Push!');
            money += betAmount;
          }
          else if (playerCardValSum > 21 && dealerCardValSum < 21) {
            placeModal('BUST! You lose!');
          }
          else if(dealerCardValSum > 21 && playerCardValSum < 21) {
            placeModal ('Dealer BUST! You win!');
            money += 2 * betAmount;
          }
          else if (playerCardValSum > dealerCardValSum) {
            placeModal('You Win!');
            money += 2 * betAmount;
          }
          else if (dealerCardValSum > playerCardValSum){
            placeModal('You Lose!');
          }
        betAmount = 0;
        document.getElementById('money').innerHTML = 'Money: ' + money;
        document.getElementById('betAmountLbl').innerHTML = 'Bet this round: ' + betAmount
        if (money < 5) {
          placeModal("Sorry, you have no more money!");
        }
        hasAceD = false
        hasAceP = false
        numOfPlayerCards = 0;
        playerCardValSum = 0;
        document.getElementById('sumOfPlayerCards').innerHTML = playerCardValSum;
        dealerCardValSum = 0;
        document.getElementById('sumOfDealerCards').innerHTML = dealerCardValSum;
        deplaceModalurn = false;
        endGame = true
        document.getElementById('dealerPlayCard').innerHTML = ''
        document.getElementById('nextPlayCard').innerHTML = ''
        // clear the <img> tags from dealer...
        cardsArr = ["club_jack", "club_queen", "club_king", "diamond_jack", "diamond_queen", "diamond_king", "heart_jack", "heart_queen", "heart_king", "spade_jack", "spade_queen", "spade_king"];
        for (i=1; i<=10; i++) {
          cardsArr.push("club_" + i);
          cardsArr.push("diamond_" + i);
          cardsArr.push("heart_" + i);
          cardsArr.push("spade_" + i);
        }
          deckOfCards = shuffle(cardsArr);
          score = money
          highscoreTracker.click()
          var img3 = document.createElement("img");
          var img4 = document.createElement("img");
          img3.src = "img/cards/1x/back-red.png";
          var src3 = document.getElementById("nextPlayCard");
          src3.appendChild(img3);
          img4.src = "img/cards/1x/back-red.png";
          var src4 = document.getElementById("dealerPlayCard");
          src4.appendChild(img4);
        }, 3000);
      }
      else {
          setTimeout(function(){
            if (playerCardValSum == 21 && dealerCardValSum != 21) {
              placeModal('BlackJack! You win!');
              money += 2 * betAmount;
            }
            else if (dealerCardValSum == 21 && playerCardValSum != 21) {
              placeModal('BlackJack of Dealer! You Lose!');
            }
            else if (dealerCardValSum == 21 && playerCardValSum == 21){
              placeModal('Two way BlackJack! Push!')
              money += betAmount;
            }
            else if(playerCardValSum == dealerCardValSum){
              placeModal ('Push!');
              money += betAmount;
            }
            else if (playerCardValSum > 21 && dealerCardValSum > 21){
              placeModal('Two way Bust! Push!');
              money += betAmount;
            }
            else if (playerCardValSum > 21 && dealerCardValSum < 21) {
              placeModal('BUST! You lose!');
            }
            else if(dealerCardValSum > 21 && playerCardValSum < 21) {
              placeModal ('Dealer BUST! You win!');
              money += 2 * betAmount;
            }
            else if (playerCardValSum > dealerCardValSum) {
              placeModal('You Win!');
              money += 2 * betAmount;
            }
            else if (dealerCardValSum > playerCardValSum){
              placeModal('You Lose!');
            }
          betAmount = 0;
          document.getElementById('money').innerHTML = 'Money: ' + money;
          document.getElementById('betAmountLbl').innerHTML = 'Bet this round: ' + betAmount
          if (money < 5) {
            placeModal("Sorry, you have no more money!");
          }
          hasAceD = false
          hasAceP = false
          numOfPlayerCards = 0;
          playerCardValSum = 0;
          document.getElementById('sumOfPlayerCards').innerHTML = playerCardValSum;
          dealerCardValSum = 0;
          document.getElementById('sumOfDealerCards').innerHTML = dealerCardValSum;
          deplaceModalurn = false;
          endGame = true
          document.getElementById('dealerPlayCard').innerHTML = ''
          document.getElementById('nextPlayCard').innerHTML = ''
          // clear the <img> tags from dealer...
          cardsArr = ["club_jack", "club_queen", "club_king", "diamond_jack", "diamond_queen", "diamond_king", "heart_jack", "heart_queen", "heart_king", "spade_jack", "spade_queen", "spade_king"];
          for (i=1; i<=10; i++) {
            cardsArr.push("club_" + i);
            cardsArr.push("diamond_" + i);
            cardsArr.push("heart_" + i);
            cardsArr.push("spade_" + i);
          }
            deckOfCards = shuffle(cardsArr);
            score = money
            highscoreTracker.click()
            var img3 = document.createElement("img");
            var img4 = document.createElement("img");
            img3.src = "img/cards/1x/back-red.png";
            var src3 = document.getElementById("nextPlayCard");
            src3.appendChild(img3);
            img4.src = "img/cards/1x/back-red.png";
            var src4 = document.getElementById("dealerPlayCard");
            src4.appendChild(img4);
          }, 4000);
        }
      }
    }
});

newGame.addEventListener('click', function(e) {
location.reload();
});
allIn.addEventListener('click', function(e) {
    if (endGame == true) {

      var bet = money;
      money -= bet;
      betAmount += bet;
    }
    else {
      placeModal("You can only bet at the start of your turn")
    }
    document.getElementById('money').innerHTML = 'Money: ' + money;
    document.getElementById('betAmountLbl').innerHTML = 'Bet this round: ' + betAmount;
});

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  var cardsArr = ["club_jack", "club_queen", "club_king", "diamond_jack", "diamond_queen", "diamond_king", "heart_jack", "heart_queen", "heart_king", "spade_jack", "spade_queen", "spade_king"];
  for (i=1; i<=10; i++) {
    cardsArr.push("club_" + i);
    cardsArr.push("diamond_" + i);
    cardsArr.push("heart_" + i);
    cardsArr.push("spade_" + i);
  }
deckOfCards = shuffle(cardsArr);
var highscoreTracker = {
bestScore: 0,
  click: function() {
    if (score > this.bestScore) {
      this.bestScore = score



    if (typeof(Storage) !== "undefined") {
      localStorage.setItem("highscore", this.bestScore);
    } else {
      //console.log("Sorry, your browser does not support Web Storage");
    }
  }

    this.update_screen();
  },
  update_screen: function() {
    document.getElementById("highscore").innerHTML = "Personal High Score: " + this.bestScore;
  },
  init: function() {

    if (typeof(Storage) !== "undefined") {

      var c = localStorage.getItem("highscore");
      if(c != null) {
        highscoreTracker.bestScore = Number(c);
        highscoreTracker.update_screen();
      }
    } else {
      //console.log("Sorry, your browser does not support Web Storage");

    }
  }
}
window.onload = highscoreTracker.init;
