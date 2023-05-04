import React from 'react';
import { simpleNumber } from '../utitls/getSingleNumber';
import Styles from './List.module.css';

const List = ({ videolists, getthevideo }) => {
  const selectionhandle = (ele) => {
    getthevideo(ele);
  };
  return (
    <div id={Styles.mainlistdiv}>
      {videolists.map((ele, id) => {
        let videotitle = ele.title;

        return (
          <div
            onClick={() => selectionhandle(ele)}
            key={id}
            id={Styles.eachlistdiv}
          >
            <img
              id={Styles.eachlistimg}
              src={ele.thumbnails[0].url}
              alt="hello"
            />
            {videotitle === '/static/media/MessagePreloader.4e51e83e.gif' ? (
              <img
                alt="not found"
                width="100%"
                height="50px"
                src={videotitle}
              />
            ) : (
              <>
                <h3>{videotitle}</h3>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ opacity: '0.5' }}>
                    <strong>{simpleNumber(ele.views, 0)}</strong> {' views'}
                  </div>
                  <div> {ele.uploadedAt}</div>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default List;
