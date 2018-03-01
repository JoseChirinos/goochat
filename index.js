// Dependences
import React from 'react';
import ReactDOM, { render } from 'react-dom';
// Modules
import Goochat from './src/chat/components/goochat';

const app = document.getElementById('app');
//const holaMundo = <h1>Hola Mundo!</h1>;
// ReactDOM.render(holaMundo,app);
//console.log('hola mundo!');
window.recibir = function(data){
	console.log(data);
	render(<Goochat datos={ data }/>,app);
};

