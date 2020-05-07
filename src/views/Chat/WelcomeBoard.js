import React, {Component} from 'react'
// import 'react-toastify/dist/ReactToastify.css'
import './WelcomeBoard.css'
import Authentication from 'Authentication'

export default class WelcomeBoard extends Component {
    render() {
        
        return (
            <div className="viewWelcomeBoard">
        <span className="textTitleWelcome">{`Welcome, ${
            this.props.currentUserNickname
            }`}</span>
                <img
                    className="avatarWelcome"
                    src={Authentication.loggedUser.photoURL}
                    alt="icon avatar"
                />
                <span className="textDesciptionWelcome">
          Let's start talking. Great things might happen.
        </span>
            </div>
        )
    }
}
