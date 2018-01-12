// Dependences
import React, { Component } from 'react';
import fire from './../../config-chat/firebase-config';
// Modules
import GoochatInfo from './../../chat/components/goochat-info';
import GoochatViewMessage from './../../chat/components/goochat-view-message';

// modules navigation
import GoochatBussines from './../../business/components/goochat-bussines';
import GoochatCard from './../../navigation/components/goochat-card';
import GoochatListMessage from './../../navigation/components/goochat-list-message';
import GoochatMenu from './../../navigation/components/goochat-menu';


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
					<GoochatInfo />
					<GoochatViewMessage />
				</div>
				 <div>
					<GoochatBussines />
					<GoochatCard />
				</div>
			</div>
		)
	}
}

export default Goochat;