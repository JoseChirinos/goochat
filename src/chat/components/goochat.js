// Dependences
import React, { Component } from 'react';
import fire from './../../config-chat/firebase-config';
// Modules
import Info from './../../chat/components/info';
import ViewMessage from './../../chat/components/view-message';

// modules navigation
import Bussines from './../../business/components/bussines';
import Card from './../../navigation/components/card';
import ListMessage from './../../navigation/components/list-message';
import Menu from './../../navigation/components/menu';


class Goochat extends Component{
	state = {
		message: []
	}
	componentDidMount(){
		/* Create reference to messages in Firebase Database */
	    let messagesRef = fire.database().ref('sergio_id/chat/jose_id').orderByKey().limitToLast(100);
	    messagesRef.on('child_added', snapshot => {
	      /* Update React state when message is added at Firebase Database */
	      let message = { obj: snapshot.val(), id: snapshot.key };
	      this.setState({ messages: [message].concat(this.state.messages) });
	      console.log(message.id);
	      console.log(message.obj);
	    });
	}
	render(){
		return(
			<div>
				<div>
					<Info />
					<ViewMessage />
				</div>
				 <div>
					<Bussines />
					<Card />
				</div>
			</div>
		)
	}
}

export default Goochat;