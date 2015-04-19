(function () {
  if (typeof SG === "undefined") {
    window.SG = {};
  }

  var View = SG.View = function ($el) {
    if (View.GAME_STARTED) {

      this.$el = $el;

      this.board = new SG.Board([18, 32]);
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

  View.STEP_MILLIS = 50;

  View.prototype.welcome = function($el) {
    this.$el = $el;

    this.board = new SG.Board([18, 32]);

    var html = "";

    for (var i = 12; i < this.board.dim[0]; i++) {
      if (i == 14) {
        html += "<span class='big-black'>How to Play </span><br><br>"
        html += "<img src='../images/coffee.png'></img> = coffee. Speeds the snake up<br>"
        html += "<img src='../images/alcohol.png'></img> = alcohol. Makes the snake clumsy and its vision blurry<br>"
        html += "<div class='magic-square'></div> = apple. The healthy choice. Makes the snake grow and cancels the effects of coffee and alcohol<br><br>"
        html += "Use the arrow keys <img src='../images/arrows.png' height='36' width='48'></img> to move the snake<br><br>"
        html += "<ul class='message'>Press the <b class='big-blue'>up key</b> to begin!</ul>";
      } else {
        html += "<ul>";
        for (var j = 0; j < this.board.dim[1]; j++) {
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

    this.board = new SG.Board([18, 32]);

    var html = "";

    for (var i = 4; i < this.board.dim[0]; i++) {
      if (i == 10) {
        html += "<ul class='big-blue'><b>Game over!</b></ul>";
        html += "<ul class='message'>Press the up key to restart!</ul>"
      } else {
        html += "<ul>";
        for (var j = 0; j < this.board.dim[1]; j++) {
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
    this.updateClasses([this.board.coffee.position], "coffee");
    this.updateClasses([this.board.espresso.position], "espresso");
    this.updateClasses([this.board.latte.position], "latte");
    this.updateClasses([this.board.magic.position], "magic");
    this.updateClasses([this.board.magicApple.position], "magic-apple");
    this.updateClasses([this.board.apple.position], "apple");
    this.updateClasses([this.board.beer.position], "beer");
    this.updateClasses([this.board.moonshine.position], "moonshine");
    this.updateClasses([this.board.vodka.position], "vodka");
    this.updateClasses([this.board.bourbon.position], "bourbon");
    this.updateClasses([this.board.martini.position], "martini");
    this.updateClasses([this.board.margarita.position], "margarita");
    this.updateClasses([this.board.appletini.position], "appletini");
  };

  View.prototype.updateClasses = function(coords, className) {
    this.$li.filter("." + className).removeClass();

    coords.forEach(function(coord){
      var flatCoord = (coord.i * this.board.dim[1]) + coord.j;
      this.$li.eq(flatCoord).addClass(className);
    }.bind(this));
  };

  View.prototype.setupGrid = function () {
    var html = "";

    for (var i = 0; i < this.board.dim[0]; i++) {
      html += "<ul>";
      for (var j = 0; j < this.board.dim[1]; j++) {
        html += "<li></li>";
      }
      html += "</ul>";
    }

    this.$el.html(html);
    this.$li = this.$el.find("li");
  };

  View.prototype.step = function () {
    if (this.board.snake.segments.length > 0) {
      if (SG.Snake.COFFEE) {
        this.board.snake.move();
      } else if (this.board.index % 2 === 0) {
        this.board.snake.move();
      }

      if (this.board.index % 10 === 0 && SG.Snake.DRUNK) {
        this.board.apple.move();
        this.board.coffee.move();
        this.board.espresso.move();
        this.board.latte.move();
        this.board.magic.move();
        this.board.magicApple.move();
        this.board.appletini.move();
        this.board.margarita.move();
        this.board.martini.move();
        this.board.bourbon.move();
        this.board.vodka.move();
        this.board.moonshine.move();
        this.board.beer.move();
      }
      this.board.index += 1;
      $('#length').html(this.board.snake.segments.length);
      this.render();
    } else {
      window.clearInterval(this.intervalId);
      SG.Snake.DRUNK = false;
      SG.Snake.COFFEE = false;
      View.GAME_STARTED = false;
      $('figure').removeAttr('style');
      $('#length').html(snakeLength);
      this.deadView(this.$el)
    }
  };
})();
