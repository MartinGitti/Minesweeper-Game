import React from 'react';
import '../../Stylesheet/Stylesheet.css';

class Rules extends React.Component {
    render(){
    return (
    <div className='rules-container'>
        <h1>Rules of Minesweeper</h1>
        <hr/>
        <h2>Goal of Minesweeper Game:</h2>
        <p>
        Work your way around the board, avoiding any hidden mines with use of the indicating number of nearby mines that the tiles displays when clicked, this will give you an idea of which tiles to avoid.

        The mines are dispersed randomly accross the board with each round. 
        
        If you suspect a tile to hold a mine, make use of the flags by right-clicking on a tile.

        If you manage to open all the tiles that do not hold a mine, you win the round!
        </p>
        <h2> RULES OF MINESWEEPER GAME: </h2>
        <p>
            Click on various tiles in order to display what the tile holds.

            Beware though not to click on a tile that holds a mine because that will be the end of the round.

            Use the the indicating numbers of all the surrounding mines neighboring the tile clicked upon.

            Tip: Each tile has only eight tiles that surround it.

            There are 10 flags available to place in the positions where mines are suspected to be, by using the right-click mouse button.

            You are also able to claim a flag back by right-clicking on a tile that already has a flag.

            If you happen to click on a tile that hold a hidden mine, the round will end. You can carry on playing by clicking on the emoji face that will reset the board, allow you to play a new round of minesweeper.
            
            Open all the tiles that don't have a mine in order to win the round. Don't worry, you will get the hang of the game rather quickly. Be smart, be calm and sweep past all the mines.
        </p>
    </div>
    )}
}

export default Rules;






