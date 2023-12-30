const store = require('./app/store');
const {counterActions} = require('./features/counter/counterSlice');
const {dynamicCounterActions} = require('./features/dynamicCounter/dynamicCounterSlice');
const {fetchPosts} = require('./features/posts/postSlice');
const {fetchTodos} = require('./features/todos/todoSlice');


// initial state
// console.log(`initial state: ${JSON.stringify(store.getState())}`);

// subscribe to state changes
store.subscribe(()=>{
    // console.log(store.getState());
});

// dispatch actions

store.dispatch(fetchTodos());
// store.dispatch(fetchPosts());

// normal counter
// store.dispatch(counterActions.increment());
// store.dispatch(counterActions.increment());
// store.dispatch(counterActions.decrement());

// dynamic counter
// store.dispatch(dynamicCounterActions.increment(2));
// store.dispatch(dynamicCounterActions.increment(3));
// store.dispatch(dynamicCounterActions.decrement(1));