// Dependences
import React, { Component } from 'react';
import './input.css'
class Input extends Component{
	state={
		message:''
	}

	updateMessage=(m)=>{
		var a=document.getElementsByClassName("emoji-wysiwyg-editor form-control")[0].innerHTML;
		//console.log(a);
		this.setState({message:a});
	}


	// prueba=(e)=>{
	// 	var tecla = (document.all) ? e.keyCode : e.which;
	// 	if(tecla==13 && document.getElementsByClassName('emoji-wysiwyg-editor')[0].innerHTML!=null){
	// 		var a=document.getElementsByClassName("emoji-wysiwyg-editor")[0].innerHTML;
	// 		this.props.sendMessage(this.state.message);
	// 		this.setState({message:''});
	// 		document.getElementById('inputSendMessage').value="";
	// 		document.getElementsByClassName("emoji-wysiwyg-editor")[0].innerHTML="";
	// 		this.props.sendMessage(a);
	// 	}
	// }

	render(){
		return(
			<div className="input-container">
				<div className="row">
					<div className="col-xs-11 col-sm-11 col-md-11">
					<p className="lead emoji-picker-container">
              			<input type="email" className="form-control" id="inputSendMessage" type="email" className="form-control" placeholder="Escribe un mensaje..." data-emojiable="true" onKeyUp={(e)=>{ this.prueba(e)} } onInput={ (e)=>{ this.updateMessage(e.target.value) } }/>
            		</p>
					</div>
					<div className="col-sm-1 col-md-1">
						<span className="icon-navigation input-sendMessage" onClick={()=>this.props.sendMessage(document.getElementsByClassName("emoji-wysiwyg-editor form-control")[0].innerHTML)}/>
					</div>
				</div>
			</div>
		)
	}
}

export default Input;
