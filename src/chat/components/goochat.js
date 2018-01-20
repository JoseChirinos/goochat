// Dependences
import React, { Component } from 'react';
import fire from './../../config-chat/firebase-config';
// Modules
import Info from './../../chat/components/info';
import ViewMessage from './../../chat/components/view-message';

// modules navigation
import Bussines from './../../business/components/bussines';
import ListContact from './../../navigation/components/list-contact';
import ListChat from './../../navigation/components/list-chat';
import ListSearch from './../../navigation/components/list-search';
import ListRequest from './../../navigation/components/list-request';	
import Menu from './../../navigation/components/menu';
//style css

import './goochat.css'

class Goochat extends Component{
	state = {
		description:'',
		name_bussines:'',
		id_bussines:'',
		img_url:'',
		online:'',
		id_contact:'',
		awaitingRequests:{},
		contactCircle:[],
		contactRequest:[],
		contactSearch:[],
		contactChat:[],
		infoContact:[],
		chatContact:[],
		menu:{
			listContact:true,
			chatList:false,
			search:false,
			request:false
		},
		runFire:{
			listContact:false,
			chatList:false,
			search:false,
			request:false
		},
		chatListUser:{}
	}

	loadListChat=(e)=>{
		let chatRef = fire.database().ref('bussines/'+this.state.id_bussines).child('chat');
		chatRef.on('value', snapshot => { 
			this.setState({chatListUser: snapshot.val()});
		});
	}

	eventoFromMenu = (select) =>{

		var menu = {};
		
		document.getElementById('circle').className="icon-triangle evento";
		document.getElementById('square').className="icon-message-square evento";
		document.getElementById('search').className="icon-search evento";
		document.getElementById('plus').className="icon-user-plus evento";
		document.getElementById('plus').style.color="#2b2b2b";

		var nameKeys = Object.keys(this.state.menu);
		nameKeys.forEach( (i,index)=>{
			if(index == select){
				menu[i] = true;
				if(select==0){
					document.getElementById('circle').className="icon-triangle evento item-selected"||console.log("error");
					document.getElementById('goochat-menu-info').innerHTML="Mis circulos empresariales.";

				}else if(select==1){
					document.getElementById('square').className="icon-message-square evento item-selected"||console.log("error");
					document.getElementById('goochat-menu-info').innerHTML="Lista de conversaciones.";
				}else if(select==2){
					document.getElementById('search').className="icon-search evento item-selected"||console.log("error");
					document.getElementById('goochat-menu-info').innerHTML="Busqueda de empresas.";
				}else if(select==3){
					document.getElementById('plus').className="icon-user-plus evento item-selected"||console.log("error");
					document.getElementById('plus').style.color="white"||console.log("error");
					document.getElementById('goochat-menu-info').innerHTML="Solicitudes";
				}
			}else{
				menu[i] = false;
			}
		})
		this.setState({
			menu:menu
		})
		//console.log("menu ",menu);

		this.viewState(menu);
	}
	
	eventosFire = () =>{
		var id = document.getElementById('id_user').value;
	    let nameBussines = fire.database().ref('bussines/'+id).child('info_bussines');
	    nameBussines.on('value', snapshot => {
	    let obj = { myInfo: snapshot.val(), id: id };
	    	this.setState({ name_bussines:obj.myInfo.name_bussines,id_bussines:obj.id,img_url:obj.myInfo.img_url,online:obj.myInfo.online,description:obj.myInfo.description});
	    });
	    this.viewState();
	}
	
	viewState=(men)=>{
		var runFire=this.state.runFire;
		var menu=men||this.state.menu;
		if(menu.listContact && !this.state.runFire.listContact){
			this.loadCircle();
			runFire['listContact']=true;
		}
		if(menu.chatList && !this.state.runFire.chatList){
			this.loadLastChat();
			runFire['chatList']=true;
		} 
		if(menu.search && !this.state.runFire.search){
	    	this.loadSearch("");
	    	this.loadAwaitingRequests();
	    	runFire['search']=true;
		} 
		if(menu.request && !this.state.runFire.request){
			this.loadRequest();
			runFire['request']=true;
		}
		this.setState({
			runFire:runFire
		});

	}

