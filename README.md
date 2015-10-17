# cgol-redux
[conway's game of life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) using redux - [demo](http://craigbilner.github.io/cgol-redux/)

# setup
* just npm install, and with a little bit of luck the prod version will open up in the browser

# how to
* click on a series of cells to form a pattern - (see wiki link above for ideas)
* click play
* change speed using the buttons in the top right for different effects

# tips
* if the game stalls click on a cell to kick things off again
* alternatively, pause the game, choose a few new cells, then play again

# notes
* game will pause when there are no cells left alive

# take aways
* Hot reloading with [EventSource](https://developer.mozilla.org/en-US/docs/Web/API/EventSource) is really handy especially when changing inline styles
* Redux dev tools are really great to get started and visualise your state
* Object.assign polyfill is...slow
* Being a good immutable developer and assigning to an empty object literal is...slow
* Chrome developer tools are even better now