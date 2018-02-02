// Dependences
import React, { Component } from 'react';
import './input.css'
class Input extends Component{
	state={
		message:''
	}

	updateMessage=(m)=>{
		this.setState({message:m});
	}



	prueba=(e)=>{
		var tecla = (document.all) ? e.keyCode : e.which;
		if(tecla==13 && document.getElementById('inputSendMessage').value!=""){
			//console.log("funciona")
			this.props.sendMessage(this.state.message);
			this.setState({message:''});
			document.getElementById('inputSendMessage').value="";
		}
	}

	// componentDidMount(){
	// 	if(this.props!=null){
	// 		if(this.props.focus){	
	// 			document.getElementById("inputSendMessage").focus();
	// 		}	
	// 	}
	// }

	render(){
		return(
			<div className="input-container">
				<div className="row">
					<div className="col-xs-11 col-sm-11 col-md-11">
						<input id="inputSendMessage" type="textarea" placeholder="Escribe un mensaje..." onKeyUp={(e)=>{ this.prueba(e)} } onInput={ (e)=>{ this.updateMessage(e.target.value) } }/>
					</div>
					<div className="col-sm-1 col-md-1">
						<span className="icon-navigation input-sendMessage" onClick={()=>this.props.sendMessage(this.state.message)}/>
					</div>
				</div>
			</div>
		)
	}
}

export default Input;
