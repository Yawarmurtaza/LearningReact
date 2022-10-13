import React from "react";
import axios from "axios";
/*
export default function  GitHubInputFormFunc(props){

    const [state, setState] = React.useState({"userName": ""});

    

    async function onFormSubmit(eventData)
    {
        eventData.preventDefault();
        //console.log(this.state.userName);
        
        const userProfileUrl = `https://api.github.com/users/${state.userName}`;        
        const response = await axios.get(userProfileUrl);
        // console.log(response.data);
        //avatar_url, name, company

        const userData = {name: response.data.name, company: response.data.company, avatar_url: response.data.avatar_url};
        props.AddGitHubUserData(userData);
        setState({userName: ""});
    };

    function handleUserNameChange(eventData){        
        setState({userName: eventData.target.value});
    };

    return (
        <form onSubmit={onFormSubmit}>
        <label>GitHub User Name: </label>
        <input                  
        value={state.userName}
        onChange={handleUserNameChange}               
        type="text" required
        />
        <button>Add Card</button>
    </form>
    );
};
*/

export default class GitHubInputForm extends React.Component{
     
    constructor(props){
        super(props);
        this.state = {userName: ""};
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
    }

    async onFormSubmit(eventData)
    {
        eventData.preventDefault();
        //console.log(this.state.userName);
        
        const userProfileUrl = `https://api.github.com/users/${this.state.userName}`;        
        const response = await axios.get(userProfileUrl);
        // console.log(response.data);
        //avatar_url, name, company

        const userData = {name: response.data.name, company: response.data.company, avatar_url: response.data.avatar_url};
        this.props.AddGitHubUserData(userData);
        this.setState({userName: ""});
    };

    handleUserNameChange(eventData){        
        this.setState({userName: eventData.target.value});
    };

    render(){         

        return (
            <form onSubmit={this.onFormSubmit}>
                <label>GitHub User Name: </label>
                <input                  
                value={this.state.userName}
                onChange={this.handleUserNameChange}               
                type="text" required
                />
                <button>Add Card</button>
            </form>
        );
    }
}