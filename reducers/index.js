import { combineReducers } from 'redux';
import currentGame from './currentGame';
import user from './user';

const rootReducer = combineReducers({
  currentGame, // the , preverses the git history
  user,
  // currentGame: currentGame //because these match(the property and variable names), in ES6 we can just use the above line
})

export default rootReducer;