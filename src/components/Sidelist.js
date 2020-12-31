import { useEffect, useRef, useState } from "react";

import Styles from "./Sidelist.module.css";
import { useDispatch, useSelector } from "react-redux";
   

const Sidelist = () => {
  let show = useSelector((state) => state.Reducer.show);
  let progress = useSelector((state) => state.Reducer2);

  const dispatch = useDispatch();

  return (
    <>
      <div>
        <button
          onClick={() => dispatch({ type: "toggle", payload: { show: true } })}
          className={Styles.sidelist}
        >
          <img width="30px" height="30px" src="https://img2.pngio.com/filedownload-iconpng-wikimedia-commons-download-icon-png-875_875.png" />
        </button>
        {show ? (
          <div className={Styles.listdiv1}>
             {!progress.length>0?<h3> Downloading will be Shown here</h3>:null}
            {progress.slice(0).reverse().map((ele, id) => {
              if (ele.total.value) {
                return (
                  <div className={Styles.item} key={id}>
                   <div className={Styles.title}  > {ele.title}</div>
                    <h3>
                      {ele.p}% {ele.t}
                    </h3>
                    <h4>
                      Total Size : {ele.total.value} {ele.total.unit}
                    </h4>
                  </div>
                );
              }
            })}
          </div>
        ) : (
          <div className={Styles.listdiv2}></div>
        )}
      </div>
    </>
  );
};
export default Sidelist;
