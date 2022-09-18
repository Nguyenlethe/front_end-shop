import React, { Component } from 'react';
import { connect } from "react-redux";
import SwitchLanguage from '../../../../SwitchLanguage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStore,faCircleExclamation,faPalette,faRegistered,faChartSimple} from '@fortawesome/free-solid-svg-icons';
import * as actions from '../../../../store/action';
import {languages,PERMISSIONS} from '../../../../utils/constant'
import _ from 'lodash'
import adminService from '../../../../services/adminService';
import { toast } from 'react-toastify';
import ListShops from '../ListShop/ListShops'
import Select from 'react-select';
import Items from '../Items/Items';
import generalHandling from '../../../../utils/generalHandling'
import Button from '../../../../components/Button/Button';
import './OtherSystemData.scss'
import Input from '../../../../components/Input/Input';
import handleCheckPermission from '../../../../utils/generalHandling'


class OtherSystemData extends Component {
    constructor(props) {
        super(props);
        this.state = {

            listAllCategory: [],
            optionsCategory: null,

            dataTabelColor: {
                colorId: 'COLOR',
                idUserCreate: '',
                code: '',
                valueEn: '',
                valueVi: ''
            },

            errData: {
                messageErrColor: {},
                messageErrTrademarks: {},
                messageErrCategories: {},
                messageErrType: {},

            },


            dataTrademarks: {
                trademarkId:  'BNPRD',
                idUserCreate:  '',
                code: '',
                valueEn: '',
            },

            dataCategories: {
                categoryId: 'CATEGRORY',
                idUserCreate: '',
                code: '',
                valueEn: '',
                valueVi: '',
            },

            dataType: {
                typeId:  '',
                idUserCreate: '',
                code: '',
                valueEn: '',
                valueVi: '',
            }


        }
    }

    // DidMound
    componentDidMount = async ()=>  {
        let {dataUser} = this.props
        let {dataTabelColor,dataTrademarks,dataCategories,dataType} = this.state

        if(handleCheckPermission.handleCheckPermission(PERMISSIONS.ADMIN,dataUser.permission)){
            this.setState({
                dataTabelColor: {...dataTabelColor, idUserCreate: 'All'},
                dataTrademarks: {...dataTrademarks, idUserCreate: 'All'},
                dataCategories: {...dataCategories, idUserCreate: 'All'},
                dataType: {...dataType, idUserCreate: 'All'},

            })
        }else{
            // Xl Add id shop 
            
        }

        this.heandleDataForm()
    }

    // DidUpdate
    componentDidUpdate= async(prevProps, prevState)=> {

        // Khi Language change
        if(prevProps.language !== this.props.language){
            this.heandleDataForm()
        }
    }


    // Change input
    handleChangeInput = (value, name) => {
        let {dataTabelColor,dataTrademarks,errData,dataCategories,dataType} = this.state
        
        // Color
        if(name === 'codeColor'){
            this.setState({
                dataTabelColor: {
                    ...dataTabelColor,
                    code: value || ''
                },
                errData:{
                    ...errData,
                    messageErrColor: {}
                }
            })
        }

        if(name === 'nameColorVN'){
            this.setState({
                dataTabelColor: {
                    ...dataTabelColor,
                    valueVi: value || ''
                },
                errData:{
                    ...errData,
                    messageErrColor: {}
                }
            })
        }

        if(name === 'nameColorEN'){
            this.setState({
                dataTabelColor: {
                    ...dataTabelColor,
                    valueEn: value || ''
                },
                errData:{
                    ...errData,
                    messageErrColor: {}
                }
            })
        }

        // Trademarks
        if(name === 'codeTrademarks'){
            this.setState({
                dataTrademarks: {
                    ...dataTrademarks,
                    code: value || ''
                },
                errData: {
                    ...errData,
                    messageErrTrademarks: {}
                }
            })
        }

        if(name === 'nameTrademarks'){
            this.setState({
                dataTrademarks: {
                    ...dataTrademarks,
                    valueEn: value || ''
                },
                errData: {
                    ...errData,
                    messageErrTrademarks: {}
                }
            })
        }

        // Category
        if(name === 'codeCategories'){
            this.setState({
                dataCategories: {
                    ...dataCategories,
                    code: value || ''
                },
                errData: {
                    ...errData,
                    messageErrCategories: {}
                }
            })
        }

        if(name === 'nameViCategories'){
            this.setState({
                dataCategories: {
                    ...dataCategories,
                    valueVi: value || ''
                },
                errData: {
                    ...errData,
                    messageErrCategories: {}
                }
            })
        }

        if(name === 'nameEnCategories'){
            this.setState({
                dataCategories: {
                    ...dataCategories,
                    valueEn: value || ''
                },
                errData: {
                    ...errData,
                    messageErrCategories: {}
                }
            })
        }


        // Category type
        if(name === 'codeType'){
            this.setState({
                dataType: {
                    ...dataType,
                    code: value || ''
                },
                errData: {
                    ...errData,
                    messageErrType: {}
                }
            })
        }

        if(name === 'nameViType'){
            this.setState({
                dataType: {
                    ...dataType,
                    valueVi: value || ''
                },
                errData: {
                    ...errData,
                    messageErrType: {}
                }
            })
        }

        if(name === 'nameEnType'){
            this.setState({
                dataType: {
                    ...dataType,
                    valueEn: value || ''
                },
                errData: {
                    ...errData,
                    messageErrType: {}
                }
            })
        }


    }


