// Dependences
import React, { Component } from 'react';
import Card from './../../navigation/components/card';
import './list-search.css';
import fire from './../../config-chat/firebase-config';

class ListMessage extends Component{
	state = {
		contactUser:[],
		contactRequest:{}
	}
	componentWillReceiveProps(nextProps){	
		 if(nextProps.contactSearch != null){
		    this.setState({contactUser: nextProps.contactSearch});
		} 	
	}
	render(){

		var c=(<div className="imput-search">
					<span className="icon-search"></span>
					<input className="search-input" placeholder="Buscar" type="text" onInput={ (e)=>{ this.props.search(e.target.value) } }/>
				</div>);


		var a=(<div className="contentSearch">
				{c}
				<br></br>
				<br></br>
				{
				Object.keys(this.state.contactUser).map( id =>{
					var stateCardSearch=false;
					var stateCircle=false;
					var stateRequest=false;
					return (
						<div key={this.state.contactUser[id].id}>	
								{
									stateCardSearch?
									(<Card showInfoContact={this.props.showInfoContact} {...this.state.contactUser[id].info} stateRequest={stateRequest} stateCircle={stateCircle} listNavigation="1" idBussines={this.state.contactUser[id].id} send="1" sendRequest={this.props.contactSendRequest} removeRequest={this.props.contactRemoveRequest}/>):
									(<Card showInfoContact={this.props.showInfoContact} {...this.state.contactUser[id].info} stateRequest={stateRequest} stateCircle={stateCircle} listNavigation="1" idBussines={this.state.contactUser[id].id} send="0" removeRequest={this.props.contactRemoveRequest} sendRequest={this.props.contactSendRequest}/>)
								}
							<br/>
						</div>
					 )
		
				})
			}
			</div>);
		return a;
	}
}

export default ListMessage;