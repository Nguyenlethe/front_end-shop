import React, { Component } from "react";
import { connect } from "react-redux";
import { DISCOUNTTEXT, path, languages } from "../../../utils/constant";
import SwitchLanguage from "../../../SwitchLanguage";
import withRouter from "../../../routes/withRouter";
import * as actions from "../../../store/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faAngleLeft,
  faSleigh,
} from "@fortawesome/free-solid-svg-icons";
import {
  FaFacebook,
  FaFacebookMessenger,
  FaTwitter,
  FaTelegram,
  FaRegHeart,
  FaHeart,
} from "react-icons/fa";
import notItemsImg from "../../../assets/image/NoImg.jpg";
import appService from "../../../services/appService";
import ListStar from "../ListStar";
import NumberFormat from "react-number-format";
import Ship from "../../../assets/image/iconShip.png";
import Button from "../../../components/Button";

import "bootstrap-icons/font/bootstrap-icons.css";

import "./DetailItems.scss";
import ModalLoad from "../../Modal/ModalLoad";
import { toast } from "react-toastify";
class DetailItems extends Component {
  constructor(props) {
    super(props);
    this.listResultDataSearch = React.createRef();
    this.listImgItems = React.createRef();

    this.state = {
      indexActiveColor: 100,
      indexActiveSize: 100,
      newPrice: 0,
      newPriceUS: 0,
      price: 0,
      priceUS: 0,

      items: [],
      countSold: [],
      discountData: [],
      countEvaluate: [],
      allDataPriceShip: [],
      provinceFreeShip: [],
      listItemsUserLike: [],
      provinceFreeShipCategory: [],
      provinceFreeShipCategoryType: [],
      priceItemsShip: [],
      priceShipType: [],
      priceShipCategory: [],

      isLoadItems: true,
      isActive: false,
      isEmptyColorSize: false,

      isLike: 0,
      evaluate: 0,
      indexImg: 0,
      countLike: 0,
      totalStars: 0,
      indexScrollX: 0,
      totalStarsAllType: 0,

      dataTalbelOrderItems: {
        color: "",
        size: "",
        itemsNumber: 1,
      },
    };
  }

  // Mount
  componentDidMount = async () => {
    let idItems = this.props.params.get("idItems");
    this.props.getDataItems({
      amount: "ONE",
      idItems: idItems,
      idShop: "EMPTY",
      category: "EMPTY",
      type: "EMPTY",
    });
    this.handleSetItemsLikeORFollow(idItems);
  };

  // Set list items like
  handleSetItemsLikeORFollow = (id) => {
    let { listItemsUserLike, oneItems } = this.props;
    let isActive = false;

    // Nếu có like
    if (listItemsUserLike.length > 0) {
      listItemsUserLike.map((item) => {
        if (item.idItems == id) {
          isActive = true;
        }
      });
    }

    // Set state
    this.setState({
      isActive: isActive,
      listItemsUserLike: listItemsUserLike,
    });
  };

  // Update
  componentDidUpdate = async (prevProps, prevState) => {
    let { oneItems, listItemsUserLike } = this.props;
    let { isLoadItems } = this.state;

    // Language change
    if (prevProps.language !== this.props.language) {
    }

    // ADD data items
    if (prevProps.oneItems !== this.props.oneItems) {
      let countLike = oneItems[0].countLike.length;
      let delay = 0;
      let evaluate = 0;
      let provinceFreeShip = [];
      let provinceFreeShipCategory = [];
      let provinceFreeShipType = [];

      if (
        this.props.oneItems[0] &&
        this.props.oneItems[0].allStar &&
        this.props.oneItems[0].allStar.medium
      ) {
        evaluate = this.props.oneItems[0].allStar.medium;
      }

      if (isLoadItems == true) {
        delay = 600;
      }

      let item = oneItems[0].dataShip;
      if (item) {
        provinceFreeShip = item.filter((ship) => {
          if (ship.priceShipVN == 0) {
            return ship;
          }
        });
      }
      let itemCategory = oneItems[0].dataShipCategory;
      if (itemCategory) {
        provinceFreeShipCategory = itemCategory.filter((ship) => {
          if (ship.priceShipVN == 0) {
            return ship;
          }
        });
      }
      let itemType = oneItems[0].dataShipCategoryType;
      if (itemType) {
        provinceFreeShipType = itemType.filter((ship) => {
          if (ship.priceShipVN == 0) {
            return ship;
          }
        });
      }

      const allDataPriceShip = [...item, ...itemType, ...itemCategory];

      setTimeout(() => {
        this.setState({
          indexActiveColor: 100,
          indexActiveSize: 100,
          allDataPriceShip: allDataPriceShip,
          provinceFreeShip: provinceFreeShip,
          provinceFreeShipCategory: provinceFreeShipCategory,
          provinceFreeShipCategoryType: provinceFreeShipType,

          priceItemsShip: item,
          priceShipType: itemType,
          priceShipCategory: itemCategory,

          newPrice: oneItems[0].newPrice,
          newPriceUS: oneItems[0].newPriceUS,
          price: oneItems[0].price,
          priceUS: oneItems[0].priceUS,

          discountData: oneItems[0].discountData,
          countSold: oneItems[0].sold,
          countEvaluate: oneItems[0].countOrContentFacebackItems,
          evaluate: evaluate,
          isLoadItems: false,
          items: oneItems[0],
          countLike: countLike,
          isLike: 0,
        });
      }, delay);
    }

    // Params change
    if (prevProps.params !== this.props.params) {
      let idItems = this.props.params.get("idItems");
      let idItemsOld = prevProps.params.get("idItems");
      this.handleSetItemsLikeORFollow(idItems);
      this.handleAddLikeOrQuitLike(idItemsOld);
      this.props.getDataItems({
        amount: "ONE",
        idItems: idItems,
        idShop: "EMPTY",
        category: "EMPTY",
        type: "EMPTY",
      });
    }

    // Data like thay dổi
    if (prevProps.listItemsUserLike !== this.props.listItemsUserLike) {
      let idItems = this.props.params.get("idItems");
      this.handleSetItemsLikeORFollow(idItems);
    }
  };

