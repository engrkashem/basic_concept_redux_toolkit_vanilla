const configureStore = require("@reduxjs/toolkit").configureStore;
const counterReducer = require("../features/counter/counterSlice");
const dynamicCounterReducer = require("../features/dynamicCounter/dynamicCounterSlice");
const {createLogger}= require('redux-logger');

// my logger
const myLogger = createLogger();

// configure store
const store = configureStore({
    reducer:{
        counter:counterReducer,
        dynamicCounter:dynamicCounterReducer,
    },
    middleware: (getDefaultMiddlewares)=>getDefaultMiddlewares().concat(myLogger),
    
});

module.exports= store;