    // Submit data
    handleSubmit = async(name) => {
        let {dataTabelColor,errData,dataTrademarks,dataCategories,dataType} = this.state

        // COLOR
        if(name === 'COLOR'){
            let res = await adminService.createDataOther({dataTabelColor, type: 'COLOR'})
            if(res && res.data && res.data.errCode === 0){

                this.setState({
                    dataTabelColor: {
                        code: '',
                        valueEn: '',
                        valueVi: ''
                    }
                })
                toast.success(<SwitchLanguage id='manageAdmin.toast.successPriceShip'/> )
            }
            if(res && res.data && res.data.errCode !== 0){
                this.setState({
                    errData:{
                        ...errData,
                        messageErrColor: res.data.data
                    }
                })
                toast.error(<SwitchLanguage id='manageAdmin.toast.warn'/> )
            }
        }

        // TRADEMARKS
        if(name === 'TRADEMARKS'){
            let res = await adminService.createDataOther({dataTrademarks, type: 'TRADEMARKS'})

            if(res && res.data && res.data.errCode === 0){
              
                this.setState({
                    dataTrademarks: {
                        code: '',
                        valueEn: '',
                    }
                })
                toast.success(<SwitchLanguage id='manageAdmin.toast.successPriceShip'/> )
            }
            if(res && res.data && res.data.errCode === -1){
                this.setState({
                    errData:{
                        ...errData,
                        messageErrTrademarks: res.data.data
                    }
                })
                toast.error(<SwitchLanguage id='manageAdmin.toast.warn'/> )
            }
        }

        // CATEGRORY
        if(name === 'CATEGRORY'){
            let res = await adminService.createDataOther({dataCategories, type: 'CATEGRORY'})

            if(res && res.data && res.data.errCode === 0){
              
                this.setState({
                    dataCategories: {
                        ...dataCategories,
                        code: '',
                        valueEn: '',
                        valueVi: '',
                    }
                })
                toast.success(<SwitchLanguage id='manageAdmin.toast.successPriceShip'/> )
            }
            if(res && res.data && res.data.errCode !== 0){
                this.setState({
                    errData:{
                        ...errData,
                        messageErrCategories: res.data.data
                    }
                })
                toast.error(<SwitchLanguage id='manageAdmin.toast.warn'/> )
            }
        }

        // TYPE
        if(name === 'TYPE'){
            let res = await adminService.createDataOther({dataType, type: 'TYPE'})

            if(res && res.data && res.data.errCode === 0){
                this.setState({
                    optionsCategory: null,
                    dataType: {
                        ...dataType,
                        typeId:  '',
                        code: '',
                        valueEn: '',
                        valueVi: '',
                    }
                })
                toast.success(<SwitchLanguage id='manageAdmin.toast.successPriceShip'/> )
            }
            if(res && res.data && res.data.errCode !== 0){
                this.setState({
                    errData:{
                        ...errData,
                        messageErrType: res.data.data
                    }
                })
                toast.error(<SwitchLanguage id='manageAdmin.toast.warn'/> )
            }

        }

    }

