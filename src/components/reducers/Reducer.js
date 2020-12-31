const Reducer=(state= {show:false},action)=>
{
    switch(action.type)
    {
        case "toggle":
            return(
               {show:action.payload.show}
            )
        
        default:
            return(
                state
            )
    }

}
export default Reducer;