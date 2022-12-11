import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import "./Modal.scss";

class ModalLoad extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {};
  }

  render() {
    let { isShow } = this.props;
    return (
      <>
        {isShow ? (
          <div id="Modal">
            <FontAwesomeIcon icon={faSpinner} />
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalLoad);
