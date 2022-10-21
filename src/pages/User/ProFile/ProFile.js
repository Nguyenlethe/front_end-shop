import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link ,Navigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPhoneFlip,faEnvelope,faCircleUser} from '@fortawesome/free-solid-svg-icons';
import handleCheckPermission from '../../../utils/generalHandling'
import {path, languages,PERMISSIONS} from '../../../utils/constant'
import withRouter from '../../../routes/withRouter';
import DatePicker from "react-datepicker";
import _ from 'lodash'
import "react-datepicker/dist/react-datepicker.css";
import Button from '../../../components/Button/Button';


import './ProFile.scss';
import SwitchLanguage from '../../../SwitchLanguage';

class ProFile extends Component {
    constructor(props) {
        super(props);
        this.inputDate = React.createRef();
        this.state = {
            isShop: false,
           
            dataUser: {
                gender: '',
                phoneNumber: '',
                email: '',
                fristName: '',
                LastName: '',
            }
        }
    }

   
    // Mount 
    componentDidMount = async ()=>  {
        let {permission,birthday,gender,email,phone,fristName,LastName} = this.props.dataUser
        let {dataUser} = this.state
        const isShopCoppy = handleCheckPermission.handleCheckPermission(PERMISSIONS.SELLER,permission)

      
        if(birthday.length > 5){
            let dateBirthday = new Date(birthday)
            let newDateBirthday = `${dateBirthday.getFullYear()}-${dateBirthday.getMonth()}-${dateBirthday.getDate() + 1}`
    
            if(newDateBirthday.length){
                const inputDate = this.inputDate.current
                inputDate.value = newDateBirthday
            }
        }

        this.setState({
            isShop: isShopCoppy,
            dataUser: {
                ...dataUser,
                gender: gender,
                phoneNumber: phone,
                email: email,
                fristName: fristName,
                LastName: LastName,
            }
        })
    
    }

    // Trước khi chết 
    componentWillUnmount = () => {

    }
  

    // Update
    componentDidUpdate= async(prevProps, prevState)=> {
   
    }

    

  

    render() {
    let {islogin, permission,fullNameEn, avatar,email,phone,fristName,LastName,birthday,gender} = this.props.dataUser
    let {listGender,language} = this.props
    let {dataUser} = this.state

    return (
        <>
            {!islogin && <Navigate to={path.HOME}/>}
        
            <div id='ProFile'>
                <p className='profile-heading'><SwitchLanguage id='proFile.proFileHeading'/></p>
                <p className='proFile-sub'><SwitchLanguage id='proFile.proFileSub'/></p>

                <div className='row'>
                    <div className='col l-2'>
                        <p className='name-account'><SwitchLanguage id='proFile.nameAccount'/></p>
                        <p className='surnameName'><SwitchLanguage id='proFile.surname'/></p>
                        <p className='name'><SwitchLanguage id='proFile.name'/></p>
                        <p className='email'><SwitchLanguage id='manageAdmin.form.email'/></p>
                        <p className='phone'><SwitchLanguage id='manageAdmin.form.phone'/></p>
                        <p className='gender'><SwitchLanguage id='manageAdmin.form.gender'/></p>
                        <p className='birthday'><SwitchLanguage id='manageAdmin.form.birthday'/></p>

                    </div>


                    <div className='col l-10'>
                        <p className='name-account-sub'>{email}</p>
                        <p className='surname-name-sub'><input onChange={() => {}} value={dataUser.fristName} type='text'/> </p>
                        <p className='name-sub'><input onChange={() => {}} value={dataUser.LastName} type='text'/> </p>
                        <p className='email-sub'><input onChange={() => {}}  value={dataUser.email} type='text'/> </p>
                        <p className='phone-sub'><input onChange={() => {}}  value={dataUser.phoneNumber} type='text'/> </p>

                        <div className='list-gender'>
                            {listGender.length > 0 && listGender.map((gender, index) => {
                                return (
                                    <div className='wrapper-gender' key={gender.valueVi}>
                                        <input id={index} type='radio' name='gender' checked={dataUser.gender == gender.keyMap ? true : false} 
                                            onChange={() => this.setState({dataUser: {...dataUser, gender: gender.keyMap}})} value={gender.keyMap} 
                                        />
                                        <label htmlFor={index}>{languages.EN == language ? gender.valueEn : gender.valueVi}</label>
                                    </div>
                                )
                            })}
                        </div>

                        <input type="date" ref={this.inputDate} onChange={(e) => console.log(new Date(e.target.value))} />
 
                    </div>
                </div>

                <Button type='submit-form-data' content={<SwitchLanguage id={'manageAdmin.form.save'}/>}
                    color='var(--color-BTN-manage)' width='100px' border='4px'
                /> 

            </div>

        </>
    )}
}


const mapStateToProps = (state) => {
    return { 
        language: state.app.language ,
        dataUser: state.app.loginUser,
        listGender: state.admin.dataForm.listGender,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProFile));
