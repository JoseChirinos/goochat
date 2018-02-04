// Dependences
import React, { Component } from 'react';

import './menu.css'
class Menu extends Component{	
	
	state={
		countRequest:0
	}

	componentWillReceiveProps(nextProps){	
		if(nextProps.countRequest!=null){
			this.setState({countRequest:nextProps.countRequest});
		}else{
			this.setState({countRequest:0});	
		}
	}

	render(){
		const state1=true;
		const state2=true;



		return(
			<div className="menu-container">
				<div className="row">
					

					<div className="col-xs-6 col-sm-6 col-md-6 menu-containerSquare">
						<label className={state1 && this.props.countMessage!=0?"show countMenu":"hidden countMenu"}>
							{
								this.props.countMessage!=0?this.props.countMessage:""
							}
						</label>
						<span id="square" className="icon-message-square item-selected evento" onClick={ () => this.props.eventoPrueba(1) } />
					</div>

					<div className="col-xs-6 col-sm-6 col-md-6 menu-containerSearch">
						<span id="search" className="icon-search evento" onClick={ () => this.props.eventoPrueba(2) } />
					</div>

				</div>
			</div>
		)
	}
}

export default Menu;