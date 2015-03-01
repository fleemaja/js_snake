(function () {
  if (typeof SG === "undefined") {
    window.SG = {};
  }

  var View = SG.View = function ($el) {
    if (View.GAME_STARTED) {

      this.$el = $el;

      this.board = new SG.Board(20);
      this.setupGrid();

      this.intervalId = window.setInterval(
        this.step.bind(this),
        View.STEP_MILLIS
      );
    } else {
      this.welcome($el);
    }

    $(window).on("keydown", this.handleKeyEvent.bind(this));
  };

  View.GAME_STARTED = false;

  View.prototype.welcome = function($el) {
    this.$el = $el;

    this.board = new SG.Board(20);

    var html = "";

    for (var i = 1; i < this.board.dim; i++) {
      if (i == 10) {
        html += "<ul class='game-over'>Press the up key to begin!</ul>";
      } else {
        html += "<ul>";
        for (var j = 0; j < this.board.dim; j++) {
          html += "<li></li>";
        }
        html += "</ul>";
      }
    }

    this.$el.html(html);
    this.$li = this.$el.find("li");
  }

  View.prototype.deadView = function($el) {
    this.$el = $el;

    this.board = new SG.Board(20);

    var html = "";

    for (var i = 1; i < this.board.dim; i++) {
      if (i == 10) {
        html += "<ul class='game-over'>Game over!</ul>";
      } else if (i == 11) {
        html += "<ul class='message'>Press the up key to restart!</ul>"
      } else {
        html += "<ul>";
        for (var j = 0; j < this.board.dim; j++) {
          html += "<li></li>";
        }
        html += "</ul>";
      }
    }

    this.$el.html(html);
    this.$li = this.$el.find("li");
  }

  View.KEYS = {
    38: "N",
    39: "E",
    40: "S",
    37: "W"
  };

  View.STEP_MILLIS = 100;

  View.prototype.handleKeyEvent = function (event) {
    if (View.GAME_STARTED) {
      if (View.KEYS[event.keyCode]) {
        this.board.snake.turn(View.KEYS[event.keyCode]);
      } else {
        // non-playable key was pressed; ignore.
      }
    } else {
      if (View.KEYS[event.keyCode] == "N") {
        View.GAME_STARTED = true;
        new SG.View($(".snake-game"));
      }
    }
  };

  View.prototype.render = function () {
    this.updateClasses(this.board.snake.segments, "snake");
    this.updateClasses([this.board.apple.position], "apple");
  };

  View.prototype.updateClasses = function(coords, className) {
    this.$li.filter("." + className).removeClass();

    coords.forEach(function(coord){
      var flatCoord = (coord.i * this.board.dim) + coord.j;
      this.$li.eq(flatCoord).addClass(className);
    }.bind(this));
  };

  View.prototype.setupGrid = function () {
    var html = "";

    for (var i = 0; i < this.board.dim; i++) {
      html += "<ul>";
      for (var j = 0; j < this.board.dim; j++) {
        html += "<li></li>";
      }
      html += "</ul>";
    }

    this.$el.html(html);
    this.$li = this.$el.find("li");
  };

  View.prototype.step = function () {
    if (this.board.snake.segments.length > 0) {
      this.board.snake.move();
      $('#length').html(this.board.snake.segments.length);
      this.render();
    } else {
      window.clearInterval(this.intervalId);

      View.GAME_STARTED = false;
      $('#length').html(snakeLength);
      this.deadView(this.$el)
    }
  };
})();
