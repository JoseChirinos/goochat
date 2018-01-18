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
						return (
							<div key={id}>
								<Card {...this.state.contactUser[id].info} listNavigation="1"/>
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