// Dependences
import React, { Component } from 'react';
import fire from './../../config-chat/firebase-config';
// Modules
import Info from './../../chat/components/info';
import ViewMessage from './../../chat/components/view-message';
import Loader from './loader'
// modules navigation
import Bussines from './../../business/components/bussines';
import ListChat from './../../navigation/components/list-chat';
import ListSearch from './../../navigation/components/list-search';
import Menu from './../../navigation/components/menu';
//style css

import ViewLoad from './../../chat/components/viewLoad';
import Config from './../../chat/components/config';


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
			listContact:false,
			chatList:true,
			search:false,
			request:false
		},
		runFire:{
			listContact:false,
			chatList:true,
			search:false,
			request:false
		},
		chatListUser:{},
		numberOfMessage:10,
		inputSendState:false,
		viewMessageSwitch:true,
		countRequest:0,
		countMessage:0,
		loadMessageState:false,
		loadSoundState:false,
		loadInfoState:false,



		notificationInfo:false

	}

	loadListChat=(e)=>{
		let chatRef = fire.database().ref('bussines/'+this.state.id_bussines).child('chat');
		chatRef.on('value', snapshot => {
			this.setState({chatListUser: snapshot.val()});
		});
	}

	eventoFromMenu = (select) =>{
		var menu = {};
		document.getElementById('square').className="icon-message-square evento";
		document.getElementById('search').className="icon-search evento";
		var nameKeys = Object.keys(this.state.menu);
		nameKeys.forEach( (i,index)=>{
			if(index == select){
				menu[i] = true;
				if(select==1){
					document.getElementById('square').className="icon-message-square evento item-selected"||console.log("error");
					document.getElementById('goochat-menu-info').innerHTML="Lista de conversaciones.";
				}else if(select==2){
					document.getElementById('search').className="icon-search evento item-selected"||console.log("error");
					document.getElementById('goochat-menu-info').innerHTML="Busqueda de empresas.";
				}
			}else{
				menu[i] = false;
			}
		})
		this.setState({
			menu:menu
		});
		this.viewState(menu);
	}





	eventosFire = () =>{
		var id = document.getElementById('id_user').value;
		this.Myid=id;
		this.countChatMessage(id);

	    let nameBussines = fire.database().ref('bussines/'+id).child('info_bussines');
	    nameBussines.on('value', snapshot => {
	    let obj = { myInfo: snapshot.val(), id: id };
	    	this.setState({ name_bussines:obj.myInfo.name_bussines,id_bussines:obj.id,img_url:obj.myInfo.img_url,online:obj.myInfo.online,description:obj.myInfo.description,url_page:obj.myInfo.url_page});
	    	this.viewState("men");
	    });

	    let devicesOnLine = fire.database().ref('bussines/'+id).child('info_bussines').child("devices_online");
	    devicesOnLine.once("value").then(snapshot=>{
			var devices=snapshot.val();
		    let onlineOnBussines = fire.database().ref('bussines/'+id).child('info_bussines');
				onlineOnBussines.update({
			    online:true,
			    devices_online:devices+1
			});
	    });

	    let bussinesNotification=fire.database().ref('bussines/'+id).child('info_bussines').child("notification");
	    bussinesNotification.on('value',snapshot=>{
	    	if(snapshot.val()!=null)
	    	this.setState({notificationInfo:snapshot.val()});
	    });

	}


	viewState=(men)=>{
		if(men!="men"){
			var runFire=this.state.runFire;
			var menu=men||this.state.menu;

			if(menu.search && !this.state.runFire.search){
		    	this.loadSearch("");
		    	runFire['search']=true;
			}

			this.setState({
				runFire:runFire
			});
		}else{
			this.loadLastChat();
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




	loadSearch=(e)=>{
		var idu =this.state.id_bussines;
		document.getElementById('menu').className="show";
		let searchRef = fire.database().ref('list_bussines').limitToLast(100);
		searchRef.on('value', snapshot => {
			document.getElementById('menu').className="show";
			var jsonTemp=[];
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
		var myId=this.Myid;
		let chatRef = fire.database().ref('bussines').child(myId+"").child("chat");
		chatRef.on('value', snapshot => {
			var lastChat=[];
			var jsonTemp=snapshot.val();
			var unreadMessages=0;
			Object.keys(jsonTemp||{}).map(id=>{
				var objInfo={
		 			id:id,
		 			latest_message:jsonTemp[id].info.latest_message||{date: 1516460733007,id_bussines: "sergio_id",img_url: "",message: "error"},
		 			name_description:jsonTemp[id].info.name_description||{img_url:"",description:"",url_page:""},
		 			unread_messages:unreadMessages
			 	}
				lastChat.push(objInfo);
			});

			lastChat.sort(function(a,b){
				if(new Date(a['latest_message'].date)>new Date(b['latest_message'].date)){
					return -1;
				}
				else if(new Date(a['latest_message'].date)<new Date(b['latest_message'].date)){
					return 1;
				}
				return 0;
			});

			this.setState({contactChat:lastChat});
			document.getElementById('menu').className="hidden";
		});
	}

	backMenu=()=>{
		document.getElementById("chatMessage").className="col-sm-12 col-md-9 col-lg-9 hide";
		document.getElementById("goochat-menu").className="col-sm-12 col-md-3 col-lg-3 goochat-content-list show";
	}



	showInfoContact=(obj)=>{
		this.id_contactVar=obj.id;
		this.updateViewed(obj.id);
		document.getElementById('contentViewMessage').style.background="";
		this.state.numberOfMessage=10;
		this.setState({infoContact:obj,id_contact:obj.id});
		this.loadChatContact(obj.id);
		this.lookOutChat(obj.id);

		document.getElementById("inputSendMessage").focus();
		if (window.matchMedia("(min-width:892px)").matches) {
  			document.getElementById("chatMessage").className="col-sm-12 col-md-9 col-lg-9 show";
			document.getElementById("goochat-menu").className="col-sm-12 col-md-3 col-lg-3 goochat-content-list show";
		} else {
			document.getElementById("chatMessage").className="col-sm-12 col-md-9 col-lg-9 show";
			document.getElementById("goochat-menu").className="col-sm-12 col-md-3 col-lg-3 goochat-content-list hide";
		}
	}
	updateViewed=(id)=>{
		try{
			let chatRef1 = fire.database().ref('bussines').child(this.state.id_bussines).child("chat").child(id).child("messages");
			chatRef1.orderByChild("viewed").equalTo(false).once('value').then(snapshot => {
				var jsonTemp=snapshot.val();
				try{
					var updates = {};
					Object.keys(jsonTemp).map(idMessage=>{
						updates['/bussines/'+this.state.id_bussines+'/chat/'+id+'/messages/'+idMessage+'/viewed']=true;
					});
					fire.database().ref().update(updates);
				}catch(e){}
			});
		}catch(e){}
	}

loadChatContact=(idu)=>{
	if(idu!=''){
		document.getElementById('loader').className="show";
		document.getElementById("inputSendMessage").focus();

		this.state.inputSendState=true;

		var id = this.Myid;
		let chatRef = fire.database().ref('bussines').child(id+'/chat/'+idu+'/messages').limitToLast(this.state.numberOfMessage);
		chatRef.on('value', snapshot => {
			if(this.id_contactVar!=idu){
				chatRef.off();
			}else{
				var objTemp=[];
			  	Object.keys(snapshot.val()||{}).map(ida=>{
		  			objTemp.push(Object.assign(snapshot.val()[ida],{code:ida,myId:this.state.id_bussines,yourId:idu}));
			    });

				this.setState({chatContact:objTemp});
				setTimeout(function(){
					document.getElementById('contentViewMessage').scrollTop=document.getElementById('contentViewMessage').scrollHeight;
				}.bind(this),100);
				document.getElementById('loader').className="hidden";
			}
		});
	}

}

lookOutChat=(idu)=>{
	if(idu!=''){
		var id = this.Myid;
		let chatRef = fire.database().ref('bussines').child(id+'/chat/'+idu+'/messages').limitToLast(this.state.numberOfMessage);
		chatRef.on('child_added', snapshot => {
		  	if(this.id_contactVar!=idu){
				chatRef.off();
				this.state.numberOfMessage=10;
			}else{
			  	if(this.id_contactVar==idu && document.getElementById('contentViewMessage').scrollTop!=0){
			  
					track.playS();

			   		// this.updateViewed(this.id_contactVar);
				}
				if(this.id_contactVar==idu){
					this.updateViewed(this.id_contactVar);	
				}
			}
		});
	}
}
sendMessage=(message)=>{
		var updates = {};
		if(this.Myid!=""){
			let saveMyDateRef= fire.database().ref('bussines').child(this.state.id_bussines).child("chat").child(this.state.id_contact).child('messages').push().getKey();
			let saveYourDateRef= fire.database().ref('bussines').child(this.state.id_contact).child("chat").child(this.state.id_bussines).child('messages').push().getKey();
			var a={date:this.dateFire(),name_bussines:this.state.name_bussines,id_bussines:this.state.id_bussines,img_url:this.state.img_url,message:message,viewed:true};
			var b={date:this.dateFire(),name_bussines:this.state.name_bussines,id_bussines:this.state.id_bussines,img_url:this.state.img_url,message:message,viewed:false};
			var c={name_bussines:this.state.name_bussines||"",img_url:this.state.img_url||"",description:this.state.description||"",url_page:this.state.url_page};
			var d={name_bussines:this.state.infoContact.name_bussines||"error",img_url:this.state.infoContact.img_url||"",description:this.state.infoContact.description||"error",url_page:this.state.infoContact.url_page||"error.com"};
			var e={date:this.dateFire(),id_bussines:this.state.id_bussines,message:message,url_page:this.state.url_page,img_url:this.state.img_url};
			var f={date:this.dateFire(),id_bussines:this.state.id_bussines,message:message,url_page:this.state.url_page,img_url:this.state.img_url};
			updates['/bussines/'+this.state.id_contact+'/chat/'+this.state.id_bussines+'/info/latest_message']=e;
			updates['/bussines/'+this.state.id_bussines+'/chat/'+this.state.id_contact+'/info/latest_message']=f;
			updates['/bussines/'+this.state.id_contact+'/chat/'+this.state.id_bussines+'/info/name_description']=c;
			updates['/bussines/'+this.state.id_bussines+'/chat/'+this.state.id_contact+'/info/name_description']=d;
			updates['/bussines/'+this.state.id_contact+'/chat/'+this.state.id_bussines+'/messages/'+saveMyDateRef]=b;
			updates['/bussines/'+this.state.id_bussines+'/chat/'+this.state.id_contact+'/messages/'+saveYourDateRef]=a;


			fire.database().ref().update(updates);
			document.getElementById('inputSendMessage').value="";


		}
	}







	componentDidMount(){
		//window.addEventListener("beforeunload", this.onUnload);
		this.id_contactVar='';
		this.scrollHeightPrev=0;
		this.Myid="";
		this.audioElement = document.createElement('audio');
		this.audioElement.setAttribute('src', '../../assets/audio/MessageNonzerobot.mp3');
					

		//para abrir el chat es necesario mandar el id del usuario a esta funcion
		//this.eventosFire(id);


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

		//funcion para guardar un usuario nuevo
		//this.saveNewUser(objJson);

		var objContact={
			id:"jose_id",
			img_url:"https://d30y9cdsu7xlg0.cloudfront.net/png/17241-200.png",
			name_bussines:"Jose Inc",
			url_page:"jose.com"
		}
		//funcion para abrir directamente el chat del otro usuario
		//this.showInfoContact(objContact);
	}



	countChatMessage=(ids)=>{
		let chatRef = fire.database().ref('bussines/'+ids).child("chat");
		chatRef.on('value', snapshot => {
			var countMessageVar=0;
			var jsonTemp=snapshot.val();
			Object.keys(jsonTemp||{}).map(id=>{
					let chatRef2=fire.database().ref('bussines').child(ids).child("chat").child(id).child("messages");
					chatRef2.orderByChild('viewed').equalTo(false).once('value').then(snapshot => {
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
			}.bind(this),200);
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
			    	
			    	track.playS();

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
				devices_online:obj.devices_online,
				notification:false
			}
		});
		this.saveNewUserList(obj);
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

	loadStart=()=>{
		if(!this.state.loadMessageState){
			this.setState({loadMessageState:true});
		}
	}
	loadSound=()=>{
		this.setState({loadSoundState:true});
	}
	infoLoad=()=>{
		if(!this.state.loadInfoState){
			this.setState({loadInfoState:true});
		}
	}

	showConfig=()=>{
		document.getElementById('config').className="show";
	}
	hideConfig=()=>{
		document.getElementById('config').className="hidden";
	}
	optionConfig=(option)=>{
		let bussinesNotification=fire.database().ref('bussines/'+this.Myid).child('info_bussines');
		if(option==1){
			bussinesNotification.update({notification:true});
		}else if(option==2){
			bussinesNotification.update({notification:false});
		}
	}


	closeSession=()=>{
		let onlineOfBussines = fire.database().ref('bussines').child(this.Myid).child('info_bussines');
	    onlineOfBussines.update({
	    	online:false
	    });
	 	history.back(1);
	}


	render(){
		return(
			<div className="container-fluid Goochat" style={{"height":"100%","margin":"0","width":"100%"}}>
				

				<div className={!this.state.loadMessageState || !this.state.loadInfoState?"show":"hidden"} style={{"position":"fixed","left":"0px","right":"0px","top":"0px","bottom":"0px","background":"url(./assets/images/background-inicio.png) 0% 0% / cover no-repeat"}}>
					<ViewLoad/>
					<div style={{"position":"fixed","bottom":"100px","zIndex":"1000"}}>
						<input type="text" id="id_user" ></input>
						<button onClick={this.eventosFire}>entrar</button>
					</div>
				</div>





				<div id="config" className="hidden" style={{"zIndex":"2000","position":"fixed","left":"0px","right":"0px","top":"0px","bottom":"0px","background":"rgba(0,0,0,0.3)"}}>
					<Config closeSession={this.closeSession} notificationInfo={this.state.notificationInfo} hideConfig={this.hideConfig} optionConfig={this.optionConfig}/>
				</div>

				<div className={this.state.loadMessageState && this.state.loadInfoState?"row show":"row hidden"}>
					<div id="chatMessage" className="col-sm-12 col-md-9 col-lg-9" style={ {"overflowX":"hidden","overflowY":"hidden","height":"100vh","background":"url(./assets/images/background-inicio.png)","backgroundSize":"cover","backgroundRepeat":"no-repeat"}}>

						<div id="infoItem" style={{"zIndex": "1000","width":"100%","position":"absolute","left": "0px","top": "0px","background": "#ededed","color": "gray","textAlign":"left","paddingLeft":"3%","fontSize":"10px"}}>
							<Info backMenu={this.backMenu} infoContact={this.state.infoContact}/>
						</div>
						<div onScroll={this.scrollLoadMessage} id="contentViewMessage" style={{"paddingRight":"20px","paddingLeft": "20px","overflowY":"auto","width": "100%", "height": "100vh" ,"background":"url(./assets/images/goo-logo.svg)","backgroundSize": "250px","backgroundRepeat": "no-repeat","backgroundPosition": "center"}}>
							<div id="loader" className="hidden"  style={{"position":"absolute","zIndex":"10","width":"100%","left":"0px","background":"linear-gradient(#00000057,rgba(255, 255, 255, 0))"}}>
								<Loader size="0"></Loader>
							</div>
							<ViewMessage myUrl_img={this.state.img_url} url_img={this.state.infoContact.img_url} inputSendState={this.state.inputSendState} sendMessage={this.sendMessage} chatContact={this.state.chatContact} myID={this.state.id_bussines}/>
						</div>

					</div>
					 <div id="goochat-menu" className="col-sm-12 col-md-3 col-lg-3 goochat-content-list">
					 	<div className="row">
						 	<div className="col-md-12" style={{"paddingRight":"0px","paddingLeft": "0px"}}>
								<Bussines showConfig={this.showConfig} infoLoad={this.infoLoad} {...this.state}/>
						 	</div>
						 	<div className="col-md-12 Info-menu">
								<h3 id="goochat-menu-info">Chat empresarial.</h3>
						 	</div>
						 	<div className="col-md-12" id="goochat-contact" style={{"width":"100%"}}>

						 		<div id="menu" className="hidden"  style={{"position":"absolute","zIndex":"10","width":"100%","left":"0px"}}>
									<Loader size="1"></Loader>
								</div>


								<div className={ this.state.menu.chatList ? 'show':'hidden' } id="goochat-chatlist" >
									<ListChat notificationInfo={this.state.notificationInfo} loadStart={this.loadStart} countMessageUnreadMinus={this.countMessageUnreadMinus} countMessageUnreadPlus={this.countMessageUnreadPlus} id_bussines={this.state.id_bussines} showInfoContact={this.showInfoContact} contactChat={this.state.contactChat}/>
								</div>

								<div className={this.state.menu.search ? 'show':'hidden' } id="goochat-search" >
									<ListSearch idBussines={this.state.id_bussines} showInfoContact={this.showInfoContact} contactSearch={this.state.contactSearch} contactSendRequest={this.sendRequest} search={this.loadSearch} contactRemoveRequest={this.removeRequest} awaitingRequests={this.state.awaitingRequests} listCircle={this.state.contactCircle}/>
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
