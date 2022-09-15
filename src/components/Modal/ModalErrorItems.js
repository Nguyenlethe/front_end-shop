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
        setTimeout(() => {
            this.setState({
                isShowModal: isShow,
            })
        },200)

    }


    // Update
    componentDidUpdate = (prevProps, prevState) => {
        let {handleShowHide} = this.props

        if(prevProps.isHideSlow !== this.props.isHideSlow){
            this.setState({
                isShowModal: false,
            })

            setTimeout(() => {
                handleShowHide(false)
            },300)
        }
    }


    // Xl show hide modal
    handleShowHideModal = (e, actions) => {
        let {handleShowHide} = this.props
        if(e.target.className === 'modal' || e.target.className === 'content-btn-form-input close'){
            this.setState({
                isShowModal: false,
            })

            setTimeout(() => {
                handleShowHide(false)
            },300)
        }
        if(actions === 'ICON'){
            this.setState({
                isShowModal: false,
            })

            setTimeout(() => {
                handleShowHide(false)
            },300)
        }
    }

 
    render() {

        
        let {children,isShow,title,handleShowHide} = this.props
        let {isShowModal} = this.state


    return (
        <>
            <div className='modal' onClick={(e) => this.handleShowHideModal(e)} style={{height: isShowModal ? '100vh' : '0vh', opacity: isShowModal ? '1' : '0', zIndex: isShowModal ? '9999999' : '0'}} id="Modal-warn">
                
                {title === 'warn' &&
                    <div className='col l-5 form-notification'>
                        {title === 'warn' &&
                            <div className='title' >
                                <p> <SwitchLanguage id='manageAdmin.modal.warn'/> </p>

                                <span className='close' onClick={(e) => this.handleShowHideModal(e, 'ICON')}>
                                    <FontAwesomeIcon icon={faRectangleXmark} />
                                </span>

                            </div>
                        }

                        {children}
                    </div>
                }
                {children}
            </div>
        </>
    )}
}




export default ModalErrorItems
