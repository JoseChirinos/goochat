import React, { Component } from 'react';
import './bussines.css';

class Bussines extends Component{

	componentWillReceiveProps(nextProps){	
		if(nextProps.name_bussines!=""){
			this.props.infoLoad();
		}
	}


	render(){
		const {name_bussines,id_bussines,img_url,online}=this.props;
		return(
			<div className="Bussines-container">
				<div className="row">
					<div className="col-xs-3 col-sm-3 col-md-3 img-container" >
						<img className="Bussines-image" src={img_url}/>
					</div>
					<div className="col-xs-9 col-sm-9 col-md-9">
						<div className="row information">
							<div className="col-md-12">
								<h3>{name_bussines}</h3>						
							</div>
							<div className="col-md-12">
								<div className={online?"circle-active":"circle"}/>
								<div className="conection-state">{online?" (Conectado)":" (Desconectado)"}</div>						
							</div>
							
						</div>
					</div>
				</div>
				<span onClick={()=>this.props.showConfig()} className="config icon-settings"></span>
		    </div>
		)	
	}
}

export default Bussines;