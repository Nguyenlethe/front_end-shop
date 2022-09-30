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
import 'react-markdown-editor-lite/lib/index.css';
import Button from '../../../../components/Button/Button';
import Select from 'react-select';
import _ from 'lodash'
import bcrypt from 'bcryptjs'
import generalHandling from '../../../../utils/generalHandling';

import './Items.scss'
import ListItems from './ListItems/ListItems';
import Discounts from './Discounts/Discounts';
import ListVoucher from './ListVoucher/ListVoucher';
import PriceShip from './CreateShip/PriceShip';
import ListPrice from './CreateShip/ListPriceShip/ListPrice';
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
           
            isEditDetailItems: false,
            coating: false,
            optionsColor: null,
            optionsSize: null,
            optionsItemsSizeAmount: null,
            optionsTrademark: null,
            optionsSele: null,
            optionsCategoryType: null,
            optionsSelect: null,
            optionsCategory: null,
            optionsSelectUser: null,

            editItems: false,
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
                nameEn: '',
                price: '',
                priceUS: '',
                newPrice: '',
                newPriceUS: '',
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
            SIZE: {
                SZ01:'',
                SZ02:'',
                SZ03:'',
                SZ04:'',
                SZ05:'',
                SZ06:'',
                SZ07:'',
            },
            SZNB: {
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
                nameEn: {},
                price: {},
                
                priceUS:{},
                sentFrom: {},
                trademark: {},
                type: {},
                file: {}
            },
            dataEdit: '',
            dataSizeEdit: []
        };
    }
   

    // // DidMound
    componentDidMount = async ()=>  {
        // await this.props.getCategoryAllCode()
        await this.props.getAllShop()
        this.heandleDataForm()

        let {allUserEdit} = this.props
        this.setState({
            listAllUser: allUserEdit
        })
    }
   
    
    // Change Mô tả Sản phẩm Vi
    handleEditorChangeVi = ({ html, text }) => {
        let {listErrorForm, itemsInfo,isEditDetailItems,editItems} = this.state
        let isEdit = isEditDetailItems

        if(editItems ){
            isEdit = true
        }


        this.setState({ 
            isEditDetailItems: isEdit,
            itemsInfo: {
                ...itemsInfo,
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
        let {listErrorForm,isEditDetailItems,editItems} = this.state

        let isEdit = isEditDetailItems

        if(editItems ){
            isEdit = true
        }


        this.setState({ 
            isEditDetailItems: isEdit,
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

    // XL Gán Gtri 
    heandleDataForm = (action)  => {
        let {allShops ,allcategory,DCCData,BNPRDData,TYPESIZEData,COLORData}= this.props

        let newListShop = generalHandling.handlConvertObject(allShops, 'LIST_SHOP',this.props.langauge)
        let newListCategory = generalHandling.handlConvertObject(allcategory, 'LIST_CATEGORY',this.props.language)
        let newDCCData = generalHandling.handlConvertObject(DCCData, 'LIST_CATEGORY',this.props.language)
        let newBNPRDData = generalHandling.handlConvertObject(BNPRDData, 'LIST_CATEGORY',this.props.language)
        let newTYPESIZEData = generalHandling.handlConvertObject(TYPESIZEData, 'LIST_CATEGORY',this.props.language)
        let newCOLORData = generalHandling.handlConvertObject(COLORData, 'LIST_CATEGORY',this.props.language)

        this.setState({
            listAllShops: newListShop || [],
            listAllCategory: newListCategory || [],
            listSale: newDCCData || [],
            listTrademark: newBNPRDData || [],
            listItemsSizeAmount: newTYPESIZEData || [],
            listColor: newCOLORData || [],
        })
    }

    // DidUpdate
    componentDidUpdate= async(prevProps, prevState)=> {
        let {FSBData,FSAMData,FSMData,FSAWData,AllData, SIZEData,SZNBData}= this.props

        // Khi thay dổi ngôn ngữ
        if(prevProps.language !== this.props.language){

            let {optionsCategory, optionsSelectUser, optionsCategoryType,optionsItemsSizeAmount,dataEdit,listImg,listAllCategoryType} = this.state
            let {allUserEdit,allcategory,TYPESIZEData,COLORData} = this.props
            
            if(optionsCategory){
                await this.props.getAllCodeInToItems(optionsCategory.value)
                var allTypeCategory = [...listAllCategoryType]
                var newListAllCategoryType = generalHandling.handlConvertObject(allTypeCategory, 'LIST_CATEGORY',this.props.language);
            }


            this.handleEditItems(dataEdit)
            let newListColor = generalHandling.handlConvertObject(COLORData, 'LIST_CATEGORY',this.props.language);
            let newListCategory = generalHandling.handlConvertObject(allcategory, 'LIST_CATEGORY',this.props.language);
            let newlistItemsSizeAmount = generalHandling.handlConvertObject(TYPESIZEData, 'LIST_CATEGORY',this.props.language);

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

            // Set state
            this.setState({
                // isShowListsInput: false,
                optionsItemsSizeAmount: setItemsSizeAmount,
                optionsCategoryType: newCategoryType,
                optionsCategory: categoryName,
                optionsSelectUser: userName,
                listItemsSizeAmount: newlistItemsSizeAmount,
                // listAllCategoryType: newListAllCategoryType,
                listAllCategory: newListCategory,
                listImg: dataImgColorChangeLanguage,
                listColor: newListColor,
            })
        }

        // Type loại hàng
        if(prevProps.FSBData !== this.props.FSBData){
            let allFSBData = generalHandling.handlConvertObject(FSBData, 'LIST_CATEGORY',this.props.language)
            this.setState({
               listAllCategoryType: allFSBData
           })
        }

        // Type loại hàng
        if(prevProps.FSAMData !== this.props.FSAMData){
            let allFSAMData = generalHandling.handlConvertObject(FSAMData, 'LIST_CATEGORY',this.props.language)
            this.setState({
               listAllCategoryType: allFSAMData
           })
        }

        // Type loại hàng
        if(prevProps.FSMData !== this.props.FSMData){
            let allFSMData = generalHandling.handlConvertObject(FSMData, 'LIST_CATEGORY',this.props.language)
            this.setState({
               listAllCategoryType: allFSMData
           })
        }

        // Type loại hàng
        if(prevProps.FSAWData !== this.props.FSAWData){
            let allFSAWData = generalHandling.handlConvertObject(FSAWData, 'LIST_CATEGORY',this.props.language)
            this.setState({
               listAllCategoryType: allFSAWData
           })
        }

        // Type loại hàng
        if(prevProps.AllData !== this.props.AllData){
            let allAllData = generalHandling.handlConvertObject(AllData, 'LIST_CATEGORY',this.props.language)
            this.setState({
               listAllCategoryType: allAllData
           })
        }
        
        // Set size 
        if(prevProps.SIZEData !== this.props.SIZEData){
            this.setState({
                listSIZEData: SIZEData
            })
        }

        // Set size 
        if(prevProps.SZNBData !== this.props.SZNBData){
            this.setState({
                listSIZEData: SZNBData
            })
        }

    }

    // On Change
    heandleChangeInput = async(value, name,e) => {

        let stateCopy = this.state.items
        let stateItemsInfoCopy = this.state.itemsInfo
        let {listImg,listErrorForm,editItems} = this.state

        console.log(name)

        //  onchange input của items
        if(name === 'name' || name === 'price'  || name === 'newPrice' || name === 'idItems' || name === 'nameEn' || name === 'priceUS'){
            
            let valueIdItems = ''
            for(let key in stateCopy){

                if(key === 'idItems'){
                    valueIdItems = value
                }

                if(editItems && name === 'price'){
                    stateCopy['newPrice'] = value
                }

                if(editItems && name === 'priceUS'){
                    stateCopy['newPriceUS'] = value
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

            // Name
            if(name === 'nameEn'){
                this.setState({
                    items: {...stateCopy},
                    listErrorForm: {...listErrorForm,nameEn: {}},
                })
            }
    
            // Price
            if(name === 'price'){
                this.setState({
                    items: {...stateCopy},
                    listErrorForm: {...listErrorForm,price: {}},
                })
            }

            // priceUs
            if(name === 'priceUS'){
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
        let {items,itemsInfo,listImg,listErrorForm,listImgFormData,editItems} = this.state
        let {allShops} = this.props
        let {idItems} = this.state.items
        
        // Add shop
        if(name.name === 'idShop') {   
            let res = await this.handleGetOneUser(valueOptions.value)

            // Change add shop
            let addressShop = allShops.filter(item => {
                if(item.id === valueOptions.value){return item}
            })

            // Set State
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
   
        // Add danh mục
        if(name.name === 'category' || name === 'category') {
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

        // Set type 
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

        // Add sale
        if(name.name === 'sale') {
            this.setState({
                optionsSele: valueOptions,
                items: {
                    ...items,
                    discount: valueOptions.value
                }
            })
        }

        // Set Thương hiệu
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
        
        // Set size
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

        // Ngoài các trường hợp trên
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
          
            this.setState({
                coating: false,
                isImgColor: isImgColor,
                listImg: [...listImg],
                itemsColorImgages: {...stateCoppyitemsColorImgages},
            })
            

        
            let dataImgFormData = []
            listImg.map(item => {
                dataImgFormData.push(item.file)
            })

           


            if(editItems){
                this.setState({
                    coating: false,
                    isImgColor: isImgColor,
                    listImg: [...listImg],
                    listImgFormData: dataImgFormData,
                    itemsColorImgages: {...stateCoppyitemsColorImgages},
                })
            }
            

           
        }
    }

    // changeInput size
    heandleChangeInputSize = (value,item) => {
        let {SIZE,SZNB,notSize,itemsSizeAmount,listErrorForm,listSIZEData} = this.state
        let {idItems} = this.state.items

        let stateSIZECoppy = SIZE
        let stateSZNBCoppy = SZNB
        let statenotSizeCoppy = notSize

        if(typeof value !== 'object'){
            
            // Set kieu size
            if(item.sizeId === 'SIZE'){
                for(let key in stateSIZECoppy){
                    if(key === item.code){
                        stateSIZECoppy[key] = {itemsId: idItems, typeSize: item.sizeId,size: item.code,  amount: value,}
                    }
                }
                this.setState({
                    itemsSizeAmount: {...stateSIZECoppy},
                    listErrorForm: {...listErrorForm,itemsSizeAmount: {}},
                })
            }

            // Kiểu cỡ
            if(item.sizeId === 'SZNB'){
                for(let key in stateSZNBCoppy){
                    if(key === item.code){
                        stateSZNBCoppy[key] = {itemsId:idItems, typeSize: item.sizeId,size: item.code, amount: value,}
                    }
                }
                this.setState({
                    itemsSizeAmount: {...stateSZNBCoppy},
                    listErrorForm: {...listErrorForm,itemsSizeAmount: {}},
                })
            }

            // free size
            if(item === 'FRSZ'){
                for(let key in statenotSizeCoppy){
                    statenotSizeCoppy[key] = {itemsId:idItems, typeSize: 'FRSZ',size: 'FRSZ', amount: value,}
                }
    
                this.setState({
                    itemsSizeAmount: {...statenotSizeCoppy},
                    listErrorForm: {...listErrorForm,itemsSizeAmount: {}},
                })
            }

        }else{

            // Ấn sửa add thêm thông tin amount
            var data = []
            listSIZEData.map(itemSize => {
                value.map(itemCount => {
                    if(itemSize.code === itemCount.code) {
                        data.push({...itemSize, amount: itemCount.amount})
                        itemSize.amount = itemCount.amount
                    }
                })
            })

            this.setState({
                listSIZEData: listSIZEData
            })
        }
        
        // Set true nếu trống size
        let isEmptykeyObjectSizeItems = false
        for(let key in itemsSizeAmount){

            if(!_.isEmpty(itemsSizeAmount[key])){
                isEmptykeyObjectSizeItems = true
            }
        }
  
        // Sét state
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
        let {items,itemsInfo, itemsSizeAmount, itemsColorImgages,listImgFormData,listErrorForm,editItems,isEditDetailItems} = this.state
        let listErrorFromCoppy = listErrorForm
        
        let res = ''
        // Loại bỏ PT rỗng size cỡ
        for(let key in itemsSizeAmount){
            if(itemsSizeAmount[key] === ''){
                delete itemsSizeAmount[key]
            }
        }


        // Edit true
        if(editItems){
            let data = new FormData()
            let emptyData = JSON.stringify({data: 'EMPTY'})

            // Set data form Data cho img file,đổi tên và lưu tên ảnh + màu
            let dataImgColor = []
            listImgFormData = [...listImgFormData]
            listImgFormData.length > 0 && listImgFormData.map(item => {
                if(!item.type){
                    dataImgColor.push({itemId: items.idItems,color: item.option.value, image: item.id})
                }else{
                    let nameImg = `name${new Date().getTime()}${Math.floor(1000 + Math.random() * 9000)}.jpg`
                    dataImgColor.push({itemId: items.idItems,color: item.option.value, image: nameImg})
                    data.append("name", 'file')
                    data.append("file", item, nameImg )
                }
            })


            // Gửi data form bảng dataItemsColorImages
            if(dataImgColor.length > 0){
                let dataItemsColorImgages = JSON.stringify(dataImgColor)
                data.append("dataItemsColorImgages", dataItemsColorImgages)
            }else{
                data.append("dataItemsColorImgages",emptyData)
            }


            // Nếu sửa size
            if(!_.isEmpty(itemsSizeAmount)){
                let datItemsSizeAmount = JSON.stringify(itemsSizeAmount)
                data.append("dataItemsSizeAmount", datItemsSizeAmount)
            }else{
                data.append("dataItemsSizeAmount", emptyData)
            }

            // Chuyển về string
            let dataItems = JSON.stringify(items)
            let dataItemsInfo = JSON.stringify({...itemsInfo,itemsId: items.idItems})
            let editDetailItems = JSON.stringify(isEditDetailItems)

            // Gửi data form bảng dataItems && dataItemsInfo
            data.append("dataItems", dataItems)
            data.append("editDetailItems", editDetailItems)
            data.append("dataItemsInfo", dataItemsInfo)
            res = await adminService.editDataItems(data)
        }
        
        // Create items
        if(!editItems){

            console.log(items)


            // Chuyển data về string
            let dataItems = JSON.stringify(items)
            let dataItemsInfo = JSON.stringify({...itemsInfo,itemsId: items.idItems})
            let datItemsSizeAmount = JSON.stringify(itemsSizeAmount)

            // Lặp gán lại tên file và tên file trong {} itemsColorImgages
            let listImgFormDataArray = listImgFormData
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
            res = await adminService.addNewItems(data)
        }

        // Nếu thành công
        if(res && res.data.errCode === 0) {
            let newDataItems = generalHandling.resetDefaultState(items)
            let newDataItemsInfo = generalHandling.resetDefaultState(itemsInfo)
            let newDataErr = generalHandling.resetDefaultState(listErrorForm)

            this.setState({
                isShowListsInput: false,
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
            !editItems ? toast.success(<SwitchLanguage id='manageAdmin.toast.success_change'/>) :  toast.success(<SwitchLanguage id='manageAdmin.toast.success_change'/>)
        }

        // Nếu Thất bại  -1
        if(res && res.data.errCode === -1){
            let dataErr = res.data.data
            for(let key in listErrorFromCoppy){
                if(key !== 'file') {
                    listErrorFromCoppy[key] = dataErr[key]
                }
            }

            this.setState({
                listErrorForm: {...listErrorFromCoppy}
            })
            toast.error(<SwitchLanguage id='manageAdmin.toast.warn'/>)
        }

        // Nếu thất bại -2
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

        let {items,itemsInfo,listErrorForm} = this.state
        let newDataItems =  generalHandling.resetDefaultState(items)
        let newDataItemsInfo =  generalHandling.resetDefaultState(itemsInfo)
        let newDataErr =  generalHandling.resetDefaultState(listErrorForm)

        this.setState({       
            editItems: false,
            isShowListsInput: !this.state.isShowListsInput,
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
    }

    // Edit Items
    handleEditItems = async(dataItems) => {

        let {  
            items,
            editItems,
            itemsInfo
        } = this.state
        let {language} = this.props

        if(editItems) {
            let res = await this.handleGetOneUser(dataItems.idShop)

            let nameShop = {value: dataItems.idShop, label: dataItems.storeData && dataItems.storeData.nameShop}
            let sentFromEdit = dataItems.infoItemsData && dataItems.infoItemsData.sentFrom
            let idItemsEdit = dataItems.idItems
    
            let optionsCategoryEdit = {value: dataItems.categoryData && dataItems.categoryData.code,
                label: dataItems.categoryData && language === languages.EN ? dataItems.categoryData.valueEn : dataItems.categoryData.valueVi}

            await this.props.getAllCodeInToItems(optionsCategoryEdit.value)

            let optionsCategoryTypeEdit = {value: dataItems.typeData && dataItems.typeData.code,
                label: dataItems.typeData && language === languages.EN ? dataItems.typeData.valueEn : dataItems.typeData.valueVi}
                
            let optionsSeleEdit = {value: dataItems.discountData && dataItems.discountData.code,
                label: dataItems.discountData && language === languages.EN ? dataItems.discountData.valueEn : dataItems.discountData.valueVi}

            let nameEdit = dataItems.name
            let nameEnEdit = dataItems.nameEn

            let optionsTrademarkEdit = {value: dataItems.infoItemsData && dataItems.infoItemsData.trademarkData && dataItems.infoItemsData.trademarkData.code,
                label: dataItems.infoItemsData.trademarkData && language === languages.EN ? dataItems.infoItemsData.trademarkData.valueEn : dataItems.infoItemsData.trademarkData.valueVi}
            
            let productionEdit =  dataItems.infoItemsData && dataItems.infoItemsData.production
            let textureEdit =  dataItems.infoItemsData && dataItems.infoItemsData.texture
    
            let optionsItemsSizeAmountEdit = {
                value: dataItems.dataSizeAmount && dataItems.dataSizeAmount[0].typeSizeData && dataItems.dataSizeAmount[0].typeSizeData.code,
                label: dataItems.dataSizeAmount[0].typeSizeData && language === languages.EN ? dataItems.dataSizeAmount[0].typeSizeData.valueEn : dataItems.dataSizeAmount[0].typeSizeData.valueVi}
            

                
            await this.props.getAllCodeInToItems(optionsItemsSizeAmountEdit.value)
    
            let priceEdit = dataItems.price
            let priceEditUS = dataItems.priceUS
            let newPrice = dataItems.newPrice
            let newPriceUS = dataItems.newPriceUS
            let dataSizeAmount = dataItems.dataSizeAmount
    
            // 
            let newData = []
            dataSizeAmount.map(item => {
                if(item.sizeData){
                    let result = {...item.sizeData,amount: item.amount}
                    newData.push(result)
                }
            })

            this.heandleChangeInputSize(newData)
    
            //
            let describeTextEnEdit = dataItems.infoItemsData && dataItems.infoItemsData.describeTextEn
            let describeTextViEdit = dataItems.infoItemsData && dataItems.infoItemsData.describeTextVi
            let describeHtmlEnEdit = dataItems.infoItemsData && dataItems.infoItemsData.describeHtmlEn
            let describeHtmlViEdit = dataItems.infoItemsData && dataItems.infoItemsData.describeTextVi
    
            // List img
            let listImgColor = []
            dataItems.dataColorImg.map(item => {
                listImgColor.push({
                    src: `${process.env.REACT_APP_BACKEND_IMAGES_ITEMS}/${item.image}`, 
                    file:{
                        option: {value: item.colorData.code, label: language === languages.EN ? item.colorData.valueEn : item.colorData.valueVi },
                        id: item.image
                    }}
                )
            })
    
            // set state
            this.setState({
                isImgColor: true,
                isEmptykeyObjectSizeItems: true,
                dataEdit: dataItems,
                editItems: true,
                isShowListsInput: true,
                optionsSelect: nameShop,
                optionsSelectUser: res,
                itemsInfo: {
                    ...itemsInfo,
                    sentFrom: sentFromEdit,
                    production: productionEdit,
                    texture: textureEdit,
                    describeTextEn:describeTextEnEdit,
                    describeTextVi: describeTextViEdit,
                    describeHtmlEn:describeHtmlEnEdit,
                    describeHtmlVi: describeHtmlViEdit,
                    trademark: optionsTrademarkEdit.value,
                },
                items: {
                    ...items,
                    idShop: dataItems.idShop,
                    idItems: idItemsEdit,
                    name: nameEdit,
                    nameEn: nameEnEdit,
                    price: newPrice ? newPrice : priceEdit,
                    priceUS: newPriceUS ? newPriceUS : priceEditUS,
                    category: optionsCategoryEdit.value,
                    type: optionsCategoryTypeEdit.value,
                    manageId: res.value
                },
                optionsCategory: optionsCategoryEdit,
                optionsCategoryType: optionsCategoryTypeEdit,
                optionsSele: optionsSeleEdit || '0',
                optionsTrademark: optionsTrademarkEdit,
                optionsItemsSizeAmount: optionsItemsSizeAmountEdit,
                dataSizeEdit: newData,
                listImg: listImgColor,
            })
        }
    }

    // Set Edit (True)
    setEditItems = () => {
        this.setState({       
            editItems: true,
        })
    }

    // SustomStyle select react
    customStyles = {
        menu: (provided, state) => ({
            ...provided,
            zIndex: 99999,
        })
    }

    render() {

    let {language} = this.props
    let {name,price,idItems,nameEn,priceUS} = this.state.items
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
        isShowListsInput,
        editItems
    } = this.state


    const mdParser = new MarkdownIt();
    return (
        <>
        {/* Thêm mới items */}
        <div className='col l-3' onClick={() => this.handleShowHideInputsUser()}>
            {!isShowListsInput && 
                <Button type='submit-form-data' content={<SwitchLanguage id='manageAdmin.createItems'/>}  icon={<FontAwesomeIcon className='icon-user' icon={faStore} />}
                    color='var(--color-BTN-manage)' width='86%'  border='6px'
                />
            }

            {isShowListsInput && 
                <Button type='submit-form-data' content={<SwitchLanguage id='manageAdmin.form.hide'/>}  icon={<FontAwesomeIcon className='icon-user' icon={faStore} />}
                    color='var(--color-BTN-manage)' width='60%'  border='6px'
                />
            }
        </div>

        {/* Title */}
        <div className='l-12'>
            <p className='heading-manage-user'><SwitchLanguage id='manageAdmin.listItem' /></p> 
        </div> 
       
        {/* Bảng thêm items */}
        { isShowListsInput && 
            <div style={{height:'auto', marginTop: '30px'}} className='all-input items l-12'>
                <div className='list-input'>
                    <div className='form-input col l-6'>
                        <label className='input-label'><SwitchLanguage id='manageAdmin.form.nameShop'/></label>
                        <Select
                            value={optionsSelect}
                            onChange={this.handlChangeSlelect}
                            options={listAllShops}
                            styles={this.customStyles}
                            name='idShop'
                            isDisabled={editItems ? true : false}
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
                            style={idItems !== '' ? editItems ? {backgroundColor: 'hsl(0, 0%, 95%)'}: {backgroundColor: 'white'} : {backgroundColor: 'transparent'}} disabled={editItems ? true : false}
                        />
                        <span className='planceholder_input'><SwitchLanguage id='manageAdmin.form.planceholder_idItems' /></span>
                        <span className='err '> {!_.isEmpty(listErrorForm.idItems) && <FontAwesomeIcon  icon={faCircleExclamation} />} 
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
                        <label className='input-label'><SwitchLanguage id='manageAdmin.form.nameItems'/></label>
                        <input  type='text' className='input' name='name' value={name} onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)}   
                            style={name !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}
                        />
                        <span className='planceholder_input'><SwitchLanguage id='manageAdmin.form.nameItems' /></span>
                        <span className='err'> {!_.isEmpty(listErrorForm.name) && <FontAwesomeIcon  icon={faCircleExclamation} />} 
                            {!_.isEmpty(listErrorForm.name) ? language === languages.VI ? listErrorForm.name.valueVi : listErrorForm.name.valueEn : ''}
                        </span>
                    </div>


                    <div className='form-input col l-6'>
                        <label className='input-label'><SwitchLanguage id='manageAdmin.form.nameItemsEn'/></label>
                        <input  type='text' className='input' name='nameEn' value={nameEn} onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)}   
                            style={nameEn !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}
                        />
                        <span className='planceholder_input'><SwitchLanguage id='manageAdmin.form.nameItemsEn' /></span>
                        <span className='err'> {!_.isEmpty(listErrorForm.nameEn) && <FontAwesomeIcon  icon={faCircleExclamation} />} 
                            {!_.isEmpty(listErrorForm.nameEn) ? language === languages.VI ? listErrorForm.nameEn.valueVi : listErrorForm.nameEn.valueEn : ''}
                        </span>
                    </div>
                </div>


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
                        <label className='input-label'><SwitchLanguage id='manageAdmin.items.priceUS'/></label>
                        <input  type='text' className='input' name='priceUS'  value={priceUS}  onChange={(e) => this.heandleChangeInput(e.target.value,e.target.name)}   
                            style={priceUS !== '' ? {backgroundColor: 'white'}: {backgroundColor: 'transparent'}}
                        />
                        <span className='planceholder_input'><SwitchLanguage id='manageAdmin.items.planceholder_priceUS' /></span>
                        <span className='err'> {!_.isEmpty(listErrorForm.priceUS) && <FontAwesomeIcon  icon={faCircleExclamation} />} 
                            {!_.isEmpty(listErrorForm.priceUS) ? language === languages.VI ? listErrorForm.priceUS.valueVi : listErrorForm.priceUS.valueEn : ''}
                        </span>
                    </div>
                </div>


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
                </div>


                <div className='list-input'>
                    {optionsItemsSizeAmount &&  optionsItemsSizeAmount.value === 'FRSZ' &&
                        <div className='form-input col l-6'>
                                <>
                                    <label className='input-label'><SwitchLanguage id='manageAdmin.form.amount'/></label>
                                    <input type='number' className='input' onChange={(e) => this.heandleChangeInputSize(e.target.value,'FRSZ',)}
                                        placeholder={languages.EN === language  ? 'Enter amount...' : 'Nhập số lượng cỡ...'} 
                                    />
                                </>
                        </div>
                    }


                    {/* List size */}
                    {optionsItemsSizeAmount &&  optionsItemsSizeAmount.value !== 'FRSZ' &&
                        <div className='list-input size'> 
                            {listSIZEData && listSIZEData.length > 0 && listSIZEData.map((item , index) => {
                                return (
                                    <div key={index} className='list-input-size col l-3'>
                                        <span className='input-label'>{languages.EN === language  ? 'Size' : 'Cỡ'} {item.valueEn}</span>
                                            <input type='number' name={item.value} 
                                                placeholder={languages.EN === language  ? item.amount ? `${item.amount}` : 'Enter amount...' : item.amount ? `${item.amount}` :'Nhập số lượng...'} className='input l-9' 
                                                onChange={(e) => this.heandleChangeInputSize(e.target.value,item,e.target)}
                                            />
                                    </div>
                                )
                            })} 
                        </div>
                    }
                    <span className='err'> {!_.isEmpty(listErrorForm.itemsSizeAmount) && <FontAwesomeIcon  icon={faCircleExclamation} />} 
                        {!_.isEmpty(listErrorForm.itemsSizeAmount) ? language === languages.VI ? listErrorForm.itemsSizeAmount.valueVi : listErrorForm.itemsSizeAmount.valueEn : ''}
                    </span>
                </div>


                {/* Description items */}
                <div className='list-input'>
                    <div className='col l-12'>
                        <label className='input-label'><SwitchLanguage id='manageAdmin.form.description'/></label>

                        <div className='list-btn' style={{marginLeft: '-12px'}}>
                            <div className='col l-2' onClick={() => this.setState({isBTNVi: !isBTNVi})}>
                                <Button type={isBTNVi === true ? 'submit-form-data' : 'close-form-data'} content={<SwitchLanguage id='manageAdmin.form.descriptionVi'/>}
                                    color={isBTNVi && '#ce163b'} width='100%' border='4px'
                                /> 
                            </div>

                            <div className='col l-2' onClick={() => this.setState({isBTNVi: !isBTNVi})}>
                                <Button type={isBTNVi === true ? 'close-form-data' : 'submit-form-data'} content={<SwitchLanguage id='manageAdmin.form.descriptionEn'/>}
                                    color={!isBTNVi && '#ce163b'} width='100%' border='4px'
                                /> 
                            </div>
                        </div>


                    
                        <MdEditor
                            // style={isBTNVi && isBTNVi ? { height: '70vh' } : {height: '0px', overflow: 'hidden'}} 
                            style={{display: isBTNVi && isBTNVi ? 'block' : 'none', height: '70vh', overflow: 'hidden'}} 
                            renderHTML={text => mdParser.render(text)} 
                            onChange={this.handleEditorChangeVi} 
                            value={this.state.itemsInfo.describeTextVi || ''}
                        />
                
                        <MdEditor2
                            // style={!isBTNVi && !isBTNVi ? { height: '70vh ' } : {height: '0px', overflow: 'hidden'}}
                            style={{display: !isBTNVi && !isBTNVi ? 'block' : 'none', height: '70vh', overflow: 'hidden'}} 
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
                            <div key={`${srcImg.src}${index}`} className="col l-2-4">
                                <div className='ct__product-show'
                                    style={{ backgroundImage: `url(${srcImg.src})`, 
                                    opacity: `${srcImg.file.option ? '1' : '.4'}`,
                                    height: '500', }}>
                                    <FontAwesomeIcon icon={faPlus} className='icon-close' onClick={() => this.deleteImgPewView(srcImg)}/>
                                </div>
                                {/* color */}
                                <Select
                                    className='select-color'
                                    value={srcImg.file.option}
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


                {/* Buuton */}
                <div className='col l-12'>
                    <div className='list-btn'>
                        <span onClick={(e) =>   
                        this.state.itemsInfo.describeTextVi && 
                            this.state.itemsInfo.describeTextEn &&
                            listImg.length > 0 && isImgColor && 
                            isEmptykeyObjectSizeItems && name && nameEn && price && priceUS &&
                            this.handleOnSubmit(e)}
                        >
                            <Button 
                                type={
                                    this.state.itemsInfo.describeTextVi && this.state.itemsInfo.describeTextEn && priceUS &&
                                    listImg.length > 0 && isImgColor && isEmptykeyObjectSizeItems && name && nameEn && price 
                                    ? editItems ? 'edit-form-data' : 'submit-form-data' : 'ban-form-data' 
                                }
                                color={ 
                                    this.state.itemsInfo.describeTextVi && this.state.itemsInfo.describeTextEn && priceUS &&
                                    listImg.length > 0 && isImgColor && isEmptykeyObjectSizeItems && name && nameEn && price 
                                    ? editItems ? '' : 'var(--color-BTN-manage)'  : '#fb9e9e' 
                                }
                                border='6px'
                                content={ !editItems ? <SwitchLanguage id='manageAdmin.form.addItems'/> : <SwitchLanguage id='manageAdmin.form.btn_edit'/>} 
                            />
                        </span>
                    </div>
                </div>
            </div>
        }
       
        {/* List Items */}
        {!isShowListsInput && 
            <ListItems  handleEditItems={this.handleEditItems} setStateItems={this.setEditItems}/>
        }

        {listSale.length > 0 && listAllShops.length > 0 && listAllCategory.length > 0 &&
            <Discounts 
                listSale={listSale} 
                listAllShops={listAllShops} 
                listAllCategory={listAllCategory} 
                listAllCategoryType={listAllCategoryType} 
                handlChangeSlelect={this.handlChangeSlelect}
            />
        }

        <ListVoucher/>

        <PriceShip />


        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    
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
       
        getAllCodeInToItems: (type) => dispatch(actions.getAllCodeInToItemsStart(type)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Items);
