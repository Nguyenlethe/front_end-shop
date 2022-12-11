import React, { Component } from "react";
import { connect } from "react-redux";
import DefaultLayout from "../DefaultLayout";
import RoutesMenu from "../DefaultLayout/Navbar/RoutesMenu";

import "./ProfileLayout.scss";

class ProfileLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Mount
  componentDidMount = async () => {};

  // Trước khi chết
  componentWillUnmount = () => {};

  // Update
  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.language !== this.props.language) {
    }
  };

  render() {
    let { islogin, permission, avatar } = this.props.dataUser;
    let { children } = this.props;

    return (
      <DefaultLayout>
        <div className="grid">
          <div className="grid wide">
            <div className="row">
              <div className="col l-3">
                <RoutesMenu isShowMenu={true} isNotMenu={true} />
              </div>

              <div className="col l-9">{children}</div>
            </div>
          </div>
        </div>
      </DefaultLayout>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileLayout);
