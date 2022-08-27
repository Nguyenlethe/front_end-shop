
import React, { Component } from 'react';
import { connect } from "react-redux";
import SwitchLanguage from '../../../../../SwitchLanguage';
import * as actions from '../../../../../store/action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserPen,faTrashCan,faXmark} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import {languages } from '../../../../../utils/constant'
import adminService from '../../../../../services/adminService';
import { toast } from 'react-toastify';
import Button from '../../../../../components/Button/Button';
import Select from 'react-select';
import moment from 'moment';
import {DISCOUNTTEXT, SEARCH} from '../../../../../utils/constant'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import'./Discounts.scss';
import SearchInput from '../../../../../components/SearchInput';

class ListItems extends Component {
    constructor(props){
        super(props);
        this.state = {

            isShowListInput: false,

            dataOptions: {
                optionsIdShop: null,
                optionsSele: null,
                optionsDayStart: null,
                optionsDayEnd: null,
                optionsCategory: null,
                optionsCategoryType: null,
                optionsItems: null,
                optionsDiscount: null,
            },

            listDiscount: [],
            countInput: [],
            listItems: [],
         
            dataTabelItemsDiscount: {
                idShop: '',
                codeReduce: '',
                unitPrice: '',
                startDay: '',
                startEnd: '',
                forItemCategory: '',
                forItemType: '',
                itemsId: '',
            },
            dataItems: {
                valueEn: [],
                valueVi: []
            },
            dataDiscount: {
                valueEn: [],
                valueVi: []
            }


        }
    }





 
    componentDidMount = async() => {
        await this.handleSetDataDiscount()
    }

    // XL setData discount
    handleSetDataDiscount = async () => {
        let {language} = this.props
        let {valueEn, valueVi} = this.state.listDiscount
        let dataAllDiscountItems = await adminService.getAllDiscountItems('All')
        let arrayData = dataAllDiscountItems.data.data

        let dataValueEn = []
        let dataValueVi = []
        arrayData && arrayData.length > 0 && arrayData.map(item => {
            dataValueVi.push({value: item.codeVoucher, label:  `${DISCOUNTTEXT.VN_DISCOUNT} ${item.priceLimitVND} ${DISCOUNTTEXT.VN_DISCOUNT_SUB}`})
            dataValueEn.push({value: item.codeVoucher, label: `${DISCOUNTTEXT.EN_DISCOUNT} ${item.priceLimitUSD} ${DISCOUNTTEXT.EN_DISCOUNT_SUB}`})
        })

        let stateCoppyDiscount = languages.EN === language ? dataValueEn : dataValueVi


        this.setState({
            dataDiscount: {
                valueEn: dataValueEn,
                valueVi: dataValueVi
            },
            listDiscount: stateCoppyDiscount
        })

        return stateCoppyDiscount
    }


    componentDidUpdate = async(prevProps, prevState) => {
        let {listAllCategory,listAllCategoryType,language} = this.props
        let {forItemCategory,forItemType,itemsId,unitPrice} = this.state.dataTabelItemsDiscount
        let {listItems} = this.state
        let {dataOptions,dataItems} = this.state
        
        if(prevProps.language !== this.props.language){
            // Get list category
            let dataAllCategory = [...listAllCategory]
            
            var newForItemCategory = []
            var newForItemCategorys = []
            var newItemsId = []
            let dataChangeDiscount = []


            if(forItemCategory){
                // Map get options actice
                dataAllCategory.map(item => {
                    if(item.value === forItemCategory){
                        newForItemCategory.push(item)
                    }
                })
    
                // Post data get data categoryType
                await this.props.handlChangeSlelect(newForItemCategory[0], 'category')
                let arrListAllCategoryType = this.props.listAllCategoryType

                 // Map get options actice
                await arrListAllCategoryType && arrListAllCategoryType.length > 0 && arrListAllCategoryType.map(item => {
                    if(item.value === forItemType){
                        newForItemCategorys.push(item)
                    }
                })

                // Nếu categoryType được chọn
                if(newForItemCategorys.length > 0){
                    var dataItemsWhere = language === languages.EN ? dataItems.valueEn : dataItems.valueVi
                }

                // get data options items 
                if(dataOptions.optionsItems !== null){
                    dataItemsWhere && dataItemsWhere.length > 0 && dataItemsWhere.map(item => {
                        if(item.value === itemsId){
                            newItemsId.push(item)
                        }
                    })
                }


            }
            
            let dataRes = await this.handleSetDataDiscount()
            if(dataOptions.optionsDiscount !== null){
                dataRes.map(item => {
                    if(item.value === unitPrice){
                        dataChangeDiscount.push(item)
                    }
                })
            }
            
           

            // SetState
            this.setState({
                dataOptions: {
                    ...dataOptions,
                    optionsCategory: newForItemCategory[0],
                    optionsCategoryType: newForItemCategorys[0],
                    optionsItems: newItemsId[0] || [],
                    optionsDiscount: dataChangeDiscount[0] || []
                },
                listItems: dataItemsWhere || [],
            })



        }


       


    }


