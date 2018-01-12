import React, { Component } from 'react';
import './bussines.css';

class Bussines extends Component{
	render(){
		const {nameBussines}=this.props;
		return(
			<div className="Bussines-container">
				<img className="Bussines-image" src="https://www.atomix.com.au/media/2015/06/atomix_user31.png"/>
				<h1>{nameBussines }</h1>
		    </div>
		)	
	}
}

export default Bussines;