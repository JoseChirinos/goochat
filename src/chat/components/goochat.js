// Dependences
import React, { Component } from 'react';
import fire from './../../config-chat/firebase-config';
// Modules
import Info from './../../chat/components/info';
import ViewMessage from './../../chat/components/view-message';
import Loader from './loader'
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
		onlineContact:[],
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
		chatListUser:{},
		numberOfMessage:10,
		inputSendState:false,
		viewMessageSwitch:true,
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

	    let onlineOnBussines = fire.database().ref('bussines/'+id).child('info_bussines');
	    onlineOnBussines.update({
	    	online:true
	    });

	}

	viewState=(men)=>{
		var runFire=this.state.runFire;
		var menu=men||this.state.menu;
		if(menu.listContact && !this.state.runFire.listContact){
			this.loadCircle();
			runFire['listContact']=true;
		}
		if(menu.chatList && !this.state.runFire.chatList){
			//this.contactOnLine();
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
		window.addEventListener("beforeunload", this.onUnload);
		this.id_contactVar='';


	}



	onUnload=()=>{
		let onlineOfBussines = fire.database().ref('bussines').child(this.state.id_bussines).child('info_bussines');
	    onlineOfBussines.update({
	    	online:false
	    });
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
		document.getElementById('menu').className="show";
		let circleRef = fire.database().ref('bussines/'+id).child('bussines_circle');
		circleRef.orderByChild('lagree').equalTo(true).on('value', snapshot => {
		    this.setState({contactCircle:snapshot.val()});
			document.getElementById('menu').className="hidden";
		});
	}

	loadRequest=()=>{
		document.getElementById('menu').className="show";
		var id = document.getElementById('id_user').value;
		let requestRef = fire.database().ref('bussines/'+id).child('bussines_circle');
		    requestRef.orderByChild('lagree').equalTo(false).on('value', snapshot => {
		    this.setState({contactRequest: snapshot.val()});
		    document.getElementById('menu').className="hidden";
		});
	}

	loadSearch=(e)=>{
		// var idu = document.getElementById('id_user').value;
		document.getElementById('menu').className="show";
		let searchRef = fire.database().ref('bussines');
		searchRef.on('value', snapshot => {
			document.getElementById('menu').className="show";
			var jsonTemp=[];
			//console.log("prueba del  search ",snapshot.val());
		  	Object.keys(snapshot.val()).map(id=>{
		 		var name=snapshot.val()[id].info_bussines['name_bussines'];
		 		if(e!=""){
			 		if(name.toLowerCase().indexOf(e.toLowerCase())!=-1){
			 			if(this.state.id_bussines!=id){
				 			jsonTemp.push({
				 					id:id,
				 					info:snapshot.val()[id].info_bussines
				 				}
				 			);
			 			}

					}
				}else{
					if(this.state.id_bussines!=id){
						jsonTemp.push({
				 				id:id,
				 				info:snapshot.val()[id].info_bussines
				 			}
				 		);
					}
				}
				document.getElementById('menu').className="hidden";
		     });
			this.setState({contactSearch:jsonTemp});
		});
	}


















	//funcion de prueba

	pruebaCode=(id)=>{
		if(this.state.id_contact!=id){
			var jsonTemp={};
			let chatRef2 = fire.database().ref('bussines').child(this.state.id_bussines).child("chat").child(id).child("messages").limitToLast(1000);
			chatRef2.orderByChild('viewed').equalTo(false).on('value', snapshot => {
				jsonTemp=snapshot.val();
				chatRef2.off();
			});
			var lon;
			try{
				lon=Object.keys(jsonTemp).length;
			}catch(e){lon=0;}
			if(this.state.id_contact==id){
				this.updateViewed(id);
				return 0;
			}else{
				return lon;
			}
		}
	}


	loadLastChat=()=>{
		document.getElementById('menu').className="show";
		let chatRef = fire.database().ref('bussines').child(this.state.id_bussines).child("chat");
		chatRef.on('value', snapshot => {
			var jsonTemp;
			var objInfo;
			var lastChat=[];
			var jsonTemp={};
			// var idCompare='';

			jsonTemp= snapshot.val();
			lastChat=[];

				Object.keys(jsonTemp).map(id=>{
					var unreadMessages=this.pruebaCode(id);
					if(unreadMessages==null){
						unreadMessages=0;
					}
				 	objInfo={
			 			id:id,
			 			latest_message:jsonTemp[id].info.latest_message||{date: 1516460733007,id_bussines: "sergio_id",img_url: "",message: "error"},
			 			name_description:jsonTemp[id].info.name_description||{img_url:"",description:""},
			 			unread_messages:unreadMessages
				 	}

					lastChat.push(objInfo);

				 	if(objInfo.unread_messages!=0 && objInfo.unread_messages!=null && this.id_contactVar!=objInfo.id){
						var audioElement = document.createElement('audio');
			    		audioElement.setAttribute('src', '../../assets/audio/ding.mp3');
			   			audioElement.play();
					}else{
						this.updateViewed(this.id_contactVar);
					}
				});

			this.setState({contactChat:lastChat});
			//console.log(lastChat);
			document.getElementById('menu').className="hidden";
		});
	}



	backMenu=()=>{
		document.getElementById("chatMessage").className="col-sm-12 col-md-9 col-lg-9 hide";
		document.getElementById("goochat-menu").className="col-sm-12 col-md-3 col-lg-3 goochat-content-list show";
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

		let updateRef= fire.database().ref('bussines').child(id).child("awaitingRequests").child(idu);
		updateRef.remove();

	}
	rejectRequest=(id)=>{
		var idu = document.getElementById('id_user').value;
		let rejectRef= fire.database().ref('bussines').child(idu).child("bussines_circle").child(id);
		rejectRef.remove();
		let updateAwaitingRequestsRef= fire.database().ref('bussines').child(id).child("awaitingRequests").child(idu);
		updateAwaitingRequestsRef.remove();

	}



	showInfoContact=(obj)=>{
		//probando codigo
		this.setState({infoContact:obj});
		this.setState({id_contact:obj.id});
		this.id_contactVar=obj.id;
		this.updateViewed(obj.id);
		this.loadChatContact(obj.id);
		console.log("probando codigo del shoowInfoContact");


		if (window.matchMedia("(min-width: 892px)").matches) {
  			document.getElementById("chatMessage").className="col-sm-12 col-md-9 col-lg-9 show";
			document.getElementById("goochat-menu").className="col-sm-12 col-md-3 col-lg-3 goochat-content-list show";
		} else {
			document.getElementById("chatMessage").className="col-sm-12 col-md-9 col-lg-9 show";
			document.getElementById("goochat-menu").className="col-sm-12 col-md-3 col-lg-3 goochat-content-list hide";
		}

	}


	//actualizar datos viewed

	updateViewed=(id)=>{
		try{
			var jsonTemp={};
			let chatRef1 = fire.database().ref('bussines').child(this.state.id_bussines).child("chat").child(id).child("messages").limitToLast(100);
			chatRef1.orderByChild("viewed").equalTo(false).on('value', snapshot => {
				jsonTemp=snapshot.val();
				chatRef1.off();
				//console.log("ddimension exacta",Object.keys(jsonTemp).length);
			});
			try{
				Object.keys(jsonTemp).map(idMessage=>{
					let chatRef2 = fire.database().ref('bussines').child(this.state.id_bussines).child("chat").child(id).child("messages").child(idMessage);
					chatRef2.update({
						viewed:true
					});
				});
			}catch(e){}
		}catch(e){}
	}



	//fin de actualizar datos




	loadChatContact=(idu)=>{
		if(idu!=''){
			document.getElementById('loader').className="show";

			this.state.inputSendState=true;


			var id = document.getElementById('id_user').value;
			//var objTemp;
			let chatRef = fire.database().ref('bussines').child(id+'/chat/'+idu+'/messages').limitToLast(this.state.numberOfMessage);
			chatRef.on('value', snapshot => {
				var objTemp=[];
			  	Object.keys(snapshot.val()||{}).map(ida=>{
		  			var objTempMessage=snapshot.val()[ida];
		  			var codeObject={
		  				code:ida,myId:this.state.id_bussines,
		  				yourId:idu
		  			};
		  			var obj = Object.assign(objTempMessage,codeObject);
		  			objTemp.push(obj);
			    });
			  	if(this.id_contactVar==idu){
			    	this.setState({chatContact:objTemp});
			    	document.getElementById('contentViewMessage').scrollTop=document.getElementById('contentViewMessage').scrollHeight;
			    
			    	var audioElement = document.createElement('audio');
			    	audioElement.setAttribute('src', '../../assets/audio/MessageNonzerobot.mp3');
			   		audioElement.play();
					document.getElementById('loader').className="hidden";	
				}
			});
			//document.getElementById('contentViewMessage').scrollTop=document.getElementById('contentViewMessage').scrollHeight;
		}
	}



	sendMessage=(message)=>{
		if(message!=""){
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
	 		 	viewed:true
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
			document.getElementById('inputSendMessage').value="";

		}
	}



	actualizarDatos = (d) => {
		let infoRef=fire.database().ref('bussines').child(this.state.id_contact).child("chat").child(this.state.id_bussines).child('info/name_description');
			infoRef.update({
 			name_bussines:this.state.name_bussines||"",
 	 		img_url:this.state.img_url||"",
 	 		description:this.state.description||""
		});
	}

	//evento ke carga los mensajes de 30 en 30

	scrollLoadMessage=()=>{
		if(document.getElementById('contentViewMessage').scrollTop==0){
			// console.log("funciona bien este scroll :v");
			document.getElementById('loader').className="show";
			var scrollHeightPrev=document.getElementById('contentViewMessage').scrollHeight;	



					this.state.numberOfMessage+=10;
					var id = document.getElementById('id_user').value;



					let chatRef = fire.database().ref('bussines').child(id+'/chat/'+this.state.id_contact+'/messages').limitToLast(this.state.numberOfMessage);
					chatRef.on('value', snapshot => {
						//document.getElementById('loader').className="show";
						
						var objTemp=[];
					  	Object.keys(snapshot.val()||{}).map(ida=>{
				  			objTemp.push(snapshot.val()[ida])
					    });



					    this.setState({chatContact:objTemp});

	    			  	var scrollNewPosition= document.getElementById('contentViewMessage').scrollHeight - scrollHeightPrev;
					    
					    if(this.state.numberOfMessage<=Object.keys(objTemp).length){
							document.getElementById('contentViewMessage').style.overflowY="hidden";

					    	document.getElementById('contentViewMessage').scrollTop=scrollNewPosition;

					    	document.getElementById('contentViewMessage').style.overflowY="scroll";
					    	console.log("entro aki xD heigt anterior "+document.getElementById('contentViewMessage').scrollHeight+" nuevoHeigth :"+scrollHeightPrev);
					    }
					 	document.getElementById('loader').className="hidden";
					 	//console.log("termino de ejecutarsse el scroll");
					 	chatRef.off();
					});

		}
	}





	render(){
		return(
			<div className="container-fluid Goochat" style={{"height":"100%","margin":"0","width":"100%"}}>
				<div className="row">
					<div id="chatMessage" className="col-sm-12 col-md-9 col-lg-9" style={ {"overflowX":"hidden","overflowY":"hidden","height":"100vh","background":"url(./assets/images/background-inicio.png)","backgroundSize":"100% 100%","backgroundRepeat":"no-repeat"}}>

						<div style={{"zIndex": "1000","width":"100%","position":"absolute","left": "0px","top": "0px","background": "#ededed","color": "gray","textAlign":"left","paddingLeft":"3%","fontSize":"10px"}}>
							<Info backMenu={this.backMenu} infoContact={this.state.infoContact}/>
						</div>
						<div onScroll={this.scrollLoadMessage} id="contentViewMessage" style={{"paddingRight":"20px","paddingLeft": "20px","paddingBottom":"100px","overflowY":"auto","width": "100%", "height": "100vh" ,"background":"url(./assets/images/goo-logo.svg)","backgroundSize": "250px","backgroundRepeat": "no-repeat","backgroundPosition": "center"}}>
							<div id="loader" className="hidden"  style={{"position":"absolute","zIndex":"10","width":"100%","left":"0px","background":"linear-gradient(#00000057,rgba(255, 255, 255, 0))"}}>
								<Loader size="0"></Loader>
							</div>
							<ViewMessage inputSendState={this.state.inputSendState} contentViewMessage={document.getElementById('contentViewMessage')} sendMessage={this.sendMessage} chatContact={this.state.chatContact} myID={this.state.id_bussines}/>
						</div>

					</div>

					<div style={{"position":"fixed","top":"200px"}}>
						<input type="text" id="id_user" ></input>
						<button onClick={this.eventosFire}>entrar</button>
					</div>

					 <div id="goochat-menu" className="col-sm-12 col-md-3 col-lg-3 goochat-content-list">
					 	<div className="row">
						 	<div className="col-md-12" style={{"paddingRight":"0px","paddingLeft": "0px"}}>
								<Bussines {...this.state}/>
						 	</div>
						 	<div className="col-md-12 Info-menu">
								<h3 id="goochat-menu-info">Mis circulos empresariales.</h3>
						 	</div>
						 	<div className="col-md-12" id="goochat-contact" style={{"width":"100%"}}>

						 		<div id="menu" className="hidden"  style={{"position":"absolute","zIndex":"10","width":"100%","left":"0px"}}>
									<Loader size="1"></Loader>
								</div>

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
