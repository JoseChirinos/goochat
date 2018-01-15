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

//style css

import './goochat.css'

class Goochat extends Component{
	state = {
		name_bussines:'',
		id_bussines:'',
		img_url:'',
		online:''
	}

	eventosFire = () =>{
		var id = document.getElementById('id_user').value;
	    let nameBussines = fire.database().ref(id).child('name_bussines');
	    nameBussines.on('value', snapshot => {
	    let name = { myName: snapshot.val(), id: id };
	    this.setState({ name_bussines:name.myName,id_bussines:name.id});
	    });

	     let imgBussines = fire.database().ref(id).child('img_url');
	    imgBussines.on('value', snapshot => {
	    this.setState({ img_url:snapshot.val()});
	    });


	    let onLine = fire.database().ref(id).child('online');
	    	onLine.on('value', snapshot => {
	    	this.setState({ online:snapshot.val()});
	    });
	}

	render(){
		const idTest = 'sergio_id';
		return(
			<div className="row" style={{"border":"1px solid black","height":"100%","margin":"0","width":"100%"}}>
				<div className="col-md-9" style={ {"border":"1px solid black"}}>
					<div style={{"border":"1px solid black","width":"100%"}}>
						<Info />
					</div>
					<div style={{"border":"1px solid black","width":"100%"}}>
						<ViewMessage />
					</div>
				</div>

				<div style={{"position":"fixed","top":"0px"}}>
					<input type="text" id="id_user" value={ idTest } readOnly></input>
					<button onClick={this.eventosFire}>entrar</button>
				</div>

				 <div className="col-md-3 goochat-contentdat">
				 	<div className="row">
					 	<div className="col-md-12" style={{"paddingRight":"0px","paddingLeft": "0px"}}>
							<Bussines {...this.state}/>				 		
					 	</div>					 	
					 	<div className="col-md-12" id="goochat-contact" style={{"width":"100%"}}>
							<ListMessage idBussines = {this.state.id_bussines} />	
					 	</div>
					</div>
					
				</div>
			</div>
		)
	}
}

export default Goochat;