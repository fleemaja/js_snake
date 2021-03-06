(function () {
  if (typeof SG === "undefined") {
    window.SG = {};
  }

  var Coord = SG.Coord = function (i, j) {
    this.i = i;
    this.j = j;
  };

  Coord.prototype.equals = function (coord2) {
    return (this.i == coord2.i) && (this.j == coord2.j);
  };

  Coord.prototype.isOpposite = function (coord2) {
    return (this.i == (-1 * coord2.i)) && (this.j == (-1 * coord2.j));
  };

  Coord.prototype.plus = function (coord2) {
    return new Coord(this.i + coord2.i, this.j + coord2.j);
  };

  var Apple = SG.Apple = function (board) {
    this.dir = "N";
    this.board = board;
    this.replace();
  };

  Apple.DIFFS = {
    "N": new Coord(-1, 0),
    "E": new Coord(0, 1),
    "S": new Coord(1, 0),
    "W": new Coord(0, -1)
  };

  Apple.prototype.move = function () {
    var newPos = this.position.plus(Apple.DIFFS[this.dir]);
    if (this.validPos(newPos)) {
      if (!newPos.equals(this.board.snake.head().plus(Snake.DIFFS[this.board.snake.dir]))) {
        this.position = newPos;
      }
    }
    var z = Math.floor(Math.random() * 4);

    if (z === 0) {
      this.dir = "N";
    } else if (z === 1) {
      this.dir = "W";
    } else if (z === 2) {
      this.dir = "S";
    } else {
      this.dir = "E";
    }
  };

  Apple.prototype.validPos = function (coord) {
    var result = true
    if (!this.board.validPosition(coord)) {
      result = false;
    } else {
      this.board.snake.segments.forEach(function (segment) {
        if (segment.equals(coord)) {
          result = false;
          return result;
        }
      })
    }

    return result;
  };

  Apple.prototype.replace = function () {
    var x = Math.floor(Math.random() * this.board.dim[0]);
    var y = Math.floor(Math.random() * this.board.dim[1]);

    // Cannot place an apple where there is a snake
    while (this.board.snake.isOccupying([x, y])) {
      x = Math.floor(Math.random() * this.board.dim[0]);
      y = Math.floor(Math.random() * this.board.dim[1]);
    }

    this.position = new Coord(x, y);
  };

  var Beer = SG.Beer = function (board) {
    this.dir = "N";
    this.board = board;
    this.replace();
  };

  Beer.DIFFS = {
    "N": new Coord(-1, 0),
    "E": new Coord(0, 1),
    "S": new Coord(1, 0),
    "W": new Coord(0, -1)
  };

  Beer.prototype.move = function () {
    var newPos = this.position.plus(Beer.DIFFS[this.dir]);
    if (this.validPos(newPos)) {
      if (!newPos.equals(this.board.snake.head().plus(Snake.DIFFS[this.board.snake.dir]))) {
        this.position = newPos;
      }
    }
    var z = Math.floor(Math.random() * 4);

    if (z === 0) {
      this.dir = "N";
    } else if (z === 1) {
      this.dir = "W";
    } else if (z === 2) {
      this.dir = "S";
    } else {
      this.dir = "E";
    }
  };

  Beer.prototype.validPos = function (coord) {
    var result = true
    if (!this.board.validPosition(coord)) {
      result = false;
    } else {
      this.board.snake.segments.forEach(function (segment) {
        if (segment.equals(coord)) {
          result = false;
          return result;
        }
      })
    }

    return result;
  };

  Beer.prototype.replace = function () {
    var x = Math.floor(Math.random() * (this.board.dim[0] - 2)) + 1;
    var y = Math.floor(Math.random() * (this.board.dim[1] - 2)) + 1;

    // Cannot place beer where there is a snake or apple
    while (this.board.snake.isOccupying([x, y])) {
      x = Math.floor(Math.random() * (this.board.dim[0] - 2)) + 1;
      y = Math.floor(Math.random() * (this.board.dim[1] - 2)) + 1;
    }

    this.position = new Coord(x, y);
  };

  var Snake = SG.Snake = function (board) {
    this.dir = "N";
    this.turning = false;
    this.board = board;

    var center = new Coord(Math.floor(board.dim[1]/2), Math.floor(board.dim[0]/2));
    this.segments = [center];

    this.growTurns = 0;
  };

  Snake.DIFFS = {
    "N": new Coord(-1, 0),
    "E": new Coord(0, 1),
    "S": new Coord(1, 0),
    "W": new Coord(0, -1)
  };

  Snake.GROW_TURNS = 3;

  Snake.prototype.eatApple = function () {
    if (this.head().equals(this.board.apple.position)) {
      this.growTurns += 3;
      Snake.DRUNK = false;
      Snake.COFFEE = false;
      $('figure').removeAttr('style');
      return true;
    } else {
      return false;
    }
  };

  Snake.COFFEE = false;

  Snake.prototype.drinkCoffee = function () {
    if (this.head().equals(this.board.coffee.position)) {
      Snake.DRUNK = false;
      Snake.COFFEE = true;
      $('figure').removeAttr('style');
      return true;
    } else {
      return false;
    }
  };

  Snake.prototype.drinkEspresso = function () {
    if (this.head().equals(this.board.espresso.position)) {
      Snake.DRUNK = false;
      Snake.COFFEE = true;
      $('figure').removeAttr('style');
      return true;
    } else {
      return false;
    }
  };

  Snake.prototype.drinkLatte = function () {
    if (this.head().equals(this.board.latte.position)) {
      Snake.DRUNK = false;
      Snake.COFFEE = true;
      $('figure').removeAttr('style');
      return true;
    } else {
      return false;
    }
  };

  Snake.prototype.eatMagic = function () {
    if (this.head().equals(this.board.magic.position)) {
      this.growTurns += 3;
      Snake.DRUNK = false;
      Snake.COFFEE = false;
      $('figure').removeAttr('style');
      return true;
    } else {
      return false;
    }
  };

  Snake.prototype.eatMagicApple = function () {
    if (this.head().equals(this.board.magicApple.position)) {
      this.growTurns += 3;
      Snake.DRUNK = false;
      Snake.COFFEE = false;
      $('figure').removeAttr('style');
      return true;
    } else {
      return false;
    }
  };

  Snake.DRUNK = false;

  // TODO: DRY this out
  Snake.prototype.drinkBeer = function () {
    if (this.head().equals(this.board.beer.position)) {
      Snake.DRUNK = true;
      Snake.COFFEE = false;
      $('figure').css("-webkit-animation", "myfirst 5s linear 0s infinite alternate")
      $('figure').css("animation", "myfirst 5s linear 0s infinite alternate")
      return true;
    } else {
      return false;
    }
  };

  Snake.prototype.drinkMoonshine = function () {
    if (this.head().equals(this.board.moonshine.position)) {
      Snake.DRUNK = true;
      Snake.COFFEE = false;
      $('figure').css("-webkit-animation", "myfirst 5s linear 0s infinite alternate")
      $('figure').css("animation", "myfirst 5s linear 0s infinite alternate")
      return true;
    } else {
      return false;
    }
  };

  Snake.prototype.drinkVodka = function () {
    if (this.head().equals(this.board.vodka.position)) {
      Snake.DRUNK = true;
      Snake.COFFEE = false;
      $('figure').css("-webkit-animation", "myfirst 5s linear 0s infinite alternate")
      $('figure').css("animation", "myfirst 5s linear 0s infinite alternate")
      return true;
    } else {
      return false;
    }
  };

  Snake.prototype.drinkMartini = function () {
    if (this.head().equals(this.board.martini.position)) {
      Snake.DRUNK = true;
      Snake.COFFEE = false;
      $('figure').css("-webkit-animation", "myfirst 5s linear 0s infinite alternate")
      $('figure').css("animation", "myfirst 5s linear 0s infinite alternate")
      return true;
    } else {
      return false;
    }
  };

  Snake.prototype.drinkBourbon = function () {
    if (this.head().equals(this.board.bourbon.position)) {
      Snake.DRUNK = true;
      Snake.COFFEE = false;
      $('figure').css("-webkit-animation", "myfirst 5s linear 0s infinite alternate")
      $('figure').css("animation", "myfirst 5s linear 0s infinite alternate")
      return true;
    } else {
      return false;
    }
  };

  Snake.prototype.drinkMargarita = function () {
    if (this.head().equals(this.board.margarita.position)) {
      Snake.DRUNK = true;
      Snake.COFFEE = false;
      $('figure').css("-webkit-animation", "myfirst 5s linear 0s infinite alternate")
      $('figure').css("animation", "myfirst 5s linear 0s infinite alternate")
      return true;
    } else {
      return false;
    }
  };

  Snake.prototype.drinkAppletini = function () {
    if (this.head().equals(this.board.appletini.position)) {
      Snake.DRUNK = true;
      Snake.COFFEE = false;
      $('figure').css("-webkit-animation", "myfirst 5s linear 0s infinite alternate")
      $('figure').css("animation", "myfirst 5s linear 0s infinite alternate")
      return true;
    } else {
      return false;
    }
  };

  Snake.prototype.isOccupying = function (array) {
    var result = false;
    this.segments.forEach(function (segment) {
      if (segment.i === array[0] && segment.j === array[1]) {
        result = true;
        return result;
      }
    });
    return result;
  };

  Snake.prototype.head = function () {
    return this.segments[this.segments.length - 1];
  };

  Snake.prototype.isValid = function () {
    var head = this.head();

    if (!this.board.validPosition(this.head())) {
      return false;
    }

    for (var i = 0; i < this.segments.length - 1; i++) {
      if (this.segments[i].equals(head)) {
        return false;
      }
    }

    return true;
  };

  Snake.prototype.move = function () {
    // move snake forward
    this.segments.push(this.head().plus(Snake.DIFFS[this.dir]));

    // allow turning again
    this.turning = false;

    // TODO: DRY this out
    if (this.eatApple()) { this.board.apple.replace();}

    if (this.drinkCoffee()) { this.board.coffee.replace(); }

    if (this.drinkEspresso()) { this.board.espresso.replace(); }

    if (this.drinkLatte()) { this.board.latte.replace(); }

    if (this.eatMagic()) { this.board.magic.replace(); }

    if (this.eatMagicApple()) { this.board.magicApple.replace(); }

    if (this.drinkBeer()) { this.board.beer.replace(); }

    if (this.drinkMoonshine()) { this.board.moonshine.replace(); }

    if (this.drinkVodka()) { this.board.vodka.replace(); }

    if (this.drinkBourbon()) { this.board.bourbon.replace(); }

    if (this.drinkMartini()) { this.board.martini.replace(); }

    if (this.drinkAppletini()) { this.board.appletini.replace(); }

    if (this.drinkMargarita()) { this.board.margarita.replace(); }

    // if not growing, remove tail segment
    if (this.growTurns > 0) {
      this.growTurns -= 1;
    } else {
      this.segments.shift();
    }

    // destroy snake if it eats itself or runs off grid
    if (!this.isValid()) {
      this.resetSnake();
    }
  };

  Snake.prototype.resetSnake = function() {
    snakeLength = this.board.snake.segments.length
    this.segments = [];
  };

  Snake.prototype.turn = function (dir) {
    // avoid turning directly back on yourself
    if (Snake.DIFFS[this.dir].isOpposite(Snake.DIFFS[dir]) ||
      this.turning) {
      return;
    } else {
      this.turning = true;
      this.dir = dir;
    }
  };

  var Board = SG.Board = function (dim) {
    this.dim = dim;
    this.index = 0;

    this.snake = new Snake(this);
    this.apple = new Apple(this);
    this.coffee = new Apple(this);
    this.espresso = new Apple(this);
    this.latte = new Apple(this);
    this.magic = new Apple(this);
    this.magicApple = new Apple(this);
    this.beer = new Beer(this);
    this.vodka = new Beer(this);
    this.moonshine = new Beer(this);
    this.martini = new Beer(this);
    this.bourbon = new Beer(this);
    this.appletini = new Beer(this);
    this.margarita = new Beer(this);
  };

  Board.prototype.validPosition = function (coord) {
    return (coord.i >= 0) && (coord.i < this.dim[0]) &&
      (coord.j >= 0) && (coord.j < this.dim[1]);
  };
})();
