import { useEffect, useState } from 'react';

import Styles from './Downloader.module.css';
import { faCircleArrowDown, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const windowWidth = document.documentElement.clientWidth || window.innerWidth;

const url = process.env._REACT_APP_BACKEND_URL;

const DownloadUI = ({
  videoUrl,
  videoType,
  videoWidth,
  videoHeight,
  videotitle,
}) => {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadedBlob, setDownloadedBlob] = useState(null);
  const [downloadError, setDownloadError] = useState(null);

  const handleDownload = () => {
    setIsDownloading(true);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', videoUrl, true);
    xhr.responseType = 'blob';

    xhr.onload = () => {
      if (xhr.status === 200) {
        const blob = xhr.response;
        setDownloadedBlob(blob);
      } else {
        setDownloadError(new Error(`Failed to download video (${xhr.status})`));
      }
    };

    xhr.onprogress = (event) => {
      const { loaded, total } = event;
      const progress = Math.round((loaded / total) * 100);
      setDownloadProgress(progress);
    };

    xhr.send();
  };

  const handleCancelDownload = () => {
    if (isDownloading) {
      setDownloadError(new Error('Download canceled by user'));
    }
  };

  useEffect(() => {
    if (downloadedBlob) {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(downloadedBlob);
      link.download = `${videotitle}.${videoType.split('/')[1]}`;
      link.click();
      setIsDownloading(false);
    }
  }, [downloadedBlob, videoType]);

  useEffect(() => {
    if (downloadError) {
      console.error(downloadError);
      setIsDownloading(false);
    }
  }, [downloadError]);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {isDownloading ? (
        <>
          <div
            style={{
              width: '100%',
              height: '20px',
              backgroundColor: 'lightgray',
              borderRadius: '5px',
              overflow: 'hidden',
              marginBottom: '10px',
            }}
          >
            <div
              style={{
                width: `${downloadProgress}%`,
                height: '20px',
                backgroundColor: 'green',
                borderRadius: '5px',
              }}
            >
              <span style={{ color: 'white', marginLeft: '5px' }}>
                {downloadProgress}%
              </span>
            </div>
          </div>
          <button
            style={{
              padding: '10px',
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
            }}
            onClick={handleCancelDownload}
          >
            Cancel Download
          </button>
        </>
      ) : (
        <button
          style={{
            padding: '10px',
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
          }}
          onClick={handleDownload}
        >
          Download
        </button>
      )}
      {downloadError && (
        <div
          style={{
            color: 'red',
            marginTop: '10px',
            fontSize: '14px',
            fontWeight: 'bold',
          }}
        >
          {downloadError.message}
        </div>
      )}
    </div>
  );
};
const Downloader = ({ videoid, toptext, videotitle, showdownloadhandle }) => {
  const [err, seterr] = useState({ err: false, select: '', videourl: '' });
  const [select, setselect] = useState('Select Format');
  const [videourl, setvideourl] = useState('');

  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (videoid) {
      setvideourl(`https://www.youtube.com/watch?v=${videoid}`);
    }
  }, [videoid]);

  const downloadhandle = async () => {
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
      let decodedurl = encodeURIComponent(videourl);
      const fileUrl = `${url}/download/${select}/${decodedurl}`;

      setselect('Select Format');
      setvideourl(fileUrl);
    }
  };

  return (
    <div className={Styles.maindiv}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
        }}
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
      {loading ? (
        <DownloadUI
          videoUrl={videourl}
          videoType="video/mp4"
          videoWidth={windowWidth}
          videoHeight={windowWidth}
          videotitle={videotitle}
        />
      ) : (
        <>
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

          <button onClick={downloadhandle} className={Styles.downloadbut}>
            Download <FontAwesomeIcon icon={faCircleArrowDown} />
          </button>
        </>
      )}
    </div>
  );
};
export default Downloader;
