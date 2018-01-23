// Dependences
import React, { Component } from 'react';
import './card-message.css';
import moment from 'moment';
class Card extends Component{
	render(){
		const {userInfo}=this.props;
		var online=false;

		Object.keys(this.props.onlineContact).map(index=>{
			if(this.props.onlineContact[index].id_contact == this.props.userInfo.id){
				if(this.props.onlineContact[index].online){
					online=true;
				}else{
					online=false;
				}
			}
		});




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
	
		console.log("props de los mmensajes",this.props);
		return(
				<div className="card-container">
					<div className="row">
						<div className="col-xs-3 col-sm-3 col-md-3 card-containerImg">
							<img className="card-img" src={userInfo.name_description.img_url||"error"}></img>






                            <div className={online?"circle-active":"circle"} style={{"position":"relative","marginTop": "-19px","marginLeft": "8px"}}></div>










						</div>
						<div className="col-xs-7 col-sm-7 col-md-7" onClick={()=>this.props.showInfoContact(obj)} style={{"height": "100px","cursor":"pointer","paddingRight": "30px"}}>
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
						<div className="col-xs-2 col-sm-2 col-md-2 card-navigation">
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