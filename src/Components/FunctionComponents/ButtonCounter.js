import React from "react";

function ButtonCounter(props){
    
     function ButtonCounterClicked(){
         props.updateCounter(props.increment);
     }
    return (
        <button onClick={ButtonCounterClicked}>Click Me! {props.increment}</button>
    );
};

export default ButtonCounter; 