// TODO:
/**
 * 2. Code Clean-Up
 * 3. Ask Alex or Chris for their advice/opinion. Get them to test out the program and find any flaws!
 * 4. Write "Copyright" info at top (name, course, date, etc.)
 */

// This is a modified Shuffle function. Originally from http://stackoverflow.com/a/2450976
let shuffle = function (array) {
  // Creating a new array so that the array referenced passed in does not get affected
  let newShuffledArray = [];
  for (let element of array) {
    newShuffledArray.push(element);
  }

  let currentIndex = newShuffledArray.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = newShuffledArray[currentIndex];
    newShuffledArray[currentIndex] = newShuffledArray[randomIndex];
    newShuffledArray[randomIndex] = temporaryValue;
  }

  return newShuffledArray;
};

// This function is responsible for resetting the gameState
function generateGameState() {
  // Shuffles all the list elements of the cards.
  const elementCards = shuffle([...document.getElementsByClassName("card")]);

  // Emptying the current board.
  gameState.board = [];

  // Populating the cards in the gameState board and setting them to their "default" values
  for (let card of elementCards) {
    // Getting the card icon that each card in the gameState board will have
    const cardIcon = card.firstElementChild.classList[1];

    // Populating the board
    gameState.board.push({
      icon: cardIcon,
      matched: false,
      show: false,
    });
  }

  // New array of the cards that the user has to find
  // gameState.cardsToFind = shuffle(gameState.board).forEach((card) => );

  // Reset the score
  gameState.score = 0;

  // Change the card that the user has to find, then render the board.
  newCardToFind();
  renderBoard();
}

// This function is responsible for rendering the game board to match the information in the gameState
function renderBoard() {
  // Creating a static array of all the list elements that are a card
  const elementCards = [...document.getElementsByClassName("card")];
  for (let i = 0; i < elementCards.length; i++) {
    const currentCard = elementCards[i].firstElementChild;

    // Replacing the card's icon class name to match the card's icon class name in gameState
    const currentIcon = currentCard.classList[1];
    const newIcon = gameState.board[i].icon;
    currentCard.classList.replace(currentIcon, newIcon);

    // Adding or removing the matched class based on if the card is matched in the gameState
    if (gameState.board[i].matched) {
      elementCards[i].classList.add("matched");
    } else {
      elementCards[i].classList.remove("matched");
    }

    // Adding or removing the show class based on if the card is being shown in the gameState
    if (gameState.board[i].show) {
      elementCards[i].classList.add("show");
    } else {
      elementCards[i].classList.remove("show");
    }
  }

  // Update the "Next Card"/"Card to find" to be the same as the one listed in the gameState
  const nextCardElement =
    document.getElementById("next-card").firstElementChild;
  const oldCardToFind = nextCardElement.classList[1];
  nextCardElement.classList.replace(oldCardToFind, gameState.cardToFind);

  // Update the score
  document.getElementById("score").innerText = gameState.score;
}

/**
 * This function is responsible for calling the revealCard() function only when
 *  1. The user clicks a valid card and not (for example) in between the cards
 *  2. The user hasn't already won.
 *  3. The card that the user clicked isn't already a matched card.
 */
function checkIfValidClick(event) {
  if (event.target.id !== "cards" && !checkIfWin()) {
    /**
     * Finding the icon class of the card that the user clicked.
     * There are 2 areas a user can click
     * 1. The middle of the card -> the icon element (child of list element (.card))
     * 2. Somewhere else on the card -> the list element (card class)
     */
    const clickedCardClass =
      event.target.closest(".card").firstElementChild.classList[1];

    // Find which card in the gameState is the exact same card as clickedCardClass
    const gameStateCard = gameState.board.find(
      (element) => element.icon === clickedCardClass
    );

    // The user cannot be able to already open or do anything with a matched card
    if (!gameStateCard.matched) {
      revealCard(gameStateCard);
    }
  }
}

// This function is responsible for revealing a card and changing its properties/gameState keys after a valid click.
function revealCard(cardClicked) {
  // Add this click to the total score
  gameState.score += 1;

  // Check if the card clicked is the same as the card they have to find
  if (cardClicked.icon === gameState.cardToFind) {
    // The card clicked is a match, set matched to true
    cardClicked.matched = true;

    // Generate a new card for the user to find
    newCardToFind();
    renderBoard();
  } else {
    // If the card isn't a match with the current "card to find"
    cardClicked.show = true;
    renderBoard();

    // TODO: Eliminate the need of using eventListeners and use the checkIfValidClick function -> also add a "pause" key to the gameState

    // Removing the event listener to prevent the user from clicking again and revealing more than 1 card
    document
      .getElementById("cards")
      .removeEventListener("click", checkIfValidClick);

    // Hide the card again
    cardClicked.show = false;

    // Only render the board (to visually hide the card) and allow the user to continue clicking after a set duration
    setTimeout(() => {
      renderBoard();
      document
        .getElementById("cards")
        .addEventListener("click", checkIfValidClick);
    }, 750);
  }

  // Check if the user has won the game by matching all cards.
  if (checkIfWin()) {
    // Alerting the user's victory after a slight delay to allow the final card matched to render and display as a matched card.
    setTimeout(() => alertUserWin(), 1);
  }
}

// TODO: Make it so that you shuffle once, and only once for a deck of cards to find

// This function is responsible for generating a new card for the user to find.
function newCardToFind() {
  // Loop through a random array of cards
  let deckOfCards = shuffle(gameState.board);
  for (let card of deckOfCards) {
    // If the card is not a match, then that is the card the user will have to now find.
    if (!card.matched) {
      gameState.cardToFind = card.icon;
      return;
    }
  }
}

// This function returns true or false depending on if the user has matched all the cards
function checkIfWin() {
  for (let card of gameState.board) {
    if (!card.matched) {
      // There is still a card that has not been matched, therefore the user has not won yet.
      return false;
    }
  }

  // The function did not return false, therefore all cards have been matched and user wins.
  return true;
}

/**
 * This function is responsible for alerting the user that they have won.
 * This function is being executed after a setTimeout().
 */
function alertUserWin() {
  alert(
    `You have won the game! It took you ${gameState.score} moves!\nYou may restart the game to play again!`
  );
}

// This is the variable that stores any relevant information related to the game (game state).
const gameState = {
  cardToFind: "fa-anchor",
  cardsToFind: [],
  score: 0,
  board: [],
};

// Populating the board with cards
generateGameState();

// Event Listeners for when the user clicks the restart button or a card
document
  .getElementsByClassName("restart")[0]
  .addEventListener("click", generateGameState);
document.getElementById("cards").addEventListener("click", checkIfValidClick);
