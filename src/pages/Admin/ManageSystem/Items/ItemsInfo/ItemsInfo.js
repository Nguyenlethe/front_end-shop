import React, { Component } from 'react';
import { connect } from "react-redux";
// import SwitchLanguage from '../../../../SwitchLanguage';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {faStore,faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
// import * as actions from '../../../../store/action';
// import adminService from '../../../../services/adminService';
// import {languages } from '../../../../utils/constant'
// // import {default as adminService} from '../../../../services/adminService'
// // import { toast } from 'react-toastify';
// // import ListShops from '../ListShop/ListShops'
// import Select from 'react-select';
import _ from 'lodash'



class ItemsInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }


    // // DidMound
    componentDidMount = async ()=>  {
      
    }


    // DidUpdate
    componentDidUpdate= async(prevProps, prevState)=> {
        let {}= this.props
        
        if(prevProps.language !== this.props.language){
        
        }
    }


    // On Change
    heandleChangeInput = async(value, name,e) => {
        let stateCopy = this.state.items
       
        for(let key in stateCopy){
            if(key === name){
                stateCopy[name] = value
            }
        }

        this.setState({
            items: {...stateCopy}
        })
    }








    // Xl change input select
    handlChangeSlelect = async (valueOptions, name) => {
        let {items} = this.state
        
        if(name.name === 'idShop') {
            let res = await this.handleGetOneUser(valueOptions.value)
            this.setState({
                optionsSelect: valueOptions,
                optionsSelectUser: res,
                items: {
                    ...items,
                    idShop: valueOptions.value,
                    manageId: res.value
                }
            })
        }
    }


    // SustomStyle select react
    customStyles = {
        menu: (provided, state) => ({
            ...provided,
            zIndex: 99999,
        }),
    }


    render() {

    
    let {} = this.state
  
    return (
        <>

heliiii

        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
    </>       
)}}


const mapStateToProps = state => {
    return {
        language: state.app.language,
  
    }
}

const mapDispatchToProps = dispatch => {
    return {
       

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsInfo);
