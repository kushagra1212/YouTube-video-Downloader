import React, { Component,createRef} from "react";
import Styles from "./Item.module.css";
import axios from "axios";
import Search from "./Search";
import List from "./List";
import Downloader from './Downloader'
const key=process.env.REACT_APP_KEY
const maxresult = 4;
class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      things: "Loading...",
      videoList: [],
      toggle: "Show",
      video: {},
      description: ``,
      text: "covid 19 news",
      title: "",
      notwork:false,
      called:false
   
    };
    this.goup =createRef();
  }
  youtube = async () => {
    await axios
      .get(`https://www.googleapis.com/youtube/v3/search`, {
        params: {
          part: "snippet",
          key: key,
          type: "video",
          q: this.state.text,
          maxResults: maxresult,
          controls: 1,
        },
      })
      .then((res) => {
        console.log(res.data.items[0])
        this.setState({ video: res.data.items[0], things: "" });
        this.setState({ title: res.data.items[0].snippet.title });
        this.setState({ videoList: [] });
        this.setState({called:true})
        res.data.items.map((ele) => {
          this.setState({ videoList: [...this.state.videoList, ele] });
          return null;
        });

        return res.data;
      })
      .catch((err) =>{ console.log(err);
      this.setState({notwork:true})
      });
  };

  componentDidMount() {
  this.youtube();
    
  
          
  }
  show = () => {
    if (this.state.things === "Loading...") {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <iframe
            title={this.state.video.id.videoId}
            width="50%"
            height="400"
            src={`https://www.youtube.com/embed/${this.state.video.id.videoId}`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
         
        </div>
      );
    }
  };
  showit = () => {
    if (this.state.toggle === "Show") {
      this.setState({ toggle: "Hide" });
      this.setState({ description: this.state.video.snippet.description });
    } else {
      this.setState({ toggle: "Show" });
      this.setState({ description: `` });
    }
  };
  butclickhandel = () => {
    this.showit();
  };
  searchhanddler = (tfs) => {
    if (tfs) {
      this.setState({ text: tfs }, () => {
        this.youtube();
      });
      console.log(this.state.videoList);
    } else if (tfs === "") {
      console.log("please write something");
    }
  };
  setselectedvideo = (singlevideo) => {

    this.setState({ video: singlevideo, title: singlevideo.snippet.title });
    this.goup.scrollIntoView({behavior:"smooth"})
  };

  render() {
    return (
      <>
     {!this.state.notwork? <div>
        <Search  searchhanddler={(tfs) => this.searchhanddler(tfs)} />

        <div ref={ref=>this.goup=ref} id={Styles.mainvideodiv}>
          <div id={Styles.mainvideo}> {this.show()} </div>
          <h2 id={Styles.mainvideotitle}>{this.state.title} </h2>
          <div id={Styles.maindescription}>
            <button
              id={Styles.mainvideodescriptionbut}
              onClick={this.butclickhandel.bind(this)}
            >{`${this.state.toggle} description`}</button>
            <p id={Styles.mainvideodescription}>
              {this.state.description}
              
              <br />
            </p>
            <button onClick={()=>this.setState({notwork:true})} id={Styles.downloadbut}>Download</button>
           
          
            
          </div>
        </div>
        <div>
          {this.state.videoList[maxresult - 1] ? (
            <List
              getthevideo={this.setselectedvideo}
              videolist={this.state.videoList}
            />
          ) : null}
        </div>
      </div>: <Downloader toptext={this.state.called?"URL has been selected":"Enter YouTube Video URL"}  videoid={this.state.called?this.state.video.id.videoId:""}   />}
     
      </>
    );
  }
}
export default Item;
