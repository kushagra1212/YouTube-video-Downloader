import React, { Component } from "react";

import Styles from "./Search.module.css";
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      searchhanddler: props.searchhanddler,
    };
  }

  handlechange = (e) => {
    this.setState({ text: e.target.value });
  };

  render() {
    return (
      <div id={Styles.searchdiv}>
        <input
          id={Styles.searchinput}
          value={this.state.text}
          onChange={(e) => this.handlechange(e)}
          placeholder="Search here"
        ></input>
        <button
          onClick={() => this.state.searchhanddler(this.state.text)}
          id={Styles.searchbut}
        >
          Search
        </button>
      </div>
    );
  }
}
export default Search;
