import React, { Component } from 'react';
import { connect } from "react-redux";
import SwitchLanguage from '../../../../SwitchLanguage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserPen,faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {languages } from '../../../../utils/constant'
import { Link } from 'react-router-dom';
import adminService from '../../../../services/adminService'
import Modal from '../../../../components/Modal/Modal'
import * as actions from '../../../../store/action';


import classNames from 'classnames/bind';
import styles from '../ListUser/ListUsers.module.scss';
const cx = classNames.bind(styles);


class ListShops extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModal: false,
            listAllShops: []
        }
    }

   
    componentDidMount = async () => { 
       await this.props.getAllShop('ALL')
    }

    componentDidUpdate= async (prevProps, prevState) => {
        let {allShops} = this.props
        if(prevProps.language !== this.props.language){
            
        }
        
        if(prevProps.allShops !== this.props.allShops){
            this.setState({
                listAllShops: [...allShops]
            })
        }
    }

    // Xóa user
    handleDelete =  async (user) =>  {
        this.setState({isModal: true})

        let res = await adminService.deleteShop(user)

        console.log(res)

        if(res && res.data.errCode === 0) {
            await this.props.getAllShop('ALL')
            this.setState({isModal: false})
        }else{
            this.setState({isModal: false})
        }
    }

    // Click Sửa user
    handleEditUser = (data) => {
        let {handleSetValueForm,heandleChangeInput} = this.props
        heandleChangeInput(data.province, 'province')
        heandleChangeInput(data.district, 'district')        
        handleSetValueForm(data)
    }


render() { 
let {listAllShops,isModal} = this.state
let {language} = this.props




return (
    <>
        <Modal isShow={isModal}/>
        <div className='col l-12'>
            <p className={cx('heading-manage-user')}><SwitchLanguage id='manageAdmin.form.listUser' /></p> 
        </div> 

         <div className='col l-12'>
            <div className={cx('tabel')}>
                <table id={cx('customers')}>
                    <tbody>
                        <tr>
                            <th>STT</th>
                            <th>Email</th>
                            <th><SwitchLanguage id='manageAdmin.form.manager' /></th>
                            <th><SwitchLanguage id='manageAdmin.form.Address' /></th>
                            <th><SwitchLanguage id='manageAdmin.form.phoneNumber' /></th>
                            <th><SwitchLanguage id='manageAdmin.form.Detail' /></th>
                            <th><SwitchLanguage id='manageAdmin.form.Actions' /></th>
                           
                        </tr>

                        {listAllShops && listAllShops.length > 0 && listAllShops.map((shop, index) => {
                            return (
                            <tr key={shop.id}>
                                <td>{index + 1}</td>
                                <td>{shop.emailShop && shop.emailShop ? shop.emailShop : <SwitchLanguage id='manageAdmin.form.emptyData' /> }</td>
                                <td>{shop.FullName && shop.FullName.firstName ? language === languages.VI ? `${shop.FullName.firstName} ${shop.FullName.lastName}`: `${shop.FullName.lastName} ${shop.FullName.firstName}` : <SwitchLanguage id='manageAdmin.form.emptyData' /> }</td>
                                <td>{shop.addressShop ? shop.addressShop : <SwitchLanguage id='manageAdmin.form.emptyData' /> }</td>
                                <td>{shop.phoneNumber ? shop.phoneNumber : <SwitchLanguage id='manageAdmin.form.emptyData' /> }</td>
                                <td> <Link className={cx('detail-shop')} to='/'><SwitchLanguage id='manageAdmin.form.viewDetail' /></Link></td>
                                <td>
                                    <FontAwesomeIcon onClick={() => this.handleEditUser(shop)} className={cx('icon-tabel')}icon={faUserPen}/>
                                    <FontAwesomeIcon onClick={() => this.handleDelete(shop)} className={cx('icon-tabel')}icon={faTrashCan}/>
                                </td>
                            </tr>
                            )
                        })}
                        
                    </tbody>
                </table>
        
            </div> 
        </div>   
    </>
)}}


const mapStateToProps = state => {
    return {
        language: state.app.language,
        allShops: state.admin.listShops.allShops
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllShop: (type) => dispatch(actions.getAllShopStart(type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListShops);
