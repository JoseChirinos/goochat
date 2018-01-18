// Dependences
import React, { Component } from 'react';
import Card from './../../navigation/components/card';
import './list-request.css';
class ListMessage extends Component{
	state = {
		contactUser:[]
	}
	componentWillReceiveProps(nextProps){		
		//console.log(nextProps);

		if(nextProps.contactRequest != null){
		     this.setState({contactUser: nextProps.contactRequest});
		}else{
			this.setState({
				contactUser:[]
			});		
		}
	}

	render(){
		return(
			<div className={ this.props.estado }>
				{
					Object.keys(this.state.contactUser).map( id =>{
						return (
							<div key={id}>
								<Card {...this.state.contactUser[id]} listNavigation="3"/>
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