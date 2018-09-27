import React from 'react';
import PropTypes from 'prop-types';

import 'styles/bank.css';

const BankView = (props) =>
{
	const { score } = props;
	let r = <h1 id='h1Bank'>{score}</h1>;
	if (score.length > 10)
	{
		r = (<div id='divBankGameOver'>
			{score.split('\n').map((i, key) => {
				return <div id={key} key={key}>{i}</div>;
			})}
			</div>);
	}
	return r;
}

BankView.propTypes = {
	score: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	])
};

export default BankView;