// Dependences
import React, { Component } from 'react';
import '../components/info.css';
class Info extends Component{
	render(){
		//console.log("desde el info :",this.props.infoContact);
		return(
			<div className="row">
				<div className="col-md-1" style={{"paddingTop": "5px"}}>
					<img src={this.props.infoContact.img_url==null?"./assets/images/goo-logo.svg":this.props.infoContact.img_url} className="info-img"></img>
				</div>
				<div className="col-md-11">
					<h1 className="name">{this.props.infoContact.name_bussines==null?"Bienvenido.":this.props.infoContact.name_bussines}</h1>
				</div>
			</div>
		)
	}
}

export default Info;