import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSpinner,faRectangleXmark} from '@fortawesome/free-solid-svg-icons';

import './Modal.scss';
import SwitchLanguage from '../../SwitchLanguage';

class ModalErrorItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowModal: false,
        }
    }

    // Mount
    componentDidMount = () =>{
        let {isShow} = this.props

    }


    // Update
    componentDidUpdate = (prevProps, prevState) => {

        if(prevProps.isShow !== this.props.isShow){
            this.setState({
                isShowModal: true,
            })
        }

        if(prevProps.isHide !== this.props.isHide){
            this.setState({
                isShowModal: false,
            })
        }

    }


    // Xl show hide modal
    handleShowHideModal = (e, actions) => {
        if(e.target.className === 'modal' || e.target.className === 'content-btn-form-input close'){
            this.setState({
                isShowModal: false
            })
        }
    }

 
    render() {

        
        let {children,isShow,title} = this.props
        let {isShowModal} = this.state


    return (
        <>
            <div className='modal' onClick={(e) => this.handleShowHideModal(e)} style={{height: isShowModal ? '100vh' : '0vh', opacity: isShowModal ? '1' : '0', zIndex: isShowModal ? '9999999' : '0'}} id="Modal-warn">
                <div className='col l-5 form-notification'>
                    {title === 'warn' &&
                        <div className='title' >
                            <p> <SwitchLanguage id='manageAdmin.modal.warn'/> </p>

                            <span className='close' onClick={() => this.setState({isShowModal: false})}>
                                <FontAwesomeIcon icon={faRectangleXmark} />
                            </span>

                        </div>
                    }
                    {children}
                </div>
            </div>
        </>
    )}
}




export default ModalErrorItems
