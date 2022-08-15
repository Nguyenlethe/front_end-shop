import React, { Component } from 'react';
import { connect } from "react-redux";
import SwitchLanguage from '../../../../SwitchLanguage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStore,faPlus,faCamera} from '@fortawesome/free-solid-svg-icons';
import * as actions from '../../../../store/action';
import adminService from '../../../../services/adminService';
import {languages } from '../../../../utils/constant'
import Tippy from '../../../../components/Tippy/Tippy';
import {default as adminService} from '../../../../services/adminService'

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite'; 
import MdEditor2 from 'react-markdown-editor-lite'; 

import 'react-markdown-editor-lite/lib/index.css';
import Button from '../../../../components/Button/Button';
import Select from 'react-select';
import _ from 'lodash'
import bcrypt from 'bcryptjs'


// itemsId: DataTypes.INTEGER,
// describeHtmlEn: DataTypes.TEXT,
// describeTextEn: DataTypes.TEXT,
// describeHtmlVi: DataTypes.TEXT,
// describeTextVi: DataTypes.TEXT, 
// trademark: DataTypes.STRING,
// production: DataTypes.STRING,
// sentFrom: DataTypes.STRING,
// texture: DataTypes.STRING,


// itemsId: DataTypes.INTEGER,
// typeSize: DataTypes.STRING,
// size:  DataTypes.STRING,
// amount: DataTypes.INTEGER,

import './Items.scss'
// const mdParser = new MarkdownIt();



// itemId: '',
// color: '',
// image:  '',
// imageLink: '',




const salt = bcrypt.genSaltSync(8) 
class Items extends Component {
    constructor(props) {
        super(props);
       

        this.state = {

            listAllShops: [],
            listAllUser: [],
            listAllCategory: [],
            listAllCategoryType: [],
            listSale: [],
            listTrademark:[],
            listItemsSizeAmount: [],
            listSize: [],
            listSIZEData: [],
            listSZNBData:[],
            listSizeOrAmount: [],
            listImg: [],
            listColor: [],
           
            optionsColor: null,
            optionsSize: null,
            optionsItemsSizeAmount: null,
            optionsTrademark: null,
            optionsSele: null,
            optionsCategoryType: null,
            optionsSelect: null,
            optionsCategory: null,
            optionsSelectUser: null,

            isBTNVi: true,
            onSubmit: false,

            items: {
                idItems: '',
                idShop: '',
                manageId: '',
                category: '',
                type: '',
                discount: '',
                name: '',
                price: '',
                newPrice: '',
            },
            itemsInfo: {
                itemsId: '',
                describeHtmlEn:'',
                describeTextEn:'',
                describeHtmlVi:'',
                describeTextVi:'',
                trademark:'',
                production:'',
                sentFrom:'',
                texture:'',
            },
            itemsSizeAmount: {
                itemsId: '',
                typeSize: '',
                size: '',
                amount: '',
            },
            SIZE:{
                SZ01:'',
                SZ02:'',
                SZ03:'',
                SZ04:'',
                SZ05:'',
                SZ06:'',
                SZ07:'',
            },
            SZNB:{
                SZNB01:'',
                SZNB02:'',
                SZNB03:'',
                SZNB04:'',
                SZNB05:'',
                SZNB06:'',
                SZNB07:'',
                SZNB08:'',
                SZNB09:'',
                SZNB10:'',
            },
            notSize: {
                FRSZ: ''
            },
            itemsColorImgages: [],
            listImgFormData: {}
        };
    }
   




    


    // // DidMound
    componentDidMount = async ()=>  {
        // 
        await this.props.getCategoryAllCode()
        await this.props.getAllShop()
        await this.props.getAllCodeInToItems('DCC')
        await this.props.getAllCodeInToItems('BNPRD')
        await this.props.getAllCodeInToItems('TYPESIZE')
        await this.props.getAllCodeInToItems('COLOR')




        let {allUserEdit} = this.props
        this.setState({
            listAllUser: allUserEdit
        })
    }
    

