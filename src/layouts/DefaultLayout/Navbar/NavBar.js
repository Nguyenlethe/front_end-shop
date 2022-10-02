import React, { Component } from 'react';
import { connect } from "react-redux";
import * as action from '../../../store/action'
import SwitchLanguage from '../../../SwitchLanguage';
import ListLanguage from '../../../components/ListLanguage';
import Tippy from '../../../components/Tippy/Tippy'
import {path, PERMISSIONS,languages, CONTACT} from '../../../utils/constant'
import { Link ,Navigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPhoneFlip,faEnvelope,faCircleUser} from '@fortawesome/free-solid-svg-icons';
import adminService from '../../../services/adminService';



import './NavBar.scss';
import Button from '../../../components/Button/Button';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }

   
    // Mount 
    componentDidMount = async ()=>  {
       let {islogin, permission, id} = this.props.dataUser
       this.props.getLikeOrFollowItemsShop({idUser: id, type: 'LIKE'})
    }

    // Trước khi chết 
    componentWillUnmount = () => {

    }
  

    // Update
    componentDidUpdate= async(prevProps, prevState)=> {
        if(prevProps.language !== this.props.language){

        }

        if(prevProps.oneItems !== this.props.oneItems){
            let {islogin, permission, id} = this.props.dataUser
            this.props.getLikeOrFollowItemsShop({idUser: id, type: 'LIKE'})
        }
    }

      
    render() {

    let {islogin, permission, avatar} = this.props.dataUser
    
    return (
        <div className='grid'>
        <div className='nav-top l-12 '>
        <div className='grid wide hug-nav-top'>

            <div className='nav-top-left'>
                <a href={`tel:${CONTACT.PHONE}`} className='phone'>
                    <FontAwesomeIcon icon={faPhoneFlip}/>
                    <span>{CONTACT.PHONE}</span>
                </a>

                <a href={`mailto: ${CONTACT.EMAIL}`}  className='email'>
                    <FontAwesomeIcon icon={faEnvelope}/>
                    <span>{CONTACT.EMAIL}</span>
                </a>
            </div>
            

            <div className='nav-top-right'>
                {!islogin ?
                    <div className='not-login'>
                        <Button type='href' to={path.LOGINPAGE} content={<SwitchLanguage id='manageAdmin.btnLG'/>} /> <span style={{color: 'var(--sub-text)'}}>{'|'}</span>
                        <Button type='href' to={path.REGISTERPAGE} content={<SwitchLanguage id='manageAdmin.btnRGT'/>} />
                    </div>

                    :
                    
                    <div className='list-icon-nav'>
                        <div className='wrapper-icon-nav'>
                        <i className="bi bi-chat-dots"></i>
                        </div>

                        {islogin == 'true' ?
                        <div className='wrapper_avatar mgl-12'>
                            <img src={`${process.env.REACT_APP_BACKEND_IMAGES_URL}/${avatar}`} alt='' />
                        </div>
                        : 
                        <FontAwesomeIcon className='mgl-12' icon={faCircleUser} />
                        }
                    </div>
                }       
                
                <ListLanguage colorBoxShadow='0px 0px 3px rgb(255 255 255)' />
               
            </div>
            
        </div>
        </div>
        </div>

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
        getLikeOrFollowItemsShop: (data) => dispatch(action.getLikeOrFollowItemsShop(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
