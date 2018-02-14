// Dependences
import React, { Component } from 'react';
import './ViewLoad.css'
import Loader from './loader'

class ViewLoad extends Component{


	componentWillReceiveProps(nextProps){
		
	}
	render(){
		var a=(
			<div >
				<div className="viewloaddiv">
					<Loader size="3"/> 
				</div>
			</div>
		);
		return a;
	}
}

export default ViewLoad;