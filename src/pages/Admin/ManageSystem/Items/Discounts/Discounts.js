
import React, { Component } from 'react';
import { connect } from "react-redux";
import SwitchLanguage from '../../../../../SwitchLanguage';
import * as actions from '../../../../../store/action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserPen,faTrashCan,faXmark} from '@fortawesome/free-solid-svg-icons';
import {languages } from '../../../../../utils/constant'
import adminService from '../../../../../services/adminService';
import { toast } from 'react-toastify';
import Button from '../../../../../components/Button/Button';
import Select from 'react-select';
import {DISCOUNTTEXT, SEARCH} from '../../../../../utils/constant'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import'./Discounts.scss';
import SearchInput from '../../../../../components/SearchInput';
import generalHandling from '../../../../../utils/generalHandling';
import '../../../../../components/SearchInput/SearchInput.scss'
import InputSearch from '../../../../../components/SearchInput/InputSearch';
import TimePicker from 'react-time-picker';

class Discount extends Component {
    constructor(props){
        super(props);

        this.discount = React.createRef();

        this.state = {
            isShowButtonAddDisscount: false,
            isShowListInput: false,
            valueSetInputSearch: '',
            valueSetInputSelect: '',
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

            listDataOptions: {
                listAllShops: [],
                listSale:[],
                listDiscount:[],
                listAllCategory:[],
                listAllCategoryType:[],
                listAllCategoryTypeNotConvert:[],
                listItems:[],
                dataNameItems: {}
            },

            countInput: [],
            listDataResItems: [],
         
            dataTabelItemsDiscount: {
                idShop: '',
                codeReduce: '',
                unitPrice: '',
                startDay: '',
                startEnd: '',
                forItemCategory: '',
                forItemType: '',
                itemsId: '',
            }
        }
    }

    // Mount
    componentDidMount = async() => {
        await this.handleSetDataDiscount()
    }

    // State + props thay đổi mới re-reder
    shouldComponentUpdate(nextProps, nextState) {
        if (
            this.props.dataUser !== nextProps.dataUser ||   
            this.props.listSale !== nextProps.listSale ||             
            this.props.listAllShops !== nextProps.listAllShops ||             
            this.props.listAllCategory !== nextProps.listAllCategory ||             
            this.props.listAllCategoryType !== nextProps.listAllCategoryType ||   
            this.props.language !== nextProps.language ||   
            
            this.props.DCCData !== nextProps.DCCData ||             
            this.props.allShops !== nextProps.allShops ||   
            this.props.allcategory !== nextProps.allcategory ||   

            this.state.dataOptions !== nextState.dataOptions ||
            this.state.isShowButtonAddDisscount !== nextState.isShowButtonAddDisscount ||
            this.state.isShowListInput !== nextState.isShowListInput ||
            this.state.dataTabelItemsDiscount !== nextState.dataTabelItemsDiscount ||
            this.state.dataItems !== nextState.dataItems || 
            this.state.dataDiscount !== nextState.dataDiscount || 
            this.state.listDiscount !== nextState.listDiscount ||
            this.state.countInput !== nextState.countInput || 
            this.state.listDataOptions !== nextState.listDataOptions  
        ){
          return true;
        }
        return false;
    }

