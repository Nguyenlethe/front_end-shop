import React, { Component } from 'react';
import { connect } from "react-redux";
import SwitchLanguage from '../../../../../SwitchLanguage';
import generalHandling from '../../../../../utils/generalHandling';
import Select from 'react-select';
import Button from '../../../../../components/Button/Button';
import InputSearch from '../../../../../components/SearchInput/InputSearch';
import {languages,DISCOUNTTEXT} from '../../../../../utils/constant'
import NumberFormat from 'react-number-format';
import adminService from '../../../../../services/adminService'
import * as actions from '../../../../../store/action';
import Voucher from '../../../../../components/Items/Voucher/Voucher';

import './ListVoucher.scss';
class ListVoucher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            optionsIdShop: null,
            optionsCategory: null,
            optionsCategoryType: null,

            listAllShops: [],
            listAllCategory: [],
            listAllCategoryType: [],
            listAllCategoryTypeNotConvert: [],
            resultItemsDiscount: [],
            dataVoucherAll: []
        }
    }

   
    componentDidMount = async () => { 
        let {allShops,allcategory} = this.props

        let listAllShops = generalHandling.handlConvertObject(allShops, 'LIST_SHOP',this.props.language)
        let listAllCategory = generalHandling.handlConvertObject(allcategory, 'LIST_CATEGORY',this.props.language)


         // Set state
         this.setState({
            listAllShops: listAllShops,
            listAllCategory: listAllCategory
        })
        console.log(allShops,allcategory)
    }
    
    
    componentDidUpdate= async (prevProps, prevState) => {

        // Thay đổi ngôn ngữ
        if(prevProps.allShops !== this.props.allShops){
            let {allShops} = this.props
        
            // Chuyển data về dạng options
            let listAllShops = generalHandling.handlConvertObject(allShops, 'LIST_SHOP',this.props.language)
        
            // Set state
            this.setState({
                listAllShops: listAllShops
            })
        }

        // Thay đổi ngôn ngữ
        if(prevProps.allcategory !== this.props.allcategory){
            let {allcategory} = this.props
            
            // Chuyển data về dạng options
            let listAllCategory = generalHandling.handlConvertObject(allcategory, 'LIST_CATEGORY',this.props.language)

            // Set state
            this.setState({
                listAllCategory: listAllCategory
            })
        }
    }


    // Xl change input select
    handlChangeSlelect = async (valueOptions, name) => {
        let {listAllCategoryTypeNotConvert,optionsIdShop, optionsCategory, optionsCategoryType} = this.state

        // Change select category
        if(name.name === 'idShop') {
            let dataResultSearchItem = await (await adminService.getVoucher({idShop:valueOptions.value, category: 'EMPTY', type: 'EMPTY'})).data.data
            
            // Set state
            this.setState({
                optionsIdShop: valueOptions,
                optionsCategory: null,
                optionsCategoryType: null,
                resultItemsDiscount: dataResultSearchItem,
                dataVoucherAll: dataResultSearchItem,
            })
        }

        
        // Change select category
        if(name.name === 'forItemCategory') {
            let {dataVoucherAll} = this.state
            let listAllCategoryType = listAllCategoryTypeNotConvert

            // Get data categoryType + convert Object select
            listAllCategoryType = await this.props.getAllCodeInToItems(valueOptions.value)
            let newListAllCategoryType = generalHandling.handlConvertObject(listAllCategoryType, 'LIST_CATEGORY',this.props.language)
            
            let dataVoucherNew = dataVoucherAll.filter(voucher => {
                if(voucher.forItemCategory === valueOptions.value && voucher.itemsId === 'EMPTY' && voucher.forItemType === 'EMPTY' ) return voucher
            })

            
            // Set state
            this.setState({
                optionsCategory: valueOptions,
                optionsCategoryType: null,
                listAllCategoryType: newListAllCategoryType,
                resultItemsDiscount: dataVoucherNew,
                listAllCategoryTypeNotConvert: listAllCategoryType
            })
        }



        // Change select categoryType
        if(name.name === 'forItemCategoryType' ) {
            let {dataVoucherAll} = this.state
            
            let dataVoucherNew = dataVoucherAll.filter(voucher => {
                if(voucher.itemsId === 'EMPTY' && voucher.forItemType == valueOptions.value) return voucher
            })
            
            // Set state
            this.setState({
                optionsCategoryType: valueOptions,
                resultItemsDiscount: dataVoucherNew,

            })
        }



        // Get all voucher items
        if(name.name === 'ALL_VORCHER_ITEMS' ) {
            let {dataVoucherAll} = this.state

            let dataVoucherNew = []
            
            if(optionsCategory === null ){
                dataVoucherNew = dataVoucherAll.filter(voucher => {
                    if(voucher.itemsId !== 'EMPTY') return voucher
                })
            }

            if(optionsCategory !== null ){
                dataVoucherNew = dataVoucherAll.filter(voucher => {
                    if(voucher.itemsId !== 'EMPTY' && voucher.forItemCategory === optionsCategory.value) return voucher
                })
            }

            if(optionsCategory !== null && optionsCategoryType !== null ){
                dataVoucherNew = dataVoucherAll.filter(voucher => {
                    if(voucher.itemsId !== 'EMPTY' && voucher.forItemCategory === optionsCategory.value && voucher.forItemType === optionsCategoryType.value ) return voucher
                })
            }
            
            // Set state
            this.setState({
                resultItemsDiscount: dataVoucherNew,
            })
           
        }
    }


    // Xl get data items Name handleGetDataNameItems
    handleGetDataNameItems = async(idShop,category,type,data) => {
        let arrayDataItems = await (await adminService.getItemsWhere({idShop, category, type})).data.data
        return arrayDataItems
    }


    // SustomStyle select react
    customStyles = {
        menu: (provided, state) => ({
            ...provided,
            zIndex: 99999,
        })
    }


    handleChangeVoucher = (data) => {
        console.log(data)
    }


    render() { 
    let {optionsIdShop,listAllShops,listAllCategory,optionsCategory,listAllCategoryType,optionsCategoryType,resultItemsDiscount} = this.state
    let {language} = this.props

    console.log( resultItemsDiscount)

    return (
        <>
            <div className='l-12'>
                <p className='heading-manage-user'><SwitchLanguage id='manageAdmin.items.listSort' /></p> 
            </div> 

            <div className='list_voucher'>
                <div className='list_select'>

                    <div className='form-input col l-3'>
                        <label className='input-label'><SwitchLanguage id='manageAdmin.form.nameShop'/></label>
                        <Select
                            value={optionsIdShop}
                            onChange={this.handlChangeSlelect}
                            options={listAllShops}
                            styles={this.customStyles}
                            name='idShop'
                            placeholder={<SwitchLanguage id='manageAdmin.form.nameShop'/>}
                        />
                    </div>


                    <div className='form-input col l-3'>
                        <label className='input-label'><SwitchLanguage id='manageAdmin.form.category'/></label>
                        <Select
                            isDisabled={optionsIdShop !== null ? false : true}
                            value={optionsCategory}
                            onChange={this.handlChangeSlelect}
                            options={listAllCategory}
                            styles={this.customStyles}
                            placeholder={<SwitchLanguage id='manageAdmin.form.planceholder_category'/>}
                            name="forItemCategory"
                        />
                    </div>


                    <div className='form-input col l-3'>
                        <label className='input-label'><SwitchLanguage id='manageAdmin.form.type'/></label>
                        <Select
                            isDisabled={optionsCategory !== null ? false : true}
                            value={optionsCategoryType}
                            onChange={this.handlChangeSlelect}
                            options={listAllCategoryType}
                            styles={this.customStyles}
                            placeholder={<SwitchLanguage id='manageAdmin.form.planceholder_type'/>}
                            name="forItemCategoryType"
                        />
                    </div>


                    <div className='form-input col l-3'>
                        <label className='input-label'></label>
                        <button className='button_show-items-discount' style={{opacity: optionsIdShop !== null ? '1' : '.5' }}
                            onClick={() => {optionsIdShop !== null && this.handlChangeSlelect('EMPTY', {name: 'ALL_VORCHER_ITEMS'})}}>
                            <SwitchLanguage id='manageAdmin.items.allItems'/>
                        </button>
                    </div>

                </div>
            </div> 
        
            <Voucher changeVoucher={this.handleChangeVoucher}  dataVoucher={resultItemsDiscount} />
        
        </>
    )}}


const mapStateToProps = state => {
    return {
        language: state.app.language,
        itemsAll: state.admin.items.itemsAll,

        allShops: state.admin.listShops.allShops,
        allcategory: state.admin.dataForm.category,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllCodeInToItems: (type) => dispatch(actions.getAllCodeInToItemsStart(type)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListVoucher);
