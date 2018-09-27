import React from 'react';
import PropTypes from 'prop-types';

import DieRoller from './DieRoller';
import 'styles/diceController.css';

export default class DiceController extends React.Component 
{
    static propTypes = {
        onDiceToBankEvent: PropTypes.func.isRequired,
        onRef: PropTypes.func.isRequired
    }

    constructor(props)
    {
        super(props);
        this.state = {
            thisRoundDiceValues: [
                {index: 0, value:-1, isSaved:false, isLocked:false}, 
                {index: 1, value:-1, isSaved:false, isLocked:false},
                {index: 2, value:-1, isSaved:false, isLocked:false},
                {index: 3, value:-1, isSaved:false, isLocked:false},
                {index: 4, value:-1, isSaved:false, isLocked:false},
                {index: 5, value:-1, isSaved:false, isLocked:false}
            ]
            
        };
        this.tempDiceValues = [
            {index: 0, value:-1, isSaved:false, isLocked:false},
            {index: 1, value:-1, isSaved:false, isLocked:false},
            {index: 2, value:-1, isSaved:false, isLocked:false},
            {index: 3, value:-1, isSaved:false, isLocked:false},
            {index: 4, value:-1, isSaved:false, isLocked:false},
            {index: 5, value:-1, isSaved:false, isLocked:false}
        ];
        this.diceRolledThisRound = 0;
        this.diceFinishedCallback = null;


    }

    componentDidMount(){ this.props.onRef(this); }
    componentWillUnmount() { this.props.onRef(null); }
    componentDidUpdate(){}




    roll = (callback, scoredDiceIndexes = []) =>
    {
        //resets for non-scoring dice
        let d1R = true;
        let d2R = true; 
        let d3R = true;
        let d4R = true;
        let d5R = true;
        let d6R = true;
        if (scoredDiceIndexes.length > 0)
        {
            d1R = scoredDiceIndexes[0];
            d2R = scoredDiceIndexes[1];
            d3R = scoredDiceIndexes[2];
            d4R = scoredDiceIndexes[3];
            d5R = scoredDiceIndexes[4];
            d6R = scoredDiceIndexes[5];
        }
        this.diceFinishedCallback = callback;
        this.d1.roll(d1R, this.registerRolledDiceValues);
        this.d2.roll(d2R, this.registerRolledDiceValues);
        this.d3.roll(d3R, this.registerRolledDiceValues);
        this.d4.roll(d4R, this.registerRolledDiceValues);
        this.d5.roll(d5R, this.registerRolledDiceValues);
        this.d6.roll(d6R, this.registerRolledDiceValues);
    }



    //DieRollingManager calls this when dice roll complete
    registerRolledDiceValues = (index, value, isSaved, isLocked) =>
    {
        //console.log(index, value, isSaved, isLocked);
        this.tempDiceValues[index] = {index:index, value:value, isSaved:isSaved, isLocked:isLocked}; 
        this.diceRolledThisRound++;
        //use slice so that array is disconnected from temp
       // console.log('********************** OUTSIDE');
        if (this.diceRolledThisRound === 6)
        {
            this.diceFinishedCallback(this.tempDiceValues.slice(0));
            this.diceRolledThisRound = 0;
            this.setState((prevState, props) => {
                return {
                    thisRoundDiceValues: this.tempDiceValues.slice(0)
                }
            });
        }
        
    }


    onMoveCallback = (index, value, isSaved) =>
    {
        const v = this.state.thisRoundDiceValues;
        v[index] = {index: index, value:value, isSaved:isSaved, isLocked:false};
        let d = [];
        //which dice do we send?
        for (let i=0; i<6; i++)
        {
            if (this.state.thisRoundDiceValues[i].isSaved === true)
            {
                d.push({index:i, value: this.state.thisRoundDiceValues[i].value, isSaved:true, isLocked:false});
            }
        }
        //this.props.onDiceToBankEvent(index, d);
        this.props.onDiceToBankEvent(d);
        this.setState((prevState, props) =>
        {
            return {
                thisRoundDiceValues: v
            };
        });
    }



    reset = (isIdle=true, rollAfter=false, callback=null) =>
    {
        if (callback) this.diceFinishedCallback = callback;
        this.d1.reset(isIdle);
        this.d2.reset(isIdle);
        this.d3.reset(isIdle);
        this.d4.reset(isIdle);
        this.d5.reset(isIdle);
        this.d6.reset(isIdle);
        if (rollAfter === true) setTimeout(this.freeRoll, 50);
    }

    freeRoll = () =>
    {
        this.d1.roll(false, this.registerRolledDiceValues);
        this.d2.roll(false, this.registerRolledDiceValues);
        this.d3.roll(false, this.registerRolledDiceValues);
        this.d4.roll(false, this.registerRolledDiceValues);
        this.d5.roll(false, this.registerRolledDiceValues);
        this.d6.roll(false, this.registerRolledDiceValues);
    }


    render()
    {
        return(
            <div id='divDice'>
                <DieRoller onRef={ref => {this.d1 = ref}} index={0} onMove={this.onMoveCallback} />
                <DieRoller onRef={ref => {this.d2 = ref}} index={1} onMove={this.onMoveCallback} />
                <DieRoller onRef={ref => {this.d3 = ref}} index={2} onMove={this.onMoveCallback} />
                <DieRoller onRef={ref => {this.d4 = ref}} index={3} onMove={this.onMoveCallback} />
                <DieRoller onRef={ref => {this.d5 = ref}} index={4} onMove={this.onMoveCallback} />
                <DieRoller onRef={ref => {this.d6 = ref}} index={5} onMove={this.onMoveCallback} />
            </div>
        );
    }
}