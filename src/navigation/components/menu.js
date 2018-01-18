// Dependences
import React, { Component } from 'react';

import './menu.css'
class Menu extends Component{
	render(){
		return(
			<div className="menu-container">
				<div className="row">
					<div className="col-md-3 menu-containerTriangle">
						<span id="circle" className="icon-triangle item-selected evento" onClick={ () => { this.props.eventoPrueba(0) } }></span>
					</div>
					<div className="col-md-3 menu-containerSquare">
						<span id="square" className="icon-message-square evento" onClick={ () => { this.props.eventoPrueba(1) } }></span>
					</div>
					<div className="col-md-3 menu-containerSearch">
						<span id="search" className="icon-search evento" onClick={ () => { this.props.eventoPrueba(2) } }></span>
					</div>
					<div className="col-md-3 menu-containerPlus">
						<span id="plus" className="icon-user-plus evento" onClick={ () => { this.props.eventoPrueba(3)}  }></span>
					</div>
				</div>
			</div>
		)
	}
}

export default Menu;