    // Change Mô tả Sản phẩm Vi
    handleEditorChangeVi = ({ html, text }) => {
        

        this.setState({ 
            itemsInfo: {
                ...this.state.itemsInfo,
                describeTextVi: text || '',
                describeHtmlVi: html || '',
            }
        })
    }

    
    // Change Mô tả Sản phẩm En
    handleEditorChangeEn = ({ html, text }) => {
        this.setState({ 
            itemsInfo: {
                ...this.state.itemsInfo,
                describeTextEn: text || '',
                describeHtmlEn: html || ''
            }
        })
    }


    // DidUpdate
    componentDidUpdate= async(prevProps, prevState)=> {
        let {
            allShops ,handlConvertObject,allcategory ,FSBData,FSAMData,
            FSMData,FSAWData,AllData,DCCData,BNPRDData,TYPESIZEData, 
            SIZEData,SZNBData,COLORData
        }= this.props
     
        
        if(prevProps.language !== this.props.language){
            let allTypeCategory = []
            let {optionsCategory, optionsSelectUser, optionsCategoryType,optionsItemsSizeAmount,optionsColor} = this.state
            let {allUserEdit,allcategory,TYPESIZEData,COLORData} = this.props

            if(optionsCategory){
                if(FSBData && FSBData.length > 0 ){
                    if(optionsCategory.value === FSBData[0].type){
                        allTypeCategory = FSBData
                    }
                }

                if(FSAMData && FSAMData.length > 0 ){
                    if(optionsCategory.value === FSAMData[0].type){
                        allTypeCategory = FSAMData
                    }
                }

                if(FSMData && FSMData.length > 0 ){
                    if(optionsCategory.value === FSMData[0].type){
                        allTypeCategory = FSMData
                    }
                }

                if(FSAWData && FSAWData.length > 0 ){
                    if(optionsCategory.value === FSAWData[0].type){
                        allTypeCategory = FSAWData
                    }
                }

                if(AllData && AllData.length > 0 ){
                    if(optionsCategory.value === 'All'){
                        allTypeCategory = AllData
                    }
                }
            }


            let newListColor = handlConvertObject(COLORData, 'LIST_CATEGORY');
            let newListCategory = handlConvertObject(allcategory, 'LIST_CATEGORY');
            let newListAllCategoryType = handlConvertObject(allTypeCategory, 'LIST_CATEGORY');
            let newlistItemsSizeAmount = handlConvertObject(TYPESIZEData, 'LIST_CATEGORY');


            // Lặp set lại value tên loại hàng khi thay đổi ngôn ngữ 
            let mewOptionsColor = optionsColor
            if(optionsColor){
                mewOptionsColor =  newListColor.filter(item => {
                    return item.value === optionsColor.value
                })
                mewOptionsColor = mewOptionsColor[0]
            }
  

            // Lặp set lại value tên loại hàng khi thay đổi ngôn ngữ 
            let categoryName = optionsCategory
            if(optionsCategory){
                categoryName =  newListCategory.filter(item => {
                    return item.value === optionsCategory.value
                })
                categoryName = categoryName[0]
            }


            // Lặp set lại value tên user khi thay đổi ngôn ngữ
            let userName = optionsSelectUser
            if(optionsSelectUser){
                userName =  allUserEdit.filter(item => {
                    return item.value === optionsSelectUser.value
                })
                userName = userName[0]
            }

             // Lặp set lại value tên kiểu hàng khi thay đổi ngôn ngữ 
            let newCategoryType = optionsCategoryType
            if(optionsCategoryType){
                newCategoryType =  newListAllCategoryType.filter(item => {
                    return item.value === optionsCategoryType.value
                })
                newCategoryType = newCategoryType[0]
            }

            // Lặp set lại value tên loại hàng khi thay đổi ngôn ngữ 
            let setItemsSizeAmount = optionsItemsSizeAmount
            if(optionsItemsSizeAmount){
                setItemsSizeAmount =  newlistItemsSizeAmount.filter(item => {
                    return item.value === optionsItemsSizeAmount.value
                })
                setItemsSizeAmount = setItemsSizeAmount[0]
            }



            
            this.setState({
                optionsItemsSizeAmount: setItemsSizeAmount,
                optionsCategoryType: newCategoryType,
                optionsCategory: categoryName,
                optionsSelectUser: userName,
                listItemsSizeAmount: newlistItemsSizeAmount,
                listAllCategoryType: newListAllCategoryType,
                listAllCategory: newListCategory,
                optionsColor: mewOptionsColor,
            })
        }

        if(prevProps.allShops !== this.props.allShops){
            let newListShop = handlConvertObject(allShops, 'LIST_SHOP')
            this.setState({
                listAllShops: newListShop
            })
        }

        if(prevProps.allcategory !== this.props.allcategory){
            let newListCategory = handlConvertObject(allcategory, 'LIST_CATEGORY')
            this.setState({
                listAllCategory: newListCategory
            })
        }

        // ................................................
        if(prevProps.FSBData !== this.props.FSBData){
            let allFSBData = handlConvertObject(FSBData, 'LIST_CATEGORY')
            this.setState({
               listAllCategoryType: allFSBData
           })
        }

        if(prevProps.FSAMData !== this.props.FSAMData){
            let allFSAMData = handlConvertObject(FSAMData, 'LIST_CATEGORY')
            this.setState({
               listAllCategoryType: allFSAMData
           })
        }
        
        if(prevProps.FSMData !== this.props.FSMData){
            let allFSMData = handlConvertObject(FSMData, 'LIST_CATEGORY')
            this.setState({
               listAllCategoryType: allFSMData
            })
        }

        if(prevProps.FSAWData !== this.props.FSAWData){
            let allFSAWData = handlConvertObject(FSAWData, 'LIST_CATEGORY')
             this.setState({
                listAllCategoryType: allFSAWData
            })
        }

        if(prevProps.AllData !== this.props.AllData){
            let newAllData = handlConvertObject(AllData, 'LIST_CATEGORY')
             this.setState({
                listAllCategoryType: newAllData
            })
        }

        if(prevProps.DCCData !== this.props.DCCData){
            let newDCCData = handlConvertObject(DCCData, 'LIST_CATEGORY')

            this.setState({
                listSale: newDCCData
            })
        }

        if(prevProps.BNPRDData !== this.props.BNPRDData){
            let newBNPRDData = handlConvertObject(BNPRDData, 'LIST_CATEGORY')
            this.setState({
                listTrademark: newBNPRDData
            })
        }

        if(prevProps.TYPESIZEData !== this.props.TYPESIZEData){
            let newTYPESIZEData = handlConvertObject(TYPESIZEData, 'LIST_CATEGORY')
            this.setState({
                listItemsSizeAmount: newTYPESIZEData
            })
        }

        if(prevProps.SIZEData !== this.props.SIZEData){

            this.setState({
                listSIZEData: SIZEData
            })
        }


        if(prevProps.SZNBData !== this.props.SZNBData){

            this.setState({
                listSIZEData: SZNBData
            })
        }

        
        if(prevProps.COLORData !== this.props.COLORData){
            let newCOLORData = handlConvertObject(COLORData, 'LIST_CATEGORY')
            this.setState({
                listColor: newCOLORData
            })
        }

    }


