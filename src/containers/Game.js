import React from 'react';

import DiceController from './DiceController';
import Bank from './Bank';
import Scoresheet from './Scoresheet';
import DiceSorter from 'components/DiceSorter';
import DiceReader from 'components/DiceReader';
import DiceTally from 'components/DiceTally';
import GameButton from 'components/GameButton';
import BankButton from 'components/BankButton';

import { STATE_GAME_OVER, STATE_PLAY, STATE_START, STATE_WAIT } from 'constants/stateStrings';
import { EVENT_BANKED_SCORE, EVENT_DIE_MOVED, EVENT_FARKLE, EVENT_GAME_OVER, EVENT_ROLL, EVENT_START } from 'constants/eventStrings';
import { LABEL_BANK_DEFAULT, LABEL_BANK_EMPTY, LABEL_BANK_NO, LABEL_GAME_FREE_ROLL, LABEL_GAME_GAME_OVER, LABEL_GAME_ROLL, LABEL_GAME_START } from 'constants/labelStrings';


import 'styles/game.css';


export default class Farkle extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            stateString: STATE_START,
            lastEventString: "",
            isFirstRoll: true,
            gameButtonLabel:LABEL_GAME_START,
            gameButtonEnabled: true,
            gameButtonRedClass: '',
            bankButtonLabel:LABEL_BANK_EMPTY,
            bankButtonEnabled: false
        };

        this.nextRollFree = false;
        this.finalScore = 0;
        this.finalRoundCount = 0;
        this.gameOverHappened = false;
        this.returnObj = {scoredDiceIndexes:[true,true,true,true,true,true]};

    }

    componentDidUpdate()
    {
        if (this.gameOverHappened === false)
        {
            if (this.scoresheet.getTotalScore() >= 10000)
            {
                this.gameOverHappened = true;
                this.eventMachine(EVENT_GAME_OVER);
            }
        }
    }

    
    eventMachine = (eventString) =>
    {
        //console.log('#######################################');
        //console.log("EVENT<<<<<", eventString);
        //console.log("LASTEVENT>>>>>", this.state.lastEventString);
        //console.log("STATE>>>>>>>>>>>>>", this.state.stateString);

        let bankLabel = LABEL_BANK_EMPTY;
        let bankEnabled = false;
        let gameButtonLabel = LABEL_GAME_ROLL;
        let bankScore = this.bank.getCurrentScore();

        if (bankScore > 0 && bankScore < 300)
        {
            bankLabel = LABEL_BANK_NO;
            bankEnabled = false;
        }
        else if (bankScore > 300)
        {
            bankLabel = LABEL_BANK_DEFAULT;
            bankEnabled = true;
        }



        switch(eventString)
        {
            case EVENT_START:
                this.diceController.reset(true);
                this.setState((prevState, props) => 
                {
                    return {
                        stateString: STATE_PLAY,
                        lastEventString: EVENT_START,
                        gameButtonLabel: LABEL_GAME_ROLL,
                        gameButtonEnabled: true,
                        bankButtonLabel: LABEL_BANK_EMPTY,
                        bankButtonEnabled: false  
                    }
                });
                break;

            case EVENT_ROLL:
                if (this.nextRollFree === true)
                {
                    this.bank.onFreeRoll();
                    this.nextRollFree = false;
                    this.diceController.reset(false, true, this.onDiceFinishedRollingCallback);
                }
                else
                {
                    this.bank.lockSavedDice();
                    this.diceController.roll(this.onDiceFinishedRollingCallback, this.returnObj.scoredDiceIndexes);
                }

                this.setState((prevState, props) =>
                {
                    return {
                        stateString: STATE_WAIT,
                        lastEventString: EVENT_ROLL,
                        gameButtonLabel: gameButtonLabel,
                        gameButtonEnabled: false,
                        bankButtonLabel: bankLabel,
                        bankButtonEnabled: bankEnabled
                    }
                });
                break;

            case EVENT_DIE_MOVED:
               //onDiceToBank called by diceController
                break;

            case EVENT_FARKLE:
                this.diceController.reset(true);
                this.bank.onFarkle(true);
                this.scoresheet.onNewScore(0);
                this.setState((prevState, props) =>
                {
                    return {
                        stateString: STATE_PLAY,
                        lastEventString: EVENT_FARKLE,
                        gameButtonLabel: LABEL_GAME_ROLL,
                        gameButtonEnabled: true,
                        bankButtonLabel: LABEL_BANK_EMPTY,
                        bankButtonEnabled: false
                    }
                });
                break;


            case EVENT_BANKED_SCORE:
                this.scoresheet.onNewScore(this.bank.getCurrentScore());
                this.bank.onBankToScore();
                this.diceController.reset(true);
                this.setState((prevState, props) =>
                {
                    return {
                        stateString: STATE_PLAY,
                        lastEventString: EVENT_BANKED_SCORE,
                        gameButtonLabel: LABEL_GAME_ROLL,
                        bankButtonLabel: LABEL_BANK_EMPTY,
                        bankButtonEnabled: false,
                        gameButtonEnabled: true
                    }
                });
        
                break;

            case EVENT_GAME_OVER:
                const result = this.scoresheet.getFinalStats();
                this.bank.onGameOver(result);
                this.setState((prevState, props) =>
                {
                    return {
                        stateString: STATE_GAME_OVER,
                        lastEventString: EVENT_GAME_OVER,
                        gameButtonLabel: LABEL_GAME_GAME_OVER,
                        gameButtonEnabled: true,
                        bankButtonLabel: LABEL_BANK_EMPTY,
                        bankButtonEnabled: false
                    }
                });
                break;

            default:
                console.log("Farkle.eventMachine string incorrect:", eventString);
        }
    
    }


    



