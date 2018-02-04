// Dependences
import React, { Component } from 'react';
import Card from './../../navigation/components/card';
import NullContact  from './../../navigation/components/nullContact';
import './list-contact.css';
class ListMessage extends Component{
	state = {
		contactUser:[]
	}
	componentWillReceiveProps(nextProps){		

		if(nextProps.contactCircle != null){
		     this.setState({contactUser: nextProps.contactCircle});
		}else{
		     this.setState({contactUser: []});
		}
	}




	render(){
		var b=(<div className={this.state.contactUser.length==0?"show":"hidden"}>
					<NullContact v={1} eventoFromMenu={this.props.eventoFromMenu}></NullContact>
				</div>);


		var a=(
			<div className={ this.props.estado }>
				{
					Object.keys(this.state.contactUser).map( id =>{
						return (
							<div key={id}>
								<Card showInfoContact={this.props.showInfoContact} {...this.state.contactUser[id]} idBussines={id} listNavigation="0" contactDelete={this.props.contactDelete}/>
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