import React from 'react';
import PropTypes from 'prop-types';

import BankView from 'components/BankView';


export default class Bank extends React.Component
{
    static propTypes = {
        freeRollCallback: PropTypes.func.isRequired,
        onRef: PropTypes.func.isRequired
    }
    static defaultProps = {}

    constructor(props) 
    {
        super(props);
        this.state = {
            scoreThisRoll: 0,
            scoreThisRound: 0,
            numDiceScoredThisRoll: 0,
            numDiceScoredThisRound: 0,
            isGameOver: false,
            resultsObj: {}
            
        };    

        this.isFarkle = false;

    }


    componentDidMount() { this.props.onRef(this); }
    componentWillUnmount() { this.props.onRef(null); }
    componentDidUpdate(){}


    getCurrentScore = () =>
    {
        return this.state.scoreThisRoll + this.state.scoreThisRound;
    }

   

    onFarkle = (bool) =>
    {
        this.isFarkle = bool; // to display 'farkle!' text instead of score
        if (bool === true)
        {
            this.setState((prevState, props) =>
            {
                return {
                    scoreThisRoll:0,
                    scoreThisRound:0,
                    numDiceScoredThisRoll: 0,
                    numDiceScoredThisRound: 0,
                }
            });
        }
        this.forceUpdate();
    }

    onFreeRoll = () =>
    {
        this.setState((prevState, props) =>
        {
            return {
                scoreThisRoll: 0,
                numDiceScoredThisRoll: 0,
                scoreThisRound: prevState.scoreThisRoll + prevState.scoreThisRound,
                numDiceScoredThisRound: 0
            }
        });
    }

    onGameOver = (resultsObj) =>
    {
        this.setState(()=>
        {
            return {
                isGameOver: true,
                resultsObj: resultsObj
            }
        });
    }


    //called through ref by parent (on parent scope)
    // saves roll values to round, resets roll values to 0
    onDiceToBank = (score, numDiceScored, callback) =>
    {
        this.props.freeRollCallback(numDiceScored + this.state.numDiceScoredThisRound === 6);
        this.setState((prevState, props) => {
            return {
                scoreThisRoll: score,
                numDiceScoredThisRoll: numDiceScored
            }
        });

        callback(numDiceScored>0, score + this.state.scoreThisRound);
    }


    

    lockSavedDice = () =>
    {
        this.setState((prevState) =>  
        {
            return {
                scoreThisRoll : 0,
                scoreThisRound : prevState.scoreThisRoll + prevState.scoreThisRound,
                numDiceScoredThisRoll : 0,
                numDiceScoredThisRound : prevState.numDiceScoredThisRoll + prevState.numDiceScoredThisRound
            }
        });
    }


    onBankToScore = () =>
    {
        this.setState(() => {
            return {
                scoreThisRound: 0,
                scoreThisRoll: 0,
                numDiceScoredThisRoll: 0,
                numDiceScoredThisRound:0
            }
        });
    }

    getDisplayText = () =>
    {
        let t;
        if (this.isFarkle === true)
        {
            t = "FARKLE!";
        }
        else if (this.state.isGameOver === true)
        {
            let addS = this.state.resultsObj.farkles === 1 ? "" : "s";
            //bankview strips out \n's later
            t = (this.state.resultsObj.score + " in " + this.state.resultsObj.rounds + " rounds\nwith " + this.state.resultsObj.farkles + " Farkle" + addS);
        }
        else
        {
            t = this.state.scoreThisRoll + this.state.scoreThisRound === 0 ? "" : this.state.scoreThisRoll + this.state.scoreThisRound;   
        }
        return t;
    }


    render() 
    {
        return (
            <BankView score={this.getDisplayText()} />
        );
    }
}