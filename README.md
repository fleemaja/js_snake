# Drunken Snake
[Live Demo]
(http://htmlpreview.github.io/?https://github.com/fleemaja/js_snake/blob/master/html/snake.html)


A fun little javascript version of the classic video game [Snake](http://en.wikipedia.org/wiki/Snake_(video_game)). As a little twist on the game, the game rendering changes depending on whether the snake has become drunk, has injested coffee, or has made the healthy choice of eating an apple.

The Snake, Board, Apple, Alcohol, Coffee, and Coord classes are written in js/snake.js and game rendering is done in js/snake-view.js. The rendering is done using HTML lists with CSS classes.


## Features to add
+ Make the items seem like more than just gimmicks. Somehow incorporate them more into the gameplay or make their effects more dynamic e.g. drunkenness becomes more severe with more drinking.
+ Redis-backed Leaderboard or at least a current session high score.
+ Add more 'items' - e.g. a gold star that makes the snake rapidly change colors and makes the snake temporarily invincible, a 'mirror' that inverts key directions, a 'tornado' that spins the whole game screen around, a 'pizza' that makes the snake fatter, etc.
+ Sounds for apple, beer, coffee, and dying. Use mario mushroom 'growing' sound for apples. Use pacman dying sound for dying. Use racecar sound for coffee, etc.