    // On Change
    heandleChangeInput = async(value, name,e) => {
        let stateCopy = this.state.items
        let stateitemsInfoCopy = this.state.itemsInfo
        let {listImg,listImgFormData} = this.state

        let valueIdItems = ''
        for(let key in stateCopy){
            if(key === 'idItems'){
                valueIdItems = value
            }
            if(key === name){
                stateCopy[name] = value
            }
        }


        for(let key in stateitemsInfoCopy){
            if(key === name){
                stateitemsInfoCopy[name] = value
            }
        }

        if(name === 'file'){

            let files = [...e.target.files]
            files.map(file => {
                file.id = bcrypt.hashSync(file.name, salt);
                file.option =''
            })
         

            let listImgPewViews = []
            files.map(file => {
                let src = URL.createObjectURL(file) 
                listImgPewViews.push({src,file})
            })

        

            if(listImgPewViews.length !== 0){
                if(listImg.length > 0){
                    let pushNewImg = [...listImg,...listImgPewViews]
                    this.setState({
                        listImg: pushNewImg,
                        listImgFormData: e.target.files
                    })
                }else{
                    this.setState({
                        listImg: [...listImgPewViews],
                        listImgFormData: e.target.files
                    })
                }
            }
        }


        this.setState({
            items: {...stateCopy},
            itemsInfo: {
                ...stateitemsInfoCopy,
                itemsId: stateCopy.idItems
            }
        })
    }