	componentDidMount(){	
	 	//this.loadAwaitingRequests();
		//this.loadChatContact("jose_id");
	}


	dateFire=()=>{
		let dateRef = fire.database().ref("/.info/serverTimeOffset");
	 	var serverTime;
	 	dateRef.on('value', function(offset) {
   			 var offsetVal = offset.val() || 0;
   			 serverTime = Date.now()+offsetVal;
   		});
  		return serverTime;
	}
//covierto la fecha y hora del servidor de firebase de ms a fecha y hora formato Date
	decryptDate=(ms)=>{
		var a =new Date(ms);
		return a;
	}

	//consultas firebase
	loadAwaitingRequests=()=>{
		var id = document.getElementById('id_user').value;
		let awaitingRequestsRef = fire.database().ref('bussines/'+id).child('awaitingRequests');
		awaitingRequestsRef.on('value', snapshot => { 
		    this.setState({awaitingRequests: snapshot.val() });
		    //console.log(this.state.awaitingRequests);
		});
	}

	loadCircle=()=>{
		var id = document.getElementById('id_user').value;
		let circleRef = fire.database().ref('bussines/'+id).child('bussines_circle');
		circleRef.orderByChild('lagree').equalTo(true).on('value', snapshot => { 
		    this.setState({contactCircle:snapshot.val()});
		});
	}

	loadRequest=()=>{
		var id = document.getElementById('id_user').value;
		let requestRef = fire.database().ref('bussines/'+id).child('bussines_circle');
		    requestRef.orderByChild('lagree').equalTo(false).on('value', snapshot => { 
		    this.setState({contactRequest: snapshot.val()});
		});
	}

	loadSearch=(e)=>{
		var idu = document.getElementById('id_user').value;
		let searchRef = fire.database().ref('bussines');
		var jsonTemp;
		searchRef.on('value', snapshot => {
			jsonTemp=[];
		  	Object.keys(snapshot.val()).map(id=>{
		 		var name=snapshot.val()[id].info_bussines['name_bussines'];
		 		if(e!=""){
			 		if(name.toLowerCase().indexOf(e.toLowerCase())!=-1){
			 			if(idu!=id){
				 			jsonTemp.push({
				 					id:id,
				 					info:snapshot.val()[id].info_bussines
				 				}
				 			);
			 			}

					}
				}else{
					if(idu!=id){
						jsonTemp.push({
				 				id:id,
				 				info:snapshot.val()[id].info_bussines
				 			}
				 		);
					}
				}
		     });
			this.setState({contactSearch:jsonTemp});
		});	
	}











	loadLastChat=()=>{
		var id = document.getElementById('id_user').value;
		let chatRef = fire.database().ref('bussines').child(id).child("chat");
		var jsonTemp;
		chatRef.on('value', snapshot => {	
			jsonTemp=[];
		  	Object.keys(snapshot.val()||{}).map(id=>{
	  			var unreadMessages=0;
		  		Object.keys(snapshot.val()[id].messages).map(idMessages=>{
		  			if(!snapshot.val()[id].messages[idMessages].viewed){
		  				unreadMessages++;
		  			}
		  		});
		 		var objInfo={
		 			id:id,
		 			latest_message:snapshot.val()[id].info.latest_message||{date: 1516460733007,id_bussines: "sergio_id",img_url: "",message: "error"},
		 			name_description:snapshot.val()[id].info.name_description||{img_url:"",description:""},
		 			unread_messages:unreadMessages
		 		}
		 		jsonTemp.push(objInfo);
		     });
		  	this.setState({contactChat:jsonTemp});
		});	
	}












	//card actions

	deleteItemCircle=(id)=>{
		var idu = document.getElementById('id_user').value;
		let deleteCircleRef= fire.database().ref('bussines').child(idu).child("bussines_circle").child(id);
		deleteCircleRef.remove();

		let deleteCircleUsuRef= fire.database().ref('bussines').child(id).child("bussines_circle").child(idu);
		deleteCircleUsuRef.remove();
	}


