// Dependences
import React, { Component } from 'react';
import Card from './../../navigation/components/card';
import NullContact  from './../../navigation/components/nullContact';
import './list-request.css';
class ListMessage extends Component{
	state = {
		contactUser:[]
	}
	componentWillReceiveProps(nextProps){		

		if(nextProps.contactRequest != null){
		     this.setState({contactUser: nextProps.contactRequest});
		}else{
			this.setState({
				contactUser:[]
			});		
		}



	}


	render(){
		var b=(
			<div className={this.state.contactUser.length==0?"show":"hidden"}>
					<NullContact v={3} eventoFromMenu={this.props.eventoFromMenu}></NullContact>
			</div>
			);
		var a=(
			<div className={ this.props.estado }>
				{
					Object.keys(this.state.contactUser).map( id =>{
						return (
							<div key={id}>
								<Card showInfoContact={this.props.showInfoContact} {...this.state.contactUser[id]} idBussines={id} listNavigation="3"  rejectRequest={this.props.rejectRequest} acceptRequest={this.props.acceptRequest}/>
								<br/>
							</div>
						)
					})
				}
				{b}
			</div>
		);
		return a;
	}
}

export default ListMessage;