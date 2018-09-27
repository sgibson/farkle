import React from 'react';
import ReactDOM from 'react-dom';
import BankView from './BankView';

it('renders a score', () => {
  	const div = document.createElement('div');
	const score = 500;
  
	ReactDOM.render(
	  <BankView
		  score={score} />, 
	div);
	  
	ReactDOM.unmountComponentAtNode(div);
});


it('renders endgame', () => {
  	const div = document.createElement('div');
	const score = "This is a test /n This is only a test";
  
	ReactDOM.render(
	  <BankView
		  score={score} />, 
	div);
	  
	ReactDOM.unmountComponentAtNode(div);
});