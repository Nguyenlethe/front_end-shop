
import React, { Component } from 'react';
import { connect } from "react-redux";
// import SwitchLanguage from '../../../../../SwitchLanguage';
// import * as actions from '../../../../../store/action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {languages,SEARCH } from '../../utils/constant'
import adminService from '../../services/adminService';
// import { toast } from 'react-toastify';

import'./SearchInput.scss';

class ListItems extends Component {
    constructor(props){
        super(props);
        this.state = {

            valueInputSearch: '',
            listDataSearch: []
        }
    }





    // Component DidMount 
    componentDidMount = async() => {
        let {tabel,type} = this.props
    
    }

 
    // Component Update
    componentDidUpdate = async(prevProps, prevState) => {
       
        if(prevProps.language !== this.props.language){
          
        }

        if(prevState.valueInputSearch !== this.state.valueInputSearch){
            let {tabel,type,idShop} = this.props
            let value = this.state.valueInputSearch

            let res = await adminService.searchData({tabel,type,value,idShop})
            console.log(res)
        }

        
    }


    // State + props thay đổi mới re-reder
    shouldComponentUpdate(nextProps, nextState) {
        if (
            this.props.tabel !== nextProps.tabel ||
            this.props.type !== nextProps.type ||
            this.props.idShop !== nextProps.idShop ||
            this.props.listDataSearch !== nextProps.listDataSearch ||

            this.state.valueInputSearch !== nextProps.valueInputSearch 
        ){
          return true;
        }
        return false;
    }



    // changeInput Search 
    handleChangeInputSearch = (value) => {
        let valueInput = value

        this.setState({
            valueInputSearch: valueInput
        })
    }


  

    render() {

        let {valueInputSearch} = this.state

      



    return (
    
        <div className='search'>

            <div className='input_search'>
                <input className='input' name='search' type='text' value={valueInputSearch} 
                    onChange={(e) => this.handleChangeInputSearch(e.target.value)}
                />
                <FontAwesomeIcon  style={{opacity: valueInputSearch !== '' ? '1' : '.7'}} icon={faMagnifyingGlass}/>
            </div>

            <div>
                <div>
                    
                </div>
            </div>



        </div>
    
    )}
} 


const mapStateToProps = state => {
    
    return {
        language: state.app.language,
        allcategory: state.admin.dataForm.category,
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItems);