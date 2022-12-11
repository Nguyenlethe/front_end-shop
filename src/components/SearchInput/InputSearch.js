import React, { Component } from "react";
import { connect } from "react-redux";
import SwitchLanguage from "../../SwitchLanguage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faSpinner,
  faCircleXmark,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { languages, DISCOUNTTEXT } from "../../utils/constant";

import * as actions from "../../store/action";
import adminService from "../../services/adminService";

import "./SearchInput.scss";
class InputSearch extends Component {
  constructor(props) {
    super(props);
    this.inputSearchCode = React.createRef();
    this.state = {
      itemStorage: [],
      newValueInputSelectArray: "",
      isLoadSearchItemsCode: false,
      value: "",
      isShowTextAdd: false,
      dataSearchItemsCode: {
        isShowDataSearchCodeItems: false,
        valueInputSearchCodeItems: "",
        listDataSearchCodeItems: [],
      },

      dataSelectItemsName: {
        isShowListItemsSelect: false,
        valueInputSelectArray: "",
        listDataItemsSelect: [],
        resultDataSearchName: [],
      },
    };
  }

  // Khi component did
  componentWillUnmount() {}

  // Component DidMount
  componentDidMount = async () => {
    let { dataArrayItemsSelect, valueName, language } = this.props;
    let { dataSelectItemsName, dataSearchItemsCode } = this.state;

    if (valueName && valueName.name) {
      let value =
        languages.EN === language
          ? valueName.nameEn.slice(0, 30) + "..."
          : valueName.name.slice(0, 30) + "...";
      this.setState({
        newValueInputSelectArray: value,
      });
    }

    // Check DK set State
    if (dataArrayItemsSelect && dataArrayItemsSelect.length > 0) {
      this.setState({
        dataSelectItemsName: {
          ...dataSelectItemsName,
          listDataItemsSelect: dataArrayItemsSelect,
        },
      });
    }
  };

  // Component Update
  componentDidUpdate = async (prevProps, prevState) => {
    let { itemStorage, dataSearchItemsCode, dataSelectItemsName } = this.state;
    let { valueInputSearchCode, dataArrayItemsSelect, language, valueName } =
      this.props;

    // Khi language thay đổi
    if (prevProps.language !== this.props.language) {
      let value =
        languages.EN === language
          ? valueName &&
            valueName.nameEn &&
            valueName.nameEn.slice(0, 36) + "..."
          : valueName && valueName.name && valueName.name.slice(0, 36) + "...";

      this.setState({
        newValueInputSelectArray: value || "",
      });

      this.handleAddItems(itemStorage, "CHANGE_LANGUAGE");
    }

    // Khi select items
    if (prevProps.valueInputSearchCode !== this.props.valueInputSearchCode) {
      this.handleResetValueInputSearchCodeItems();

      this.setState({
        isShowTextAdd: false,
        dataSearchItemsCode: {
          ...dataSearchItemsCode,
          valueInputSearchCodeItems: "",
        },
      });
    }

    // Khi Array data items select thay đổi
    if (prevProps.dataArrayItemsSelect !== this.props.dataArrayItemsSelect) {
      if (dataArrayItemsSelect[0].actions !== "NOT_SET_VALUE") {
        this.setState({
          dataSelectItemsName: {
            ...dataSelectItemsName,
            valueInputSelectArray: "",
            listDataItemsSelect: dataArrayItemsSelect,
          },
        });
      }
    }

    // Khi props value change (ARRAY ITEMS SEARCH)
    if (prevProps.valueName !== this.props.valueName) {
      let value =
        languages.EN === language
          ? valueName.nameEn && valueName.nameEn.slice(0, 30) + "..."
          : valueName.name && valueName.name.slice(0, 30) + "...";
      this.setState({
        newValueInputSelectArray: value || "",
      });
    }

    // Khi props value change (SEARCH CODE)
    if (prevProps.valueChange !== this.props.valueChange) {
      if (this.props.valueChange !== "EMPTY") {
        let value = "";
        if (this.props.valueChange.length > 60) {
          value = this.props.valueChange.slice(0, 60) + "...";
        }

        this.setState({
          isShowTextAdd: true,
          dataSearchItemsCode: {
            ...dataSearchItemsCode,
            valueInputSearchCodeItems: value || "",
          },
        });
      }
    }
  };

