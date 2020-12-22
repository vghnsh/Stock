export const initialState = {
    data:[],
};

function reducer(state,action){
    console.log(action);
    switch(action.type){

        case "UPDATE_STOCKS":
            let newStock = state.data;
            
            const index = state.data.findIndex((data)=> data.name === action.data.name);
            function status(){
                if(state.data[index].price < action.data.price){
                    return 'high';
                }
                else{
                    return 'low';
                }
            }
            if(index >= 0){
                    newStock.splice(index,1,{
                        name:action.data.name ,
                        price:action.data.price,
                        status:status(),
                        time:action.data.time
                    } );
            }
            else{
                return{
                    ...state,
                    data:[...state.data,action.data]
                }
            }
            return{
                ...state
            };
        default:
            return state;
    }
}

export default reducer;