import React from 'react';

import ScoreListing from 'components/ScoreListing';

import score_1 from 'img/score_1.png';
import score_5 from 'img/score_5.png';
import score_3K from 'img/score_3K.png';
import score_4K from 'img/score_4K.png';
import score_5K from 'img/score_5K.png';
import score_6K from 'img/score_6K.png';
import score_str from 'img/score_str.png';
import score_2_3 from 'img/score_2-3.png';
import score_3_2 from 'img/score_3-2.png';


export default class ScoringGraphics extends React.Component 
{
	constructor(props)
	{
		super(props);
		this.state = {
			scores: [
				{ cn:'divScoreListing1', img:score_1, alt:'Score a 1', text:'100 each' },
				{ cn:'divScoreListing5', img:score_5, alt:'Score a 5', text:'50 each' },
				{ cn:'divScoreListing3K', img:score_3K, alt:'Score 3 of a kind', text:'3x(any) = Number Rolled X 100 (1\'s are 1000!)' },
				{ cn:'divScoreListing4K', img:score_4K, alt:'Score 4 of a kind', text:'4x(any) = 1000' },
				{ cn:'divScoreListing5K', img:score_5K, alt:'Score 5 of a kind', text:'5x(any) = 2000' },
				{ cn:'divScoreListing6K', img:score_6K, alt:'Score 6 of a kind', text:'6x(any) = 3000' },
				{ cn:'divScoreListingStr', img:score_str, alt:'Score a straight', text:'Straight = 3000' },
				{ cn:'divScoreListing2_3', img:score_2_3, alt:'Score 2 x 3 of a kind', text:'2x3(any) = Number Rolled X 200' },
				{ cn:'divScoreListing3_2', img:score_3_2, alt:'Score 3 pairs', text:'3x2(any) = 1500' }
			]
		};
	}

	createAll = () =>
	{

		const r = this.state.scores.map((value, index) =>
        {
            return (
				<div key={index} className={value.cn}>
					<ScoreListing 
						src={value.img} 
						altText={value.alt}
						text={value.text}
					/>
				</div>
			)
		});
		
		return r;
	}

	render() {
		return (
			<div id='divScoring'>
				{this.createAll()}
			</div>
		)
	}
}