  // State + props thay đổi mới re-reder
  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.TYPE_INPUT !== nextProps.TYPE_INPUT ||
      this.props.classWraper !== nextProps.classWraper ||
      this.props.idSwitchLanguage !== nextProps.idSwitchLanguage ||
      this.props.valueName !== nextProps.valueName ||
      this.props.valueInputSearchCode !== nextProps.valueInputSearchCode ||
      this.props.language !== nextProps.language ||
      this.props.dataArrayItemsSelect !== nextProps.dataArrayItemsSelect ||
      this.props.TABEL !== nextProps.TABEL ||
      this.props.TYPE !== nextProps.TYPE ||
      this.props.IDSHOP !== nextProps.IDSHOP ||
      this.props.IDSHOP !== nextProps.IDSHOP ||
      this.props.valueChange !== nextProps.valueChange ||
      this.state.dataSearchItemsCode !== nextState.dataSearchItemsCode ||
      this.state.dataSelectItemsName !== nextState.dataSelectItemsName ||
      this.state.itemStorage !== nextState.itemStorage ||
      this.state.newValueInputSelectArray !==
        nextState.newValueInputSelectArray ||
      this.state.isLoadSearchItemsCode !== nextState.isLoadSearchItemsCode ||
      this.state.value !== nextState.value
    ) {
      return true;
    }
    return false;
  }

  // changeInput
  handleChangeInputSearch = (value, type) => {
    let { dataSearchItemsCode } = this.state;

    if (type === "SEARCH_CODE_ITEM") {
      // Set State
      this.setState({
        dataSearchItemsCode: {
          ...dataSearchItemsCode,
          valueInputSearchCodeItems: value,
        },
      });
    }

    if (type === "SELECT_ITEMS_ARRAY") {
      let { listDataItemsSelect } = this.state.dataSelectItemsName;
      let { language } = this.props;
      var valueInput = value;

      let dataListSearchArray = [];
      listDataItemsSelect.map((item) => {
        // Tiếng Việt
        if (item.name && languages.VI === language) {
          let string = item.name;

          if (string.toLowerCase().indexOf(valueInput.toLowerCase()) >= 0) {
            if (dataListSearchArray.length === 0) {
              dataListSearchArray.push(item);
            } else {
              dataListSearchArray.map((element) => {
                if (element.idItems !== item.idItems) {
                  dataListSearchArray.push(item);
                }
              });
            }
          }
        }

        // Tiếng Anh
        if (item.nameEn && languages.EN === language) {
          if (
            item.nameEn.toLowerCase().indexOf(valueInput) === 0 ||
            item.nameEn.toLowerCase().indexOf(valueInput) > 0
          ) {
            if (dataListSearchArray.length === 0) {
              dataListSearchArray.push(item);
            } else {
              dataListSearchArray.map((element) => {
                if (element.idItems !== item.idItems) {
                  dataListSearchArray.push(item);
                }
              });
            }
          }
        }
      });

      // Set Gtri
      dataListSearchArray =
        dataListSearchArray.length === 0
          ? []
          : [...new Set(dataListSearchArray)];

      // Set state
      this.setState({
        dataSelectItemsName: {
          ...this.state.dataSelectItemsName,
          resultDataSearchName: dataListSearchArray,
          valueInputSelectArray: valueInput,
        },
      });
    }
  };

  // Search code items
  handleGetDataItems = async (value, type) => {
    let { dataSearchItemsCode } = this.state;
    let { TABEL, TYPE, IDSHOP } = this.props;

    this.setState({
      isLoadSearchItemsCode: true,
    });

    // Get data DB
    let res = await adminService.searchData({
      TABEL,
      TYPE,
      value: value.trim(),
      IDSHOP,
    });

    // Set state
    if (res && res.data && res.data.data) {
      let data = res.data.data || [];

      if (type === "SEARCH_CODE_ITEM") {
        const node = this.inputSearchCode.current;
        node.focus();

        this.setState({
          isLoadSearchItemsCode: false,
          dataSearchItemsCode: {
            ...dataSearchItemsCode,
            isShowDataSearchCodeItems: true,
            listDataSearchCodeItems: data,
          },
        });
      }
    }
  };

  // blur input
  handleBlurInput = (typeInput) => {
    let { dataSearchItemsCode, dataSelectItemsName } = this.state;

    if (typeInput === "SEARCH_CODE_ITEM") {
      this.setState({
        dataSearchItemsCode: {
          ...dataSearchItemsCode,
          isShowDataSearchCodeItems: false,
        },
      });
    }
    if (typeInput === "SELECT_ITEMS_ARRAY") {
      this.setState({
        dataSelectItemsName: {
          ...dataSelectItemsName,
          isShowListItemsSelect: false,
        },
      });
    }
  };

  // Focus input
  handleFocusInputSearch = (typeInput) => {
    let { dataSelectItemsName } = this.state;

    if (typeInput === "SELECT_ITEMS_ARRAY") {
      this.setState({
        dataSelectItemsName: {
          ...dataSelectItemsName,
          isShowListItemsSelect: true,
        },
      });
    }
  };

  // Click add items
  handleAddItems = async (items, actions, index) => {
    let { dataSearchItemsCode, dataSelectItemsName } = this.state;

    if (items !== []) {
      let { language, idSwitchLanguageAdd } = this.props;

      // Item click add active
      dataSearchItemsCode.listDataSearchCodeItems.map((item) => {
        if (item.active) item.active = false;
      });

      // Add active = true
      if (typeof index == "number") {
        dataSearchItemsCode.listDataSearchCodeItems[index].active = true;
      }

      // Set name add value input
      let nameItemsAdd = languages.EN === language ? items.nameEn : items.name;

      if (actions === "SEARCH_CODE_ITEM" || actions === "SELECT_ITEMS_ARRAY") {
        await this.props.handleGetDataComponentSearch(items, actions);

        // IF actions = 'SEARCH_CODE_ITEM'
        if (actions === "SEARCH_CODE_ITEM") {
          nameItemsAdd = nameItemsAdd.slice(0, 56) + "...";

          let changeText = false;
          if (idSwitchLanguageAdd) {
            changeText = true;
          }

          // Set state
          this.setState({
            isShowTextAdd: changeText,
            itemStorage: items,
            dataSearchItemsCode: {
              ...dataSearchItemsCode,
              valueInputSearchCodeItems: nameItemsAdd,
              isShowDataSearchCodeItems: false,
            },
          });
        }

        // IF actions = 'SEARCH_CODE_ITEM'
        if (actions === "SELECT_ITEMS_ARRAY") {
          this.props.setValueInputEmpty();
          nameItemsAdd = nameItemsAdd.slice(0, 30) + "...";

          // Set state
          this.setState({
            newValueInputSelectArray: "",
            itemStorage: items,
            dataSelectItemsName: {
              ...this.state.dataSelectItemsName,
              valueInputSelectArray: nameItemsAdd,
              isShowListItemsSelect: false,
            },
          });
        }
      }

      // Khi change language
      if (actions === "CHANGE_LANGUAGE") {
        if (dataSearchItemsCode.valueInputSearchCodeItems !== "") {
          // Set state
          this.setState({
            dataSearchItemsCode: {
              ...dataSearchItemsCode,
              valueInputSearchCodeItems: nameItemsAdd,
              isShowDataSearchCodeItems: false,
            },
          });
        }

        if (dataSelectItemsName.valueInputSelectArray !== "") {
          // Set state
          this.setState({
            dataSelectItemsName: {
              ...this.state.dataSelectItemsName,
              valueInputSelectArray: nameItemsAdd,
              isShowListItemsSelect: false,
            },
          });
        }
      }
    }
  };

  // Focus show items
  handleFocusInput = () => {
    let { idSwitchLanguageAdd } = this.props;
    let { dataSearchItemsCode } = this.state;
    let { isShowDataSearchCodeItems, listDataSearchCodeItems } =
      this.state.dataSearchItemsCode;

    if (listDataSearchCodeItems.length > 0) {
      this.setState({
        dataSearchItemsCode: {
          ...dataSearchItemsCode,
          isShowDataSearchCodeItems: true,
        },
      });
    }
  };

  // handle Reset Value Input Search Code Items
  handleResetValueInputSearchCodeItems = async () => {
    let { dataSearchItemsCode } = this.state;

    dataSearchItemsCode.listDataSearchCodeItems.map((item) => {
      if (item.active) item.active = false;
    });

    this.setState({
      isShowTextAdd: false,
      dataSearchItemsCode: {
        ...dataSearchItemsCode,
        valueInputSearchCodeItems: "",
      },
    });
    await this.props.handleGetDataComponentSearch(
      { idItems: "" },
      "DELETE_VALUE"
    );
  };

  render() {
    let { isLoadSearchItemsCode, newValueInputSelectArray, isShowTextAdd } =
      this.state;
    let {
      valueInputSearchCodeItems,
      isShowDataSearchCodeItems,
      listDataSearchCodeItems,
    } = this.state.dataSearchItemsCode;
    let {
      isShowListItemsSelect,
      listDataItemsSelect,
      resultDataSearchName,
      valueInputSelectArray,
    } = this.state.dataSelectItemsName;
    let {
      TYPE_INPUT,
      classWraper,
      idSwitchLanguage,
      language,
      idSwitchLanguageAdd,
      notLabel,
    } = this.props;

    return (
      <>
        <div className={classWraper}>
          <div className="search">
            <div className="input_search">
              {TYPE_INPUT === "SEARCH_CODE_ITEM" && (
                <>
                  {notLabel !== "true" && (
                    <>
                      {!isShowTextAdd && (
                        <SwitchLanguage id={idSwitchLanguage} />
                      )}
                      {isShowTextAdd && (
                        <SwitchLanguage id={idSwitchLanguageAdd} />
                      )}
                    </>
                  )}

                  <input
                    className="input search"
                    name="search"
                    type="text"
                    autoComplete="off"
                    ref={this.inputSearchCode}
                    onFocus={() => isShowTextAdd && this.handleFocusInput()}
                    value={valueInputSearchCodeItems}
                    placeholder={
                      languages.EN === language
                        ? "Search items"
                        : "Tìm sản phẩm "
                    }
                    onChange={(e) =>
                      this.handleChangeInputSearch(e.target.value, TYPE_INPUT)
                    }
                    onBlur={() => this.handleBlurInput(TYPE_INPUT)}
                    style={{
                      borderRight: isShowTextAdd ? "1px solid #ccc" : "",
                      borderRadius: isShowTextAdd ? "4px" : "",
                      width: isShowTextAdd ? "100%" : "",
                    }}
                  />

                  <span
                    className="icon_load_re-set"
                    style={{ right: isShowTextAdd ? "12px" : "" }}
                  >
                    {isLoadSearchItemsCode && (
                      <FontAwesomeIcon className="rotate" icon={faSpinner} />
                    )}

                    {valueInputSearchCodeItems !== "" && (
                      <span
                        onClick={() =>
                          this.handleResetValueInputSearchCodeItems()
                        }
                      >
                        {!isLoadSearchItemsCode && (
                          <FontAwesomeIcon icon={faCircleXmark} />
                        )}
                      </span>
                    )}
                  </span>

                  {!isShowTextAdd && (
                    <FontAwesomeIcon
                      className="icon-search"
                      icon={faMagnifyingGlass}
                      style={{
                        opacity: valueInputSearchCodeItems !== "" ? "1" : ".7",
                        zIndex: "9",
                      }}
                      onClick={() =>
                        this.handleGetDataItems(
                          valueInputSearchCodeItems,
                          TYPE_INPUT
                        )
                      }
                    />
                  )}

                  <div className="options_items">
                    {valueInputSearchCodeItems !== "" &&
                      listDataSearchCodeItems.length === 0 &&
                      isShowDataSearchCodeItems && (
                        <p className="no-options">
                          <SwitchLanguage id="manageAdmin.items.noOptions" />
                        </p>
                      )}

                    {valueInputSearchCodeItems !== "" &&
                      listDataSearchCodeItems &&
                      listDataSearchCodeItems.length > 0 &&
                      isShowDataSearchCodeItems &&
                      listDataSearchCodeItems.map((item, index) => {
                        return (
                          <div
                            key={item.idItems}
                            className="item"
                            style={{
                              backgroundColor: item.active
                                ? item.active === true
                                  ? "#b1d6f5d4"
                                  : ""
                                : "",
                            }}
                            onMouseDown={() =>
                              this.handleAddItems(item, TYPE_INPUT, index)
                            }
                          >
                            <div className="wraper-img">
                              <img
                                src={`${
                                  process.env.REACT_APP_BACKEND_IMAGES_ITEMS
                                }/${
                                  item.dataImgItems && item.dataImgItems.image
                                }`}
                                alt=""
                                className="img"
                              />
                            </div>
                            <div className="detail">
                              <p className="name-items">
                                {languages.EN === language
                                  ? item.nameEn
                                  : item.name}
                              </p>
                              <div className="list-price">
                                <p className="price">
                                  <span className="sub-price">Giá :</span>
                                  {language === languages.EN
                                    ? item.newPriceUS
                                      ? item.newPriceUS
                                      : item.priceUS
                                    : item.newPrice
                                    ? item.newPrice
                                    : item.price}
                                  <span className="type_price">
                                    {languages.EN === language
                                      ? DISCOUNTTEXT.EN_DISCOUNT_SUB
                                      : DISCOUNTTEXT.VN_DISCOUNT_SUB}
                                  </span>
                                </p>
                                <p className="code-items">
                                  <SwitchLanguage id="manageAdmin.items.code" />{" "}
                                  <span>{item.idItems}</span>{" "}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </>
              )}

              {TYPE_INPUT === "SELECT_ITEMS_ARRAY" && (
                <>
                  <SwitchLanguage id={idSwitchLanguage} />
                  <input
                    className="input select"
                    name="search"
                    type="text"
                    placeholder={
                      languages.EN === language
                        ? "Select items"
                        : "Chọn sản phẩm"
                    }
                    onFocus={() => this.handleFocusInputSearch(TYPE_INPUT)}
                    onBlur={() => this.handleBlurInput(TYPE_INPUT)}
                    autoComplete="off"
                    onChange={(e) =>
                      this.handleChangeInputSearch(e.target.value, TYPE_INPUT)
                    }
                    value={
                      newValueInputSelectArray !== ""
                        ? newValueInputSelectArray
                        : valueInputSelectArray
                    }
                  />

                  {isShowListItemsSelect && (
                    <div className="options_items">
                      {listDataItemsSelect.length === 0 && (
                        <p className="no-options">
                          <SwitchLanguage id="manageAdmin.items.noOptions" />
                        </p>
                      )}

                      {listDataItemsSelect.length > 0 &&
                        resultDataSearchName.length === 0 &&
                        listDataItemsSelect.map((item) => {
                          return (
                            <div
                              key={item.idItems}
                              className="item"
                              onMouseDown={() =>
                                this.handleAddItems(item, TYPE_INPUT)
                              }
                            >
                              <div className="wraper-img">
                                <img
                                  src={`${
                                    process.env.REACT_APP_BACKEND_IMAGES_ITEMS
                                  }/${
                                    item.dataImgItems && item.dataImgItems.image
                                  }`}
                                  alt=""
                                  className="img"
                                />
                              </div>
                              <div className="detail">
                                <p
                                  className="name-items"
                                  ref={this.nameItemsRef}
                                >
                                  {languages.EN === language
                                    ? item.nameEn
                                    : item.name}
                                </p>
                                <div className="list-price">
                                  <p className="price">
                                    <span className="sub-price">Giá :</span>
                                    {language === languages.EN
                                      ? item.newPriceUS
                                        ? item.newPriceUS
                                        : item.priceUS
                                      : item.newPrice
                                      ? item.newPrice
                                      : item.price}
                                    <span className="type_price">
                                      {languages.EN === language
                                        ? DISCOUNTTEXT.EN_DISCOUNT_SUB
                                        : DISCOUNTTEXT.VN_DISCOUNT_SUB}
                                    </span>
                                  </p>
                                  <p className="code-items">
                                    <SwitchLanguage id="manageAdmin.items.code" />{" "}
                                    <span>{item.idItems}</span>{" "}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}

                      {resultDataSearchName &&
                        resultDataSearchName.length > 0 &&
                        resultDataSearchName.map((item) => {
                          return (
                            <div
                              key={item.idItems}
                              className="item"
                              onMouseDown={() =>
                                this.handleAddItems(item, TYPE_INPUT)
                              }
                            >
                              <div className="wraper-img">
                                <img
                                  src={`${
                                    process.env.REACT_APP_BACKEND_IMAGES_ITEMS
                                  }/${
                                    item.dataImgItems && item.dataImgItems.image
                                  }`}
                                  alt=""
                                  className="img"
                                />
                              </div>
                              <div className="detail">
                                <p
                                  className="name-items"
                                  ref={this.nameItemsRef}
                                >
                                  {languages.EN === language
                                    ? item.nameEn
                                    : item.name}
                                </p>
                                <div className="list-price">
                                  <p className="price">
                                    <span className="sub-price">Giá :</span>
                                    {language === languages.EN
                                      ? item.newPriceUS
                                        ? item.newPriceUS
                                        : item.priceUS
                                      : item.newPrice
                                      ? item.newPrice
                                      : item.price}
                                    <span className="type_price">
                                      {languages.EN === language
                                        ? DISCOUNTTEXT.EN_DISCOUNT_SUB
                                        : DISCOUNTTEXT.VN_DISCOUNT_SUB}
                                    </span>
                                  </p>
                                  <p className="code-items">
                                    <SwitchLanguage id="manageAdmin.items.code" />{" "}
                                    <span>{item.idItems}</span>{" "}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allcategory: state.admin.dataForm.category,
    valueInputSearchCode: state.admin.search.valueInputSearchCode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setValueInputEmpty: () => dispatch(actions.setValueInputEmpty()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputSearch);
