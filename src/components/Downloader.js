import { useEffect, useState } from 'react';

import Styles from './Downloader.module.css';
import { faCircleArrowDown, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const windowWidth = document.documentElement.clientWidth || window.innerWidth;

const url = process.env.REACT_APP_BACKEND_URL;

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
      let link = document.createElement('a');
      link.href = fileUrl;
      link.download = videotitle;
      link.click();

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
    </div>
  );
};
export default Downloader;
