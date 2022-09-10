import React, { Component } from 'react';
import { connect } from "react-redux";
import SwitchLanguage from '../../../../../SwitchLanguage'
import Select from 'react-select';
import generalHandling from '../../../../../utils/generalHandling'

import './PriceShip.scss';
class PriceShip extends Component {
    constructor(props) {
        super(props);
        this.state = {

            dataOptions: {
                optionsIdshop: null
            },

            listDataOptions: {
                listAllShops: []
            },

            dataTabelShip:{
                idShop: '',
                itemsId:'',
                priceShip: '',
                province: ''
            }
        }
    }


    // 
    componentDidMount = async () => { 
        let {listDataOptions, dataOptions} = this.state
        let {allShops,langauge}= this.props
        let newListShop = generalHandling.handlConvertObject(allShops, 'LIST_SHOP',langauge)

        this.setState({
            listDataOptions: {
                ...listDataOptions,
                listAllShops: newListShop || []
            }
        })
        
    }

    
    //
    componentDidUpdate= async (prevProps, prevState) => {
        let {allShops,langauge}= this.props
        let {listDataOptions, dataOptions} = this.state

        if(prevProps.allShops !== this.props.allShops){
            let newListShop = generalHandling.handlConvertObject(allShops, 'LIST_SHOP',langauge)

            this.setState({
                listDataOptions: {
                    ...listDataOptions,
                    listAllShops: newListShop || []

                }
            })
        }
    }


    //
      // Xl change input select
      handlChangeSlelect = async (valueOptions, name) => {
        let {listDataOptions, dataOptions,dataTabelShip} = this.state
        
        // Add shop
        if(name.name === 'idShop') {   

            // Set State
            this.setState({
                dataOptions:{
                    ...dataOptions,
                    optionsIdshop: valueOptions,
                },
                dataTabelShip:{
                    ...dataTabelShip, 
                    idShop: valueOptions.value
                }

            })
        }
   
      
    }

   
    render() { 
    let {listAllShops} = this.state.listDataOptions
    let {optionsIdshop} = this.state.dataOptions
    let {language} = this.props
 
    return (
        <>
            <div className='l-12 heading'>
                <p className='heading-manage-user'><SwitchLanguage id='manageAdmin.items.ship_price' /></p> 
            </div> 


            <div className='form-input col l-3'>
                <label className='input-label'><SwitchLanguage id='manageAdmin.form.nameShop'/></label>
                <Select
                    value={optionsIdshop}
                    onChange={this.handlChangeSlelect}
                    options={listAllShops}
                    styles={this.customStyles}
                    placeholder={<SwitchLanguage id='manageAdmin.form.nameShop'/>}
                    name='idShop'
                />
            </div>
        </>
    )}}


const mapStateToProps = state => {
    return {
        language: state.app.language,
        allShops: state.admin.listShops.allShops,
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceShip);
