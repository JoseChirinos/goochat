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
	componentDidMount(){
		// if(document.getElementsByClassName("emoji-wysiwyg-editor")[0]!=null)
		setTimeout(function(){
			document.getElementsByClassName("emoji-wysiwyg-editor")[0].addEventListener("keypress",this.prueba,false);
		}.bind(this),200);
	}




	prueba=(e)=>{
		var tecla = (document.all) ? e.keyCode : e.which;
		console.log(tecla);
		if(tecla==13){
			var cad = document.getElementsByClassName('emoji-wysiwyg-editor')[0].innerHTML;
			cad = cad.replace(/<[^>]*>/g, '');
			if(cad==""){
				setTimeout(function(){
					document.getElementById('inputSendMessage').value="";	
					document.getElementsByClassName("emoji-wysiwyg-editor")[0].innerHTML="";
				}.bind(this),100);
			}
		}


		if(!e.shiftKey && tecla==13 && document.getElementsByClassName('emoji-wysiwyg-editor')[0].innerHTML!=""){
			var cad = document.getElementsByClassName('emoji-wysiwyg-editor')[0].innerHTML;
			cad = cad.replace(/<[^>]*>/g, '');
			if(cad!=""){ 
				var a=document.getElementsByClassName("emoji-wysiwyg-editor")[0].innerHTML;
				this.props.sendMessage(this.state.message);
				this.setState({message:''});
				setTimeout(function(){
				 document.getElementById('inputSendMessage').value="";
				 document.getElementsByClassName("emoji-wysiwyg-editor")[0].innerHTML="";
				}.bind(this),100);
				this.props.sendMessage(a);
			}
		}

	}

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
