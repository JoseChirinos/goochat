// Dependences
import React, { Component } from 'react';
import './card-message.css';
import moment from 'moment';
class Card extends Component{
	render(){
		const {userInfo}=this.props;
		
		if(userInfo.latest_message.date!=null){
			var date=new Date(userInfo.latest_message.date);
			var mes=(date.getMonth()+1)<10?"0"+(date.getMonth()+1):(date.getMonth()+1);
			var dia=date.getDate()<10?"0"+date.getDate():date.getDate();
			var fecha=moment().format(mes+' Do '+date.getFullYear()+' - '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds());
		
			var obj={
			id:userInfo.id,
			img_url:userInfo.name_description.img_url||'',
			name_bussines:userInfo.name_description.name_bussines
			}
		}else{
			var fecha="aqui el error";
			var obj={
				id:"",
				img_url:""||'',
				name_bussines:""
			}
		}
	

		return(
				<div className="card-container">
					<div className="row">
						<div className="col-md-3 card-containerImg">
							<img className="card-img" src={userInfo.name_description.img_url||"error"}></img>
						</div>
						<div className="col-md-7" onClick={()=>this.props.showInfoContact(obj)} style={{"height": "100px","cursor":"pointer"}}>
							<div className="row">
								<div className="col-md-12">
									<h3 className="truncado">{userInfo.name_description.name_bussines||"error"}</h3>
								</div>
								<div className="col-md-12">
									<p className="card-p truncado-p">{userInfo.latest_message.message||"error"}</p>
								</div>
								<div className="col-md-12">
								<p className="card-fecha">{fecha}</p>
									
								</div>
							</div>
						</div>
						<div className="col-md-2 card-navigation">
							<div className={userInfo.unread_messages==0?"unreadMessages hidden":"unreadMessages"}>
								{userInfo.unread_messages}
							</div>
							<span className="icon-link"/>
				
						</div>
					</div>
				</div>
		);
	}
}

export default Card;