    // Xl change input select
    handlChangeSlelect = async (valueOptions, name) => {
        let {dataType} = this.state

        // Add danh mục
        if(name.name === 'category') {
            
            this.setState({
                optionsCategory: valueOptions,
                dataType: {
                    ...dataType, 
                    typeId: valueOptions.value
                }
            })
        }
    }

    // handel setdata select
    heandleDataForm = ()  => {
        let {allcategory}= this.props
        let {optionsCategory} = this.state
        let newListCategory = generalHandling.handlConvertObject(allcategory, 'LIST_CATEGORY',this.props.language)

        let newOptionsCategory = null
        if(optionsCategory !== null){
            newOptionsCategory = newListCategory.filter(item => item.value === optionsCategory.value)
        }

        newOptionsCategory = newOptionsCategory !== null ? newOptionsCategory[0] : null

        this.setState({
            listAllCategory: newListCategory || [],
            optionsCategory: newOptionsCategory
        })
    }

  
    render() {

    let {code,valueEn, valueVi} = this.state.dataTabelColor
    let {dataTrademarks,errData,dataCategories,dataType,listAllCategory,optionsCategory} = this.state
    let {language} = this.props

    return (
    <>
        <div style={{height: 'var(--height-tippy-nav)'}}></div>
        <div className='col l-12'>
            <p className='heading-manage-user'><SwitchLanguage id='manageAdmin.otherDataSystem'/></p>
        </div>   


        {/* Color */}
        <p className='heading-other-data col l-12' ><SwitchLanguage id='manageAdmin.button.addColor'/> <FontAwesomeIcon icon={faPalette}/></p>
        <div id='list-input'>
            <Input 
                className='col l-3'
                label='manageAdmin.items.labelCodeColor' 
                placeholder='manageAdmin.items.pldCodeColor' 
                name='codeColor'
                type='text'
                value={code}
                change={this.handleChangeInput}
            />

            <Input 
                className='col l-3'
                label='manageAdmin.items.labelNameVNColor' 
                placeholder='manageAdmin.items.pldNameColorVN' 
                name='nameColorVN'
                type='text'
                value={valueVi}
                change={this.handleChangeInput}
            />

            <Input 
                className='col l-3'
                label='manageAdmin.items.labelNameENColor' 
                placeholder='manageAdmin.items.pldNameColorEN' 
                name='nameColorEN'
                type='text'
                value={valueEn}
                change={this.handleChangeInput}
            />
            <p className='col l-12 err_message'>{errData.messageErrColor && errData.messageErrColor.valueEn && languages.EN === language ? errData.messageErrColor.valueEn : errData.messageErrColor.valueVi}</p>
        </div>

        <span className='col l-3' onClick={() => code.trim() !== '' && valueEn.trim() !== '' && valueVi.trim() !== '' && this.handleSubmit('COLOR')}>
            <Button 
                type='submit-form-data' 
                border='6px' color='var(--color-BTN-manage)' 
                content={<SwitchLanguage id='manageAdmin.button.submit'/>} 
            />
        </span>


        {/* trademarks */}
        <p className='heading-other-data col l-12' ><SwitchLanguage id='manageAdmin.items.addTrademarks'/> <FontAwesomeIcon icon={faRegistered}/></p>
        <div id='list-input'>
            <Input 
                className='col l-3'
                label='manageAdmin.items.labelCodeTrademarks' 
                placeholder='manageAdmin.items.pldCodeTrademarks' 
                name='codeTrademarks'
                type='text'
                value={dataTrademarks.code}
                change={this.handleChangeInput}
            />

            <Input 
                className='col l-3'
                label='manageAdmin.items.labelNameTrademarks' 
                placeholder='manageAdmin.items.pldNameTrademarks' 
                name='nameTrademarks'
                type='text'
                value={dataTrademarks.valueEn}
                change={this.handleChangeInput}
            />

            <p className='col l-12 err_message'>{errData.messageErrTrademarks && errData.messageErrTrademarks.valueEn && languages.EN === language ? errData.messageErrTrademarks.valueEn : errData.messageErrTrademarks.valueVi}</p>
        </div>

        <span className='col l-3' onClick={() => dataTrademarks.code.trim() !== '' && dataTrademarks.valueEn.trim() !== '' && this.handleSubmit('TRADEMARKS')}>
            <Button 
                type='submit-form-data' 
                border='6px' color='var(--color-BTN-manage)' 
                content={<SwitchLanguage id='manageAdmin.button.submit'/>} 
            />
        </span>


        {/* Category */}
        <p className='heading-other-data col l-12' ><SwitchLanguage id='manageAdmin.items.addCategory'/> <FontAwesomeIcon icon={faChartSimple}/></p>
        <div id='list-input'>
            <Input 
                className='col l-3'
                label='manageAdmin.items.labelCodeCategory' 
                placeholder='manageAdmin.items.pldCodeCategory' 
                name='codeCategories'
                type='text'
                value={dataCategories.code}
                change={this.handleChangeInput}
            />

            <Input 
                className='col l-3'
                label='manageAdmin.items.labelNameVNCategory' 
                placeholder='manageAdmin.items.pldNameCategoryVN' 
                name='nameViCategories'
                type='text'
                value={dataCategories.valueVi}
                change={this.handleChangeInput}
            />

            <Input 
                className='col l-3'
                label='manageAdmin.items.labelNameENCategory' 
                placeholder='manageAdmin.items.pldNameCategoryEN' 
                name='nameEnCategories'
                type='text'
                value={dataCategories.valueEn}
                change={this.handleChangeInput}
            />

            <p className='col l-12 err_message'>{errData.messageErrCategories && errData.messageErrCategories.valueEn && languages.EN === language ? errData.messageErrCategories.valueEn : errData.messageErrCategories.valueVi}</p>
        </div>

        <span className='col l-3' onClick={() => dataCategories.code.trim() !== '' && dataCategories.valueEn.trim()  && dataCategories.valueVi.trim() !== '' && this.handleSubmit('CATEGRORY')}>
            <Button 
                type='submit-form-data' 
                border='6px' color='var(--color-BTN-manage)' 
                content={<SwitchLanguage id='manageAdmin.button.submit'/>} 
            />
        </span>

        {/* Category type */}
        <p className='heading-other-data col l-12' ><SwitchLanguage id='manageAdmin.items.addType'/> <FontAwesomeIcon icon={faChartSimple}/></p>
        <div id='list-input'>

            <div className='form-input col l-3'>
                <label className='input-label'><SwitchLanguage id='manageAdmin.form.category'/></label>
                <Select
                    value={optionsCategory}
                    onChange={this.handlChangeSlelect}
                    options={listAllCategory}
                    placeholder={<SwitchLanguage id='manageAdmin.form.planceholder_category'/>}
                    name="category"
                />
            </div>


            <Input 
                className='col l-3'
                label='manageAdmin.items.labelCodeType' 
                placeholder='manageAdmin.items.pldCodeType' 
                name='codeType'
                type='text'
                value={dataType.code}
                change={this.handleChangeInput}
            />

            <Input 
                className='col l-3'
                label='manageAdmin.items.labelNameVNType' 
                placeholder='manageAdmin.items.pldNameTypeVN' 
                name='nameViType'
                type='text'
                value={dataType.valueVi}
                change={this.handleChangeInput}
            />

            <Input 
                className='col l-3'
                label='manageAdmin.items.labelNameENType' 
                placeholder='manageAdmin.items.pldNameTypeEN' 
                name='nameEnType'
                type='text'
                value={dataType.valueEn}
                change={this.handleChangeInput}
            />

            <p className='col l-12 err_message'>{errData.messageErrType && errData.messageErrType.valueEn && languages.EN === language ? errData.messageErrType.valueEn : errData.messageErrType.valueVi}</p>
        </div>

        <span className='col l-3' onClick={() => dataType.code.trim() !== '' && dataType.valueEn.trim()  && dataType.valueVi.trim() !== '' && this.handleSubmit('TYPE')}>
            <Button 
                type='submit-form-data' 
                border='6px' color='var(--color-BTN-manage)' 
                content={<SwitchLanguage id='manageAdmin.button.submit'/>} 
            />
        </span>


        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>




    </>       
)}}
 

const mapStateToProps = state => {
    return {
        language: state.app.language,
        dataUser: state.app.loginUser,
        allcategory: state.admin.dataForm.category,

    }
}

const mapDispatchToProps = dispatch => {
    return {
       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OtherSystemData);




















