const fetch = require('node-fetch');
const {createStore, applyMiddleware}= require('redux');
const thunkMiddleware = require('redux-thunk');


// initial state
const initialState={
    loading:false,
    posts:[],
    error:'',
}

// action creators
const fetchPostsRequested =()=>{
    return {
        type:"posts/requested"
    }
};

const fetchPostsSucceeded =(posts)=>{
    return {
        type:"posts/succeeded",
        payload:posts,
    }
};

const fetchPostsFailed =(error)=>{
    return {
        type:"posts/failed",
        payload:error,
    }
};

// reducer
const reducer=(state=initialState, action)=>{
    switch (action.type) {
        case "posts/requested":
            return{
                ...state,
                loading:true,
                error:'',
            };

        case "posts/succeeded":
            return{
                ...state,
                loading:false,
                posts:action.payload,
                error:'',
            };

        case "posts/failed":
            return{
                ...state,
                loading:false,
                posts:[],
                error:action.payload.message,
            };

        default:
            return state;
    }
}

// thunk function
const fetchPosts=()=>{
    return async(dispatch)=>{
        // making loading true
        dispatch(fetchPostsRequested());

        // fetch data from db
        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
            const posts= await response.json();

            dispatch(fetchPostsSucceeded(posts));
        }catch(err){

            dispatch(fetchPostsFailed(err));
        }


    }
};

// create store
const store = createStore(reducer, applyMiddleware(thunkMiddleware.default))

// subscribe to state change
store.subscribe(()=>{
    console.log(store.getState());
});

// dispatch action
store.dispatch(fetchPosts())