    // XL setData discount và (listSale,listAllShops,listAllCategory)
    handleSetDataDiscount = async (actions, dataCategory) => {

        let {language,DCCData,allShops,allcategory,listAllCategoryType} = this.props
        let {listDataOptions,listDiscount,dataOptions,dataTabelItemsDiscount} = this.state

        // Chuyển data về dạng options
        let listAllShops = generalHandling.handlConvertObject(allShops, 'LIST_SHOP',this.props.language)
        let listSale = generalHandling.handlConvertObject(DCCData, 'LIST_CATEGORY',this.props.language)
        let listAllCategory = generalHandling.handlConvertObject(allcategory, 'LIST_CATEGORY',this.props.language)

        let typeCategory = []
        if(listDataOptions.listAllCategoryTypeNotConvert.length > 0){
            typeCategory = generalHandling.handlConvertObject(listDataOptions.listAllCategoryTypeNotConvert, 'LIST_CATEGORY',this.props.language)
        }

       
        // Lấy data giảm giá
        let dataAllDiscountItems = await adminService.getAllDiscountItems('All')
        let arrayData = dataAllDiscountItems.data.data

        // Gán Gtri
        let dataValueEn = []
        let dataValueVi = []
        arrayData && arrayData.length > 0 && arrayData.map(item => {
            dataValueVi.push({value: item.codeVocher, label:  `${DISCOUNTTEXT.VN_DISCOUNT} ${item.limitVn} ${DISCOUNTTEXT.VN_DISCOUNT_SUB}`})
            dataValueEn.push({value: item.codeVocher, label: `${DISCOUNTTEXT.EN_DISCOUNT} ${item.limitUs} ${DISCOUNTTEXT.EN_DISCOUNT_SUB}`})
        })

        // Get list data
        let stateCoppyDiscount = languages.EN === language ? dataValueEn : dataValueVi

       
        // Set list name Items
        let dataNameItems = []
        for(let key in listDataOptions){
            if(key === 'dataNameItems'){
                const dataNameItemsLanguage = languages.EN === language ? listDataOptions[key].nameEn : listDataOptions[key].nameVi
                dataNameItems = dataNameItemsLanguage || []
            }
        }
        
        // Khi thay đổi ngôn ngữ + thay đổi options
        if( dataTabelItemsDiscount.forItemCategory !== '' || 
            dataTabelItemsDiscount.unitPrice !== ''       ||
            dataTabelItemsDiscount.forItemType !== ''     || 
            dataTabelItemsDiscount.itemsId !== ''
            ){
                let optionsDataCategory = []
                let optionsDataCategoryType = []
                let optionsDataUnitPrice = []
                let optionsDataNameItems = []

                // Options value category
                if(dataTabelItemsDiscount.forItemCategory !== '' && listAllCategory && listAllCategory.length > 0 ){
                    listAllCategory.map(item => {if(item.value === dataTabelItemsDiscount.forItemCategory)  optionsDataCategory.push(item)})
                } 
                                
                console.log(listAllCategoryType)
                // Options value categoryType
                if(dataTabelItemsDiscount.forItemType !== '' && listAllCategoryType && listAllCategoryType.length > 0){
                    let newListAllCategoryType = generalHandling.handlConvertObject(listDataOptions.listAllCategoryTypeNotConvert, 'LIST_CATEGORY',language)

                    newListAllCategoryType.map(item => {if(item.value === dataTabelItemsDiscount.forItemType)optionsDataCategoryType.push(item)})
                } 
                
                
                // Options value Discount
                if(dataTabelItemsDiscount.unitPrice !== '' && stateCoppyDiscount && stateCoppyDiscount.length > 0){
                    stateCoppyDiscount.map(item => {if(item.value === dataTabelItemsDiscount.unitPrice) optionsDataUnitPrice.push(item)})
                } 
                
                // IF Language === En
                if(dataTabelItemsDiscount.itemsId !== '' && languages.EN === language){
                    if(listDataOptions.dataNameItems && listDataOptions.dataNameItems.nameEn){
                        listDataOptions.dataNameItems.nameEn.map(item => {
                            if(item.value === dataTabelItemsDiscount.itemsId) optionsDataNameItems.push(item)
                        })
                    }
                }
                
                // IF Language === VN
                if(dataTabelItemsDiscount.itemsId !== '' && languages.VI === language){
                    if(listDataOptions.dataNameItems && listDataOptions.dataNameItems.nameVi){
                        listDataOptions.dataNameItems.nameVi.map(item => {
                            if(item.value === dataTabelItemsDiscount.itemsId) optionsDataNameItems.push(item)
                        })
                    }
                }

                console.log(optionsDataCategory,
                    optionsDataCategoryType,
                    optionsDataUnitPrice,
                    optionsDataNameItems)
                
                // Set state
                this.setState({
                    dataOptions: {
                        ...dataOptions,
                    optionsCategory: optionsDataCategory[0],
                    optionsCategoryType: optionsDataCategoryType[0],
                    optionsDiscount: optionsDataUnitPrice[0] || null,
                    optionsItems: optionsDataNameItems[0] || null
                }
            })
        } 
        
        // Set state
        this.setState({
            listDataOptions: {
                ...listDataOptions,
                listAllShops:listAllShops,
                listSale: listSale,
                listAllCategory:listAllCategory,
                listDiscount: stateCoppyDiscount,
                listItems: dataNameItems,
                listAllCategoryType: typeCategory
            }
        })
    }

