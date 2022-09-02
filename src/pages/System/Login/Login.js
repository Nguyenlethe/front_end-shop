import React, { Component } from 'react';
import { connect } from "react-redux";
import {Link} from 'react-router-dom'
import { Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser,faLock,faEyeSlash,faEye,faUnlock,faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import Button from '../../../components/Button/Button';
import {path, languages,PERMISSIONS} from '../../../utils/constant'
import * as actions from '../../../store/action';
import LoadScroll from '../../../components/LoadData/LoadScroll'
import handleCheckPermission from '../../../utils/generalHandling'
import SwitchLanguage from '../../../SwitchLanguage'

import classNames from 'classnames/bind';
import styles from './Login.module.scss';
const cx = classNames.bind(styles);

class Login extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            isShowPass: false,
            isModal: false,
            errMessage: {
                account: '',
                password: '',
            },
            form: {
               account: '',
               password: ''
            }
        }
    }

    // Ẩn hiện password
    handleShowHinePassword = () => {
        this.setState({ isShowPass: !this.state.isShowPass})
    }

    // Mount
    componentDidMount = async ()=>  {
      
    }

    // Update
    componentDidUpdate= async(prevProps, prevState)=> {
        if(prevProps.language !== this.props.language){

        }
    }

    // Xl change input
    handleOnchangeInput = (value, name) => {
        let stateCopy = this.state.form
        let errMessageCoppy = this.state.errMessage
        for(let key in errMessageCoppy){
            if(name === key){
                errMessageCoppy[key] = ''
            }
        }
        for(let key in stateCopy){
            if(key === name){
                stateCopy[key] = value
            }
        }
        this.setState({
            errMessage: {...errMessageCoppy},
            form: {...stateCopy}
        })
    }

    // Xl ấn submit 
    handleSubmitLogin = async (e) => {
        let {isModal} = this.state
      

   
      
        let {account,password} = this.state.form
        if(account.trim() !== "" && password.trim() !== "" ) {
            let data = this.state.form
            let errMessageCoppy = this.state.errMessage
            this.setState({isModal:true, errMessage : {account: '',password: ''}})
            this.setState({
                errMessage: {...errMessageCoppy}
            })
            let res = await this.props.loginSystem(data)
            if(res && res.data.errCode !== 0){
                this.setState({isModal:false})
                
                for(let key in errMessageCoppy){
                    if(res.data.data[key]){
                        errMessageCoppy[key] = res.data.data[key]
                    }
                }
                this.setState({
                    errMessage: {...errMessageCoppy}
                })
            }
            if(res.data.errCode === 0 ){
                this.setState({isModal:false}) 
            }
        }
    }


    render() {

    let {language,dataUser} = this.props
    let {isShowPass,isModal,errMessage} = this.state
    let {account,password} = this.state.form

    return (
    <>
    <span><LoadScroll data={dataUser.isLogin} isShow={isModal}/></span>

    {dataUser.islogin && handleCheckPermission.handleCheckPermission(PERMISSIONS.ADMIN,dataUser.permission) && <Navigate to={path.MANAGE_USER}/>}
    {dataUser.islogin && handleCheckPermission.handleCheckPermission(PERMISSIONS.PATIENT,dataUser.permission)  && <Navigate to={path.HOMEPAGE}/>}
    {dataUser.islogin && handleCheckPermission.handleCheckPermission(PERMISSIONS.SELLER,dataUser.permission)  && <Navigate to={path.HOMEPAGE}/>}

        <form className={cx('form-login')}>
            <p className={cx('heading')}><SwitchLanguage id='manageAdmin.form.heading'/></p>
            
            <div className={cx('form-input')}>
                <label><SwitchLanguage id='manageAdmin.form.account'/></label>
                <div className={cx('wrap-input')}>
                    <FontAwesomeIcon className={cx('icon-input')} icon={faUser}/> 
                    <input className={cx('input')} type="text"  name='account' value={account}
                        placeholder={language === languages.EN ? 'Enter account' : 'Nhập tài khoản'}
                        onChange={(e) => this.handleOnchangeInput(e.target.value, e.target.name)}
                    />
                </div>
                <span className={cx('error-input-login')}>
                    {errMessage.account !== '' ? <FontAwesomeIcon  icon={faCircleExclamation} /> : ''}
                    {errMessage.account !== '' ? language === languages.EN ? errMessage.account.valueEn : errMessage.account.valueVi : ''}
                </span>



                <label>{<SwitchLanguage id='manageAdmin.form.password'/>}</label>
                <div className={cx('wrap-input')}>
                    <FontAwesomeIcon className={cx('icon-input')} icon={isShowPass === false ? faLock : faUnlock}/> 
                    <input className={cx('input')} name='password' type={isShowPass === false ? 'password' : 'text'}  
                        placeholder={language === languages.EN ? 'Enter password' : 'Nhập mật khẩu'}
                        value={password} autoComplete="on"
                        onChange={(e) => this.handleOnchangeInput(e.target.value, e.target.name)}
                    />
                    <FontAwesomeIcon className={cx('icon-input')} onClick={() => this.handleShowHinePassword()} icon={isShowPass === false ? faEyeSlash : faEye}/> 
                </div>
                <span className={cx('error-input-login')}>
                    {errMessage.password !== '' ? <FontAwesomeIcon  icon={faCircleExclamation} /> : ''}
                    {errMessage.password !== '' ? language === languages.EN ? errMessage.password.valueEn : errMessage.password.valueVi : ''}
                </span>



                <span  className={cx('forget')}>
                    <Link to={path.FORGOTPASS}>
                        <SwitchLanguage id='manageAdmin.form.ForgotPW'/> 
                    </Link>
                </span>

                <p onClick={(e) => account.trim() !== "" && password.trim() !== "" && this.handleSubmitLogin(e)}>
                    <Button type={account.trim() !== "" && password.trim() !== "" ? 'btn-submit' : "btn-ban"}
                        content={<SwitchLanguage id='manageAdmin.form.heading'/>}
                    />
                </p>
            </div>


                    

            <div className={cx('login-society')}>
                <span className={cx('login-society-sub')}><SwitchLanguage id='manageAdmin.form.Orsing'/></span>
                <div className={cx('list-icon-society')}>
                    <a className={cx('img-logo')} href='/#'>
                        <img src='https://nguyenlethe.github.io/shop-image/image/Fb.png' alt="" />
                    </a>
                    <a className={cx('img-logo')} href='/#'>
                        <img src='https://nguyenlethe.github.io/shop-image/image/GG.png' alt="" />
                    </a>
                </div>
            </div>
            <div className={cx('text-footer-form')}>
                <p><SwitchLanguage id='manageAdmin.form.CRaccount'/></p>
                <p><Link to={path.REGISTERPAGE}><SwitchLanguage id='manageAdmin.form.SingUp'/></Link></p>
            </div>
        </form>
        </>
    
    )}}


const mapStateToProps = state => {
    return {
        language: state.app.language,
        dataUser: state.app.loginUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginSystem: (dataForm) => dispatch(actions.loginSystemStart(dataForm))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
