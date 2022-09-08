
import React, { Component } from 'react';
import { connect } from "react-redux";
import SwitchLanguage from '../../SwitchLanguage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass,faSpinner,faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import {languages,SEARCH,DISCOUNTTEXT} from '../../utils/constant'

import * as actions from '../../store/action';
import adminService from '../../services/adminService';

import'./SearchInput.scss';
class InputSearch extends Component {
    constructor(props){
        super(props);
        this.inputSearchCode = React.createRef();
        this.state = {
            itemStorage: [],
            isLoadSearchItemsCode: false,
            value: '',
            dataSearchItemsCode: {
                isShowDataSearchCodeItems: false,
                valueInputSearchCodeItems: '',
                listDataSearchCodeItems: []
            },

            dataSelectItemsName: {
                isShowListItemsSelect: false,
                valueInputSelectArray: '',
                listDataItemsSelect: [],
                resultDataSearchName: []
            }

        }
    }
    
    
    // Khi component did
    componentWillUnmount() {
      
    }

    // Component DidMount 
    componentDidMount = async() => {
        let {dataArrayItemsSelect} = this.props
        let {dataSelectItemsName,dataSearchItemsCode} = this.state


        // Check DK set State
        if(dataArrayItemsSelect && dataArrayItemsSelect.length > 0){
            this.setState({
                dataSelectItemsName: {
                    ...dataSelectItemsName,
                    listDataItemsSelect: dataArrayItemsSelect,
                }
            })
        }
        
    }

    // Component Update
    componentDidUpdate = async(prevProps, prevState) => {
        let {itemStorage,dataSearchItemsCode,dataSelectItemsName} = this.state
        let {valueInputSearchCode,dataArrayItemsSelect,language} = this.props

        // Khi language thay đổi
        if(prevProps.language !== this.props.language){
            this.handleAddItems(itemStorage,'CHANGE_LANGUAGE')
        }

        // Khi select items 
        if(prevProps.valueInputSearchCode !== this.props.valueInputSearchCode){
            this.setState({
                dataSearchItemsCode: {
                    ...dataSearchItemsCode,
                    valueInputSearchCodeItems: ''
                }
            })
        }

        // Khi Array data items select thay đổi
        if(prevProps.dataArrayItemsSelect !== this.props.dataArrayItemsSelect){
            
            if(dataArrayItemsSelect[0].actions !== 'NOT_SET_VALUE'){
                this.setState({
                    dataSelectItemsName: {
                        ...dataSelectItemsName,
                        valueInputSelectArray: '',
                        listDataItemsSelect: dataArrayItemsSelect,
                    }
                })
            }
        }
    }

 
    // changeInput
    handleChangeInputSearch = (value, type) => {
        let {dataSearchItemsCode} = this.state

        if(type === 'SEARCH_CODE_ITEM'){
            // Set State
            this.setState({
                dataSearchItemsCode: {
                    ...dataSearchItemsCode,
                    valueInputSearchCodeItems: value,
                }
            })
        }

        if(type === 'SELECT_ITEMS_ARRAY'){
            let {listDataItemsSelect} = this.state.dataSelectItemsName
            let {language} = this.props
            var valueInput = value
        
            let dataListSearchArray = []
            listDataItemsSelect.map(item => {
    
                // Tiếng Việt
                if(item.name && languages.VI === language){
                    let string = item.name
    
                    if(string.toLowerCase().indexOf(valueInput.toLowerCase()) >= 0)
                    {   
                        if(dataListSearchArray.length === 0){
                            dataListSearchArray.push(item)
                        }else{
                            dataListSearchArray.map(element => {
                                if(element.idItems !== item.idItems){
                                    dataListSearchArray.push(item)
                                }
                            })
                        }
                    }
                }
    
                // Tiếng Anh
                if(item.nameEn && languages.EN === language){
                    if(item.nameEn.toLowerCase().indexOf(valueInput) === 0 ||item.nameEn.toLowerCase().indexOf(valueInput) > 0)
                    {   
                        if(dataListSearchArray.length === 0 ){
                            dataListSearchArray.push(item)
                        }else{
                            dataListSearchArray.map(element => {
                                if(element.idItems !== item.idItems){
                                    dataListSearchArray.push(item)
                                }
                            })
                        }
                    }
                }
            })
    
            // Set Gtri
            dataListSearchArray = dataListSearchArray.length === 0 ? [] : [...new Set(dataListSearchArray)]
    
            // Set state
            this.setState({
                dataSelectItemsName: {
                    ...this.state.dataSelectItemsName,
                    resultDataSearchName: dataListSearchArray,
                    valueInputSelectArray: valueInput,
                }
            })
        }
    }
  