    // Xl lấy user tương ứng khi chọn shop
    handleGetOneUser =  async(id) => {
        let {language} = this.props
        let data = {value: 'none', label: 'undefined'}
        let res = await adminService.getOneUser(id)

        if(res && res.data.errCode === 0){
            data.value = res.data.data && res.data.data.value
            data.label = language === languages.VI ? res.data.data.labelVi : res.data.data.labelEn
        }
        return data
    }


    // Xl change input select
    handlChangeSlelect = async (valueOptions, name) => {
        let {items,itemsInfo,itemsSizeAmount,listImg,itemsColorImgages} = this.state
        let {allShops} = this.props
        let {idItems} = this.state.items
        
        if(name.name === 'idShop') {   
            let res = await this.handleGetOneUser(valueOptions.value)

            let addressShop = allShops.filter(item => {
                if(item.id === valueOptions.value){return item}
            })

            this.setState({
                optionsSelect: valueOptions,
                optionsSelectUser: res,
                onSubmit: false,
                items: {
                    ...items,
                    idShop: valueOptions.value,
                    manageId: res.value
                },
                itemsInfo: {
                    ...itemsInfo,
                    sentFrom: addressShop[0].addressShop
                }
            })
        }
   
        if(name.name === 'category') {
            await this.props.getAllCodeInToItems(valueOptions.value)

            this.setState({
                optionsCategory: valueOptions,
                items: {
                    ...items,
                    category: valueOptions.value
                }
            })
        }

        if(name.name === 'type') {
            this.setState({
                optionsCategoryType: valueOptions,
                items: {
                    ...items,
                    type: valueOptions.value
                }
            })
        }

        if(name.name === 'sale') {
            this.setState({
                optionsSele: valueOptions,
                items: {
                    ...items,
                    discount: valueOptions.value
                }
            })
        }

        if(name.name === 'trademark') {
            this.setState({
                optionsTrademark: valueOptions,
                itemsInfo: {
                    ...itemsInfo,
                    trademark: valueOptions.value
                }
            })
        }
        
        if(name.name === 'itemsSizeAmount') {
            let {SIZE,SZNB,notSize} = this.state
            await this.props.getAllCodeInToItems(valueOptions.value)

            this.setState({
                optionsItemsSizeAmount: valueOptions,
            })
        }


        if(name.name !== 'itemsSizeAmount' &&  name.name !== 'trademark' && name.name !== 'sale' && name.name !== 'type' &&name.name !== 'category' && name.name !== 'idShop'){

            let stateCoppyitemsColorImgages = []
    
            listImg.map(img => {
                if(img.file.id === name.name){
                    img.file.option = valueOptions
                }
                stateCoppyitemsColorImgages.push({color: img.file.option.value, itemId: idItems,image: img.file.id})
            })
            
        
            
    
            
    
    
            this.setState({
                listImg: [...listImg],
                itemsColorImgages: [...stateCoppyitemsColorImgages]
            })
        }
    }


    // SustomStyle select react
    customStyles = {
        menu: (provided, state) => ({
            ...provided,
            zIndex: 99999,
        }),
    }


    // changeInput size
    heandleChangeInputSize = (value,keyMap, type) => {
        let {SIZE,SZNB,notSize,optionsItemsSizeAmount,itemsSizeAmount} = this.state
        let {idItems} = this.state.items

        let stateSIZECoppy = SIZE
        let stateSZNBCoppy = SZNB
        let statenotSizeCoppy = notSize



        // Kieu chu
        if(type === 'SIZE'){
            for(let key in stateSIZECoppy){
                if(key === keyMap){
                    stateSIZECoppy[key] = {itemsId:idItems, typeSize:type,size: keyMap, amount: value,}
                }
            }
        }

        if(type === 'SZNB'){
            for(let key in stateSZNBCoppy){
                if(key === keyMap){
                    stateSZNBCoppy[key] = {itemsId:idItems, typeSize:type,size: keyMap, amount: value,}
                }
            }
        }

        if(keyMap === 'FRSZ'){
            for(let key in statenotSizeCoppy){
                if(key === keyMap){
                    statenotSizeCoppy[key] = {itemsId:idItems, typeSize: 'FRSZ',size: 'FRSZ', amount: value,}
                }
            }
        }

        if(optionsItemsSizeAmount.value === 'SIZE'){
            this.setState({
                itemsSizeAmount: {...stateSIZECoppy}
            })
        }
        if(optionsItemsSizeAmount.value === 'SZNB'){
            this.setState({
                itemsSizeAmount: {...stateSZNBCoppy}
            })
        }  
        if(optionsItemsSizeAmount.value === 'FRSZ'){
            this.setState({
                itemsSizeAmount: {...statenotSizeCoppy}
            })
        }
    }


