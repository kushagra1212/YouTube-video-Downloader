import React, { Component } from 'react';
import Styles from  './Item.module.css';
import axios from 'axios';
import Search from './Search';
import List from './List';
import ourContext from './Context'
class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            things:"Loading...",
            videoList: [],
            toggle:"Show",
            video:{},
            description:``,
            text:"",
            title:""

        }}
        youtube=async()=>
        {
            
        const data= await axios.get(`https://www.googleapis.com/youtube/v3/search`,{
            params:{
                part:"snippet",
                key:"AIzaSyCranKkgzC8Bui0dlSL3LhSeZ8dcnMwAmA",
                type:"video",
                q:this.state.text,
                maxResults:3
            }}).then((res) => {

        
            this.setState({video:res.data.items[0],things:""});
                this.setState({title:res.data.items[0].snippet.title})
            res.data.items.map(ele=>{
                
                this.setState({videoList:[...this.state.videoList,ele]});
                return null;
            });
            console.log(this.state.videoList)

           
            return (res.data);
        }).catch(err => console.log(err));
        }
    
    






componentDidMount()
{


//this.youtube();


}
show = () => {
    
   

    
    if (this.state.things==="Loading...")
    {
        return <div>Loading...</div>
    } 
        
    else {
        return (

            <div>

                <iframe title={this.state.video.id.videoId} width="50%" height="400" src={`https://www.youtube.com/embed/${this.state.video.id.videoId}`} frameBorder="0" allowFullScreen >
                </iframe>
                <h1>

                </h1>
            </div>



        )

    }



}
showit=()=>
               {
            
                if(this.state.toggle==="Show")
                {
                    
                
                        this.setState({toggle:"Hide"});
                this.setState({description:this.state.video.snippet.description})
                }
                else{
                    
                    this.setState({toggle:"Show"});
                    this.setState({description:``});
                    
                }
        
               

                
            }        
butclickhandel=()=>
{

    
    this.showit();

}
searchhanddler=(tfs)=>
{
    
   
    if(tfs)
        {
  this.setState({text:tfs},()=>
  {
    this.setState({videoList:[]})
    this.youtube();
    
  });
  







    }
    else if(tfs==="")
    {
        console.log("please write something");
    }


}
setselectedvideo=(singlevideo)=>
{
    this.setState({video:singlevideo,title:this.state.video.snippet.title});


}

render()
{
    
        return (
        
        
        <div>
<Search searchhanddler={(tfs)=>this.searchhanddler(tfs)}/>

        <div id={Styles.mainvideodiv}>
            
            <div id={Styles.mainvideo}> { this.show()} </div>
           <h2 id={Styles.mainvideotitle}>{this.state.title} </h2>
           <div id={Styles.maindescription}>
    <button id={Styles.mainvideodescriptionbut} onClick={this.butclickhandel.bind(this)}>{`${this.state.toggle} description`}</button>
        <p id={Styles.mainvideodescription}>{this.state.description }<br/></p>
        
               
           </div>

        </div>
        <div>
       
        
        <List getthevideo={(singlevideo)=>this.setselectedvideo(singlevideo)} videolist={this.state.videoList}/>
        
       
        </div>
        </div>
        
    )
}

}
export default Item;