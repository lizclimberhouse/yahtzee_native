import React from 'react';
import ScoreSection from './ScoreSection';
import { Grid, Col } from 'react-native-easy-grid';
import { H1, View } from 'native-base';
import { connect } from 'react-redux';

const calcTotals = (scores) => {
  return scores.map( s => s.score )
    .reduce( (total, val) => {
      return total + val;
    }, 0)
}

const styles = {
  total: {
    alignSelf: "center",
    margin: 20,
  },
}

const ScoreCard = ({ currentGame: { scores } }) => (
  <View>
    <Grid>
      <Col>
        <ScoreSection label="Upper" />
      </Col>
      <Col>
        <ScoreSection label="Lower" />
      </Col>
    </Grid>
    <H1 style={styles.total}>{`TOTAL: ${calcTotals(scores)}`}</H1>
  </View>
)

const mapStateToProps = (state) => {
  return { currentGame: state.currentGame }
}


export default connect(mapStateToProps)(ScoreCard);