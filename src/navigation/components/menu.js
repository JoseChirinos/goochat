// Dependences
import React, { Component } from 'react';

import './menu.css'
class Menu extends Component{
	render(){
		return(
			<div className="menu-container">
				<div className="row">
					<div className="col-md-3 menu-containerTriangle">
						<span className="icon-triangle item-selected evento" />
					</div>
					<div className="col-md-3 menu-containerSquare">
						<span className="icon-message-square evento" />
					</div>
					<div className="col-md-3 menu-containerSearch">
						<span className="icon-search evento" />
					</div>
					<div className="col-md-3 menu-containerPlus">
						<span className="icon-user-plus evento" />
					</div>
				</div>
			</div>
		)
	}
}

export default Menu;