const {createStore}= require('redux');
const {produce}= require('immer');



// initial state
const initialState={
    name:"Kashem",
    address:{
        street:"40/8-Ka, Port Road",
        city:"Khulna",
        Country:"Bangladesh"
    }
}

// action creator
const updateStreet=(street)=>{
    return{
        type:'street_updated',
        payload:street,
    }
}

// reducer
const reducer = (state=initialState, action)=>{
    switch (action.type) {
        case "street_updated":
            
            /*
             return {
                ...state,
                address:{
                    ...state.address,
                    street:action.payload,
                }
            };
             */
            return produce(state, (draftState)=>{
                draftState.address.street=action.payload
            })

    
        default:
            return state;
    }
}

// store
const store = createStore(reducer);

// subscribe
store.subscribe(()=>{
    console.log(store.getState());
});

console.log(store.getState())

// actions dispatch
store.dispatch(updateStreet('Sonadanga'))