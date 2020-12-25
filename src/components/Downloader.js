
import { useEffect, useState } from 'react';
import axios from 'axios'

import Styles from './Downloader.module.css'
import fileDownload from 'js-file-download';

const url="https://youtube-downloader11.herokuapp.com";
const Downloader=({videoid,toptext,showdownloadhandle})=>{
    const [err,seterr]=useState({err:false,select:'',videourl:''});
const [select,setselect]=useState('Select Format');
const [videourl,setvideourl]=useState('');
const [loading,setloading]=useState(false);

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
            await axios.get(`${url}/download2`,{responseType:'blob'}).then((res)=>{
                if(!res.data.message){
                    console.log(res.data)
                    setloading(false)
                    console.log(fileDownload)
                fileDownload(res.data,'video.mp4')
             }
            else{
                console.log(res.data.message)
            }}
                );
            
        }).catch((err)=>{
            seterr({...err,err:true,select:'',videourl:'url is invalid'})
        })
    
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
         {loading?<h4>downloading ...
         </h4>:null}
        </div>
        </>
    )
}
export default Downloader;