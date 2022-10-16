
import './App.css';
import React from 'react';
import GameApp from "./Game/GameApp";
export default class App extends React.Component {
  // constructor
  // this keyword
  
render(){
  return (
    <>
      {/* <BasicApp/> */}
      {/* <GitHubCardsAppFunc/> */}
      <GameApp/>
    </>
  );
}
}


// function App() {
//   return (
//     <>
//       <BasicApp/>      
//       <GitHubCardsApp/>
//     </>
//   );
// }

