// Dependences
import React, { Component } from 'react';
import Card from './../../navigation/components/card';
import './list-contact.css';
class ListMessage extends Component{
	state = {
		contactUser:[]
	}
	componentWillReceiveProps(nextProps){		
		//console.log(nextProps);

		if(nextProps.contactCircle != null){
		     this.setState({contactUser: nextProps.contactCircle});
		} 
	}

	render(){
		return(
			<div className={ this.props.estado }>
				{
					Object.keys(this.state.contactUser).map( id =>{
						return (
							<div key={id}>
								<Card {...this.state.contactUser[id]} listNavigation="0"/>
								<br/>
							</div>
						)
					})
				}
			</div>
		)
	}
}

export default ListMessage;