    // Search code items
    handleGetDataItems = async (value, type) => {
        let {dataSearchItemsCode} = this.state
        let {TABEL,TYPE,IDSHOP} = this.props

        this.setState({
            isLoadSearchItemsCode: true
        })

        // Get data DB
        let res = await adminService.searchData({TABEL,TYPE,value,IDSHOP,})

        // Set state
        if(res && res.data && res.data.data){
            let data = res.data.data || []

            if(type === 'SEARCH_CODE_ITEM'){
                const node = this.inputSearchCode.current
                node.focus()
    
                this.setState({
                    isLoadSearchItemsCode: false,
                    dataSearchItemsCode: {
                        ...dataSearchItemsCode,
                        isShowDataSearchCodeItems: true,
                        listDataSearchCodeItems: data,
                    }
                })
            }

        }
    }


    // blur input
    handleBlurInput = (typeInput) => {
        let {dataSearchItemsCode,dataSelectItemsName} = this.state

        if(typeInput === 'SEARCH_CODE_ITEM') {
            this.setState({
                dataSearchItemsCode: {
                    ...dataSearchItemsCode,
                    isShowDataSearchCodeItems: false,
                }
            })
        }
        if(typeInput === 'SELECT_ITEMS_ARRAY'){
            this.setState({
                dataSelectItemsName: {
                    ...dataSelectItemsName,
                    isShowListItemsSelect: false,
                }
            })
        }
    }

    // Focus input
    handleFocusInput = (typeInput) => {
        let {dataSelectItemsName} = this.state

        if(typeInput === 'SELECT_ITEMS_ARRAY'){
            this.setState({
                dataSelectItemsName: {
                    ...dataSelectItemsName,
                    isShowListItemsSelect: true,
                }
            })
        }
    }
   

