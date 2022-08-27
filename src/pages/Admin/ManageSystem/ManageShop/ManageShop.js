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
import Select from 'react-select';
import Items from '../Items/Items';
import InputStyle from '../../../../components/InputStyle';

import '../CreateUser/CreateUser.scss'

class ManageShop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            imgPreview: '',
            isShowListsInput: false,
            listPay:[],
            listPermission: [],
            listProvince: [],
            listUser: [],
            listAllUser: [],
            typeInput: false,
            isEdit: false,
            actions: false,
            dataShop: {
                valueOptions: null,
                manageId: '',
                permission: '',
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


    


    // // DidMound
    componentDidMount = async ()=>  {
        await this.props.fetchAllDataAllCode()
        await this.props.getAllUser()
        
        let {allUserNotInR2, dataForm,allUser} = this.props
        
        this.setState({
            listPay:[...dataForm.listPay],
            listPermission: [...dataForm.listPermission],
            listProvince: [...dataForm.listProvince],
            listUser: this.handlConvertObject([...allUserNotInR2]),
            listAllUser: this.handlConvertObject([...allUser])
        })
    }


    // Convent về options của input select
    handlConvertObject = (listObject,actions) => {
        let {language} = this.props
        let newObject = []

        if(actions === 'LIST_SHOP'){
            listObject.map(item => {
                newObject.value = item.id
                newObject.label =  item.nameShop;
                newObject.push({value: newObject.value ,label: newObject.label})
            })
        }

        if(actions === 'LIST_CATEGORY'){

            
            listObject.map(item => {
                newObject.value = item.code
                newObject.label = language === languages.EN ?  item.valueEn : item.valueVi
                newObject.push({value: newObject.value ,label: newObject.label})
            })
           
        }
        
        if(actions === undefined){
            listObject.map(item => {
                newObject.value = item.id
                newObject.label = language === languages.EN ? `${item.lastName} ${item.firstName}` : `${item.firstName} ${item.lastName}`
                newObject.push({value:newObject.value ,label: newObject.label})
            })
        }

        return ([...newObject])
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
         let {allUserNotInR2, dataForm,allUser} = this.props

        if(prevProps.language !== this.props.language){
            this.setState({
                listAllUser: this.handlConvertObject([...allUser]),
                listUser: this.handlConvertObject([...allUserNotInR2]),
            })
        }

        if(prevProps.dataForm !== this.props.dataForm){
            this.setState({
                listPay:[...dataForm.listPay],
                listPermission: [...dataForm.listPermission],
                listProvince: [...dataForm.listProvince],
            })
        }

        if(prevProps.allUserNotInR2 !== this.props.allUserNotInR2){
            let data = this.props.allUserNotInR2
            this.setState({
                listUser: this.handlConvertObject([...data])
            })
        }
    }


    // Actions từ listShop
    handleActionsListShop = async(actions, data) => {
        if(actions === 'Re-Load'){
            await this.props.getAllUser()
            this.handleDeleteValueForm()
        }

        if(actions === 'Edit-Shop'){
            let {dataForm,allUser,language} = this.props
            let valueOptions = this.handlGetOneShopSelect(data)

            let stateCopy = this.state.dataError
            for(let key in stateCopy){
                stateCopy[key] = ''
            }
    
    
            this.setState({
                listPermission: [...dataForm.listPermission],
                isEdit: true,
                isShowListsInput: true,
                dataError: {...stateCopy},
                imgPreview: `${process.env.REACT_APP_BACKEND_IMAGES_AVT_SHOP}/${data.avata}`,
                listUser: this.handlConvertObject([...allUser]),
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
        let stateCopy = this.state.dataShop
        let stateCopyErr = this.state.dataError

        for(let key in stateCopyErr){
            stateCopyErr[key] = {}
            stateCopy[key] = ''
        }
        this.setState({    
            isEdit: false,
            dataError: {...stateCopyErr},
            dataShop: {...stateCopy},
            isShowListsInput: !this.state.isShowListsInput
        })
    }


    // On Change
    heandleChangeInput = async(value, name,e) => {
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


    // Xl delete value form
    handleDeleteValueForm = () => {
        let stateCopy = this.state.dataShop
        for(let key in stateCopy){
            stateCopy[key] = ''
        }
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
        let {permission, manageId} = this.state.dataShop

 
        if(isEdit === false) {

            let shopData = JSON.stringify({...this.state.dataShop, permission: permission !== undefined ? permission.trim() !== '' ? permission : 'R2' : 'R2'})

            let {file} = this.state.File

            console.log(file)


            let data = new FormData()
            data.append("name", 'file')
            data.append("file", file )
            data.append("name", 'shopData')
            data.append("shopData", shopData ? shopData : '')
            
            
            let res = await adminService.createNewShop(data)
            
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
                await this.props.getAllUser()
                await this.props.getAllShop()

                this.handleDeleteValueForm()
            }

        }else{
            let {file} = this.state.File
            
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
        this.setState({
            dataShop: {
                ...dataShop,
                valueOptions: valueOptions,
                manageId: valueOptions.value
            },
            dataError: {
                ...dataError,
                manageId: {}
            }

        })
    }


    // SustomStyle select react
    customStyles = {
        menu: (provided, state) => ({
            ...provided,
            // zIndex: 9999999,
        }),
    }

   
    
    render() {
    let {permission,nameShop,addressShop,emailShop, phoneNumber,pay,province,avata,valueOptions} = this.state.dataShop
    let {isShowListsInput,listPay,listProvince,imgPreview,listUser,dataError,isEdit,listPermission,listAllUser} = this.state
    let {language} = this.props



    return (
    <>
        <div className='l-12'>
            <p className='heading-manage-user'><SwitchLanguage id='manageAdmin.manageShop' /></p> 
        </div> 

        <div className='col l-3' onClick={() => this.handleShowHideInputsUser()}>
            <span className='sub-heading' >
                <SwitchLanguage id='manageAdmin.createShop'/>
                <FontAwesomeIcon className='icon-user' icon={faStore} />
            </span>
        </div>

        <div style={{height: isShowListsInput ? '1160'+'px' : '0'+'px'}}  className='all-input l-12'>  

        <div className='list-input'>
            <div className='form-input col l-6'>
                <label className='input-label'><SwitchLanguage id='manageAdmin.form.manageId'/></label>
                <Select
                    zIndex={100000}
                    value={valueOptions}
                    onChange={this.handlChangeSlelect}
                    options={listUser}
                    styles={this.customStyles}
                />
                <span style={_.isEmpty(dataError.manageId) ? {height: '0px'} : {height: 'auto'}} className='err'>
                    {!_.isEmpty(dataError.manageId) && <FontAwesomeIcon  icon={faCircleExclamation} />} 
                    {!_.isEmpty(dataError.manageId) ? language === languages.VI ? dataError.manageId.valueVi : dataError.manageId.valueEn : ''}
                </span>
            </div>

            <div className='form-input col l-6'>
                <label className='input-label'><SwitchLanguage id='manageAdmin.form.permission'/></label>
                <select id='input-select' type='text' className='input' value={permission} name='permission'
                    style={{backgroundColor: 'white'}}
                    onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)}                                          
                >
                {isEdit && <option value='none'></option>}
                {isEdit ?  listPermission && listPermission.length > 0 && listPermission.map(item => {
                    let value = language === languages.EN ? item.valueEn : item.valueVi;
                    return (<option  value={item.keyMap} key={item.id}>{value}</option>)
                })
                : <option value={permission} > <SwitchLanguage id='manageAdmin.form.seller'/></option>
                } 
                
                
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
            {isEdit ? 
                <button className='sub-heading edit' onClick={(e) => this.handleSubmitFormData(e)}>
                    {language === languages.EN ? 'Save Change':'Lưu Thay Đổi'} 
                </button>
                :
                <button className='sub-heading' onClick={(e) => this.handleSubmitFormData(e)}>
                    <SwitchLanguage  id={'manageAdmin.form.btn'}/> 
                </button>
            }
        </div>
    </div>
    <ListShops  handleActionsListShop={this.handleActionsListShop}/>
    
    <InputStyle>
        <Items allUser={this.props.allUser} allUserEdit={listAllUser} handlConvertObject={this.handlConvertObject}/>
    </InputStyle>
    </>       
)}}
 

const mapStateToProps = state => {
    return {
        dataForm: state.admin.dataForm,
        language: state.app.language,
        allUserNotInR2: state.admin.listUser.allUserNotSeller,
        allUser: state.admin.listUser.allUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDataAllCode: () => dispatch(actions.fetchAllDataAllCodeStart()),
        getAllUser: () => dispatch(actions.getAllUserStart()),
        getAllShop: () => dispatch(actions.getAllShopStart())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageShop);




















