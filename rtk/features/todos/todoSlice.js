const {createSlice, createAsyncThunk}=require('@reduxjs/toolkit');
const fetch = require('node-fetch');

// initial state
const initialState={
    loading:false,
    todos:[],
    errors:"",
};

// create async thunk
const fetchTodos=createAsyncThunk('todos/fetchTodos', async()=>{
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
    const todos = await response.json();

    return todos;
});

// create slice
const todoSlice = createSlice({
    name:"todos",
    initialState,
    extraReducers:(builder)=>{

        builder.addCase(fetchTodos.pending, (state, action)=>{
            state.loading = true;
            state.errors = "";
        });

        builder.addCase(fetchTodos.fulfilled, (state, action)=>{
            state.loading = false;
            state.errors = "",
            state.todos = action.payload;
        });

        builder.addCase(fetchTodos.rejected, (state, action)=>{
            state.loading = false;
            state.errors = action.error.message;
            state.todos = [];
        });
    },
});

module.exports = todoSlice.reducer;
module.exports.fetchTodos = fetchTodos;