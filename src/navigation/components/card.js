// Dependences
import React, { Component } from 'react';

class Card extends Component{
	


	render(){
		const {name_bussines,img_url,description}=this.props;


		return(
			<div style={{"border":"1px solid black"}}>
				<div className="row">
					<div className="col-md-3">
						<img style={{"height":"70px","border-radius":"50% 50%"}} src={img_url}></img>
					</div>
					<div className="col-md-9">
						<div className="row">
							<div className="col-md-12">
								<h5>{name_bussines}</h5>
							</div>
							<div className="col-md-12">
								<h6>{description}</h6>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Card;