    // Delete img pewview 
    deleteImgPewView = (img) => {
        let {listImg,listImgFormData} = this.state
        let newListImg = listImg.filter(item => {
            if(item !== img){
                return item
            }
        })

        let listImgFile =  newListImg.map(item => {
            return item.file
        })


        this.setState({
            listImg: newListImg,
            listImgFormData: {...listImgFile}
        })


    }


    // Submit 
    handleOnSubmit = async(e) => {

        let {items,itemsInfo, itemsSizeAmount, itemsColorImgages,listImgFormData} = this.state



        console.log('Barng Items :',items)
        console.log('Barng ItemsInfo :',itemsInfo)
        console.log('Barng itemsSizeAmount :',itemsSizeAmount)
        console.log('Bang Img Items',itemsColorImgages)
        console.log('Bang img form data',listImgFormData)


        let dataItems = JSON.stringify(items)
        let dataItemsInfo = JSON.stringify(itemsInfo)
        let datItemsSizeAmount = JSON.stringify(itemsSizeAmount)
        let dataItemsColorImgages = JSON.stringify(itemsColorImgages)


    

        let data = new FormData()
        data.append("files", listImgFormData )
        data.append("dataItems", dataItems)


        let res = await adminService.addNewItems(data)



        console.log(res)









        // data.append("file", itemsInfo )
        // data.append("file", itemsColorImgages)

        // data.append("name", 'shopData')
        // data.append("shopData", shopData ? shopData : '')




    }


    render() {

    let {language} = this.props
    let {name,price,newPrice,idItems} = this.state.items
    let {sentFrom,production,texture} = this.state.itemsInfo
    let {amount} = this.state.itemsSizeAmount

    let {
        listAllShops,
        optionsSelect,
        optionsSelectUser,
        listAllUser,
        optionsCategory,
        listAllCategory,
        listAllCategoryType,
        optionsCategoryType,
        listSale,
        optionsSele,
        listTrademark,
        optionsTrademark,
        listItemsSizeAmount,
        optionsItemsSizeAmount,
        listSIZEData,
        isBTNVi,
        listImg,
        listColor,
        items,
        itemsInfo,
        itemsSizeAmount,
        SIZE,
        SZNB,
        notSize,
        itemsColorImgages,
        listImgFormData,
        onSubmit
    } = this.state


    // console.log('Barng Items :',items)
    // console.log('Barng ItemsInfo :',itemsInfo)
    // console.log('Barng itemsSizeAmount :',itemsSizeAmount)
    // console.log('Bang Img Items',itemsColorImgages)
    // console.log('Bang img form data',listImgFormData)



    const mdParser = new MarkdownIt();
    return (
        <>
        <div className='l-12'>
            <p className='heading-manage-user'><SwitchLanguage id='manageAdmin.createItems' /></p> 
        </div> 
        
        <div className='col l-3'>
            <span className='sub-heading' >
                <SwitchLanguage id='manageAdmin.createItems'/>
                <FontAwesomeIcon className='icon-user' icon={faStore} />
            </span>
        </div>
       
        <div style={{height: 'auto'}} className='all-input l-12'>

            <div className='list-input'>
                <div className='form-input col l-6'>
                    <label className='input-label'><SwitchLanguage id='manageAdmin.form.nameShop'/></label>
                    <Select
                        value={optionsSelect}
                        onChange={this.handlChangeSlelect}
                        options={listAllShops}
                        styles={this.customStyles}
                        name='idShop'
                        placeholder={<SwitchLanguage id='manageAdmin.form.nameShop'/>}
                    />



                </div>

                <div className='form-input col l-6'>
                    <label className='input-label'><SwitchLanguage id='manageAdmin.form.manageId'/></label>
                    <Select
                        isDisabled={true}
                        value={optionsSelectUser}
                        onChange={this.handlChangeSlelect}
                        options={listAllUser}
                        styles={this.customStyles}
                        placeholder={<SwitchLanguage id='manageAdmin.form.manageId'/>}
                    />

                </div>
            </div>


            <div className='list-input'>
                <div className='form-input col l-6'>
                    <label className='input-label'><SwitchLanguage id='manageAdmin.form.idItems'/></label>
                    <input  type='text' className='input' name='idItems'  value={idItems}  onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)}   
                        style={idItems !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}
                    />

