import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link ,Navigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPhoneFlip,faEnvelope,faCircleUser} from '@fortawesome/free-solid-svg-icons';



import './ProFile.scss';


class ProFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }

   
    // Mount 
    componentDidMount = async ()=>  {
    
    }

    // Trước khi chết 
    componentWillUnmount = () => {

    }
  

    // Update
    componentDidUpdate= async(prevProps, prevState)=> {
   
    }

      
    render() {

    let {islogin, permission, avatar} = this.props.dataUser
    
    return (
        <div className='grid'>
        <div className='grid wide'>
        <div className='row'>

            <div className='col l-2'>
                item 1
            </div>

            <div className='col l-10'>
                item 2
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

export default connect(mapStateToProps, mapDispatchToProps)(ProFile);