    // Click add items
    handleAddItems = async(items,actions) => {
        let {dataSearchItemsCode,dataSelectItemsName} = this.state

        if(items !== []){
            let {language} = this.props

            let nameItemsAdd = languages.EN === language ? items.nameEn : items.name
            
            if(actions === 'SEARCH_CODE_ITEM' || actions === 'SELECT_ITEMS_ARRAY' ){
                await this.props.handleGetDataComponentSearch(items,actions)
                
                if(actions === 'SEARCH_CODE_ITEM'){
                    nameItemsAdd = nameItemsAdd.slice(0, 58)+ '...'

                    // Set state
                    this.setState({
                        itemStorage: items,
                        dataSearchItemsCode: {
                            ...dataSearchItemsCode,
                            valueInputSearchCodeItems: nameItemsAdd,
                            isShowDataSearchCodeItems: false,
                        }
                    }) 
                }


                if(actions === 'SELECT_ITEMS_ARRAY'){
                    this.props.setValueInputEmpty()
                    nameItemsAdd = nameItemsAdd.slice(0, 30)+ '...'

                    // Set state
                    this.setState({
                        itemStorage: items,
                        dataSelectItemsName: {
                            ...this.state.dataSelectItemsName,
                            valueInputSelectArray: nameItemsAdd,
                            isShowListItemsSelect: false,
                        }
                    }) 
                }
            }


            // Khi change language
            if(actions === 'CHANGE_LANGUAGE'){    
                if(dataSearchItemsCode.valueInputSearchCodeItems !== ''){
                    // Set state
                    this.setState({
                        dataSearchItemsCode: {
                            ...dataSearchItemsCode,
                            valueInputSearchCodeItems: nameItemsAdd,
                            isShowDataSearchCodeItems: false,
                        }
                    }) 
                }

                if(dataSelectItemsName.valueInputSelectArray !== ''){
                    // Set state
                    this.setState({
                        dataSelectItemsName: {
                            ...this.state.dataSelectItemsName,
                            valueInputSelectArray: nameItemsAdd,
                            isShowListItemsSelect: false,
                        }
                    }) 
                }
            }


        }
    }

  
    // handle Reset Value Input Search Code Items 
    handleResetValueInputSearchCodeItems = () => {
        let {dataSearchItemsCode} = this.state
      

        this.setState({
            dataSearchItemsCode: {
                ...dataSearchItemsCode,
                valueInputSearchCodeItems: ''
            }
        })
    }
 
  
    render() {

    let {isLoadSearchItemsCode} = this.state
    let {valueInputSearchCodeItems,isShowDataSearchCodeItems,listDataSearchCodeItems} = this.state.dataSearchItemsCode
    let { isShowListItemsSelect,listDataItemsSelect,resultDataSearchName,valueInputSelectArray} = this.state.dataSelectItemsName
    let {TYPE_INPUT,classWraper,idSwitchLanguage,language} = this.props


    console.log(listDataItemsSelect)

    return (
        <>

            <div className={classWraper}>
            <div className='search' >
            <div className='input_search' >

              
            {TYPE_INPUT === 'SEARCH_CODE_ITEM' &&
                <>
                    <SwitchLanguage id={idSwitchLanguage}/>
                    <input className='input search' name='search' type='text' autoComplete="off"  ref={this.inputSearchCode}
                       value={valueInputSearchCodeItems} placeholder={languages.EN === language ? 'Search items' : 'Tìm sản phẩm '}
                       onChange={(e) => this.handleChangeInputSearch(e.target.value, TYPE_INPUT)} onBlur={() => this.handleBlurInput(TYPE_INPUT)}
                    />
                    <span className='icon_load_re-set'>
                        {isLoadSearchItemsCode && <FontAwesomeIcon className='rotate' icon={faSpinner}/>}

                        {valueInputSearchCodeItems !== '' && 
                            <span  onClick={() => this.handleResetValueInputSearchCodeItems()}>
                                {!isLoadSearchItemsCode && <FontAwesomeIcon icon={faCircleXmark} />} 
                            </span>
                        } 
                    </span>

                    <FontAwesomeIcon className='icon-search'
                        icon={faMagnifyingGlass} style={{opacity: valueInputSearchCodeItems !== '' ? '1' : '.7'}}
                        onClick={() => this.handleGetDataItems(valueInputSearchCodeItems,TYPE_INPUT)}
                    />

                    <div className='options_items'>
                        {valueInputSearchCodeItems !== '' && listDataSearchCodeItems.length === 0 && isShowDataSearchCodeItems &&
                            <p className='no-options'><SwitchLanguage id='manageAdmin.items.noOptions' /></p>
                        }

                        {valueInputSearchCodeItems !== '' && listDataSearchCodeItems && listDataSearchCodeItems.length > 0 &&  isShowDataSearchCodeItems &&
                            listDataSearchCodeItems.map(item => {
                                return (
                                    <div key={item.idItems} className='item' onMouseDown={() => this.handleAddItems(item,TYPE_INPUT)}>
                                        <div className='wraper-img'>
                                            <img src={`${process.env.REACT_APP_BACKEND_IMAGES_ITEMS}/${item.dataImgItems && item.dataImgItems.image}`} alt='' className='img' />
                                        </div>
                                        <div className='detail'>
                                            <p className='name-items'>{languages.EN === language ? item.nameEn: item.name}</p>
                                            <div className='list-price'>
                                                <p className='price'> 
                                                    <span className='sub-price'>Giá :</span>
                                                    {language === languages.EN ? item.newPriceUS ? item.newPriceUS : item.priceUS : item.newPrice ? item.newPrice : item.price}
                                                    <span className='type_price'>{languages.EN === language ? DISCOUNTTEXT.EN_DISCOUNT_SUB : DISCOUNTTEXT.VN_DISCOUNT_SUB }</span> 
                                                </p>
                                                <p className='code-items'><SwitchLanguage id='manageAdmin.items.code' /> <span>{item.idItems}</span> </p>
                                            </div>
                                        </div>
                                    </div> 
                                )
                            })
                        }
                    </div>
                </>
            }


            {TYPE_INPUT === 'SELECT_ITEMS_ARRAY' &&
                <>
                    <SwitchLanguage id={idSwitchLanguage}/>
                    <input className='input select' name='search' type='text' placeholder={languages.EN === language ? 'Select items' : 'Chọn sản phẩm'}
                        onFocus={() => this.handleFocusInput(TYPE_INPUT)} onBlur={() => this.handleBlurInput(TYPE_INPUT)} autoComplete="off"
                        onChange={(e) => this.handleChangeInputSearch(e.target.value, TYPE_INPUT)} value={valueInputSelectArray}
                    />

                    {isShowListItemsSelect && <div className='options_items'> 
                        {listDataItemsSelect.length === 0 &&  
                            <p className='no-options'><SwitchLanguage id='manageAdmin.items.noOptions' /></p>
                        }

                        {listDataItemsSelect.length > 0  && resultDataSearchName.length === 0 &&
                            listDataItemsSelect.map(item => {
                                return (
                                    <div key={item.idItems} className='item' onMouseDown={() => this.handleAddItems(item,TYPE_INPUT)} >
                                        <div className='wraper-img'>
                                            <img src={`${process.env.REACT_APP_BACKEND_IMAGES_ITEMS}/${item.dataImgItems && item.dataImgItems.image}`} alt='' className='img' />
                                        </div>
                                        <div className='detail'>
                                            <p className='name-items' ref={this.nameItemsRef} >{languages.EN === language ? item.nameEn: item.name}</p>
                                            <div className='list-price'>
                                                <p className='price'> 
                                                    <span className='sub-price'>Giá :</span>
                                                    {language === languages.EN ? item.newPriceUS ? item.newPriceUS : item.priceUS : item.newPrice ? item.newPrice : item.price}
                                                    <span className='type_price'>{languages.EN === language ? DISCOUNTTEXT.EN_DISCOUNT_SUB : DISCOUNTTEXT.VN_DISCOUNT_SUB }</span> 
                                                </p>
                                                <p className='code-items'><SwitchLanguage id='manageAdmin.items.code' /> <span>{item.idItems}</span> </p>
                                            </div>
                                        </div>
                                    </div> 
                                )
                            })
                        }
                                 
                        {resultDataSearchName && resultDataSearchName.length > 0 &&
                            resultDataSearchName.map(item => {
                                return (
                                    <div key={item.idItems} className='item' onMouseDown={() => this.handleAddItems(item,TYPE_INPUT)}>
                                        <div className='wraper-img'>
                                            <img src={`${process.env.REACT_APP_BACKEND_IMAGES_ITEMS}/${item.dataImgItems && item.dataImgItems.image}`} alt='' className='img' />
                                        </div>
                                        <div className='detail'>
                                            <p className='name-items' ref={this.nameItemsRef} >{languages.EN === language ? item.nameEn: item.name}</p>
                                            <div className='list-price'>
                                                <p className='price'> 
                                                    <span className='sub-price'>Giá :</span>
                                                    {language === languages.EN ? item.newPriceUS ? item.newPriceUS : item.priceUS : item.newPrice ? item.newPrice : item.price}
                                                    <span className='type_price'>{languages.EN === language ? DISCOUNTTEXT.EN_DISCOUNT_SUB : DISCOUNTTEXT.VN_DISCOUNT_SUB }</span> 
                                                </p>
                                                <p className='code-items'><SwitchLanguage id='manageAdmin.items.code' /> <span>{item.idItems}</span> </p>
                                            </div>
                                        </div>

                                    </div> 
                                )
                            })
                        } 
                    </div>}
                </>
            }


            </div>
            </div>
            </div>
        </>
    )}
} 


const mapStateToProps = state => {
    
    return {
        language: state.app.language,
        allcategory: state.admin.dataForm.category,
        valueInputSearchCode: state.admin.search.valueInputSearchCode
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setValueInputEmpty: () => dispatch(actions.setValueInputEmpty())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputSearch);