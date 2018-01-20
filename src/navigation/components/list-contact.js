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
		}else{
		     this.setState({contactUser: []});
		}
	}

	render(){
		//console.log("listContact => ",this.props.contactDelete);
		return(
			<div className={ this.props.estado }>
				{
					Object.keys(this.state.contactUser).map( id =>{
						return (
							<div key={id}>
								<Card showInfoContact={this.props.showInfoContact} {...this.state.contactUser[id]} idBussines={id} listNavigation="0" contactDelete={this.props.contactDelete}/>
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