// Dependences
import React, { Component } from 'react';
import './loader.css';

class Loader extends Component{
	render(){
		return(<div className={this.props.size==0?'loader':'loaderp'}>Loading</div>);
	}
}
export default Loader;