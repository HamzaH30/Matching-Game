// Shuffle function from http://stackoverflow.com/a/2450976
let shuffle = function (array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

// This function is responsible for resetting the gameState
function generateGameState() {
  // Populating the icons
  // Shuffles all the list elements of the cards.
  const elementCards = shuffle([...document.getElementsByClassName("card")]);
  for (let i = 0; i < elementCards.length; i++) {
    const cardIcon = elementCards[i].firstElementChild.classList[1];
    gameState.board[i].icon = cardIcon;
    gameState.board[i].matched = false;
    gameState.board[i].show = false;
  }

  renderBoard();
}

// This function is responsible for rendering the game board to match the information in the gameState
function renderBoard() {
  // // Updating the "Next Card"
  // const currentNextCard =
  //   document.getElementById("next-card").firstElementChild.classList[1];
  // document
  //   .getElementById("next-card")
  //   .firstElementChild.classList.replace(currentNextCard, gameState.cardToFind);

  const elementCards = [...document.getElementsByClassName("card")];
  for (let i = 0; i < elementCards.length; i++) {
    // Replacing the icon class name to match the icon class name in gameState
    const currentCard = elementCards[i].firstElementChild;
    const currentIcon = currentCard.classList[1];
    const newIcon = gameState.board[i].icon;
    currentCard.classList.replace(currentIcon, newIcon);

    // Adding or removing the match class
    if (gameState.board[i].matched) {
      elementCards[i].classList.add("matched");
    } else {
      elementCards[i].classList.remove("matched");
    }

    // Adding or removing the show class
    if (gameState.board[i].show) {
      elementCards[i].classList.add("show");
    } else {
      elementCards[i].classList.remove("show");
    }
  }
}

function revealCard(event) {
  let clickedCardClass;
  /**
   * There are 2 areas a user can click
   * 1. The middle of the card -> the icon element
   * 2. Somewhere else on the card -> the list element
   */
  // Clicked somewhere other than the middle of the card
  if (event.target.classList.contains("card")) {
    clickedCardClass = event.target.firstElementChild.classList[1];
  } else {
    // Clicked right on the icon
    clickedCardClass = event.target.classList[1];
  }

  const gameStateCard = gameState.board.find(
    (element) => element.icon === clickedCardClass
  );

  if (clickedCardClass === gameState.cardToFind) {
    // The card clicked is a match, set matched to true
    gameStateCard.matched = true;
    renderBoard();

    // Change the "next card"/card to find
    // newCardToFind();
  } else {
    // The card clicked is not a match
    // Show the card
    gameStateCard.show = true;
    renderBoard();

    // Hide the card again after a set duration
    gameStateCard.show = false;
    setTimeout(() => renderBoard(), 375);
  }
}

function newCardToFind() {
  /**
   * Create a random array of the cards
   * Loop through all the cards in that array
   * If the card is not currently matched, then make that the cardToFind
   */
  for (let card of shuffle(gameState.board)) {
    if (!card.matched) {
      gameState.cardToFind = card.icon;
    }
  }

  renderBoard();
}

/**
 * 5. If it is a match, then change the cardToFind variable to a new one
 */

const gameState = {
  cardToFind: "fa-anchor",
  score: 0,
  board: [
    {
      icon: "",
      matched: false,
      show: false,
    },
    {
      icon: "",
      matched: false,
      show: false,
    },
    {
      icon: "",
      matched: false,
      show: false,
    },
    {
      icon: "",
      matched: false,
      show: false,
    },
    {
      icon: "",
      matched: false,
      show: false,
    },
    {
      icon: "",
      matched: false,
      show: false,
    },
    {
      icon: "",
      matched: false,
      show: false,
    },
    {
      icon: "",
      matched: false,
      show: false,
    },
    {
      icon: "",
      matched: false,
      show: false,
    },
    {
      icon: "",
      matched: false,
      show: false,
    },
    {
      icon: "",
      matched: false,
      show: false,
    },
    {
      icon: "",
      matched: false,
      show: false,
    },
  ],
};

generateGameState();

document
  .getElementsByClassName("restart")[0]
  .addEventListener("click", generateGameState);
document.getElementById("cards").addEventListener("click", revealCard);
