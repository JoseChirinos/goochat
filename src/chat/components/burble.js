// Dependences
import React, { Component } from 'react';
import './burble.css';
import fire from './../../config-chat/firebase-config';

class Burble extends Component{
	
	render(){
		var h=new Date(this.props.obj.date);
		if(h.getMinutes()<10){
			var hora=h.getHours()+":0"+h.getMinutes();
		}else{
			var hora=h.getHours()+":"+h.getMinutes();
		}
		return(
			this.props.iz==0?(
				<div className="col-xs-12 col-sm-12 col-md-12 burbleContainer">
					<div className="msj macro">
						<div className="avatar">
							<img className="img-circle" src={this.props.url_img}/>
						</div>
						<div className="text text-l">
							<p className="burbleP" dangerouslySetInnerHTML={{__html:this.props.obj.message}}></p>
							<p><small className="burbleSmall">{hora}</small></p>
						</div>
					</div>
				</div>
				):
			(
				<div className="col-xs-12 col-sm-12 col-md-12 burbleContainer">
					<div className="msj-rta macro">
						<div className="text text-r">
							<p className="burbleP" id="burbleb" dangerouslySetInnerHTML={{__html:this.props.obj.message}}></p>
						
							<p><small className="burbleSmall">{hora}</small></p>
						</div>
						<div className="avatar avatar2">
							<img className="img-circle" src={this.props.myUrl_img}/>
						</div>
					</div>
				</div>
			)

		)
	}
}

export default Burble;
