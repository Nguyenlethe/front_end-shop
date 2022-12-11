import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneFlip,
  faEnvelope,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import handleCheckPermission from "../../../utils/generalHandling";
import { path, languages, PERMISSIONS } from "../../../utils/constant";
import withRouter from "../../../routes/withRouter";
import DatePicker from "react-datepicker";
import _ from "lodash";
import "react-datepicker/dist/react-datepicker.css";
import * as actions from "../../../store/action";
import Button from "../../../components/Button/Button";
import adminService from "../../../services/adminService";

import "./ProFile.scss";
import SwitchLanguage from "../../../SwitchLanguage";
import { toast } from "react-toastify";

class ProFile extends Component {
  constructor(props) {
    super(props);
    this.inputDate = React.createRef();
    this.state = {
      isShop: false,
      isErr: false,

      avataFile: "",
      pewviewAvatar: null,
      dataUserOriginal: {},

      dataUser: {
        id: "",
        gender: "",
        phoneNumber: "",
        email: "",
        fristName: "",
        LastName: "",
        birthday: "",
        avatar: "",
        type: "UPDATE",
      },
    };
  }

  // Mount
  componentDidMount = async () => {
    let {
      permission,
      id,
      birthday,
      gender,
      email,
      phone,
      fristName,
      LastName,
      avatar,
    } = this.props.dataUser;
    let { dataUser } = this.state;
    const isShopCoppy = handleCheckPermission.handleCheckPermission(
      PERMISSIONS.SELLER,
      permission
    );

    let newDateBirthday = "";
    if (birthday.length > 5) {
      let dateBirthday = new Date(birthday);

      let month = `${dateBirthday.getMonth() + 1}`;
      if (month.length == 1) month = `0${month}`;

      let birthDay = `${dateBirthday.getDate()}`;
      if (birthDay.length == 1) birthDay = `0${birthDay}`;

      newDateBirthday = `${dateBirthday.getFullYear()}-${month}-${birthDay}`;

      if (newDateBirthday.length) {
        const inputDate = this.inputDate.current;
        inputDate.value = newDateBirthday;
      }
    }

    this.setState({
      isShop: isShopCoppy,
      dataUser: {
        ...dataUser,
        id: id,
        gender: gender,
        phoneNumber: phone,
        email: email,
        fristName: fristName,
        LastName: LastName,
        birthday: newDateBirthday,
        avatar: avatar,
      },
      dataUserOriginal: {
        ...dataUser,
        id: id,
        gender: gender,
        phoneNumber: phone,
        email: email,
        fristName: fristName,
        LastName: LastName,
        birthday: newDateBirthday,
        avatar: avatar,
      },
    });
  };

  // Update
  componentDidUpdate = async (prevProps, prevState) => {};

  handleChangeDataUser = async (value, type) => {
    let { dataUser, isErr, dataUserOriginal } = this.state;
    let dataUserCoppy = this.state.dataUser;

    // Loop set data
    for (let key in dataUser) {
      if (key == type) {
        dataUserCoppy[key] = value;
        this.setState({
          dataUser: {
            ...dataUser,
            ...dataUserCoppy,
          },
        });
      }
    }

    // Add file avatar
    if (type == "AVATAR") {
      let file = value.target.files[0];
      let src = URL.createObjectURL(file);

      this.setState({
        avataFile: file,
        pewviewAvatar: src,
      });
    }

    // Add birth day
    if (type == "BIRTH") {
      let birthDay = `${new Date(value)}`;

      this.setState({
        dataUser: {
          ...dataUser,
          birthday: birthDay,
        },
      });
    }

    // Submit
    if (type == "SUBMIT") {
      let emailCheck =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      let phoneCheck = /((09|03|07|08|05)+([0-9]{8})\b)/g;
      let isSubmit = true;

      // Check Empty
      for (let key in dataUser) {
        const value = `${dataUser[key]}`.trim();
        if (value == "") {
          isSubmit = false;
        }
      }

      // Not empty data => check type
      if (isSubmit) {
        isSubmit = undefined;

        for (let item in dataUser) {
          if (item == "email") {
            if (!emailCheck.test(dataUser[item])) {
              isSubmit = null;
            }
          }
          if (item == "phoneNumber") {
            if (!phoneCheck.test(dataUser[item])) {
              isSubmit = null;
            }
          }

          if (dataUserOriginal[item] != dataUser[item]) {
            isSubmit = true;
          }
        }

        // Nếu có thay đổi
        if (isSubmit == true) {
          this.setState({ isErr: false });

          let dataUser = JSON.stringify(this.state.dataUser);
          let { avataFile } = this.state;

          let data = new FormData();
          data.append("name", "file");
          data.append("file", avataFile);
          data.append("name", "dataUser");
          data.append("dataUser", dataUser);

          let res = await adminService.createNewUser(data);

          console.log(res);

          if (res.data.errCode == 0) {
            this.props.loginSystem({
              idUser: this.state.dataUser.id,
              type: "GET_DATA_USER",
            });
            toast.success(
              <SwitchLanguage id="manageAdmin.toast.success_change" />
            );
          }
        }
      }

      // Error
      if (isSubmit == false) {
        this.setState({ isErr: true });
      }

      if (isSubmit == null) {
        this.setState({ isErr: null });
      }

      if (isSubmit == undefined) {
        this.setState({ isErr: false });
      }
    }
  };

