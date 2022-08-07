import React, { Component } from 'react';
import { connect } from "react-redux";
import SwitchLanguage from '../../../SwitchLanguage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserPlus,faEye,faEyeSlash,faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import * as actions from '../../../store/action';
import {languages } from '../../../utils/constant'
import {default as adminService} from '../../../services/adminService'
import _ from 'lodash'
import { toast } from 'react-toastify';


import './ManageUser.scss';
class ManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowListsInput: false,
            isShowPass: true,
            listGender: [],
            listProvince: [],
            listPermission: [],
            listDistrict: [],
            listDataWards: [],
            imgPreview: '',
            File: {
                name: '',
                file: '',
            },
            users: {
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                gender: '',
                permission: '',
                phoneNumber: '',
                avata: '',
                avataLink: '',
                province: '',
                district: '',
                wards: '',
                addressDetails: '',
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
        }
    }

    // https://nguyenlethe.github.io/images/image/avt_female.jpg
    // https://nguyenlethe.github.io/images/image/avt_male.jpeg

    componentDidMount = async ()=>  {
        await this.props.fetchAllDataAllCode()
        this.heandleDataForm()
    }


    componentDidUpdate= async(prevProps, prevState)=> {
        if(prevProps.language !== this.props.language){

        }

        if(prevProps.dataForm !== this.props.dataForm){
            this.heandleDataForm()
        }

        if(prevProps.dataDistrict !== this.props.dataDistrict){
            let {dataDistrict} = this.props
            this.setState({
                listDistrict: dataDistrict ? dataDistrict : []
            })
        }

        if(prevProps.dataWards !== this.props.dataWards){
            let {dataWards} = this.props
            this.setState({
                listDataWards: dataWards ? dataWards : []
            })
        }

    }


    // XL Gán Gtri (Gender, Province, Permission)
    heandleDataForm = ()  => {
        let {dataForm} = this.props
        this.setState({
            listGender: dataForm.listGender,
            listProvince: dataForm.listProvince,
            listPermission: dataForm.listPermission,
        })
    }

    // Xl Khi change Input
    heandleChangeInput = (value, name,e) => {
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
        if(name === 'province'){
            this.props.fetchAllDataProvince(value)
        }
        if(name === 'district'){
            this.props.fetchAllDataWards(value)
        }

        let stateCopy = this.state.users
        let stateCopyErr = this.state.dataError


        for(let key in stateCopy){
            if(key === name){
                stateCopy[name] = value
                stateCopyErr[name] = {}
            }
        }
        this.setState({
            dataError: {...stateCopyErr},
            users: {...stateCopy}
        })
    }
    
    // Xl ẩn hiện form
    handleShowHideInputsUser = () => {
        setTimeout(()=> {
            this.setState({
                ...this.state,
                isShowListsInput: !this.state.isShowListsInput
            })
        },100)
    }

    // Xl submit form
    handleSubmitFormData = async (e) => {
        e.preventDefault() 
        let dataUser = JSON.stringify(this.state.users)
        let {file} = this.state.File
        let data = new FormData()
        data.append("name", 'file')
        data.append("file", file )
        data.append("name", 'dataUser')
        data.append("dataUser", dataUser ? dataUser : '')
        let res = await adminService.createNewUser(data)
        if(res.data.errCode !== 0){
            toast.error(<SwitchLanguage id='manageAdmin.toast.warn'/>)
            let stateCopy = this.state.dataError
            for(let key in res.data.data){
                stateCopy[key] = res.data.data[key]
            }
            this.setState({
                dataError: {...stateCopy}
            })
        }else{
            toast.success(<SwitchLanguage id='manageAdmin.toast.success'/>)
            this.setState({
                imgPreview: '',
                users: {
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    gender: '',
                    permission: '',
                    phoneNumber: '',
                    avata: '',
                    avataLink: '',
                    province: '',
                    district: '',
                    wards: '',
                    addressDetails: '',
                }
            })
        }
    }

