
import React, { Component } from 'react';
import { connect } from "react-redux";
import SwitchLanguage from '../../../../../SwitchLanguage';
import * as actions from '../../../../../store/action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserPen,faTrashCan} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import {languages } from '../../../../../utils/constant'
import adminService from '../../../../../services/adminService';
import { toast } from 'react-toastify';


import classNames from 'classnames/bind';
import styles from './ListItems.module.scss';
const cx = classNames.bind(styles);

class ListItems extends Component {
    constructor(props){
        super(props);
        this.state = {
            listAllItems: []
        }
    }

    componentDidMount = async() => {
        await this.props.getDataItems('All')
    }


    componentDidUpdate = async(prevProps, prevState) => {
        let {itemsAll} = this.props

        if(prevProps.itemsAll !== this.props.itemsAll){
            this.setState({
                listAllItems: itemsAll
            })
        }
    }

   

    // Xóa items
    handleDelete = async(item) => {
        let res = await adminService.deleteDataItems({id:item})

        if(res && res.data.errCode === 0){
            await this.props.getDataItems('All')
            toast.success(<SwitchLanguage id='manageAdmin.toast.deleteSuccessItems'/>)
        }else{
            await this.props.getDataItems('All')
            toast.warn(<SwitchLanguage id='manageAdmin.toast.warn'/>)
        }
    }


    // Edit gửi data
    handleEditUser = async (items) => {
        await this.props.setStateItems()
        this.props.handleEditItems(items)

    }


    render() {
        let {listAllItems} = this.state
        let {language} = this.props


    return (
        <>
            <div className={cx('col l-12')}>
                <div className={cx('tabel')}>
                    <table id={cx('customers')}>
                        <tbody>
                            <tr>
                                <th>STT</th>
                                <th><SwitchLanguage id='manageAdmin.form.nameItemsListItems' /></th>
                                <th><SwitchLanguage id='manageAdmin.form.codeItems' /></th>
                                <th><SwitchLanguage id='manageAdmin.form.category' /></th>
                                <th><SwitchLanguage id='manageAdmin.form.type' /></th>
                                <th><SwitchLanguage id='manageAdmin.form.Detail' /></th>
                                <th><SwitchLanguage id='manageAdmin.form.Actions' /></th>
                            </tr>

                            {listAllItems && listAllItems.length > 0 &&
                                listAllItems.map((item, index) => {
                                    return (
                                        <tr key={item.idItems}>
                                            <td>STT</td>
                                            <td className={cx('wraper-name')}> <span className={cx('name')}>{item.name}</span></td>
                                            <td className={cx('idItems')}>{item.idItems}</td>  
                                            <td>{item.categoryData && item.categoryData && languages.EN === language ? item.categoryData.valueEn : item.categoryData.valueVi}</td>
                                            <td>{item.typeData && item.typeData && languages.EN === language ? item.typeData.valueEn : item.typeData.valueVi}</td>
                                            <td><Link className={cx('detail-shop')} to='/'><SwitchLanguage id='manageAdmin.form.viewDetail' /></Link></td>
                                            <td>
                                                <FontAwesomeIcon onClick={() => this.handleEditUser(item)} className={cx('icon-tabel')}icon={faUserPen}/>
                                                <FontAwesomeIcon onClick={() => this.handleDelete(item.idItems)} className={cx('icon-tabel')}icon={faTrashCan}/>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
            
                </div> 
            </div>   
        </>
    )}
} 


const mapStateToProps = state => {
    
    return {
        itemsAll: state.admin.items.itemsAll,
        language: state.app.language,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDataItems: (type) => dispatch(actions.getDataItemsStart(type)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItems);