import React, { Component } from 'react';
import { connect } from "react-redux";
// import * as action from '../../../store/action'
// import SwitchLanguage from '../../../SwitchLanguage';
// import ListLanguage from '../../../components/ListLanguage';
// import Tippy from '../../../components/Tippy/Tippy'
// import {path, PERMISSIONS,languages, CONTACT} from '../../../utils/constant'
// import { Link ,Navigate} from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {faPhoneFlip,faEnvelope,faCircleUser} from '@fortawesome/free-solid-svg-icons';
// import adminService from '../../../services/adminService';
// import {routesProFie} from '../../../routes/routes'
// import RoutesMenu from './RoutesMenu'

import DefaultLayout from '../DefaultLayout';
import RoutesMenu from '../DefaultLayout/Navbar/RoutesMenu';



import './ProfileLayout.scss';

class ProfileLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }

   
    // Mount 
    componentDidMount = async ()=>  {
       
    }

    // Trước khi chết 
    componentWillUnmount = () => {

    }
  

    // Update
    componentDidUpdate= async(prevProps, prevState)=> {
        if(prevProps.language !== this.props.language){

        }
    }


   

      
    render() {
    let {islogin, permission, avatar} = this.props.dataUser
    let {children} = this.props
    
    return (

        <DefaultLayout>
            <div className='grid'>
            <div className='grid wide'>
            <div className='row'>

                <div className='col l-3'>
                    <RoutesMenu isShowMenu={true} isNotMenu={true}/>
                </div>

                <div className='col l-9'>
                    {children}
                </div>

            </div>
            </div>
            </div>
        </DefaultLayout>

    )}
}


const mapStateToProps = (state) => {
    return { 
        language: state.app.language ,
        dataUser: state.app.loginUser,
    }
}


const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileLayout);
