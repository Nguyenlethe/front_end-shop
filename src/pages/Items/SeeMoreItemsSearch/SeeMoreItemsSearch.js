import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ListItemsSearch from "../../../components/Items/ListItemsSearch";
import NumberPage from "../../../components/Items/NumberPage/NumberPage";
import withRouter from "../../../routes/withRouter";
import appService from "../../../services/appService";
import SwitchLanguage from "../../../SwitchLanguage";
import { ITEMS } from "../../../utils/constant";

import "./SeeMoreItemsSearch.scss";
class SeeMoreItemsSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSearchItemsParams: {
        idShop: "",
        category: "",
        type: "",
        language: "",
        value: "",
        limit: 0,
        page: 0,
      },
      value: "",
      numberItems: 0,
      arrayNumberPage: [],
      listDataItemsSearch: [],
    };
  }

  // Mount
  componentDidMount = async () => {
    this.handleGetOrSetItems();
  };

  // Update
  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.language !== this.props.language) {
    }

    if (prevProps.params !== this.props.params) {
      this.handleGetOrSetItems();
    }
  };

  // Handle get/Set data search
  handleGetOrSetItems = async () => {
    let idShop = this.props.params.get("idShop");
    let category = this.props.params.get("category");
    let type = this.props.params.get("type");
    let language = this.props.params.get("language");
    let value = this.props.params.get("value");
    let limit = this.props.params.get("limit");
    let page = this.props.params.get("page");

    let res = await appService.searchItemsNameNav({
      idShop: idShop,
      category: category,
      type: type,
      language: language,
      value: value,
      limit: limit,
      page: page,
    });

    if (res && res.data && res.data.errCode === 0 && res.data.data) {
      let dataLength = res.data.data.length;

      if (dataLength == 0 || dataLength == 1) {
        dataLength = res.data.count;
      }

      let numberItems = res.data.count / ITEMS.SEE_MORE_SHOW_ITEMS_SEARCH;

      numberItems = Math.round(numberItems);

      let arrayPage = [];
      for (let i = 1; i <= numberItems; i++) {
        arrayPage.push(i);
      }

      this.setState({
        arrayNumberPage: arrayPage,
        numberItems: res.data.count,
        listDataItemsSearch: res.data.data,
        value: value,
        dataSearchItemsParams: {
          idShop: idShop,
          category: category,
          type: type,
          language: language,
          value: value,
          limit: limit,
          page: page,
        },
      });
    }
  };

  render() {
    let { listDataItemsSearch, value, dataSearchItemsParams, arrayNumberPage } =
      this.state;

    return (
      <>
        <div className="grid wide">
          <div className="row">
            <div className="col l-12 title-seeMore-itemsSearch">
              <SwitchLanguage id="manageAdmin.items.resultShow" />
              <span style={{ color: "red" }}>"{value}"</span>
            </div>

            <div className="col l-12">
              <ListItemsSearch
                isHideFormDataOptionsSearch={true}
                dataSearchInput={listDataItemsSearch}
                isSeeMore={true}
                dataOptionsSearch={dataSearchItemsParams}
              />
            </div>

            <NumberPage
              dataSearchItemsParams={dataSearchItemsParams}
              value={value}
              limitSeeMore={ITEMS.SEE_MORE_SHOW_ITEMS_SEARCH}
              arrayNumberPage={arrayNumberPage}
              idShop
            />
          </div>
        </div>
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
  connect(mapStateToProps, mapDispatchToProps)(SeeMoreItemsSearch)
);
