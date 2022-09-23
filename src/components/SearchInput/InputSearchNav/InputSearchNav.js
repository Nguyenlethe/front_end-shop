import React, { Component } from 'react';
import { connect } from "react-redux";
import SwitchLanguage from '../../../SwitchLanguage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass,faSpinner,faCircleXmark,faCaretDown} from '@fortawesome/free-solid-svg-icons';
import {languages,DISCOUNTTEXT,ITEMS, path} from '../../../utils/constant';
import { Link } from 'react-router-dom';
import appService from '../../../services/appService';
import notItems from '../../../assets/image/NOT_PRODUCT.png';

import ListItemsSearch from '../../Items/ListItemsSearch'


import'./InputSearchNav.scss';

class InputSearchNav extends Component {
    constructor(props){
        super(props);
        this.listOptions = React.createRef();
        this.inputSearch = React.createRef();
        this.listResultDataSearch = React.createRef();
        this.state = {
            isShowOptionsSearchNav: false,
            isHideOptionsSearchNav: false,
            isLoad :false,
            isHideFormDataOptionsSearch: false,
            isAccept: true,

            numberItems: 0,
            valueInput: '',
            dataSearchInput: [],
            dataOptionsSearch: [
                {
                    idShop: 'EMPTY',
                    category: 'All',
                    type: 'EMPTY',
                    valueTextInputEN: 'Full floor',
                    valueTextInputVI: 'Toàn sàn',
                },
            ]
        }
    }
    
    // Component DidMount 
    componentDidMount = async() => {
        let {} = this.props
        let {} = this.state

    }

    // Component Update
    componentDidUpdate = async(prevProps, prevState) => {
        let {dataOptionsSearch} = this.state
        let {} = this.props

        // Khi language thay đổi
        if(prevProps.language !== this.props.language){

        }

        // Khi data options thay đổi
        if(prevProps.dataOptions !== this.props.dataOptions){
            let newDataOptionsSearch = [this.props.dataOptions,dataOptionsSearch[0]]

            this.setState({
                dataOptionsSearch: newDataOptionsSearch
            })
        }
    }

    // Click edd options
    handleAddOptionsSearchNav = (option) => {
        let {dataOptionsSearch} = this.state
        let optionSelect = dataOptionsSearch.filter(item => item.type !== option.type)
        let newDataOptionsSearch = [option,optionSelect[0]]

        this.setState({
            isShowOptionsSearchNav: false,
            dataOptionsSearch: newDataOptionsSearch
        })
    } 

    // handleHoverOptionsSearch
    handleHoverOptionsSearch = () => {
        let {dataOptionsSearch} = this.state

        if(dataOptionsSearch.length > 1){
            this.setState({
                isShowOptionsSearchNav: true
            })
        }
    }

    // Handle hide options
    handleHideOptionsSearch = () => {
        let {dataOptionsSearch} = this.state

        if(dataOptionsSearch.length > 1){
            const listOptions = this.listOptions.current
            listOptions.classList.remove('keyfame')
            listOptions.classList.remove('keyfameOut')
            listOptions.classList.add('keyfameOut')
    
            setTimeout(() => {
                this.setState({
                    isShowOptionsSearchNav: false
                })
            },300)
        }
    }

