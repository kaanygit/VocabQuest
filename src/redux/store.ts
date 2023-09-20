import storage from "redux-persist/lib/storage"
import logger from 'redux-logger'
import { Middleware, combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import wordsReducers from './features/words/words.reducer'
import guessWordReducer from "./features/guessword/guess-word.reducer";
import { applyMiddleware, compose, createStore } from "redux";
import userReducer from "./features/currentuser/current-user.reducer";

const rootReducer=combineReducers({
    wordsReducers,
    guessWordReducer,
    userReducer
})

const persistConfig={
    key:"root",
    storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer);


declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}

const middleWares = [logger].filter((middleware): middleware is Middleware => Boolean(middleware));

const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composeEnhancers = composeEnhancer(applyMiddleware(...middleWares));

const store = createStore(persistedReducer, composeEnhancers);
const persistor = persistStore(store);


export { store, persistor };


export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;

