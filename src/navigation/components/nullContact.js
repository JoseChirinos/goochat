// Dependences
import React, { Component } from 'react';

import './nullContact.css'
class nullContact extends Component{	

	render(){
		var a=(<div style={{"background":"#d9e1e4"}} className="menu-container">
					<h3 className="h3Nullcontact">Quieres agregar alguna empresa a tus circulo empresarial?</h3>
				<span onClick={()=>this.props.eventoFromMenu(2)} className="icon-search spanNullContact"/>
			</div>);
		var b=(<div style={{"background":"#d9e1e4"}} className="menu-container">
					<h3 className="h3Nullcontact">No tienes ningun mensaje.</h3>
				</div>);

		var c=(<div style={{"background":"#d9e1e4"}} className="menu-container">
					<h3 className="h3Nullcontact">No tienes niguna solicitud.</h3>
				</div>);

		
		return(
			this.props.v==1?a:this.props.v==2?b:this.props.v==3?c:""
		)
	}
}

export default nullContact;