  // Trước khi chết
  componentWillUnmount = () => {
    let idItems = this.props.params.get("idItems");
    this.handleAddLikeOrQuitLike(idItems);
  };

  // Handle add like or Quit like
  handleAddLikeOrQuitLike = async (idItems) => {
    let { isActive, isLike, items } = this.state;
    let { id } = this.props.dataUser;

    // Bỏ like
    if (isActive == true && isLike < 0) {
      let res = await appService.getLikeOrFollowItemsShop({
        idUser: id,
        idShop: items.idShop,
        type: "DELETE",
        idItems: idItems,
      });
      // console.log('Bỏ like', res)
    }

    // Like
    if (isActive == false && isLike > 0) {
      let res = await appService.getLikeOrFollowItemsShop({
        idUser: id,
        idShop: items.idShop,
        type: "ADD",
        idItems: idItems,
      });
      // console.log('Like',res)
    }

    // Not Change
    if (isActive == true && isLike == 0) {
    }
  };

  // Click likes
  handleLikeItems = () => {
    let { isLike, countLike, isActive } = this.state;
    let { islogin, permission, id } = this.props.dataUser;
    let isLikeCopy = countLike;

    if (islogin == "true") {
      // Nếu isActive = false
      if (!isActive) {
        if (isLikeCopy == isLikeCopy && isLike == 0) {
          this.setState({
            isLike: 1,
          });
        }

        if (isLikeCopy == isLikeCopy && isLike != 0) {
          this.setState({
            isLike: 0,
          });
        }
      } else {
        if (isLikeCopy == isLikeCopy && isLike == 0) {
          this.setState({
            isLike: -1,
          });
        }

        if (isLikeCopy == isLikeCopy && isLike != 0) {
          this.setState({
            isLike: 0,
          });
        }
      }
    } else {
      this.props.navigate(`${path.LOGINPAGE}`);
    }
  };

  // Next img
  handleNextImg = (type) => {
    const node = this.listImgItems.current;
    let indexImgPeviews = this.state.indexImg;
    let { dataColorImg } = this.state.items;
    let { indexScrollX } = this.state;

    if (type === "BACK") {
      indexImgPeviews = this.state.indexImg - 1;
      indexScrollX -= 82;

      if (indexImgPeviews < 0) {
        indexImgPeviews = dataColorImg.length - 1;
        indexScrollX = dataColorImg.length * 70;
      }
      node.scrollLeft = indexScrollX;
    }

    if (type === "NEXT") {
      indexImgPeviews = this.state.indexImg + 1;
      indexScrollX += 80;

      if (indexImgPeviews > dataColorImg.length - 1) {
        indexImgPeviews = 0;
        indexScrollX = 0;
      }
      node.scrollLeft = indexScrollX;
    }

    this.setState({
      indexImg: indexImgPeviews,
      indexScrollX: indexScrollX,
    });
  };

  // handle click add index active
  handleActiveClick = (index, valueTabel, type, date) => {
    let { dataTalbelOrderItems } = this.state;

    if (type == "COLOR") {
      this.setState({
        indexActiveColor: index,
        indexImg: index,
        isEmptyColorSize: false,
        dataTalbelOrderItems: {
          ...dataTalbelOrderItems,
          color: valueTabel,
        },
      });
    }
    if (type == "SIZE") {
      this.setState({
        indexActiveSize: index,
        isEmptyColorSize: false,
        dataTalbelOrderItems: {
          ...dataTalbelOrderItems,
          size: valueTabel,
        },
      });
    }

    if (type == "CHANGE_AMOUNT") {
      this.setState({
        dataTalbelOrderItems: {
          ...dataTalbelOrderItems,
          itemsNumber: valueTabel,
        },
      });
    }

    if (type == "BLUR_INPUT") {
      if (valueTabel == "" || valueTabel <= 0) {
        this.setState({
          dataTalbelOrderItems: {
            ...dataTalbelOrderItems,
            itemsNumber: 1,
          },
        });
      }
    }

    if (type == "CHANGE_DOWN_AMOUNT") {
      let itemsNumber = dataTalbelOrderItems.itemsNumber - 1;
      if (itemsNumber >= 1) {
        this.setState({
          dataTalbelOrderItems: {
            ...dataTalbelOrderItems,
            itemsNumber: itemsNumber,
          },
        });
      }
    }

    if (type == "CHANGE_UP_AMOUNT") {
      let itemsNumber = dataTalbelOrderItems.itemsNumber + 1;

      this.setState({
        dataTalbelOrderItems: {
          ...dataTalbelOrderItems,
          itemsNumber: itemsNumber,
        },
      });
    }
  };

