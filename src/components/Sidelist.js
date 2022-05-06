

import Styles from "./Sidelist.module.css";
import { useDispatch, useSelector, } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
   import { useEffect } from "react/cjs/react.production.min";
import { faCircleArrowDown} from "@fortawesome/free-solid-svg-icons";

const Sidelist = () => {

  let show = useSelector((state) => state.Reducer.show);
  let progress = useSelector((state) => state.Reducer2);

  const dispatch = useDispatch();

  return (
    <>
      <div>
        {!show?<button
          onClick={() => dispatch({ type: "toggle", payload: { show: true } })}
          className={Styles.sidelist}
        >
         
      <FontAwesomeIcon  size="3x" icon={faCircleArrowDown} />
        </button>:null}
        {show ? (
      <>
        <div onClick={() => dispatch({ type: "toggle", payload: { show: false } })} className={Styles.maindiv1}>
          
          </div>
            <div className={Styles.listdiv1}>
             {!progress.length>0?<h3> Nothing is on download</h3>:null}
            {progress.slice(0).reverse().map((ele, id) => {
              console.log(ele)
              if (ele.total.value) {
                return (
                  <div className={Styles.item} style={ele.t==="Downloading Cancelled"?{backgroundColor:"#d81b60"}:{}} key={id}>
                   <div className={Styles.title} style={ele.t==="Downloading Cancelled"?{backgroundColor:"#880e4f"}:{}}  > {ele.title}</div>
                   <h3>
                      {ele.p}% {ele.t}
                    </h3>
                    <h4>
                      Total Size : {ele.total.value} {ele.total.unit}
                    </h4>
                    {(ele.p<100 && ele.t==="Downloading Completed")?<button className={Styles.cancelbut} onClick={()=>{ele.canceldownloadhandle();}}  >cancel</button>:null}
                  </div>
                );
              }
              return null;
            })}
          </div></>
        ) : (
        null
        )}
      </div>
    </>
  );
};
export default Sidelist;
