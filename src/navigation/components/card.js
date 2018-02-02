// Dependences
import React, { Component } from 'react';
import './card.css';
import fire from './../../config-chat/firebase-config';
class Card extends Component{
	state={
		online:false,
		img:'',
		question:false
	}

	componentWillMount(){
		if(this.props.listNavigation==0){
			this.contactOnLinePrueba(this.props.idBussines);
		}
		this.urlImgUserItem(this.props.idBussines);
	}

	urlImgUserItem=(id)=>{
		let imgRef = fire.database().ref('bussines').child(id).child("info_bussines").child("img_url");
		var urlImg="";
		imgRef.on('value', snapshot => {
			urlImg=snapshot.val();
			this.setState({img:urlImg});
		});
	}

	contactOnLinePrueba=(id)=>{
		var online=false;
		let refOnlineUser=fire.database().ref('bussines').child(id);
		refOnlineUser.on('value',snapshot=>{
			//console.log("id del user "+snapshot.val().info_bussines.name_bussines+" "+snapshot.val().info_bussines.online);
			if(snapshot.val().info_bussines.online){
				this.setState({online:true});
			}else{
				this.setState({online:false});
			}
		});
	}

	questionDelete=()=>{
		this.setState({question:true});
	}




	questionCancel=()=>{
		this.setState({question:false});

	}

	questionAccept=()=>{
		this.props.contactDelete(this.props.idBussines);
	}



	render(){
		const {name_bussines,description,listNavigation,lagree,send}=this.props;

	//	console.log("probando cards => ",this.props);
		var obj={
			id:this.props.idBussines,
			description:description,
			name_bussines:name_bussines,
			img_url:this.state.img||'',
			url_page:this.props.url_page
		}


		var a=(<div className="card-container">
					<div className="row">
						<div className="col-xs-3 col-sm-3 col-md-3 card-containerImg">
							<img className="card-img" src={this.state.img||''}></img>
							<div className={this.props.listNavigation==0 && this.state.online?"circle-active":this.props.listNavigation==0 && !this.state.online?"circle":"hidden"} style={{"position":"relative","marginTop": "-19px","marginLeft": "8px"}}></div>
						</div>
						<div className="col-xs-4 col-sm-4 col-md-4 card-containerName" onClick={()=>this.props.showInfoContact(obj)}>
							<div className="row" >
								<div className="col-md-12">
									<h3 className="truncado">{name_bussines}</h3>
								</div>
								<div className="col-md-12">
									<p className={ send==1?"card-p truncado-p sendRequest":"card-p truncado-p"}>
									{ send==1?"Solicitud enviada":description}</p>
								</div>
							</div>
						</div>
						<div className="col-xs-3 col-sm-3 col-md-3 card-delete">
							<span className={
								listNavigation==0 ?
								 "icon-user-minus" :
								 listNavigation==1 && send==0 ?
							      !this.props.stateCircle && !this.props.stateRequest?
								  "icon-user-plus":"":
								  listNavigation==1 && send==1?
								  "icon-x":"icon-x"
								} onClick={
									listNavigation==0?
									()=>this.questionDelete():
									listNavigation==1 && send==0?!this.props.stateCircle && !this.props.stateRequest?
									()=>this.props.sendRequest(this.props.idBussines):function(){return 0}:
									listNavigation==1 && send==1 ?
									()=>this.props.removeRequest(this.props.idBussines):
									()=>this.props.rejectRequest(this.props.idBussines)}>
							</span>
						</div>
						<div className="col-xs-2 col-sm-2 col-md-2 card-navigation">
								{
									listNavigation==0 || listNavigation==1?
									(
										<a href={this.props.url_page}>
											<span className={listNavigation==0 ? "icon-link" :listNavigation==1 ? "icon-link":"icon-check"} onClick={listNavigation==3?()=>this.props.acceptRequest(this.props.idBussines):function(){return 0}}/>
										</a>
									):
									(<span className={listNavigation==0 ? "icon-link" :listNavigation==1 ? "icon-link":"icon-check"} onClick={listNavigation==3?()=>this.props.acceptRequest(this.props.idBussines):function(){return 0}}/>)
								}
							
						</div>
					</div>
				</div>);


		var b=(<div className="card-container bounceIn">
					<div className="row questionContainer">
						<div className="col-xs-12 col-sm-12 col-md-12">
							<p>Esta seguro que quiere eliminar a <label className="questionName">{name_bussines}</label> de sus circulos?</p>
						</div>
						<div className="col-xs-12 col-sm-12 col-md-12">
							<div className="row">
								<div className="col-xs-6 col-sm-6 col-md-6">
									<span className="icon-check questionCheck" onClick={()=>this.questionAccept()}/>
								</div>
								<div className="col-xs-6 col-sm-6 col-md-6">
									<span className="icon-x questionX" onClick={()=>this.questionCancel()}/>
								</div>
							</div>
						</div>
						
						
					</div>
				</div>);

		return (this.state.question?b:a);
	}
}

export default Card;