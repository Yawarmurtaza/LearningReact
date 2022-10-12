import React from "react";
import DisplayTitle from "./Components/DisplayTitle";
import GitHubCardListFunc from "./Components/GitHubCardList";
import GitHubInputForm from "./Components/GitHubInputForm";
// card
// list of cards

export default function GitHubCardsAppFunc(){
    const titleString = "The GitHub Cards App";

    const [state, setState] = React.useState({"profiles" : []});


    function AddGitHubUserData(userData){        
        setState(prevState => ({profiles: [...prevState.profiles, userData],}));
        // console.log(userData.name + " " + userData.company + " " + userData.avatar_url);
    }

    return (
        <>
        <GitHubInputForm AddGitHubUserData={AddGitHubUserData}/>
        <DisplayTitle title={titleString}/>
        <GitHubCardListFunc profiles={state.profiles}/>
    </>
    );
}
/*
export default class GitHubCardsApp extends React.Component{   
    titleString = "The GitHub Cards App";

    constructor(props){
        super(props);
        const testData = [
            // {"name": "YAWAR MURTAZA KHUWAJA",  "company": "Microsoft",   "avatar_url": "https://avatars.githubusercontent.com/u/10285107?v=4"},
            // {"name": "Dan",  "company": "@facebook",   "avatar_url": "https://avatars.githubusercontent.com/u/810438?v=4"},
            // {"name": "Irakli Gozalishvili",  "company": "Protocol Labs",   "avatar_url": "https://avatars.githubusercontent.com/u/21236?v=4" }
         ];

        this.state = {
            profiles: testData,
        };        

        this.AddGitHubUserData = this.AddGitHubUserData.bind(this);
    }

    AddGitHubUserData(userData){        
        this.setState(prevState => ({profiles: [...prevState.profiles, userData],}));
        // console.log(userData.name + " " + userData.company + " " + userData.avatar_url);
    }
    
    
 render(){
    return(
        <>
            <GitHubInputForm AddGitHubUserData={this.AddGitHubUserData}/>
            <DisplayTitle title={this.titleString}/>
            <GitHubCardListFunc profiles={this.state.profiles}/>
        </>
    );
 }   
}*/