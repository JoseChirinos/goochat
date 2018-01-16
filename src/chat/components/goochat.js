// Dependences
import React, { Component } from 'react';
import fire from './../../config-chat/firebase-config';
// Modules
import Info from './../../chat/components/info';
import ViewMessage from './../../chat/components/view-message';

// modules navigation
import Bussines from './../../business/components/bussines';
import ListContact from './../../navigation/components/list-contact';
import listChat from './../../navigation/components/list-chat';
import listSearch from './../../navigation/components/list-search';
import ListRequest from './../../navigation/components/list-request';	
import Menu from './../../navigation/components/menu';
//style css

import './goochat.css'

class Goochat extends Component{
	state = {
		name_bussines:'',
		id_bussines:'',
		img_url:'',
		online:'',
		menu:{
			listContact:true,
			chatList:false,
			search:false,
			request:false
		},
		chatListUser:{}
	}

	loadListChat=(e)=>{
		let chatRef = fire.database().ref(this.state.id_bussines).child('chat');
		chatRef.on('value', snapshot => { 
			this.setState({chatListUser: snapshot.val()});
		});
		console.log(chatListUser);
	}

	eventoFromMenu = (select) =>{
		var menu = {};
		var nameKeys = Object.keys(this.state.menu);
		nameKeys.forEach( (i,index)=>{
			if(index == select){
				menu[i] = true
			}else{
				menu[i] = false
			}
			
		})
		this.setState({
			menu:menu
		})

		console.log('este es un evento desde el menu');
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




	   	//probando codigo
	   	//para mostrar el chat

	   	let chatRef = fire.database().ref(id).child('chat').child('jose_id').child('info');
		chatRef.on('value', snapshot => { 
			this.setState({chatListUser:snapshot.val()});
			console.log(this.state.chatListUser);
		});
	}
	
	actualizarDatos = (d) => {
		this.setState(d);
	}


	render(){
		const idTest = 'sergio_id';
		return(
			<div className="container-fluid Goochat" style={{"border":"1px solid black","height":"100%","margin":"0","width":"100%"}}>
				<div className="row">
					<div className="col-md-8" style={ {"border":"1px solid black"}}>
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

					 <div className="col-md-4 goochat-content-list">
					 	<div className="row">
						 	<div className="col-md-12" style={{"paddingRight":"0px","paddingLeft": "0px"}}>
								<Bussines {...this.state}/>				 		
						 	</div>	
						 	<div className="col-md-12 Info-menu">
								<h3>Mis circulos empresariales.</h3>				 		
						 	</div>					 	
						 	<div className="col-md-12" id="goochat-contact" style={{"width":"100%"}}>

								<ListContact estado={ this.state.menu.listContact ? 'show':'hidden' } idBussines={this.state.id_bussines}/>

								<div className={ this.state.menu.chatList ? 'show':'hidden' } id="goochat-chatlist" >
									chat
								</div>
								<div className={ this.state.menu.search ? 'show':'hidden' } id="goochat-search" >
									Search
								</div>
								<div className={ this.state.menu.request ? 'show':'hidden' } id="goochat-request" >
									<ListRequest/>
								</div>

						 	</div>
						 	<div className="col-md-12" style={{"position":"absolute","bottom":"0px","width":"100%","paddingRight":"0px","paddingLeft": "0px"}}>
								<Menu eventoPrueba={ this.eventoFromMenu }/>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Goochat;