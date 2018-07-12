function generateWinningNumber() {
  var randomNum = Math.floor(Math.random() * 100) + 1;

  return randomNum === 0 ? 1 : randomNum;
}

function shuffle(array) {
  /** pick a random remaining element (from the front) and
        place in its new location (in the back). The unshuffled element
        in the back is swapped to the front, 
        where it waits for subsequent shuffling **/
  var maxRangeAndIndex = array.length,
    tempElement,
    randomIndexForArray;

  // While there remain elements to shuffle…
  while (maxRangeAndIndex) {
    // Pick a remaining element…
    randomIndexForArray = Math.floor(Math.random() * maxRangeAndIndex--);

    // And swap it with the current element.
    tempElement = array[maxRangeAndIndex];
    array[maxRangeAndIndex] = array[randomIndexForArray];
    array[randomIndexForArray] = tempElement;
  }

  return array;
}

function Game() {
  this.playersGuess = null;
  this.pastGuesses = [];
  this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function() {
  return Math.abs(this.playersGuess - this.winningNumber);
};

Game.prototype.isLower = function() {
  return this.playersGuess < this.winningNumber;
};

Game.prototype.playersGuessSubmission = function(num) {
  if (num < 1 || num > 100 || typeof num !== 'number') {
    throw 'That is an invalid guess.';
  }

  this.playersGuess = num;
  return this.checkGuess();
};

Game.prototype.checkGuess = function() {
  if (this.playersGuess === this.winningNumber) {
    return 'You Win!';
  } else {
    if (this.pastGuesses.indexOf(this.playersGuess) > -1) {
      return 'You have already guessed that number.';
    } else {
      this.pastGuesses.push(this.playersGuess);
      if (this.pastGuesses.length === 5) {
        return 'You Lose.';
      } else {
        var diff = this.difference();
        if (diff < 10) return "You're burning up!";
        else if (diff < 25) return "You're lukewarm.";
        else if (diff < 50) return "You're a bit chilly.";
        else if (diff < 100) return "You're ice cold!";
      }
    }
  }
};

function newGame() {
  return new Game();
}

Game.prototype.provideHint = function() {
  return shuffle([
    this.winningNumber,
    generateWinningNumber(),
    generateWinningNumber()
  ]);
};
