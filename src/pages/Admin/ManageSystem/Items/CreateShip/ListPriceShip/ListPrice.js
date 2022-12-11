import React, { Component } from "react";
import { connect } from "react-redux";
import SwitchLanguage from "../../../../../../SwitchLanguage";
import Select from "react-select";
import generalHandling from "../../../../../../utils/generalHandling";
import { languages, SEARCH } from "../../../../../../utils/constant";
import InputSearch from "../../../../../../components/SearchInput/InputSearch";
import Button from "../../../../../../components/Button/Button";
import adminService from "../../../../../../services/adminService";
import * as actions from "../../../../../../store/action";
import { toast } from "react-toastify";
import NumberFormat from "react-number-format";

import "./ListPrice.scss";
import "../PriceShip.scss";

class ListPrice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listAllShops: [],
      listAllCategory: [],
      listAllCategoryType: [],
      listBaseCategoryType: [],

      resListDataPriceShip: [],

      valueInputSearch: "",
      optionsIdshop: null,
      optionsCategory: null,
      optionsCategoryType: null,
    };
  }

  // Mount
  componentDidMount = async () => {
    this.handleSetlistDataSelect();
    let { dataModal } = this.props;

    this.setState({
      resListDataPriceShip: dataModal,
    });
  };

  // update
  componentDidUpdate = async (prevProps, prevState) => {
    // Khi language change
    if (prevProps.allShops !== this.props.allShops) {
      this.handleSetlistDataSelect();
    }

    // Khi language change
    if (prevProps.allcategory !== this.props.allcategory) {
      this.handleSetlistDataSelect();
    }

    // Khi language change
    if (prevProps.language !== this.props.language) {
      this.handleSetlistDataSelect("LANGUAGE");
    }

    // Khi dataShip modal change
    if (prevProps.dataModal !== this.props.dataModal) {
      let { dataModal } = this.props;

      if (dataModal.length > 0) {
        this.setState({
          resListDataPriceShip: dataModal,
        });
      }
    }
  };

  // handle set list data
  handleSetlistDataSelect = async (action) => {
    let { optionsCategory, optionsCategoryType } = this.state;
    let { allShops, language, allcategory, dataModal } = this.props;

    let newListShop = generalHandling.handlConvertObject(
      allShops,
      "LIST_SHOP",
      language
    );
    let newAllcategory = generalHandling.handlConvertObject(
      allcategory,
      "LIST_CATEGORY",
      language
    );

    let newDataCategoryType = [];
    let newOptionsCategory = null;
    let newOptionsCategoryType = null;

    if (action === "LANGUAGE") {
      if (optionsCategory !== null) {
        newDataCategoryType = generalHandling.handlConvertObject(
          await this.props.getAllCodeInToItems(optionsCategory.value),
          "LIST_CATEGORY",
          this.props.language
        );
        newOptionsCategory = newAllcategory.filter(
          (item) => item.value === optionsCategory.value
        );
      }
      if (optionsCategoryType !== null) {
        newOptionsCategoryType = newDataCategoryType.filter(
          (item) => item.value === optionsCategoryType.value
        );
      }
    }

    this.setState({
      listAllShops: newListShop,
      listAllCategory: newAllcategory,
      listAllCategoryType: newDataCategoryType,

      optionsCategory: newOptionsCategory && newOptionsCategory[0],
      optionsCategoryType: newOptionsCategoryType && newOptionsCategoryType[0],
    });
  };

  // Xl change input select
  handlChangeSlelect = async (valueOptions, name) => {
    let { optionsIdshop, optionsCategory } = this.state;

    // Add shop
    if (name.name === "idShop") {
      this.props.setValueInputEmpty();

      this.setState({
        optionsIdshop: valueOptions,
      });
    }

    // Add shop
    if (name.name === "forItemCategory") {
      this.props.setValueInputEmpty();

      let dataPriceShip = [];
      let resData = await adminService.getPriceShip({
        idShop: optionsIdshop.value,
        itemsId: "EMPTY",
        category: valueOptions.value,
        categoryType: "EMPTY",
      });
      if (resData && resData.data && resData.data.data) {
        dataPriceShip = resData.data.data;
      }

      let listAllCategoryType = await this.props.getAllCodeInToItems(
        valueOptions.value
      );
      let newListAllCategoryType = generalHandling.handlConvertObject(
        listAllCategoryType,
        "LIST_CATEGORY",
        this.props.language
      );

      this.setState({
        resListDataPriceShip: dataPriceShip,
        listBaseCategoryType: listAllCategoryType,
        optionsCategory: valueOptions,
        listAllCategoryType: newListAllCategoryType,
      });
    }

    // Add shop
    if (name.name === "forItemCategoryType") {
      let dataPriceShip = [];
      let resData = await adminService.getPriceShip({
        idShop: optionsIdshop.value,
        itemsId: "EMPTY",
        category: optionsCategory.value,
        categoryType: valueOptions.value,
      });
      if (resData && resData.data && resData.data.data) {
        dataPriceShip = resData.data.data;
      }

      this.setState({
        resListDataPriceShip: dataPriceShip,
        optionsCategoryType: valueOptions,
      });
    }
  };

  // Hàm set value input
  handleGetDataComponentSearch = async (items, typeAction) => {
    let { optionsIdshop, optionsCategory } = this.state;

    let dataPriceShip = [];
    let idItem = items.idItems;
    if (idItem !== "") {
      let resData = await adminService.getPriceShip({
        idShop: optionsIdshop.value,
        itemsId: idItem,
        category: "EMPTY",
        categoryType: "EMPTY",
      });
      if (resData && resData.data && resData.data.data) {
        dataPriceShip = resData.data.data;
      }
    }

    // Set state
    this.setState({
      resListDataPriceShip: dataPriceShip,
      optionsCategory: null,
      optionsCategoryType: null,
    });
  };

  // DELETE price ship
  changePriceShip = async (dataPrice, actions) => {
    let { optionsCategory, optionsCategoryType, dataPriceShip } = this.state;
    let { isYesModal } = this.props;

    if (actions === "EDIT") {
      await this.props.getValueChangePriceShip(dataPrice);

      // Set state
      this.setState({
        resListDataPriceShip: dataPrice,
      });

      setTimeout(() => {
        document.documentElement.scrollTop =
          localStorage.getItem("topPriceShip");
      }, 200);
    }

    // Delete
    if (actions === "DELETE") {
      if (isYesModal) {
        this.props.handleShowHide(false);
      }

      let resData = await adminService.getPriceShip({
        idShop: dataPrice.idShop,
        itemsId: dataPrice.itemsId,
        category: dataPrice.category,
        categoryType: dataPrice.categoryType,
        actions: "DELETE",
      });
      if (resData && resData.data && resData.data.errCode === 0) {
        if (optionsCategory !== null && optionsCategoryType === null) {
          this.handlChangeSlelect(optionsCategory, { name: "forItemCategory" });
        }

        if (optionsCategory !== null && optionsCategoryType !== null) {
          this.handlChangeSlelect(optionsCategoryType, {
            name: "forItemCategoryType",
          });
        }

        if (optionsCategory === null && optionsCategoryType === null) {
          this.setState({
            resListDataPriceShip: [],
          });
        }

        this.setState({
          optionsIdshop: null,
          optionsCategory: null,
          optionsCategoryType: null,
        });

        toast.success(
          <SwitchLanguage id="manageAdmin.toast.deleteSuccessItems" />
        );
      }
    }
  };

  // SustomStyle select react
  customStyles = {
    menu: (provided, state) => ({
      ...provided,
      zIndex: 99999,
    }),
  };

  render() {
    let {
      listAllShops,
      listAllCategory,
      listAllCategoryType,
      optionsIdshop,
      optionsCategory,
      optionsCategoryType,
      resListDataPriceShip,
      valueInputSearch,
    } = this.state;
    let { language, isYesModal, handleUpdate } = this.props;

    return (
      <>
        {!isYesModal && (
          <>
            <div className="l-12 heading">
              <p className="heading-manage-user">
                <SwitchLanguage id="manageAdmin.items.ship_price-list" />
              </p>
            </div>

            <div className="list-input">
              <div className="l-3"></div>

              <InputSearch
                classWraper="form-input col l-6"
                idSwitchLanguage="manageAdmin.items.search-code-items"
                idSwitchLanguageAdd="manageAdmin.items.search-code-items-add"
                TYPE_INPUT="SEARCH_CODE_ITEM"
                TABEL={SEARCH.TABEL_SEARCH}
                TYPE={SEARCH.TYPE_SEARCH}
                IDSHOP={optionsIdshop !== null ? optionsIdshop.value : ""}
                handleGetDataComponentSearch={this.handleGetDataComponentSearch}
              />

              <div className="form-input col l-4">
                <label className="input-label">
                  <SwitchLanguage id="manageAdmin.form.nameShop" />
                </label>
                <Select
                  value={optionsIdshop}
                  onChange={this.handlChangeSlelect}
                  options={listAllShops}
                  styles={this.customStyles}
                  placeholder={
                    <SwitchLanguage id="manageAdmin.form.nameShop" />
                  }
                  name="idShop"
                />
              </div>

              <div className="form-input col l-4">
                <label className="input-label">
                  <SwitchLanguage id="manageAdmin.form.category" />
                </label>
                <Select
                  isDisabled={optionsIdshop !== null ? false : true}
                  value={optionsCategory}
                  onChange={this.handlChangeSlelect}
                  options={listAllCategory}
                  styles={this.customStyles}
                  placeholder={
                    <SwitchLanguage id="manageAdmin.form.planceholder_category" />
                  }
                  name="forItemCategory"
                />
              </div>

              <div className="form-input col l-4">
                <label className="input-label">
                  <SwitchLanguage id="manageAdmin.form.type" />
                </label>
                <Select
                  isDisabled={optionsCategory !== null ? false : true}
                  value={optionsCategoryType}
                  onChange={this.handlChangeSlelect}
                  options={listAllCategoryType}
                  styles={this.customStyles}
                  placeholder={
                    <SwitchLanguage id="manageAdmin.form.planceholder_type" />
                  }
                  name="forItemCategoryType"
                />
              </div>
            </div>
          </>
        )}

        {resListDataPriceShip && resListDataPriceShip.length > 0 && (
          <div className="detail-price">
            {/* Avata */}
            {resListDataPriceShip[0].Store && (
              <div className="store">
                <div className="border_img">
                  <img
                    className="avata_shop"
                    src={`${process.env.REACT_APP_BACKEND_IMAGES_AVT_SHOP}/${resListDataPriceShip[0].Store.avata}`}
                    alt=""
                  />
                </div>

                <span className="name-shop">
                  {resListDataPriceShip[0].Store.nameShop}
                </span>
              </div>
            )}

            {isYesModal && (
              <p className="title">
                <SwitchLanguage id="manageAdmin.modal.exist" />
              </p>
            )}

            <div className="margin-text">
              {/* Category */}
              {resListDataPriceShip[0].Category !== "EMPTY" &&
                resListDataPriceShip[0].categoryType === "EMPTY" &&
                resListDataPriceShip[0].itemsId === "EMPTY" && (
                  <div className="category">
                    <SwitchLanguage id="manageAdmin.items.category" />
                    <span className="text-note">
                      {languages.EN === language
                        ? resListDataPriceShip[0].Category.valueEn
                        : resListDataPriceShip[0].Category.valueVi}
                    </span>
                  </div>
                )}

              {/* Category type */}
              {resListDataPriceShip[0].categoryType !== "EMPTY" &&
                resListDataPriceShip[0].itemsId === "EMPTY" && (
                  <div className="category">
                    <SwitchLanguage id="manageAdmin.items.addDiscountSub" />
                    <p className="text-note type">
                      {languages.EN === language
                        ? resListDataPriceShip[0].Type.valueEn
                        : resListDataPriceShip[0].Type.valueVi}
                    </p>
                  </div>
                )}

              {/* Items one */}
              {resListDataPriceShip[0].itemsId !== "EMPTY" &&
                resListDataPriceShip[0].categoryType === "EMPTY" &&
                resListDataPriceShip[0].category === "EMPTY" &&
                resListDataPriceShip[0].Item &&
                resListDataPriceShip[0].Item.dataImgItems && (
                  <div className="category">
                    <SwitchLanguage id="manageAdmin.items.itemsDiscount" />

                    <div className="img-item">
                      <img
                        className="avata_shop"
                        src={`${process.env.REACT_APP_BACKEND_IMAGES_ITEMS}/${resListDataPriceShip[0].Item.dataImgItems.image}`}
                        alt=""
                      />
                    </div>

                    <div>
                      <p
                        className="text-note type"
                        style={{ color: "#c62929" }}
                      >
                        {languages.VI === language
                          ? resListDataPriceShip[0].Item.name.slice(0, 60) +
                            "..."
                          : resListDataPriceShip[0].Item.nameEn.slice(0, 60) +
                            "..."}
                      </p>

                      <p className="code-item">
                        <SwitchLanguage id="manageAdmin.items.code" />
                        <span className="text-note">
                          {resListDataPriceShip[0].Item.idItems}
                        </span>
                      </p>
                    </div>
                  </div>
                )}

              {/* List price province */}
              <SwitchLanguage id="manageAdmin.items.count-add-price" />
              <span className="text-note">{resListDataPriceShip.length}</span>
              <p style={{ margin: "16px 0" }}>
                <SwitchLanguage id="manageAdmin.form.Province" /> {" : "}
              </p>

              <div className="category overHeight">
                {resListDataPriceShip.map((item) => {
                  return (
                    <div key={item.id}>
                      {item.Province && (
                        <span>
                          {languages.EN === language
                            ? item.Province.valueEn
                            : item.Province.valueVi}
                          {" : "}
                          <SwitchLanguage id="manageAdmin.items.price" />
                          <span className="text-note">
                            {languages.EN === language ? (
                              item.priceShipUS
                            ) : (
                              <NumberFormat
                                value={item.priceShipVN}
                                displayType={"text"}
                                thousandSeparator={true}
                              />
                            )}
                            {languages.EN === language ? " USD " : " VND "}
                          </span>
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* List BTN */}
            <div className="list-btn-price">
              <span
                onClick={(e) =>
                  isYesModal
                    ? handleUpdate(e, "SUBMIT", "UPDATE")
                    : this.changePriceShip(resListDataPriceShip, "EDIT")
                }
              >
                <Button
                  type="edit-form-data"
                  content={
                    isYesModal ? (
                      <SwitchLanguage id="manageAdmin.button.update" />
                    ) : (
                      <SwitchLanguage id="manageAdmin.button.editNow" />
                    )
                  }
                  width="100px"
                  border="4px"
                  margin="20px 0 0 0"
                  height="30px"
                />
              </span>

              <span
                onClick={() =>
                  this.changePriceShip(resListDataPriceShip[0], "DELETE")
                }
              >
                <Button
                  type="submit-form-data"
                  content={<SwitchLanguage id="manageAdmin.button.delete" />}
                  color="var(--color-BTN-manage)"
                  width="100px"
                  border="4px"
                  margin="20px 0 0 0"
                  height="30px"
                />
              </span>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allShops: state.admin.listShops.allShops,
    allcategory: state.admin.dataForm.category,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCodeInToItems: (type) =>
      dispatch(actions.getAllCodeInToItemsStart(type)),
    setValueInputEmpty: () => dispatch(actions.setValueInputEmpty()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPrice);

// {
//     Category: {valueEn: 'Womens Fashion', valueVi: 'Thời trang nữ'},
//     Province: {valueEn: 'Hai Duong', valueVi: 'Hải Dương'},
//     Store: {nameShop: 'OAY OAY SHOPS',avata: 'file-1662193614824.jpg'},
//     category: "FSM",
//     categoryType: "EMPTY",
//     id: 75,
//     idShop: "3",
//     itemsId: "EMPTY",
//     priceShipUS: 2,
//     priceShipVN: 40000,
//     province: "34",
// },
// {

//     Category: {valueEn: 'Womens Fashion', valueVi: 'Thời trang nữ'},
//     Province: {valueEn: 'Thai Nguyen', valueVi: 'Thái Nguyên'},
//     Store: {nameShop: 'OAY OAY SHOPS',avata: 'file-1662193614824.jpg'},
//     category: "FSM",
//     categoryType: "EMPTY",
//     id: 76,
//     idShop: "3",
//     itemsId: "EMPTY",
//     priceShipUS: 2,
//     priceShipVN: 40000,
//     province: "20",
// },{
//     Category: {valueEn: 'Womens Fashion', valueVi: 'Thời trang nữ'},
//     Province: {valueEn: 'Phu Tho', valueVi: 'Phú Thọ'},
//     Store: {nameShop: 'OAY OAY SHOPS',avata: 'file-1662193614824.jpg'},
//     category: "FSM",
//     categoryType: "EMPTY",
//     id: 77,
//     idShop: "3",
//     itemsId: "EMPTY",
//     priceShipUS: 2,
//     priceShipVN: 40000,
//     province: "19",
// }

// {
//     Category: {valueEn: 'Womens Fashion', valueVi: 'Thời trang nữ'},
//     Province: {valueEn: 'Hai Duong', valueVi: 'Hải Dương'},
//     Store: {nameShop: 'OAY OAY SHOPS',avata: 'file-1662193614824.jpg'},
//     Type: {valueEn: 'Skirt', valueVi: 'Chân Váy'},
//     category: "FSM",
//     categoryType: "SW03",
//     id: 87,
//     idShop: "3",
//     itemsId: "EMPTY",
//     priceShipUS: 2,
//     priceShipVN: 40000,
//     province: "34",
// },
// {
//     Category: {valueEn: 'Womens Fashion', valueVi: 'Thời trang nữ'},
//     Province: {valueEn: 'Thai Nguyen', valueVi: 'Thái Nguyên'},
//     Store: {nameShop: 'OAY OAY SHOPS',avata: 'file-1662193614824.jpg'},
//     Type: {valueEn: 'Skirt', valueVi: 'Chân Váy'},
//     category: "FSM",
//     categoryType: "SW03",
//     id: 88,
//     idShop: "3",
//     itemsId: "EMPTY",
//     priceShipUS: 2,
//     priceShipVN: 40000,
//     province: "20",
// },
// {
//     Category: {valueEn: 'Womens Fashion', valueVi: 'Thời trang nữ'},
//     Province: {valueEn: 'Phu Tho', valueVi: 'Phú Thọ'},
//     Store: {nameShop: 'OAY OAY SHOPS',avata: 'file-1662193614824.jpg'},
//     Type: {valueEn: 'Skirt', valueVi: 'Chân Váy'},
//     category: "FSM",
//     categoryType: "SW03",
//     id: 89,
//     idShop: "3",
//     itemsId: "EMPTY",
//     priceShipUS: 2,
//     priceShipVN: 40000,
//     province: "19",
// }
