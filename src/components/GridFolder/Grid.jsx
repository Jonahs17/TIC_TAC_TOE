import { useCallback, useState } from "react";
import Card from "../Card/Card";
import './grid.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import isWinner from "../../helper/checkWinner.js";


function Grid({ numberOfCards }) {
    const [turn,setTurn]=useState(true);
    const [board,setBoard]=useState(Array(numberOfCards).fill(""));
    const[winner,setWinner]=useState(null);
    const play= useCallback( function playCallBack(index){
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
        
    },[turn]);

    function reset(){
        setBoard(Array(numberOfCards).fill(""));
        setWinner(null);
        setTurn(true);
    }
    return (
        <>
        <h1 className="turn-highlight">TIC-TAC-TOE</h1>
        {winner && 
         (<>
         <button onClick={reset}>RESET</button>
         <h2 className="turn-highlight">Winner is {winner}</h2>
         <ToastContainer position="top-center"/>
         </>)
         
        }
        <h2 className="turn-highlight">Current Turn :{(turn===true)?'o':'x'}</h2>
        <div className="grid">
            {board.map((value, idx) => (
                <Card key={idx} player={value} onPlay={play} index={idx} gameEnd={winner}/>
            ))}
        </div>
        </>
        
    );
}

export default Grid;
