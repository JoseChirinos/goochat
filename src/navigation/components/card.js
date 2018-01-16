// Dependences
import React, { Component } from 'react';
import './card.css';
class Card extends Component{
	


	render(){
		const {name_bussines,img_url,description,listNavigation}=this.props;


		return(
			<div className="card-container">
				<div className="row">
					<div className="col-md-3 card-containerImg">
						<img className="card-img" src={img_url}></img>
					</div>
					<div className="col-md-4">
						<div className="row">
							<div className="col-md-12">
								<h3 className="truncado">{name_bussines}</h3>
							</div>
							<div className="col-md-12">
								<p className="card-p truncado-p">{description}</p>
							</div>
						</div>
					</div>
					<div className="col-md-3 card-delete">
						<span className={listNavigation==0 ? "icon-user-minus" :listNavigation==1 ? "icon-plus":"icon-plus"}/>
					</div>
					<div className="col-md-2 card-navigation">
						<span className={listNavigation==0 ? "icon-navigation" :listNavigation==1 ? "icon-navigation":"icon-minus"}/>
					</div>
				</div>
			</div>
		)
	}
}

export default Card;