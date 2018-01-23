// Dependences
import React, { Component } from 'react';
import Input from './input'
import Burble from './burble';
import './view-message.css'

class Message extends Component{



	render(){
		// this.props.contentViewMessage.scrollTop=this.props.contentViewMessage.scrollHeigth;
		return(
			<div>
				<br></br> <br></br>
				<br></br> <br></br>
				{
					Object.keys(this.props.chatContact||{}).map(index=>{
						if(this.props.chatContact[index].id_bussines!=this.props.myID){
							return (<Burble key={index} iz="0" obj={this.props.chatContact[index]}/>)
						}else{
							return(<Burble key={index} iz="1" obj={this.props.chatContact[index]}/>)			
						}
					})
				}		
				<div className={this.props.inputSendState?"show message-input":"hidden message-input"}>
					<Input sendMessage={this.props.sendMessage}/>
				</div>
			</div>
		)
	}
}

export default Message;