//triggered on dice roll
    onDiceFinishedRollingCallback = (rawDice) => { DiceSorter(false, rawDice, this.onRolledDiceSortedCallback) };
    onRolledDiceSortedCallback = (returnObj) => { DiceReader(returnObj, this.onRolledDiceReadCallback) };
    onRolledDiceReadCallback = (returnObj) => { DiceTally(returnObj, this.onRolledDiceTallyCallback) };
    onRolledDiceTallyCallback = (returnObj, score, numDiceScored) =>
    {
       if(numDiceScored === 0)
       {
            this.eventMachine(EVENT_FARKLE);  
       }
       else
       {
           this.bank.onFarkle(false);
       }
    }





//triggered when dice are moved by user (saved/unsaved)
    onDiceToBankEvent = (savedDice) => { DiceSorter(true, savedDice, this.onDiceToBankSortedCallback) };
    onDiceToBankSortedCallback = (returnObj) => { DiceReader(returnObj, this.onDiceToBankReadCallback) };
    onDiceToBankReadCallback = (returnObj) => { DiceTally(returnObj, this.onDiceToBankTallyCallback) };
    onDiceToBankTallyCallback = (returnObj, score, numDiceScored) => {
        this.returnObj = returnObj;
        this.bank.onDiceToBank(score, numDiceScored, this.onDiceToBankCallback);
    }

    onDiceToBankCallback = (atLeastOneScored, rollScore) =>
    {
        let bankLabel = LABEL_BANK_EMPTY;
        let bankEnabled = false;
        let gameButton = false;
        let state = STATE_WAIT;
        
        if (rollScore > 0 && rollScore < 300)
        {
            bankLabel = LABEL_BANK_NO;
        }
        else if (rollScore >= 300)
        {
            bankLabel = LABEL_BANK_DEFAULT;
            bankEnabled = true;
        }

        if (atLeastOneScored === true)
        {
            state = STATE_PLAY;
            gameButton = true;
        }
 

        this.setState((prevState, props) =>
        {
            return {
                stateString: state,
                lastEventString: EVENT_DIE_MOVED,
                gameButtonEnabled: gameButton,
                bankButtonLabel: bankLabel,
                bankButtonEnabled: bankEnabled
            }
        });
        this.forceUpdate();
    }

    

    //from bank
    onFreeRollCallback = (bool) =>
    {
        this.nextRollFree = bool;
        if (bool === true)
        {
            this.setState((prevState, props) =>
            {
                return {
                    gameButtonLabel: LABEL_GAME_FREE_ROLL,
                    gameButtonEnabled: true
                }
            });
        }
    }




    
    onGameButtonClick = (e) =>
    {
        //console.log('game button:', this.state.stateString);
        if (this.state.stateString === STATE_START)
        {
            this.eventMachine(EVENT_START);
        }
        else if (this.state.stateString === STATE_PLAY)
        {
            if (this.state.lastEventString === EVENT_BANKED_SCORE || this.state.lastEventString === EVENT_FARKLE)
            {
                this.diceController.reset(false);
            }
            this.eventMachine(EVENT_ROLL);
        }
        else if (this.state.stateString === STATE_GAME_OVER)
        {
			window.location.reload();
        }
    }

    
    onBankButtonClick = (e) =>
    {
        this.eventMachine(EVENT_BANKED_SCORE);
    }


    render()
    {
        let red = this.nextRollFree === true ? 'bRollRed' : '';
        let bankGameOver = this.gameOverHappened === true ? 'divBankElementGameOver' : '';
        return(
            <div id='gridWrapper'>
				<div id='divDiceController'>
                    <div id='divGameButton'>
                        <GameButton
                            callback={this.onGameButtonClick}
                            className={'bRoll ' + red}
                            label={this.state.gameButtonLabel}
                            isDisabled={!this.state.gameButtonEnabled}/>
                    </div>
                    <DiceController 
                        onDiceToBankEvent={this.onDiceToBankEvent} 
                        onRef={ref => {this.diceController = ref}}/>
                </div>
				<div id='divBank'>
                    <div id='divBankHeader'><div>BANK</div></div>
                    <div id='divBankButtonElement'>
                        <BankButton
                            callback={this.onBankButtonClick}
                            className={'btnBank'}
                            label={this.state.bankButtonLabel}
                            isDisabled={!this.state.bankButtonEnabled}/>
                    </div>
                    <div id='divBankElement' className={bankGameOver}>
                        <Bank 
                            onRef={ref => {this.bank = ref}}
                            freeRollCallback={this.onFreeRollCallback} />
                    </div>
                </div>
				<div id='divScoresheet'>
				    <div id='divScoreHeader'>SCORE</div>
                    <Scoresheet 
                        onRef={ref => {this.scoresheet = ref}}/>
                </div>
            </div>
        );
    }
    
}



