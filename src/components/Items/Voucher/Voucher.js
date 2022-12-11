import React, { Component } from "react";
import { connect } from "react-redux";
import SwitchLanguage from "../../../SwitchLanguage";
import Button from "../../Button";
import { languages, DISCOUNTTEXT, path } from "../../../utils/constant";
import NumberFormat from "react-number-format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import * as actions from "../../../store/action";
import { Navigate } from "react-router-dom";

import "./Voucher.scss";
import ModalErrorItems from "../../Modal/ModalErrorItems";
import DetailVoucher from "./DetailVoucher/DetailVoucher";
class ListVoucher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDataVoucher: [],
      dataDetailVoucher: null,
    };
  }

  componentDidMount = async () => {
    this.setState({
      listDataVoucher: this.props.dataVoucher,
    });
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.dataVoucher !== this.props.dataVoucher) {
      this.setState({
        listDataVoucher: this.props.dataVoucher,
      });
    }
  };

  // State + props thay đổi mới re-reder
  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.language !== nextProps.language ||
      this.props.isNotUser !== nextProps.isNotUser ||
      this.props.dataVoucher !== nextProps.dataVoucher ||
      this.state.listDataVoucher !== nextState.listDataVoucher ||
      this.state.dataDetailVoucher !== nextState.dataDetailVoucher
    ) {
      return true;
    }
    return false;
  }

  // Change icon
  handleChangeVoucher = async (actions, data, index) => {
    let { changeVoucherItems } = this.props;
    let { listDataVoucher } = this.state;

    if (actions === "CHANGE") {
      changeVoucherItems(listDataVoucher[index], actions);

      setTimeout(() => {
        document.documentElement.scrollTop =
          localStorage.getItem("topDiscount");
      }, 200);
    }

    if (actions === "DELETE") {
      changeVoucherItems(listDataVoucher[index], actions);
    }
  };

  //
  handleClickBTNVoucher = (className, data) => {
    if (className !== "list_button") {
      if (className === "content-btn-form-input voucher_items") {
      } else {
        this.setState({
          dataDetailVoucher: data,
        });
      }
    }
  };

  //
  handleHideDetailVocher = (hide) => {
    this.setState({
      dataDetailVoucher: null,
    });
  };

  render() {
    let { language, isNotUser } = this.props;
    let { listDataVoucher, dataDetailVoucher } = this.state;

    return (
      <>
        {dataDetailVoucher !== null && (
          <DetailVoucher
            handleHide={this.handleHideDetailVocher}
            dataVoucher={dataDetailVoucher}
          />
        )}

        <div className="allVoucher">
          {listDataVoucher &&
            listDataVoucher.length > 0 &&
            listDataVoucher.map((resultItemsDiscount, index) => {
              return (
                <div className="col l-6" key={resultItemsDiscount.id}>
                  <div className="voucher">
                    {isNotUser && (
                      <span className="list_icon">
                        <span
                          onClick={() =>
                            this.handleChangeVoucher(
                              "CHANGE",
                              resultItemsDiscount,
                              index
                            )
                          }
                        >
                          <FontAwesomeIcon
                            className="icon_close one"
                            icon={faPenToSquare}
                          />
                        </span>

                        <span
                          onClick={() =>
                            this.handleChangeVoucher(
                              "DELETE",
                              resultItemsDiscount,
                              index
                            )
                          }
                        >
                          <FontAwesomeIcon
                            className="icon_close tow"
                            icon={faCircleXmark}
                          />
                        </span>
                      </span>
                    )}

                    <div className="voucher_wraper">
                      <div className="info_shop">
                        <div className="border_img">
                          <img
                            className="avata_shop"
                            src={`${process.env.REACT_APP_BACKEND_IMAGES_AVT_SHOP}/${resultItemsDiscount.Store.avata}`}
                            alt=""
                          />
                        </div>
                        <span className="name_shop">
                          {resultItemsDiscount.Store.nameShop.length > 18
                            ? resultItemsDiscount.Store.nameShop.slice(0, 18) +
                              "..."
                            : resultItemsDiscount.Store.nameShop}
                        </span>
                      </div>
                    </div>

                    <div className="sub_voucher">
                      <p className="discount_percent">
                        {`${
                          languages.EN === language
                            ? DISCOUNTTEXT.REDUCE_EN
                            : DISCOUNTTEXT.REDUCE_VI
                        } ${resultItemsDiscount.Discount.valueEn}`}
                      </p>

                      <p className="limit">
                        {languages.EN === language
                          ? DISCOUNTTEXT.EN_DISCOUNT
                          : DISCOUNTTEXT.VN_DISCOUNT}{" "}
                        {languages.VI === language ? (
                          <NumberFormat
                            value={resultItemsDiscount.Voucher.limitVn}
                            displayType={"text"}
                            thousandSeparator={true}
                          />
                        ) : (
                          resultItemsDiscount.Voucher.limitUs
                        )}{" "}
                        {languages.EN === language
                          ? DISCOUNTTEXT.EN_DISCOUNT_SUB
                          : DISCOUNTTEXT.VN_DISCOUNT_SUB}
                        {" / "}
                        {resultItemsDiscount.itemsId !== "EMPTY" &&
                          resultItemsDiscount.Item && (
                            <SwitchLanguage id="manageAdmin.items.itemsDiscount" />
                          )}
                        {resultItemsDiscount.itemsId === "EMPTY" &&
                          resultItemsDiscount.Category !== "EMPTY" &&
                          resultItemsDiscount.Type.valueEn !== null && (
                            <SwitchLanguage id="manageAdmin.items.typeDiscount" />
                          )}
                        {resultItemsDiscount.itemsId === "EMPTY" &&
                          resultItemsDiscount.Category !== "EMPTY" &&
                          resultItemsDiscount.Type.valueEn === null && (
                            <SwitchLanguage id="manageAdmin.items.discountVocher" />
                          )}
                      </p>

                      {resultItemsDiscount.itemsId !== "EMPTY" &&
                        resultItemsDiscount.Item &&
                        resultItemsDiscount.Item.name && (
                          <div className="show_items">
                            <div className="img_items">
                              <img
                                className="img"
                                src={`${process.env.REACT_APP_BACKEND_IMAGES_ITEMS}/${resultItemsDiscount.Items_color_image.image}`}
                                alt=""
                              />
                            </div>

                            <div className="detail_items">
                              <p className="name_items">
                                {languages.EN === language
                                  ? resultItemsDiscount.Item.nameEn.slice(
                                      0,
                                      22
                                    ) + "..."
                                  : resultItemsDiscount.Item.name.slice(0, 22) +
                                    "..."}
                              </p>

                              <p className="code">
                                <SwitchLanguage id="manageAdmin.items.code" />
                                <span className="items_code">
                                  {resultItemsDiscount.itemsId}
                                </span>
                              </p>

                              <p className="times">
                                <SwitchLanguage id="manageAdmin.items.from" />
                                {"  "}
                                <span className="content-time">
                                  {new Date(
                                    resultItemsDiscount.dayStart
                                  ).getHours()}
                                  {":"}
                                  {new Date(
                                    resultItemsDiscount.dayStart
                                  ).getMinutes() +
                                    "" ===
                                  "0"
                                    ? new Date(
                                        resultItemsDiscount.dayStart
                                      ).getMinutes() + "0"
                                    : new Date(
                                        resultItemsDiscount.dayStart
                                      ).getMinutes()}
                                  {" - "}
                                  {new Date(
                                    resultItemsDiscount.dayStart
                                  ).getDate()}
                                  {"/"}
                                  {new Date(
                                    resultItemsDiscount.dayStart
                                  ).getMonth() + 1}
                                  {"/"}
                                  {new Date(
                                    resultItemsDiscount.dayStart
                                  ).getFullYear()}
                                  {"  "}
                                </span>
                              </p>
                            </div>
                          </div>
                        )}

                      {resultItemsDiscount.itemsId === "EMPTY" && (
                        <div className="detail_voucher-not-items">
                          <p>
                            <SwitchLanguage id="manageAdmin.items.category" />

                            <span className="name_items">
                              {languages.EN === language
                                ? resultItemsDiscount.Category.valueEn
                                : resultItemsDiscount.Category.valueVi}
                            </span>

                            {resultItemsDiscount.Type.valueEn !== null && (
                              <span className="name_items">
                                {" / "}
                                {languages.EN === language
                                  ? resultItemsDiscount.Type.valueEn
                                  : resultItemsDiscount.Type.valueVi}
                              </span>
                            )}
                          </p>

                          <p className="times">
                            <SwitchLanguage id="manageAdmin.items.from" />
                            {"  "}
                            <span className="content-time">
                              {new Date(
                                resultItemsDiscount.dayStart
                              ).getHours()}
                              {":"}
                              {new Date(
                                resultItemsDiscount.dayStart
                              ).getMinutes() +
                                "" ===
                              "0"
                                ? new Date(
                                    resultItemsDiscount.dayStart
                                  ).getMinutes() + "0"
                                : new Date(
                                    resultItemsDiscount.dayStart
                                  ).getMinutes()}
                              {" - "}
                              {new Date(resultItemsDiscount.dayStart).getDate()}
                              {"/"}
                              {new Date(
                                resultItemsDiscount.dayStart
                              ).getMonth() + 1}
                              {"/"}
                              {new Date(
                                resultItemsDiscount.dayStart
                              ).getFullYear()}
                              {"  "}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>

                    <div
                      className="list_button"
                      onClick={(e) =>
                        this.handleClickBTNVoucher(
                          e.target.className,
                          resultItemsDiscount
                        )
                      }
                    >
                      <Button
                        type="submit_voucher"
                        content={
                          <SwitchLanguage id="manageAdmin.items.submitVoucher" />
                        }
                      />
                      <Button
                        type="text"
                        content={
                          <SwitchLanguage id="manageAdmin.items.detail_voucher" />
                        }
                      />
                    </div>
                  </div>
                </div>
              );
            })}
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
  return {
    changeVoucherItems: (voucher, type) =>
      dispatch(actions.changeVoucherItems(voucher, type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListVoucher);
