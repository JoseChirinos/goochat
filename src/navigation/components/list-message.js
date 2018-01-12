// Dependences
import React, { Component } from 'react';
import fire from '../../config-chat/firebase-config.js';
import Card from './../../navigation/components/card';
class ListMessage extends Component{
	state = {
		contactUser:[],
		idB:this.props.idBussines,
		ban:true
	}

	componentWillReceiveProps(){
		console.log("viendo desde componentWillReceiveProps"+this.props.idBussines);
		this.setState({idB:this.props.idBussines});
	}

	componentDidMount(){
		console.log("id => "+this.state.idB);
		if(this.state.idB != ""){
			console.log("id => "+this.state.idB);
			let circleRef = fire.database().ref(this.state.idB).child('bussines_circle');
		    circleRef.on('child_added', snapshot => {
		     console.log("entro correctamente");
		     console.log(snapshot.val());

		     //Update React state when message is added at Firebase Database 
		     let circle = { circleObj: snapshot.val(), key:snapshot.key };
		     this.setState({contactUser: [circle].concat(this.state.messages) });

		     console.log(this.state.contactUser);
		    });
		}
	}

	render(){
		//this.setState({ban:false});	

		return(
			<h1>Estas en el GoochatListMessage { this.state.idB} asdas {this.props.idBussines} </h1>
		)
	}
}

export default ListMessage;