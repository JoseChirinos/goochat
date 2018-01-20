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

	render(){
		return(
			<div className="input-container">
				<div className="row">
					<div className="col-md-11">
						<input type="text" placeholder="Escribe un mensaje..." onInput={ (e)=>{ this.updateMessage(e.target.value) } }/>
					</div>
					<div className="col-md-1">
						<span className="icon-navigation input-sendMessage" onClick={()=>this.props.sendMessage(this.state.message)}/>
					</div>
				</div>
			</div>
		)
	}
}

export default Input;