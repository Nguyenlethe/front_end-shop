import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEyeSlash,
  faEye,
  faUnlock,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/Button/Button";
import { path, languages } from "../../../utils/constant";
import * as actions from "../../../store/action";
import Modal from "../../../components/Modal/ModalLoad";
import SwitchLanguage from "../../../SwitchLanguage";

import classNames from "classnames/bind";
import styles from "./Register.module.scss";
const cx = classNames.bind(styles);

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowPass: false,
      isModal: false,
      isErrForm: false,
      isFormat: false,
      isEmail: false,
      isRegister: false,
      isAccount: false,
      isPassword: false,
      isRetypePassword: false,
      errMessage: {
        account: "",
      },
      form: {
        account: "",
        password: "",
        retypePassword: "",
      },
    };
  }

  // Ẩn hiện password
  handleShowHinePassword = () => {
    this.setState({ isShowPass: !this.state.isShowPass });
  };

  // CPN Did mount
  componentDidMount = async () => {};

  // CPN Đid update
  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.language !== this.props.language) {
    }
  };

  // Xl change input
  handleOnchangeInput = (value, name) => {
    let stateCopy = this.state.form;
    let errMessageCoppy = this.state.errMessage;

    // Change xoa error
    for (let key in errMessageCoppy) {
      if (name === key) {
        errMessageCoppy[key] = "";
      }
    }

    // Set gtri
    for (let key in stateCopy) {
      if (key === name) {
        stateCopy[key] = value;
      }
    }

    // Set state
    this.setState({
      isEmail: false,
      isFormat: false,
      errMessage: { ...errMessageCoppy },
      form: { ...stateCopy },
    });
  };

  // Xl ấn submit
  handleSubmitRegister = async (e) => {
    e.preventDefault();
    let { account, password, retypePassword } = this.state.form;
    let checkDataForm = { email: false, password: false };
    this.setState({ isModal: true });
    var checkEmail =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var checkPasswor = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (checkPasswor.test(password)) {
      checkDataForm.password = true;
      this.setState({ isFormat: false });

      if (retypePassword === password) {
        checkDataForm.password = true;
      } else {
        checkDataForm.password = false;
        this.setState({ isErrForm: true, isModal: false });
      }
    } else {
      this.setState({ isFormat: true, isModal: false });
    }
    if (checkEmail.test(account)) {
      checkDataForm.email = true;
    } else {
      checkDataForm.email = false;
      this.setState({ isEmail: true, isModal: false });
    }
    if (checkDataForm.email && checkDataForm.password) {
      let res = await this.props.createNewUser({ account, password });

      if (res && res.data.errCode === 0) {
        await this.props.loginSystem({ account, password });
        this.setState({ isModal: false, isRegister: true });
      }
      if (res && res.data.errCode === 1) {
        this.setState({
          isModal: false,
          errMessage: {
            account: { ...res.data.data.account },
          },
        });
      }
    }
  };

  render() {
    let { language } = this.props;
    let {
      isShowPass,
      isModal,
      errMessage,
      isErrForm,
      isFormat,
      isEmail,
      isRegister,
      isAccount,
      isPassword,
      isRetypePassword,
    } = this.state;
    let { account, password, retypePassword } = this.state.form;

    return (
      <>
        <Modal isShow={isModal} />
        {isRegister === true && <Navigate to={path.HOMEPAGE} />}
        <form className={cx("form-login")}>
          {/* <p className={cx('heading')}><SwitchLanguage id='manageAdmin.form.SingUp'/></p> */}
          <div className={cx("form-input")}>
            <label>
              <SwitchLanguage id="manageAdmin.form.planceholder_email" />
            </label>
            <div
              className={cx("wrap-input")}
              style={{ boxShadow: isAccount ? "1px 1px 10px #046ba6" : "" }}
            >
              <FontAwesomeIcon className={cx("icon-input")} icon={faUser} />

              <input
                className={cx("input")}
                type="text"
                name="account"
                value={account}
                autoComplete="off"
                placeholder={
                  language === languages.EN
                    ? "Enter account"
                    : "Nhập email của bạn"
                }
                onFocus={() => this.setState({ isAccount: true })}
                onChange={(e) =>
                  this.handleOnchangeInput(e.target.value, e.target.name)
                }
                onBlur={() => this.setState({ isAccount: false })}
              />
            </div>

            <span className={cx("error-input-login")}>
              {isEmail ? <FontAwesomeIcon icon={faCircleExclamation} /> : ""}
              {isEmail ? (
                language === languages.EN ? (
                  <SwitchLanguage id="manageAdmin.form.errAccount" />
                ) : (
                  <SwitchLanguage id="manageAdmin.form.errAccount" />
                )
              ) : (
                ""
              )}
              {errMessage.account !== "" ? (
                <FontAwesomeIcon icon={faCircleExclamation} />
              ) : (
                ""
              )}
              {errMessage.account !== ""
                ? language === languages.EN
                  ? errMessage.account.valueEn
                  : errMessage.account.valueVi
                : ""}
            </span>

            <label>{<SwitchLanguage id="manageAdmin.form.password" />}</label>
            <div
              className={cx("wrap-input")}
              style={{ boxShadow: isPassword ? "1px 1px 10px #046ba6" : "" }}
            >
              <FontAwesomeIcon
                className={cx("icon-input")}
                icon={isShowPass === false ? faLock : faUnlock}
              />

              <input
                className={cx("input")}
                name="password"
                type="text"
                autoComplete="off"
                placeholder={
                  language === languages.EN ? "Enter password" : "Nhập mật khẩu"
                }
                onFocus={() => this.setState({ isPassword: true })}
                value={password}
                onBlur={() => this.setState({ isPassword: false })}
                onChange={(e) =>
                  this.handleOnchangeInput(e.target.value, e.target.name)
                }
              />
            </div>

            <span className={cx("error-input-login")}>
              {isFormat ? <FontAwesomeIcon icon={faCircleExclamation} /> : ""}
              {isFormat
                ? language === languages.VI
                  ? "Mật khẩu sai định dạng !"
                  : "Incorrect password format"
                : ""}
            </span>

            <label>{<SwitchLanguage id="app.editPass.labelRetype" />}</label>
            <div
              className={cx("wrap-input")}
              style={{
                boxShadow: isRetypePassword ? "1px 1px 10px #046ba6" : "",
              }}
            >
              <FontAwesomeIcon
                className={cx("icon-input")}
                icon={isShowPass === false ? faLock : faUnlock}
              />

              <input
                className={cx("input")}
                name="retypePassword"
                type={isShowPass === false ? "password" : "text"}
                placeholder={
                  language === languages.EN ? "Enter password" : "Nhập mật khẩu"
                }
                onFocus={() => this.setState({ isRetypePassword: true })}
                value={retypePassword}
                autoComplete="off"
                onBlur={() => this.setState({ isRetypePassword: false })}
                onChange={(e) =>
                  this.handleOnchangeInput(e.target.value, e.target.name)
                }
              />

              <FontAwesomeIcon
                className={cx("icon-input")}
                onClick={() => this.handleShowHinePassword()}
                icon={isShowPass === false ? faEyeSlash : faEye}
              />
            </div>

            <span className={cx("error-input-login")}>
              {isErrForm ? <FontAwesomeIcon icon={faCircleExclamation} /> : ""}
              {isErrForm
                ? language === languages.VI
                  ? "Mật khẩu nhập lại không đúng !"
                  : "Re-entered password is incorrect"
                : ""}
            </span>

            <p
              className="l-12 MG_between"
              style={{ marginTop: "40px" }}
              onClick={(e) =>
                account.trim() !== "" &&
                password.trim() !== "" &&
                retypePassword.trim() !== "" &&
                this.handleSubmitRegister(e)
              }
            >
              <Button
                textType="capitalize"
                width="100%"
                border="4px"
                size="1.8rem"
                height="35px"
                color="var(--BGR-color-btn-manageuser)"
                opacity={
                  account.trim() === "" ||
                  password.trim() === "" ||
                  retypePassword.trim() === ""
                    ? ".6"
                    : "1"
                }
                type={
                  account.trim() !== "" &&
                  password.trim() !== "" &&
                  retypePassword.trim() !== ""
                    ? "submit-form-data"
                    : "btn-ban"
                }
                content={<SwitchLanguage id="manageAdmin.form.SingUp" />}
                margin="12px 0"
              />
            </p>

            {/* <div className={cx('compartment')}><span >OR</span></div> */}
          </div>
          {/* <div className={cx('login-society')}>
                    <div className={cx('list-icon-society')}>
                        <span className='l-12'>
                            <Button border='4px' size='1.7rem' width='100%'  textType='inherit' color='var(--BGR-color-FB-login)' type='submit-form-data' content={<SwitchLanguage id='manageAdmin.button.Facebook'/>} />
                        </span>
                        
                        <span className='l-12'>
                            <Button border='4px' size='1.7rem' width='100%'  textType='inherit' color='var(--BGR-color-TW-login)' type='submit-form-data' content={<SwitchLanguage id='manageAdmin.button.Twitter'/>} />
                        </span>
                    </div>
                </div> */}
        </form>
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
    loginSystem: (dataForm) => dispatch(actions.loginSystemStart(dataForm)),
    createNewUser: (dataForm) => dispatch(actions.createNewUserStart(dataForm)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
