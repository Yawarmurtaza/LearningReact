import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function GitHubCardFunc(props) {
  
  return (
    <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={props.avatar_url} />            
            <Card.Body>
              <Card.Title>{props.name}</Card.Title>
              <Card.Text>
                {props.company}
              </Card.Text>              
            </Card.Body>
          </Card>
  );
}


// export default class GitHubCard extends React.Component{
//     render(){      
//      const profile = this.props;
//         return (

//             <Card style={{ width: '18rem' }}>
//             <Card.Img variant="top" src={profile.avatar_url} />            
//             <Card.Body>
//               <Card.Title>{profile.name}</Card.Title>
//               <Card.Text>
//                 {profile.company}
//               </Card.Text>              
//             </Card.Body>
//           </Card>
//         );
//     }
// }


/*
const testData = [
   {"name": "YAWAR MURTAZA KHUWAJA",  "company": "Microsoft",   "avatar_url": "https://avatars.githubusercontent.com/u/10285107?v=4"},
   {"name": "Dan",  "company": "@facebook",   "avatar_url": "https://avatars.githubusercontent.com/u/810438?v=4"},
   {"name": "Irakli Gozalishvili",  "company": "Protocol Labs",   "avatar_url": "https://avatars.githubusercontent.com/u/21236?v=4,
];

*/