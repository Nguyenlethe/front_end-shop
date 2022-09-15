import React, { Component } from 'react';
import { connect } from "react-redux";
import SwitchLanguage from '../../../../SwitchLanguage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStore,faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import * as actions from '../../../../store/action';
import {languages } from '../../../../utils/constant'
import _ from 'lodash'
import adminService from '../../../../services/adminService';
import { toast } from 'react-toastify';
import ListShops from '../ListShop/ListShops'
import Select from 'react-select';
import Items from '../Items/Items';
import InputStyle from '../../../../components/InputStyle';
import generalHandling from '../../../../utils/generalHandling'
import Button from '../../../../components/Button/Button';
import '../CreateUser/CreateUser.scss'

class ManageShop extends Component {
    constructor(props) {
        super(props);
        this.state = {

            optionsPermission: null,
            optionsProvince: null,
            optionsPay: null,

            imgPreview: '',
            selectedOption: null,
            typeInput: false,
            isEdit: false,
            actions: false,
            isShowListsInput: false,

            listPay:[],
            listPermission: [],
            listProvince: [],
            listUser: [],
            listAllUser: [],


            dataShop: {
                valueOptions: null,
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
                valueOptions: null,
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
        this.heandleDataForm()
    }

    // Get One Shop Select
    handlGetOneShopSelect = (object) => {
        let {language} = this.props
        if(typeof object === 'object'){
            if(object.FullName){
                return {
                    value: object.manageId,
                    label: language === languages.EN ? `${object.FullName.lastName} ${object.FullName.firstName}` : `${object.FullName.firstName} ${object.FullName.lastName}`
                }
            }
        }
    }

    // DidUpdate
    componentDidUpdate= async(prevProps, prevState)=> {

        // Khi Language change
        if(prevProps.language !== this.props.language){
            this.heandleDataForm('CHANGE_LANGUAGE')
        }

        // Data form Change
        if(prevProps.dataForm !== this.props.dataForm){
            this.heandleDataForm()
        }

        // Khi allUser Not Seller change
        if(prevProps.allUserNotInR2 !== this.props.allUserNotInR2){
            this.heandleDataForm()
        }
    }

    // XL Gán Gtri Select
    heandleDataForm = (action)  => {

        let {allUserNotInR2, dataForm,allUser} = this.props
        let listPermission = generalHandling.handlConvertObject(dataForm.listPermission,'DATA_FORM',this.props.language)
        let listPay = generalHandling.handlConvertObject(dataForm.listPay,'DATA_FORM',this.props.language)
        let listProvince = generalHandling.handlConvertObject(dataForm.listProvince,'DATA_FORM',this.props.language)
        let dataListAllUser = generalHandling.handlConvertObject([...allUser],this.props.language)
        let dataListUser = generalHandling.handlConvertObject([...allUserNotInR2],this.props.language)

        // Nếu chuyển dổi ngôn ngữ
        if(action === 'CHANGE_LANGUAGE'){
            let {dataShop} = this.state
           
            // Id user
            if(dataShop.manageId !== '' && dataListUser.length > 0){
                let newManageId = dataListUser.filter(item => {
                    if(item.value === dataShop.manageId) return item
                })
                this.setState({dataShop : {...dataShop,valueOptions: newManageId[0]}})
            }

            // Pay
            if(dataShop.pay !== '' && listPay.length > 0){
                let newPay = listPay.filter(item => {
                    if(item.value === dataShop.pay) return item
                })
                this.setState({optionsPay: newPay[0]})
            }

            // Province
            if(dataShop.province !== '' && listProvince.length > 0){ 
                let newProvince = listProvince.filter(item => {
                    if(item.value === dataShop.province) return item
                })
                this.setState({optionsProvince: newProvince[0]})
            }
        }

        this.setState({
            listPay:listPay,
            listPermission: listPermission,
            listProvince: listProvince,
            listAllUser: dataListAllUser,
            listUser: dataListUser
        })
    }

    // Actions từ listShop (Edit + re-load)
    handleActionsListShop = async(actions, data) => {
        if(actions === 'Re-Load'){
            await this.props.getAllUser()
            this.handleDeleteValueForm()
        }

        if(actions === 'Edit-Shop'){
            let {dataForm,allUser} = this.props
            let valueOptions = this.handlGetOneShopSelect(data)
            let stateCopy = generalHandling.resetDefaultState(this.state.dataError)
           
            // Get new data 
            let listPermission = generalHandling.handlConvertObject(dataForm.listPermission,'DATA_FORM',this.props.language)
            let dataListAllUser = generalHandling.handlConvertObject([...allUser],this.props.language)
          
            // Get Seller
            let newPermission = listPermission.filter(item => {
                if(item.value === 'R2') return item
            })

            // Lọc gán gtri cho options
            let listPay = generalHandling.handlConvertObject(dataForm.listPay,'DATA_FORM',this.props.language)
            let listProvince = generalHandling.handlConvertObject(dataForm.listProvince,'DATA_FORM',this.props.language)

            // Pay
            if(data.pay !== '' && listPay.length > 0){
                var newPay = listPay.filter(item => {
                    if(item.value === data.pay) return item
                })
            }

            // Province
            if(data.province !== '' && listProvince.length > 0){ 
                var newProvince = listProvince.filter(item => {
                    if(item.value === data.province) return item
                })
            }
            
            // Set state
            this.setState({
                optionsProvince: newProvince[0],
                optionsPay: newPay[0],
                optionsPermission: newPermission[0],
                listPermission: listPermission,
                isEdit: true,
                isShowListsInput: true,
                dataError: {...stateCopy},
                imgPreview: `${process.env.REACT_APP_BACKEND_IMAGES_AVT_SHOP}/${data.avata}`,
                listUser: dataListAllUser,
                dataShop: {
                    ...this.state.dataShop,
                    valueOptions: valueOptions,
                    permission: data.permission ? data.permission : '',
                    manageId: data.manageId ? data.manageId : '',
                    nameShop: data.nameShop ? data.nameShop : '',
                    addressShop: data.addressShop ? data.addressShop : '',
                    emailShop: data.emailShop ? data.emailShop : '',
                    phoneNumber: data.phoneNumber ? data.phoneNumber : '',
                    pay: data.pay ? data.pay : '',
                    province: data.province ? data.province : '',
                },
            })
        }
    }

    // Show Hide list input
    handleShowHideInputsUser = async ()=>{
        await this.props.getAllUser()
        let stateCopy = generalHandling.resetDefaultState(this.state.dataShop)
        let stateCopyErr = generalHandling.resetDefaultState(this.state.dataError)

        // Set state
        this.setState({    
            isEdit: false,
            optionsPermission: null,
            optionsProvince: null,
            optionsPay: null,
            imgPreview: '',
            selectedOption: null,
            dataError: stateCopyErr,
            dataShop: stateCopy,
            isShowListsInput: !this.state.isShowListsInput
        })
    }

    // On Change
    heandleChangeInput = async(value, name,e) => {
        let stateCopy = this.state.dataShop
        let stateCopyErr = this.state.dataError

        // Change avata
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

        // Set data
        this.setState({
            dataError: {...stateCopyErr},
            dataShop: {...stateCopy}
        })
    }

    // Xl delete value form
    handleDeleteValueForm = () => {
        let stateCopy = this.state.dataShop
        for(let key in stateCopy){
            stateCopy[key] = ''
        }

        // Set state
        this.setState({
            imgPreview: '',
            dataShop: {...stateCopy},
            isShowListsInput: false,
            
        })
        toast.success(<SwitchLanguage id='manageAdmin.toast.success_change'/>)
    }
    
    // Xl submit form
    handleSubmitFormData = async (e) => {
        e.preventDefault() 

        let {isEdit,dataShop } = this.state
        let {permission} = this.state.dataShop
        let shopData = JSON.stringify({...this.state.dataShop, permission: permission !== undefined ? permission.trim() !== '' ? permission : 'R2' : 'R2'})

        // Không edit
        if(isEdit === false) {
            let {file} = this.state.File
            let data = new FormData()
            data.append("name", 'file')
            data.append("file", file )
            data.append("name", 'shopData')
            data.append("shopData", shopData ? shopData : '')
            
            // Post Data
            let res = await adminService.createNewShop(data)
            

            // Có lỗi
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

            // Thành Công
            if(res && res.data.errCode === 0){
                await this.props.getAllUser()
                await this.props.getAllShop()

                this.handleDeleteValueForm()
            }
        }else{

            //  Nếu edit
            let {file} = this.state.File

            // Edit file
            if(file){
                let infoShop = {}
                for(let key in dataShop){
                    if(dataShop[key] !== ''){
                        infoShop[key] = dataShop[key]
                    }
                }

                let shopData = JSON.stringify({...this.state.dataShop , type: 'EditIMG'})
                let {file} = this.state.File
                let data = new FormData()
                data.append("name", 'file')
                data.append("file", file )
                data.append("name", 'shopData')
                data.append("shopData", shopData ? shopData : '')

                let res = await adminService.editInfoShop(data)
                if(res && res.data.errCode === 0){
                    await this.props.getAllUser()
                    await this.props.getAllShop()
                    this.handleDeleteValueForm()
                }else{
                    console.log('Error :',res.data.message)
                    toast.error(<SwitchLanguage id='manageAdmin.toast.warn'/>)
                }
            }

            // Không edit file
            if(!file){
                let infoShop = {}
                for(let key in dataShop){
                    if(dataShop[key] !== ''){
                        infoShop[key] = dataShop[key]
                    }
                }

                let data = this.state.dataShop
                let res = await adminService.editInfoShopNotIMG(data)
                if(res && res.data.errCode === 0){
                    await this.props.getAllUser()
                    await this.props.getAllShop()
                    this.handleDeleteValueForm()
                }else{
                    console.log('Error :',res.data.message)
                    toast.error(<SwitchLanguage id='manageAdmin.toast.warn'/>)
                }
            }
        }
    }

    // Xl change input select
    handlChangeSlelect = (valueOptions, name) => {
        let {dataShop,dataError} = this.state

        // Set state 
        if(name.name === 'user') {
            this.setState({
                dataShop: {
                    ...dataShop,
                    valueOptions: valueOptions,
                    manageId: valueOptions.value,
                },
                dataError: {
                    ...dataError,
                    manageId: {}
                }
            })
        }

        // Set state 
        if(name.name === 'permission') {
            this.setState({
                optionsPermission: valueOptions,
                dataShop: {
                    ...dataShop,
                    permission: valueOptions.value,
                },
                dataError: {
                    ...dataError,
                    permission: {}
                }
            })
        }

        // Set state pay
        if(name.name === 'pay') {
            this.setState({
                optionsPay: valueOptions,
                dataShop: {
                    ...dataShop,
                    pay: valueOptions.value,
                },
                dataError: {
                    ...dataError,
                    pay: {}
                }
            })
        }

        // Set state pay
        if(name.name === 'province') {
            this.setState({
                optionsProvince: valueOptions,
                dataShop: {
                    ...dataShop,
                    province: valueOptions.value,
                },
                dataError: {
                    ...dataError,
                    province: {}
                }
            })
        }
    }

    // SustomStyle select react
    customStyles = {
        menu: (provided, state) => ({
            ...provided,
            zIndex: 9999999,
        }),
    }

    
    render() {
    let {nameShop,addressShop,emailShop, phoneNumber,avata,valueOptions} = this.state.dataShop
    let {isShowListsInput,listPay,listProvince,imgPreview,listUser,dataError,isEdit,listPermission,listAllUser,optionsPermission,optionsPay,optionsProvince} = this.state
    let {language} = this.props

    return (
    <>
        <div className='l-12'>
            <p className='heading-manage-user'><SwitchLanguage id='manageAdmin.manageShop' /></p> 
        </div> 

        <div className='col l-3 btn-craete-user'  onClick={() => this.handleShowHideInputsUser()}>
            {!isShowListsInput &&
                <Button type='submit-form-data' content={  <SwitchLanguage id='manageAdmin.createShop'/>}  icon={<FontAwesomeIcon className='icon-user' icon={faStore} />}
                    color='var(--color-BTN-manage)' width='77%' margin='4px' border='6px'
                />
            }
            {isShowListsInput &&
                <Button type='submit-form-data' content={<SwitchLanguage id='manageAdmin.form.hide'/> }  icon={<FontAwesomeIcon className='icon-user' icon={faStore} />}
                    color='var(--color-BTN-manage)' width='60%' margin='4px' border='6px'
                /> 
            } 
        </div>

        <div style={{height: isShowListsInput ? '866'+'px' : '0'+'px'}}  className='all-input l-12'>  

            <div className='list-input'>
                <div className='form-input col l-6'>
                    <label className='input-label'><SwitchLanguage id='manageAdmin.form.manageId'/></label>
                    <Select
                        value={valueOptions}
                        onChange={this.handlChangeSlelect}
                        options={listUser}
                        styles={this.customStyles}
                        name='user'
                    />
                    <span style={_.isEmpty(dataError.manageId) ? {height: '0px'} : {height: 'auto'}} className='err'>
                        {!_.isEmpty(dataError.manageId) && <FontAwesomeIcon  icon={faCircleExclamation} />} 
                        {!_.isEmpty(dataError.manageId) ? language === languages.VI ? dataError.manageId.valueVi : dataError.manageId.valueEn : ''}
                    </span>
                </div>


                {isEdit && 
                <div className='form-input col l-6'>
                    <label className='input-label'><SwitchLanguage id='manageAdmin.form.permission'/></label>
                    <Select
                        value={optionsPermission}
                        onChange={this.handlChangeSlelect}
                        options={listPermission}
                        name='permission'
                        placeholder={<SwitchLanguage id='manageAdmin.form.planceholder_permission' />}
                    />
                    <span className='err'>{!_.isEmpty(dataError.permission) && <FontAwesomeIcon  icon={faCircleExclamation} />} {!_.isEmpty(dataError.permission) ? language === languages.VI ? dataError.permission.valueVi : dataError.permission.valueEn : ''}</span>
                </div>
                }

                <div className='form-input col l-6'>
                    <label className='input-label'><SwitchLanguage id='manageAdmin.form.nameShop'/></label>
                    <input  type='text' className='input' value={nameShop} name='nameShop'
                        onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)}
                        style={nameShop !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}                               
                    />
                    <span className='planceholder_input'><SwitchLanguage id='manageAdmin.form.planceholder_lastName' /></span>
                    <span className='err'>{!_.isEmpty(dataError.nameShop) && <FontAwesomeIcon  icon={faCircleExclamation} />} {!_.isEmpty(dataError.nameShop) ? language === languages.VI ? dataError.nameShop.valueVi : dataError.nameShop.valueEn : ''}</span>
                </div>

                <div className={isEdit ? 'form-input margin-top col l-6 ' : 'form-input margin-top col l-12 '}>
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
                    <Select
                        value={optionsPay}
                        onChange={this.handlChangeSlelect}
                        options={listPay}
                        name='pay'
                        styles={this.customStyles}
                        placeholder={<SwitchLanguage id='manageAdmin.form.pay' />}
                    />
                    <span className='err'>{!_.isEmpty(dataError.pay) && <FontAwesomeIcon  icon={faCircleExclamation} />} {!_.isEmpty(dataError.pay) ? language === languages.VI ? dataError.pay.valueVi : dataError.pay.valueEn : ''}</span>
                </div>


                <div className='form-input col l-6'>
                    <label className='input-label'><SwitchLanguage id='manageAdmin.form.province'/></label>
                    <Select
                        value={optionsProvince}
                        onChange={this.handlChangeSlelect}
                        options={listProvince}
                        name='province'
                        styles={this.customStyles}
                        placeholder={<SwitchLanguage id='manageAdmin.form.planceholder_Province' />}
                    />
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
    
            {isEdit ? 
                <div className='col l-2'  onClick={(e) => this.handleSubmitFormData(e)}>
                    <Button type='edit-form-data' content={language === languages.EN ? 'Save Change':'Lưu Thay Đổi'}
                        width='86%' margin='4px' border='6px'
                    /> 
                </div>
                :
                <div className='col l-2'  onClick={(e) => this.handleSubmitFormData(e)}>
                    <Button type='submit-form-data' content={<SwitchLanguage  id={'manageAdmin.form.btn'}/>}
                        color='var(--color-BTN-manage)' width='86%' margin='4px' border='6px'
                    /> 
                </div>
            }
        </div>

        <ListShops  handleActionsListShop={this.handleActionsListShop}/>
        
        <InputStyle>
            <Items allUser={this.props.allUser} allUserEdit={listAllUser}/>
        </InputStyle>

    </>       
)}}
 

const mapStateToProps = state => {
    return {
        dataForm: state.admin.dataForm,
        language: state.app.language,
        allUserNotInR2: state.admin.listUser.allUserNotSeller,
        allUser: state.admin.listUser.allUser,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllUser: () => dispatch(actions.getAllUserStart()),
        getAllShop: () => dispatch(actions.getAllShopStart())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageShop);




















