// Dependences
import React, { Component } from 'react';
import CardMessage from './../../navigation/components/card-message';
import './list-chat.css';
import NullContact  from './../../navigation/components/nullContact';

class ListMessage extends Component{
	// onlineContact
	state={
		contactMessages:[]
	}
	componentWillReceiveProps(nextProps){		
		if(nextProps.contactChat != null){
		    this.setState({contactMessages: nextProps.contactChat});
			this.props.loadStart();
		} 
	}

	render(){
		var a=(
			<div className="content-chat">
				{
					Object.keys(this.state.contactMessages||{}).map( index =>{
						return (
								<div key={index}>
									<CardMessage notificationInfo={this.props.notificationInfo} id_bussines={this.props.id_bussines} showInfoContact={this.props.showInfoContact} userInfo={this.state.contactMessages[index]}/>
								<br/>
							</div>
						)
					})
					
				}
				<div className={this.state.contactMessages.length==0?"show":"hidden"}>
					<NullContact v={2} eventoFromMenu={this.props.eventoFromMenu}></NullContact>
				</div>
			</div>
		);

		return a;
	}
}

export default ListMessage;