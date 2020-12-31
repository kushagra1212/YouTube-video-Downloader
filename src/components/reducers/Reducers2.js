const initialstate=[]

const Reducer2=(state=initialstate,action)=>
{
    switch(action.type)
    {
        case 'ADD':
            return(
            [...state,action.payload.progress]
            )
        case "UPDATE":
            state.pop()
            return([...state,action.payload.progress])    
        default :
        return (state)
    }
}
export default Reducer2;