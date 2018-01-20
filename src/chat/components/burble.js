// Dependences
import React, { Component } from 'react';
import './burble.css';
class Burble extends Component{
	render(){
		//console.log
		//console.log("props del burble",this.props.obj);
		var h=new Date(this.props.obj.date);
		var hora=h.getHours()+":"+h.getMinutes();
		//console.log("date",this.props.obj.date);
		//console.log("hora"+h.getHours());
		//var hora="12:12";
		return(
			this.props.iz==0?(
			<div className="burble-container">
				<div className="row burbble">
					<div className="col-md-3 imgLogo">
						<img src={this.props.obj.img_url} alt=""/>
					</div>
					<div className="col-md-9">
						<div className="row">
							<div className="col-md-12" style={{"color":"#64b0bd"}}>{this.props.obj.name_bussines}</div>
							<div className="col-md-12">
								<p>{this.props.obj.message}</p>
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-12 dateInfo">
					{hora}
				</div>
			</div>
			):(
			<div className="burble-container rigth">
				<div className="row burbble rigth-burbble">
					<div className="col-md-9">
						<div className="row">
							<div className="col-md-12" style={{"color":"#64b0bd"}}>{this.props.obj.name_bussines}</div>
							<div className="col-md-12">
								<p>{this.props.obj.message}</p>
							</div>
						</div>
					</div>
					<div className="col-md-3 imgLogo">
						<img src={this.props.obj.img_url} alt=""/>
					</div>
					<div className="col-md-12 dateInfo rigth-dat">
						{hora}
					</div>
				</div>
			</div>
			)

		)
	}
}

export default Burble;