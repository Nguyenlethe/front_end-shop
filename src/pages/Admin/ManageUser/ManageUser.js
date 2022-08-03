import React, { Component } from 'react';
import { connect } from "react-redux";
import SwitchLanguage from '../../../SwitchLanguage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons';
import * as actions from '../../../store/action';
import {languages } from '../../../utils/constant'

import './ManageUser.scss';
class ManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowListsInput: false,
            listGender: [],
            listProvince: [],
            listPermission: [],
            listDistrict: [],
            listDataWards: [],
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

        }
    }



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
            console.log('Didupdate',dataDistrict)
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
            console.log(e.target.file)
        }

        if(name === 'province'){
            this.props.fetchAllDataProvince(value)
        }
        
        if(name === 'district'){
            this.props.fetchAllDataWards(value)
        }

        let stateCopy = this.state.users
        for(let key in stateCopy){
            if(key === name){
                stateCopy[name] = value
            }
        }
        this.setState({
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
    handleSubmitFormData = () => {
        console.log(this.state.users)
    }

      
    render() {

        
    let {language,dataDistrict} = this.props
        console.log()

    let {listGender,listProvince,listPermission,listDataWards,isShowListsInput} = this.state

    let {email,password,firstName,lastName,gender, permission, phoneNumber, avata,avataLink, province,district,wards,addressDetails,} = this.state.users

       

        return (
            <div className='grid'>
                <div className='grid wide'>
                    <div className='row'>
                        <div className='col l-12'>
                            <p className='heading-manage-user'><SwitchLanguage id='manageAdmin.manageUsers'/></p>
                        </div>

                        
                        <div className='col l-12'>
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
                </div>

                <div className='form-input col l-6'>
                    <label className='input-label'><SwitchLanguage id='manageAdmin.form.password'/></label>
                    <input type='text' className='input' name='password'
                        style={password !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}
                        value={password}
                        onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)}         
                    />
                    <span className='planceholder_input'><SwitchLanguage id='manageAdmin.form.planceholder_password' /></span>
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
                </div>


                <div className='form-input col l-6'>
                    <label className='input-label'><SwitchLanguage id='manageAdmin.form.lastName'/></label>
                    <input type='text' className='input' name='lastName'
                        style={lastName !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}
                        value={lastName}
                        onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)}                                         
                    />
                    <span className='planceholder_input'><SwitchLanguage id='manageAdmin.form.planceholder_lastName' /></span>
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
                </div>

                <div className='form-input col l-6'>
                    <label className='input-label'><SwitchLanguage id='manageAdmin.form.permission'/></label>
                    <select id='input-select' className='input' name='permission'
                        style={permission !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}
                        value={permission}
                        onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)}                                                                                    
                    >
                        <option  value='none' ></option>
                        {listPermission && listPermission.length > 0 && listPermission.map(item => {
                            let value = language === languages.EN ? item.valueEn : item.valueVi;
                            return (<option  value={item.keyMap} key={item.id}>{value}</option>)
                        })}
                    </select>
                    <span className='planceholder_input'><SwitchLanguage id='manageAdmin.form.planceholder_permission' /></span>
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
                </div>


                <div className='form-input col l-6'>
                    <label className='input-label'><SwitchLanguage id='manageAdmin.form.wards'/></label>
                    <select id='input-select' className='input' name='wards'
                        style={wards !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}
                        value={wards}
                        onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)}                                           
                        
                    >
                    <option  value='none' ></option>
                        {listDataWards && listDataWards.length > 0 && listDataWards.map(item => {
                            let value = language === languages.EN ? item.valueEn : item.valueVi;
                            return (<option  value={item.keyMap} key={item.id}>{value}</option>)
                        })}
                    </select>
                    <span className='planceholder_input'><SwitchLanguage id='manageAdmin.form.planceholder_wards' /></span>
                    
                </div>
            </div>



            <div className='list-input'>
                <div className='form-input col l-12 full'>
                    <label className='input-label'><SwitchLanguage id='manageAdmin.form.AddressDetails'/></label>
                    <input type='text' className='input' name='addressDetails'
                        style={addressDetails !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}
                        value={addressDetails}
                        onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)}                                          
                    />
                    <span className='planceholder_input'><SwitchLanguage id='manageAdmin.form.planceholder_AddressDetails' /></span>
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
                </div>


                <div className='form-input file col l-6' >
                    <label className='input-label'><SwitchLanguage id='manageAdmin.form.avata'/></label>

                    <input type='file' className='input' name='avata'
                        style={avata !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}
                        value={avata}
                        onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name,e)}                                                                                                                         
                    />

                    <span className='plhd-avata'>
                        <SwitchLanguage id='manageAdmin.form.planceholder_avata' />
                    </span>
                </div>

            </div>
                


            <div className='col l-12'>
                <button className='sub-heading'
                    onClick={() => this.handleSubmitFormData()}
                >
                    <SwitchLanguage id='manageAdmin.form.btn'/>
                </button>
            </div>
        </>}



                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        dataForm: state.admin.dataForm,
        dataDistrict: state.admin.dataDistrict,
        dataWards: state.admin.dataWards,
        language: state.app.language
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
