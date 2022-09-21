import React, { Component } from 'react';
import { connect } from "react-redux";
import * as action from '../../../store/action'
import SwitchLanguage from '../../../SwitchLanguage';
import ListLanguage from '../../../components/ListLanguage';
import Tippy from '../../../components/Tippy/Tippy'
import {path, PERMISSIONS,languages, CONTACT} from '../../../utils/constant'
import { Link ,Navigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPhoneFlip,faEnvelope} from '@fortawesome/free-solid-svg-icons';


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
      
    }

    // Update
    componentDidUpdate= async(prevProps, prevState)=> {
        if(prevProps.language !== this.props.language){

        }
    }

      
    render() {

    let {islogin, permission} = this.props.dataUser
    
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
                {!islogin && 
                    <div className='not-login'>
                        <Button type='href' to={path.LOGINPAGE} content={<SwitchLanguage id='manageAdmin.btnLG'/>} /> <span style={{color: 'var(--sub-text)'}}>{'|'}</span>
                        <Button type='href' to={path.REGISTERPAGE} content={<SwitchLanguage id='manageAdmin.btnRGT'/>} />
                    </div>
                }       
                <Tippy content={<SwitchLanguage id='manageAdmin.language'/>}>
                    <ListLanguage />
                </Tippy>
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
    }
}


const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