render() {

let {language,dataDistrict,dataUser} = this.props
let {listGender,listProvince,listPermission,listDataWards,isShowListsInput,imgPreview,isShowPass,dataError} = this.state
let {email,password,firstName,lastName,gender, permission, phoneNumber, avata,avataLink, province,district,wards,addressDetails} = this.state.users

console.log()

return (


<div className='grid'>
<div className='grid wide'>
<div className='row'>

    <div className='col l-12'>
        <p className='heading-manage-user'><SwitchLanguage id='manageAdmin.manageUsers'/></p>
    </div>     

    <div className='col l-3'>
        <span className='sub-heading' onClick={() => this.handleShowHideInputsUser()}>
            <SwitchLanguage id='manageAdmin.createUser'/>
            <FontAwesomeIcon className='icon-user' icon={faUserPlus} />
        </span>
    </div>
                                  
{isShowListsInput && <>
    


    <div className='list-input'>
        <div className='form-input col l-6'>
            <label className='input-label'><SwitchLanguage id='manageAdmin.form.email'/></label>
            <input type='text' className='input' name='email'
                style={email !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}} 
                value={email} 
                onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)}                                          
            />
            <span name='email' className='planceholder_input'><SwitchLanguage id='manageAdmin.form.planceholder_email' /></span>
            <span className='err'>{!_.isEmpty(dataError.email) && <FontAwesomeIcon  icon={faCircleExclamation} />} {!_.isEmpty(dataError.email) ? language === languages.VI ? dataError.email.valueVi : dataError.email.valueEn : ''}</span>
        </div>

        <div className='form-input password col l-6'>
            <label className='input-label'><SwitchLanguage id='manageAdmin.form.password'/></label>
            <input type={isShowPass ? 'password' : 'text'} className='input' name='password'
                style={password !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}
                value={password}
                onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)}         
            />
            <p className='eye-password' onClick={() => this.setState({isShowPass: !this.state.isShowPass})}>
                {isShowPass === false ? <FontAwesomeIcon  icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
            </p>
            <span className='planceholder_input'><SwitchLanguage id='manageAdmin.form.planceholder_password' /></span>
            <span className='err'>{!_.isEmpty(dataError.password) && <FontAwesomeIcon  icon={faCircleExclamation} />} {!_.isEmpty(dataError.password) ? language === languages.VI ? dataError.password.valueVi : dataError.password.valueEn : ''}</span>
        </div>
    </div>


    <div className='list-input'>
        <div className='form-input col l-6'>
            <label className='input-label'><SwitchLanguage id='manageAdmin.form.firstName'/></label>
            <input type='text' className='input' name='firstName'
                style={firstName !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}
                value={firstName}
                onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)}                                                                                
            />
            <span className='planceholder_input'><SwitchLanguage id='manageAdmin.form.planceholder_firstName' /></span>
            <span className='err'>{!_.isEmpty(dataError.firstName) && <FontAwesomeIcon  icon={faCircleExclamation} />} {!_.isEmpty(dataError.firstName) ? language === languages.VI ? dataError.firstName.valueVi : dataError.firstName.valueEn : ''}</span>
        </div>

        <div className='form-input col l-6'>
            <label className='input-label'><SwitchLanguage id='manageAdmin.form.lastName'/></label>
            <input type='text' className='input' name='lastName'
                style={lastName !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}
                value={lastName}
                onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)}                                         
            />
            <span className='planceholder_input'><SwitchLanguage id='manageAdmin.form.planceholder_lastName' /></span>
            <span className='err'>{!_.isEmpty(dataError.lastName) && <FontAwesomeIcon  icon={faCircleExclamation} />} {!_.isEmpty(dataError.lastName) ? language === languages.VI ? dataError.lastName.valueVi : dataError.lastName.valueEn : ''}</span>
        </div>
    </div>

    <div className='list-input'>
        <div className='form-input col l-6'>
            <label className='input-label'><SwitchLanguage id='manageAdmin.form.gender'/></label>
            <select id='input-select' className='input' name='gender'
                style={gender !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}
                value={gender}
                onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)}                                            
            >
                <option  value='none' ></option>
                {listGender && listGender.length > 0 && listGender.map(item => {
                    let value = language === languages.EN ? item.valueEn : item.valueVi;
                    return (<option key={item.id} value={item.keyMap}>{value}</option>)
                })}

            </select>
            <span className='planceholder_input'><SwitchLanguage id='manageAdmin.form.planceholder_gender' /></span>
            <span className='err'>{!_.isEmpty(dataError.gender) && <FontAwesomeIcon  icon={faCircleExclamation} />} {!_.isEmpty(dataError.gender) ? language === languages.VI ? dataError.gender.valueVi : dataError.gender.valueEn : ''}</span>
        </div>

        <div className='form-input col l-6'>
            <label className='input-label'><SwitchLanguage id='manageAdmin.form.permission'/></label>
            <select id='input-select' className='input' name='permission'
                style={permission !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}
                value={permission}
                onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)}                                                                                    
            >
                <option value='none'></option>
                {listPermission && listPermission.length > 0 && listPermission.map(item => {
                    let value = language === languages.EN ? item.valueEn : item.valueVi;
                    return (<option  value={item.keyMap} key={item.id}>{value}</option>)
                })}
            </select>
            <span className='planceholder_input'><SwitchLanguage id='manageAdmin.form.planceholder_permission' /></span>
            <span className='err'>{!_.isEmpty(dataError.permission) && <FontAwesomeIcon  icon={faCircleExclamation} />} {!_.isEmpty(dataError.permission) ? language === languages.VI ? dataError.permission.valueVi : dataError.permission.valueEn : ''}</span>
        </div>
    </div>


    <div className='list-input'>
        <div className='form-input col l-6'>
            <label className='input-label'><SwitchLanguage id='manageAdmin.form.avataLink'/></label>
            <input type='text' className='input' name='avataLink'
                style={avataLink !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}
                value={avataLink}
                onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)}                                         
            />
            <span className='planceholder_input'><SwitchLanguage id='manageAdmin.form.planceholder_avataLink' /></span>
            <span className='err'>{!_.isEmpty(dataError.avataLink) && <FontAwesomeIcon  icon={faCircleExclamation} />} {!_.isEmpty(dataError.avataLink) ? language === languages.VI ? dataError.avataLink.valueVi : dataError.avataLink.valueEn : ''}</span>
        </div>


        <div className='form-input col l-6'>
            <label className='input-label'><SwitchLanguage id='manageAdmin.form.Province'/></label>
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
        <div className='form-input col l-6'>
            <label className='input-label'><SwitchLanguage id='manageAdmin.form.district'/></label>
            <select id='input-select' type='text' className='input' name='district'
                style={district !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}
                value={district}
                onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)}                                            
            >
                <option  value='none' ></option>
                {dataDistrict && dataDistrict.length > 0 && dataDistrict.map(item => {
                    let value = language === languages.EN ? item.valueEn : item.valueVi;
                    return (<option  value={item.keyMap} key={item.id}>{value}</option>)
                })}
            </select>
            <span className='planceholder_input'><SwitchLanguage id='manageAdmin.form.planceholder_district' /></span>
            <span className='err'>{!_.isEmpty(dataError.district) && <FontAwesomeIcon  icon={faCircleExclamation} />} {!_.isEmpty(dataError.district) ? language === languages.VI ? dataError.district.valueVi : dataError.district.valueEn : ''}</span>
        </div>


        <div className='form-input col l-6'>
            <label className='input-label'><SwitchLanguage id='manageAdmin.form.wards'/></label>
            {listDataWards && listDataWards.length > 0 ?
            <select id='input-select' className='input' name='wards'
                style={wards !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}
                value={wards}
                onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)}                                           
            >
            <option  value='none' className='input' name='wards'></option>
                {listDataWards && listDataWards.length > 0 && listDataWards.map(item => {
                    let value = language === languages.EN ? item.valueEn : item.valueVi;
                    return (<option  value={item.keyMap} key={item.id}>{value}</option>)
                })}
            </select> :
                <input type="text" className='input' name='wards' 
                style={wards !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}
                value={wards}
                onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)}   
                />
            } 
            <span className='planceholder_input'><SwitchLanguage id='manageAdmin.form.planceholder_wards' /></span>
            <span className='err'>{!_.isEmpty(dataError.wards) && <FontAwesomeIcon  icon={faCircleExclamation} />} {!_.isEmpty(dataError.wards) ? language === languages.VI ? dataError.wards.valueVi : dataError.wards.valueEn : ''}</span>
        </div>
    </div>


    <div className='list-input'>
        <div className='form-input col l-12'>
            <label className='input-label'><SwitchLanguage id='manageAdmin.form.AddressDetails'/></label>
            <input type='text' className='input' name='addressDetails'
                style={addressDetails !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}
                value={addressDetails}
                onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)}                                          
            />
            <span className='planceholder_input'><SwitchLanguage id='manageAdmin.form.planceholder_AddressDetails' /></span>
            <span className='err'>{!_.isEmpty(dataError.addressDetails) && <FontAwesomeIcon  icon={faCircleExclamation} />} {!_.isEmpty(dataError.addressDetails) ? language === languages.VI ? dataError.addressDetails.valueVi : dataError.addressDetails.valueEn : ''}</span>
        </div>
    </div>


    <div className='list-input'>
        <div className='form-input col l-6'>
            <label className='input-label'><SwitchLanguage id='manageAdmin.form.phone'/></label>
            <input type='text' className='input' name='phoneNumber'
                style={phoneNumber !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}
                value={phoneNumber}
                onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)}                                              
            />
            <span className='planceholder_input'><SwitchLanguage id='manageAdmin.form.planceholder_phone' /></span>
            <span className='err'>{!_.isEmpty(dataError.phoneNumber) && <FontAwesomeIcon  icon={faCircleExclamation} />} {!_.isEmpty(dataError.phoneNumber) ? language === languages.VI ? dataError.phoneNumber.valueVi : dataError.phoneNumber.valueEn : ''}</span>
        </div>


        <div className='form-input col l-6' >
            <label className='input-label'><SwitchLanguage id='manageAdmin.form.avata'/></label>
            <input type='file' className='input' name='avata'
                style={avata !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}
                value={avata}
                onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name,e)}                                                                                                                         
            />
            <span className='err'>{!_.isEmpty(dataError.avata) && <FontAwesomeIcon  icon={faCircleExclamation} />} {!_.isEmpty(dataError.avata) ? language === languages.VI ? dataError.avata.valueVi : dataError.avata.valueEn : ''}</span>
        </div>
    </div>


    
    <div className='pewview-img'>
        <div className='pewview-border-img' >
            <img className='avata-img' src={imgPreview} alt='' />
        </div>
    </div>
        


    <div className='col l-12'>
        <button className='sub-heading'
            onClick={(e) => this.handleSubmitFormData(e)}
        >
            <SwitchLanguage id='manageAdmin.form.btn'/>
        </button>
    </div>
</>}



        </div>
    </div>
</div>
        
)}}


const mapStateToProps = state => {
    return {
        dataForm: state.admin.dataForm,
        dataDistrict: state.admin.dataDistrict,
        dataWards: state.admin.dataWards,
        language: state.app.language,
        dataUser: state.app.loginUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDataAllCode: () => dispatch(actions.fetchAllDataAllCodeStart()),
        fetchAllDataProvince: (data) => dispatch(actions.fetchAllDataProvinceStart(data)),
        fetchAllDataWards: (data) => dispatch(actions.fetchAllDataWardsStart(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);