  render() {
    let { islogin, email } = this.props.dataUser;
    let { listGender, language } = this.props;
    let { dataUser, pewviewAvatar, isErr } = this.state;

    return (
      <>
        {!islogin && <Navigate to={path.HOME} />}

        <div id="ProFile">
          <p className="l-12 profile-heading">
            <SwitchLanguage id="proFile.proFileHeading" />
          </p>
          <p className="l-12 proFile-sub">
            <SwitchLanguage id="proFile.proFileSub" />
          </p>

          <div className="wrapper-avatar col l-3">
            <div className="border-avatar">
              <img
                src={
                  pewviewAvatar != null
                    ? pewviewAvatar
                    : `${process.env.REACT_APP_BACKEND_IMAGES_URL}/${dataUser.avatar}`
                }
              />
            </div>

            <input
              className="custom-file-input"
              onChange={(e) => this.handleChangeDataUser(e, "AVATAR")}
              type="file"
            />
          </div>

          <div className="row col l-9 wrapper-form-data">
            <div className="l-3">
              <p className="name-account">
                <SwitchLanguage id="proFile.nameAccount" />
              </p>
              <p className="surnameName">
                <SwitchLanguage id="proFile.surname" />
              </p>
              <p className="name">
                <SwitchLanguage id="proFile.name" />
              </p>
              <p className="email">
                <SwitchLanguage id="manageAdmin.form.email" />
              </p>
              <p className="phone">
                <SwitchLanguage id="manageAdmin.form.phone" />
              </p>
              <p className="gender">
                <SwitchLanguage id="manageAdmin.form.gender" />
              </p>
              <p className="birthday">
                <SwitchLanguage id="manageAdmin.form.birthday" />
              </p>
            </div>

            <div className="l-9">
              <p className="name-account-sub">{email}</p>

              <p className=" surname-name-sub">
                <input
                  onChange={(e) =>
                    this.handleChangeDataUser(e.target.value, "fristName")
                  }
                  value={dataUser.fristName}
                  type="text"
                />{" "}
              </p>
              <p className=" name-sub">
                <input
                  onChange={(e) =>
                    this.handleChangeDataUser(e.target.value, "LastName")
                  }
                  value={dataUser.LastName}
                  type="text"
                />{" "}
              </p>
              <p className=" email-sub">
                <input
                  onChange={(e) =>
                    this.handleChangeDataUser(e.target.value, "email")
                  }
                  value={dataUser.email}
                  type="text"
                />{" "}
              </p>
              <p className=" phone-sub">
                <input
                  onChange={(e) =>
                    this.handleChangeDataUser(e.target.value, "phoneNumber")
                  }
                  value={dataUser.phoneNumber}
                  type="text"
                />{" "}
              </p>

              <div className="list-gender">
                {listGender.length > 0 &&
                  listGender.map((gender, index) => {
                    return (
                      <div className="wrapper-gender" key={gender.valueVi}>
                        <input
                          id={index}
                          type="radio"
                          name="gender"
                          checked={
                            dataUser.gender == gender.keyMap ? true : false
                          }
                          onChange={(e) =>
                            this.handleChangeDataUser(e.target.value, "gender")
                          }
                          value={gender.keyMap}
                        />
                        <label htmlFor={index}>
                          {languages.EN == language
                            ? gender.valueEn
                            : gender.valueVi}
                        </label>
                      </div>
                    );
                  })}
              </div>

              <input
                type="date"
                ref={this.inputDate}
                onChange={(e) =>
                  this.handleChangeDataUser(e.target.value, "BIRTH")
                }
              />
            </div>

            <span className="err">
              {isErr && <SwitchLanguage id="proFile.errSubmit" />}{" "}
              {isErr == null && <SwitchLanguage id="proFile.errType" />}
            </span>
          </div>

          <span onClick={() => this.handleChangeDataUser("", "SUBMIT")}>
            <Button
              type="submit-form-data"
              content={<SwitchLanguage id={"manageAdmin.form.save"} />}
              color="var( --color-primary-items)"
              width="100px"
              border="4px"
            />
          </span>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    dataUser: state.app.loginUser,
    listGender: state.admin.dataForm.listGender,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginSystem: (dataForm) => dispatch(actions.loginSystemStart(dataForm)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProFile)
);
