// Dependences
import React, { Component } from 'react';
import Input from './input'
import Burble from './burble';
import moment from 'moment';
import './view-message.css'


class Message extends Component{


	componentWillReceiveProps(nextProps){
		if(nextProps!=null){
			setTimeout(function(){
				if(document.getElementById("search-input").value==""){
					document.getElementById("inputSendMessage").focus();
				}
			
			}.bind(this),300);
		}
	}




	render(){
		var f="";
		var a=(
			<div className="row" style={{"marginBottom":"100px"}}>
				<br></br> <br></br>
				<br></br> <br></br>			

				{
					Object.keys(this.props.chatContact||{}).map(index=>{
						
						var date1=new Date(f);
						var mes1=(date1.getMonth()+1)<10?"0"+(date1.getMonth()+1):(date1.getMonth()+1);
						var dia1=date1.getDate()<10?"0"+date1.getDate():date1.getDate();
						var fecha1=dia1+" - "+mes1+' - '+date1.getFullYear();
					


						var date=new Date(this.props.chatContact[index].date);
						var mes=(date.getMonth()+1)<10?"0"+(date.getMonth()+1):(date.getMonth()+1);
						var dia=date.getDate()<10?"0"+date.getDate():date.getDate();
						var fecha=dia+" - "+mes+' - '+date.getFullYear();
					
			
						if(fecha1!=fecha){
							f=this.props.chatContact[index].date;
						}

						if(this.props.chatContact[index].id_bussines!=this.props.myID){
							return (
								<div key={index}>
									{fecha!=fecha1?(
										<div className="col-xs-12 col-sm-12 col-md-12 date">
											<h3 className="viewMessageH3">{fecha}</h3>
										</div>
										):""
									}
									<Burble url_img={this.props.url_img} iz="0" obj={this.props.chatContact[index]}/>
								</div>
							)
						}else{
							return(
								<div key={index}>
									{fecha!=fecha1?(
										<div className="col-xs-12 col-sm-12 col-md-12 date">
											<h3 className="viewMessageH3">{fecha}</h3>
										</div>
										):""
									}
									<Burble myUrl_img={this.props.myUrl_img} url_img={this.props.url_img} iz="1" obj={this.props.chatContact[index]}/>
								</div>
							)			
						}
					})
				}	
				
				<div className={this.props.inputSendState?"show message-input":"hidden message-input"}>
					<Input focus="true" sendMessage={this.props.sendMessage}/>
				</div>
			</div>
		);
		return a;
	}
}

export default Message;