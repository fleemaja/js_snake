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

  View.STEP_MILLIS = 100;

  View.prototype.welcome = function($el) {
    this.$el = $el;

    this.board = new SG.Board(20);

    var html = "";

    for (var i = 1; i < this.board.dim; i++) {
      if (i == 10) {
        html += "<ul class='message'>Press the <b class='bold-purple'>up key</b> to begin!</ul>";
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
      if (i == 9) {
        html += "<ul class='bold-purple'><b>Game over!</b></ul>";
      } else if (i == 10) {
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
    if (SG.Snake.DRUNK) {
      this.$li.filter(".snake").removeClass();
      this.updateClasses(this.board.snake.segments, "drunk-snake");
    } else {
      this.updateClasses(this.board.snake.segments, "snake");
    }
    this.updateClasses([this.board.apple.position], "apple");
    this.updateClasses([this.board.beer.position], "beer");
    this.updateClasses([this.board.moonshine.position], "moonshine");
    this.updateClasses([this.board.alcohol.position], "alcohol");
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
      SG.Snake.DRUNK = false;
      View.GAME_STARTED = false;
      $('#length').html(snakeLength);
      this.deadView(this.$el)
    }
  };
})();
