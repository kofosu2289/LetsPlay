// begin game object
const game = {
  players: [],

  // Create a new player object and add player to the players array
  addPlayer: () => {
    const newPlayer = new Player(); // create a new player
    const name = document.querySelector('#name'); // get input
    console.log(this);
    console.log('Clicked');
    console.log(name.value); // check input value
    newPlayer.name = name.value; // set object name property to input value
    name.value = ''; // clear input value

    game.players.push(newPlayer); // push entry to players array => object
    console.log('A new player has been added: ' + game.players[0].name);
  },

  // dice roll functionality
  rollDice: () => {

  },

  // get winner functionality
  getWinner: () => {

  },

};
// end game object

// begin player object
Player = () => {
  this.name = '';
  this.score = 0;
  this.pieces = {};
};

document.querySelector('#add-player').addEventListener('click', addPlayer);