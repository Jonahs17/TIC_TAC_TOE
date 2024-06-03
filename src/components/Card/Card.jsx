import Icon from "../Icon/Icon";
import './card.css';
import { memo } from "react";

function Card({ onPlay ,player ,index,gameEnd}) { // Destructure props here
  
  let icon=<Icon/>;
  if(player==='x'){
    icon=<Icon name="cross"/>

  }
  else if(player==='o'){
    icon=<Icon name="circle"/>

  }
  

    return (

      
        <div className="card" onClick={()=>!gameEnd &&player==="" && onPlay(index)}>
            {icon}
        </div>
    );
}

export default memo(Card);
