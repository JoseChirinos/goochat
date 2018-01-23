// Dependences
import React, { Component } from 'react';
import './card.css';
class Card extends Component{
	


	render(){
		const {name_bussines,description,listNavigation,lagree,send}=this.props;
		console.log("card prueba card=> ",this.props);
		var obj={
			id:this.props.idBussines,
			description:description,
			name_bussines:name_bussines,
			img_url:this.props.img_url||''
		}
		//console.log("props del card ",listNavigation);

		//console.log("props del send ",send);
		//console.log("ver ",this.props.stateCircle);
		return(
				<div className="card-container">
					<div className="row">
						<div className="col-xs-3 col-sm-3 col-md-3 card-containerImg">
							<img className="card-img" src={this.props.img_url||''}></img>
						</div>
						<div className="col-xs-4 col-sm-4 col-md-4 card-containerName" onClick={()=>this.props.showInfoContact(obj)}>
							<div className="row" >
								<div className="col-md-12">
									<h3 className="truncado">{name_bussines}</h3>
								</div>
								<div className="col-md-12">
									<p className={ send==1?"card-p truncado-p sendRequest":"card-p truncado-p"}>
									{ send==1?"Solicitud enviada":description}</p>

								</div>
							</div>
						</div>
						<div className="col-xs-3 col-sm-3 col-md-3 card-delete">
							<span className={
								listNavigation==0 ?
								 "icon-user-minus" :
								 listNavigation==1 && send==0 ?
							      !this.props.stateCircle?
								  "icon-user-plus":"":
								  listNavigation==1 && send==1?
								  "icon-x":"icon-x"
								} onClick={
									listNavigation==0?
									()=>this.props.contactDelete(this.props.idBussines):
									listNavigation==1 && send==0?!this.props.stateCircle?
									()=>this.props.sendRequest(this.props.idBussines):function(){return 0}:
									listNavigation==1 && send==1 ?
									()=>this.props.removeRequest(this.props.idBussines):
									()=>this.props.rejectRequest(this.props.idBussines)}/>
						</div>
						<div className="col-xs-2 col-sm-2 col-md-2 card-navigation">
							<span className={listNavigation==0 ? "icon-link" :listNavigation==1 ? "icon-link":"icon-check"} onClick={listNavigation==3?()=>this.props.acceptRequest(this.props.idBussines):function(){return 0}}/>
						</div>
					</div>
				</div>
		)
	}
}

export default Card;