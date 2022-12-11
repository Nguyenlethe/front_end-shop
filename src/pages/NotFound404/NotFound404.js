import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SwitchLanguage from "../../SwitchLanguage";
import { path } from "../../utils/constant";

import classNames from "classnames/bind";
import styles from "./NotFound404.module.scss";
const cx = classNames.bind(styles);

class NotFound404 extends Component {
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
    return (
      <div className={cx("not-found")}>
        <h1>
          <SwitchLanguage id="app.found.heading" />
        </h1>

        <p className={cx("zoom-area")}>
          <SwitchLanguage id="app.found.sub" />
        </p>

        <section className={cx("error-container")}>
          <span className={cx("four")}>
            {" "}
            <span className={cx("screen-reader-text")}>4</span>
          </span>
          <span className={cx("zero")}>
            {" "}
            <span className={cx("screen-reader-text")}>0</span>
          </span>
          <span className={cx("four")}>
            {" "}
            <span className={cx("screen-reader-text")}>4</span>
          </span>
        </section>

        <p className={cx("found-text")}>Not Found</p>

        <div className={cx("link-container")}>
          <span>
            <Link to={path.HOMEPAGE} className={cx("more-link")}>
              <SwitchLanguage id="app.found.back" />
            </Link>
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(NotFound404);
