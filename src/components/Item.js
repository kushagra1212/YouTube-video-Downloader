import React, { Component, createRef } from 'react';
import Styles from './Item.module.css';
import axios from 'axios';
import Search from './Search';
import List from './List';
import Sidelist from './Sidelist';
import Downloader from './Downloader';
import thumbnailload from '../images/Loading_icon.gif';
import titleload from '../images/MessagePreloader.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons';
import { simpleNumber } from '../utitls/getSingleNumber';
import { connect } from 'react-redux';
const url = process.env.REACT_APP_BACKEND_URL;
const key = process.env.REACT_APP_KEY;
const maxresult = 10;
const getTheInitalVideoList = (length) => {
  let videoList = [];
  for (let i = 0; i < length; i++) {
    videoList.push({ title: titleload, thumbnails: [{ url: thumbnailload }] });
  }
  return videoList;
};
class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      things: 'Loading...',
      videoList: getTheInitalVideoList(10),
      toggle: 'Show',
      video: {},
      description: ``,
      text: 'covid',
      title: '',
      called: false,
      showdownload: false,
      show: this.props,
      uploadedAt: '',
      authorName: '',
      authorAvatar: '',
      views: '',
    };
    this.goup = createRef();
    this.newref = createRef();
    this.checkit = this.checkit.bind(this);
  }
  youtube = async () => {
    this.setState({
      videoList: getTheInitalVideoList(10),
    });

    this.setState({ things: 'Loading...' });
    this.setState({ title: '' });

    axios
      .get(`${url}/search/${this.state.text}/${maxresult}`)
      .then((res) => {
        //  (res.data);
        this.setState({
          things: '',
          video: res.data.items[2],
          title: res.data.items[2].title,
          authorName: res.data.items[2].author.name,
          authorAvatar: res.data.items[2].author.avatars[0].url,
          views: simpleNumber(res.data.items[2].views, 0),
          uploadedAt: res.data.items[2].uploadedAt,
          videoList: [],
          called: true,
        });
        res.data.items.map((ele, id) => {
          if (ele.type === 'video' && id !== 2) {
            this.setState({ videoList: [...this.state.videoList, ele] });
          }
          return null;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.youtube();

    this.setState({ showdownload: false });
  }
  show = () => {
    if (this.state.things === 'Loading...') {
      return (
        <img
          src={thumbnailload}
          width="100%"
          height="100%"
          alt="NaN"
          frameBorder="0"
        />
      );
    } else {
      return (
        <div>
          <iframe
            title={this.state.video.title}
            width="50%"
            height="400"
            src={`https://www.youtube.com/embed/${this.state.video.id}`}
            allowFullScreen
          ></iframe>
        </div>
      );
    }
  };
  showit = () => {
    if (this.state.toggle === 'Show') {
      this.setState({ toggle: 'Hide' });
      this.setState({ description: this.state.video.description });
    } else {
      this.setState({ toggle: 'Show' });
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
    } else if (tfs === '') {
      console.log('please write something');
    }
  };
  setselectedvideo = (singlevideo) => {
    if (this.state.toggle === 'Hide') this.showit();

    this.setState({ video: singlevideo, title: singlevideo.title });
    this.setState({
      authorName: singlevideo.author.name,
      authorAvatar: singlevideo.author.avatars[0].url,
      views: simpleNumber(singlevideo.views, 0),
      uploadedAt: singlevideo.uploadedAt,
    });
    this.goup.scrollIntoView({ behavior: 'smooth' });
  };

  showdownloadhandle = () => {
    this.setState({ showdownload: false });
  };
  checkit = (e) => {
    if (this.newref.current.contains(e.target)) {
      this.props.Dis();
    }
  };
  render() {
    let showdownload = this.state.showdownload;

    return (
      <>
        <div
          className={Styles.main}
          style={
            showdownload
              ? { pointerEvents: 'none' }
              : { pointerEvents: 'initial' }
          }
        >
          <div className={Styles.sidelist}>
            {' '}
            <Sidelist />
          </div>
          <div
            style={
              showdownload
                ? { pointerEvents: 'none' }
                : { pointerEvents: 'initial' }
            }
            onClick={(e) => this.checkit(e)}
            ref={this.newref}
          >
            <div>
              <Search searchhanddler={(tfs) => this.searchhanddler(tfs)} />
            </div>

            <div ref={(ref) => (this.goup = ref)} id={Styles.mainvideodiv}>
              <div id={Styles.mainvideo}> {this.show()} </div>
              <h2 id={Styles.mainvideotitle}>{this.state.title} </h2>
              {this.state.things === '' ? (
                <div id={Styles.maindescription}>
                  <div style={{ opacity: '0.5' }}>
                    <strong>{this.state.views}</strong> {' views'}
                  </div>
                  <div className={Styles.channelInfo}>
                    <img
                      width="100px"
                      height="100px"
                      src={this.state.authorAvatar}
                      alt=""
                    />
                    {this.state.authorName}
                  </div>

                  {this.state.uploadedAt}
                  <p id={Styles.mainvideodescription}>
                    {this.state.description}
                  </p>
                  <button
                    onClick={() => this.setState({ showdownload: true })}
                    id={Styles.downloadbut}
                  >
                    Download <FontAwesomeIcon icon={faCircleArrowDown} />
                  </button>
                </div>
              ) : null}
            </div>

            <List
              getthevideo={this.setselectedvideo}
              videolists={this.state.videoList}
            />
          </div>
        </div>
        <div>
          {this.state.showdownload ? (
            <Downloader
              showdownloadhandle={() => this.showdownloadhandle()}
              toptext={
                this.state.called
                  ? 'URL has been selected'
                  : 'Enter YouTube Video URL'
              }
              videotitle={this.state.video.title}
              videoid={this.state.called ? this.state.video.id : ''}
            />
          ) : null}
        </div>
      </>
    );
  }
}
const mapStateToProp = (state) => {
  return state.Reducer;
};
const mapDispatchToProps = (dispatch) => {
  return {
    Dis: () => {
      dispatch({ type: 'toggle', payload: { show: false } });
    },
  };
};

export default connect(mapStateToProp, mapDispatchToProps)(Item);