                    <span className='planceholder_input'><SwitchLanguage id='manageAdmin.form.planceholder_idItems' /></span>
                </div>


                <div className='form-input col l-6'>
                    <label className='input-label'><SwitchLanguage id='manageAdmin.form.category'/></label>
                    <Select
                        value={optionsCategory}
                        onChange={this.handlChangeSlelect}
                        options={listAllCategory}
                        styles={this.customStyles}
                        placeholder={<SwitchLanguage id='manageAdmin.form.planceholder_category'/>}
                        name="category"

                    />
                </div>

               
            </div>



            <div className='list-input'>
                <div className='form-input col l-6'>
                    <label className='input-label'><SwitchLanguage id='manageAdmin.form.type'/></label>
                    <Select
                        isDisabled={optionsCategory !== null ? false : true}
                        value={optionsCategoryType}
                        onChange={this.handlChangeSlelect}
                        options={listAllCategoryType}
                        styles={this.customStyles}
                        placeholder={<SwitchLanguage id='manageAdmin.form.planceholder_type'/>}
                        name="type"
                        
                    />
                </div>

                <div className='form-input col l-6'>
                    <label className='input-label'><SwitchLanguage id='manageAdmin.form.sale'/></label>
                     <Select
                        value={optionsSele}
                        onChange={this.handlChangeSlelect}
                        options={listSale}
                        styles={this.customStyles}
                        placeholder={<SwitchLanguage id='manageAdmin.form.planceholder_sale'/>}
                        name="sale"
                        
                    />
                </div>

            </div>


