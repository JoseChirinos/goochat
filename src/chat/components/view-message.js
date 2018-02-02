// Dependences
import React, { Component } from 'react';
import Input from './input'
import Burble from './burble';
import moment from 'moment';
import './view-message.css'


class Message extends Component{


	// componentDidMount(){
	//    document.getElementById('contentViewMessage').scrollTop=document.getElementById('contentViewMessage').scrollHeight;
	// }


	componentWillReceiveProps(nextProps){
		if(nextProps!=null){
			//console.log("entro al next props del view message");
			setTimeout(function(){
				document.getElementById("inputSendMessage").focus();
			}.bind(this),300)
		}
	}




	render(){
		// this.props.contentViewMessage.scrollTop=this.props.contentViewMessage.scrollHeigth;
		var f="";
		var a=(
			<div className="row">
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
										<div className="col-xs-12 col-sm-12 col-md-12" style={{"textAlign": "center","width": "100%","padding": "20px 10px 30px 10px"}}>
											<h3 style={{"boxShadow":"0px 2px 10px rgba(0,0,0,0.5)","background":"#d9e1e4","width":"150px","margin":"0 auto"}}>{fecha}</h3>
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
										<div className="col-xs-12 col-sm-12 col-md-12" style={{"textAlign": "center","width": "100%","padding": "20px 10px 30px 10px"}}>
											<h3 style={{"boxShadow":"0px 2px 10px rgba(0,0,0,0.5)","background":"#d9e1e4","width":"150px","borderRadius":"10px 10px","margin":"0 auto"}}>{fecha}</h3>
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