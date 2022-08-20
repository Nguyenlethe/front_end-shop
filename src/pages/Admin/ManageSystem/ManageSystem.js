import React, { Component } from 'react';
import { connect } from "react-redux";
import ListLanguage from '../../../components/ListLanguage';
import { Link ,Navigate} from 'react-router-dom';
import {path, PERMISSIONS} from '../../../utils/constant'
import {HomeIcons, ShopIcons,ListUserIcons,ShopIconsActive,ListUserIconsActive} from '../../../components/Icons'
import ManageShop from './ManageShop'
import ManageUser from './CreateUser';
import Tippy from '../../../components/Tippy/Tippy';
import SwitchLanguage from '../../../SwitchLanguage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import comparativeHandling from '../../../utils/comparativeHandling'

import './ManageSystem.scss';
class ManageSystem extends Component {
    constructor(props) {
        super(props);
        this.state = {
           showManageShop: false,
           showManageUser: true
        }
    }

    // Ẩn hiện trang thêm user
    handleShowPage = (name) => {
        let stateCopy = this.state
        for(let key in stateCopy) {
            if(key === name){
                stateCopy[key] = this.state[key] === true ? true : !this.state[key]
            }else{
                stateCopy[key] =  false
            }
        }
        this.setState({
            ...stateCopy
        })
    }

    componentDidMount = async ()=>  {
        
    }

    componentWillUnmount = async ()=> {
        let {islogin, isError, permission} = this.props.dataUser

        console.log(islogin, isError, permission)
    }

    componentDidUpdate= async(prevProps, prevState)=> {
        if(prevProps.language !== this.props.language){

        }
    }

      
render() {
    let {showManageShop,showManageUser} = this.state
    let {islogin, permission} = this.props.dataUser

    
    return (
    <>
    {islogin && comparativeHandling.handleCheckPermission(PERMISSIONS.ADMIN, permission) ? 
    <>
        <div className='header grid'>
            <div className='grid wide'>
                <div className='l-12'>
        
                    <div className='nav-header'>
                        <div className='list-icon-controll'>
                            <Tippy content={<SwitchLanguage id='manageAdmin.home'/>} height='70'>
                                <span className='icon-system '>
                                    <Link className='nav-icon-home' to={path.HOMEPAGE}> <HomeIcons/></Link>
                                </span>
                            </Tippy>
    
                            <Tippy content={<SwitchLanguage id='manageAdmin.manageShop'/>} height='70'>
                                <span className={ showManageShop ?  'icon-system active': 'icon-system'} onClick={() => this.handleShowPage('showManageShop')}>
                                    {showManageShop ? <ShopIconsActive/> : <ShopIcons/>}
                                </span>
                            </Tippy>
    
                            <Tippy content={<SwitchLanguage id='manageAdmin.manageUsers'/>} height='70'>
                                <span className={ showManageUser ? 'icon-system active' : 'icon-system'} onClick={() => this.handleShowPage('showManageUser')}>
                                    {showManageUser ? <ListUserIconsActive/> : <ListUserIcons/>}
                                </span>
                            </Tippy>
                        </div>
    
                        <div className='List-icon-right'>
                            <Tippy content={<SwitchLanguage id='manageAdmin.language'/>}>
                                <div className='language'>
                                    <ListLanguage/> 
                                </div>
                            </Tippy>
                            <Tippy content={<SwitchLanguage id='manageAdmin.logout'/>} height='20'>
                                <span className='log-out'>
                                    <FontAwesomeIcon className='icon-log-out' icon={faRightFromBracket}/>
                                </span>
                            </Tippy>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className='grid'>
            <div className='grid wide'>
                <div className='l-12'>
                    {showManageShop && <ManageShop/>}
                    {showManageUser && <ManageUser/>} 
                </div>
            </div>
        </div>
    </>
    :  <Navigate to={path.NOTFOUND} /> }
    </>
)}}


const mapStateToProps = state => {
    return {
        dataUser: state.app.loginUser
        
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageSystem);
