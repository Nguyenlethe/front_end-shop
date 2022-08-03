import React, { Component } from 'react';
import { connect } from "react-redux";

import SwitchLanguage from '../../../SwitchLanguage';

import './ManageShop.scss';
class ManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }


    componentDidMount = async ()=>  {
      
    }


    componentDidUpdate= async(prevProps, prevState)=> {
        if(prevProps.language !== this.props.language){

        }
    }

      
    render() {
        return (
        <div className='grid'>
            <div className='grid wide'>
                <div className='row'>

                    <div className='col l-12'>
                        <p className='heading'><SwitchLanguage id='manageAdmin.manageShop'/></p>
                    </div>

                </div>
            </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);
