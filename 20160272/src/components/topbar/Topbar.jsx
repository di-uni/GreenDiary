import React, {Component} from "react";
import "./topbar.css";
import {Link} from "react-router-dom";
import firebase from "firebase/app";


export default function Topbar() {
    var user = firebase.auth().currentUser;
    
    const onSubmit = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
            
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;
    
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            user = result.user;
            window.location.reload();
            
        }).catch((error) => {
            // // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // // The email of the user's account used.
            // var email = error.email;
            // // The firebase.auth.AuthCredential type that was used.
            // var credential = error.credential;
            // ...
            console.log(error);
        });
    }

    const onClickLogOut = () => {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location.reload();
      }).catch((error) => {
        // An error happened.
      });
    }

    if (user == null){
        return (
            <nav className="topbarContainer">
                <div className="topbarLeft">
                    <Link className="logo" to="/">Green Diary</Link>
                </div>
                <div className="topbarCenter"></div>
                <div className="topbarRight">
                    <Link className="topbarText" to="/diary">Write</Link>
                    <Link className="topbarText" to="/my">My Diary</Link>
                    <div className="loginout">
                        <button 
                            type="button"
                            onClick = {onSubmit}>
                            Log In
                        </button>
                    </div>
                    <br></br>
                </div>
    
            </nav>
        )
    }

    else {
        return (
            <nav className="topbarContainer">
                <div className="topbarLeft">
                    <Link className="logo" to="/">Green Diary</Link>
                </div>
                <div className="topbarCenter"></div>
                <div className="topbarRight">
                    <div className="topbarUser">
                        {user.displayName}
                    </div>
                    <Link className="topbarText" to="/diary">Write</Link>
                    <Link className="topbarText" to="/my">My Diary</Link>
                    <div className="loginout">
                        <button 
                            type="button"
                            onClick = {onClickLogOut}>
                            Log Out
                        </button>
                    </div>
                    <br></br>
                </div>
    
            </nav>
        )
    }
    
    
}

// class GoogleLogin extends Component {
//     onSubmit = () => {
//         var provider = new firebase.auth.GoogleAuthProvider();
//         firebase.auth().signInWithPopup(provider).then((result) => {
            
//             /** @type {firebase.auth.OAuthCredential} */
//             var credential = result.credential;
    
//             // This gives you a Google Access Token. You can use it to access the Google API.
//             var token = credential.accessToken;
//             // The signed-in user info.
//             var user = result.user;
//             window.location.reload();
            
//         }).catch((error) => {
//             // // Handle Errors here.
//             // var errorCode = error.code;
//             // var errorMessage = error.message;
//             // // The email of the user's account used.
//             // var email = error.email;
//             // // The firebase.auth.AuthCredential type that was used.
//             // var credential = error.credential;
//             // ...
//             console.log(error);
//         });
//     }
    

//     render() {
//         return (
//             <div className="login">
//                 <button 
//                     type="button"
//                     className="google_login_button"
//                     onClick = {this.onSubmit}>
//                     Log In
//                 </button>
//             </div>
//         )
//     }
// }