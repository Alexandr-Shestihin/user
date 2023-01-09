import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import reducers from '../reducers';
import thunk from 'redux-thunk';

const store = createStore(
    reducers,
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
        ? composeWithDevTools(applyMiddleware(thunk))
        : applyMiddleware(thunk)
);

export type RootState = ReturnType<typeof reducers>;
export default store;