  // XL mua và thêm vào giỏ hàng
  handleBuyItems = (type) => {
    let { dataUser, navigate } = this.props;
    let { indexActiveColor, indexActiveSize, items, dataTalbelOrderItems } =
      this.state;

    if (dataUser.islogin != "true") {
      navigate(`${path.LOGINPAGE}`);
    }

    if (type == "CART") {
      if (indexActiveColor == 100 || indexActiveSize == 100) {
        this.setState({ isEmptyColorSize: true });
      }

      if (indexActiveColor != 100 || indexActiveSize != 100) {
        toast.success(<SwitchLanguage id="manageAdmin.toast.addItemsCart" />);
        this.props.addNewItemsToCart({
          itemsId: items.idItems,
          userGuestId: dataUser.id,
          idShop: items.idShop,
          itemsNumber: dataTalbelOrderItems.itemsNumber,
          timeCreate: new Date(),
          color: dataTalbelOrderItems.color,
          size: dataTalbelOrderItems.size,
        });
      }
    }
  };

  render() {
    let {
      provinceFreeShipCategory,
      provinceFreeShipCategoryType,
      items,
      indexImg,
      isLike,
      countLike,
      isActive,
      isLoadItems,
      evaluate,
      countEvaluate,
      countSold,
      discountData,
      newPrice,
      newPriceUS,
      price,
      priceUS,
      provinceFreeShip,
      allDataPriceShip,
      priceItemsShip,
      priceShipType,
      priceShipCategory,
      indexActiveColor,
      isEmptyColorSize,
      indexActiveSize,
    } = this.state;

    let { itemsNumber } = this.state.dataTalbelOrderItems;

    let { language } = this.props;
    let { dataUser } = this.props;

    return (
      <>
        <ModalLoad isShow={isLoadItems} />
        <div className="grid detail-items">
          <div className="grid wide">
            <div className="row">
              {items && (
                <>
                  <div className="detail-sub-text-items l-12">
                    <div className="list-detail">
                      <div className="col l-4">
                        <div className="border-img-items">
                          <div className="border-img-show">
                            {items.dataColorImg &&
                            items.dataColorImg[indexImg] &&
                            items.dataColorImg[indexImg].image ? (
                              <img
                                src={`${process.env.REACT_APP_BACKEND_IMAGES_ITEMS}/${items.dataColorImg[indexImg].image}`}
                                alt="Ảnh sản phẩm "
                              />
                            ) : (
                              <img src={`${notItemsImg}`} alt="Ảnh sản phẩm " />
                            )}
                          </div>

                          <div className="l-12 hug_list-img">
                            <FontAwesomeIcon
                              className="icon-next-left"
                              icon={faAngleLeft}
                              onClick={() => this.handleNextImg("BACK")}
                            />

                            <div
                              className="list-img-detail-items"
                              ref={this.listImgItems}
                            >
                              {items.dataColorImg &&
                                items.dataColorImg.map((img, index) => {
                                  return (
                                    <div
                                      className="col l-3"
                                      key={img.image}
                                      onClick={() =>
                                        this.setState({ indexImg: index })
                                      }
                                    >
                                      <div className="wraper-img">
                                        <img
                                          src={`${process.env.REACT_APP_BACKEND_IMAGES_ITEMS}/${img.image}`}
                                          alt="Ảnh sản phẩm "
                                          style={{
                                            border:
                                              index == indexImg
                                                ? "2px solid red"
                                                : "",
                                          }}
                                        />
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>

                            <FontAwesomeIcon
                              className="icon-next-right"
                              icon={faAngleRight}
                              onClick={() => this.handleNextImg("NEXT")}
                            />
                          </div>

                          <div className="list-to-share l-6">
                            <a
                              href="https://www.facebook.com/sharer/sharer.php?u=https://www.inithtml.com/"
                              target="_blank"
                              className="icon facebook"
                            >
                              <FaFacebook />
                            </a>

                            <a
                              href="https://www.facebook.com/sharer/sharer.php?u=https://www.inithtml.com/"
                              target="_blank"
                              className="icon message"
                            >
                              <FaFacebookMessenger />
                            </a>

                            <a
                              href={`https://twitter.com/share?text=Init%20HTML%20%E2%80%93%20Kh%E1%BB%9Fi%20%C4%91%E1%BA%A7u%20d%E1%BB%B1%20%C3%A1n%20Web&url=https://www.inithtml.com/`}
                              target="_blank"
                              className="icon twitter"
                            >
                              <FaTwitter />
                            </a>

                            <a
                              href="https://www.facebook.com/sharer/sharer.php?u=https://www.inithtml.com/"
                              target="_blank"
                              className="icon telegram"
                            >
                              <FaTelegram />
                            </a>
                          </div>

                          <div
                            className="likes l-6"
                            onClick={() => this.handleLikeItems(items.idItems)}
                          >
                            {isLike === 0 && isActive == false ? (
                              <>
                                {" "}
                                <FaRegHeart />{" "}
                                <span>
                                  <SwitchLanguage id="manageAdmin.items.likes" />
                                </span>{" "}
                              </>
                            ) : isActive === true && isLike < 0 ? (
                              <>
                                {" "}
                                <FaRegHeart />{" "}
                                <span>
                                  <SwitchLanguage id="manageAdmin.items.likes" />
                                </span>{" "}
                              </>
                            ) : (
                              <>
                                <FaHeart />{" "}
                                <span>
                                  <SwitchLanguage id="manageAdmin.items.liked" />
                                </span>{" "}
                              </>
                            )}

                            <span className="count-likes">
                              ({isLike + countLike})
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="col l-8">
                        <div className="data-info-items">
                          <span
                            className="name-items"
                            style={{ marginLeft: "4px" }}
                          >
                            <span className="labels-discount">
                              <SwitchLanguage id="manageAdmin.items.loveItems" />
                            </span>
                            {languages.EN === language
                              ? items.nameEn
                              : items.name}
                          </span>

                          <div className="all-detail-evaluate-items l-12 mgb-20">
                            <ListStar evaluate={evaluate} />

                            <div className="content-countEvaluate">
                              <span>{countEvaluate.length}</span>
                              <SwitchLanguage id="manageAdmin.items.evaluate" />
                            </div>

                            <div className="content-countEvaluate not_border">
                              <span>{countSold.length}</span>
                              <SwitchLanguage id="manageAdmin.items.sold" />
                            </div>
                          </div>

                          {discountData && discountData.code == "0" ? (
                            <>
                              {newPriceUS > 0 && newPrice > 0 ? (
                                <div className="list-price-tems-detail">
                                  <span
                                    className="discount-items"
                                    style={{ marginLeft: "0" }}
                                  >
                                    {languages.EN == language ? (
                                      priceUS
                                    ) : (
                                      <NumberFormat
                                        value={price}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                      />
                                    )}
                                  </span>
                                  <span className="sub-price new">
                                    <SwitchLanguage id="manageAdmin.items.subPrice" />
                                  </span>

                                  <span
                                    className="discount-items"
                                    style={{ marginLeft: "0" }}
                                  >
                                    {languages.EN == language ? (
                                      newPriceUS
                                    ) : (
                                      <NumberFormat
                                        value={newPrice}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                      />
                                    )}
                                  </span>
                                  <span className="sub-price new">
                                    <SwitchLanguage id="manageAdmin.items.subPrice" />
                                  </span>
                                </div>
                              ) : (
                                <div className="list-price-tems-detail">
                                  <span
                                    className="discount-items"
                                    style={{ marginLeft: "0" }}
                                  >
                                    {languages.EN == language ? (
                                      priceUS
                                    ) : (
                                      <NumberFormat
                                        value={price}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                      />
                                    )}
                                  </span>
                                  <span className="sub-price new">
                                    <SwitchLanguage id="manageAdmin.items.subPrice" />
                                  </span>
                                </div>
                              )}
                            </>
                          ) : (
                            <>
                              {newPriceUS > 0 && newPrice > 0 ? (
                                <div className="list-price-tems-detail">
                                  <p>
                                    {languages.EN == language ? (
                                      newPriceUS
                                    ) : (
                                      <NumberFormat
                                        value={newPrice}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                      />
                                    )}
                                  </p>
                                  <span className="sub-price">
                                    <SwitchLanguage id="manageAdmin.items.subPrice" />
                                  </span>

                                  {languages.EN == language ? (
                                    <span className="discount-items">{`${Math.floor(
                                      newPriceUS -
                                        newPriceUS * Number(discountData.code)
                                    )}`}</span>
                                  ) : (
                                    <span className="discount-items">
                                      {
                                        <NumberFormat
                                          value={`${Math.floor(
                                            newPrice -
                                              newPrice *
                                                Number(discountData.code)
                                          )}`}
                                          displayType={"text"}
                                          thousandSeparator={true}
                                        />
                                      }
                                    </span>
                                  )}
                                  <span className="sub-price new">
                                    <SwitchLanguage id="manageAdmin.items.subPrice" />
                                  </span>

                                  <span className="labels-discount">
                                    <SwitchLanguage id="manageAdmin.items.decrease" />{" "}
                                    {discountData.valueEn}
                                  </span>
                                </div>
                              ) : (
                                <div className="list-count-items">
                                  {languages.EN == language ? (
                                    <div className="list-price-tems-detail">
                                      <p>
                                        {languages.EN == language &&
                                          `${priceUS}`}{" "}
                                      </p>
                                      <span className="sub-price">
                                        <SwitchLanguage id="manageAdmin.items.subPrice" />
                                      </span>

                                      <span className="discount-items">{`${Math.floor(
                                        priceUS -
                                          priceUS * Number(discountData.code)
                                      )}`}</span>
                                      <span className="sub-price new">
                                        <SwitchLanguage id="manageAdmin.items.subPrice" />
                                      </span>
                                    </div>
                                  ) : (
                                    <div className="list-price-tems-detail">
                                      <p>
                                        {languages.EN != language && (
                                          <NumberFormat
                                            value={price}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                          />
                                        )}
                                      </p>
                                      <span className="sub-price">
                                        <SwitchLanguage id="manageAdmin.items.subPrice" />
                                      </span>

                                      <span className="discount-items">
                                        {
                                          <NumberFormat
                                            value={`${Math.floor(
                                              price -
                                                price *
                                                  Number(discountData.code)
                                            )}`}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                          />
                                        }
                                      </span>
                                      <span className="sub-price new">
                                        <SwitchLanguage id="manageAdmin.items.subPrice" />
                                      </span>

                                      <span className="labels-discount">
                                        <SwitchLanguage id="manageAdmin.items.decrease" />
                                        {discountData.valueEn}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </>
                          )}
                        </div>

                        <div className="detail-price-ship grt-20 ">
                          <div className="l-2  grt-20">
                            <span className="title-truck">
                              <SwitchLanguage id="manageAdmin.items.ship" />
                            </span>
                          </div>

                          <div className="l-10 detail-price-ship  grt-20">
                            <div className="wrapper_icon-ship">
                              <img src={Ship} alt="" />
                            </div>
                            {provinceFreeShip.length > 0 ||
                            provinceFreeShipCategoryType.length > 0 ||
                            provinceFreeShipCategory.length > 0 ? (
                              <span className="text_free-ship">
                                <SwitchLanguage id="manageAdmin.items.textFreeShip" />
                              </span>
                            ) : (
                              ""
                            )}

                            {provinceFreeShip.length == 0 &&
                              provinceFreeShipCategoryType.length == 0 &&
                              provinceFreeShipCategory.length == 0 && (
                                <>
                                  {allDataPriceShip[0] &&
                                    allDataPriceShip[0].Province && (
                                      <>
                                        <span className="text_free-ship l-10">
                                          <SwitchLanguage id="manageAdmin.items.nextShip" />
                                        </span>
                                        <span className="province-ship-demo ">
                                          {languages.EN == language
                                            ? allDataPriceShip[0].Province
                                                .valueEn
                                            : allDataPriceShip[0].Province
                                                .valueVi}
                                        </span>
                                        <p className="mgl-12 text_free-ship">
                                          <SwitchLanguage id="manageAdmin.items.textPriceShip" />
                                        </p>
                                        <span className="mgl-12 price_ship">
                                          {languages.EN == language ? (
                                            allDataPriceShip[0].priceShipUS
                                          ) : (
                                            <NumberFormat
                                              value={
                                                allDataPriceShip[0].priceShipVN
                                              }
                                              displayType={"text"}
                                              thousandSeparator={true}
                                            />
                                          )}
                                        </span>
                                        <span className="sub-price new mgl-4">
                                          <SwitchLanguage id="manageAdmin.items.subPrice" />
                                        </span>
                                      </>
                                    )}
                                </>
                              )}

                            <p className="l-12">
                              {provinceFreeShip.length > 0 &&
                                provinceFreeShip.map((ship) => {
                                  return (
                                    <span
                                      key={ship.Province.keyMap}
                                      className="Province-preeShip"
                                    >
                                      {languages.EN == language && ship.Province
                                        ? ship.Province.valueEn
                                        : ship.Province.valueVi}
                                      ,
                                    </span>
                                  );
                                })}
                              {provinceFreeShip.length === 0 &&
                                provinceFreeShipCategoryType.length > 0 &&
                                provinceFreeShipCategoryType.map((ship) => {
                                  return (
                                    <span
                                      key={ship.Province.keyMap}
                                      className="Province-preeShip"
                                    >
                                      {languages.EN == language && ship.Province
                                        ? ship.Province.valueEn
                                        : ship.Province.valueVi}
                                      ,
                                    </span>
                                  );
                                })}
                              {provinceFreeShipCategoryType.length === 0 &&
                                provinceFreeShipCategory.length > 0 &&
                                provinceFreeShipCategory.map((ship) => {
                                  return (
                                    <span
                                      key={ship.Province.keyMap}
                                      className="Province-preeShip"
                                    >
                                      {languages.EN == language && ship.Province
                                        ? ship.Province.valueEn
                                        : ship.Province.valueVi}
                                      ,
                                    </span>
                                  );
                                })}
                            </p>
                          </div>
                        </div>

                        <div className="detail-price-ship grt-20">
                          <div className="l-2  grt-12">
                            <span className="title-truck ">
                              <SwitchLanguage id="manageAdmin.items.listColor" />
                            </span>
                          </div>

                          <div className="l-10">
                            {items.dataColorImg &&
                              items.dataColorImg[0].colorData &&
                              items.dataColorImg.map((color, index) => {
                                return (
                                  <button
                                    key={color.image}
                                    onClick={() =>
                                      this.handleActiveClick(
                                        index,
                                        color.colorData.code,
                                        "COLOR"
                                      )
                                    }
                                    style={{
                                      borderColor:
                                        index == indexActiveColor ? "red" : "",
                                    }}
                                    className={`button_color-select-img mgr-12  grt-12 ${
                                      index == indexActiveColor ? "active" : ""
                                    }`}
                                  >
                                    {languages.EN == language
                                      ? color.colorData.valueEn
                                      : color.colorData.valueVi}
                                    {index == indexActiveColor && (
                                      <i className="bi bi-check icon-check"></i>
                                    )}
                                  </button>
                                );
                              })}
                          </div>
                        </div>

                        <div className="detail-price-ship grt-20">
                          <div className="l-2  grt-12">
                            <span className="title-truck ">
                              <SwitchLanguage id="manageAdmin.items.listSize" />
                            </span>
                          </div>

                          <div className="l-10">
                            {items.dataSizeAmount &&
                              items.dataSizeAmount[0] &&
                              items.dataSizeAmount.map((size, index) => {
                                return (
                                  <button
                                    key={`${size.sizeData.valueEn}${index}`}
                                    onClick={() =>
                                      size.amount >= 1 &&
                                      this.handleActiveClick(
                                        index,
                                        size.sizeData.valueEn,
                                        "SIZE"
                                      )
                                    }
                                    style={{
                                      borderColor:
                                        index == indexActiveSize &&
                                        size.amount >= 1
                                          ? "red"
                                          : "",
                                      opacity: size.amount <= 0 && ".6",
                                    }}
                                    className={`button_color-select-img mgr-12  grt-12 ${
                                      index == indexActiveSize &&
                                      size.amount >= 1
                                        ? "active"
                                        : ""
                                    }`}
                                  >
                                    {index == indexActiveSize &&
                                      size.amount >= 1 && (
                                        <i className="bi bi-check icon-check"></i>
                                      )}
                                    {`${size.sizeData.valueEn} (${size.amount})`}
                                  </button>
                                );
                              })}
                          </div>
                        </div>

                        <div className="detail-price-ship grt-20">
                          <div className="l-2 grt-12">
                            <span className="title-truck ">
                              <SwitchLanguage id="manageAdmin.items.count" />
                            </span>
                          </div>

                          <div className="l-10">
                            <div className="grt-12 list-btn-amount">
                              <button
                                className="btn-amount-items"
                                onClick={() =>
                                  this.handleActiveClick(
                                    "",
                                    "",
                                    "CHANGE_DOWN_AMOUNT"
                                  )
                                }
                              >
                                -
                              </button>
                              <button className="btn-amount-items content-amount">
                                <input
                                  type="number"
                                  onChange={(e) =>
                                    this.handleActiveClick(
                                      "",
                                      e.target.value,
                                      "CHANGE_AMOUNT"
                                    )
                                  }
                                  onBlur={(e) =>
                                    this.handleActiveClick(
                                      "",
                                      e.target.value,
                                      "BLUR_INPUT"
                                    )
                                  }
                                  value={itemsNumber}
                                />
                              </button>
                              <button
                                className="btn-amount-items"
                                onClick={() =>
                                  this.handleActiveClick(
                                    "",
                                    "",
                                    "CHANGE_UP_AMOUNT"
                                  )
                                }
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>

                        {isEmptyColorSize && (
                          <span
                            className="err grt-20"
                            style={{ display: "block" }}
                          >
                            <SwitchLanguage id="manageAdmin.items.checkBuyItems" />
                          </span>
                        )}

                        <div className="l-12 grt-20 list-btn-buy-now">
                          <button className="btn-buy-items mgr-12 grt-20">
                            <span onClick={() => this.handleBuyItems("CART")}>
                              <i className="bi bi-cart-plus"></i>{" "}
                              <SwitchLanguage id="manageAdmin.items.addnewcart" />
                            </span>
                          </button>

                          <button className="btn-buy-items buy_now grt-20">
                            <span>
                              <SwitchLanguage id="manageAdmin.items.buyNow" />
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* TEXT */}
                  <div className="detail-sub-text-items l-12">
                    <div className="col l-12">
                      <p className="title ">
                        <SwitchLanguage id="manageAdmin.items.headingSubDetailText" />
                      </p>
                    </div>

                    <div className="list-detail">
                      <span className="col l-2 key-detail-item">
                        <SwitchLanguage id="manageAdmin.form.production" />
                      </span>
                      <span className="col l-10">
                        {items &&
                          items.infoItemsData &&
                          items.infoItemsData.production}
                      </span>

                      <span className="col l-2 key-detail-item">
                        <SwitchLanguage id="manageAdmin.form.trademark" />
                      </span>
                      <span className="col l-10">
                        {items &&
                          items.infoItemsData &&
                          items.infoItemsData.trademarkData.valueEn}
                      </span>

                      <span className="col l-2 key-detail-item">
                        <SwitchLanguage id="manageAdmin.form.texture" />
                      </span>
                      <span className="col l-10">
                        {items &&
                          items.infoItemsData &&
                          items.infoItemsData.texture}
                      </span>

                      <span className="col l-2 key-detail-item">
                        <SwitchLanguage id="manageAdmin.form.sentFrom" />
                      </span>
                      <span className="col l-10">
                        {items &&
                          items.infoItemsData &&
                          items.infoItemsData.sentFrom}
                      </span>
                    </div>

                    <div className="col l-12">
                      <p className="title ">
                        <SwitchLanguage id="manageAdmin.items.describe-items" />
                      </p>
                    </div>

                    {languages.EN === language ? (
                      <div
                        className="content-describe-items"
                        dangerouslySetInnerHTML={{
                          __html:
                            items.infoItemsData &&
                            items.infoItemsData.describeHtmlEn,
                        }}
                      ></div>
                    ) : (
                      <div
                        className="content-describe-items"
                        dangerouslySetInnerHTML={{
                          __html:
                            items.infoItemsData &&
                            items.infoItemsData.describeHtmlVi,
                        }}
                      ></div>
                    )}
                  </div>
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
    listItemsUserLike: state.app.listItemsUserLike,
    oneItems: state.admin.items.oneItems,
    dataUser: state.app.loginUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDataItems: (data) => dispatch(actions.getDataItemsStart(data)),
    addNewItemsToCart: (data) => dispatch(actions.addNewItemsToCart(data)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailItems)
);

/*
{
    "id": 3,
    "idItems": "ADMTSP03",
    "idShop": 3,
    "manageId": 4,
    "discounts": "0",
    "name": "ÁO KHOÁC KAKI JEAN NAM ĐẸP THỜI TRANG MỚI NHẤT ",
    "nameEn": "LATEST FASHIONAL KAKI JEAN MEN'S WINGS 2019",
    "price": 169999,
    "priceUS": 7,
    "newPrice": 0,
    "newPriceUS": 0,
    "createdAt": "2022-09-03T09:07:23.000Z",
    "updatedAt": "2022-09-03T09:16:11.000Z",
    "storeData": {
      "manageId": 4,
      "nameShop": "KIA WOA SHOPS"
    },
    "discountData": {
      "code": "0",
      "valueEn": "Not Discount",
      "valueVi": "Không Giảm Giá"
    },
    "categoryData": {
      "code": "FSB",
      "valueEn": "Mens Fashion",
      "valueVi": "Thời trang nam"
    },
    "typeData": {
      "code": "ST03",
      "valueEn": "Hoodies, Sweaters & Sweatshifts",
      "valueVi": "Áo Hoodie, Áo Len  & Áo Nỉ"
    },
    "infoItemsData": {
      "id": 3,
      "itemsId": "ADMTSP03",
      "describeHtmlEn": "<p>THE DETAIL INFORMATION OF PRODUCT</p>\n<ul>\n<li>High quality denim denim fabric</li>\n<li>Designed to suit the age from 18 to 30 years old</li>\n<li>Soft jeans with good sweat absorption, comfortable to wear</li>\n<li>Pants can be combined with many types of clothes to wear at home or out, travel, ...</li>\n</ul>\n<p>HOW TO USE AND STORAGE MAN'S JEAN COAT</p>\n<ul>\n<li>Machine wash and dry in direct sunlight</li>\n<li>Store in a cool, dry place, away from moisture</li>\n</ul>\n<p>SIZE TABLE</p>\n<pre><code>Size M: 45-55kg HIGH M:150cm -&gt; 165cm\n\nSize L: 56-65kg HIGH L:165cm -170cm\n\nSize XL: 65-75kg HIGH XL:170cm -&gt; 175cm\n</code></pre>\n<p>SHOP… GUARANTEE\nGood quality product, exactly as described</p>\n<ul>\n<li>Delivery right after receiving the order</li>\n<li>Exchange and return for men's denim jackets with manufacturer defects</li>\n<li>Note: Do not accept returns for unsatisfactory reasons</li>\n<li>The color of the product may have a difference of 6% from the received product due to the light brightness when taking pictures</li>\n</ul>\n",
      "describeTextEn": "  THE DETAIL INFORMATION OF PRODUCT\n+ High quality denim denim fabric\n+ Designed to suit the age from 18 to 30 years old\n+ Soft jeans with good sweat absorption, comfortable to wear\n+ Pants can be combined with many types of clothes to wear at home or out, travel, ...\n\nHOW TO USE AND STORAGE MAN'S JEAN COAT\n+ Machine wash and dry in direct sunlight\n+ Store in a cool, dry place, away from moisture\n\nSIZE TABLE\n\n    Size M: 45-55kg HIGH M:150cm -> 165cm\n\n    Size L: 56-65kg HIGH L:165cm -170cm\n\n    Size XL: 65-75kg HIGH XL:170cm -> 175cm\n\n\n\nSHOP… GUARANTEE\nGood quality product, exactly as described\n+ Delivery right after receiving the order\n+ Exchange and return for men's denim jackets with manufacturer defects\n+ Note: Do not accept returns for unsatisfactory reasons\n+ The color of the product may have a difference of 6% from the received product due to the light brightness when taking pictures",
      "describeHtmlVi": "THÔNG TIN CHI TIẾT SẢN PHẨM\n+ Chất liệu vải jean demin cao cấp\n+ Được thiết kế phù hợp với độ tuổi từ 18 đến 30 tuổi\n+ Quần vải jean mềm mại thấm hút mồ hôi tốt, thoải mái khi mặc\n+ Quần có thể kết hợp với nhiều loại trang phục để mặc ở nhà hay đi chơi, du lịch,…\n\nCÁCH SỦ DỤNG VÀ BẢO QUẢN ÁO KHOÁC JEAN NAM\n+ Giặt bằng máy phơi khô dưới ảnh nắng trực tiếp\n+ Bảo quản trong nơi khô ráo thoáng mát , tránh nơi ẩm ướt\n\nBẢNG SIZE THAM KHẢO ÁO KHOÁC JEAN NAM\n\n    Size M: 45-55kg CAO  M:150cm -> 165cm\n\n    Size L: 56-65kg CAO L:165cm -170cm\n\n    Size XL: 65-75kg CAO XL:170cm -> 175cm\n\n\n\nSHOP… XIN CAM KẾT\n+ Sản phẩm chất lượng tốt, đúng như mô tả\n+ Giao hàng ngay khi nhận được đơn\n+ Đổi, trả với những sản phẩm áo khoác jean nam lỗi do nhà sản xuất\n+ Lưu ý: Không nhận đổi trả với lí do không vừa ý\n+ Màu sản phẩm có thể chênh lệch với sản phẩm nhận dc là 6% do độ sáng khi chụp hình có thể thay đổi",
      "describeTextVi": "THÔNG TIN CHI TIẾT SẢN PHẨM\n+ Chất liệu vải jean demin cao cấp\n+ Được thiết kế phù hợp với độ tuổi từ 18 đến 30 tuổi\n+ Quần vải jean mềm mại thấm hút mồ hôi tốt, thoải mái khi mặc\n+ Quần có thể kết hợp với nhiều loại trang phục để mặc ở nhà hay đi chơi, du lịch,…\n\nCÁCH SỦ DỤNG VÀ BẢO QUẢN ÁO KHOÁC JEAN NAM\n+ Giặt bằng máy phơi khô dưới ảnh nắng trực tiếp\n+ Bảo quản trong nơi khô ráo thoáng mát , tránh nơi ẩm ướt\n\nBẢNG SIZE THAM KHẢO ÁO KHOÁC JEAN NAM\n\n    Size M: 45-55kg CAO  M:150cm -> 165cm\n\n    Size L: 56-65kg CAO L:165cm -170cm\n\n    Size XL: 65-75kg CAO XL:170cm -> 175cm\n\n\n\nSHOP… XIN CAM KẾT\n+ Sản phẩm chất lượng tốt, đúng như mô tả\n+ Giao hàng ngay khi nhận được đơn\n+ Đổi, trả với những sản phẩm áo khoác jean nam lỗi do nhà sản xuất\n+ Lưu ý: Không nhận đổi trả với lí do không vừa ý\n+ Màu sản phẩm có thể chênh lệch với sản phẩm nhận dc là 6% do độ sáng khi chụp hình có thể thay đổi",
      "production": "Việt Nam",
      "sentFrom": "01  Lê Thánh Tông,Xã Tân Tiến, TP. Bắc Giang",
      "texture": "Denim, kaki",
      "trademarkData": {
        "id": 25,
        "code": "BN25",
        "valueEn": "YAME",
        "valueVi": "YAME"
      }
    },
    "dataColorImg": [
      {
        "itemId": "ADMTSP03",
        "image": "file-1662196043529.jpg",
        "colorData": {
          "code": "CL06",
          "valueEn": "Pink",
          "valueVi": "Hồng"
        }
      },
      {
        "itemId": "ADMTSP03",
        "image": "file-1662196043531.jpg",
        "colorData": {
          "code": "CL09",
          "valueEn": "Chrysanthemum Yellow",
          "valueVi": "Vàng Cúc"
        }
      },
      {
        "itemId": "ADMTSP03",
        "image": "file-1662196043532.jpg",
        "colorData": {
          "code": "CL13",
          "valueEn": "Dark Orange",
          "valueVi": "Cam Đậm"
        }
      },
      {
        "itemId": "ADMTSP03",
        "image": "file-1662196043530.jpg",
        "colorData": {
          "code": "CL03",
          "valueEn": "Black",
          "valueVi": "Đen"
        }
      }
    ],
    "dataSizeAmount": [
      {
        "itemsId": "ADMTSP03",
        "amount": 500,
        "sizeData": {
          "code": "SZ03",
          "valueEn": "M",
          "valueVi": "M"
        },
        "typeSizeData": {
          "code": "SIZE",
          "valueEn": "Letter size pattern",
          "valueVi": "Kiểu size chữ"
        }
      },
      {
        "itemsId": "ADMTSP03",
        "amount": 200,
        "sizeData": {
          "code": "SZ04",
          "valueEn": "L",
          "valueVi": "L"
        },
        "typeSizeData": {
          "code": "SIZE",
          "valueEn": "Letter size pattern",
          "valueVi": "Kiểu size chữ"
        }
      },
      {
        "itemsId": "ADMTSP03",
        "amount": 700,
        "sizeData": {
          "code": "SZ05",
          "valueEn": "XL",
          "valueVi": "XL"
        },
        "typeSizeData": {
          "code": "SIZE",
          "valueEn": "Letter size pattern",
          "valueVi": "Kiểu size chữ"
        }
      },
      {
        "itemsId": "ADMTSP03",
        "amount": 3332,
        "sizeData": {
          "code": "SZ06",
          "valueEn": "XXL",
          "valueVi": "XXL"
        },
        "typeSizeData": {
          "code": "SIZE",
          "valueEn": "Letter size pattern",
          "valueVi": "Kiểu size chữ"
        }
      },
      {
        "itemsId": "ADMTSP03",
        "amount": 600,
        "sizeData": {
          "code": "SZ01",
          "valueEn": "XS",
          "valueVi": "XS"
        },
        "typeSizeData": {
          "code": "SIZE",
          "valueEn": "Letter size pattern",
          "valueVi": "Kiểu size chữ"
        }
      },
      {
        "itemsId": "ADMTSP03",
        "amount": 400,
        "sizeData": {
          "code": "SZ02",
          "valueEn": "S",
          "valueVi": "S"
        },
        "typeSizeData": {
          "code": "SIZE",
          "valueEn": "Letter size pattern",
          "valueVi": "Kiểu size chữ"
        }
      }
    ]
}

*/
