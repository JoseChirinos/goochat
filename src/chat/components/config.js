// Dependences
import React, { Component } from 'react';
import './config.css';


class Config extends Component{
	render(){
		return(
			<div className="config-content">
				<div className="row">
					<div className="col-xs-12 col-md-12 col-sm-12 col-lg-12 config-header" >
						<span className="icon-settings"></span> Configuracion <span onClick={()=>this.props.hideConfig()} className="icon-x config-pointer" style={{"float":"right","fontSize": "25px"}}></span>
					</div>
					<div className="col-xs-9 col-md-9 col-sm-9 col-lg-9 config-options">
						Activar notificaciones:
					</div>
					<div className="col-xs-3 col-md-3 col-sm-3 col-lg-3 config-options">
						<span className={this.props.notificationInfo?"icon-check-circle config-pointer":"icon-circle config-pointer"} onClick={this.props.notificationInfo?()=>this.props.optionConfig(2):()=>this.props.optionConfig(1)}></span>
					</div>
				</div>
			</div>
		)
	}
}

export default Config;
