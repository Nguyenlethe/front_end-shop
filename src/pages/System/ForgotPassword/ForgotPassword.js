import React, { Component } from 'react';
import { connect } from "react-redux";
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import Button from '../../../components/Button/Button';
import {path, languages} from '../../../utils/constant'
import * as actions from '../../../store/action';
import Modal from '../../../components/Modal/Modal'
import SwitchLanguage from '../../../SwitchLanguage'
import _ from 'lodash'


import classNames from 'classnames/bind';
import styles from './ForgotPassword.module.scss';
const cx = classNames.bind(styles);


class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModal: false,
            isFormCreateNewPassword: false,
            isErrForm: false,
            isSuccess: false,
            erroToken: {},
            erroSearchEmail: {},
            form: {
                valueAccount: '',
                newPassword: '',
                retypePassword: '',
                token: '',
            }
        }
    }

    componentDidMount = async ()=>  {
      
    }

    componentDidUpdate= async(prevProps, prevState)=> {
        if(prevProps.language !== this.props.language){

        }
    }

    // Khi onchange
    handleChangeInputAccount = (value, name) => {
        let stateCoppy = this.state.form
        for(let key in stateCoppy){
            if(key === name){
                stateCoppy[key] = value
            }
            if(key === 'retypePassword'){
                this.setState({
                    isErrForm: false
                })
            }
        }
        this.setState({form : {...stateCoppy}})
    }


    // Khi submit
    handleSubmitForgotPassword = async(e,type) => {
        e.preventDefault()
        let {newPassword,retypePassword} = this.state.form
        this.setState({isModal: true})
        if(type === true){
            if(newPassword === retypePassword){
                let res = await this.props.updatePassword(this.state.form)
                if(res && res.data.errCode === 0){
                    this.setState({
                        isModal: false,
                        isSuccess: true
                    })
                }
                if(res && res.data.errCode === 1){
                    this.setState({
                        isModal: false,
                        erroToken: res.data.data
                    })
                }
            }else{
                this.setState({
                    isModal: false,
                    isErrForm: true
                })
            }
        }
        if(type === false){
            let { language} = this.props
            let res = await this.props.retrievalPassword({...this.state.form,valueLanguage:language})
            if(res && res.data.errCode === 0){
                this.setState({
                    isModal: false,
                    isFormCreateNewPassword: true,
                })
            }
            if(res && res.data.errCode === 1){
                this.setState({
                    isModal: false,
                    erroSearchEmail:{...res.data.data}
                })
            }
            if(res && res.data.errCode === 1 || res.data.errCode === 0) {
                this.setState({
                    isModal: false
                })
            }
        }
    }

      
    render() {
    let {valueAccount,newPassword,retypePassword,token} = this.state.form
    let {isModal,isFormCreateNewPassword,isErrForm,erroToken,isSuccess,erroSearchEmail} = this.state
    let {language} = this.props
    return (
        <>
            <Modal isShow={isModal}/> 

            


            {!isSuccess ? <form className={cx('forgotpassword')}>
                <span className={cx('heading')}><SwitchLanguage id='app.editPass.heading'/></span>
                <div className={cx('form-input')}>

                    {!isFormCreateNewPassword && 
                        <>
                            <label><SwitchLanguage id='app.editPass.labelEmail'/></label>
                            <input type="text" name='valueAccount' value={valueAccount} className={cx('input')}  placeholder={language === languages.EN ? 'Enter Email' : 'Nhập email/Tài khoản của bạn'}
                                onChange={(e) => this.handleChangeInputAccount(e.target.value,e.target.name)}
                            />
                            <span className={cx('error-input-login')}>
                                {!_.isEmpty(erroSearchEmail) ? <FontAwesomeIcon icon={faCircleExclamation} /> : ''}
                                {!_.isEmpty(erroSearchEmail) ? language === languages.EN ? `${erroSearchEmail.account.valueEn}` : `${erroSearchEmail.account.valueVi}` : ''}
                            </span>
                        </>
                    }

                   {isFormCreateNewPassword && 
                        <>
                            <label><SwitchLanguage id='app.editPass.labelNewPass'/></label>
                            <input type="text" name='newPassword' value={newPassword} className={cx('input')} 
                                onChange={(e) => this.handleChangeInputAccount(e.target.value,e.target.name)}
                                placeholder={language === languages.EN ? 'Enter new password' : 'Nhập mật khẩu mới'}
                            />
        
                            <label><SwitchLanguage id='app.editPass.labelRetype'/></label>
                            <input type="text" name='retypePassword' value={retypePassword} className={cx('input')} 
                                placeholder={language === languages.EN ? 'Enter retype password' : 'Nhập lại mật khẩu'}
                                onChange={(e) => this.handleChangeInputAccount(e.target.value,e.target.name)}
                            />
                            <span className={cx('error-input-login')}>{isErrForm ? language === languages.VI ? 'Mật khẩu nhập lại không đúng !' : 'Re-entered password is incorrect' : ''}</span>

                            <label><SwitchLanguage id='app.editPass.labelCode'/></label>
                            <input type="text" name='token' value={token} className={cx('input')} 
                                placeholder={language === languages.EN ? 'Enter verification code' : 'Nhập mã xác minh'}
                                onChange={(e) => this.handleChangeInputAccount(e.target.value,e.target.name)}
                            />
                            <span className={cx('error-input-login')}>
                                {!_.isEmpty(erroToken) ? <FontAwesomeIcon icon={faCircleExclamation} /> : ''}
                                {!_.isEmpty(erroToken) ? language === languages.EN ? `${erroToken.valueEn}` : `${erroToken.valueVi}` : ''}
                            </span>
                        </>
                   }
                   
                    <p onClick={(e) => valueAccount ? this.handleSubmitForgotPassword(e,isFormCreateNewPassword) : ''} >
                        <Button type={isFormCreateNewPassword ? newPassword.trim() && retypePassword.trim() && token.trim() !== '' ? 'btn-submit' : "btn-ban" : valueAccount.trim() !== '' ? 'btn-submit' : "btn-ban"} 
                            content={<SwitchLanguage id='manageAdmin.form.confirm'/>}
                        />
                    </p>

                </div>
            </form>: 
                <div className={cx('notification')}>
                    <p><SwitchLanguage id='app.editPass.ntfSuccess'/></p>
                    <span><Link to={path.LOGINPAGE}><SwitchLanguage id='app.editPass.goLogin'/></Link></span>
                </div>
            }
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
        retrievalPassword: (email) => dispatch(actions.retrievalPasswordStart(email)),
        updatePassword: (data) => dispatch(actions.updatePasswordStart(data))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
