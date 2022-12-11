import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneFlip,
  faEnvelope,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";

import "./Invoice.scss";

class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Mount
  componentDidMount = async () => {};

  // Trước khi chết
  componentWillUnmount = () => {};

  // Update
  componentDidUpdate = async (prevProps, prevState) => {};

  render() {
    let { islogin, permission, avatar } = this.props.dataUser;

    return (
      <div className="grid">
        <div className="grid wide">
          <div className="row">Thông tin đơn hàng</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    dataUser: state.app.loginUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
