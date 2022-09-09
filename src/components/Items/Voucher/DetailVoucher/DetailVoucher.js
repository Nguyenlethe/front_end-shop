import React, { Component } from 'react';
import { connect } from "react-redux";
import {languages,DISCOUNTTEXT,path} from '../../../../utils/constant'
import SwitchLanguage from '../../../../SwitchLanguage';
import NumberFormat from 'react-number-format';


import './DetailVoucher.scss';
import Button from '../../../Button';
// import '../Voucher.scss'
class DetailVoucher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataVoucher: null,
            isShow: false
        }
    }


    // 
    componentDidMount = async () => { 
        let {dataVoucher} = this.props

        this.setState({
            dataVoucher: dataVoucher,
        })

        setTimeout(() => {
            this.setState({
                isShow: true,
            })
        },100)
    }

    
    //
    componentDidUpdate= async (prevProps, prevState) => {
        let {dataVoucher} = this.props

        // if(prevProps.dataVoucher !== this.props.dataVoucher){
        //     this.setState({
        //         dataVoucher: dataVoucher,
        //     })
        //      setTimeout(() => {
        //          this.setState({
        //              isShow: true,
        //          })
        //      },100)
        // }

    }

    handleHideDetailVocher = (e, type) => {
        let {handleHide} = this.props

        if(type === 'BTN'){
            this.setState({
                isShow: false,
            })

            setTimeout(() => {
                handleHide(null)
            },300)
        }

        if(e.target.className === 'detail-voucher') {
            this.setState({
                isShow: false,
            })

            setTimeout(() => {
                handleHide(null)
            },300)
        }
    }

   


    render() { 

    let {dataVoucher, isShow} = this.state
    let {language} = this.props
    console.log(dataVoucher)
 
    return (
        <>
        {dataVoucher && 
            <div style={{height: isShow ? '100vh' : '0vh' , opacity: isShow ? '1' : '0'}} className='detail-voucher' onClick={(e) => this.handleHideDetailVocher(e)}>
                    <div className='voucher' >
                        <div className='voucher_wraper'>
                            <div className='info_shop'>
                                <div className='border_img'>
                                    <img className='avata_shop' src={`${process.env.REACT_APP_BACKEND_IMAGES_AVT_SHOP}/${dataVoucher.Store.avata}`} alt='' />

                                </div>
                                <span className='name_shop'>{dataVoucher.Store.nameShop.length > 18 ? dataVoucher.Store.nameShop.slice(0,18)+'...' : dataVoucher.Store.nameShop }</span>
                            </div>             
                        </div>

                        <div className='sub_voucher'>

                            <p className='discount_percent'>
                                {`${languages.EN === language ? DISCOUNTTEXT.REDUCE_EN : DISCOUNTTEXT.REDUCE_VI} ${dataVoucher.Discount.valueEn}`}
                            </p>

                            <p className='limit'>
                                {languages.EN === language ? DISCOUNTTEXT.EN_DISCOUNT :  DISCOUNTTEXT.VN_DISCOUNT}{' '}
                                { 
                                    languages.VI === language ?
                                    <NumberFormat value={dataVoucher.Voucher.limitVn} displayType={'text'} thousandSeparator={true}/>  
                                        : 
                                    dataVoucher.Voucher.limitUs
                                } 
                                {' '}{languages.EN === language ? DISCOUNTTEXT.EN_DISCOUNT_SUB : DISCOUNTTEXT.VN_DISCOUNT_SUB}{' / '}

                                {dataVoucher.itemsId !== 'EMPTY' &&  dataVoucher.Item && <SwitchLanguage id='manageAdmin.items.itemsDiscount'/> }
                                {dataVoucher.itemsId === 'EMPTY' &&  dataVoucher.Category !== 'EMPTY' && dataVoucher.Type.valueEn !==  null && <SwitchLanguage id='manageAdmin.items.typeDiscount'/> }
                                {dataVoucher.itemsId === 'EMPTY' &&  dataVoucher.Category !== 'EMPTY' &&  
                                dataVoucher.Type.valueEn ===  null  && <SwitchLanguage id='manageAdmin.items.discountVocher'/> }
                            </p>



                            {dataVoucher.itemsId !== 'EMPTY' &&  dataVoucher.Item && dataVoucher.Item.name &&

                                <div className='show_items'>
                                    <div className='img_items'>
                                        <img className='img' src={`${process.env.REACT_APP_BACKEND_IMAGES_ITEMS}/${dataVoucher.Items_color_image.image}`} alt=''/>
                                    </div>

                                    <div className='detail_items'>
                                        <p className='name_items' >{languages.EN === language ? dataVoucher.Item.nameEn.slice(0,22)+'...' : dataVoucher.Item.name.slice(0, 22)+'...'}</p>
                                        
                                        <p className='code'>
                                            <SwitchLanguage id='manageAdmin.items.code' />
                                            <span className='items_code'>{dataVoucher.itemsId}</span>
                                        </p>
                                    </div>
                                </div>
                            }

                            {dataVoucher.itemsId === 'EMPTY' && 
                                <div className='detail_voucher-not-items'> 
                                    <span className='name_items'>
                                        {languages.EN === language ? dataVoucher.Category.valueEn : dataVoucher.Category.valueVi} 
                                    </span> 
                                    
                                    {dataVoucher.Type.valueEn !==  null && 
                                        <span className='name_items'>
                                            {' / '}{languages.EN === language ? dataVoucher.Type.valueEn : dataVoucher.Type.valueVi}
                                        </span> 
                                    }
                                </div>                               
                            }


                            <p className='times'>
                                <SwitchLanguage id='manageAdmin.items.from' />{'  '}
                                <span className='content-time'>
                                    {new Date(dataVoucher.dayStart).getHours()}{':'}
                                    {new Date(dataVoucher.dayStart).getMinutes() + '' === '0' ? new Date(dataVoucher.dayStart).getMinutes()+'0' : new Date(dataVoucher.dayStart).getMinutes()}
                                    <span className='times'>{<SwitchLanguage id='manageAdmin.items.day' />}</span>
                                    {new Date(dataVoucher.dayStart).getDate()}{'/'}
                                    {new Date(dataVoucher.dayStart).getMonth() + 1 }{'/'}
                                    {new Date(dataVoucher.dayStart).getFullYear()}{' '}
                                </span>
                            </p>

                            <p className='times'>
                                <SwitchLanguage id='manageAdmin.items.to' />{'  '}
                                <span className='content-time'>
                                    {new Date(dataVoucher.dayEnd).getHours()}{':'}
                                    {new Date(dataVoucher.dayEnd).getMinutes() + '' === '0' ? new Date(dataVoucher.dayEnd).getMinutes()+'0' : new Date(dataVoucher.dayEnd).getMinutes()}
                                    <span className='times'>{<SwitchLanguage id='manageAdmin.items.day' />}</span>
                                    {new Date(dataVoucher.dayEnd).getDate()}{'/'}
                                    {new Date(dataVoucher.dayEnd).getMonth() + 1 }{'/'}
                                    {new Date(dataVoucher.dayEnd).getFullYear()}{'  '}
                                </span> 
                            </p>
                        </div>

                        <p className='l-12' onClick={(e) => this.handleHideDetailVocher(e, 'BTN')}>
                            <Button 
                                type='submit-form-data' 
                                content={<SwitchLanguage id='manageAdmin.items.YES'/>} 
                                color='#ce163b'
                                width='98%'
                                margin='4px'
                                border='4px'
                            />
                        </p>

                    </div>
            </div>
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailVoucher);
