import React from "react";
import Styles from "./List.module.css";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videolist: props.videolist,
    };
  }

  selectionhandle = (ele) => {
    this.props.getthevideo(ele);
  };
  render() {
    return (
      <div id={Styles.mainlistdiv}>
        {this.state.videolist.map((ele, id) => {
          const videoId = ele.id.videoId;

          const videotitle = ele.snippet.title;
          return (
            <div
              key={id}
              onClick={this.selectionhandle.bind(this, ele)}
              id={Styles.eachlistdiv}
            >
              <img
                id={Styles.eachlistimg}
                src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg
          `}
                alt="Thumbnail"
              ></img>
              <h3 id={Styles.eachlisttitle}>{videotitle} </h3>
            </div>
          );
        })}
      </div>
    );
  }
}
export default List;