    // State + props thay đổi mới re-reder
    shouldComponentUpdate(nextProps, nextState) {
        if (
            this.props.listAllShops !== nextProps.listAllShops || 
            this.props.listSale !== nextProps.listSale || 
            this.props.listAllCategory !== nextProps.listAllCategory || 
            this.props.listAllCategoryType !== nextProps.listAllCategoryType || 
            this.state.countInput !== nextState.countInput ||
            this.state.dataDiscount !== nextState.dataDiscount ||
            this.state.isShowListInput !== nextState.isShowListInput ||
            this.state.dataOptions !== nextState.dataOptions  || 
            this.state.dataTabelItemsDiscount !== nextState.dataTabelItemsDiscount  
        ){
          return true;
        }
        return false;
    }


    // Xl change input select
    handlChangeSlelect = async (valueOptions, name) => {
        let stateItemsDiscount = this.state.dataTabelItemsDiscount
        let {forItemCategory} = this.state.dataTabelItemsDiscount
        let {language} = this.props
        let dataOptionsCoppy = this.state.dataOptions
    

        // Change select shop
        if(name.name === 'idShop') {   
            
            console.log(valueOptions)

            this.setState({
                dataOptions: {
                    ...dataOptionsCoppy,
                    optionsIdShop: valueOptions,
                    
                },
                dataTabelItemsDiscount: {
                    ...stateItemsDiscount,
                    idShop: valueOptions.value
                }
            })
        }
   

        // Change select discount
        if(name.name === 'discount') {
            
           this.setState({
            dataOptions: {
                ...dataOptionsCoppy,
                optionsSele: valueOptions,
            },
                dataTabelItemsDiscount: {
                    ...stateItemsDiscount,
                    codeReduce: valueOptions.value
                }
            })
        }


        // Change select category
        if(name.name === 'forItemCategory') {
            this.props.handlChangeSlelect(valueOptions, 'category')

            
            this.setState({
                dataOptions: {
                    ...dataOptionsCoppy,
                    optionsCategory: valueOptions,
                },
                 dataTabelItemsDiscount: {
                    ...stateItemsDiscount,
                    forItemCategory: valueOptions.value
                }
            })
        }


        // Change select categoryType
        if(name.name === 'forItemCategoryType' ) {

            let dataItems = await adminService.getItemsWhere({category: forItemCategory, type: valueOptions.value})
            let arrayDataItems = dataItems.data.data


            let dataItemsWhere = []
            arrayDataItems && arrayDataItems.length > 0 && arrayDataItems.map(item => {

                let labelData =  languages.EN === language ? item.nameEn.length > 35 ?  `${item.nameEn.slice(0, 25)}...` : item.nameEn+'...'  :  item.name.length > 35 ?  `${item.name.slice(0, 23)}...` : item.name+'...'
                dataItemsWhere.push({value: item.idItems ,  label: labelData})
            })

            let dataValueEn = []
            arrayDataItems && arrayDataItems.length > 0 && arrayDataItems.map(item => {
                dataValueEn.push({value: item.idItems ,  label: item.nameEn.length > 35 ?  `${item.nameEn.slice(0, 25)}...` : item.nameEn+'...'})
            })

            let dataValueVi = []
            arrayDataItems && arrayDataItems.length > 0 && arrayDataItems.map(item => {
                dataValueVi.push({value: item.idItems ,  label:item.name.length > 35 ? `${item.name.slice(0, 25)}...` : item.name+'...'})
            })


           

            
            this.setState({
                dataOptions: {
                    ...dataOptionsCoppy,
                    optionsCategoryType: valueOptions,
                },
                listItems: dataItemsWhere,
                 dataTabelItemsDiscount: {
                    ...stateItemsDiscount,
                    forItemType: valueOptions.value
                },
                dataItems: {
                    valueEn: dataValueEn,
                    valueVi: dataValueVi
                }
            })
        }


        // Change get value items
        if(name.name === 'idItems') { 
            
            this.setState({
                dataOptions: {
                    ...dataOptionsCoppy,
                    optionsItems: valueOptions,
                },
                 dataTabelItemsDiscount: {
                    ...stateItemsDiscount,
                    itemsId: valueOptions.value
                }
            })
        }


        // Chnage voucher
        if(name.name === 'voucher'){

            this.setState({
                dataOptions: {
                    ...dataOptionsCoppy,
                    optionsDiscount: valueOptions,
                },
                dataTabelItemsDiscount: {
                    ...stateItemsDiscount,
                    unitPrice: valueOptions.value
                }
            })
        }

    }

