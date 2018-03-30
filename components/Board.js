import React from 'react';
import Dice from './Dice';
import { Button, Body } from 'native-base'
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { rollDice, newGame, postScore } from '../actions/currentGame';
import { Grid, Col } from 'react-native-easy-grid';

const styles = {
  dice: {
    marginBottom: 5,
    marginTop: 5,
  },
  diceContainer: {
    margin: 20,
  },
}

class Board extends React.Component {
  state = { gameOver: false }

  calcScore = () => {
    let { scores } = this.props;
    return scores.reduce(( total, s ) => {
      return total + s.score
    }, 0)
  }

  checkEndGame = () => {
    let { scores } = this.props;
    let gameOver = true;
    scores.forEach( s => {
      if (s.score === null)
        gameOver = false;
    });

    if (gameOver && !this.state.gameOver) {
      let score = this.calcScore();
      this.props.dispatch(postScore(score))
      this.setState({ gameOver });
    }
  }

  newGame = () => {
    this.props.dispatch(newGame(() => { this.setState({ gameOver: false }); }));
  }

  renderButton = () => {
    let { roll, dispatch } = this.props;
    let maxRoll = roll === 3;
    let disabled = maxRoll ? { disabled: true } : {}
    let { gameOver } = this.state;
    if (gameOver) {
      return (
        <Button full onPress={this.newGame}>
          <Text>
            New Game?
          </Text>
        </Button>
       )
    } else {
      return (
        <Button
          full
          onPress={() => dispatch(rollDice())}
          {...disabled}
        >
          <Text>
            { maxRoll ? 'Score Roll' : 'Roll' }
          </Text>
        </Button>
      )
    }
  }

  renderDice = () => {
    let { roll, dice, keep, dispatch } = this.props;
    if (roll > 0) {
      return dice.map( (d, i) => {
        let kept = keep.includes(i);
        return (
          <Col style={styles.dice} key={i}>
            <Body>
              <Dice index={i} value={d} kept={kept} />
            </Body>
          </Col>
        )
      })
    }
  }

  render() {
    this.checkEndGame();

    return (
      <View>
        { this.renderButton() }
        <Grid style={styles.diceContainer}>
          { this.renderDice() }
        </Grid>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  let { dice, keep, roll, scores } = state.currentGame;
  return { dice, keep, roll, scores }
}

export default connect(mapStateToProps)(Board);