	sendRequest=(id)=>{
		var idu = document.getElementById('id_user').value;
		let sendRequestRef= fire.database().ref('bussines').child(id).child("bussines_circle").child(idu);
		sendRequestRef.update({
 		"date": this.dateFire(),
 		"description":this.state.description,
 		"img_url":this.state.img_url,
 		"lagree":false,
 		"name_bussines":this.state.name_bussines
		});

		let awaitingRequestsRef= fire.database().ref('bussines').child(idu).child("awaitingRequests").child(id);
		awaitingRequestsRef.update({
 		  "state": true
		});
		
	}
	removeRequest=(id)=>{
		var idu = document.getElementById('id_user').value;
		let removeRequestRef= fire.database().ref('bussines').child(""+id).child("bussines_circle").child(idu);
		removeRequestRef.remove();
		let awaitingRequestsRef= fire.database().ref('bussines').child(""+idu).child("awaitingRequests").child(id);
		awaitingRequestsRef.remove();
	}


	acceptRequest=(id)=>{
		var idu = document.getElementById('id_user').value;
		
		let acceptRef= fire.database().ref('bussines').child(idu).child("bussines_circle").child(id);
		
		acceptRef.update({
 		  lagree:true
		});


		//guardo mis datos en los circulos del usuario
		let saveMyDateRef= fire.database().ref('bussines').child(id).child("bussines_circle").child(idu);
		saveMyDateRef.update({
 		 	date:this.dateFire(),
 		 	description:this.state.description,
 		 	img_url:this.state.img_url,
 		 	lagree:true,
 		 	name_bussines:this.state.name_bussines
		});		
		//console.log("aceptar");




		let updateRef= fire.database().ref('bussines').child(id).child("awaitingRequests").child(idu);
		updateRef.remove();	
		//console.log("aceptar");



	}
	rejectRequest=(id)=>{
		var idu = document.getElementById('id_user').value;
		let rejectRef= fire.database().ref('bussines').child(idu).child("bussines_circle").child(id);
		rejectRef.remove();
		//elimino su solicitud los circulos del usuario
		let updateAwaitingRequestsRef= fire.database().ref('bussines').child(id).child("awaitingRequests").child(idu);
		updateAwaitingRequestsRef.remove();
		//console.log("rechazar");
	}

	//codigo del chat

	//muestra la info del contacto
	showInfoContact=(obj)=>{
		this.loadChatContact(obj.id);
		this.setState({infoContact:obj});
		this.setState({id_contact:obj.id});
		//console.log("funciona",obj);
		//console.log(this.state.id_contact);
	}


	loadChatContact=(idu)=>{
		
		var id = document.getElementById('id_user').value;
		//var id="sergio_id";
		var objTemp;
		let chatRef = fire.database().ref('bussines').child(id+'/chat/'+idu+'/messages');
		chatRef.on('value', snapshot => {	
			objTemp=[];
		  	Object.keys(snapshot.val()||{}).map(ida=>{
	  			//console.log("probando codigo",snapshot.val()[ida]);
	  			objTemp.push(snapshot.val()[ida])
		    });
		    this.setState({chatContact:objTemp});
		    //console.log("mostrando los datos desde el state : ",objTemp);
		});
	
	}



