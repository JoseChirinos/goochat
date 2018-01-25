// Dependences
import React, { Component } from 'react';
import Card from './../../navigation/components/card';
import './list-search.css';
class ListMessage extends Component{
	state = {
		contactUser:[]
	}
	componentWillReceiveProps(nextProps){	
		//console.log("desde el listSearch : ",nextProps.contactSearch);
		 if(nextProps.contactSearch != null){
		    this.setState({contactUser: nextProps.contactSearch});
		} 
	}



	render(){
		//console.log("lista de contactos",this.props.listCircle);
		return(
			<div className="contentSearch">

				<div className="imput-search">
					<span className="icon-search"/>
					<input className="search-input" placeholder="Buscar" type="text" onInput={ (e)=>{ this.props.search(e.target.value) } }/>
				</div>
				<br></br>
				<br></br>
				{
					Object.keys(this.state.contactUser).map( id =>{
						var stateCardSearch=false;
						console.log(this.props.awaitingRequests);
						
						Object.keys(this.props.awaitingRequests||{}).map(idu=>{
							//console.log("este id =>: "+idu);
							if(this.state.contactUser[id].id == idu){
								stateCardSearch=true;
							}
						})
						var stateCircle=false;
						Object.keys(this.props.listCircle||{}).map(idUs=>{
							if(idUs==this.state.contactUser[id].id){
								stateCircle=true;
							}
						})


						return (
							<div key={this.state.contactUser[id].id}>	
									{
										stateCardSearch?
										(<Card showInfoContact={this.props.showInfoContact} {...this.state.contactUser[id].info} stateCircle={stateCircle} listNavigation="1" idBussines={this.state.contactUser[id].id} send="1" sendRequest={this.props.contactSendRequest} removeRequest={this.props.contactRemoveRequest}/>):
										(<Card showInfoContact={this.props.showInfoContact} {...this.state.contactUser[id].info} stateCircle={stateCircle} listNavigation="1" idBussines={this.state.contactUser[id].id} send="0" removeRequest={this.props.contactRemoveRequest} sendRequest={this.props.contactSendRequest}/>)
									}
								<br/>
							</div>
						 )
			
					})
				}
			</div>
		)
	}
}

export default ListMessage;