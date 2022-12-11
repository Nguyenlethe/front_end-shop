import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "../../store/action";
import SwitchLanguage from "../../SwitchLanguage";
import { languages, path, SEARCH } from "../../utils/constant";
import ListLanguage from "../../components/ListLanguage";
import { Link, Navigate } from "react-router-dom";
import img from "../..//assets/image/ShopBagLogo.png";
import styles from "./DefaultLayout.scss";
import NavBar from "./Navbar/NavBar";
import InputSearch from "../../components/SearchInput/InputSearch";
import InputSearchNav from "../../components/SearchInput/InputSearchNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import CartList from "./Navbar/CartList/CartList";

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarUser: "",
      lenthItemsListCart: 0,
      isShowListItemsCart: false,
    };
  }

  // Mount
  componentDidMount = async () => {
    let { dataUser } = this.props;
    this.props.fetchAllDataAllCode();

    this.setState({
      avatarUser: dataUser.avatar,
    });
    // this.props.addDataOptionsSearchNav({
    //   value: 'All2',
    //   valueTextInputEN: 'Full floor 2',
    //   valueTextInputVI: 'Toàn sàn 2'
    // })
  };

  // Update
  componentDidUpdate = async (prevProps, prevState) => {
    let { dataUser } = this.props;

    if (prevProps.language !== this.props.language) {
    }

    // if(prevProps.dataUser !== this.props.dataUser){

    //   this.setState({
    //     avatarUser: dataUser.avatar
    //   })
    // }
  };

  handleSetLengthItemsListCart = (length) => {
    this.setState({
      lenthItemsListCart: length,
    });
  };

  handleSetShowOrHideListCart = (type) => {
    if (type == "SHOW") {
      this.setState({
        isShowListItemsCart: Math.random() * 10000,
      });
    }

    if (type == "HIDE") {
      this.setState({
        isShowListItemsCart: false,
      });
    }
  };

  render() {
    let { children, dataUser, isCartPage } = this.props;
    let { avatarUser, lenthItemsListCart, isShowListItemsCart } = this.state;

    return (
      <>
        <NavBar />

        <div className="grid nav-center">
          <div className="grid wide">
            <div className="row">
              <div className="list_nav-center">
                <div className={isCartPage == true ? "col l-2" : "col l-3"}>
                  <Link to={path.HOME} className="hug-img-logo">
                    <img
                      style={{ width: isCartPage == true ? "92%" : "" }}
                      src={img}
                      alt=""
                    />
                  </Link>
                </div>

                {isCartPage == true && (
                  <>
                    <div className="col l-2">
                      <span className="heading-cart">Giỏ Hàng</span>
                    </div>
                    <div className="col l-2"></div>
                  </>
                )}

                <div className={isCartPage == true ? `col l-6` : `col l-7`}>
                  <InputSearchNav isCartPage={isCartPage} />
                </div>

                {isCartPage !== true && (
                  <div className="col l-2">
                    <div className="list-icon-nav">
                      <div
                        className="wrapper-icon-nav"
                        onMouseLeave={() =>
                          this.handleSetShowOrHideListCart("HIDE")
                        }
                      >
                        <i
                          className="bi bi-cart2"
                          onMouseOver={() =>
                            this.handleSetShowOrHideListCart("SHOW")
                          }
                        ></i>

                        {dataUser.islogin == "true" && (
                          <span className="length-items-to-cart">
                            {lenthItemsListCart}
                          </span>
                        )}

                        <div className="wrapper-list-cart">
                          <CartList
                            isShowListItemsCart={isShowListItemsCart}
                            handleSetLengthItemsListCart={
                              this.handleSetLengthItemsListCart
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {children}
      </>
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
  return {
    addDataOptionsSearchNav: (data) =>
      dispatch(action.addDataOptionsSearchNav(data)),
    fetchAllDataAllCode: () => dispatch(action.fetchAllDataAllCodeStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
