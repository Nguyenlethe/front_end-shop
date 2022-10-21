import React, { Component } from 'react';
import { connect } from "react-redux";
import * as action from '../../../../store/action'
import SwitchLanguage from '../../../../SwitchLanguage';
import ListLanguage from '../../../../components/ListLanguage';
import Tippy from '../../../../components/Tippy/Tippy'
import {path, PERMISSIONS,languages, CONTACT} from '../../../../utils/constant'
import handleCheckPermission from '../../../../utils/generalHandling'
import { Link ,Navigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPhoneFlip,faEnvelope,faCircleUser,faGear,faBagShopping,faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import adminService from '../../../../services/adminService';
import {routesProFie} from '../../../../routes/routes'
import withRouter from '../../../../routes/withRouter';


import './RoutesMenu.scss';

class RoutesMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPATIENT: false,
            isSELLER: false,
            isShowMenu: false,
            isADMIN: false
        }
    }

   
    // Mount 
    componentDidMount = async ()=>  {
        let {islogin, permission, avatar} = this.props.dataUser
        let isPATIENT = handleCheckPermission.handleCheckPermission(PERMISSIONS.PATIENT,permission)
        let isSELLER = handleCheckPermission.handleCheckPermission(PERMISSIONS.SELLER,permission)
        let isADMIN = handleCheckPermission.handleCheckPermission(PERMISSIONS.ADMIN,permission)


        
        if(this.props.isShowMenu != false){
            this.setState({
                isShowMenu: true,
                isPATIENT: isPATIENT,
                isSELLER: isSELLER,
                isADMIN: isADMIN
            })
        }

        if(this.props.isShowMenu == false){
            this.setState({
                isShowMenu: false,
                isPATIENT: isPATIENT,
                isSELLER: isSELLER,
                isADMIN: isADMIN
            })
        }
    }


    // Trước khi chết 
    componentWillUnmount = () => {

    }
  

    // Update
    componentDidUpdate= async(prevProps, prevState)=> {
        if(prevProps.language !== this.props.language){

        }

        if(prevProps.isShowMenu !== this.props.isShowMenu){

            if(this.props.isShowMenu != false){
                this.setState({
                    isShowMenu: true
                })
            }

            if(this.props.isShowMenu == false){
                this.setState({
                    isShowMenu: false
                })
            }

        }
    }


   
    // Handle log out
    handleLogOut = async (type) => {
        if(type == 'LOGOUT'){
            this.props.setDataEmptyLogOut()
            localStorage.clear()
        }
    }

      
    render() {

    let {islogin, permission, avatar} = this.props.dataUser
    let {isPATIENT, isSELLER,isShowMenu, isADMIN} = this. state
    let {isNotMenu} = this.props
    
    
    return (
        <>
            {isShowMenu && 
                <div className={isNotMenu == true ? 'menu-profile-notAfter' : 'wrapper-menu-profile'}
                    style={{border: isNotMenu == true ? 'none' : '', width: isNotMenu == true ? '100%' : ''}}
                >

                    {routesProFie.map((routes, index) => {
                        if(isPATIENT == true && routes.role != PERMISSIONS.PATIENT){
                            return (
                                <p key={routes.path}>
                                    <Link className='element-link' onClick={() => this.handleLogOut(routes.status)} to={routes.path}>
                                        <span className='element-link-icon'><FontAwesomeIcon icon={routes.icon} /></span>
                                        <span className='element-link-text'><SwitchLanguage id={routes.idText}/></span>
                                    </Link>
                                </p>
                            )
                        }

                        if(isSELLER == true && routes.role != PERMISSIONS.SELLER){
                            return (
                                <p key={routes.path}>
                                    <Link className='element-link' onClick={() => this.handleLogOut(routes.status)} to={routes.path}>
                                        <span className='element-link-icon'><FontAwesomeIcon icon={routes.icon} /></span>
                                        <span className='element-link-text'><SwitchLanguage id={routes.idText}/></span>
                                    </Link>
                                </p>
                            )
                        }

                        if(isADMIN == true && routes.role != PERMISSIONS.PATIENT){
                            return (
                                <p key={routes.path}>
                                    <Link className='element-link' onClick={() => this.handleLogOut(routes.status)} to={routes.path}>
                                        <span className='element-link-icon'><FontAwesomeIcon icon={routes.icon} /></span>
                                        <span className='element-link-text'><SwitchLanguage id={routes.idText}/></span>
                                    </Link>
                                </p>
                            )
                        }
                    })}
                </div>
            }
        </>
    )}
}


const mapStateToProps = (state) => {
    return { 
        language: state.app.language ,
        dataUser: state.app.loginUser,
        oneItems: state.admin.items.oneItems,
    }
}


const mapDispatchToProps = dispatch => {
    return {
        getLikeOrFollowItemsShop: (data) => dispatch(action.getLikeOrFollowItemsShop(data)),
        setDataEmptyLogOut: () => dispatch(action.setDataEmptyLogOutStart()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RoutesMenu));
