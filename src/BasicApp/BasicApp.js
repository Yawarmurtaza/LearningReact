import React from "react";
import ButtonCounter from "../Components/FunctionComponents/ButtonCounter";
import Display from "../Components/ClassComponents/Display";

export default function BasicApp(){
    const [counter, setCounter] = React.useState(100);
    const updateCounter = (increment) => setCounter(counter + increment);
    
    return (
        <>
            <ButtonCounter updateCounter={updateCounter} increment={5}/>
            <ButtonCounter updateCounter={updateCounter} increment={50}/>
            <ButtonCounter updateCounter={updateCounter} increment={500}/>
            <Display counterValue={counter} name={"yawar"}/>
        </>
    );
}