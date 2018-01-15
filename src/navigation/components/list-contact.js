// Dependences
import React, { Component } from 'react';
import fire from '../../config-chat/firebase-config.js';
import Card from './../../navigation/components/card';
import './list-contact.css';
class ListMessage extends Component{
	state = {
		contactUser:[],
		idB:'',
		ban:true
	}
	componentWillReceiveProps(nextProps){		
		this.setState({idB:nextProps.idBussines});
		if(nextProps.idBussines != ""){
			let circleRef = fire.database().ref(nextProps.idBussines).child('bussines_circle');
		    circleRef.on('value', snapshot => { 
		     this.setState({contactUser: snapshot.val() });
		    });
		}
	}

	render(){
		//this.setState({ban:false});
		return(
			<div className={ this.props.estado }>
				{
					Object.keys(this.state.contactUser).map( id =>{
						return (
							<div key={id}>
								<Card {...this.state.contactUser[id]}/>
								<br/>
							</div>
						)
					})
				}
			</div>
		)
	}
}

export default ListMessage;