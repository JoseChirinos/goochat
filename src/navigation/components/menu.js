// Dependences
import React, { Component } from 'react';

import './menu.css'
class Menu extends Component{
	render(){
		return(
			<div className="menu-container">
				<div className="row">
					<div className="col-md-3 menu-containerTriangle">
						<span className="icon-triangle item-selected evento" onClick={ () => this.props.eventoPrueba(0) } />
					</div>
					<div className="col-md-3 menu-containerSquare">
						<span className="icon-message-square evento" onClick={ () => this.props.eventoPrueba(1) } />
					</div>
					<div className="col-md-3 menu-containerSearch">
						<span className="icon-search evento" onClick={ () => this.props.eventoPrueba(2) } />
					</div>
					<div className="col-md-3 menu-containerPlus">
						<span className="icon-user-plus evento" onClick={ () => this.props.eventoPrueba(3) } />
					</div>
				</div>
			</div>
		)
	}
}

export default Menu;