import React, { Component } from "react";
import { connect } from "react-redux";

import classNames from "classnames/bind";
import styles from "./News.module.scss";
const cx = classNames.bind(styles);

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {};

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.language !== this.props.language) {
    }
  };

  render() {
    return <>NEws</>;
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(News);
