import React from "react";
import GitHubCardFunc from "./GitHubCard";

// export default class GitHubCardList extends React.Component{
//     render(){      

//         return(
//             <div>
//                 {this.props.profiles.map(p=> <GitHubCard key={p.name} {...p}/>)}
//             </div>
//         );
//     }
// }

export default function GitHubCardListFunc (props){
        return(
            <div>
                {props.profiles.map(p=> <GitHubCardFunc {...p}  key={p.name}/>)}
            </div>
        );    
}