import { createStore, applyMiddleware, combineReducers } from 'redux';

const
    ReduxThunk = require ("redux-thunk").default,
    AppReducer = require ("./App/AppReducer");


module.exports = createStore(combineReducers({
    app: AppReducer
}), applyMiddleware(ReduxThunk))