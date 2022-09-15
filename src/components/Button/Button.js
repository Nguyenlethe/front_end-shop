import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStore,faPlus,faCircleExclamation} from '@fortawesome/free-solid-svg-icons';

import './Button.scss';
class Button extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
           
        }
    }

  

      
    render() {

        let {to,type,content, name,color,width,border,margin, opacity,icon, height} = this.props
        return (
            <>
                {type === 'primary' ? <button className='btn-primary'><Link className='btn-primary-link' to={to}><span>{content}</span></Link> </button>
                    :
                type === 'close' ? <button className='btn-close'> <Link className='btn-close-link' to={to}><span>{content}</span></Link> </button>
                    : 
                type === 'close-transparent' ? <button className='btn-close-transparent'> <Link className='btn-close-transparent-link' to={to}><span>{content}</span></Link> </button>
                    : 
                type === 'btn-submit' ? <button className='btn-submit'> <Link className='btn-submit-link' to={to ? to : ''}><span>{content}</span></Link> </button>
                    :
                type === 'btn-ban' ? <button className='btn-ban'> <Link className='btn-ban-link' to={to ? to : ''}><span>{content}</span></Link> </button>
                    :
                type === 'submit-form-data' ? <button className='btn-form-input' style={{opacity: opacity,width: width,borderRadius: border, margin: margin}}> <span style={{backgroundColor: color, borderRadius: border, height: height}} className='content-btn-form-input'>{content}{icon }</span> </button>
                    : 
                type === 'edit-form-data' ? <button className='btn-form-input'  style={{opacity: opacity,width: width,borderRadius: border, margin: margin}}> <span style={{backgroundColor: color, borderRadius: border, height: height}} className='content-btn-form-input edit'>{content}{icon}</span> </button>
                    : 
                type === 'close-form-data' ? <button className='btn-form-input' style={{opacity: opacity,width: width,borderRadius: border, margin: margin}}> <span style={{backgroundColor: color, borderRadius: border, height: height}} className='content-btn-form-input close'>{content}</span> </button>
                    : 
                type === 'ban-form-data' ? <button className='btn-form-input' style={{opacity: opacity,width: width,borderRadius: border, margin: margin}}> <span style={{backgroundColor: color, borderRadius: border, height: height}} className='content-btn-form-input ban'>{content}</span> </button>
                    : 
                type === 'create' ? <button className='craete-input'> <span className='content-btn-form-input create'>{content}</span> <FontAwesomeIcon icon={faPlus}/></button>
                    : 
                type === 'submit_voucher' ? <button className='submit_voucher'> <span className='content-btn-form-input voucher_items'>{content}</span> </button>
                    : 
                type === 'href' ? <Link className='href-link' to={to}><span>{content}</span></Link>
                    :
                type === 'text' ? <p className='href-link'><span>{content}</span></p>
                    : ''


                }
            </>
        )
    }
}


const mapStateToProps = state => {
    return {
        
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Button);
