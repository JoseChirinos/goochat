// Dependences
import React, { Component } from 'react';
import './card-message.css';
import moment from 'moment';
import fire from './../../config-chat/firebase-config';

class Card extends Component{
	state={
		online:false,
		img:''
	}

	componentWillMount(){
		this.contactOnLinePrueba(this.props.userInfo.id);
		this.urlImgUserItem(this.props.userInfo.id);
	}

	urlImgUserItem=(id)=>{
		let imgRef = fire.database().ref('bussines').child(id).child("info_bussines");
		var urlImg="";
		imgRef.on('value', snapshot => {
			urlImg=snapshot.val().img_url;
			this.setState({img:urlImg});
		});
	}

	contactOnLinePrueba=(id)=>{
		var online=false;
		let refOnlineUser=fire.database().ref('bussines').child(id);
		refOnlineUser.on('value',snapshot=>{
			//console.log("id del user "+snapshot.val().info_bussines.name_bussines+" "+snapshot.val().info_bussines.online);
			if(snapshot.val().info_bussines.online){
				this.setState({online:true});
			}else{
				this.setState({online:false});
			}
		});
	}

	render(){
		const {userInfo}=this.props;
		
		//var online=this.props.contactOnLinePrueba(userInfo.id);

		//console.log("probando.....",this.props);



		if(userInfo.latest_message.date!=null){
			var date=new Date(userInfo.latest_message.date);
			var mes=(date.getMonth()+1)<10?"0"+(date.getMonth()+1):(date.getMonth()+1);
			var dia=date.getDate()<10?"0"+date.getDate():date.getDate();
			var fecha=moment().format(mes+' Do '+date.getFullYear()+' - '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds());
		
			var obj={
			id:userInfo.id,
			img_url:this.state.img||'',
			name_bussines:userInfo.name_description.name_bussines,
			url_page:userInfo.name_description.url_page
			}
		}else{
			var fecha="aqui el error";
			var obj={
				id:"",
				img_url:""||'',
				name_bussines:"",
				url_page:"no tiene.com"
			}
		}
	
		return(
				<div className="card-container">
					<div className="row">
						<div className="col-xs-3 col-sm-3 col-md-3 card-containerImg">
							<img className="card-img" src={this.state.img||""}></img>






                            <div className={this.state.online?"circle-active":"circle"} style={{"position":"relative","marginTop": "-19px","marginLeft": "8px"}}></div>










						</div>
						<div className="col-xs-7 col-sm-7 col-md-7" onClick={()=>this.props.showInfoContact(obj)} style={{"height": "100px","cursor":"pointer","paddingRight": "30px"}}>
							<div className="row">
								<div className="col-md-12">
									<h3 className="truncado">{userInfo.name_description.name_bussines||""}</h3>
								</div>
								<div className="col-md-12">
									<p className="card-p truncado-p">{userInfo.latest_message.message||""}</p>
								</div>
								<div className="col-md-12">
								<p className="card-fecha">{fecha}</p>
									
								</div>
							</div>
						</div>
						<div className="col-xs-2 col-sm-2 col-md-2 card-navigation">
							<div className={userInfo.unread_messages==0 || userInfo.unread_messages==null?"unreadMessages hidden":"unreadMessages"}>
								{userInfo.unread_messages}
							</div>
							<a href={this.props.userInfo.name_description.url_page}>
							<span className="icon-link"/>				
							</a>
						</div>
					</div>
				</div>
		);
	}
}

export default Card;