            <div className='list-input'>
                <div className='form-input col l-6'>
                    <label className='input-label'><SwitchLanguage id='manageAdmin.form.price'/></label>
                    <input  type='text' className='input' name='price'  value={price}  onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)}   
                        style={price !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}
                    />

                    <span className='planceholder_input'><SwitchLanguage id='manageAdmin.form.planceholder_price' /></span>
                </div>

                <div className='form-input col l-6'>
                    <label className='input-label'><SwitchLanguage id='manageAdmin.form.nameItems'/></label>
                    <input  type='text' className='input' name='name' value={name} onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)}   
                        style={name !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}
                    />

                    <span className='planceholder_input'><SwitchLanguage id='manageAdmin.form.nameItems' /></span>
                </div>
             
            </div>


            {/*  */}
            <div className='list-input'>
                <div className='form-input col l-6'>
                    <label className='input-label'><SwitchLanguage id='manageAdmin.form.trademark'/></label>
                    <Select
                        value={optionsTrademark ? optionsTrademark : ''}
                        onChange={this.handlChangeSlelect}
                        options={listTrademark}
                        styles={this.customStyles}
                        name='trademark'
                        placeholder={<SwitchLanguage id='manageAdmin.form.planceholder_trademark'/>}
                    />

                </div>

                <div className='form-input col l-6'>
                    <label className='input-label'><SwitchLanguage id='manageAdmin.form.production'/></label>
                    <input  type='text' className='input' name='production'  value={production} onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)} 
                        style={production !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}
                    />

                    <span className='planceholder_input'><SwitchLanguage id='manageAdmin.form.planceholder_production'/></span>
                </div>
            </div>


            <div className='list-input'>
                <div className='form-input col l-6'>
                    <label className='input-label'><SwitchLanguage id='manageAdmin.form.sentFrom'/></label>
                    <input  type='text' className='input' name='sentFrom'  value={sentFrom} onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)} 
                        style={sentFrom !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}
                    />

                    <span className='planceholder_input'><SwitchLanguage id='manageAdmin.form.planceholder_sentFrom'/></span>
                </div>


                <div className='form-input col l-6'>
                    <label className='input-label'><SwitchLanguage id='manageAdmin.form.texture'/></label>
                    <input  type='text' className='input' name='texture'  value={texture} onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)} 
                        style={texture !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}
                    />
                    
                    <span className='planceholder_input'><SwitchLanguage id='manageAdmin.form.planceholder_texture'/></span>
                </div>
            </div>



        {/* Select size */}
        <div className='list-input'>
            <div className='form-input col l-6'>
                <label className='input-label'><SwitchLanguage id='manageAdmin.form.itemsSizeAmount'/></label>
                <Select
                    isDisabled={idItems != '' ? false : true}
                    value={optionsItemsSizeAmount ? optionsItemsSizeAmount : ''}
                    onChange={this.handlChangeSlelect}
                    options={listItemsSizeAmount}
                    styles={this.customStyles}
                    name='itemsSizeAmount'
                    placeholder={<SwitchLanguage id='manageAdmin.form.planceholder_itemsSizeAmount'/>}
                />
            </div>


            <div className='form-input col l-6'>
                {optionsItemsSizeAmount &&  optionsItemsSizeAmount.value === 'FRSZ' &&
                    <>
                        <label className='input-label'><SwitchLanguage id='manageAdmin.form.amount'/></label>
                        <input  type='number' className='input' onChange={(e) => this.heandleChangeInputSize(e.target.value,'FRSZ',)}
                            placeholder={languages.EN === language  ? 'Enter amount...' : 'Nhập số lượng cỡ...'} 
                        
                        />
                    </>
                }
            </div>
        </div>



        {/* List size */}
        {optionsItemsSizeAmount &&  optionsItemsSizeAmount.value !== 'FRSZ' &&
            <div className='list-input size'> 
                {listSIZEData && listSIZEData.length > 0 && listSIZEData.map((item , index) => {
                    return (
                        <div key={index} className='list-input-size col l-3'>
                            <span className='input-label'>{languages.EN === language  ? 'Size' : 'Cỡ'} {item.valueEn}</span>
                            <input type='number' name={item.value} 
                                placeholder={languages.EN === language  ? 'Enter amount...' : 'Nhập số lượng cỡ...'} className='input l-9' 
                                onChange={(e) => this.heandleChangeInputSize(e.target.value,item.keyMap,item.type)}
                            />
                            
                        </div>
                    )
                })} 
            </div>
        }


            {/* Description items */}
            <div className='list-input'>
                <div className='col l-12'>
                    <label className='input-label'><SwitchLanguage id='manageAdmin.form.description'/></label>

                    <div className='list-btn'>
                        <span  onClick={() => this.setState({isBTNVi: !isBTNVi})} >
                            <Button type={isBTNVi === true ? 'submit-form-data' : 'close-form-data'} content={<SwitchLanguage id='manageAdmin.form.descriptionVi'/>} />
                        </span>
                        <span  onClick={() => this.setState({isBTNVi: !isBTNVi})} >
                            <Button type={isBTNVi === true ? 'close-form-data' : 'submit-form-data'} content={<SwitchLanguage id='manageAdmin.form.descriptionEn'/>}/>
                        </span>
                    </div>
                  
                    <MdEditor
                        style={isBTNVi && isBTNVi ? { height: '70vh' } : {height: '0px', overflow: 'hidden'}} 
                        renderHTML={text => mdParser.render(text)} 
                        onChange={this.handleEditorChangeVi} 
                        value={this.state.itemsInfo.describeTextVi || ''}
                    />
            
                    <MdEditor2
                        style={!isBTNVi && !isBTNVi ? { height: '70vh ' } : {height: '0px', overflow: 'hidden'}}
                        renderHTML={text => mdParser.render(text)} 
                        onChange={this.handleEditorChangeEn} 
                        value={this.state.itemsInfo.describeTextEn || ''}
                    />
            
                </div>
            </div> 
        </div>

       
    {/* Pewview img */}
    {idItems &&
    <div className='list-input img'>
        {listImg  && listImg.length > 0 && listImg.map((srcImg,index) => {
            return (
                <div key={srcImg.src} className="col l-2-4">
                    <div className='ct__product-show'
                        style={{ backgroundImage: `url(${srcImg.src})`, height: '500' }}>
                        <FontAwesomeIcon icon={faPlus} className='icon-close' onClick={() => this.deleteImgPewView(srcImg)}/>
                    </div>

                
                    <Select
                        className='select-color'
                        value={srcImg.file.option || ''}
                        onChange={this.handlChangeSlelect}
                        options={listColor}
                        styles={this.customStyles}
                        name={srcImg.file.id}
                        placeholder={<SwitchLanguage id='manageAdmin.form.planceholder_color'/>}
                    />
                </div>
            )
        })}




        <div id='add' className="col l-2-4">
            <div className='border-add-img'>
                <FontAwesomeIcon icon={faPlus}/>
                <span><SwitchLanguage id='manageAdmin.form.addImg'/></span>
            </div>

            <input type='file' name='file' multiple="multiple" onChange={(e) => this.heandleChangeInput(e, e.target.name, e)} />
        </div>

    </div>
    }   


        <div className='col l-12'>
          
            <div className='list-btn'>
                <span onClick={(e) => this.handleOnSubmit(e)}>
                    <Button 
                        type='submit-form-data' 
                        content={<SwitchLanguage id='manageAdmin.form.addItems'/>} 
                        />
                </span>
                
                    {/* 'close-form-data' */}
               
            </div>
            
        </div>

                



   
    <p>
        {/* <div class="col l-2-4 m-4 c-6">
            <a href="#/" class="ct__product">
                <span class="ct__product-label-love">Yêu Thích</span>
                <div class="ct__product-label-sale ">
                    <span class="ct__label-sale">Giảm</span>
                    <span class="ct__label-sale-percent">5%</span>
                </div>
                <div class="ct__product-show style=" style="background-image: url(./filecss/imagecontac/sp3.jpg);"></div>
                <div class="ct__product-information">
                    <span class="ct__product-introduce">Kính râm thiết kế mắt mèo kiểu Hàn Quốc cho nam lẫn nữ 6035</span>
                    <div class="ct__produc-list-price">
                    <span class="ct__product-sale">Giảm giá 7k</span>
                    <span class="ct__product-tag">#shopxuhuong</span>
                    </div>

                    <div class="ct__produc-list-price">
                        <span class="ct__produc-price">225.000 đ</span>
                        <i class="ct__produc-icon-ship fas fa-shipping-fast"></i>
                    </div>

                    <div class="ct__produc-list-price">
                        <div class="ct__list-star">
                            <i class="ct__list-star-icon fix-color-icon fas fa-star"></i>
                            <i class="ct__list-star-icon fix-color-icon fas fa-star"></i>
                            <i class="ct__list-star-icon fix-color-icon fas fa-star"></i>
                            <i class="ct__list-star-icon fix-color-icon fas fa-star"></i>
                            <i class="ct__list-star-icon fas fa-star"></i>
                        </div>                             
                        <span class=" ct__produc-price-show">Đã Bán 103</span>
                    </div>

                    <h1 class="ct__product-form">Hải Phòng</h1>
                </div>
            </a>
        </div> */} 
    </p>
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
        allShops: state.admin.listShops.allShops,
        allcategory: state.admin.dataForm.category,
        
        FSBData: state.admin.listAllCodeItems.FSBData,
        FSAMData: state.admin.listAllCodeItems.FSAMData,
        FSMData: state.admin.listAllCodeItems.FSMData,
        FSAWData: state.admin.listAllCodeItems.FSAWData,
        AllData: state.admin.listAllCodeItems.AllData,
        DCCData: state.admin.listAllCodeItems.DCCData,
        BNPRDData: state.admin.listAllCodeItems.BNPRDData,
        TYPESIZEData: state.admin.listAllCodeItems.TYPESIZEData,

        SIZEData: state.admin.listAllCodeItems.SIZEData,
        SZNBData: state.admin.listAllCodeItems.SZNBData,
        FRSZData: state.admin.listAllCodeItems.FRSZData,
        COLORData: state.admin.listAllCodeItems.COLORData,



    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllShop: () => dispatch(actions.getAllShopStart()),
        getCategoryAllCode: () => dispatch(actions.getCategoryAllCodeStart()),
        getAllCodeInToItems: (type) => dispatch(actions.getAllCodeInToItemsStart(type)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Items);
