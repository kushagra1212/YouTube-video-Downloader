
import { useEffect, useState } from 'react';
import axios from 'axios'

import Styles from './Downloader.module.css'


const url="https://youtube-downloader11.herokuapp.com";
const Downloader=({videoid,toptext,videotitle,showdownloadhandle})=>{
    const [err,seterr]=useState({err:false,select:'',videourl:''});
const [select,setselect]=useState('Select Format');
const [videourl,setvideourl]=useState('');
const [loading,setloading]=useState(false);
const [progress,setprogress]=useState({p:0,t:''})

let percentage=null;

 useEffect(()=>{
if(videoid)
{
    setvideourl(`https://www.youtube.com/watch?v=${videoid}`);
}
 },[videoid])
const downloadhandle=async()=>{
    if(!videourl)
    {
        seterr({...err,err:true,videourl:'video url cant be black',select:''})
        return;
    }
    if(select==='Select Format')
    {
        seterr({...err,err:true,select:'Please choose video format',videourl:''})
        return;
    }
   
    if(videourl && select)
    {
        setloading(true);
        seterr({...err,err:false,select:'',videourl:''})

        await axios.post(`${url}/download`,{
            body:{
                videourl:videourl,
                videoquality:select

            }
        }).then(async(results)=>{

            console.log(results);
            
    axios.get(`${url}/download2`,{responseType:'blob',onDownloadProgress(progress){
        percentage=Math.floor((progress.loaded*100)/progress.total);
        console.log(progress);
         setprogress({p:percentage,t:'Downloading completed'});
         
      }}).then((res)=>{
  
                  
              if(!res.data.message){
                  console.log(res)
                  const link = document.createElement("a");
                  const myurl=window.webkitURL||window.URL;
                  let b=new Blob([res.data])
                
                  const uRl = myurl.createObjectURL(b);
                 
                  //video.src=uRl;
                  
              
                 // video.play();
                 
                  
                
                 
                 link.href = uRl;
                  link.setAttribute("download", `${videotitle}.mp4`); //or any other extension
                  document.body.appendChild(link);
                  link.click();
              
           }
          else{
              console.log(res.data.message)
          }}
      ); 
           
            
        }).catch((err)=>{
            seterr({...err,err:true,select:'',videourl:'url is invalid'})
        })
      
       
        const video=document.createElement('video');
        video.setAttribute('preload','metadata')
        video.setAttribute("width", "320");
        video.setAttribute("height", "240");
        video.setAttribute("controls", "controls");
        if (video.canPlayType("video/mp4")) {
            video.setAttribute("src","movie.mp4");
        } else {
            video.setAttribute("src","movie.ogg");
        }
       
        //document.body.appendChild(video)
       
    
    
    
        setselect('Select Format')
        setvideourl('')
        console.log("downloading")
        return;
    }
}

    return (
        <>
        <div  className={Styles.maindiv}   >
        <label>{toptext}</label>
        <div className={Styles.divofinput}>
        <button className={Styles.close}  onClick={()=>showdownloadhandle()} >X</button>
        <input placeholder="Enter URL" value={videourl} onChange={e=>setvideourl(e.target.value)} className={Styles.input} type="text"   />
       <label>{err.err?<label style={{color:"red"}} >{err.videourl}</label>:null}</label> 
        <select value={select} onChange={(e)=>setselect(e.target.value)} className={Styles.select}>
            <option value='Select Format'>Select Format</option>
            <option value="18">360p</option>
            <option value="135" >480p</option>
            <option  value="136"  >720p</option>
            <option value="137"  >1080p</option>
        </select>
        <label>{err.err?<label style={{color:"red"}} >{err.select}</label>:null}</label>
       </div>
        <button onClick={downloadhandle} className={Styles.downloadbut}>Download</button>
         {loading?<h4>{progress.p===100?<h4>Downloading Done</h4>:<h4>Downloading {progress.p}% Completed</h4>}
         </h4>:null}
        </div>
        </>
    )
}
export default Downloader;