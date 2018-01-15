// Dependences
import React, { Component } from 'react';
import './card.css';
class Card extends Component{
	


	render(){
		const {name_bussines,img_url,description}=this.props;


		return(
			<div className="card-container">
				<div className="row">
					<div className="col-md-3" style={{"paddingTop":"10px","paddingBootom":"10px"}}>
						<img style={{"height":"70px","borderRadius":"50% 50%"}} src={img_url}></img>
					</div>
					<div className="col-md-5">
						<div className="row">
							<div className="col-md-12">
								<h3 className="truncado">{name_bussines}</h3>
							</div>
							<div className="col-md-12">
								<p className="card-p">{description}</p>
							</div>
						</div>
					</div>
					<div className="col-md-2">
						<span>
							<i className=""></i>
						</span>
					</div>
					<div className="col-md-2">

					</div>
				</div>
			</div>
		)
	}
}

export default Card;