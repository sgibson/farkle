import React from 'react';
import PropTypes from 'prop-types';
import ScoresheetView from 'components/ScoresheetView';

import 'styles/scoresheet.css';

export default class Scoresheet extends React.Component
{
    static propTypes = {
        onRef: PropTypes.func.isRequired
    }
    static defaultProps = {
    }

    constructor(props) 
    {
        super(props);
        this.state = {
            currentRound: 0,
            currentTotalScore: 0,
            scoresArray:[],
            currentFarkleRun: 0,
            totalFarkle: 0
        };
    }

    componentDidMount() { this.props.onRef(this); }
    componentWillUnmount() { this.props.onRef(null); }

    getTotalScore = () =>
    {
        return this.state.currentTotalScore;
    }

    getFinalStats = () =>
    {
        return { 
            score: this.state.currentTotalScore,
            rounds: this.state.currentRound,
            farkles: this.state.totalFarkle
        }
    }

    onNewScore = (score) =>
    {
        let a = this.state.scoresArray.slice(0);
        let b = score === 0 ? "FARKLE" : score;
        let c = this.state.currentRound + 1;
        let d = Number(this.state.currentTotalScore) + score;
        let e = score === 0 ? this.state.currentFarkleRun + 1 : 0;
        if (e >= 3)
        {
            b = "F&#@ -300";
            d -= 300;
        }
       
        let f = score === 0 ? this.state.totalFarkle + 1 : this.state.totalFarkle;
        a.push(b);

        this.setState((prevState, props) =>{
            return {
                currentRound: c,
                scoresArray: a,
                currentTotalScore: d,
                currentFarkleRun: e,
                totalFarkle: f
            };
        });
    }

    createListing = (score, index) =>
    {
        let smallFont = (score === "F&#@ -300") ? 'smallFont' : 'null';
        return (<tr key={index} className="trScoresheet">
                    <td className="tdScoresheetLeft">
                        <h3>{(Number(index) + 1)}</h3>
                    </td>
                    <td className='tdScoresheetRight'>
                        <h3 className={smallFont}>{score}</h3>
                    </td>
                </tr>);
    }

    getAllScores = () =>
    {
        let a = this.state.scoresArray.length > 5 ? this.state.scoresArray.length - 5 : 0;
        let b = this.state.scoresArray.slice();
        let c = b.slice(a, this.state.scoresArray.length).map((value, index) =>
        {
            return this.createListing(value, index + a);
        });
        return c;  
    }





    render() {
        return (
            <div id='scoresheet'>
                <ScoresheetView scores={this.getAllScores()} totalScore={this.state.currentTotalScore} />
            </div>
        );
    }
}