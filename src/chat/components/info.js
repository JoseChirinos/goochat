// Dependences
import React, { Component } from 'react';
import '../components/info.css';
class Info extends Component{
	render(){
		//console.log("desde el info :",this.props.infoContact);
		return(
			<div className="row">
				<div className={window.matchMedia("(min-width: 892px)").matches?"hidden col-xs-1 col-sm-1 col-md-1":"show col-xs-1 col-sm-1 col-md-1"}>	
    				<span onClick={()=>{this.props.backMenu()}} className="icon-chevron-left" style={{"cursor":"pointer","fontSize":"50px","marginLeft":"-15px","color":"#aeaeae"}}>
   				 	</span>
   				 </div>
				<div className="col-xs-2 col-sm-2 col-md-2" style={{"paddingTop": "5px"}}>
					<img src={this.props.infoContact.img_url==null?"./assets/images/goo-logo.svg":this.props.infoContact.img_url} className="info-img"></img>
				</div>
				<div className="col-xs-9 col-sm-9 col-md-9">
					<h1 className="name">{this.props.infoContact.name_bussines==null?"Bienvenido.":this.props.infoContact.name_bussines}</h1>
				</div>
			</div>
		)
	}
}

export default Info;