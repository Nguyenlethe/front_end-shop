import React, { Component } from "react";
import { connect } from "react-redux";
import SwitchLanguage from "../../../../SwitchLanguage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faEye,
  faEyeSlash,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import * as actions from "../../../../store/action";
import { languages } from "../../../../utils/constant";
import { default as adminService } from "../../../../services/adminService";
import _ from "lodash";
import { toast } from "react-toastify";
import Button from "../../../../components/Button/Button";
import Select from "react-select";
import generalHandling from "../../../../utils/generalHandling";
import ListUser from "../ListUser";
import "./CreateUser.scss";

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgPreview: "",

      listGender: [],
      listProvince: [],
      listPermission: [],
      listDistrict: [],
      listDataWards: [],

      isShowListsInput: false,
      isShowPass: true,
      isEditUser: false,
      optionsGender: null,
      optionsPermission: null,
      optionsProvince: null,
      optionsDistrict: null,
      optionsDataWards: null,

      File: {
        name: "",
        file: "",
      },
      users: {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        gender: "",
        permission: "",
        phoneNumber: "",
        avata: "",
        avataLink: "",
        province: "",
        district: "",
        wards: "",
        addressDetails: "",
      },
      dataError: {
        email: {},
        password: {},
        firstName: {},
        lastName: {},
        gender: {},
        permission: {},
        phoneNumber: {},
        avata: {},
        avataLink: {},
        province: {},
        district: {},
        wards: {},
        addressDetails: {},
      },
    };
  }

  // https://nguyenlethe.github.io/images/image/avt_female.jpg
  // https://nguyenlethe.github.io/images/image/avt_male.jpeg

  // Component Mount
  componentDidMount = async () => {
    this.heandleDataForm();
  };

  // Component Update
  componentDidUpdate = async (prevProps, prevState) => {
    // Thay đổi ngôn ngữ
    if (prevProps.language !== this.props.language) {
      this.heandleDataForm("CHANGE_LANGUAGE");
    }

    // Khi dataForm thay đổi
    if (prevProps.dataForm !== this.props.dataForm) {
      this.heandleDataForm();
    }

    // Khi data huyện thay đổi
    if (prevProps.dataDistrict !== this.props.dataDistrict) {
      let { dataDistrict } = this.props;
      let district = generalHandling.handlConvertObject(
        dataDistrict,
        "DATA_FORM",
        this.props.language
      );
      this.setState({
        listDistrict: district || [],
      });
    }

    // Khi data xã thay đổi
    if (prevProps.dataWards !== this.props.dataWards) {
      let { dataWards } = this.props;
      let wards = generalHandling.handlConvertObject(
        dataWards,
        "DATA_FORM",
        this.props.language
      );
      this.setState({
        listDataWards: wards || [],
      });
    }
  };

  // XL Gán Gtri (Gender, Province, Permission)
  heandleDataForm = (action) => {
    let { dataForm, dataDistrict, dataWards } = this.props;

    let listGender = generalHandling.handlConvertObject(
      dataForm.listGender,
      "DATA_FORM",
      this.props.language
    );
    let listProvince = generalHandling.handlConvertObject(
      dataForm.listProvince,
      "DATA_FORM",
      this.props.language
    );
    let listPermission = generalHandling.handlConvertObject(
      dataForm.listPermission,
      "DATA_FORM",
      this.props.language
    );
    let district = generalHandling.handlConvertObject(
      dataDistrict,
      "DATA_FORM",
      this.props.language
    );
    let wards = generalHandling.handlConvertObject(
      dataWards,
      "DATA_FORM",
      this.props.language
    );

    // Set list data district & wards
    if (district.length > 0 || wards.length > 0) {
      this.setState({
        listDistrict: district || [],
        listDataWards: wards || [],
      });
    }

    // Nếu chuyển dổi ngôn ngữ
    if (action === "CHANGE_LANGUAGE") {
      let { users } = this.state;

      // Gender
      if (users.gender !== "" && listGender.length > 0) {
        let newGender = listGender.filter((item) => {
          if (item.value === users.gender) return item;
        });
        this.setState({ optionsGender: newGender[0] });
      }

      // Role
      if (users.permission !== "" && listPermission.length > 0) {
        let newRole = listPermission.filter((item) => {
          if (item.value === users.permission) return item;
        });
        this.setState({ optionsPermission: newRole[0] });
      }

      // Province
      if (users.province !== "" && listProvince.length > 0) {
        let newProvince = listProvince.filter((item) => {
          if (item.value === users.province) return item;
        });
        this.setState({ optionsProvince: newProvince[0] });
      }

      // district
      if (users.district !== "" && district.length > 0) {
        let newDistrict = district.filter((item) => {
          if (item.value === users.district) return item;
        });
        this.setState({ optionsDistrict: newDistrict[0] });
      }

      // wards
      if (users.wards !== "" && wards.length > 0) {
        let newWards = wards.filter((item) => {
          if (item.value === users.wards) return item;
        });
        this.setState({ optionsDataWards: newWards[0] });
      }
    }

    // set State
    this.setState({
      listGender: listGender,
      listProvince: listProvince,
      listPermission: listPermission,
    });
  };

  // Xl Khi change Input
  heandleChangeInput = (value, name, e) => {
    // Change avata
    if (name === "avata") {
      let file = e.target.files[0];
      let src = URL.createObjectURL(file);

      this.setState({
        imgPreview: src,
        File: {
          file: file,
        },
      });
    }

    // Khác avata
    if (name !== "avata") {
      let stateCopy = this.state.users;
      let stateCopyErr = this.state.dataError;
      for (let key in stateCopy) {
        if (key === name) {
          stateCopy[name] = value;
          stateCopyErr[name] = {};
        }
      }

      // Set state
      this.setState({
        dataError: { ...stateCopyErr },
        users: { ...stateCopy },
      });
    }
  };

  // Xl ẩn hiện form
  handleShowHideInputsUser = () => {
    let stateCopy = generalHandling.resetDefaultState(this.state.users);
    let stateErrorCopy = generalHandling.resetDefaultState(
      this.state.dataError
    );

    let { isEditUser } = this.state;
    if (isEditUser === true && this.state.isShowListsInput) {
      this.setState({
        isEditUser: false,
        optionsGender: null,
        optionsPermission: null,
        optionsProvince: null,
        optionsDistrict: null,
        optionsDataWards: null,
        users: { ...stateCopy },
        imgPreview: "",
        dataError: { ...stateErrorCopy },
        isShowListsInput: false,
      });
    } else {
      this.setState({
        optionsGender: null,
        optionsPermission: null,
        optionsProvince: null,
        optionsDistrict: null,
        optionsDataWards: null,
        isShowListsInput: !this.state.isShowListsInput,
      });
    }
  };

  // Xl submit form
  handleSubmitFormData = async (e) => {
    e.preventDefault();
    let { isEditUser, users } = this.state;
    if (!isEditUser) {
      console.log(this.state.users);

      let dataUser = JSON.stringify(this.state.users);
      let { file } = this.state.File;

      let data = new FormData();
      data.append("name", "file");
      data.append("file", file);
      data.append("name", "dataUser");
      data.append("dataUser", dataUser ? dataUser : "");
      let res = await adminService.createNewUser(data);
      await this.props.getAllUser("ALL");
      if (res.data.errCode !== 0) {
        toast.error(<SwitchLanguage id="manageAdmin.toast.warn" />);
        let stateCopy = this.state.dataError;
        for (let key in res.data.data) {
          stateCopy[key] = res.data.data[key];
        }
        this.setState({
          dataError: { ...stateCopy },
        });
      } else {
        let stateCopy = this.state.users;
        for (let key in stateCopy) {
          stateCopy[key] = "";
        }
        this.setState({
          isShowListsInput: false,
          imgPreview: "",
          users: { ...stateCopy },
        });
        toast.success(<SwitchLanguage id="manageAdmin.toast.success" />);
      }
    } else {
      let res = await adminService.changeUser(users);
      if (res && res.data.errCode === 0) {
        let stateCopy = this.state.users;
        for (let key in stateCopy) {
          stateCopy[key] = "";
        }
        this.setState({
          isShowListsInput: false,
          imgPreview: "",
          users: { ...stateCopy },
        });
        await this.props.getAllUser("ALL");
        toast.success(<SwitchLanguage id="manageAdmin.toast.success_change" />);
      }
    }
  };

  // Ấn sửa User load dữ liệu nguười dùng lên
  handleSetValueForm = (data) => {
    let stateCopy = this.state.dataError;
    let { language } = this.props;
    for (let key in stateCopy) {
      stateCopy[key] = "";
    }

    // Sủa lấy ra các options
    let districtData = {
      value: data.district,
      label:
        languages.EN === language
          ? data.districtData.valueEn
          : data.districtData.valueVi,
    };
    let genderData = {
      value: data.gender,
      label:
        languages.EN === language
          ? data.genderData.valueEn
          : data.genderData.valueVi,
    };
    let permissionData = {
      value: data.permission,
      label:
        languages.EN === language
          ? data.permissionData.valueEn
          : data.permissionData.valueVi,
    };
    let provinceData = {
      value: data.province,
      label:
        languages.EN === language
          ? data.provinceData.valueEn
          : data.provinceData.valueVi,
    };
    let wardsData = {
      value: data.wards,
      label:
        languages.EN === language
          ? data.wardsData.valueEn
          : data.wardsData.valueVi,
    };
    this.props.fetchAllDataProvince(provinceData.value);
    this.props.fetchAllDataWards(districtData.value);

    // Set lại gtri state
    this.setState({
      dataError: { ...stateCopy },
      isShowListsInput: true,
      imgPreview: `${process.env.REACT_APP_BACKEND_IMAGES_URL}/${data.avata}`,
      users: {
        email: data.email ? data.email : "",
        password: "",
        avata: "",
        firstName: data.firstName ? data.firstName : "",
        lastName: data.lastName ? data.lastName : "",
        gender: data.gender ? data.gender : "",
        permission: data.permission ? data.permission : "",
        phoneNumber: data.phoneNumber ? data.phoneNumber : "",
        avataLink: data.avataLink ? data.avataLink : "",
        province: data.province ? data.province : "",
        district: data.district ? data.district : "",
        wards: data.wards ? data.wards : "",
        addressDetails: data.addressDetails ? data.addressDetails : "",
      },
      isEditUser: true,
      optionsGender: genderData || null,
      optionsPermission: permissionData || null,
      optionsProvince: provinceData || null,
      optionsDistrict: districtData || null,
      optionsDataWards: wardsData || null,
    });
  };

  // Xl change input select
  handlChangeSlelect = async (valueOptions, name) => {
    let { users, dataError } = this.state;

    // Set state
    if (name.name === "gender") {
      this.setState({
        optionsGender: valueOptions,
        users: {
          ...users,
          gender: valueOptions.value,
        },
        dataError: {
          ...dataError,
          gender: {},
        },
      });
    }
    // Set state
    if (name.name === "permission") {
      this.setState({
        optionsPermission: valueOptions,
        users: {
          ...users,
          permission: valueOptions.value,
        },
        dataError: {
          ...dataError,
          permission: {},
        },
      });
    }
    // Set state
    if (name.name === "province") {
      this.props.fetchAllDataProvince(valueOptions.value);

      this.setState({
        optionsProvince: valueOptions,
        optionsDistrict: null,
        users: {
          ...users,
          province: valueOptions.value,
          district: "",
        },
        dataError: {
          ...dataError,
          province: {},
        },
      });
    }
    // Set state
    if (name.name === "district") {
      this.props.fetchAllDataWards(valueOptions.value);

      this.setState({
        optionsDistrict: valueOptions,
        optionsDataWards: null,
        users: {
          ...users,
          district: valueOptions.value,
          wards: "",
        },
        dataError: {
          ...dataError,
          district: {},
        },
      });
    }
    // Set state
    if (name.name === "wards") {
      this.setState({
        optionsDataWards: valueOptions,
        users: {
          ...users,
          wards: valueOptions.value,
        },
        dataError: {
          ...dataError,
          wards: {},
        },
      });
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
    let { language, dataForm } = this.props;
    let {
      listGender,
      listProvince,
      listPermission,
      listDataWards,
      isShowListsInput,
      imgPreview,
      isShowPass,
      dataError,
      isEditUser,

      optionsGender,
      optionsPermission,
      optionsProvince,
      optionsDistrict,
      optionsDataWards,

      listDistrict,
    } = this.state;
    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      avata,
      avataLink,
      wards,
      addressDetails,
    } = this.state.users;

    return (
      <>
        <div className="col l-12">
          <p className="heading-manage-user">
            <SwitchLanguage id="manageAdmin.manageUsers" />
          </p>
        </div>

        <div
          className="col l-3 btn-craete-user"
          onClick={() => this.handleShowHideInputsUser()}
        >
          {isShowListsInput && (
            <Button
              type="submit-form-data"
              content={<SwitchLanguage id={"manageAdmin.form.hide"} />}
              color="var(--color-BTN-manage)"
              width="50%"
              margin="4px"
              border="6px"
            />
          )}
          {!isShowListsInput && (
            <Button
              type="submit-form-data"
              content={<SwitchLanguage id={"manageAdmin.createUser"} />}
              icon={<FontAwesomeIcon className="icon-user" icon={faUserPlus} />}
              color="var(--color-BTN-manage)"
              width="80%"
              margin="4px"
              border="6px"
            />
          )}
        </div>

        <div
          style={{ height: isShowListsInput ? "1058" + "px" : "0" + "px" }}
          className="all-input l-12"
        >
          <div className="list-input">
            <div
              className="form-input col l-6"
              style={{ display: isEditUser ? "none" : "block" }}
            >
              <label className="input-label">
                <SwitchLanguage id="manageAdmin.form.email" />
              </label>
              <input
                type="text"
                className="input"
                name="email"
                style={{
                  backgroundColor: email !== "" ? "white" : "transparent",
                }}
                value={email}
                disabled={isEditUser ? true : false}
                onChange={(e) =>
                  this.heandleChangeInput(e.target.value, e.target.name)
                }
              />
              <span name="email" className="planceholder_input">
                <SwitchLanguage id="manageAdmin.form.planceholder_email" />
              </span>
              <span className="err">
                {!_.isEmpty(dataError.email) && (
                  <FontAwesomeIcon icon={faCircleExclamation} />
                )}{" "}
                {!_.isEmpty(dataError.email)
                  ? language === languages.VI
                    ? dataError.email.valueVi
                    : dataError.email.valueEn
                  : ""}
              </span>
            </div>

            <div
              className="form-input password col l-6 "
              style={{ display: isEditUser ? "none" : "block" }}
            >
              <label className="input-label">
                <SwitchLanguage id="manageAdmin.form.password" />
              </label>
              <input
                type={isShowPass ? "password" : "text"}
                className="input"
                name="password"
                style={{
                  backgroundColor: password !== "" ? "white" : "transparent",
                }}
                value={password}
                disabled={isEditUser ? true : false}
                onChange={(e) =>
                  this.heandleChangeInput(e.target.value, e.target.name)
                }
              />
              <p
                className="eye-password"
                onClick={() =>
                  this.setState({ isShowPass: !this.state.isShowPass })
                }
              >
                {isShowPass === false ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </p>
              <span className="planceholder_input">
                <SwitchLanguage id="manageAdmin.form.planceholder_password" />
              </span>
              <span className="err">
                {!_.isEmpty(dataError.password) && (
                  <FontAwesomeIcon icon={faCircleExclamation} />
                )}{" "}
                {!_.isEmpty(dataError.password)
                  ? language === languages.VI
                    ? dataError.password.valueVi
                    : dataError.password.valueEn
                  : ""}
              </span>
            </div>
          </div>

          <div className="list-input">
            <div className="form-input col l-6">
              <label className="input-label">
                <SwitchLanguage id="manageAdmin.form.firstName" />
              </label>
              <input
                type="text"
                className="input"
                name="firstName"
                style={
                  firstName !== ""
                    ? { backgroundColor: "white" }
                    : { backgroundColor: "transparent" }
                }
                value={firstName}
                onChange={(e) =>
                  this.heandleChangeInput(e.target.value, e.target.name)
                }
              />
              <span className="planceholder_input">
                <SwitchLanguage id="manageAdmin.form.planceholder_firstName" />
              </span>
              <span className="err">
                {!_.isEmpty(dataError.firstName) && (
                  <FontAwesomeIcon icon={faCircleExclamation} />
                )}{" "}
                {!_.isEmpty(dataError.firstName)
                  ? language === languages.VI
                    ? dataError.firstName.valueVi
                    : dataError.firstName.valueEn
                  : ""}
              </span>
            </div>

            <div className="form-input col l-6">
              <label className="input-label">
                <SwitchLanguage id="manageAdmin.form.lastName" />
              </label>
              <input
                type="text"
                className="input"
                name="lastName"
                style={
                  lastName !== ""
                    ? { backgroundColor: "white" }
                    : { backgroundColor: "transparent" }
                }
                value={lastName}
                onChange={(e) =>
                  this.heandleChangeInput(e.target.value, e.target.name)
                }
              />
              <span className="planceholder_input">
                <SwitchLanguage id="manageAdmin.form.planceholder_lastName" />
              </span>
              <span className="err">
                {!_.isEmpty(dataError.lastName) && (
                  <FontAwesomeIcon icon={faCircleExclamation} />
                )}{" "}
                {!_.isEmpty(dataError.lastName)
                  ? language === languages.VI
                    ? dataError.lastName.valueVi
                    : dataError.lastName.valueEn
                  : ""}
              </span>
            </div>
          </div>

          <div className="list-input">
            <div className="form-input col l-6">
              <label className="input-label">
                <SwitchLanguage id="manageAdmin.form.gender" />
              </label>
              <Select
                value={optionsGender}
                onChange={this.handlChangeSlelect}
                options={listGender}
                name="gender"
                styles={this.customStyles}
                placeholder={
                  <SwitchLanguage id="manageAdmin.form.planceholder_gender" />
                }
              />
              <span className="err">
                {!_.isEmpty(dataError.gender) && (
                  <FontAwesomeIcon icon={faCircleExclamation} />
                )}{" "}
                {!_.isEmpty(dataError.gender)
                  ? language === languages.VI
                    ? dataError.gender.valueVi
                    : dataError.gender.valueEn
                  : ""}
              </span>
            </div>

            <div className="form-input col l-6">
              <label className="input-label">
                <SwitchLanguage id="manageAdmin.form.permission" />
              </label>
              <Select
                value={optionsPermission}
                onChange={this.handlChangeSlelect}
                options={listPermission}
                name="permission"
                styles={this.customStyles}
                placeholder={
                  <SwitchLanguage id="manageAdmin.form.planceholder_permission" />
                }
              />
              <span className="err">
                {!_.isEmpty(dataError.permission) && (
                  <FontAwesomeIcon icon={faCircleExclamation} />
                )}{" "}
                {!_.isEmpty(dataError.permission)
                  ? language === languages.VI
                    ? dataError.permission.valueVi
                    : dataError.permission.valueEn
                  : ""}
              </span>
            </div>
          </div>

          <div className="list-input">
            <div className="form-input col l-6">
              <label className="input-label">
                <SwitchLanguage id="manageAdmin.form.avataLink" />
              </label>
              <input
                type="text"
                className="input"
                name="avataLink"
                style={
                  avataLink !== ""
                    ? { backgroundColor: "white" }
                    : { backgroundColor: "transparent" }
                }
                value={avataLink}
                onChange={(e) =>
                  this.heandleChangeInput(e.target.value, e.target.name)
                }
              />
              <span className="planceholder_input">
                <SwitchLanguage id="manageAdmin.form.planceholder_avataLink" />
              </span>
              <span className="err">
                {!_.isEmpty(dataError.avataLink) && (
                  <FontAwesomeIcon icon={faCircleExclamation} />
                )}{" "}
                {!_.isEmpty(dataError.avataLink)
                  ? language === languages.VI
                    ? dataError.avataLink.valueVi
                    : dataError.avataLink.valueEn
                  : ""}
              </span>
            </div>

            <div className="form-input col l-6">
              <label className="input-label">
                <SwitchLanguage id="manageAdmin.form.Province" />
              </label>
              <Select
                value={optionsProvince}
                onChange={this.handlChangeSlelect}
                options={listProvince}
                name="province"
                styles={this.customStyles}
                placeholder={
                  <SwitchLanguage id="manageAdmin.form.planceholder_Province" />
                }
              />
              <span className="err">
                {!_.isEmpty(dataError.province) && (
                  <FontAwesomeIcon icon={faCircleExclamation} />
                )}{" "}
                {!_.isEmpty(dataError.province)
                  ? language === languages.VI
                    ? dataError.province.valueVi
                    : dataError.province.valueEn
                  : ""}
              </span>
            </div>
          </div>

          <div className="list-input">
            <div className="form-input col l-6">
              <label className="input-label">
                <SwitchLanguage id="manageAdmin.form.district" />
              </label>
              <Select
                value={optionsDistrict}
                onChange={this.handlChangeSlelect}
                options={listDistrict}
                name="district"
                styles={this.customStyles}
                placeholder={
                  <SwitchLanguage id="manageAdmin.form.planceholder_district" />
                }
              />
              <span className="err">
                {!_.isEmpty(dataError.district) && (
                  <FontAwesomeIcon icon={faCircleExclamation} />
                )}{" "}
                {!_.isEmpty(dataError.district)
                  ? language === languages.VI
                    ? dataError.district.valueVi
                    : dataError.district.valueEn
                  : ""}
              </span>
            </div>

            <div className="form-input col l-6">
              <label className="input-label">
                <SwitchLanguage id="manageAdmin.form.wards" />
              </label>
              {listDataWards && listDataWards.length > 0 ? (
                <Select
                  value={optionsDataWards}
                  onChange={this.handlChangeSlelect}
                  options={listDataWards}
                  name="wards"
                  styles={this.customStyles}
                  placeholder={
                    <SwitchLanguage id="manageAdmin.form.planceholder_wards" />
                  }
                />
              ) : (
                <>
                  <input
                    type="text"
                    className="input"
                    name="wards"
                    style={
                      wards !== ""
                        ? { backgroundColor: "white" }
                        : { backgroundColor: "transparent" }
                    }
                    value={wards}
                    onChange={(e) =>
                      this.heandleChangeInput(e.target.value, e.target.name)
                    }
                  />
                  <span className="planceholder_input">
                    <SwitchLanguage id="manageAdmin.form.planceholder_wards" />
                  </span>
                </>
              )}
              <span className="err">
                {!_.isEmpty(dataError.wards) && (
                  <FontAwesomeIcon icon={faCircleExclamation} />
                )}{" "}
                {!_.isEmpty(dataError.wards)
                  ? language === languages.VI
                    ? dataError.wards.valueVi
                    : dataError.wards.valueEn
                  : ""}
              </span>
            </div>
          </div>

          <div className="list-input">
            <div className="form-input col l-12">
              <label className="input-label">
                <SwitchLanguage id="manageAdmin.form.AddressDetails" />
              </label>
              <input
                type="text"
                className="input"
                name="addressDetails"
                style={
                  addressDetails !== ""
                    ? { backgroundColor: "white" }
                    : { backgroundColor: "transparent" }
                }
                value={addressDetails}
                onChange={(e) =>
                  this.heandleChangeInput(e.target.value, e.target.name)
                }
              />
              <span className="planceholder_input">
                <SwitchLanguage id="manageAdmin.form.planceholder_AddressDetails" />
              </span>
              <span className="err">
                {!_.isEmpty(dataError.addressDetails) && (
                  <FontAwesomeIcon icon={faCircleExclamation} />
                )}{" "}
                {!_.isEmpty(dataError.addressDetails)
                  ? language === languages.VI
                    ? dataError.addressDetails.valueVi
                    : dataError.addressDetails.valueEn
                  : ""}
              </span>
            </div>
          </div>

          <div className="list-input">
            <div className="form-input col l-6">
              <label className="input-label">
                <SwitchLanguage id="manageAdmin.form.phone" />
              </label>
              <input
                type="text"
                className="input"
                name="phoneNumber"
                style={
                  phoneNumber !== ""
                    ? { backgroundColor: "white" }
                    : { backgroundColor: "transparent" }
                }
                value={phoneNumber}
                onChange={(e) =>
                  this.heandleChangeInput(e.target.value, e.target.name)
                }
              />
              <span className="planceholder_input">
                <SwitchLanguage id="manageAdmin.form.planceholder_phone" />
              </span>
              <span className="err">
                {!_.isEmpty(dataError.phoneNumber) && (
                  <FontAwesomeIcon icon={faCircleExclamation} />
                )}{" "}
                {!_.isEmpty(dataError.phoneNumber)
                  ? language === languages.VI
                    ? dataError.phoneNumber.valueVi
                    : dataError.phoneNumber.valueEn
                  : ""}
              </span>
            </div>

            <div className="form-input col l-6">
              <label className="input-label">
                <SwitchLanguage id="manageAdmin.form.avata" />
              </label>
              <input
                type="file"
                className="input"
                name="avata"
                style={
                  avata !== ""
                    ? { backgroundColor: "white" }
                    : { backgroundColor: "transparent" }
                }
                value={avata}
                disabled={isEditUser ? true : false}
                onChange={(e) =>
                  this.heandleChangeInput(e.target.value, e.target.name, e)
                }
              />
              <span className="err">
                {!_.isEmpty(dataError.avata) && (
                  <FontAwesomeIcon icon={faCircleExclamation} />
                )}{" "}
                {!_.isEmpty(dataError.avata)
                  ? language === languages.VI
                    ? dataError.avata.valueVi
                    : dataError.avata.valueEn
                  : ""}
              </span>
            </div>
          </div>

          <div className="pewview-img l-3">
            <div className="pewview-border-img">
              <img className="avata-img" src={imgPreview} alt="" />
            </div>
          </div>

          <div className="col l-12">
            {!isEditUser && (
              <div
                className="l-2"
                onClick={(e) => this.handleSubmitFormData(e)}
              >
                <Button
                  type="submit-form-data"
                  content={<SwitchLanguage id={"manageAdmin.form.btn"} />}
                  color="var(--color-BTN-manage)"
                  width="80%"
                  margin="4px"
                  border="6px"
                />
              </div>
            )}

            {isEditUser && (
              <div
                className="l-2"
                onClick={(e) => this.handleSubmitFormData(e)}
              >
                <Button
                  type="edit-form-data"
                  content={<SwitchLanguage id="manageAdmin.form.btn_edit" />}
                  width="80%"
                  margin="4px"
                  border="6px"
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <ListUser
            handleSetValueForm={this.handleSetValueForm}
            heandleChangeInput={this.heandleChangeInput}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataForm: state.admin.dataForm,
    dataDistrict: state.admin.dataDistrict,
    dataWards: state.admin.dataWards,
    language: state.app.language,
    dataUser: state.app.loginUser,
    allShops: state.admin.listShops.allShops,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDataProvince: (data) =>
      dispatch(actions.fetchAllDataProvinceStart(data)),
    fetchAllDataWards: (data) => dispatch(actions.fetchAllDataWardsStart(data)),
    getAllUser: (type) => dispatch(actions.getAllUserStart(type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
