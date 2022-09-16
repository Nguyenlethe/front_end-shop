import React, { Component } from 'react';
import { connect } from "react-redux";
import SwitchLanguage from '../../../../SwitchLanguage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStore,faCircleExclamation,faPalette} from '@fortawesome/free-solid-svg-icons';
import * as actions from '../../../../store/action';
import {languages } from '../../../../utils/constant'
import _ from 'lodash'
import adminService from '../../../../services/adminService';
import { toast } from 'react-toastify';
import ListShops from '../ListShop/ListShops'
import Select from 'react-select';
import Items from '../Items/Items';
import generalHandling from '../../../../utils/generalHandling'
import Button from '../../../../components/Button/Button';
import './OtherSystemData.scss'

class OtherSystemData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colorId: 'COLOR',
            idUserCreate: '',
            code: '',
            valueEn: '',
            valueVi: ''
        }
    }



    // DidMound
    componentDidMount = async ()=>  {

    }

   
 

    // DidUpdate
    componentDidUpdate= async(prevProps, prevState)=> {

        // Khi Language change
        if(prevProps.language !== this.props.language){

        }
    }



  
    render() {
    let {} = this.state
    let {language} = this.props

    return (
    <>
        <div style={{height: 'var(--height-tippy-nav)'}}></div>
        <div className='col l-12'>
            <p className='heading-manage-user'><SwitchLanguage id='manageAdmin.otherDataSystem'/></p>
        </div>     

        <p className='heading-other-data' ><SwitchLanguage id='manageAdmin.button.addColor'/> <FontAwesomeIcon icon={faPalette}/></p>

        



        <div className='all-input l-12 'style={{height: 'auto'}}>

            <div className='list-input'>

                <div className='form-input'>
                    <label className='input-label'><SwitchLanguage id='manageAdmin.form.password'/></label>
                    <input className='input' name='password'/>
                    <span className='planceholder_input'><SwitchLanguage id='manageAdmin.form.planceholder_password' /></span>
                    <span className='err'></span>
                </div>

            </div>

        </div>

    </>       
)}}
 

const mapStateToProps = state => {
    return {
        language: state.app.language,
    }
}

const mapDispatchToProps = dispatch => {
    return {
       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OtherSystemData);




