    // Did update
    componentDidUpdate = async(prevProps, prevState) => {

        // Thay đổi ngôn ngữ
        if(prevProps.language !== this.props.language){
            await this.handleSetDataDiscount()
        }
    }

    // Xl change input select
    handlChangeSlelect = async (valueOptions, name) => {

        let stateItemsDiscount = this.state.dataTabelItemsDiscount
        let {forItemCategory} = this.state.dataTabelItemsDiscount
        let dataOptionsCoppy = this.state.dataOptions
        let {listDataOptions} = this.state

        // Change select shop
        if(name.name === 'idShop') {  
            
            let dataResultSearchItem = []
            if(forItemCategory !== '' && stateItemsDiscount.forItemType === ''){
                dataResultSearchItem =  await this.handleGetDataNameItems(valueOptions.value,forItemCategory, 'none')
            }
            if(forItemCategory !== '' && stateItemsDiscount.forItemType !== ''){
                dataResultSearchItem =  await this.handleGetDataNameItems(valueOptions.value, forItemCategory,stateItemsDiscount.forItemType)
            }
            

            this.setState({
                listDataResItems: dataResultSearchItem,
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
            let dataResultSearchItem
            let listAllCategoryType = listDataOptions.listAllCategoryTypeNotConvert

            // Get data categoryType + convert Object select
            listAllCategoryType = await this.props.getAllCodeInToItems(valueOptions.value)
            let newListAllCategoryType = generalHandling.handlConvertObject(listAllCategoryType, 'LIST_CATEGORY',this.props.language)


            if(stateItemsDiscount.forItemType === ''){
                dataResultSearchItem =  await this.handleGetDataNameItems(stateItemsDiscount.idShop, valueOptions.value, 'none')
            }
            if(stateItemsDiscount.forItemType !== ''){
                dataResultSearchItem =  await this.handleGetDataNameItems(stateItemsDiscount.idShop, valueOptions.value, stateItemsDiscount.forItemType)
            }


            // Set state
            this.setState({
                listDataOptions: {
                    ...listDataOptions,
                    listAllCategoryType: newListAllCategoryType,
                    listAllCategoryTypeNotConvert: listAllCategoryType
                },
                listDataResItems: dataResultSearchItem,

                dataOptions: {
                    ...dataOptionsCoppy,
                    optionsCategory: valueOptions,
                    optionsCategoryType: null,

                },
                dataTabelItemsDiscount: {
                    ...stateItemsDiscount,
                    forItemCategory: valueOptions.value
                }
            })
        }

        // Change select categoryType
        if(name.name === 'forItemCategoryType' ) {
            let dataResultSearchItem =  await this.handleGetDataNameItems(dataOptionsCoppy.optionsIdShop.value, forItemCategory, valueOptions.value)
            
            // Set state
            this.setState({
                listDataResItems: dataResultSearchItem,
                dataOptions: {
                    ...dataOptionsCoppy,
                    optionsCategoryType: valueOptions,
                },
                dataTabelItemsDiscount: {
                    ...stateItemsDiscount,
                    forItemType: valueOptions.value
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

    // Xl get data items Name handleGetDataNameItems
    handleGetDataNameItems = async(idShop,category,type,data) => {
        let arrayDataItems = await (await adminService.getItemsWhere({idShop, category, type})).data.data
        return arrayDataItems
    }

    // Select date
    handleChangeSelectDate = (date,name) => {
        let stateItemsDiscount = this.state.dataTabelItemsDiscount
        let dataOptionsCoppy = this.state.dataOptions

        const dateSet = new Date(date).toString()

        console.log('Năm :',new Date(dateSet).getFullYear())
        console.log('Tháng :',new Date(dateSet).getMonth() + 1 )
        console.log('Ngày :',new Date(dateSet).getDate())
        console.log('Giờ :',new Date(dateSet).getHours())
        console.log('Phút :',new Date(dateSet).getMinutes())
       




        // Select start day
        if(name === 'startDay'){
            this.setState({
                dataOptions: {
                    ...dataOptionsCoppy,
                    optionsDayStart: date,
                },
                dataTabelItemsDiscount: {
                    ...stateItemsDiscount,
                    startDay: dateSet
                }
            })
        }

        // Selcet endDay
        if(name === 'endDay'){
            this.setState({
                dataOptions: {
                    ...dataOptionsCoppy,
                    optionsDayEnd: date,
                },
                dataTabelItemsDiscount: {
                    ...stateItemsDiscount,
                    startEnd: dateSet
                }
            })
        }
    }

    // Handle change input add + delete 
    handlecreateListinput = async(type) => {

        // Add new discount
        if(type === 'CREATE'){
            this.setState({
                isShowButtonAddDisscount: !this.state.isShowButtonAddDisscount,
            })
        }

        // Add new discount
        if(type === 'ADD'){
            let {dataTabelItemsDiscount} = this.state
            

            
        }

        // Hide Form Discount
        if(type === 'DELETE'){
            this.setState({
                isShowButtonAddDisscount: false,
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

    // Get data items from search
    handleGetDataComponentSearch = async(items,typeAction) => {
        
        let valueSetInputSearch = ''
        let valueSetInputSelect = ''
        
        
        let {dataTabelItemsDiscount,listDataOptions,dataOptions} = this.state
        let {language} = this.props
        let id = items.idItems || ''
        
        let nameItemsAdd = languages.EN === language ? items.nameEn : items.name

        // Loop get options category
        let newOptionsCategory = listDataOptions.listAllCategory.filter(item => {
            if(item.value === items.category) return item
        })

        // Get data categoryType + convert Object select
        let listAllCategoryType = await this.props.getAllCodeInToItems(newOptionsCategory[0].value)


        let newListAllCategoryTypeConvertObject = generalHandling.handlConvertObject(listAllCategoryType, 'LIST_CATEGORY',language)

        // Loop get options categoryType
        let newOptionsCategoryType = newListAllCategoryTypeConvertObject.filter(item => {
            if(item.value === items.type) return item
        })

        // Add action reset value
        let dataResultSearchItem =  await this.handleGetDataNameItems(items.idShop, items.category, items.type)
        
        if(typeAction === 'SELECT_ITEMS_ARRAY'){
            dataResultSearchItem.map(item => item.actions = 'NOT_SET_VALUE')
        }
        if(typeAction === 'SEARCH_CODE_ITEM'){
            dataResultSearchItem.map(item => item.actions = '')
        }

        // Set state
        this.setState({
            valueSetInputSearch: valueSetInputSearch,
            valueSetInputSelect: valueSetInputSelect,
            listDataResItems: dataResultSearchItem,
            listDataOptions: {
                ...listDataOptions,
                listAllCategoryType: newListAllCategoryTypeConvertObject,
                listAllCategoryTypeNotConvert: listAllCategoryType
            },
            dataOptions: {
                ...dataOptions,
                optionsCategory: newOptionsCategory[0],
                optionsCategoryType: newOptionsCategoryType[0]
            },
            dataTabelItemsDiscount: {
                ...dataTabelItemsDiscount,
                itemsId: id,
                forItemType: newOptionsCategoryType[0].value,
                forItemCategory: newOptionsCategory[0].value
            },
        })

        return dataResultSearchItem
    }

    render() {

    let {language} = this.props
    let {listDataResItems,valueSetInputSearch,isShowButtonAddDisscount} = this.state
    let {optionsIdShop,optionsSele,optionsDayStart,optionsDayEnd,optionsCategory,optionsCategoryType,optionsDiscount} = this.state.dataOptions
    let {listSale,listAllShops,listAllCategory,listAllCategoryType,listDiscount} = this.state.listDataOptions


        
    return (
        <>
            <div className='l-12'>
                <p className='heading-manage-user'><SwitchLanguage id='manageAdmin.items.discount' /></p> 
            </div> 

            { isShowButtonAddDisscount &&
                <div className='list_all_discount' >
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
                            <InputSearch
                                classWraper='form-input col l-6'
                                idSwitchLanguage='manageAdmin.items.search-code-items'
                                TYPE_INPUT='SEARCH_CODE_ITEM'
                                TABEL={SEARCH.TABEL_SEARCH} 
                                TYPE={SEARCH.TYPE_SEARCH} 
                                IDSHOP={optionsIdShop.value} 
                                handleGetDataComponentSearch={this.handleGetDataComponentSearch}
                                setValueSearchCode={valueSetInputSearch}
                            />
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
                    {listDataResItems && listDataResItems.length > 0 &&  
                        <>
                            <InputSearch
                                classWraper='form-input col l-3'
                                idSwitchLanguage='manageAdmin.items.select-items'
                                TYPE_INPUT='SELECT_ITEMS_ARRAY'
                                handleGetDataComponentSearch={this.handleGetDataComponentSearch}
                                dataArrayItemsSelect={listDataResItems} 
                            />
                        </>
                    }


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
                            showTimeSelect
                            autoComplete='off'
                            timeFormat="p"
                            timeIntervals={30}
                            dateFormat="Pp"
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
                            showTimeSelect
                            autoComplete='off'
                            timeFormat="p"
                            timeIntervals={30}
                            dateFormat="Pp"
                        />
                    </div>

                </div>
            }
                
                <div className='col l-12'> 
                    {!isShowButtonAddDisscount && 
                        <span style={{display: 'inline-block'}} onClick={() => this.handlecreateListinput('CREATE')}>
                            <Button type={'create'} 
                                content={ <SwitchLanguage id='manageAdmin.form.craeteDiscount' /> }
                            />
                        </span>
                    } 

                    {isShowButtonAddDisscount && 
                        <div className='list_input '>
                            <span style={{display: 'inline-block'}} 
                                onClick={() => optionsIdShop && optionsSele && optionsDayStart && optionsDayEnd && optionsCategory && optionsDiscount && 
                                this.handlecreateListinput('ADD')}>

                                <Button type={optionsIdShop && optionsSele && optionsDayStart && optionsDayEnd && optionsCategory && optionsDiscount ? 
                                    'submit-form-data' : 'ban-form-data'} 
                                    content={<SwitchLanguage id='manageAdmin.form.addDiscount' />}
                                />
                            </span>

                            <span className='margin_between'></span>

                            <span style={{display: 'inline-block'}} onClick={() => this.handlecreateListinput('DELETE')}>
                                <Button type={'submit-form-data'} 
                                    content={<SwitchLanguage id='manageAdmin.form.hide' />}
                                />
                            </span>
                        </div>
                    } 
                </div>

        </>
    )}
} 


const mapStateToProps = state => {
    
    return {
        itemsAll: state.admin.items.itemsAll,
        language: state.app.language,

        DCCData: state.admin.listAllCodeItems.DCCData,
        allShops: state.admin.listShops.allShops,
        allcategory: state.admin.dataForm.category,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDataItems: (type) => dispatch(actions.getDataItemsStart(type)),
        getAllCodeInToItems: (type) => dispatch(actions.getAllCodeInToItemsStart(type)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Discount);