import React from "react";
import Styles from "./List.module.css";

const List=({videolists,notwork,getthevideo})=> {
  
  
  

  const selectionhandle = (ele) => {
    getthevideo(ele);
  };
 
    return (
   
     <div id={Styles.mainlistdiv}>
      
        {videolists.map((ele, id) => {
      

          let videotitle = ele.title;
   
          return (
        
            <div onClick={()=>selectionhandle(ele)} 
              key={id}
             
              id={Styles.eachlistdiv}
            >
              <img
                id={Styles.eachlistimg}
                src={ele.thumbnails[0].url}
                alt="hello"
              />
          {videotitle==='/static/media/MessagePreloader.4e51e83e.gif'?<img alt="not found" width="100%" height="50px" src={videotitle}  />:<h3>{videotitle}</h3>} 
        
            </div>
         
          );
        })}
      </div>

    );
  }

export default List;
/* {!this.state.notwork? <div id={Styles.mainlistdiv}>
        {this.state.videolist.map((ele, id) => {
          let videoId = ele.id.videoId;

          let videotitle = ele.snippet.title;
          return (
            <div
              key={id}
              onClick={this.selectionhandle.bind(this, ele)}
              id={Styles.eachlistdiv}
            >
              <img
                id={Styles.eachlistimg}
                src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg
          `}
                alt="Thumbnail"
              ></img>
              <h3 id={Styles.eachlisttitle}>{videotitle} </h3>
            </div>
          );
        })}
      </div>: */