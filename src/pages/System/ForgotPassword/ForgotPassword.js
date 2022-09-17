import React, { Component } from 'react';
import { connect } from "react-redux";
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import Button from '../../../components/Button/Button';
import {path, languages} from '../../../utils/constant'
import * as actions from '../../../store/action';
import Modal from '../../../components/Modal/ModalLoad'
import SwitchLanguage from '../../../SwitchLanguage'
import _ from 'lodash'

import classNames from 'classnames/bind';
import styles from './ForgotPassword.module.scss';
const cx = classNames.bind(styles);


class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isValueAccount: false,
            isNewPassword: false,
            isRetypePassword: false,
            isToken: false,
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
                let stateCoppy = this.state.form
                
                let isStateNotEmpty = true
                for(let key in stateCoppy){
                    this.setState({isModal: false})

                    if(stateCoppy[key] === ''){
                        isStateNotEmpty = false
                    }
                }

                console.log(isStateNotEmpty)

                if(isStateNotEmpty) {
                    let res = await this.props.updatePassword(this.state.form)
                    if(res && res.data.errCode === 0){
                        this.setState({
                            isModal: false,
                            isSuccess: true
                        })
                    }
                    if(res && res.data.errCode !== 0){
                        this.setState({
                            isModal: false,
                            erroToken: res.data.data
                        })
                    }
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

            console.log(res)
            if(!res){
                this.setState({
                    isModal: false
                })
            }

            if(res && res.data && res.data.errCode === 0){
                this.setState({
                    isModal: false,
                    isFormCreateNewPassword: true,
                })
            }
            if(res && res.data &&  res.data.errCode === 1){
                this.setState({
                    isModal: false,
                    erroSearchEmail:{...res.data.data}
                })
            }
            if(res && res.data && res.data.errCode === 1 || res.data.errCode === 0) {
                this.setState({
                    isModal: false
                })
            }

            if(res && res.data &&  res.data.code !== 0) {
                this.setState({
                    isModal: false
                })
            }
        }
    }

      
    render() {
    let {valueAccount,newPassword,retypePassword,token} = this.state.form
    let {isModal,isFormCreateNewPassword,isErrForm,erroToken,isSuccess,erroSearchEmail,isNewPassword,isRetypePassword,isToken,isValueAccount} = this.state
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
                                onChange={(e) => this.handleChangeInputAccount(e.target.value,e.target.name)} autoComplete="off" style={{boxShadow: isValueAccount ? '1px 1px 10px #046ba6' : ''}}
                                onFocus={() => this.setState({isValueAccount: true})}
                                onBlur={() => this.setState({isValueAccount: false})}
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
                            <input type="text" name='newPassword' value={newPassword} className={cx('input')}  autoComplete="off" style={{boxShadow: isNewPassword ? '1px 1px 10px #046ba6' : ''}}
                                onChange={(e) => this.handleChangeInputAccount(e.target.value,e.target.name)} onFocus={() => this.setState({isNewPassword: true})}
                                placeholder={language === languages.EN ? 'Enter new password' : 'Nhập mật khẩu mới'} onBlur={() => this.setState({isNewPassword: false})}
                            />
        
                            <label><SwitchLanguage id='app.editPass.labelRetype'/></label>
                            <input type="text" name='retypePassword' value={retypePassword} className={cx('input')}  autoComplete="off" style={{boxShadow: isRetypePassword ? '1px 1px 10px #046ba6' : ''}}
                                placeholder={language === languages.EN ? 'Enter retype password' : 'Nhập lại mật khẩu'} onFocus={() => this.setState({isRetypePassword: true})}
                                onChange={(e) => this.handleChangeInputAccount(e.target.value,e.target.name)} onBlur={() => this.setState({isRetypePassword: false})}
                            />
                            <span className={cx('error-input-login')}>{isErrForm ? language === languages.VI ? 'Mật khẩu nhập lại không đúng !' : 'Re-entered password is incorrect' : ''}</span>

                            <label><SwitchLanguage id='app.editPass.labelCode'/></label>
                            <input type="text" name='token' value={token} className={cx('input')}  autoComplete="off" style={{boxShadow: isToken ? '1px 1px 10px #046ba6' : ''}}
                                placeholder={language === languages.EN ? 'Enter verification code' : 'Nhập mã xác minh'} onFocus={() => this.setState({isToken: true, erroToken: {}})}
                                onChange={(e) => this.handleChangeInputAccount(e.target.value,e.target.name)} onBlur={() => this.setState({isToken: false})}
                            />
                            <span className={cx('error-input-login')}>
                                {!_.isEmpty(erroToken) ? <FontAwesomeIcon icon={faCircleExclamation} /> : ''}
                                {!_.isEmpty(erroToken) ? language === languages.EN ? `${erroToken.valueEn}` : `${erroToken.valueVi}` : ''}
                            </span>
                        </>
                    }
                   

                    <p onClick={(e) => valueAccount ? this.handleSubmitForgotPassword(e,isFormCreateNewPassword) : ''} className='l-12' >
                        <Button type={isFormCreateNewPassword ? newPassword.trim() && retypePassword.trim() && token.trim() !== '' ? 'submit-form-data' : "btn-ban" : valueAccount.trim() !== '' ? 'submit-form-data' : "btn-ban"} 
                            content={<SwitchLanguage id='manageAdmin.form.confirm'/>} border='4px' size='1.8rem' width='100%' margin='26px 0' height='35px' color='var(--BGR-color-btn-manageuser)' 
                            opacity={valueAccount.trim() === '' && '.6'}
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
