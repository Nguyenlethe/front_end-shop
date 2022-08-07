import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';


import './Button.scss';
class Button extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
           
        }
    }

  

      
    render() {

        let {to,type,content} = this.props
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
: ""
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
