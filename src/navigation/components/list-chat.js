// Dependences
import React, { Component } from 'react';
import CardMessage from './../../navigation/components/card-message';
import './list-chat.css';
class ListMessage extends Component{
	state={
		contactMessages:[]
	}
	componentWillReceiveProps(nextProps){		
		if(nextProps.contactChat != null){
		     this.setState({contactMessages: nextProps.contactChat});
		} 
	}
	render(){
		console.log("mostrando los datos desde el lisMessage",this.state.contactMessages);

		
		return(
			<div className="content-chat">
				{
					Object.keys(this.state.contactMessages||{}).map( index =>{
						return (
								<div key={index}>
									<CardMessage userInfo={this.state.contactMessages[index]}/>
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