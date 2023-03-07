import { useEffect, useState } from 'react';
import axios from 'axios';

import Styles from './Downloader.module.css';
import byteSize from 'byte-size';
import { useDispatch } from 'react-redux';
import { faCircleArrowDown, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const url = process.env.REACT_APP_BACKEND_URL;
const Downloader = ({ videoid, toptext, videotitle, showdownloadhandle }) => {
  const [err, seterr] = useState({ err: false, select: '', videourl: '' });
  const [select, setselect] = useState('Select Format');
  const [videourl, setvideourl] = useState('');
  const [loading, setloading] = useState(false);
  const [progress, setprogress] = useState({
    p: 0,
    t: 'Downloading Completed',
    total: { value: null, unit: null },
  });
  const [cancelthetoken, setcancelthetoken] = useState(
    axios.CancelToken.source()
  );

  let percentage = null;
  const dispatch = useDispatch();
  const canceldownloadhandle = () => {
    cancelthetoken.cancel();
    setprogress({ ...progress, t: 'Downloading Cancelled' });
    setcancelthetoken(axios.CancelToken.source());
    dispatch({
      type: 'UPDATE',
      payload: {
        progress: {
          ...progress,
          title: videotitle,
          t: 'Downloading Cancelled',
        },
      },
    });
  };
  useEffect(() => {
    if (videoid) {
      setvideourl(`https://www.youtube.com/watch?v=${videoid}`);
    }
  }, [videoid]);
  const downloadhandle = () => {
    if (!videourl) {
      seterr({
        ...err,
        err: true,
        videourl: 'video url cant be black',
        select: '',
      });
      return;
    }
    if (select === 'Select Format') {
      seterr({
        ...err,
        err: true,
        select: 'Please choose video format',
        videourl: '',
      });
      return;
    }

    if (videourl && select) {
      setloading(true);
      seterr({ ...err, err: false, select: '', videourl: '' });

      axios
        .post(`${url}/download`, {
          body: {
            videourl: videourl,
            videoquality: select,
          },
        })
        .then((results) => {
          dispatch({
            type: 'ADD',
            payload: {
              progress: {
                p: percentage,
                title: videotitle,
                t: 'Downloading Completed',
              },
            },
          });

          axios
            .get(`${url}/download2`, {
              responseType: 'blob',
              onDownloadProgress(progress) {
                percentage = Math.floor(
                  (progress.loaded * 100) / progress.total
                );

                setprogress({
                  p: percentage,
                  title: videotitle,
                  t: 'Downloading Completed',
                  total: byteSize(progress.total),
                  cancelthetoken: cancelthetoken.token,
                  canceldownloadhandle,
                });
                dispatch({
                  type: 'UPDATE',
                  payload: {
                    progress: {
                      p: percentage,
                      title: videotitle,
                      t: 'Downloading Completed',
                      total: byteSize(progress.total),
                      cancelthetoken: cancelthetoken.token,
                      canceldownloadhandle,
                    },
                  },
                });
              },
              cancelToken: cancelthetoken.token,
            })
            .then((res) => {
              if (!res.data.message) {
                const link = document.createElement('a');
                const myurl = window.webkitURL || window.URL;
                let b = new Blob([res.data]);

                const uRl = myurl.createObjectURL(b);

                //video.src=uRl;

                // video.play();

                link.href = uRl;
                link.setAttribute('download', `${videotitle}.mp4`); //or any other extension
                document.body.appendChild(link);
                link.click();
              } else {
                console.log(res.data.message);
              }
            });
        })
        .catch((err) => {
          seterr({ ...err, err: true, select: '', videourl: 'url is invalid' });
        });

      const video = document.createElement('video');
      video.setAttribute('preload', 'metadata');
      video.setAttribute('width', '320');
      video.setAttribute('height', '240');
      video.setAttribute('controls', 'controls');
      if (video.canPlayType('video/mp4')) {
        video.setAttribute('src', 'movie.mp4');
      } else {
        video.setAttribute('src', 'movie.ogg');
      }

      //document.body.appendChild(video)

      setselect('Select Format');
      setvideourl('');
    }
  };

  return (
    <>
      <div className={Styles.maindiv}>
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}
        >
          <button
            className={Styles.close}
            onClick={() => {
              showdownloadhandle();
            }}
          >
            <FontAwesomeIcon size="3x" icon={faClose} />
          </button>
        </div>
        <label>{toptext}</label>

        <div className={Styles.divofinput}>
          <input
            placeholder="Paste URL"
            value={videourl}
            onChange={(e) => setvideourl(e.target.value)}
            className={Styles.input}
            type="text"
          />
          <label>
            {err.err ? (
              <label style={{ color: 'red' }}>{err.videourl}</label>
            ) : null}
          </label>
          <select
            value={select}
            onChange={(e) => setselect(e.target.value)}
            className={Styles.select}
          >
            <option value="Select Format">Select Format</option>
            <option value="18">360p</option>
            <option value="135">480p</option>
            <option value="136">720p</option>
            <option value="137">1080p</option>
          </select>
          <label>
            {err.err ? (
              <label style={{ color: 'red' }}>{err.select}</label>
            ) : null}
          </label>
        </div>

        {loading ? (
          <div>
            {progress.p === 100 ? (
              <h4>Downloading Done</h4>
            ) : (
              <div>
                <h4>Downloading {progress.p}% Completed</h4>
                <h6>
                  {progress.total.value} {progress.total.unit}{' '}
                </h6>
                <button
                  onClick={() => {
                    canceldownloadhandle();
                    showdownloadhandle();
                  }}
                  className={Styles.canceldownloadbut}
                >
                  cancel downloading
                </button>
              </div>
            )}
          </div>
        ) : (
          <button onClick={downloadhandle} className={Styles.downloadbut}>
            Download <FontAwesomeIcon icon={faCircleArrowDown} />
          </button>
        )}
      </div>
    </>
  );
};
export default Downloader;