    // Change input
    handleChangeInputSearchNav = async(value) => {
        let {dataOptionsSearch} = this.state
     
        this.setState({
            isHideFormDataOptionsSearch: true,
            isLoad : true,
            valueInput: value,
        })
        

        if(value !== ''){

            let res = await appService.searchItemsNameNav({
                idShop: dataOptionsSearch[0].idShop, 
                category: dataOptionsSearch[0].category, 
                type: dataOptionsSearch[0].type,
                language: this.props.language, value: value, 
                limit: ITEMS.LIMIT_SHOW_SEARCH, 
                page: 1,
            })

            
            if(res && res.data && res.data.errCode === 0){
                this.setState({
                    numberItems: res.data.count,
                    isLoad : false,
                    dataSearchInput: res.data.data
                })
            }
    
            if(res && res.data && res.data.errCode !== 0){
                this.setState({
                    isLoad : false,
                    dataSearchInput: [],
                    numberItems: 0,
                })
            }
        }

        if(value === ''){
            
            this.setState({
                isLoad : false,
                dataSearchInput: [],
                numberItems: 0,
                isHideFormDataOptionsSearch: false,
            })
        }
    }

    
    // Hide list options data search
    handleShowHideListDataOptions = async (type) => {
        let {valueInput} = this.state
        let isShowHide = false
        let isAcceptInput = true
        const nodeInpt = this.inputSearch.current
      

        if(type === 'FOCUS' && valueInput !== ''){
            isShowHide = true
            isAcceptInput = true

            this.setState({
                isHideFormDataOptionsSearch: isShowHide,
                isAccept: isAcceptInput
            })
        }


        if(type === 'SEARCH_ICON'){
            isAcceptInput = false
            isShowHide = true

            
            this.setState({
                isHideFormDataOptionsSearch: isShowHide,
                isAccept: isAcceptInput
            })
        }



        if(!type){
            this.setState({
                isHideFormDataOptionsSearch: isShowHide,
                isAccept: isAcceptInput
            })
        }

    }


    render() {

    let {dataOptionsSearch,isShowOptionsSearchNav,isLoad,valueInput,dataSearchInput,isHideFormDataOptionsSearch,numberItems,isAccept} = this.state
    let {language} = this.props




    return (
        <div className='border-input-search-nav'>
            <input  type='text' name='search'
                value={valueInput} onBlur={() => isAccept && setTimeout(() => {this.handleShowHideListDataOptions()},200)} onFocus={() => isAccept && this.handleShowHideListDataOptions('FOCUS')}
                placeholder={languages.EN === language ? 'Search product...' : 'Tìm kiếm sản phẩm...'}  autoComplete="off"
                onChange={(e) => this.handleChangeInputSearchNav(e.target.value)}  ref={this.inputSearch}
            />

            <div className='list-icon-input'>
                {isLoad && 
                    <FontAwesomeIcon className='icon-load' icon={faSpinner} /> 
                }
                {valueInput !== '' && !isLoad &&  <FontAwesomeIcon onClick={() => this.handleChangeInputSearchNav('')} className='icon-close' icon={faCircleXmark} /> } 
            </div>

            <span style={{color: 'var(--sub-text)'}}>{' | '}</span>
            <div className='select-type-search' onMouseOver={() => this.handleHoverOptionsSearch()} onMouseLeave={() => this.handleHideOptionsSearch()}>
                <option className='options' value={dataOptionsSearch[0].type}>{languages.EN === language ? 
                    dataOptionsSearch[0].valueTextInputEN.length > 13 ? dataOptionsSearch[0].valueTextInputEN.slice(0, 13) + '...' : dataOptionsSearch[0].valueTextInputEN  : 
                    dataOptionsSearch[0].valueTextInputVI.length > 13 ? dataOptionsSearch[0].valueTextInputVI.slice(0, 13) + '...' : dataOptionsSearch[0].valueTextInputVI }
                </option>
                <FontAwesomeIcon className='icon-select ' icon={faCaretDown} />  

                {isShowOptionsSearchNav && dataOptionsSearch.length > 1 &&
                    <div className='list-options keyfame' ref={this.listOptions}>
                        {dataOptionsSearch.map(option =>{
                            return (
                                <option className='options' value={option.type} key={option.type} onClick={() => this.handleAddOptionsSearchNav(option)}>
                                    {languages.EN === language ? 
                                    option.valueTextInputEN.length > 13 ? option.valueTextInputEN.slice(0, 13) + '...' : option.valueTextInputEN  : 
                                    option.valueTextInputVI.length > 13 ? option.valueTextInputVI.slice(0, 13) + '...' : option.valueTextInputVI }
                                </option>
                            )
                        })}
                    </div>
                }
            </div>

            <ListItemsSearch 
                isHideFormDataOptionsSearch={isHideFormDataOptionsSearch}   
                numberItems={numberItems}  
                limitShowItems={ITEMS.LIMIT_SHOW_SEARCH}  
                handleShowHideListDataOptions={this.handleShowHideListDataOptions}
                dataSearchInput={dataSearchInput}
                valueInput={valueInput}
                dataOptionsSearch={dataOptionsSearch}
            />


            <div className='border-icon-search'>
                <FontAwesomeIcon className='icon-search'
                    icon={faMagnifyingGlass} 
                />
                <input type='text' onMouseDown={() => this.handleShowHideListDataOptions('SEARCH_ICON')}
                    onBlur={() => setTimeout(() => {this.handleShowHideListDataOptions()},200)}
                />
            </div>

        </div>
    )}
} 