    // Select date
    handleChangeSelectDate = (date,name) => {
        let stateItemsDiscount = this.state.dataTabelItemsDiscount
        let dataOptionsCoppy = this.state.dataOptions

        if(name === 'startDay'){
            this.setState({
                dataOptions: {
                    ...dataOptionsCoppy,
                    optionsDayStart: date,
                },
                dataTabelItemsDiscount: {
                    ...stateItemsDiscount,
                    startDay: date
                }
            })
        }


        if(name === 'endDay'){
            this.setState({
                dataOptions: {
                    ...dataOptionsCoppy,
                    optionsDayEnd: date,
                },
                dataTabelItemsDiscount: {
                    ...stateItemsDiscount,
                    startEnd: date
                }
            })
        }
    }

    // Handle change input add + delete 
    handlecreateListinput = (type) => {
        let {countInput} = this.state
        let countInputCoppy = countInput

        if(type === 'ADD'){
            countInputCoppy.push(1)
            this.setState({
                countInput: [...countInputCoppy]
            })
        }

        if(type === 'DLETE'){
            this.setState({
                countInput: []
            })
        }
    }

    // SustomStyle select react
    customStyles = {
        menu: (provided, state) => ({
            ...provided,
            zIndex: 99999,
        })
    }
  

    render() {
        let {countInput,listItems,listDiscount} = this.state
        let {optionsIdShop,optionsSele,optionsDayStart,optionsDayEnd,optionsCategory,optionsItems,optionsCategoryType,optionsDiscount} = this.state.dataOptions
        let {idShop,codeReduce,startDay,startEnd}  = this.state.dataTabelItemsDiscount
        let {language,listSale,listAllShops,listAllCategory,listAllCategoryType} = this.props

        // console.log(idShop,codeReduce, new Date(startDay).getDay(), new Date(startEnd).getDay())
       


    return (
        <>
            <div className='list_all_discount'>


                {/* Select Shop */}
                {listAllShops && listAllShops.length > 0 && 
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
                }

                {optionsIdShop !== null &&
                    <div className='form-input col l-3'>
                        <label className='input-label'><SwitchLanguage id='manageAdmin.form.nameShop'/></label>
                        <SearchInput tabel={SEARCH.TABELSEARCH} type={SEARCH.TYPESEARCH} idShop={optionsIdShop.value}/>
                    </div>
                } 


                {/* Select mã giảm */}
                {listSale && listSale.length > 0 && 
                    <div className='form-input col l-3'>
                        <label className='input-label'><SwitchLanguage id='manageAdmin.form.sale'/></label>
                        <Select
                            value={optionsSele}
                            onChange={this.handlChangeSlelect}
                            options={listSale}
                            styles={this.customStyles}
                            name='discount'
                            isDisabled={optionsIdShop ? false : true}
                            placeholder={<SwitchLanguage id='manageAdmin.form.planceholder_sale'/>}
                        />
                    </div>
                }


                 {/* Select mã giảm */}
                 {listSale && listSale.length > 0 && 
                    <div className='form-input col l-3'>
                        <label className='input-label'><SwitchLanguage id='manageAdmin.form.ifDiscount'/></label>
                        <Select
                            value={optionsDiscount}
                            onChange={this.handlChangeSlelect}
                            options={listDiscount}
                            styles={this.customStyles}
                            name='voucher'
                            placeholder={<SwitchLanguage id='manageAdmin.form.planceholder_ifDiscount'/>}
                        />
                    </div>
                }

                {/* Category */}
                <div className='form-input col l-3'>
                    <label className='input-label'><SwitchLanguage id='manageAdmin.form.category'/></label>
                    <Select
                        value={optionsCategory}
                        onChange={this.handlChangeSlelect}
                        options={listAllCategory}
                        styles={this.customStyles}
                        placeholder={<SwitchLanguage id='manageAdmin.form.planceholder_category'/>}
                        name="forItemCategory"
                    />
                </div>

                {/* Type */}
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

                {/* items */}
                <div className='form-input col l-3'>
                    <label className='input-label'><SwitchLanguage id='manageAdmin.form.nameItemsListItems'/></label>
                    <Select
                        isDisabled={optionsCategory && optionsCategoryType !== null ? false : true}
                        value={optionsItems}
                        onChange={this.handlChangeSlelect}
                        options={listItems}
                        styles={this.customStyles}
                        placeholder={<SwitchLanguage id='manageAdmin.form.nameItemsListItems'/>}
                        name="idItems"
                    />
                </div>

                {/* Select start Date */}
                <div className='form-input col l-3'>
                    <label className='input-label'><SwitchLanguage id='manageAdmin.form.startDay'/></label>
                    <DatePicker 
                        selected={optionsDayStart} 
                        minDate={new Date()}
                        onChange={(date) =>  this.handleChangeSelectDate(date,'startDay')} 
                        className='fixCss'
                        name='startDay'
                        placeholderText={languages.EN === language ? 'Select day start' : 'Chọn ngày bắt đầu áp dụng'}
                    />
                </div>


                {/* Select start Date */}
                <div className='form-input col l-3'>
                    <label className='input-label'><SwitchLanguage id='manageAdmin.form.endDay'/></label>
                    <DatePicker 
                        disabled={optionsDayStart ? false : true}
                        selected={optionsDayEnd} 
                        minDate={optionsDayStart}
                        onChange={(date) =>  this.handleChangeSelectDate(date,'endDay')} 
                        className='fixCss'
                        placeholderText={languages.EN === language ? 'Select end start' : 'Chọn ngày kết thúc áp dụng'}
                    />
                </div>

                

                <div className='col l-12'>
                    {countInput && countInput.length > 0 && 
                        <span style={{display: 'inline-block', margin: '0 20px 0 0'}} onClick={() => this.handlecreateListinput('DLETE')} >
                            <Button type='submit-form-data' content={<SwitchLanguage id='manageAdmin.form.deleteAllListInput'/>}/>
                        </span>
                    }
                    
                    <span style={{display: 'inline-block'}} onClick={() => this.handlecreateListinput('ADD')}>
                        <Button type='create' content={<SwitchLanguage id='manageAdmin.form.craeteDiscount'/>}/>
                    </span>
                </div>

            </div>
        </>
    )}
} 


const mapStateToProps = state => {
    
    return {
        itemsAll: state.admin.items.itemsAll,
        language: state.app.language,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDataItems: (type) => dispatch(actions.getDataItemsStart(type)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItems);