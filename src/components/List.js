
import React from 'react'
import Styles from './List.module.css';

class List extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            videolist:props.videolist,
    
            getthevideo:props.getthevideo
        }
    }
selectedvideo=(singlevideo)=>
{
    
     
    this.state.gethevideo(singlevideo);
}

render()
{
        return(
            <div id={Styles.mainlistdiv}>
                {  
                this.state.videolist.map((ele)=>{
                    const videoId=ele.id.videoId;
                    
                    const videotitle=ele.snippet.title;
                    return(
                       
                <div id={Styles.eachlistdiv} onCLick={(ele)=>this.selectedvideo(ele)}>
                    <img id={Styles.eachlistimg} src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg
          `} alt="Thumbnail"></img>
                    <h3 id={Styles.eachlisttitle}>{videotitle} </h3>
               
               
                </div>
          
          
           
                    )

           
                })}
        
        </div>
        )
    

}
    
        
    
  
    
}
export default List;