const mapStateToProps = state => {
    
    return {
        language: state.app.language,
        dataOptions: state.app.dataOptions,

    }
}

const mapDispatchToProps = dispatch => {
    return {
       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputSearchNav);

// { isHideFormDataOptionsSearch &&
// <div className='wraper-options keyfame' style={{paddingBottom: numberItems > ITEMS.LIMIT_SHOW_SEARCH ? '0' : '20px'}} ref={this.listResultDataSearch}>
//     <div className='title-options'>
//         <span> <SwitchLanguage id='manageAdmin.items.history' /></span>
//     </div>

//     {dataSearchInput.length === 0 &&
//         <div className='img_not-items'>
//             <img src={notItems} alt='Không tìm thấy...' />
//         </div>
//     } 


//     <div className='options_items'>
//         {valueInput !== '' && dataSearchInput && dataSearchInput.length > 0 && 
//             dataSearchInput.map((item,index) => {
//                 return (
//                     <div key={item.idItems} className='item' style={{backgroundColor: item.active ? item.active === true ? '#b1d6f5d4' : ''  : ''}}>
                    
//                         <div className='wraper-img'>
//                             <img src={`${process.env.REACT_APP_BACKEND_IMAGES_ITEMS}/${item.dataImgItems && item.dataImgItems.image}`} alt='' className='img' />
//                         </div>
//                         <div className='detail'>
//                             <p className='name-items'>{languages.EN === language ? item.nameEn: item.name}</p>
//                             <div className='list-price'>
//                                 <p className='price'> 
//                                     <span className='sub-price'>Giá :</span>
//                                     {language === languages.EN ? item.newPriceUS ? item.newPriceUS : item.priceUS : item.newPrice ? item.newPrice : item.price}
//                                     <span className='type_price'>{languages.EN === language ? DISCOUNTTEXT.EN_DISCOUNT_SUB : DISCOUNTTEXT.VN_DISCOUNT_SUB }</span> 
//                                 </p>
//                                 <p className='code-items'><SwitchLanguage id='manageAdmin.items.code' /> <span>{item.idItems}</span> </p>
//                             </div>
//                         </div>
//                     </div> 
//                 )
//             })
//         }
//     </div>

//     {numberItems > ITEMS.LIMIT_SHOW_SEARCH  &&
//         <div className='options-end' >
//             <span onMouseDown={() => setTimeout(() => {this.handleShowHideListDataOptions()},200) }> 
//                 <Link 
//                     to={{pathname: `${path.SEARCH_ITEMS}`,
//                     search: `?idShop=${dataOptionsSearch[0].idShop}&category=${dataOptionsSearch[0].category}&type=${dataOptionsSearch[0].type}&language=${language}&value=${valueInput}&limit=${ITEMS.SEE_MORE_SHOW_ITEMS_SEARCH}&page=${1}`}} >
//                     <SwitchLanguage id='manageAdmin.items.seeMore'/>
//                 </Link>
//             </span>
//         </div>
//     }
// </div>
// }



