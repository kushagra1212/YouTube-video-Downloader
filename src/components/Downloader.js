
import { useEffect, useState } from 'react';
import axios from 'axios'

import Styles from './Downloader.module.css'
import fileDownload from 'js-file-download';

const url=process.env.REACT_APP_UrL;
const Downloader=({videoid,toptext})=>{
    const [err,seterr]=useState({err:false,select:'',videourl:''});
const [select,setselect]=useState('Select Format');
const [videourl,setvideourl]=useState('');

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
     
        </div>
        </>
    )
}
export default Downloader;