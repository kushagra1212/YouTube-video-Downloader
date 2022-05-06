const initialstate=[];

const Reducer2=(state=initialstate,action)=>
{
    switch(action.type)
    {
        case 'ADD':
            return(
            [...state,action.payload.progress]
            )
        case "UPDATE":
            let temp=[...state];
           let index= temp.findIndex((ele)=>ele.title===action.payload.progress.title);
           temp[index]=action.payload.progress;
            return(temp)    
        default :
        return (state)
    }
}
export default Reducer2;