// Dependences
import React, { Component } from 'react';
import Input from './input'
import Burble from './burble';
import './view-message.css'

class Message extends Component{



	render(){
		var showInput=true;
		// if(this.props.contentViewMessage!=null){
		// 	console.log("tamano del scroll ",this.props.contentViewMessage.scrollHeight);
		// 	//this.props.contentViewMessage.scrollIntoView(false);
		// 	this.props.contentViewMessage.scrollTop=this.props.contentViewMessage.scrollHeight;
		// }
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
				<div className="message-input">
					{
						showInput?(<Input sendMessage={this.props.sendMessage}/>):""
					}
				</div>
			</div>
		)
	}
}

export default Message;