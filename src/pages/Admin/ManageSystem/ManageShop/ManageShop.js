import React, { Component } from 'react';
import { connect } from "react-redux";
import SwitchLanguage from '../../../../SwitchLanguage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStore,faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import * as actions from '../../../../store/action';

import {languages } from '../../../../utils/constant'
import {default as adminService} from '../../../../services/adminService'
import _ from 'lodash'
import { toast } from 'react-toastify';
import ListShops from '../ListShop/ListShops'

import '../CreateUser/CreateUser.scss'

class ManageShop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgPreview: '',
            isShowListsInput: false,
            listPay:[],
            listPermission: [],
            listProvince: [],
            listUser: [],
            dataShop: {
                manageId: '',
                permission: 'R2',
                nameShop: '',
                addressShop: '',
                emailShop: '', 
                phoneNumber: '',
                pay: '',
                province: '',
                avata: '',
            },
            File: {
                name: '',
                file: '',
            },
            dataError: {
                manageId: {},
                permission: {},
                nameShop: {},
                addressShop: {},
                emailShop: {},
                phoneNumber: {},
                pay: {},
                province: {},
                avata: {}
            },
          
        }
    }

    // DidMound
    componentDidMount = async ()=>  {
        await this.props.fetchAllDataAllCode()
        await this.props.getAllUser('ALL')
        this.heandleDataForm()
    }


    // XL Gán Gtri (Gender, Province, Permission)
    heandleDataForm = ()  => {
        let {dataForm,allUser} = this.props
        this.setState({
            listPay: dataForm.listPay,
            listProvince: dataForm.listProvince,
            listPermission: dataForm.listPermission,
            listUser: allUser
        })
    }

    // DidUpdate
    componentDidUpdate= async(prevProps, prevState)=> {
        let {dataForm} = this.props.dataForm
        if(prevProps.dataForm !== this.props.dataForm){

        }
    }


    // Show Hide list input
    handleShowHideInputsUser = async ()=>{
        let stateCopy = this.state.dataShop
        let stateCopyErr = this.state.dataError
        for(let key in stateCopyErr){
            stateCopyErr[key] = {}
            stateCopy[key] = ''
        }
        this.setState({    
            dataError: {...stateCopyErr},
            dataShop: {...stateCopy},
            isShowListsInput: !this.state.isShowListsInput
        })
    }


    // On Change
    heandleChangeInput = (value, name,e) => {
        let stateCopy = this.state.dataShop
        let stateCopyErr = this.state.dataError

        if(name === 'avata'){    
            let file = e.target.files[0]
            let src = URL.createObjectURL(file) 
            this.setState({
                imgPreview: src,
                File:{
                    file: file
                }
            })
        }

      
      


        for(let key in stateCopy){
            if(key === name){
                stateCopy[name] = value
                stateCopyErr[name] = {}
            }
        }
        this.setState({
            dataError: {...stateCopyErr},
            dataShop: {...stateCopy}
        })
    }

    

    // Xl submit form
    handleSubmitFormData = async (e) => {
        e.preventDefault() 
        let shopData = JSON.stringify({...this.state.dataShop, permission: 'R2'})
        let {file} = this.state.File
        let data = new FormData()
        data.append("name", 'file')
        data.append("file", file )
        data.append("name", 'shopData')
        data.append("shopData", shopData ? shopData : '')
        
      
        let res = await adminService.createNewShop(data)
    
        console.log(res)


        if(res.data.errCode !== 0){
            toast.error(<SwitchLanguage id='manageAdmin.toast.warn'/>)
            let stateCopy = this.state.dataError
            for(let key in res.data.data){
                stateCopy[key] = res.data.data[key]
            }
            this.setState({
                dataError: {...stateCopy}
            })
        }


        if(res && res.data.errCode === 0){
            await this.props.getAllShop('ALL')
            let stateCopy = this.state.dataShop
            for(let key in stateCopy){
                stateCopy[key] = ''
            }
            this.setState({
                imgPreview: '',
                dataShop: {...stateCopy}
            })

            toast.success(<SwitchLanguage id='manageAdmin.toast.success'/>)
        }

    }

    
    render() {

    let {manageId,permission,nameShop,addressShop,emailShop, phoneNumber,pay,province,avata} = this.state.dataShop
    let {isShowListsInput,listPay,listProvince,imgPreview,listUser,dataError} = this.state
    let {language} = this.props


    return (

    <>
    <div className='l-12'>
        <p className='heading-manage-user'><SwitchLanguage id='manageAdmin.manageShop' /></p> 
    </div> 

    <div className='col l-3'>
        <span className='sub-heading' onClick={() => this.handleShowHideInputsUser()}>
            <SwitchLanguage id='manageAdmin.createShop'/>
            <FontAwesomeIcon className='icon-user' icon={faStore} />
        </span>
    </div>

    <div style={{height: isShowListsInput ? '1160'+'px' : '0'+'px'}}  className='all-input l-12'>
            

        <div className='list-input'>

            <div className='form-input col l-6'>
                <label className='input-label'><SwitchLanguage id='manageAdmin.form.manageId'/></label>
                <select id='input-select' type='text' className='input' value={manageId} name='manageId'
                    style={manageId !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}
                    onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name, e)}                                          
                >
                <option value='none'></option>
                {listUser && listUser.length > 0 && listUser.map(item => {
                    let value = language === languages.EN ? `${item.lastName} ${item.firstName}` : `${item.firstName} ${item.lastName}`;
                    return (<option value={item.id} key={item.id} name={item.permission}>{value}</option>)
                })}
                </select>
                <span className='planceholder_input'><SwitchLanguage id='manageAdmin.form.planceholder_lastName' /></span>
                <span className='err'>{!_.isEmpty(dataError.manageId) && <FontAwesomeIcon  icon={faCircleExclamation} />} {!_.isEmpty(dataError.manageId) ? language === languages.VI ? dataError.manageId.valueVi : dataError.manageId.valueEn : ''}</span>
            </div>


            <div className='form-input col l-6'>
                <label className='input-label'><SwitchLanguage id='manageAdmin.form.permission'/></label>
                <select id='input-select' type='text' className='input' value={permission ? permission : 'R2'} name='permission'
                    style={{backgroundColor: 'white'}}
                    onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)}                                          
                >
                <option value={permission}><SwitchLanguage id='manageAdmin.form.seller'/></option>
                
                </select>
                <span className='planceholder_input'><SwitchLanguage id='manageAdmin.form.planceholder_permission'/></span>
                <span className='err'>{!_.isEmpty(dataError.permission) && <FontAwesomeIcon  icon={faCircleExclamation} />} {!_.isEmpty(dataError.permission) ? language === languages.VI ? dataError.permission.valueVi : dataError.permission.valueEn : ''}</span>
            </div>

        </div>


        <div className='list-input'>

            <div className='form-input col l-6'>
                <label className='input-label'><SwitchLanguage id='manageAdmin.form.nameShop'/></label>
                <input  type='text' className='input' value={nameShop} name='nameShop'
                    onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)}
                    style={nameShop !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}                               
                />
                <span className='planceholder_input'><SwitchLanguage id='manageAdmin.form.planceholder_lastName' /></span>

                <span className='err'>{!_.isEmpty(dataError.nameShop) && <FontAwesomeIcon  icon={faCircleExclamation} />} {!_.isEmpty(dataError.nameShop) ? language === languages.VI ? dataError.nameShop.valueVi : dataError.nameShop.valueEn : ''}</span>
            </div>

            <div className='form-input col l-6'>
                <label className='input-label'><SwitchLanguage id='manageAdmin.form.addressShop'/></label>
                <input  type='text' className='input' value={addressShop} name='addressShop'
                    style={addressShop !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}
                    onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)}                                          
                />
                <span className='planceholder_input'><SwitchLanguage id='manageAdmin.form.planceholder_AddressDetails' /></span>
                <span className='err'>{!_.isEmpty(dataError.addressShop) && <FontAwesomeIcon  icon={faCircleExclamation} />} {!_.isEmpty(dataError.addressShop) ? language === languages.VI ? dataError.addressShop.valueVi : dataError.addressShop.valueEn : ''}</span>
            </div>

        </div>




        <div className='list-input'>

            <div className='form-input col l-6'>
                <label className='input-label'><SwitchLanguage id='manageAdmin.form.emailShop'/></label>
                <input  type='text' className='input' value={emailShop} name='emailShop'
                    onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)}   
                    style={emailShop !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}
                                                           
                />
                <span name='email' className='planceholder_input'><SwitchLanguage id='manageAdmin.form.planceholder_email' /></span>
                <span className='err'>{!_.isEmpty(dataError.emailShop) && <FontAwesomeIcon  icon={faCircleExclamation} />} {!_.isEmpty(dataError.emailShop) ? language === languages.VI ? dataError.emailShop.valueVi : dataError.emailShop.valueEn : ''}</span>
            </div>

            <div className='form-input col l-6'>
                <label className='input-label'><SwitchLanguage id='manageAdmin.form.phoneNumber'/></label>
                <input  type='text' className='input' value={phoneNumber} name='phoneNumber'
                    onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)}    
                    style={phoneNumber !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}

                />
                <span className='planceholder_input'><SwitchLanguage id='manageAdmin.form.planceholder_phone' /></span>
                <span className='err'>{!_.isEmpty(dataError.phoneNumber) && <FontAwesomeIcon  icon={faCircleExclamation} />} {!_.isEmpty(dataError.phoneNumber) ? language === languages.VI ? dataError.phoneNumber.valueVi : dataError.phoneNumber.valueEn : ''}</span>
            </div>

        </div>




        <div className='list-input'>

            <div className='form-input col l-6'>
                <label className='input-label'><SwitchLanguage id='manageAdmin.form.pay'/></label>
                <select id='input-select' type='text' className='input' value={pay} name='pay'
                    style={pay !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}
                    onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)}                                          
                >
                <option value='none'></option>
                {listPay && listPay.length > 0 && listPay.map(item => {
                    let value = language === languages.EN ? item.valueEn : item.valueVi;
                    return (<option  value={item.keyMap} key={item.id}>{value}</option>)
                })}
                </select>

                <span name='email' className='planceholder_input'><SwitchLanguage id='manageAdmin.form.payType' /></span>
                <span className='err'>{!_.isEmpty(dataError.pay) && <FontAwesomeIcon  icon={faCircleExclamation} />} {!_.isEmpty(dataError.pay) ? language === languages.VI ? dataError.pay.valueVi : dataError.pay.valueEn : ''}</span>
            </div>

            <div className='form-input col l-6'>
                <label className='input-label'><SwitchLanguage id='manageAdmin.form.province'/></label>
                <select id='input-select' type='text' className='input' name='province'
                    style={province !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}
                    value={province}                                          
                    onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)}                                             
                >
                <option  value='none' ></option>
                {listProvince && listProvince.length > 0 && listProvince.map(item => {
                    let value = language === languages.EN ? item.valueEn : item.valueVi;
                    return (<option  value={item.keyMap} key={item.id}>{value}</option>)
                })}
            </select>
                 <span className='planceholder_input'><SwitchLanguage id='manageAdmin.form.planceholder_Province' /></span>
                <span className='err'>{!_.isEmpty(dataError.province) && <FontAwesomeIcon  icon={faCircleExclamation} />} {!_.isEmpty(dataError.province) ? language === languages.VI ? dataError.province.valueVi : dataError.province.valueEn : ''}</span>
            </div>

        </div>




        <div className='list-input'>

            <div className='form-input col l-6' >
                <label className='input-label'><SwitchLanguage id='manageAdmin.form.avata'/></label>
                <input type='file' className='input' value={avata} name='avata'
                    onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name,e)}                                                                                                                         
                />
            <span className='err'>{!_.isEmpty(dataError.avata) && <FontAwesomeIcon  icon={faCircleExclamation} />} {!_.isEmpty(dataError.avata) ? language === languages.VI ? dataError.avata.valueVi : dataError.avata.valueEn : ''}</span>
            </div>


        </div>

        <div className='pewview-img l-3'>
            <div className='pewview-border-img' >
                <img className='avata-img' src={imgPreview} alt='' />
            </div>
        </div>



   


    
    
      
       
    
        <div className='col l-12'>
            <button className='sub-heading' onClick={(e) => this.handleSubmitFormData(e)}>
                <SwitchLanguage  id={'manageAdmin.form.btn'}/> 
            </button>
        </div>

    </div>


    <ListShops/>
       
    </>       
)}}


const mapStateToProps = state => {
    return {
        dataForm: state.admin.dataForm,
        language: state.app.language,
        allUser: state.admin.listUser.allUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDataAllCode: () => dispatch(actions.fetchAllDataAllCodeStart()),
        getAllUser: (type) => dispatch(actions.getAllUserStart(type)),
        getAllShop: (type) => dispatch(actions.getAllShopStart(type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageShop);
