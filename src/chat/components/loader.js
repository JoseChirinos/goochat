// Dependences
import React, { Component } from 'react';
import './loader.css';

class Loader extends Component{
	render(){
		return(<div className={this.props.size==0?'loader':this.props.size==1?'loaderp':'loaderl'}>Loading</div>);
	}
}
export default Loader;