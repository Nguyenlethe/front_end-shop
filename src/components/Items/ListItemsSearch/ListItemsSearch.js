import React, { Component } from 'react';
import { connect } from "react-redux";
import {DISCOUNTTEXT, path,languages,ITEMS} from '../../../utils/constant'
import SwitchLanguage from '../../../SwitchLanguage';
import notItems from '../../../assets/image/NOT_PRODUCT.png'
import { Link } from 'react-router-dom';


import './ListItemsSearch.scss';
class ListItemsSearch extends Component {
    constructor(props) {
        super(props);
        this.listResultDataSearch = React.createRef();
        this.state = {
           isShowHideFromListItems: false,
           valueInput: 'Default'
        }
    }

    // Mount
    componentDidMount = async ()=>  {
        let {isHideFormDataOptionsSearch,valueInput } = this.props

        this.setState({
            isShowHideFromListItems: isHideFormDataOptionsSearch,
            valueInput: valueInput
        })
    }

    // Update
    componentDidUpdate= async(prevProps, prevState)=> {
        let {isHideFormDataOptionsSearch,valueInput, isSeeMore} = this.props

        if(prevProps.language !== this.props.language){

        }

        if(prevProps.isHideFormDataOptionsSearch !== this.props.isHideFormDataOptionsSearch){

            this.setState({
                isShowHideFromListItems: isHideFormDataOptionsSearch
            })
        }

        if(prevProps.valueInput !== this.props.valueInput){

            if(this.props.valueInput === '' && isSeeMore !== true){
            
                const dataSearch = this.listResultDataSearch.current
                if(dataSearch && dataSearch.classList){
                    dataSearch.classList.remove('keyfame')
                    dataSearch.classList.remove('hideForm')
                    dataSearch.classList.add('hideForm')
                }
               
            }else{
                this.setState({
                    valueInput: valueInput
                })
            }

        }
    }

      
    render() {
    let {isShowHideFromListItems,valueInput} = this.state
    let {numberItems, limitShowItems,dataSearchInput,language, isSeeMore,dataOptionsSearch} = this.props

    

    return (
        <>
            {isShowHideFromListItems &&
                <div className='wraper-options keyfame' ref={this.listResultDataSearch}
                    style={{
                        paddingBottom: numberItems > limitShowItems ? '0' : '20px',
                        position: isSeeMore ? 'inherit' : 'absolute',
                        border: isSeeMore ? 'none' : '',
                        top: isSeeMore ? '0' : ''
                    }} 
                >
                {!isSeeMore && 
                    <div className='title-options' >
                        <span> <SwitchLanguage id='manageAdmin.items.history' /></span>
                    </div>
                }

                    {dataSearchInput.length === 0 &&
                        <div className='img_not-items'>
                            <img src={notItems} alt='Không tìm thấy...' />
                        </div>
                    } 


                    <div className='options_items' style={{maxHeight: isSeeMore ? 'none' : '350px',}}>
                        {valueInput !== '' && dataSearchInput && dataSearchInput.length > 0 && 
                            dataSearchInput.map((item,index) => {
                                return (
                                    <div key={item.idItems} className='item' style={{backgroundColor: item.active ? item.active === true ? '#b1d6f5d4' : ''  : ''}}>
                                    
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

                    {numberItems > limitShowItems  &&
                        <div className='options-end' >
                            
                                <Link onClick={() => setTimeout(() => {this.props.handleShowHideListDataOptions()},300) }
                                    to={{pathname: `${path.SEARCH_ITEMS}`,
                                    search: `?idShop=${dataOptionsSearch[0].idShop}&category=${dataOptionsSearch[0].category}&type=${dataOptionsSearch[0].type}&language=${language}&value=${valueInput}&limit=${ITEMS.SEE_MORE_SHOW_ITEMS_SEARCH}&page=${1}`}} >
                                
                                    <SwitchLanguage id='manageAdmin.items.seeMore'/>
                                </Link>
                           
                        </div>
                    }
                </div> 
            }
        </>
    )
    }
}


const mapStateToProps = state => {
    return {
        language: state.app.language,
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItemsSearch);
