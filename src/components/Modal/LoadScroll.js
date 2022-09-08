import React, { Component }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';

import './Modal.scss';
class LoadScrollTop extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {

        }
    }

 
    render() {

    let {isShow} = this.props

    return (
       
        <>
            <div id="loadScroll" style={{width: !isShow ? '0%' : '96%'}}></div> 
        </>
    )}
}



export default LoadScrollTop;