	sendMessage=(message)=>{
		//console.log("id del ke se le enviara el mensaje ",this.state.id_contact);
		// //console.log("mensaje ",message);
		// goochat-c3355 bussines sergio_id chat jose_id messages ajsdkjahsjdhajsd
	 
	 let infoRef=fire.database().ref('bussines').child(this.state.id_contact).child("chat").child(this.state.id_bussines).child('info/name_description');
		infoRef.update({
 		name_bussines:this.state.name_bussines||"",
 	 	img_url:this.state.img_url||"",
 	 	description:this.state.description||""
	});	
	let infoYourRef= fire.database().ref('bussines').child(this.state.id_bussines).child("chat").child(this.state.id_contact).child('info/name_description');
		infoYourRef.update({
 		 	name_bussines:this.state.infoContact.name_bussines||"error",
 		 	img_url:this.state.infoContact.img_url||"",
 		 	description:this.state.infoContact.description||"error"
	});	

	let saveMyDateRef= fire.database().ref('bussines').child(this.state.id_bussines).child("chat").child(this.state.id_contact).child('messages');
	saveMyDateRef.push({
 		 	date:this.dateFire(),
 		 	name_bussines:this.state.name_bussines,
 		 	id_bussines:this.state.id_bussines,
 		 	img_url:this.state.img_url,
 		 	message:message,
 		 	viewed:false
	});	

	let saveYourDateRef= fire.database().ref('bussines').child(this.state.id_contact).child("chat").child(this.state.id_bussines).child('messages');
	saveYourDateRef.push({
 	 	date:this.dateFire(),
 	 	name_bussines:this.state.name_bussines,
 	 	id_bussines:this.state.id_bussines,
    	img_url:this.state.img_url,
 	 	message:message,
 	 	viewed:false
	});	

		let saveYourLatestMessageRef= fire.database().ref('bussines').child(this.state.id_contact).child("chat").child(this.state.id_bussines).child('info').child('latest_message');
		saveYourLatestMessageRef.update({
 		 	date:this.dateFire(),
 		 	id_bussines:this.state.id_bussines,
 		 	message:message,
 		 	img_url:this.state.img_url
		});	

		let saveMyLatestMessageRef= fire.database().ref('bussines').child(this.state.id_bussines).child("chat").child(this.state.id_contact).child('info').child('latest_message');
		saveMyLatestMessageRef.update({
 		 	date:this.dateFire(),
 		 	id_bussines:this.state.id_bussines,
 		 	message:message,
 		 	img_url:this.state.img_url
		});	

	}

	actualizarDatos = (d) => {
		this.setState(d);
	}


	render(){
		//const idTest = 'jose_id';
		return(
			<div className="container-fluid Goochat" style={{"height":"100%","margin":"0","width":"100%"}}>
				<div className="row">
					<div className="col-md-9" style={ {"height":"100vh","background":"url(./assets/images/background-inicio.png)","backgroundSize":"100% 100%","backgroundRepeat":"no-repeat"}}>
						


						<div style={{"zIndex": "1000","width":"100%","position":"absolute","left": "0px","top": "0px","background": "#ededed","color": "gray","textAlign":"left","paddingLeft":"3%","fontSize":"10px"}}>
							<Info infoContact={this.state.infoContact}/>
						</div>
						<div style={{"overflowY":"auto","width": "100%", "height": "100vh" ,"background":"url(./assets/images/goo-logo.svg)","backgroundSize": "250px","backgroundRepeat": "no-repeat","backgroundPosition": "center"}}>
							<ViewMessage sendMessage={this.sendMessage} chatContact={this.state.chatContact} myID={this.state.id_bussines}/>
						</div>
					</div>

					<div style={{"position":"fixed","top":"200px"}}>
						<input type="text" id="id_user" ></input>
						<button onClick={this.eventosFire}>entrar</button>
					</div>

					 <div className="col-md-3 goochat-content-list">
					 	<div className="row">
						 	<div className="col-md-12" style={{"paddingRight":"0px","paddingLeft": "0px"}}>
								<Bussines {...this.state}/>			 		
						 	</div>	
						 	<div className="col-md-12 Info-menu">
								<h3 id="goochat-menu-info">Mis circulos empresariales.</h3>				 		
						 	</div>					 	
						 	<div className="col-md-12" id="goochat-contact" style={{"width":"100%"}}>

								<ListContact showInfoContact={this.showInfoContact} estado={ this.state.menu.listContact ? 'show':'hidden' } contactCircle={this.state.contactCircle} contactDelete={this.deleteItemCircle}/>

								<div className={ this.state.menu.chatList ? 'show':'hidden' } id="goochat-chatlist" >
									<ListChat showInfoContact={this.showInfoContact} contactChat={this.state.contactChat}/>
								</div>
								<div className={this.state.menu.search ? 'show':'hidden' } id="goochat-search" >
									<ListSearch showInfoContact={this.showInfoContact} contactSearch={this.state.contactSearch} contactSendRequest={this.sendRequest} search={this.loadSearch} contactRemoveRequest={this.removeRequest} awaitingRequests={this.state.awaitingRequests} listCircle={this.state.contactCircle}/>
								</div>
								<div className={this.state.menu.request ? 'show':'hidden' } id="goochat-request" >
									<ListRequest showInfoContact={this.showInfoContact} contactRequest={this.state.contactRequest} acceptRequest={this.acceptRequest} rejectRequest={this.rejectRequest}/>
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