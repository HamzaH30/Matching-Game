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

function renderBoard() {
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

/**
 * 1.
 * 2.
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
