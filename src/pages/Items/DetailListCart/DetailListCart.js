import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ListItemsSearch from "../../../components/Items/ListItemsSearch";
import NumberPage from "../../../components/Items/NumberPage/NumberPage";
import withRouter from "../../../routes/withRouter";
import appService from "../../../services/appService";
import SwitchLanguage from "../../../SwitchLanguage";
import { ITEMS } from "../../../utils/constant";
import NavBar from "../../../layouts/DefaultLayout/Navbar/NavBar";
import { languages, path, SEARCH } from "../../../utils/constant";
import img from "../../../assets/image/LOGOO.png";
import DefaultLayout from "../../../layouts/DefaultLayout/DefaultLayout";

import "./DetailListCart.scss";
import InputSearchNav from "../../../components/SearchInput/InputSearchNav";
class DetailListCart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Mount
  componentDidMount = async () => {};

  // Update
  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.language !== this.props.language) {
    }
  };

  render() {
    let {} = this.state;

    return (
      <>
        <DefaultLayout isCartPage={true} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailListCart)
);
