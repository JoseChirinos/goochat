// Dependences
import React, { Component } from 'react';
import './ViewLoad.css'
import Loader from './loader'

class ViewLoad extends Component{


	componentWillReceiveProps(nextProps){
		
	}
	render(){
		var a=(
			<div style={{"background":"url()"}}>
				<div style={{"position":"fixed","left":"0px","right":"0px","top":"30%","textAlign":"center"}}>
					<Loader size="3"/> 
				</div>
			</div>
		);
		return a;
	}
}

export default ViewLoad;