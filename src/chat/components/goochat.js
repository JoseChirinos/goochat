// Dependences
import React, { Component } from 'react';
import fire from './../../config-chat/firebase-config';
// Modules
import Info from './../../chat/components/info';
import ViewMessage from './../../chat/components/view-message';

// modules navigation
import Bussines from './../../business/components/bussines';
import ListMessage from './../../navigation/components/list-message';
import Menu from './../../navigation/components/menu';


class Goochat extends Component{
	state = {
		message: [],
		name_bussines:'',
		id_bussines:''
	}

	eventosFire = () =>{
		//console.log("entra");
		var id = document.getElementById('id_user').value;
		/* Create reference to messages in Firebase Database */
		//console.log("entro correctamente1");
	    let messagesRef = fire.database().ref(id).child('name_bussines');
	    console.log("entro correctamente2");
	    console.log(messagesRef);
	    messagesRef.on('value', snapshot => {
	    	//console.log("entro correctamente");
	      /* Update React state when message is added at Firebase Database */
	      let name = { myName: snapshot.val(), id: id };
	     // this.setState({ messages: [message].concat(this.state.messages) });
	    // console.log('id :'+name.id);
	    
	     this.setState({ name_bussines:name.myName,id_bussines:name.id});
	     	
	    });
	}

	render(){
		const idTest = 'sergio_id';
		return(
			<div className="row" style={{"border":"1px solid black","height":"100%"}}>
				<div className="col-md-9" style={ {"border":"1px solid black","padding":"0px"} }>
					<div style={{"border":"1px solid black","width":"100%"}}>
						<Info />
					</div>
					<div style={{"border":"1px solid black","width":"100%"}}>
						<ViewMessage />
					</div>
				</div>
				 <div className="col-md-3" style={ {"border":"1px solid black","padding":"0px","height":"100%"} }>
					 	<div style={ {"border":"1px solid black","width":"100%","height":"180px"} }>
					 		<input type="text" id="id_user" value={ idTest } readOnly></input>
					 		<button onClick={this.eventosFire}>entrar</button>
							<Bussines nameBussines={this.state.name_bussines}/>				 		
					 	</div>					 	
					 	<div id="goochat-contact" style={{"border":"1px solid black","width":"100%","position":"absolute"}}>
							<ListMessage idBussines = {this.state.id_bussines} />	
					 	</div>
					
				</div>
			</div>
		)
	}
}

export default Goochat;