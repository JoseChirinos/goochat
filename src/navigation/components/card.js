// Dependences
import React, { Component } from 'react';
import './card.css';
class Card extends Component{
	


	render(){
		const {name_bussines,img_url,description}=this.props;


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
								<span className="icon-arrow-up-right"></span>
							</div>
							<div className="col-md-12">
								<p className="card-p truncado-p">{description}</p>
							</div>
						</div>
					</div>
					<div className="col-md-3 card-delete">
						<span className="icon-user-minus"/>
					</div>
					<div className="col-md-2 card-navigation">
						<span className="icon-navigation"/>
					</div>
				</div>
			</div>
		)
	}
}

export default Card;