import React, { Component } from "react";
import { connect } from "react-redux";
import SwitchLanguage from "../../../../../SwitchLanguage";
import * as actions from "../../../../../store/action";
import { languages } from "../../../../../utils/constant";
import adminService from "../../../../../services/adminService";
import { toast } from "react-toastify";
import Button from "../../../../../components/Button/Button";
import Select from "react-select";
import { DISCOUNTTEXT, SEARCH } from "../../../../../utils/constant";
import DatePicker from "react-datepicker";
import _ from "lodash";
import "react-datepicker/dist/react-datepicker.css";
import "./Discounts.scss";
import SearchInput from "../../../../../components/SearchInput";
import generalHandling from "../../../../../utils/generalHandling";
import "../../../../../components/SearchInput/SearchInput.scss";
import imgError from "../../../../../assets/image/NoImg.jpg";
import InputSearch from "../../../../../components/SearchInput/InputSearch";
import NumberFormat from "react-number-format";
import ModalErrorItems from "../../../../../components/Modal/ModalErrorItems";
import TimePicker from "react-time-picker";

class Discount extends Component {
  constructor(props) {
    super(props);
    this.discount = React.createRef();
    this.elmDiscount = React.createRef();

    this.state = {
      nameItems: "",
      isEdit: false,
      isShowButtonAddDisscount: false,
      valueSetInputSearch: "",
      valueSetInputSelect: "",
      isShowListInput: false,
      isShowModalError: false,
      isHideModalError: false,
      isHideSlow: true,

      dataOptions: {
        optionsIdShop: null,
        optionsSele: null,
        optionsDayStart: null,
        optionsDayEnd: null,
        optionsCategory: null,
        optionsCategoryType: null,
        optionsItems: null,
        optionsDiscount: null,
      },

      listDataOptions: {
        listAllShops: [],
        listSale: [],
        listDiscount: [],
        listAllCategory: [],
        listAllCategoryType: [],
        listAllCategoryTypeNotConvert: [],
        listItems: [],
        dataNameItems: {},
      },

      countInput: [],
      dataErrorModal: [],
      listDataResItems: [],

      dataTabelItemsDiscount: {
        idShop: "",
        codeReduce: "",
        unitPrice: "",
        startDay: "",
        startEnd: "",
        forItemCategory: "",
        forItemType: "",
        itemsId: "",
      },
    };
  }

  // Mount
  componentDidMount = async () => {
    await this.handleSetDataDiscount();
    const node = this.elmDiscount;

    localStorage.setItem("topDiscount", node.current.offsetTop - 100);
  };

