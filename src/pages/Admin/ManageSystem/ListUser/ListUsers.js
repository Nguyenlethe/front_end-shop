import React, { Component } from "react";
import { connect } from "react-redux";
import SwitchLanguage from "../../../../SwitchLanguage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { languages } from "../../../../utils/constant";
import { Link } from "react-router-dom";
import adminService from "../../../../services/adminService";
import Modal from "../../../../components/Modal/ModalLoad";
import * as actions from "../../../../store/action";

import classNames from "classnames/bind";
import styles from "./ListUsers.module.scss";
const cx = classNames.bind(styles);

class ListUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModal: false,
      listAllUsers: [],
    };
  }

  componentDidMount = async () => {
    await this.props.getAllUser("ALL");
  };

  componentDidUpdate = async (prevProps, prevState) => {
    let { allUser } = this.props;
    if (prevProps.language !== this.props.language) {
    }

    if (prevProps.allUser !== this.props.allUser) {
      this.setState({
        listAllUsers: [...allUser],
      });
    }
  };

  // Xóa user
  handleDelete = async (user) => {
    this.setState({ isModal: true });
    let res = await adminService.deleteUser(user);
    console.log(res);
    if (res && res.data.errCode === 0) {
      await this.props.getAllUser("ALL");

      this.setState({ isModal: false });
    } else {
      this.setState({ isModal: false });
    }
  };

  // Click Sửa user
  handleEditUser = (data) => {
    let { handleSetValueForm, heandleChangeInput } = this.props;
    heandleChangeInput(data.province, "province");
    heandleChangeInput(data.district, "district");
    handleSetValueForm(data);
  };

  render() {
    let { listAllUsers, isModal } = this.state;
    let { language } = this.props;

    return (
      <>
        <Modal isShow={isModal} />
        <div className="col l-12">
          <p className={cx("heading-manage-user")}>
            <SwitchLanguage id="manageAdmin.form.listUser" />
          </p>
        </div>

        <div className="col l-12">
          <div className={cx("tabel")}>
            <table id={cx("customers")}>
              <tbody>
                <tr>
                  <th>STT</th>
                  <th>Email</th>
                  <th>
                    <SwitchLanguage id="manageAdmin.form.fullName" />
                  </th>
                  <th>
                    <SwitchLanguage id="manageAdmin.form.Address" />
                  </th>
                  <th>
                    <SwitchLanguage id="manageAdmin.form.Permission" />
                  </th>
                  <th>
                    <SwitchLanguage id="manageAdmin.form.Detail" />
                  </th>
                  <th>
                    <SwitchLanguage id="manageAdmin.form.Actions" />
                  </th>
                </tr>

                {listAllUsers &&
                  listAllUsers.length > 0 &&
                  listAllUsers.map((user, index) => {
                    return (
                      <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>
                          {user.email && user.email ? (
                            language === languages.EN ? (
                              user.email
                            ) : (
                              user.email
                            )
                          ) : (
                            <SwitchLanguage id="manageAdmin.form.emptyData" />
                          )}
                        </td>
                        <td>
                          {user.firstName && user.lastName ? (
                            language === languages.VI ? (
                              `${user.firstName} ${user.lastName}`
                            ) : (
                              `${user.lastName} ${user.firstName}`
                            )
                          ) : (
                            <SwitchLanguage id="manageAdmin.form.emptyData" />
                          )}
                        </td>
                        <td>
                          {user.provinceData &&
                          user.provinceData.valueEn &&
                          user.provinceData.valueVi ? (
                            language === languages.EN ? (
                              user.provinceData.valueEn
                            ) : (
                              user.provinceData.valueVi
                            )
                          ) : (
                            <SwitchLanguage id="manageAdmin.form.emptyData" />
                          )}
                        </td>
                        <td>
                          {user.permissionData &&
                          user.permissionData.valueEn &&
                          user.permissionData.valueVi ? (
                            language === languages.EN ? (
                              user.permissionData.valueEn
                            ) : (
                              user.permissionData.valueVi
                            )
                          ) : (
                            <SwitchLanguage id="manageAdmin.form.emptyData" />
                          )}
                        </td>
                        <td>
                          {" "}
                          <Link className={cx("detail-user")} to="/">
                            <SwitchLanguage id="manageAdmin.form.viewDetail" />
                          </Link>
                        </td>
                        <td>
                          <FontAwesomeIcon
                            onClick={() => this.handleEditUser(user)}
                            className={cx("icon-tabel")}
                            icon={faUserPen}
                          />
                          <FontAwesomeIcon
                            onClick={() => this.handleDelete(user)}
                            className={cx("icon-tabel")}
                            icon={faTrashCan}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allUser: state.admin.listUser.allUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUser: (type) => dispatch(actions.getAllUserStart(type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListUsers);
