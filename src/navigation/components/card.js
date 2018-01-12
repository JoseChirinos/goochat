// Dependences
import React, { Component } from 'react';

class Card extends Component{
	


	render(){
		const {id_bussines}=this.props;
		const {name_bussines}=this.props;
		const {description_bussines}=this.props;
		const {urlView_bussines}=this.props;


		return(
			<h1>{id_bussines}</h1>
		)
	}
}

export default Card;