  // State + props thay ?????i m???i re-reder
  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.dataUser !== nextProps.dataUser ||
      this.props.listSale !== nextProps.listSale ||
      this.props.listAllShops !== nextProps.listAllShops ||
      this.props.listAllCategory !== nextProps.listAllCategory ||
      this.props.listAllCategoryType !== nextProps.listAllCategoryType ||
      this.props.language !== nextProps.language ||
      this.props.DCCData !== nextProps.DCCData ||
      this.props.allShops !== nextProps.allShops ||
      this.props.allcategory !== nextProps.allcategory ||
      this.props.voucher !== nextProps.voucher ||
      this.state.dataOptions !== nextState.dataOptions ||
      this.state.isShowButtonAddDisscount !==
        nextState.isShowButtonAddDisscount ||
      this.state.isShowListInput !== nextState.isShowListInput ||
      this.state.dataTabelItemsDiscount !== nextState.dataTabelItemsDiscount ||
      this.state.dataItems !== nextState.dataItems ||
      this.state.dataDiscount !== nextState.dataDiscount ||
      this.state.listDiscount !== nextState.listDiscount ||
      this.state.countInput !== nextState.countInput ||
      this.state.dataErrorModal !== nextState.dataErrorModal ||
      this.state.isShowModalError !== nextState.isShowModalError ||
      this.state.isHideSlow !== nextState.isHideSlow ||
      this.state.listDataOptions !== nextState.listDataOptions ||
      this.state.isEdit !== nextState.isEdit
    ) {
      return true;
    }
    return false;
  }

  // XL setData discount v?? (listSale,listAllShops,listAllCategory)
  handleSetDataDiscount = async (actions, dataCategory) => {
    let { language, DCCData, allShops, allcategory, listAllCategoryType } =
      this.props;
    let { listDataOptions, listDiscount, dataOptions, dataTabelItemsDiscount } =
      this.state;

    // Chuy???n data v??? d???ng options
    let listAllShops = generalHandling.handlConvertObject(
      allShops,
      "LIST_SHOP",
      this.props.language
    );
    let listSale = generalHandling.handlConvertObject(
      DCCData,
      "LIST_CATEGORY",
      this.props.language
    );
    let listAllCategory = generalHandling.handlConvertObject(
      allcategory,
      "LIST_CATEGORY",
      this.props.language
    );

    let typeCategory = [];
    if (listDataOptions.listAllCategoryTypeNotConvert.length > 0) {
      typeCategory = generalHandling.handlConvertObject(
        listDataOptions.listAllCategoryTypeNotConvert,
        "LIST_CATEGORY",
        this.props.language
      );
    }

    // L???y data gi???m gi??
    let dataAllDiscountItems = await adminService.getAllDiscountItems("All");
    let arrayData = dataAllDiscountItems.data.data;

    // G??n Gtri
    let dataValueEn = [];
    let dataValueVi = [];
    arrayData &&
      arrayData.length > 0 &&
      arrayData.map((item) => {
        dataValueVi.push({
          value: item.codeVocher,
          label: `${DISCOUNTTEXT.VN_DISCOUNT} ${item.limitVn} ${DISCOUNTTEXT.VN_DISCOUNT_SUB}`,
        });
        dataValueEn.push({
          value: item.codeVocher,
          label: `${DISCOUNTTEXT.EN_DISCOUNT} ${item.limitUs} ${DISCOUNTTEXT.EN_DISCOUNT_SUB}`,
        });
      });

    // Get list data
    let stateCoppyDiscount =
      languages.EN === language ? dataValueEn : dataValueVi;

    // Set list name Items
    let dataNameItems = [];
    for (let key in listDataOptions) {
      if (key === "dataNameItems") {
        const dataNameItemsLanguage =
          languages.EN === language
            ? listDataOptions[key].nameEn
            : listDataOptions[key].nameVi;
        dataNameItems = dataNameItemsLanguage || [];
      }
    }

    // Khi thay ?????i ng??n ng??? + thay ?????i options
    if (
      dataTabelItemsDiscount.forItemCategory !== "" ||
      dataTabelItemsDiscount.unitPrice !== "" ||
      dataTabelItemsDiscount.forItemType !== "" ||
      dataTabelItemsDiscount.itemsId !== ""
    ) {
      let optionsDataCategory = [];
      let optionsDataCategoryType = [];
      let optionsDataUnitPrice = [];
      let optionsDataNameItems = [];

      // Options value category
      if (
        dataTabelItemsDiscount.forItemCategory !== "" &&
        listAllCategory &&
        listAllCategory.length > 0
      ) {
        listAllCategory.map((item) => {
          if (item.value === dataTabelItemsDiscount.forItemCategory)
            optionsDataCategory.push(item);
        });
      }

      // Options value categoryType
      if (
        dataTabelItemsDiscount.forItemType !== "" &&
        listAllCategoryType &&
        listAllCategoryType.length > 0
      ) {
        let newListAllCategoryType = generalHandling.handlConvertObject(
          listDataOptions.listAllCategoryTypeNotConvert,
          "LIST_CATEGORY",
          language
        );

        newListAllCategoryType.map((item) => {
          if (item.value === dataTabelItemsDiscount.forItemType) {
            optionsDataCategoryType.push(item);
          }
        });
      }

      // Options value Discount
      if (
        dataTabelItemsDiscount.unitPrice !== "" &&
        stateCoppyDiscount &&
        stateCoppyDiscount.length > 0
      ) {
        stateCoppyDiscount.map((item) => {
          if (item.value === dataTabelItemsDiscount.unitPrice)
            optionsDataUnitPrice.push(item);
        });
      }

      // IF Language === En
      if (dataTabelItemsDiscount.itemsId !== "" && languages.EN === language) {
        if (
          listDataOptions.dataNameItems &&
          listDataOptions.dataNameItems.nameEn
        ) {
          listDataOptions.dataNameItems.nameEn.map((item) => {
            if (item.value === dataTabelItemsDiscount.itemsId)
              optionsDataNameItems.push(item);
          });
        }
      }

      // IF Language === VN
      if (dataTabelItemsDiscount.itemsId !== "" && languages.VI === language) {
        if (
          listDataOptions.dataNameItems &&
          listDataOptions.dataNameItems.nameVi
        ) {
          listDataOptions.dataNameItems.nameVi.map((item) => {
            if (item.value === dataTabelItemsDiscount.itemsId)
              optionsDataNameItems.push(item);
          });
        }
      }

      console.log(
        optionsDataCategory,
        optionsDataCategoryType,
        optionsDataUnitPrice,
        optionsDataNameItems
      );

      // Set state
      this.setState({
        dataOptions: {
          ...dataOptions,
          optionsCategory: optionsDataCategory[0],
          optionsCategoryType: optionsDataCategoryType[0],
          optionsDiscount: optionsDataUnitPrice[0] || null,
          optionsItems: optionsDataNameItems[0] || null,
        },
      });
    }

    // Set state
    this.setState({
      listDataOptions: {
        ...listDataOptions,
        listAllShops: listAllShops,
        listSale: listSale,
        listAllCategory: listAllCategory,
        listDiscount: stateCoppyDiscount,
        listItems: dataNameItems,
        listAllCategoryType: typeCategory,
      },
    });
  };

  // Did update
  componentDidUpdate = async (prevProps, prevState) => {
    let { voucher, language } = this.props;

    // Thay ?????i ng??n ng???
    if (prevProps.language !== this.props.language) {
      await this.handleSetDataDiscount();
    }

    // Khi voucher change ???????c thay ?????i
    if (prevProps.voucher !== this.props.voucher) {
      let { dataTabelItemsDiscount, dataOptions, listDataOptions } = this.state;
      let dataVoucher = voucher.voucher;

      let idShop = {
        value: dataVoucher.idShop,
        label: dataVoucher.Store && dataVoucher.Store.nameShop,
      };
      let reduce = {
        value: dataVoucher.codeReduce,
        label: dataVoucher.Discount && dataVoucher.Discount.valueEn,
      };
      let limitPrice = {
        value: dataVoucher.unitPrice,
        label:
          dataVoucher.Voucher && languages.VI === language
            ? `${DISCOUNTTEXT.VN_DISCOUNT}${" "}${
                dataVoucher.Voucher.limitVn
              }${" "}${DISCOUNTTEXT.VN_DISCOUNT_SUB}`
            : `${DISCOUNTTEXT.EN_DISCOUNT}${" "}${
                dataVoucher.Voucher.limitUs
              }${" "}${DISCOUNTTEXT.EN_DISCOUNT_SUB}`,
      };

      let forItemCategory = {
        value: dataVoucher.forItemCategory,
        label:
          dataVoucher.Category && languages.EN === language
            ? dataVoucher.Category.valueEn
            : dataVoucher.Category.valueVi,
      };

      let listAllCategoryType = await this.props.getAllCodeInToItems(
        forItemCategory.value
      );
      let newListAllCategoryType = generalHandling.handlConvertObject(
        listAllCategoryType,
        "LIST_CATEGORY",
        this.props.language
      );

      let forItemType = null;
      let dataResultSearchItem = [];
      if (dataVoucher.forItemType !== "EMPTY") {
        forItemType = {
          value: dataVoucher.forItemType,
          label:
            dataVoucher.Type && languages.EN === language
              ? dataVoucher.Type.valueEn
              : dataVoucher.Type.valueVi,
        };
        dataResultSearchItem = await this.handleGetDataNameItems(
          idShop.value,
          forItemCategory.value,
          forItemType.value
        );
      } else {
      }

      if (dataVoucher.itemsId === "EMPTY") dataVoucher.itemsId = "";
      if (dataVoucher.forItemType === "EMPTY") dataVoucher.forItemType = "";

      this.setState({
        isEdit: true,
        listDataResItems: dataResultSearchItem,
        isShowButtonAddDisscount: true,
        nameItems: dataVoucher.Item,
        listDataOptions: {
          ...listDataOptions,
          listAllCategoryType: newListAllCategoryType,
          listAllCategoryTypeNotConvert: listAllCategoryType,
        },
        dataTabelItemsDiscount: {
          ...dataTabelItemsDiscount,
          idShop: idShop.value,
          codeReduce: reduce.value,
          unitPrice: limitPrice.value,
          startDay: dataVoucher.dayStart,
          startEnd: dataVoucher.dayEnd,
          forItemCategory: forItemCategory.value,
          forItemType: dataVoucher.forItemType,
          itemsId: dataVoucher.itemsId,
        },
        dataOptions: {
          ...dataOptions,
          optionsIdShop: idShop,
          optionsSele: reduce,
          optionsDayStart: new Date(dataVoucher.dayStart),
          optionsDayEnd: new Date(dataVoucher.dayEnd),
          optionsCategory: forItemCategory,
          optionsCategoryType: forItemType,
          optionsDiscount: limitPrice,
        },
      });
    }
  };

  // Xl change input select
  handlChangeSlelect = async (valueOptions, name) => {
    let stateItemsDiscount = this.state.dataTabelItemsDiscount;
    let { forItemCategory } = this.state.dataTabelItemsDiscount;
    let dataOptionsCoppy = this.state.dataOptions;
    let { listDataOptions } = this.state;

    // Change select shop
    if (name.name === "idShop") {
      let dataResultSearchItem = [];
      if (forItemCategory !== "" && stateItemsDiscount.forItemType === "") {
        dataResultSearchItem = await this.handleGetDataNameItems(
          valueOptions.value,
          forItemCategory,
          "none"
        );
      }
      if (forItemCategory !== "" && stateItemsDiscount.forItemType !== "") {
        dataResultSearchItem = await this.handleGetDataNameItems(
          valueOptions.value,
          forItemCategory,
          stateItemsDiscount.forItemType
        );
      }

      this.setState({
        listDataResItems: dataResultSearchItem,
        dataOptions: {
          ...dataOptionsCoppy,
          optionsIdShop: valueOptions,
        },
        dataTabelItemsDiscount: {
          ...stateItemsDiscount,
          idShop: valueOptions.value,
        },
      });
    }

    // Change select discount
    if (name.name === "discount") {
      this.setState({
        dataOptions: {
          ...dataOptionsCoppy,
          optionsSele: valueOptions,
        },
        dataTabelItemsDiscount: {
          ...stateItemsDiscount,
          codeReduce: valueOptions.value,
        },
      });
    }

    // Change select category
    if (name.name === "forItemCategory") {
      let dataResultSearchItem;
      let listAllCategoryType = listDataOptions.listAllCategoryTypeNotConvert;

      // Get data categoryType + convert Object select
      listAllCategoryType = await this.props.getAllCodeInToItems(
        valueOptions.value
      );
      let newListAllCategoryType = generalHandling.handlConvertObject(
        listAllCategoryType,
        "LIST_CATEGORY",
        this.props.language
      );

      if (stateItemsDiscount.forItemType === "") {
        dataResultSearchItem = await this.handleGetDataNameItems(
          stateItemsDiscount.idShop,
          valueOptions.value,
          "none"
        );
      }
      if (stateItemsDiscount.forItemType !== "") {
        dataResultSearchItem = await this.handleGetDataNameItems(
          stateItemsDiscount.idShop,
          valueOptions.value,
          stateItemsDiscount.forItemType
        );
      }

      // Set state
      this.setState({
        listDataOptions: {
          ...listDataOptions,
          listAllCategoryType: newListAllCategoryType,
          listAllCategoryTypeNotConvert: listAllCategoryType,
        },
        listDataResItems: dataResultSearchItem,

        dataOptions: {
          ...dataOptionsCoppy,
          optionsCategory: valueOptions,
          optionsCategoryType: null,
        },
        dataTabelItemsDiscount: {
          ...stateItemsDiscount,
          forItemCategory: valueOptions.value,
          forItemType: "",
          itemsId: "",
        },
      });
    }

    // Change select categoryType
    if (name.name === "forItemCategoryType") {
      let dataResultSearchItem = await this.handleGetDataNameItems(
        dataOptionsCoppy.optionsIdShop.value,
        forItemCategory,
        valueOptions.value
      );

      // Set state
      this.setState({
        listDataResItems: dataResultSearchItem,
        dataOptions: {
          ...dataOptionsCoppy,
          optionsCategoryType: valueOptions,
        },
        dataTabelItemsDiscount: {
          ...stateItemsDiscount,
          forItemType: valueOptions.value,
          itemsId: "",
        },
      });
    }

    // Change get value items
    if (name.name === "idItems") {
      this.setState({
        dataOptions: {
          ...dataOptionsCoppy,
          optionsItems: valueOptions,
        },
        dataTabelItemsDiscount: {
          ...stateItemsDiscount,
          itemsId: valueOptions.value,
        },
      });
    }

    // Chnage voucher
    if (name.name === "voucher") {
      this.setState({
        dataOptions: {
          ...dataOptionsCoppy,
          optionsDiscount: valueOptions,
        },
        dataTabelItemsDiscount: {
          ...stateItemsDiscount,
          unitPrice: valueOptions.value,
        },
      });
    }
  };

  // Xl get data items Name handleGetDataNameItems
  handleGetDataNameItems = async (idShop, category, type, data) => {
    let arrayDataItems = await (
      await adminService.getItemsWhere({ idShop, category, type })
    ).data.data;
    return arrayDataItems;
  };

  // Select date
  handleChangeSelectDate = (date, name) => {
    let stateItemsDiscount = this.state.dataTabelItemsDiscount;
    let dataOptionsCoppy = this.state.dataOptions;
    const dateSet = new Date(date).toString();

    // console.log('N??m :',new Date(dateSet).getFullYear())
    // console.log('Th??ng :',new Date(dateSet).getMonth() + 1 )
    // console.log('Ng??y :',new Date(dateSet).getDate())
    // console.log('Gi??? :',new Date(dateSet).getHours())
    // console.log('Ph??t :',new Date(dateSet).getMinutes())

    // Select start day
    if (name === "startDay") {
      this.setState({
        dataOptions: {
          ...dataOptionsCoppy,
          optionsDayStart: date,
        },
        dataTabelItemsDiscount: {
          ...stateItemsDiscount,
          startDay: dateSet,
        },
      });
    }

    // Selcet endDay
    if (name === "endDay") {
      this.setState({
        dataOptions: {
          ...dataOptionsCoppy,
          optionsDayEnd: date,
        },
        dataTabelItemsDiscount: {
          ...stateItemsDiscount,
          startEnd: dateSet,
        },
      });
    }
  };

  // Handle change input add + delete
  handlecreateListinput = async (type) => {
    let { dataOptions, dataTabelItemsDiscount } = this.state;
    let res = {};

    // Add new discount
    if (type === "CREATE") {
      let newDataOptions = generalHandling.resetDefaultState(dataOptions);
      let newdataTabelItemsDiscount = generalHandling.resetDefaultState(
        dataTabelItemsDiscount
      );

      this.setState({
        nameItems: "",
        isShowButtonAddDisscount: !this.state.isShowButtonAddDisscount,
        dataOptions: {
          ...newDataOptions,
        },
        dataTabelItemsDiscount: {
          ...newdataTabelItemsDiscount,
        },
      });
    }

    // Add new discount
    if (type === "ADD") {
      let { dataTabelItemsDiscount } = this.state;

      res = await adminService.addNewDisCounts(dataTabelItemsDiscount);

      // Create Discount Items
      await this.props.getNewDataVoucher(dataTabelItemsDiscount.idShop);

      // N???u c?? l???i t???n t???i d??count
      if (
        res &&
        res.data &&
        res.data.errCode === -1 &&
        !_.isEmpty(res.data.data)
      ) {
        this.setState({
          dataErrorModal: res.data.data,
          isShowModalError: true,
        });
      }
    }

    // Hide Form Discount
    if (type === "DELETE") {
      this.setState({
        isShowButtonAddDisscount: false,
      });
    }

    // Update
    if (type === "UPDATA") {
      let resUpdate = await adminService.addNewDisCounts({
        ...dataTabelItemsDiscount,
        type: "UPDATE",
      });
      this.props.getNewDataVoucher(dataTabelItemsDiscount.idShop);

      // N???u c?? l???i
      if (resUpdate && resUpdate.data && resUpdate.data.errCode === -2) {
        toast.warn(<SwitchLanguage id="manageAdmin.toast.warn" />);
      }

      // N???u th??nh c??ng
      if (resUpdate && resUpdate.data && resUpdate.data.errCode === 0) {
        this.setState({
          isHideSlow: false,
          isShowButtonAddDisscount: false,
        });
        toast.success(<SwitchLanguage id="manageAdmin.toast.successVoucher" />);
      }
    }

    // N???u c?? l???i
    if (res && res.data && res.data.errCode === -2) {
      toast.warn(<SwitchLanguage id="manageAdmin.toast.warn" />);
    }

    // N???u th??nh c??ng
    if (res && res.data && res.data.errCode === 0) {
      this.setState({
        isShowButtonAddDisscount: false,
      });
      toast.success(<SwitchLanguage id="manageAdmin.toast.successVoucher" />);
    }
  };

  // SustomStyle select react
  customStyles = {
    menu: (provided, state) => ({
      ...provided,
      zIndex: 99999,
    }),
  };

  // Get data items from search
  handleGetDataComponentSearch = async (items, typeAction) => {
    if ((items !== "", typeAction !== "DELETE_VALUE")) {
      let valueSetInputSearch = "";
      let valueSetInputSelect = "";

      let { dataTabelItemsDiscount, listDataOptions, dataOptions } = this.state;
      let { language } = this.props;
      let id = items.idItems || "";

      // Loop get options category
      let newOptionsCategory = listDataOptions.listAllCategory.filter(
        (item) => {
          if (item.value === items.category) return item;
        }
      );

      // Get data categoryType + convert Object select
      let listAllCategoryType = await this.props.getAllCodeInToItems(
        newOptionsCategory[0].value
      );

      let newListAllCategoryTypeConvertObject =
        generalHandling.handlConvertObject(
          listAllCategoryType,
          "LIST_CATEGORY",
          language
        );

      // Loop get options categoryType
      let newOptionsCategoryType = newListAllCategoryTypeConvertObject.filter(
        (item) => {
          if (item.value === items.type) return item;
        }
      );

      // Add action reset value
      let dataResultSearchItem = await this.handleGetDataNameItems(
        items.idShop,
        items.category,
        items.type
      );

      if (typeAction === "SELECT_ITEMS_ARRAY") {
        dataResultSearchItem.map((item) => (item.actions = "NOT_SET_VALUE"));
      }
      if (typeAction === "SEARCH_CODE_ITEM") {
        dataResultSearchItem.map((item) => (item.actions = ""));
      }

      // Set state
      this.setState({
        valueSetInputSearch: valueSetInputSearch,
        valueSetInputSelect: valueSetInputSelect,
        listDataResItems: dataResultSearchItem,
        listDataOptions: {
          ...listDataOptions,
          listAllCategoryType: newListAllCategoryTypeConvertObject,
          listAllCategoryTypeNotConvert: listAllCategoryType,
        },
        dataOptions: {
          ...dataOptions,
          optionsCategory: newOptionsCategory[0],
          optionsCategoryType: newOptionsCategoryType[0],
        },
        dataTabelItemsDiscount: {
          ...dataTabelItemsDiscount,
          itemsId: id,
          forItemType: newOptionsCategoryType[0].value,
          forItemCategory: newOptionsCategory[0].value,
        },
      });

      return dataResultSearchItem;
    }
  };

  // Hide Modal
  handleShowHide = (resBoll) => {
    this.setState({
      isShowModalError: resBoll,
      isHideSlow: true,
    });
  };

  // Delete value input
  handleResetValueInput = () => {
    let { dataTabelItemsDiscount, dataOptions } = this.state;

    let newDataTabelItemsDiscount = generalHandling.resetDefaultState(
      dataTabelItemsDiscount
    );
    let newDataOptions = generalHandling.resetDefaultState(dataOptions);

    this.setState({
      isEdit: false,
      dataTabelItemsDiscount: {
        ...newDataTabelItemsDiscount,
      },
      dataOptions: {
        ...newDataOptions,
      },
    });
  };

  render() {
    let { language } = this.props;
    let {
      listDataResItems,
      valueSetInputSearch,
      isShowButtonAddDisscount,
      dataErrorModal,
      isShowModalError,
      isHideModalError,
      isHideSlow,
      nameItems,
      isEdit,
    } = this.state;
    let {
      optionsIdShop,
      optionsSele,
      optionsDayStart,
      optionsDayEnd,
      optionsCategory,
      optionsCategoryType,
      optionsDiscount,
    } = this.state.dataOptions;
    let {
      listSale,
      listAllShops,
      listAllCategory,
      listAllCategoryType,
      listDiscount,
    } = this.state.listDataOptions;

    return (
      <>
        {isShowModalError && (
          <ModalErrorItems
            isShow={isShowModalError}
            isHideSlow={isHideSlow}
            handleShowHide={this.handleShowHide}
            title={"warn"}
          >
            <div className="discount_modal">
              {dataErrorModal && dataErrorModal.limitPrice && (
                <>
                  <p className="heading">
                    {dataErrorModal.dataItems &&
                      dataErrorModal.dataItems !== "TYPE" &&
                      dataErrorModal.dataItems !== "CATEGORY" && (
                        <SwitchLanguage id="manageAdmin.modal.error" />
                      )}
                    {dataErrorModal.dataItems &&
                      dataErrorModal.dataItems === "TYPE" && (
                        <SwitchLanguage id="manageAdmin.modal.errorType" />
                      )}
                    {dataErrorModal.dataItems &&
                      dataErrorModal.dataItems === "CATEGORY" && (
                        <SwitchLanguage id="manageAdmin.modal.errorCategory" />
                      )}
                  </p>

                  <p className="discount">
                    {languages.EN === language ? "Discount :" : "Gi???m :"}{" "}
                    <span>{dataErrorModal.discount}</span>
                  </p>

                  <p className="voucher">
                    {languages.EN === language
                      ? "Price above :"
                      : "????n tr??n : "}
                    <span>
                      {languages.EN === language ? (
                        <NumberFormat
                          value={dataErrorModal.limitPrice.limitUs}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      ) : (
                        <NumberFormat
                          value={dataErrorModal.limitPrice.limitVn}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      )}
                      {languages.EN === language ? " USD" : " VND"}
                    </span>
                  </p>

                  <span className="sub_time">
                    {languages.EN === language
                      ? dataErrorModal.valueEn
                      : dataErrorModal.valueVi}
                  </span>

                  {dataErrorModal && dataErrorModal.name && (
                    <p className="category_Or_Type">
                      <SwitchLanguage id="manageAdmin.items.addDiscountSub" />
                      <span>
                        {languages.EN === language
                          ? dataErrorModal.name.valueEn
                          : dataErrorModal.name.valueVi}
                      </span>
                    </p>
                  )}

                  {dataErrorModal.dataItems &&
                    dataErrorModal.dataItems.dataImgItems && (
                      <div className="item">
                        <div className="wraper-img">
                          <img
                            src={`${process.env.REACT_APP_BACKEND_IMAGES_ITEMS}/${dataErrorModal.dataItems.dataImgItems.image}`}
                            alt={imgError}
                            className="img"
                          />
                        </div>

                        <div className="detail">
                          <p className="name-items">
                            {languages.EN === language
                              ? dataErrorModal.dataItems.nameEn.slice(0, 30) +
                                "..."
                              : dataErrorModal.dataItems.name.slice(0, 30) +
                                "..."}
                          </p>
                          <div className="list-price">
                            <p className="price">
                              <span className="sub-price">
                                Gi?? : {""}
                                {dataErrorModal &&
                                  dataErrorModal.dataItems &&
                                  dataErrorModal.dataItems.newPrice > 0 && (
                                    <span>
                                      {languages.EN === language ? (
                                        <NumberFormat
                                          value={
                                            dataErrorModal.dataItems.newPriceUS
                                          }
                                          displayType={"text"}
                                          thousandSeparator={true}
                                        />
                                      ) : (
                                        <NumberFormat
                                          value={
                                            dataErrorModal.dataItems.newPrice
                                          }
                                          displayType={"text"}
                                          thousandSeparator={true}
                                        />
                                      )}
                                    </span>
                                  )}
                                {dataErrorModal &&
                                  dataErrorModal.dataItems &&
                                  dataErrorModal.dataItems.newPrice === 0 && (
                                    <span>
                                      {languages.EN === language ? (
                                        <NumberFormat
                                          value={
                                            dataErrorModal.dataItems.priceUS
                                          }
                                          displayType={"text"}
                                          thousandSeparator={true}
                                        />
                                      ) : (
                                        <NumberFormat
                                          value={dataErrorModal.dataItems.price}
                                          displayType={"text"}
                                          thousandSeparator={true}
                                        />
                                      )}
                                    </span>
                                  )}
                                {languages.EN === language ? " USD" : " VND"}
                              </span>
                            </p>
                            <p className="code-items">
                              M?? :{" "}
                              <span>{dataErrorModal.dataItems.idItems}</span>{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                  <div className="list-button">
                    <span onClick={() => this.handlecreateListinput("UPDATA")}>
                      <Button
                        type={"submit-form-data"}
                        content={
                          <SwitchLanguage id="manageAdmin.button.Continue" />
                        }
                      />
                    </span>

                    <span>
                      <Button
                        type="close-form-data"
                        content={
                          <SwitchLanguage id="manageAdmin.button.close" />
                        }
                      />
                    </span>
                  </div>
                </>
              )}
            </div>
          </ModalErrorItems>
        )}

        <div className="l-12" ref={this.elmDiscount}>
          <p className="heading-manage-user">
            <SwitchLanguage id="manageAdmin.items.discount" />
          </p>
        </div>

        <div className="list_all_discount">
          {/* Select Shop */}
          {listAllShops && listAllShops.length > 0 && (
            <div className="form-input col l-3">
              <label className="input-label">
                <SwitchLanguage id="manageAdmin.form.nameShop" />
              </label>
              <Select
                value={optionsIdShop}
                onChange={this.handlChangeSlelect}
                options={listAllShops}
                styles={this.customStyles}
                name="idShop"
                placeholder={<SwitchLanguage id="manageAdmin.form.nameShop" />}
              />
            </div>
          )}

          {optionsIdShop !== null && (
            <InputSearch
              classWraper="form-input col l-6"
              idSwitchLanguage="manageAdmin.items.search-code-items"
              TYPE_INPUT="SEARCH_CODE_ITEM"
              TABEL={SEARCH.TABEL_SEARCH}
              TYPE={SEARCH.TYPE_SEARCH}
              IDSHOP={optionsIdShop.value}
              handleGetDataComponentSearch={this.handleGetDataComponentSearch}
              setValueSearchCode={valueSetInputSearch}
            />
          )}

          {/* Select m?? gi???m */}
          {listSale && listSale.length > 0 && (
            <div className="form-input col l-3">
              <label className="input-label">
                <SwitchLanguage id="manageAdmin.form.sale" />
              </label>
              <Select
                value={optionsSele}
                onChange={this.handlChangeSlelect}
                options={listSale}
                styles={this.customStyles}
                name="discount"
                isDisabled={optionsIdShop ? false : true}
                placeholder={
                  <SwitchLanguage id="manageAdmin.form.planceholder_sale" />
                }
              />
            </div>
          )}

          {/* Select m?? gi???m */}
          {listSale && listSale.length > 0 && (
            <div className="form-input col l-3">
              <label className="input-label">
                <SwitchLanguage id="manageAdmin.form.ifDiscount" />
              </label>
              <Select
                value={optionsDiscount}
                onChange={this.handlChangeSlelect}
                options={listDiscount}
                styles={this.customStyles}
                name="voucher"
                placeholder={
                  <SwitchLanguage id="manageAdmin.form.planceholder_ifDiscount" />
                }
              />
            </div>
          )}

          {/* Category */}
          <div className="form-input col l-3">
            <label className="input-label">
              <SwitchLanguage id="manageAdmin.form.category" />
            </label>
            <Select
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

          {/* Type */}
          <div className="form-input col l-3">
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

          {/* items */}
          {listDataResItems && listDataResItems.length > 0 && (
            <>
              <InputSearch
                valueName={nameItems}
                classWraper="form-input col l-3"
                idSwitchLanguage="manageAdmin.items.select-items"
                TYPE_INPUT="SELECT_ITEMS_ARRAY"
                handleGetDataComponentSearch={this.handleGetDataComponentSearch}
                dataArrayItemsSelect={listDataResItems}
              />
            </>
          )}

          {/* Select start Date */}
          <div className="form-input col l-3">
            <label className="input-label">
              <SwitchLanguage id="manageAdmin.form.startDay" />
            </label>
            <DatePicker
              selected={optionsDayStart}
              minDate={new Date()}
              onChange={(date) => this.handleChangeSelectDate(date, "startDay")}
              className="fixCss"
              name="startDay"
              placeholderText={
                languages.EN === language
                  ? "Select day start"
                  : "Ch???n ng??y b???t ?????u ??p d???ng"
              }
              showTimeSelect
              autoComplete="off"
              timeFormat="HH:mm"
              timeIntervals={30}
              dateFormat="Pp"
            />
          </div>

          {/* Select start Date */}
          <div className="form-input col l-3">
            <label className="input-label">
              <SwitchLanguage id="manageAdmin.form.endDay" />
            </label>
            <DatePicker
              disabled={optionsDayStart ? false : true}
              selected={optionsDayEnd}
              minDate={optionsDayStart}
              onChange={(date) => this.handleChangeSelectDate(date, "endDay")}
              className="fixCss"
              placeholderText={
                languages.EN === language
                  ? "Select end start"
                  : "Ch???n ng??y k???t th??c ??p d???ng"
              }
              showTimeSelect
              autoComplete="off"
              timeFormat="HH:mm"
              timeIntervals={30}
              dateFormat="Pp"
            />
          </div>
        </div>

        <div className="col l-12">
          <div className="list_input " style={{ alignItems: "center" }}>
            <span
              style={{ display: "inline-block" }}
              onClick={() =>
                optionsIdShop &&
                optionsSele &&
                optionsDayStart &&
                optionsDayEnd &&
                optionsCategory &&
                optionsDiscount &&
                this.handlecreateListinput("ADD")
              }
            >
              {isEdit && (
                <Button
                  type={
                    optionsIdShop &&
                    optionsSele &&
                    optionsDayStart &&
                    optionsDayEnd &&
                    optionsCategory &&
                    optionsDiscount &&
                    isEdit &&
                    "edit-form-data"
                  }
                  content={<SwitchLanguage id="manageAdmin.button.editNow" />}
                />
              )}

              {!isEdit && (
                <Button
                  type={
                    optionsIdShop &&
                    optionsSele &&
                    optionsDayStart &&
                    optionsDayEnd &&
                    optionsCategory &&
                    optionsDiscount
                      ? "submit-form-data"
                      : "ban-form-data"
                  }
                  color={
                    optionsIdShop &&
                    optionsSele &&
                    optionsDayStart &&
                    optionsDayEnd &&
                    optionsCategory &&
                    optionsDiscount
                      ? "var(--color-BTN-manage)"
                      : "#fb9e9e"
                  }
                  content={<SwitchLanguage id="manageAdmin.form.addDiscount" />}
                />
              )}
            </span>

            <div
              className="col l-2"
              onClick={() =>
                optionsIdShop &&
                optionsSele &&
                optionsDayStart &&
                optionsDayEnd &&
                optionsCategory &&
                optionsDiscount &&
                this.handleResetValueInput()
              }
            >
              <Button
                type="submit-form-data"
                content={<SwitchLanguage id="manageAdmin.button.delete" />}
                color={
                  optionsIdShop &&
                  optionsSele &&
                  optionsDayStart &&
                  optionsDayEnd &&
                  optionsCategory &&
                  optionsDiscount
                    ? "#ce163b"
                    : "#fb9e9e"
                }
                width="70%"
                margin="4px 0 0 0"
                border="50px"
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    itemsAll: state.admin.items.itemsAll,
    language: state.app.language,

    DCCData: state.admin.listAllCodeItems.DCCData,
    allShops: state.admin.listShops.allShops,
    allcategory: state.admin.dataForm.category,
    voucher: state.admin.voucher,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getDataItems: (type) => dispatch(actions.getDataItemsStart(type)),
    getAllCodeInToItems: (type) =>
      dispatch(actions.getAllCodeInToItemsStart(type)),
    getNewDataVoucher: (id) => dispatch(actions.getNewDataVoucher(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Discount);
