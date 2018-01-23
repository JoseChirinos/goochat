// Dependences
import React, { Component } from 'react';
import './burble.css';
import fire from './../../config-chat/firebase-config';

class Burble extends Component{
	render(){
		// try{

		// 	let updateViewRef= fire.database().ref('bussines').child(this.props.obj.myId).child("chat").child(this.props.obj.yourId).child("messages").child(this.props.obj.code);
		// 	updateViewRef.update({
 	//  		"viewed": true
		// 	});
		// }catch(e){}

		// console.log("Burbble id",this.props.obj.myId);

		// console.log("Burbble your id",this.props.obj.yourId);

		// console.log("Burbble code",this.props.obj.code);



		var h=new Date(this.props.obj.date);
		var hora=h.getHours()+":"+h.getMinutes();
		return(
			this.props.iz==0?(
			<div className="burble-container">
				<div className="row burbble">
					<div className="col-md-3 imgLogo">
						<img src={this.props.obj.img_url} alt=""/>
					</div>
					<div className="col-md-9">
						<div className="row">
							<div className="col-md-12" style={{"color":"#64b0bd"}}>{this.props.obj.name_bussines}</div>
							<div className="col-md-12">
								<p>{this.props.obj.message}</p>
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-12 dateInfo">
					{hora}
				</div>
			</div>
			):(
			<div className="burble-container rigth">
				<div className="row burbble rigth-burbble">
					<div className="col-md-9">
						<div className="row">
							<div className="col-md-12" style={{"color":"#64b0bd"}}>{this.props.obj.name_bussines}</div>
							<div className="col-md-12">
								<p>{this.props.obj.message}</p>
							</div>
						</div>
					</div>
					<div className="col-md-3 imgLogo">
						<img src={this.props.obj.img_url} alt=""/>
					</div>
					<div className="col-md-12 dateInfo rigth-dat">
						{hora}
					</div>
				</div>
			</div>
			)

		)
	}
}

export default Burble;