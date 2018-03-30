import {
  createStore,
  compose,
  applyMiddleware,
} from 'redux';
import apiMiddleware from './utils/apiMiddleware';
// import apiMiddleware from 'redux-devise-axios';
import axios from 'axios';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';

const options = { axios };

const enhancers = compose(
  applyMiddleware(thunk, apiMiddleware(options))
  // ,
  // window.devToolsExtension ?
  //   window.devToolsExtension() : f => f
    // if you have other middle ware to add you add it here. (lecture tuesday 3/27 9:53 am)
)

const store = createStore(rootReducer, {}, enhancers);

if (module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index').default
    store.replaceReducer(nextRootReducer)
  })
}

export default store;