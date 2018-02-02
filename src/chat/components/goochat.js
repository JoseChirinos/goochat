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
		url_page:'',
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
		countRequest:0,
		countMessage:0
	}

	loadListChat=(e)=>{
		let chatRef = fire.database().ref('bussines/'+this.state.id_bussines).child('chat');
		chatRef.on('value', snapshot => {
			this.setState({chatListUser: snapshot.val()});
		});
	}

	eventoFromMenu = (select) =>{	

		//this.scrollHeightPrev=document.getElementById('contentViewMessage').scrollHeight;
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
		this.countChatMessage(id);
		this.countRequest(id);
	    let nameBussines = fire.database().ref('bussines/'+id).child('info_bussines');
	    nameBussines.on('value', snapshot => {
	    let obj = { myInfo: snapshot.val(), id: id };
	    	this.setState({ name_bussines:obj.myInfo.name_bussines,id_bussines:obj.id,img_url:obj.myInfo.img_url,online:obj.myInfo.online,description:obj.myInfo.description,url_page:obj.myInfo.url_page});
	    });
	    this.viewState();

	    //codigo en linea

	    let devicesOnLine = fire.database().ref('bussines/'+id).child('info_bussines').child("devices_online");

	    devicesOnLine.once("value").then(snapshot=>{
			var devices=snapshot.val();
	    	// devicesOnLine.off();

	    	//console.log(snapshot.val());
		    let onlineOnBussines = fire.database().ref('bussines/'+id).child('info_bussines');
				onlineOnBussines.update({
			    online:true,
			    devices_online:devices+1
			});
	    });

	 //    setTimeout(function(){
	 //    	let onlineOnBussines = fire.database().ref('bussines/'+id).child('info_bussines');
		// 	onlineOnBussines.update({
		//     online:true,
		//     devices_online:devices+1
		// });
	 //    }.bind(),200);

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




	onUnload=()=>{

		let devicesOnLine = fire.database().ref('bussines').child(this.state.id_bussines).child('info_bussines').child("devices_online");
	    var devices=0;
	    devicesOnLine.once("value").then(snapshot=>{
	    	devices=snapshot.val();
			// devicesOnLine.off();
	    });
	    if(devices<=1){
	    	let onlineOfBussines = fire.database().ref('bussines').child(this.state.id_bussines).child('info_bussines');
		    onlineOfBussines.update({
		    	online:false,
		    	devices_online:0
		    });
		}else{	
			var de=devices-1;
			let onlineOfBussines = fire.database().ref('bussines').child(this.state.id_bussines).child('info_bussines');
		    onlineOfBussines.update({
		    	devices_online:de
		    });
		}
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
		let searchRef = fire.database().ref('list_bussines');
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

	
	
	loadLastChat=()=>{
		document.getElementById('menu').className="show";
		let chatRef = fire.database().ref('bussines').child(this.state.id_bussines).child("chat");
		chatRef.on('value', snapshot => {
			var lastChat=[];
			//console.log("probando codigo => ",snapshot.val());
			var jsonTemp=snapshot.val();
			var unreadMessages=10;
			Object.keys(jsonTemp||{}).map(id=>{
				var objInfo={
		 			id:id,
		 			latest_message:jsonTemp[id].info.latest_message||{date: 1516460733007,id_bussines: "sergio_id",img_url: "",message: "error"},
		 			name_description:jsonTemp[id].info.name_description||{img_url:"",description:"",url_page:""},
		 			unread_messages:unreadMessages
			 	}
				lastChat.push(objInfo);
			});

			//metodo que ordena los mensajes por orden de llegada de los mensajes
			lastChat.sort(function(a,b){
				if(new Date(a['latest_message'].date)>new Date(b['latest_message'].date)){
					return -1;
				}
				else if(new Date(a['latest_message'].date)<new Date(b['latest_message'].date)){
					return 1;
				}
				return 0;
			});

			//console.log("probando .... ",lastChat);
			//asigno los valores al contact chat
			this.setState({contactChat:lastChat});
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
 		"url_page":this.state.url_page,
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
 		 	url_page:this.state.url_page,
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
		this.id_contactVar=obj.id;
		this.updateViewed(obj.id);
		
		document.getElementById('contentViewMessage').style.background="";		

		if(this.sound!=null && this.sound!=[] && this.sound!=undefined){
			Object.keys(this.sound).map(id=>{
			if(this.sound[id].id==obj.id){
					this.sound[id].unread_messages=0;
				}
			});
		}
		
		this.state.numberOfMessage=10;
		this.setState({infoContact:obj});
		this.setState({id_contact:obj.id});
		this.loadChatContact(obj.id);
	
		document.getElementById("inputSendMessage").focus();
		//document.getElementById('contentViewMessage').scrollTop=document.getElementById('contentViewMessage').scrollHeigth;

		if (window.matchMedia("(min-width: 892px)").matches) {
  			document.getElementById("chatMessage").className="col-sm-12 col-md-9 col-lg-9 show";
			document.getElementById("goochat-menu").className="col-sm-12 col-md-3 col-lg-3 goochat-content-list show";
		} else {
			document.getElementById("chatMessage").className="col-sm-12 col-md-9 col-lg-9 show";
			document.getElementById("goochat-menu").className="col-sm-12 col-md-3 col-lg-3 goochat-content-list hide";
		}

	}

	updateViewed=(id)=>{
		try{
			var jsonTemp={};
			let chatRef1 = fire.database().ref('bussines').child(this.state.id_bussines).child("chat").child(id).child("messages");
			chatRef1.orderByChild("viewed").equalTo(false).once('value').then(snapshot => {
				jsonTemp=snapshot.val();
				try{
					var updates = {};					
					Object.keys(jsonTemp).map(idMessage=>{
						updates['/bussines/'+this.state.id_bussines+'/chat/'+id+'/messages/'+idMessage+'/viewed']=true;
					});	
					fire.database().ref().update(updates);
					console.log("datos actualizados");


				}catch(e){}
			});
		}catch(e){}
	}

	













































loadChatContact=(idu)=>{
	if(idu!=''){
		document.getElementById('loader').className="show";
		document.getElementById("inputSendMessage").focus();
		this.state.inputSendState=true;
		var id = document.getElementById('id_user').value;
		let chatRef = fire.database().ref('bussines').child(id+'/chat/'+idu+'/messages').limitToLast(this.state.numberOfMessage);
		chatRef.on('value', snapshot => {
			var objTemp=[];
		  	Object.keys(snapshot.val()||{}).map(ida=>{
	  			var objTempMessage=snapshot.val()[ida];
	  			var codeObject={
	  				code:ida,
	  				myId:this.state.id_bussines,
	  				yourId:idu
	  			};
	  			var obj = Object.assign(objTempMessage,codeObject);
	  			objTemp.push(obj);
		    });

		  	if(this.id_contactVar==idu && document.getElementById('contentViewMessage').scrollTop!=0){
		    	this.setState({chatContact:objTemp});
		    	var audioElement = document.createElement('audio');
		    	audioElement.setAttribute('src', '../../assets/audio/MessageNonzerobot.mp3');
		   		audioElement.play();
		   		this.updateViewed(this.id_contactVar);
			}
			if(this.id_contactVar==idu && document.getElementById('contentViewMessage').scrollTop==0){
				this.setState({chatContact:objTemp});
			}
			if(this.id_contactVar!=idu){
				this.state.numberOfMessage=10;
			}
			document.getElementById('loader').className="hidden";
			document.getElementById('contentViewMessage').scrollTop=document.getElementById('contentViewMessage').scrollHeight;
			
			setTimeout(function(){
				document.getElementById('contentViewMessage').scrollTop=document.getElementById('contentViewMessage').scrollHeight;
			}.bind(this),100);

		});
	}
}

















































//funcion que actualiza los mensajes no vistos




































	sendMessage=(message)=>{

		if(document.getElementById('inputSendMessage').value!=""){
			let infoRef=fire.database().ref('bussines').child(this.state.id_contact).child("chat").child(this.state.id_bussines).child('info/name_description');
				infoRef.update({
			 		name_bussines:this.state.name_bussines||"",
			 	 	img_url:this.state.img_url||"",
			 	 	description:this.state.description||"",
			 	 	url_page:this.state.url_page
			});
			let infoYourRef= fire.database().ref('bussines').child(this.state.id_bussines).child("chat").child(this.state.id_contact).child('info/name_description');
				infoYourRef.update({
		 		 	name_bussines:this.state.infoContact.name_bussines||"error",
		 		 	img_url:this.state.infoContact.img_url||"",
		 		 	description:this.state.infoContact.description||"error",
		 		 	url_page:this.state.infoContact.url_page||"error.com"
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
	 		 	url_page:this.state.url_page,
	 		 	img_url:this.state.img_url
			});

			let saveMyLatestMessageRef= fire.database().ref('bussines').child(this.state.id_bussines).child("chat").child(this.state.id_contact).child('info').child('latest_message');
			saveMyLatestMessageRef.update({
	 		 	date:this.dateFire(),
	 		 	id_bussines:this.state.id_bussines,
	 		 	message:message,
	 		 	url_page:this.state.url_page,
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
 	 		description:this.state.description||"",
 	 		url_page:this.state.url_page
		});
	}

	//este did mount fue movido aki para poder trabajarlo mejor
	componentDidMount(){
		window.addEventListener("beforeunload", this.onUnload);
		this.id_contactVar='';
		this.scrollHeightPrev=0;

		var objJson={
			id:"asdasddnajksnjd",
			country:"china",
			description:"hiroko saka moko",
			img_url:"https://d30y9cdsu7xlg0.cloudfront.net/png/17239-200.png",
			name_bussines:"shin fun han",
			url_page:"kunFu.com",
			region:"okinawa",
			devices_online: 0
		};

		//this.saveNewUser(objJson);
		this.saveNewUserList(objJson);
		this.sound=[];
	}









































	countChatMessage=(ids)=>{
		let chatRef = fire.database().ref('bussines/'+ids).child("chat");
		chatRef.on('value', snapshot => {	
			var countMessageVar=0;
			var jsonTemp=snapshot.val();
			Object.keys(jsonTemp||{}).map(id=>{
					let chatRef2=fire.database().ref('bussines').child(ids).child("chat").child(id).child("messages");
					chatRef2.orderByChild('viewed').equalTo(false).once('value').then(snapshot => {
						//console.log("probando code for goochat => => ",Object.keys(snapshot.val()||{}).length);
						var unreadMessages=Object.keys(snapshot.val()||{}).length;
						if(unreadMessages==null){
							unreadMessages=0;
						}
						if(unreadMessages!=0){
							countMessageVar++;
						}
					});
			});
			setTimeout(function(){
				this.setState({countMessage:countMessageVar});
			}.bind(this),300);
		});
	}



countRequest=(ids)=>{
	let requestRef = fire.database().ref('bussines/'+ids).child('bussines_circle');
	    requestRef.orderByChild('lagree').equalTo(false).on('value', snapshot => {
	    if(snapshot.val()!=null){	
	    	//console.log("prueba => ",Object.keys(snapshot.val()).length);	    	
			this.setState({countRequest:Object.keys(snapshot.val()).length});
	    }else{
	    	this.setState({countRequest:0});
	    }
	});
}

































	scrollLoadMessage=()=>{
		if(document.getElementById('contentViewMessage').scrollTop==0){
			this.scrollHeightPrev=document.getElementById('contentViewMessage').scrollHeight;
			this.state.numberOfMessage+=10;
			document.getElementById('loader').className="show";
			setTimeout(function(){
				let chatRef = fire.database().ref('bussines').child(this.state.id_bussines+'/chat/'+this.state.id_contact+'/messages').limitToLast(this.state.numberOfMessage);
				chatRef.once('value').then(snapshot => {
				var objTemp=[];
			  	Object.keys(snapshot.val()||{}).map(ida=>{
		  			var objTempMessage=snapshot.val()[ida];
		  			var codeObject={
		  				code:ida,
		  				myId:this.state.id_bussines,
		  				yourId:this.state.id_contact
		  			};
		  			var obj = Object.assign(objTempMessage,codeObject);
		  			objTemp.push(obj);
			    });
			  	if(this.id_contactVar==this.state.id_contact && document.getElementById('contentViewMessage').scrollTop!=0){
			    	this.setState({chatContact:objTemp});
			    	document.getElementById('contentViewMessage').scrollTop=document.getElementById('contentViewMessage').scrollHeight;
			    	var audioElement = document.createElement('audio');
			    	audioElement.setAttribute('src', '../../assets/audio/MessageNonzerobot.mp3');
			   		audioElement.play();
					document.getElementById('loader').className="hidden";
				}
				if(this.id_contactVar==this.state.id_contact && document.getElementById('contentViewMessage').scrollTop==0){
					this.setState({chatContact:objTemp});
					document.getElementById('contentViewMessage').scrollTop=(this.scrollHeightPrev-document.getElementById('contentViewMessage').scrollHeight)*-1;

				}
				if(this.id_contactVar!=this.state.id_contact){
					this.state.numberOfMessage=10;
				}
				document.getElementById('loader').className="hidden";
				//chatRef.off();
			});
			}.bind(this),200);

		}
	}
























updateCountRequest=(cant)=>{
	
}












	//sta es la funcion que guardara y actualizara los datos del usuario
	saveNewUser=(obj)=>{
		let refNewUser=fire.database().ref('bussines').child(obj.id+"");
		refNewUser.update({
			info_bussines:{
				country:obj.country,
				description:obj.description,
				img_url:obj.img_url,
				name_bussines:obj.name_bussines,
				url_page:obj.url_page,
				region:obj.region,
				devices_online:obj.devices_online
			}
		});
	}



	saveNewUserList=(obj)=>{
		let refNewUser=fire.database().ref('list_bussines').child(obj.id);
		refNewUser.update({
			info_bussines:{
				country:obj.country,
				description:obj.description,
				img_url:obj.img_url,
				name_bussines:obj.name_bussines,
				url_page:obj.url_page,
				region:obj.region
			}
		});
	}
	



	
	render(){
		return(
			<div className="container-fluid Goochat" style={{"height":"100%","margin":"0","width":"100%"}}>
				<div className="row">
					<div id="chatMessage" className="col-sm-12 col-md-9 col-lg-9" style={ {"overflowX":"hidden","overflowY":"hidden","height":"100vh","background":"url(./assets/images/background-inicio.png)","backgroundSize":"cover","backgroundRepeat":"no-repeat"}}>

						<div style={{"zIndex": "1000","width":"100%","position":"absolute","left": "0px","top": "0px","background": "#ededed","color": "gray","textAlign":"left","paddingLeft":"3%","fontSize":"10px"}}>
							<Info backMenu={this.backMenu} infoContact={this.state.infoContact}/>
						</div>
						<div onScroll={this.scrollLoadMessage} id="contentViewMessage" style={{"paddingRight":"20px","paddingLeft": "20px","paddingBottom":"100px","overflowY":"auto","width": "100%", "height": "100vh" ,"background":"url(./assets/images/goo-logo.svg)","backgroundSize": "250px","backgroundRepeat": "no-repeat","backgroundPosition": "center"}}>
							<div id="loader" className="hidden"  style={{"position":"absolute","zIndex":"10","width":"100%","left":"0px","background":"linear-gradient(#00000057,rgba(255, 255, 255, 0))"}}>
								<Loader size="0"></Loader>
							</div>
							<ViewMessage myUrl_img={this.state.img_url} url_img={this.state.infoContact.img_url} inputSendState={this.state.inputSendState} sendMessage={this.sendMessage} chatContact={this.state.chatContact} myID={this.state.id_bussines}/>
						</div>

					</div>

					<div style={{"position":"fixed","bottom":"100px","zIndex":"1000"}}>
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

								<ListContact eventoFromMenu={this.eventoFromMenu} showInfoContact={this.showInfoContact} estado={ this.state.menu.listContact ? 'show':'hidden' } contactCircle={this.state.contactCircle} contactDelete={this.deleteItemCircle}/>

								<div className={ this.state.menu.chatList ? 'show':'hidden' } id="goochat-chatlist" >
									<ListChat countMessageUnreadMinus={this.countMessageUnreadMinus} countMessageUnreadPlus={this.countMessageUnreadPlus} id_bussines={this.state.id_bussines} showInfoContact={this.showInfoContact} contactChat={this.state.contactChat}/>
								</div>

								<div className={this.state.menu.search ? 'show':'hidden' } id="goochat-search" >
									<ListSearch showInfoContact={this.showInfoContact} contactSearch={this.state.contactSearch} contactSendRequest={this.sendRequest} search={this.loadSearch} contactRemoveRequest={this.removeRequest} awaitingRequests={this.state.awaitingRequests} listCircle={this.state.contactCircle}/>
								</div>
								<div className={this.state.menu.request ? 'show':'hidden' } id="goochat-request" >
									<ListRequest showInfoContact={this.showInfoContact} contactRequest={this.state.contactRequest} acceptRequest={this.acceptRequest} rejectRequest={this.rejectRequest}/>
								</div>

						 	</div>
						 	<div className="col-md-12" style={{"position":"absolute","bottom":"0px","width":"100%","paddingRight":"0px","paddingLeft": "0px"}}>
								<Menu countMessage={this.state.countMessage} countRequest={this.state.countRequest} eventoPrueba={ this.eventoFromMenu }/>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Goochat;
