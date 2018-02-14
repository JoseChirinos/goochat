// Dependences
import React, { Component } from 'react';
import '../components/info.css';

import fire from './../../config-chat/firebase-config';
class Info extends Component{
	
	state={
		online:false
	}


	componentWillReceiveProps(nextProps){		
		if(nextProps.infoContact.id != null){
			this.contactOnLinePrueba(nextProps.infoContact.id);
		} 
	}





	contactOnLinePrueba=(id)=>{
		var online=false;
		let refOnlineUser=fire.database().ref('bussines').child(id).child("info_bussines").child("online");
		refOnlineUser.on('value',snapshot=>{
			if(snapshot.val()){
				this.setState({online:true});
			}else{
				this.setState({online:false});
			}
		});
	}

	render(){
		return(
			<div className="row">
				<div className={window.matchMedia("(min-width: 993px)").matches?"hidden col-xs-1 col-sm-1 col-md-1":"show col-xs-1 col-sm-1 col-md-1"}>	
    				<span onClick={()=>{this.props.backMenu()}} className="icon-chevron-left infospan">
   				 	</span>
   				 </div>
				<div className="col-xs-2 col-sm-2 col-md-2 infocontainerdiv">
					<img src={this.props.infoContact.img_url==null?"./assets/images/goo-logo.svg":this.props.infoContact.img_url} className="info-img"></img>
				</div>
				<div className="col-xs-9 col-sm-9 col-md-9">
					<h1 className="name">
						{this.props.infoContact.name_bussines==null?"Bienvenido.":this.props.infoContact.name_bussines}

					<label className={this.props.infoContact.name_bussines==null?'hidden infoLabel':'show infoLabel'}>
						<span className={this.state.online?"online icon-disc":"onlineOf icon-circle"} >
						</span>
						{
							this.state.online?"(En linea)":"(Desconectado)"
						}
					</label>


					</h1>
				</div>
			</div>
		)
	}
}

export default Info;