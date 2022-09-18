import React, { Component } from 'react';
import { connect } from "react-redux";
import ListLanguage from '../../../components/ListLanguage';
import { Link ,Navigate} from 'react-router-dom';
import {path, PERMISSIONS} from '../../../utils/constant'
import {HomeIcons, ShopIcons,ListUserIcons,ShopIconsActive,ListUserIconsActive} from '../../../components/Icons'
import ManageShop from './ManageShop'
import ManageUser from './CreateUser';
import OtherSystemData from './OtherSystemData';
import Tippy from '../../../components/Tippy/Tippy';
import SwitchLanguage from '../../../SwitchLanguage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faRightFromBracket,faPlus} from '@fortawesome/free-solid-svg-icons';
import generalHandling from '../../../utils/generalHandling'
import * as actions from '../../../store/action';
import InputStyle from '../../../components/InputStyle';

import './ManageSystem.scss';
class ManageSystem extends Component {
    constructor(props) {
        super(props);
        this.state = {
           showManageShop: false,
           showManageUser: false,
           loadDataAllCode: false,
           islogOut: false,
           showOtherSystemData: true,
        }
    }

    // State + props thay đổi mới re-reder
    shouldComponentUpdate(nextProps, nextState) {
        if (
            this.props.dataUser !== nextProps.dataUser ||             
            this.state.showManageShop !== nextState.showManageShop ||
            this.state.showManageUser !== nextState.showManageUser  || 
            this.state.loadDataAllCode !== nextState.loadDataAllCode || 
            this.state.islogOut !== nextState.islogOut || 
            this.state.showOtherSystemData !== nextState.showOtherSystemData


        ){
          return true;
        }
        return false;
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
            ...stateCopy,
            loadDataAllCode: true
        })
    }

    // Did mount
    componentDidMount = async ()=>  {
        await this.props.getCategoryAllCode()
        await this.props.fetchAllDataAllCode()
        await this.props.getAllCodeInToItems('DCC')
        await this.props.getAllCodeInToItems('BNPRD')
        await this.props.getAllCodeInToItems('TYPESIZE')
        await this.props.getAllCodeInToItems('COLOR')

        this.setState({
            loadDataAllCode: true
        })
    }

    // WillUmount
    componentWillUnmount = async ()=> {
        let {islogin, isError, permission} = this.props.dataUser
    }

    // Update
    componentDidUpdate= async(prevProps, prevState)=> {
        if(prevProps.language !== this.props.language){

        }
    }

    // Handle log out
    handleLogOut = async () => {
        this.setState({islogOut: true})
        localStorage.clear()
    }

      
render() {

    let {showManageShop,showManageUser,loadDataAllCode,islogOut,showOtherSystemData} = this.state
    let {islogin, permission} = this.props.dataUser
    
    return (
    <>
    {islogin && generalHandling.handleCheckPermission(PERMISSIONS.ADMIN, permission) ? 
    <>
        <div className='header grid'>
            <div className='grid wide'>
                <div className='l-12'>
        
                    <div className='nav-header'>
                        <div className='list-icon-controll'>
                            <Tippy content={<SwitchLanguage id='manageAdmin.home'/>} height='var(--height-tippy-nav'>
                                <span className='icon-system '>
                                    <Link className='nav-icon-home' to={path.HOMEPAGE}> <HomeIcons/></Link>
                                </span>
                            </Tippy>
    
                            <Tippy content={<SwitchLanguage id='manageAdmin.manageShop'/>} height='var(--height-tippy-nav'>
                                <span className={ showManageShop ?  'icon-system active': 'icon-system'} onClick={() => this.handleShowPage('showManageShop')}>
                                    {showManageShop ? <ShopIconsActive/> : <ShopIcons/>}
                                </span>
                            </Tippy>
    
                            <Tippy content={<SwitchLanguage id='manageAdmin.manageUsers'/>} height='var(--height-tippy-nav'>
                                <span className={ showManageUser ? 'icon-system active' : 'icon-system'} onClick={() => this.handleShowPage('showManageUser')}>
                                    {showManageUser ? <ListUserIconsActive/> : <ListUserIcons/>}
                                </span>
                            </Tippy>


                            <Tippy content={<SwitchLanguage id='manageAdmin.other'/>} height='var(--height-tippy-nav'>
                                <span className={showOtherSystemData ? 'icon-system active' : 'icon-system'} onClick={() => this.handleShowPage('showOtherSystemData')}>
                                    <span className='border-icon-nav'><FontAwesomeIcon icon={faPlus}/></span>
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
                                <span className='log-out' onClick={() => this.handleLogOut()}>
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
                    
                    {showOtherSystemData && loadDataAllCode && <InputStyle> <OtherSystemData/> </InputStyle>}
                    {showManageShop && loadDataAllCode && <ManageShop/>}
                    {showManageUser && loadDataAllCode && <ManageUser/>} 
                    {islogOut && loadDataAllCode && <Navigate to={path.HOME} />}

                </div>
            </div>
        </div>
    </>
    :  <Navigate to={path.NOTFOUND} /> }
    </>
)}}


const mapStateToProps = state => {
    return {
        dataUser: state.app.loginUser,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDataAllCode: () => dispatch(actions.fetchAllDataAllCodeStart()),
        getAllUser: () => dispatch(actions.getAllUserStart()),
        getAllShop: () => dispatch(actions.getAllShopStart()),
        getAllCodeInToItems: (type) => dispatch(actions.getAllCodeInToItemsStart(type)),
        getCategoryAllCode: () => dispatch(actions.getCategoryAllCodeStart()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageSystem);
