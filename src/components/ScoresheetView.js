import React from 'react';
import PropTypes from 'prop-types';

import 'styles/scoresheetView.css';

const ScoresheetView = (props) =>
{
	const {
		scores,
		totalScore
	} = props;

	return (
		<table id='tableScoresheet'>
			<tbody>
			<tr className="trScoresheetHeader">
				<th className="tdScoresheetLeft">
					<h2>ROUND</h2>
				</th>
				<th className='tdScoresheetRight'>
					<h2>SCORE</h2>
				</th>
			</tr>
				{scores}
			</tbody>
			<tfoot>
				<tr className="trScoresheetFooter">
					<th className="tdScoresheetLeft">
						<h2>TOTAL:</h2>
					</th>
					<th className='tdScoresheetRight'>
						<h2>{totalScore}</h2>
					</th>
				</tr>
			</tfoot>
		</table>
	);	
}

ScoresheetView.propTypes = {
	scores: PropTypes.array,
	totalScore: PropTypes.number
}

export default ScoresheetView;