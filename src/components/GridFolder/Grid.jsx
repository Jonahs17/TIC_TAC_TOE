import { useState } from "react";
import Card from "../Card/Card";
import './grid.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function isWinner(board,symbol){
    if (board[0] === board[1] && board[1] === board[2] && board[2] === symbol) return symbol;
    if (board[3] === board[4] && board[4] === board[5] && board[5] === symbol) return symbol;
    if (board[6] === board[7] && board[7] === board[8] && board[8] === symbol) return symbol;
    
    if (board[0] === board[3] && board[3] === board[6] && board[6] === symbol) return symbol;
    if (board[1] === board[4] && board[4] === board[7] && board[7] === symbol) return symbol;
    if (board[2] === board[5] && board[5] === board[8] && board[8] === symbol) return symbol;
    
    if (board[0] === board[4] && board[4] === board[8] && board[8] === symbol) return symbol;
    if (board[2] === board[4] && board[4] === board[6] && board[6] === symbol) return symbol;
    

    return null;
}

function Grid({ numberOfCards }) {
    const [turn,setTurn]=useState(true);
    const [board,setBoard]=useState(Array(numberOfCards).fill(""));
    const[winner,setWinner]=useState(null);
    function play(index){
        console.log(index);
        if(turn===true){
            board[index]='o';
        }
        else{
            board[index]='x';
        }
        const win=isWinner(board,(turn?'o':'x'));
        if(win){
            setWinner(win);
            toast.success(`Congrats ${win}`);
        }
        setBoard([...board]);
        setTurn(!turn);
        
    };

    function reset(){
        setBoard(Array(numberOfCards).fill(""));
        setWinner(null);
        setTurn(true);
    }
    return (
        <>
        {winner && 
         (<>
         <button onClick={reset}>RESET</button>
         <h1 className="turn-highlight">Winner is {winner}</h1>
         <ToastContainer position="top-center"/>
         </>)
         
        }
        <h1 className="turn-highlight">Current Turn :{(turn===true)?'o':'x'}</h1>
        <div className="grid">
            {board.map((value, idx) => (
                <Card key={idx} player={value} onPlay={play} index={idx} gameEnd={winner}/>
            ))}
        </div>
        </>
        
    );
}

export default Grid;
