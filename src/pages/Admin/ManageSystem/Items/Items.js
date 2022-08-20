import React, { Component } from 'react';
import { connect } from "react-redux";
import SwitchLanguage from '../../../../SwitchLanguage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStore,faPlus,faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import * as actions from '../../../../store/action';
import adminService from '../../../../services/adminService';
import {languages } from '../../../../utils/constant'
import { toast } from 'react-toastify';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite'; 
import MdEditor2 from 'react-markdown-editor-lite'; 
import  handleResetState from '../../../../utils/comparativeHandling'
import 'react-markdown-editor-lite/lib/index.css';
import Button from '../../../../components/Button/Button';
import Select from 'react-select';
import _ from 'lodash'
import bcrypt from 'bcryptjs'

import './Items.scss'
import ListItems from './ListItems/ListItems';
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

            isShowListsInput: false,
            isEmptykeyObjectSizeItems: false,
            isImgColor: false,
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
            listImgFormData: '',
            listErrorForm: {
                category: {},
                describeHtmlEn: {},
                describeHtmlVi: {},
                describeTextEn: {},
                describeTextVi: {},
                discount: {},
                idItems: {},
                idShop: {},
                itemsId: {},
                itemsSizeAmount: {},
                manageId: {},
                name: {},
                price: {},
                sentFrom: {},
                trademark: {},
                type: {},
                file: {}
            }
        };
    }
   

    // // DidMound
    componentDidMount = async ()=>  {
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
        let {listErrorForm} = this.state

        this.setState({ 
            itemsInfo: {
                ...this.state.itemsInfo,
                describeTextVi: text || '',
                describeHtmlVi: html || '',
            },
            listErrorForm: {
                ...listErrorForm,
                describeTextVi: {}
            }
        })
    }

    
    // Change Mô tả Sản phẩm En
    handleEditorChangeEn = ({ html, text }) => {
        let {listErrorForm} = this.state
        this.setState({ 
            itemsInfo: {
                ...this.state.itemsInfo,
                describeTextEn: text || '',
                describeHtmlEn: html || ''
            },
            listErrorForm: {
                ...listErrorForm,
                describeTextEn: {}
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
     
        // Khi thay dổi ngôn ngữ
        if(prevProps.language !== this.props.language){
            let allTypeCategory = []
            let {optionsCategory, optionsSelectUser, optionsCategoryType,optionsItemsSizeAmount,optionsColor,itemsColorImgages,listImg} = this.state
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

            // Thay đổi  ngôn ngữ sửa option
            let dataImgColorChangeLanguage = []
            listImg.map(item => {
                newListColor.map(color => {
                    let colorOptionImg = item.file && item.file.option && item.file.option.value
                    if(color.value === colorOptionImg){    
                        item.file.option = color                   
                        dataImgColorChangeLanguage = [...dataImgColorChangeLanguage,item]
                    }
                })
            })


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
                // optionsColor: mewOptionsColor,
                listImg: dataImgColorChangeLanguage,
                listColor: newListColor,
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
        let stateItemsInfoCopy = this.state.itemsInfo
        let {listImg,listImgFormData,listErrorForm} = this.state

        //  onchange input của items
        if(name === 'name' || name === 'price'  || name === 'newPrice' || name === 'idItems'){
            let valueIdItems = ''
            for(let key in stateCopy){
                if(key === 'idItems'){
                    valueIdItems = value
                }
                if(key === name){
                    stateCopy[name] = value
                }
            }

            // Name
            if(name === 'name'){
                this.setState({
                    items: {...stateCopy},
                    listErrorForm: {...listErrorForm,name: {}},
                })
            }
    
            // Price
            if(name === 'price'){
                this.setState({
                    items: {...stateCopy},
                    listErrorForm: {...listErrorForm,price: {}},
                })
            }
    
            // idItems
            if(name === 'idItems'){
                this.setState({
                    items: {...stateCopy},
                    listErrorForm: {...listErrorForm,idItems: {}},
                })
            }
        }


        // Change input của itemsInfo
        if(name === 'sentFrom' || name === 'production'  || name === 'texture' ) {
            for(let key in stateItemsInfoCopy){
                if(key === name){
                    stateItemsInfoCopy[name] = value
                }
            }

            // Price
            if(name === 'sentFrom'){
                this.setState({
                    items: {...stateCopy},
                    listErrorForm: {...listErrorForm,sentFrom: {}},
                })
            }
    
            // Set state
            this.setState({
                itemsInfo: {
                    ...stateItemsInfoCopy,
                    itemsId: stateCopy.idItems,
                },
            })
        }


        // Khi onchange  file
        if(name === 'file'){
            let files = [...e.target.files]
          
            // Set id cho file
            files.map(file => {
                file.id = bcrypt.hashSync(file.name, salt);
                file.option =''
            })
         

            // Set pewview img
            let listImgPewViews = []
            files.map(file => {
                let src = URL.createObjectURL(file) 
                listImgPewViews.push({src,file})
            })

            
            // Khi onChange file
            if(listImgPewViews.length !== 0){
                let pushNewImg = [...listImg,...listImgPewViews]

                if(pushNewImg.length < 12){
                    let listImgFile =  pushNewImg.map(item => {
                        return item.file
                    })
    
                    // console.log(listImgFile)
                    if(listImg.length > 0){
                        this.setState({
                            isImgColor: false,
                            listImg: pushNewImg,
                            listImgFormData: listImgFile
                        })
                    }else{
                        this.setState({
                            listImg: [...listImgPewViews],
                            listImgFormData: e.target.files,
                            listErrorForm:{...listErrorForm,file: {}}
                        })
                    }
                }else{
                    files = []
                    this.setState({
                        listImg: [],
                        listImgFormData: [],
                        listErrorForm:{
                            file: {
                                valueVi: 'Số lượng ảnh không được lớn hơn 12 !!!',
                                valueEn: 'Number of photos should not be more than 12!!!',
                            }
                        }
                    })
                }
            }

        }
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
        let {items,itemsInfo,listImg,listErrorForm} = this.state
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
                },
                listErrorForm: {
                    ...listErrorForm,
                    idShop: {}
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
                },
                listErrorForm: {
                    ...listErrorForm,
                    category: {}
                }
            })
        }

        if(name.name === 'type') {
            this.setState({
                optionsCategoryType: valueOptions,
                items: {
                    ...items,
                    type: valueOptions.value,
                },
                listErrorForm: {
                    ...listErrorForm,
                    type: {}
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
                },
                listErrorForm: {
                    ...listErrorForm,
                    trademark: {}
                }
            })
        }
        
        if(name.name === 'itemsSizeAmount') {
            await this.props.getAllCodeInToItems(valueOptions.value)

            this.setState({
                optionsItemsSizeAmount: valueOptions,
                listErrorForm: {
                    ...listErrorForm,
                    itemsSizeAmount: {}
                }
            })
        }

        if(name.name !== 'itemsSizeAmount' &&  name.name !== 'trademark' && name.name !== 'sale' && name.name !== 'type' &&name.name !== 'category' && name.name !== 'idShop'){

            let stateCoppyitemsColorImgages = []
    
            // Gán màu cho input select màu
            listImg.map(img => {
                if(img.file.id === name.name){
                    img.file.option = valueOptions
                }
                stateCoppyitemsColorImgages.push({color: img.file.option.value, itemId: idItems})
            })


            // Check ảnh đã được chọn màu hay chưa (bool)
            let isImgColor = true
            listImg.map(item => {
                if(item.file.option === '' || item.file.option === null || item.file.option === undefined){
                    isImgColor = false
                }
            })
            

            console.log(stateCoppyitemsColorImgages)
            
            this.setState({
                isImgColor: isImgColor,
                listImg: [...listImg],
                itemsColorImgages: {...stateCoppyitemsColorImgages},
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
        let {SIZE,SZNB,notSize,itemsSizeAmount,listErrorForm} = this.state
        let {idItems} = this.state.items

        let stateSIZECoppy = SIZE
        let stateSZNBCoppy = SZNB
        let statenotSizeCoppy = notSize


        // Set kieu size
        if(type === 'SIZE'){
            for(let key in stateSIZECoppy){
                if(key === keyMap){
                    stateSIZECoppy[key] = {itemsId:idItems, typeSize:type,size: keyMap, amount: value,}
                }
            }
            this.setState({
                itemsSizeAmount: {...stateSIZECoppy},
                listErrorForm: {...listErrorForm,itemsSizeAmount: {}},
            })
        }

        if(type === 'SZNB'){
            for(let key in stateSZNBCoppy){
                if(key === keyMap){
                    stateSZNBCoppy[key] = {itemsId:idItems, typeSize:type,size: keyMap, amount: value,}
                }
            }
            this.setState({
                itemsSizeAmount: {...stateSZNBCoppy},
                listErrorForm: {...listErrorForm,itemsSizeAmount: {}},
            })
        }

        if(keyMap === 'FRSZ'){
            for(let key in statenotSizeCoppy){
                if(key === keyMap){
                    statenotSizeCoppy[key] = {itemsId:idItems, typeSize: 'FRSZ',size: 'FRSZ', amount: value,}
                }
            }
            this.setState({
                itemsSizeAmount: {...statenotSizeCoppy},
                listErrorForm: {...listErrorForm,itemsSizeAmount: {}},
            })
        }


        let isEmptykeyObjectSizeItems = false
        for(let key in itemsSizeAmount){
            if(!_.isEmpty(itemsSizeAmount[key])){
                isEmptykeyObjectSizeItems = true
            }
        }
        this.setState({
            isEmptykeyObjectSizeItems: isEmptykeyObjectSizeItems
        })
    }


    // Delete img pewview 
    deleteImgPewView = (img) => {
        let {listImg} = this.state

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
            listImgFormData: [...listImgFile]
        })
    }


    // Submit 
    handleOnSubmit = async(e) => {
        e.preventDefault()
        let {items,itemsInfo, itemsSizeAmount, itemsColorImgages,listImgFormData,listErrorForm} = this.state
        let listErrorFromCoppy = listErrorForm

        // Loại bỏ PT rỗng size cỡ
        for(let key in itemsSizeAmount){
            if(itemsSizeAmount[key] === ''){
                delete itemsSizeAmount[key]
            }
        }

        // Chuyển data về string
        let dataItems = JSON.stringify(items)
        let dataItemsInfo = JSON.stringify({...itemsInfo,itemsId: items.idItems})
        let datItemsSizeAmount = JSON.stringify(itemsSizeAmount)
     

        // Lặp gán lại tên file và tên file trong {} itemsColorImgages
        let listImgFormDataArray =  listImgFormData
        let data = new FormData()
        for(let key in itemsColorImgages){
            if(listImgFormData[key]){
                data.append("name", 'file')
                itemsColorImgages[key].image = `name${new Date().getTime()}${Math.floor(1000 + Math.random() * 9000)}.jpg`
                data.append("file", listImgFormDataArray[key],`${itemsColorImgages[key].image}`)
            }
        }

        // Append form data
        let dataItemsColorImgages = JSON.stringify(itemsColorImgages)
        data.append("dataItemsColorImgages", dataItemsColorImgages)
        data.append("dataItems", dataItems)
        data.append("dataItemsInfo", dataItemsInfo)
        data.append("datItemsSizeAmount", datItemsSizeAmount) 


        // Truyền data xuống backend

        
        let res = await adminService.addNewItems(data)
        console.log(res)


        if(res && res.data.errCode === 0) {

            let newDataItems = handleResetState.resetDefaultState(items)
            let newDataItemsInfo = handleResetState.resetDefaultState(itemsInfo)
            let newDataErr = handleResetState.resetDefaultState(listErrorForm)
            // let newDataItems = handleResetState.resetDefaultState()






            this.setState({
                itemsSizeAmount:{},
                listImg: [],
                items: {...newDataItems},
                itemsInfo: {...newDataItemsInfo},
                listErrorForm: {...newDataErr},
                optionsColor: null,
                optionsSize: null,
                optionsItemsSizeAmount: null,
                optionsTrademark: null,
                optionsSele: null,
                optionsCategoryType: null,
                optionsSelect: null,
                optionsCategory: null,
                optionsSelectUser: null,
                isEmptykeyObjectSizeItems: false,
                isImgColor: false,
                isBTNVi: true,
               
            })

            toast.success(<SwitchLanguage id='manageAdmin.toast.success'/>)
        }

        console.log(res.data.errCode)
        if(res && res.data.errCode === -1){
            let dataErr = res.data.data
            

            console.log(dataErr)
            console.log(listErrorForm)


            for(let key in listErrorFromCoppy){
                if(key !== 'file') {
                    listErrorFromCoppy[key] = dataErr[key]
                }
            }

            // console.log(listErrorFromCoppy)


            this.setState({
                listErrorForm: {...listErrorFromCoppy}
            })

            toast.error(<SwitchLanguage id='manageAdmin.toast.warn'/>)
        }
        if(res && res.data.data && res.data.data.errCode === -2){
            this.setState({
                listErrorForm: {
                    ...listErrorFromCoppy,
                    idItems: {
                        valueVi: 'ID Sản phẩm đã tồn tại !!!',
                        valueEn: 'ID Product already exists !!!',
                    }
                }
            })
        }
    }



    


    // Xl ẩn hiện form
    handleShowHideInputsUser = () => {
   
        this.setState({       
            isShowListsInput: !this.state.isShowListsInput
        })
        
    }


    render() {
    let {language} = this.props
    let {name,price,idItems} = this.state.items
    let {sentFrom,production,texture} = this.state.itemsInfo

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
        isImgColor,
        isEmptykeyObjectSizeItems,
        listErrorForm,
        isShowListsInput
    } = this.state

    // console.log(listImg)


    const mdParser = new MarkdownIt();
    return (
        <>
        <div className='l-12'>
            <p className='heading-manage-user'><SwitchLanguage id='manageAdmin.createItems' /></p> 
        </div> 
        
        <div className='col l-3'>
            <span className='sub-heading' onClick={() => this.handleShowHideInputsUser()}>
                <SwitchLanguage id='manageAdmin.createItems'/>
                <FontAwesomeIcon className='icon-user' icon={faStore} />
            </span>
        </div>
       
        { isShowListsInput && 
            <div style={{height:'auto'}} className='all-input l-12'>
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
                        <span className='err'> {!_.isEmpty(listErrorForm.idShop) && <FontAwesomeIcon  icon={faCircleExclamation} />} 
                            {!_.isEmpty(listErrorForm.idShop) ? language === languages.VI ? listErrorForm.idShop.valueVi : listErrorForm.idShop.valueEn : ''}
                        </span>
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
                        <span className='err'></span>
                    </div>
                </div>


                <div className='list-input'>
                    <div className='form-input col l-6'>
                        <label className='input-label'><SwitchLanguage id='manageAdmin.form.idItems'/></label>
                        <input  type='text' className='input' name='idItems'  value={idItems}  onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)}   
                            style={idItems !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}
                        />
                        <span className='planceholder_input'><SwitchLanguage id='manageAdmin.form.planceholder_idItems' /></span>
                        <span className='err'> {!_.isEmpty(listErrorForm.idItems) && <FontAwesomeIcon  icon={faCircleExclamation} />} 
                            {!_.isEmpty(listErrorForm.idItems) ? language === languages.VI ? listErrorForm.idItems.valueVi : listErrorForm.idItems.valueEn : ''}
                        </span>
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
                        <span className='err'> {!_.isEmpty(listErrorForm.category) && <FontAwesomeIcon  icon={faCircleExclamation} />} 
                            {!_.isEmpty(listErrorForm.category) ? language === languages.VI ? listErrorForm.category.valueVi : listErrorForm.category.valueEn : ''}
                        </span>
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
                        <span className='err'> {!_.isEmpty(listErrorForm.type) && <FontAwesomeIcon  icon={faCircleExclamation} />} 
                            {!_.isEmpty(listErrorForm.type) ? language === languages.VI ? listErrorForm.type.valueVi : listErrorForm.type.valueEn : ''}
                        </span>
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
                        <span className='err'></span>
                    </div>
                </div>


                <div className='list-input'>
                    <div className='form-input col l-6'>
                        <label className='input-label'><SwitchLanguage id='manageAdmin.form.price'/></label>
                        <input  type='text' className='input' name='price'  value={price}  onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)}   
                            style={price !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}
                        />
                        <span className='planceholder_input'><SwitchLanguage id='manageAdmin.form.planceholder_price' /></span>
                        <span className='err'> {!_.isEmpty(listErrorForm.price) && <FontAwesomeIcon  icon={faCircleExclamation} />} 
                            {!_.isEmpty(listErrorForm.price) ? language === languages.VI ? listErrorForm.price.valueVi : listErrorForm.price.valueEn : ''}
                        </span>
                    </div>

                    <div className='form-input col l-6'>
                        <label className='input-label'><SwitchLanguage id='manageAdmin.form.nameItems'/></label>
                        <input  type='text' className='input' name='name' value={name} onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)}   
                            style={name !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}
                        />
                        <span className='planceholder_input'><SwitchLanguage id='manageAdmin.form.nameItems' /></span>
                        <span className='err'> {!_.isEmpty(listErrorForm.name) && <FontAwesomeIcon  icon={faCircleExclamation} />} 
                            {!_.isEmpty(listErrorForm.name) ? language === languages.VI ? listErrorForm.name.valueVi : listErrorForm.name.valueEn : ''}
                        </span>
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
                        <span className='err'> {!_.isEmpty(listErrorForm.trademark) && <FontAwesomeIcon  icon={faCircleExclamation} />} 
                            {!_.isEmpty(listErrorForm.trademark) ? language === languages.VI ? listErrorForm.trademark.valueVi : listErrorForm.trademark.valueEn : ''}
                        </span>
                    </div>

                    <div className='form-input col l-6'>
                        <label className='input-label'><SwitchLanguage id='manageAdmin.form.production'/></label>
                        <input  type='text' className='input' name='production'  value={production} onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)} 
                            style={production !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}
                        />
                        <span className='planceholder_input'><SwitchLanguage id='manageAdmin.form.planceholder_production'/></span>
                        <span className='err'></span>
                    </div>
                </div>

                <div className='list-input'>
                    <div className='form-input col l-6'>
                        <label className='input-label'><SwitchLanguage id='manageAdmin.form.sentFrom'/></label>
                        <input  type='text' className='input' name='sentFrom'  value={sentFrom} onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)} 
                            style={sentFrom !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}
                        />
                        <span className='planceholder_input'><SwitchLanguage id='manageAdmin.form.planceholder_sentFrom'/></span>
                        <span className='err'> {!_.isEmpty(listErrorForm.sentFrom) && sentFrom === '' && <FontAwesomeIcon  icon={faCircleExclamation} />} 
                            {!_.isEmpty(listErrorForm.sentFrom) && sentFrom === '' ? language === languages.VI ? listErrorForm.sentFrom.valueVi : listErrorForm.sentFrom.valueEn : ''}
                        </span>
                    </div>


                    <div className='form-input col l-6'>
                        <label className='input-label'><SwitchLanguage id='manageAdmin.form.texture'/></label>
                        <input  type='text' className='input' name='texture'  value={texture} onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)} 
                            style={texture !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}
                        />
                        
                        <span className='planceholder_input'><SwitchLanguage id='manageAdmin.form.planceholder_texture'/></span>
                        <span className='err'></span>
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
                        <span className='err'></span>
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
                <span className='err'> {!_.isEmpty(listErrorForm.itemsSizeAmount) && <FontAwesomeIcon  icon={faCircleExclamation} />} 
                    {!_.isEmpty(listErrorForm.itemsSizeAmount) ? language === languages.VI ? listErrorForm.itemsSizeAmount.valueVi : listErrorForm.itemsSizeAmount.valueEn : ''}
                </span>

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
                        <span className='err'> {!_.isEmpty(listErrorForm.describeTextVi) && <FontAwesomeIcon  icon={faCircleExclamation} />} 
                            {!_.isEmpty(listErrorForm.describeTextVi) ? language === languages.VI ? listErrorForm.describeTextVi.valueVi : listErrorForm.describeTextVi.valueEn : ''}
                        </span><br></br>

                        <span className='err'> {!_.isEmpty(listErrorForm.describeTextEn) && <FontAwesomeIcon  icon={faCircleExclamation} />} 
                            {!_.isEmpty(listErrorForm.describeTextEn) ? language === languages.VI ? listErrorForm.describeTextEn.valueVi : listErrorForm.describeTextEn.valueEn : ''}
                        </span>
                
                    </div>
                </div> 

                {/* Pewview img */}
                {idItems &&
                <div className='list-input img'>
                    {listImg  && listImg.length > 0 && listImg.map((srcImg,index) => {
                        return (
                            <div key={srcImg.src} className="col l-2-4">
                                <div className='ct__product-show'
                                    style={{ backgroundImage: `url(${srcImg.src})`, height: '500', opacity: srcImg.file.option === '' ? .3 : 1}}>
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
                        <input type='file' name='file' multiple onChange={(e) => this.heandleChangeInput(e, e.target.name, e)} />
                    </div>

                </div>
                }   
                <span className='err'> {!_.isEmpty(listErrorForm.file) && <FontAwesomeIcon  icon={faCircleExclamation} />} 
                    {!_.isEmpty(listErrorForm.file) ? language === languages.VI ? listErrorForm.file.valueVi : listErrorForm.file.valueEn : ''}
                </span>


                <div className='col l-12'>
                    <div className='list-btn'>
                        <span onClick={(e) =>   
                            this.state.itemsInfo.describeTextVi && 
                            this.state.itemsInfo.describeTextEn &&
                            listImg.length > 0 && isImgColor && 
                            isEmptykeyObjectSizeItems && 
                            this.handleOnSubmit(e)}
                        >
                            

                            <Button 
                                type={
                                    this.state.itemsInfo.describeTextVi && this.state.itemsInfo.describeTextEn &&
                                    listImg.length > 0 && isImgColor && isEmptykeyObjectSizeItems
                                    ? 'submit-form-data' : 'ban-form-data'
                                }
                                content={<SwitchLanguage id='manageAdmin.form.addItems'/>} 
                            />
                        </span>
                    </div>
                </div>


            </div>
        }
       
       <ListItems/>

                



   
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
