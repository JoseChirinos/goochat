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
				<div className="col-xs-12 col-sm-12 col-md-12" style={{"width":"100%"}}>
					<div className="msj macro">
						<div className="avatar">
							<img className="img-circle" style={{"width": "100px","position": "absolute","top": "7px","left": "20px"}} src={this.props.obj.img_url}/>
						</div>
						<div className="text text-l">
							<p style={{"color":"#475566","fontSize":"16px","fontFamily": "Roboto"}}>{this.props.obj.message}</p>
							<p><small style={{"fontSize":"13px"}}>{hora}</small></p>
						</div>
					</div>
				</div>
				):
			(
				<div className="col-xs-12 col-sm-12 col-md-12" style={{"width":"100%"}}>
					<div className="msj-rta macro">
						<div className="text text-r">
							<p style={{"color":"#475566","fontSize":"16px","fontFamily": "Roboto"}}>{this.props.obj.message}</p>
							<p><small style={{"fontSize":"13px"}}>{hora}</small></p>
						</div>
						<div className="avatar" style={{"padding":"0px 0px 0px 10px !important"}}>
							<img className="img-circle" style={{"width": "100px","position": "absolute","top": "7px","right": "20px"}} src={this.props.obj.img_url}/>
						</div>
					</div>
				</div>
			)

		)
	}
}

export default Burble;