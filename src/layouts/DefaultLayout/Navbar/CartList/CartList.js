import React, { Component } from 'react';
import { connect } from "react-redux";
import * as action from '../../../../store/action'
import SwitchLanguage from '../../../../SwitchLanguage';
import ListLanguage from '../../../../components/ListLanguage';
import {path, PERMISSIONS,languages, CONTACT} from '../../../../utils/constant'
import { Link ,Navigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPhoneFlip,faEnvelope} from '@fortawesome/free-solid-svg-icons';
import adminService from '../../../../services/adminService';
import Button from '../../../../components/Button/Button';
import { toast } from 'react-toastify';
import NumberFormat from 'react-number-format';
import NoCart from '../../../../assets/image/no-cart.png' 
import './CartList.scss';

class CartList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lengthItems: 0,
            litsItemsCart: [],
            showListItemsCart: false
        }
    }

   
    // Mount 
    componentDidMount = async ()=>  {
        let {getListCart, dataUser,isShowListItemsCart} = this.props
        getListCart(dataUser.id)

        this.setState({
            showListItemsCart: isShowListItemsCart
        })
    }

    // Trước khi chết 
    componentWillUnmount = () => {

    }
  
    // Update
    componentDidUpdate= async(prevProps, prevState)=> {
        let {handleSetLengthItemsListCart} = this.props
        if(prevProps.language !== this.props.language){

        }

        if(prevProps.isShowListItemsCart !== this.props.isShowListItemsCart){

            if(this.props.isShowListItemsCart != false){
                this.setState({
                    showListItemsCart: true
                })
            }

            if(this.props.isShowListItemsCart == false){
                this.setState({
                    showListItemsCart: false
                })
            }


        }

        if(prevProps.listItemsCart !== this.props.listItemsCart){
            let lengthItems = this.props.listItemsCart.length
            handleSetLengthItemsListCart(lengthItems)

            this.setState({
                litsItemsCart: this.props.listItemsCart
            })
        }
    }

    
    render() {

    let {islogin, permission} = this.props.dataUser
    let {litsItemsCart,showListItemsCart} = this.state
    let {language} = this.props

    
    return (
        <>


        {showListItemsCart && 
            <div className='list-items-cart'>
                {litsItemsCart.length > 0 && <span className='title-cart'><SwitchLanguage id='manageAdmin.items.titleCart'/></span>}
                <div className='wrapper-cart'>
                    {litsItemsCart.length > 0 ? 
                        <>
                            {litsItemsCart.map(item => {
                                return (
                                    <div key={item.timeCreate} className='items-cart'> 
                                        <div className='wrapper-img-items-cart'>
                                            <img src={`${process.env.REACT_APP_BACKEND_IMAGES_ITEMS}/${item.Item.dataImgItems.image}`}  alt='Anh items'/>
                                        </div>

                                        <div className='detail-info-items'> 
                                            <p className='name-items-cart'>{languages.EN == language ? item.Item.nameEn : item.Item.name }</p>
                                        </div>

                                        <div className='list-price-items-cart'>
                                            <p className='price-items-cart'>
                                                {languages.EN == language ? item.Item.newPriceUS > 0 ? item.Item.newPriceUS : item.Item.priceUS : 
                                                    item.Item.newPrice > 0 ? <NumberFormat value={item.Item.newPrice} displayType={'text'} thousandSeparator={true}/>  :
                                                    <NumberFormat value={item.Item.price} displayType={'text'} thousandSeparator={true}/>
                                                }
                                                {' '}{languages.EN == language ? 'USD' : 'VND'}
                                            </p>
                                            <p className='price-items-cart'>x{item.itemsNumber}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </>
                    :
                    <>
                        <img src={NoCart} alt='Not Items' />
                    </>
                    }
                </div>

                {litsItemsCart.length > 0 && <button className='btn-next-to-cart'> <span>Xem Giỏ Hàng</span></button>}

            </div>
        }



        </>
    )}
}

    
        // color: "CL01"
        // id: 3
        // idShop: "3"
        // itemsId: "ADMTSP01"
        // itemsNumber: 3
        // priceShip: null
        // size: "XXXL"
        // status: "CART"
        // timeCreate: "2022-10-01T10:59:26.598Z"
        // timeReceived: null
        // userGuestId: "4"



const mapStateToProps = (state) => {
    return { 
        language: state.app.language ,
        dataUser: state.app.loginUser,
        listItemsCart: state.app.listItemsCart,

    }
}


const mapDispatchToProps = dispatch => {
    return {
        getListCart: (idUser) => dispatch(action.getListCart(idUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartList);
