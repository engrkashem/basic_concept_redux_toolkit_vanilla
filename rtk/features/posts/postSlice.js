const {createSlice, createAsyncThunk} = require('@reduxjs/toolkit');
const fetch = require('node-fetch');

// initial state
const initialState = {
    loading:false,
    posts:[],
    error:'',
};

// create async thunk
const fetchPosts = createAsyncThunk("posts/fetchPosts", async()=>{
    try{
        
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
        const posts= await response.json();

        return posts;

    }catch(err){

    }
});

// create slice
const postSlice = createSlice({
    name:"posts",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchPosts.pending, (state, action)=>{
            state.loading=true;
            state.error='';
        });

        builder.addCase(fetchPosts.fulfilled, (state, action)=>{
            state.loading=false;
            state.posts=action.payload;
            state.error='';
        });

        builder.addCase(fetchPosts.rejected, (state, action)=>{
            state.loading=false;
            state.posts=[];
            state.error=action.error.message;
        });
    },
});

module.exports = postSlice.reducer;
module.exports.fetchPosts = fetchPosts;