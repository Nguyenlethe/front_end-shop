import React, { Component } from "react";
import { connect } from "react-redux";
import SwitchLanguage from "../../../../../SwitchLanguage";
import Select from "react-select";
import generalHandling from "../../../../../utils/generalHandling";
import { languages, SEARCH } from "../../../../../utils/constant";
import InputSearch from "../../../../../components/SearchInput/InputSearch";
import Button from "../../../../../components/Button/Button";
import adminService from "../../../../../services/adminService";
import * as actions from "../../../../../store/action";

import "./PriceShip.scss";
import { toast } from "react-toastify";
import ListPrice from "./ListPriceShip/ListPrice";
import ModalErrorItems from "../../../../../components/Modal/ModalErrorItems";

class PriceShip extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.err = React.createRef();
    this.elmPriceShip = React.createRef();
    this.state = {
      isShow: false,
      isEdit: false,
      isClickBTN: false,
      isHideSlow: false,
      dataPriceShop: null,
      dataProvinceVN: [],
      dataProvinceUS: [],
      dataOldCategoryType: [],
      allInputChangePrice: [],
      dataModal: [],
      valueInputSearch: "EMPTY",

      dataErrorFrom: {
        notSelect: "",
        notAddPriceShip: "",
      },

      dataOptions: {
        optionsIdshop: null,
        optionsCategory: null,
        optionsCategoryType: null,
      },

      listDataOptions: {
        listAllShops: [],
        listProvince: [],
        listAllCategory: [],
        listAllCategoryType: [],

        count: 0,
        listInputPrice: [],
      },

      dataTabelShip: {
        idShop: "",
        itemsId: "",
        category: "",
        categoryType: "",
        priceShipVN: "",
        priceShipUS: "",
        province: "",
      },
    };
  }

  // Mount
  componentDidMount = async () => {
    let { listDataOptions } = this.state;
    let { allShops, langauge, dataProvince, allcategory } = this.props;
    let newListShop = generalHandling.handlConvertObject(
      allShops,
      "LIST_SHOP",
      langauge
    );
    let listAllCategory = generalHandling.handlConvertObject(
      allcategory,
      "LIST_CATEGORY",
      this.props.language
    );

    const node = this.elmPriceShip;
    localStorage.setItem("topPriceShip", node.current.offsetTop);

    this.setState({
      listDataOptions: {
        ...listDataOptions,
        listAllShops: newListShop || [],
        listProvince: dataProvince || [],
        listAllCategory: listAllCategory || [],
      },
    });
  };

  // update
  componentDidUpdate = async (prevProps, prevState) => {
    let { allShops, langauge, dataProvince } = this.props;
    let { listDataOptions, dataOptions, dataPriceShop } = this.state;

    const node = this.elmPriceShip;
    localStorage.setItem("topPriceShip", node.current.offsetTop - 130);

    // Thay ?????i allShops
    if (prevProps.allShops !== this.props.allShops) {
      let newListShop = generalHandling.handlConvertObject(
        allShops,
        "LIST_SHOP",
        langauge
      );

      this.setState({
        listDataOptions: {
          ...listDataOptions,
          listAllShops: newListShop || [],
        },
      });
    }

    // Thay ?????i dataProvince
    if (prevProps.dataProvince !== this.props.dataProvince) {
      console.log(dataProvince);
    }

    // Thay ?????i allcategory
    if (prevProps.allcategory !== this.props.allcategory) {
      let { allcategory, language } = this.props;

      // Chuy???n data v??? d???ng options
      let listAllCategory = generalHandling.handlConvertObject(
        allcategory,
        "LIST_CATEGORY",
        language
      );

      // Set state
      this.setState({
        listDataOptions: {
          ...listDataOptions,
          listAllCategory: listAllCategory || [],
        },
      });
    }

    //
    if (prevProps.language !== this.props.language) {
      let { allcategory, language } = this.props;
      let { dataOldCategoryType } = this.state;

      console.log("Z :", dataPriceShop);

      let value = "";
      if (dataPriceShop) {
        value =
          languages.EN === this.props.language
            ? `${dataPriceShop.nameEn}${Math.floor(Math.random() * 10000)}`
            : `${dataPriceShop.name}${Math.floor(Math.random() * 10000)}`;
      }

      let newListAllCategoryType = [];
      let newOptionsCategory = [null];
      let newOptionsCategoryType = [null];

      if (dataOldCategoryType.length > 0) {
        newListAllCategoryType = generalHandling.handlConvertObject(
          dataOldCategoryType,
          "LIST_CATEGORY",
          this.props.language
        );
        if (dataOptions.optionsCategoryType) {
          newOptionsCategoryType = newListAllCategoryType.filter(
            (option) => option.value === dataOptions.optionsCategoryType.value
          );
        }
      }

      // Chuy???n data v??? d???ng options
      let listAllCategory = generalHandling.handlConvertObject(
        allcategory,
        "LIST_CATEGORY",
        language
      );
      if (dataOptions.optionsCategory) {
        newOptionsCategory = listAllCategory.filter(
          (option) => option.value === dataOptions.optionsCategory.value
        );
      }

      // Set state
      this.setState({
        valueInputSearch: value,
        listDataOptions: {
          ...listDataOptions,
          listAllCategory: listAllCategory || [],
          listAllCategoryType: newListAllCategoryType,
        },
        dataOptions: {
          ...dataOptions,
          optionsCategory: newOptionsCategory,
          optionsCategoryType: newOptionsCategoryType,
        },
      });
    }
  };

  // Xl change input select
  handlChangeSlelect = async (valueOptions, name) => {
    let { listDataOptions, dataOptions, dataTabelShip, dataErrorFrom } =
      this.state;

    // Add shop
    if (name.name === "idShop") {
      // Set State
      this.setState({
        dataProvinceVN: [],
        dataProvinceUS: [],
        dataErrorFrom: {
          ...dataErrorFrom,
          notSelect: "",
        },
        dataOptions: {
          ...dataOptions,
          optionsIdshop: valueOptions,
          optionsCategory: null,
          optionsCategoryType: null,
        },
        dataTabelShip: {
          ...dataTabelShip,
          idShop: valueOptions.value,
          category: "",
        },
      });
    }

    // Add shop
    if (name.name === "forItemCategory") {
      this.props.setValueInputEmpty();
      let listAllCategoryType = await this.props.getAllCodeInToItems(
        valueOptions.value
      );
      let newListAllCategoryType = generalHandling.handlConvertObject(
        listAllCategoryType,
        "LIST_CATEGORY",
        this.props.language
      );

      // Set State
      this.setState({
        dataProvinceVN: [],
        dataProvinceUS: [],
        dataErrorFrom: {
          ...dataErrorFrom,
          notSelect: "",
        },
        dataOldCategoryType: listAllCategoryType,
        dataOptions: {
          ...dataOptions,
          optionsCategory: valueOptions,
          optionsCategoryType: null,
        },
        dataTabelShip: {
          ...dataTabelShip,
          category: valueOptions.value,
          categoryType: "",
          itemsId: "",
        },
        listDataOptions: {
          ...listDataOptions,
          listAllCategoryType: newListAllCategoryType || [],
        },
      });
    }

    // Add shop
    if (name.name === "forItemCategoryType") {
      // Set State
      this.setState({
        dataErrorFrom: {
          ...dataErrorFrom,
          notSelect: "",
        },
        dataOptions: {
          ...dataOptions,
          optionsCategoryType: valueOptions,
        },
        dataTabelShip: {
          ...dataTabelShip,
          categoryType: valueOptions.value,
        },
      });
    }
  };

  // Chnage input price / Province
  handleChangeInput = async (price, name, province, index) => {
    let {
      dataTabelShip,
      dataProvinceVN,
      dataProvinceUS,
      dataErrorFrom,
      dataOptions,
      listDataOptions,
    } = this.state;

    // Submit
    if (name === "SUBMIT") {
      // console.log(price, name, province)

      // Bi???n l??u tr???
      let newDataProvinceVN = [];
      let newDataProvinceUS = [];

      if (dataProvinceVN.length > 0 && dataProvinceUS.length > 0) {
        // Get price ship province VN (Xl tr??ng l???p)
        dataProvinceVN.reduce((total, data) => {
          if (total.indexOf(data.province) === -1) {
            if (data.priceShipVN !== "") {
              total.push(data.province);
              newDataProvinceVN.push(data);
            }
          }
          return total;
        }, []);

        // Get price ship province EN (Xl tr??ng l???p)
        dataProvinceUS.reduce((total, data) => {
          if (total.indexOf(data.province) === -1) {
            if (data.priceShipUS !== "") {
              total.push(data.province);
              newDataProvinceUS.push(data);
            }
          }
          return total;
        }, []);
      }

      // L???i 0 select input / kh??ng nh???p gi??
      let isErrSelect = "";
      if (
        dataTabelShip.itemsId === "" &&
        dataTabelShip.category === "" &&
        dataTabelShip.categoryType === ""
      ) {
        isErrSelect = "manageAdmin.items.notSelect";
      }

      let isErrSelectPriceShip = "";
      if (newDataProvinceVN.length === 0 && newDataProvinceUS.length === 0) {
        isErrSelectPriceShip = "manageAdmin.items.notAddPriceShip";
      }

      // Neu co loi
      if (isErrSelect !== "" || isErrSelectPriceShip !== "") {
        // Set state
        this.setState({
          dataErrorFrom: {
            ...dataErrorFrom,
            notSelect: isErrSelect,
            notAddPriceShip: isErrSelectPriceShip,
          },
        });
        toast.error(<SwitchLanguage id="manageAdmin.toast.warn" />);
      } else {
        // T???o data tabel ship
        const tabelShip = newDataProvinceVN.map((item) => {
          let totaldata;
          newDataProvinceUS.map((element) => {
            if (item.province === element.province) {
              totaldata = {
                idShop: dataTabelShip.idShop,
                itemsId: dataTabelShip.itemsId || "EMPTY",
                priceShipVN: item.priceShipVN,
                priceShipUS: element.priceShipUS,
                province: element.province,
                category: dataTabelShip.category || "EMPTY",
                categoryType: dataTabelShip.categoryType || "EMPTY",
              };
            }
          });
          return totaldata;
        });

        // X??a c??c ph???n t??? UDF
        const newTabelShip = tabelShip.filter((item) => item !== undefined);

        console.log(newTabelShip, province);

        // G???i data ??i
        let res;
        if (province === "SUBMIT") {
          res = await adminService.addPriceShip(newTabelShip);
        }
        if (province === "UPDATE") {
          res = await adminService.updatePriceShip(newTabelShip);
        }

        // N???u th??nh c??ng
        if (
          (res && res.data && res.data.errCode === 0) ||
          (res && res.data && res.data.errCode === 2)
        ) {
          await this.props.setValueInputEmpty();
          let newDataDataOptions =
            generalHandling.resetDefaultState(dataOptions);
          let newDataTabelShip =
            generalHandling.resetDefaultState(dataTabelShip);

          newDataProvinceVN = [];
          newDataProvinceUS = [];

          this.handleShowHide(false);

          this.setState({
            isEdit: false,
            dataOptions: {
              ...newDataDataOptions,
            },
            dataTabelShip: {
              ...newDataTabelShip,
            },
          });

          // X??a value input price
          listDataOptions.listInputPrice.map((input) => {
            input.value = "";
          });

          if (res.data.errCode === 2) {
            toast.success(
              <SwitchLanguage id="manageAdmin.toast.successEditItems" />
            );
          } else {
            toast.success(
              <SwitchLanguage id="manageAdmin.toast.successPriceShip" />
            );
          }
        }

        // N???u t???n t???i
        if (res && res.data && res.data.errCode === 1) {
          let dataModal = res.data.data;

          this.setState({
            ...this.state,
            isShow: true,
            dataModal: dataModal,
          });

          toast.error(<SwitchLanguage id="manageAdmin.toast.warn" />);
        }
      }
    }

    const reg = new RegExp("^[0-9]+$");
    // Change
    if (name === "PRICE_VI") {
      if (reg.test(price)) {
        if (dataProvinceVN.length === 0) {
          this.setState({
            dataProvinceVN: [{ priceShipVN: price, province: province }],
            dataErrorFrom: {
              ...dataErrorFrom,
              notAddPriceShip: "",
            },
          });
        }

        if (dataProvinceVN.length > 0) {
          dataProvinceVN.map((item, index) => {
            if (item.province === province) {
              dataProvinceVN[index].priceShipVN = price;

              this.setState({
                dataProvinceVN: dataProvinceVN,
                dataErrorFrom: {
                  ...dataErrorFrom,
                  notAddPriceShip: "",
                },
              });
            } else {
              let data = [
                ...dataProvinceVN,
                { priceShipVN: price, province: province },
              ];

              this.setState({
                dataProvinceVN: data,
                dataErrorFrom: {
                  ...dataErrorFrom,
                  notAddPriceShip: "",
                },
              });
            }
          });
        }
      } else {
        if (price.length > 0) {
          this.setState({
            dataErrorFrom: {
              ...dataErrorFrom,
              notAddPriceShip: "manageAdmin.items.errPriceShip",
            },
          });
        }
      }
    }

    // Change
    if (name === "PRICE_US") {
      if (reg.test(price)) {
        if (dataProvinceUS.length === 0) {
          this.setState({
            dataProvinceUS: [{ priceShipUS: price, province: province }],
            dataErrorFrom: {
              ...dataErrorFrom,
              notAddPriceShip: "",
            },
          });
        }

        if (dataProvinceUS.length > 0) {
          dataProvinceUS.map((item, index) => {
            if (item.province === province) {
              dataProvinceUS[index].priceShipUS = price;

              this.setState({
                dataProvinceUS: dataProvinceUS,
                dataErrorFrom: {
                  ...dataErrorFrom,
                  notAddPriceShip: "",
                },
              });
            } else {
              let data = [
                ...dataProvinceUS,
                { priceShipUS: price, province: province },
              ];
              this.setState({
                dataProvinceUS: data,
                dataErrorFrom: {
                  ...dataErrorFrom,
                  notAddPriceShip: "",
                },
              });
            }
          });
        }
      } else {
        if (price.length > 0) {
          this.setState({
            dataErrorFrom: {
              ...dataErrorFrom,
              notAddPriceShip: "manageAdmin.items.errPriceShip",
            },
          });
        }
      }
    }

    // Change
    if (name === "VN") {
      this.setState({
        isClickBTN: false,
      });
    }

    // Change
    if (name === "EN") {
      this.setState({
        isClickBTN: true,
      });
    }
  };

  // H??m set value input
  handleGetDataComponentSearch = async (items, typeAction) => {
    let { dataTabelShip, dataOptions } = this.state;

    // Set state
    this.setState({
      dataProvinceVN: [],
      dataProvinceUS: [],
      dataTabelShip: {
        ...dataTabelShip,
        itemsId: items.idItems,
        category: "",
        categoryType: "",
      },
      dataOptions: {
        ...dataOptions,
        optionsCategory: null,
        optionsCategoryType: null,
      },
    });
  };

  // get all input price
  arrayInputPrice = [];
  allInputData = (ref, index) => {
    let { listProvince, count } = this.state.listDataOptions;
    let { listDataOptions } = this.state;

    if (ref !== null) {
      if (
        this.arrayInputPrice.length < listProvince.length * 2 &&
        count <= this.arrayInputPrice.length * 2
      ) {
        this.arrayInputPrice.push(ref);

        this.setState({
          listDataOptions: {
            ...listDataOptions,
            count: index + 1,
            listInputPrice: this.arrayInputPrice,
          },
        });
      }
    }
  };

  // Set value input search code
  getValueChangePriceShip = async (dataPriceShip) => {
    let { dataOptions, dataTabelShip, listDataOptions, dataErrorFrom } =
      this.state;

    // Khi xo?? price ship x??a value input
    if (dataPriceShip === "DELETE") {
      this.props.setValueInputEmpty();
      // X??a value input price
      listDataOptions.listInputPrice.map((input) => {
        input.value = "";
      });

      this.setState({
        dataProvinceVN: [],
        dataProvinceUS: [],
        isEdit: false,
        dataOptions: {
          optionsIdshop: null,
          optionsCategory: null,
          optionsCategoryType: null,
        },
        dataTabelShip: {
          idShop: "",
          itemsId: "",
          category: "",
          categoryType: "",
          priceShipVN: "",
          priceShipUS: "",
          province: "",
        },
        dataErrorFrom: {
          ...dataErrorFrom,
          notSelect: "",
          notAddPriceShip: "",
        },
      });
    }

    // Khi EDIT
    if (dataPriceShip !== "DELETE") {
      let dataPriceVN = [];
      let dataPriceUS = [];
      // L???y All c??c gi?? ship
      dataPriceShip.map((price) => {
        dataPriceVN.push({
          priceShipVN: price.priceShipVN,
          province: price.province,
        });
        dataPriceUS.push({
          priceShipUS: price.priceShipUS,
          province: price.province,
        });
      });

      // L???y value all input
      listDataOptions.listInputPrice.map((input) => {
        if (input.title === "VI") {
          dataPriceVN.map((item) => {
            if (item.province === input.name) {
              input.value = item.priceShipVN;
            }
          });
        }

        if (input.title === "US") {
          dataPriceUS.map((item) => {
            if (item.province === input.name) {
              input.value = item.priceShipUS;
            }
          });
        }
      });

      let valueIdshop = null;
      let valueCategory = null;
      let valueCategoryType = null;
      let newListAllCategoryType = [];

      // Options shop
      valueIdshop = {
        value: dataPriceShip[0].idShop,
        label: dataPriceShip[0].Store.nameShop,
      };

      // Category
      if (dataPriceShip[0].category !== "EMPTY") {
        let labelPriceShip =
          languages.EN === this.props.language
            ? dataPriceShip[0].Category.valueEn
            : dataPriceShip[0].Category.valueVi;
        valueCategory = {
          value: dataPriceShip[0].category,
          label: labelPriceShip,
        };
        let listAllCategoryType = await this.props.getAllCodeInToItems(
          valueCategory.value
        );
        newListAllCategoryType = generalHandling.handlConvertObject(
          listAllCategoryType,
          "LIST_CATEGORY",
          this.props.language
        );
      }

      // Category Type
      if (
        dataPriceShip[0].category !== "EMPTY" &&
        dataPriceShip[0].categoryType !== "EMPTY"
      ) {
        let labelPriceShip =
          languages.EN === this.props.language
            ? dataPriceShip[0].Type.valueEn
            : dataPriceShip[0].Type.valueVi;
        valueCategoryType = {
          value: dataPriceShip[0].categoryType,
          label: labelPriceShip,
        };
      }

      // Value input
      let value = "";
      let idItems = "";
      if (dataPriceShip[0].Item) {
        value =
          languages.EN === this.props.language
            ? `${dataPriceShip[0].Item.nameEn}${Math.floor(
                Math.random() * 10000
              )}`
            : `${dataPriceShip[0].Item.name}${Math.floor(
                Math.random() * 10000
              )}`;
        idItems = dataPriceShip[0].itemsId;
      }

      await this.props.setValueInputEmpty();

      // Set state
      this.setState({
        dataPriceShop: dataPriceShip[0].Item,
        isEdit: true,
        dataProvinceVN: dataPriceVN,
        dataProvinceUS: dataPriceUS,
        valueInputSearch: value,
        dataOptions: {
          ...dataOptions,
          optionsIdshop: valueIdshop,
          optionsCategory: valueCategory,
          optionsCategoryType: valueCategoryType,
        },
        dataTabelShip: {
          ...dataTabelShip,
          idShop: dataPriceShip[0].idShop,
          category: valueCategory ? valueCategory.value : "",
          categoryType: valueCategoryType ? valueCategoryType.value : "",
          itemsId: idItems,
        },
        listDataOptions: {
          ...listDataOptions,
          listAllCategoryType: newListAllCategoryType || [],
        },
        dataErrorFrom: {
          ...dataErrorFrom,
          notSelect: "",
          notAddPriceShip: "",
        },
      });
    }
  };

  // Show hide modal
  handleShowHide = (bolModal) => {
    this.setState(
      {
        isHideSlow: !bolModal,
      },
      () =>
        setTimeout(() => {
          this.setState({
            isShow: false,
          });
        }, 200)
    );
  };

  // SustomStyle select react
  customStyles = {
    menu: (provided, state) => ({
      ...provided,
      zIndex: 99999,
    }),
  };

  render() {
    let { listAllShops, listProvince, listAllCategory, listAllCategoryType } =
      this.state.listDataOptions;
    let { optionsIdshop, optionsCategory, optionsCategoryType } =
      this.state.dataOptions;
    let { notSelect, notAddPriceShip } = this.state.dataErrorFrom;
    let {
      isClickBTN,
      valueInputSearch,
      isEdit,
      isShow,
      isHideSlow,
      dataModal,
    } = this.state;
    let { language } = this.props;

    return (
      <>
        {isShow && (
          <ModalErrorItems
            isShow={isShow}
            isHideSlow={isHideSlow}
            handleShowHide={this.handleShowHide}
            title={"EMPTY"}
          >
            <ListPrice
              dataModal={dataModal}
              handleShowHide={this.handleShowHide}
              handleUpdate={this.handleChangeInput}
              isYesModal={true}
            />
          </ModalErrorItems>
        )}

        <div ref={this.elmPriceShip} className="l-12 heading">
          <p className="heading-manage-user">
            <SwitchLanguage id="manageAdmin.items.ship_price" />
          </p>
        </div>

        <div id="list-input">
          <div className="l-3"></div>

          <InputSearch
            classWraper="form-input col l-6"
            idSwitchLanguage="manageAdmin.items.search-code-items"
            idSwitchLanguageAdd="manageAdmin.items.search-code-items-add"
            TYPE_INPUT="SEARCH_CODE_ITEM"
            TABEL={SEARCH.TABEL_SEARCH}
            TYPE={SEARCH.TYPE_SEARCH}
            valueChange={valueInputSearch}
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
              placeholder={<SwitchLanguage id="manageAdmin.form.nameShop" />}
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

          {notSelect !== "" && (
            <span className="note col l-12">
              <SwitchLanguage id={notSelect} />
            </span>
          )}

          <div className="form-input l-11">
            <label className="input-label col">
              <SwitchLanguage id="manageAdmin.items.province_add" />
            </label>

            <div className="list_btn l-6">
              <div
                className="col l-5"
                onClick={(e) => this.handleChangeInput(e, "EN")}
              >
                <Button
                  type="submit-form-data"
                  content={
                    <SwitchLanguage id="manageAdmin.items.price_shipVn" />
                  }
                  color={isClickBTN ? "#ce163b" : "#ccc"}
                  width="100%"
                  margin="0 24px 0 0"
                  border="4px"
                />
              </div>

              <div
                className="col l-5"
                onClick={(e) => this.handleChangeInput(e, "VN")}
              >
                <Button
                  type="submit-form-data"
                  content={
                    <SwitchLanguage id="manageAdmin.items.price_shipUs" />
                  }
                  color={isClickBTN ? "#ccc" : "#ce163b"}
                  width="100%"
                  margin="0 24px 0 0"
                  border="4px"
                />
              </div>
            </div>
          </div>

          <div className="form-input l-12">
            <div
              style={{ display: isClickBTN === false ? "none" : "flex" }}
              className="province"
            >
              {listProvince &&
                listProvince.length > 0 &&
                listProvince.map((province, index) => {
                  return (
                    <div className="form-data col l-3" key={province.id}>
                      <div className="input-label-province">
                        <SwitchLanguage id="manageAdmin.items.price_ship" />{" "}
                        {" / "}
                        <span>
                          {languages.VI === language
                            ? province.valueVi
                            : province.valueEn}
                        </span>
                      </div>

                      <input
                        className="input"
                        title="VI"
                        name={province.keyMap}
                        ref={(ref) => this.allInputData(ref, index)}
                        onChange={(e) =>
                          this.handleChangeInput(
                            e.target.value,
                            "PRICE_VI",
                            province.keyMap,
                            index
                          )
                        }
                        placeholder={
                          languages.EN === language
                            ? "Enter shipping price..."
                            : "Nh???p gi?? ship..."
                        }
                      />
                    </div>
                  );
                })}
            </div>

            <div
              style={{ display: isClickBTN === true ? "none" : "flex" }}
              className="province"
            >
              {listProvince &&
                listProvince.length > 0 &&
                listProvince.map((province, index) => {
                  return (
                    <div className="form-data col l-3" key={province.id}>
                      <div className="input-label-province">
                        <SwitchLanguage id="manageAdmin.items.price_ship" />{" "}
                        {" / "}
                        <span>
                          {languages.VI === language
                            ? province.valueVi
                            : province.valueEn}
                        </span>
                      </div>

                      <input
                        className="input"
                        title="US"
                        name={province.keyMap}
                        ref={(ref) =>
                          this.allInputData(ref, index + listProvince.length)
                        }
                        onChange={(e) =>
                          this.handleChangeInput(
                            e.target.value,
                            "PRICE_US",
                            province.keyMap,
                            index
                          )
                        }
                        placeholder={
                          languages.EN === language
                            ? "Enter shipping price..."
                            : "Nh???p gi?? ship..."
                        }
                      />
                    </div>
                  );
                })}
            </div>

            {notAddPriceShip !== "" && (
              <span className="note col l-12">
                <SwitchLanguage id={notAddPriceShip} />
              </span>
            )}
          </div>
        </div>

        <div className="col l-12">
          <span className="note">
            <SwitchLanguage id="manageAdmin.items.attention" />
          </span>
        </div>

        <div className="col list-BTN-price-ship">
          {!isEdit && (
            <div
              className="l-2"
              style={{ opacity: optionsIdshop !== null ? "1" : ".6" }}
              onClick={(e) =>
                optionsIdshop !== null &&
                this.handleChangeInput(e, "SUBMIT", "SUBMIT")
              }
            >
              <Button
                type="submit-form-data"
                content={<SwitchLanguage id="manageAdmin.button.submit" />}
                color="#ce163b"
                width="96%"
                margin="0 24px 0 0"
                border="4px"
              />
            </div>
          )}

          {isEdit && (
            <div
              className="l-2"
              style={{ opacity: optionsIdshop !== null ? "1" : ".6" }}
              onClick={(e) =>
                optionsIdshop !== null &&
                this.handleChangeInput(e, "SUBMIT", "UPDATE")
              }
            >
              <Button
                type="edit-form-data"
                content={<SwitchLanguage id="manageAdmin.button.update" />}
                width="96%"
                margin="0 24px 0 0"
                border="4px"
              />
            </div>
          )}

          <div
            className="l-2"
            onClick={(e) =>
              optionsIdshop !== null && this.getValueChangePriceShip("DELETE")
            }
          >
            <Button
              type="close-form-data"
              content={<SwitchLanguage id="manageAdmin.button.delete" />}
              color={isEdit ? "#cccccc" : "#cccccc"}
              width="96%"
              margin="0 0 0 20px"
              border="4px"
            />
          </div>
        </div>

        <ListPrice getValueChangePriceShip={this.getValueChangePriceShip} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allShops: state.admin.listShops.allShops,
    dataProvince: state.admin.dataForm.listProvince,
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

export default connect(mapStateToProps, mapDispatchToProps)(PriceShip);
