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
		//console.log("desde el listSearch : ",nextProps.contactSearch);
		 if(nextProps.contactSearch != null){
		    this.setState({contactUser: nextProps.contactSearch});
		} 
		if(nextProps.idBussines!=null && nextProps.idBussines!=""){
			this.loadRequest(nextProps.idBussines);
		}
	}

	loadRequest=(id)=>{
		if(id!=null && id!=""){
		// document.getElementById('menu').className="show";
			//var id = document.getElementById('id_user').value;
			let requestRef = fire.database().ref('bussines/'+id).child('bussines_circle');
			    requestRef.orderByChild('lagree').equalTo(false).on('value', snapshot => {
			    this.setState({contactRequest: snapshot.val()});	
			});
		}
	}

	render(){
		//console.log("lista de contactos",this.props.listCircle);

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
					//console.log(this.props.awaitingRequests);
					Object.keys(this.props.awaitingRequests||{}).map(idu=>{
						//console.log("este id =>: "+idu);
						if(this.state.contactUser[id].id == idu){
							stateCardSearch=true;
						}
					});
					var stateCircle=false;
					Object.keys(this.props.listCircle||{}).map(idUs=>{
						if(idUs==this.state.contactUser[id].id){
							stateCircle=true;
						}
					});

					var stateRequest=false;
					//console.log("prbando codigo 2 => ",this.props.contactRequest);
					Object.keys(this.state.contactRequest||{}).map(idUsc=>{
						if(idUsc==this.state.contactUser[id].id){
							stateRequest=true;
						}
					});



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