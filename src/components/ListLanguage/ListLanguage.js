import React, { Component } from 'react';
import { connect } from "react-redux";
import * as action from '../../store/action'
import {languages} from '../../utils/constant'
import VNFlag from '../../assets/flag/VNFlag.png'
import ENFlag from '../../assets/flag/ENFlag.png'
import SwitchLanguage from '../../SwitchLanguage'

import Tippy from '../Tippy/Tippy';


import classNames from 'classnames/bind';
import styles from './ListLanguage.module.scss';
const cx = classNames.bind(styles);

class ListLanguage extends Component {
    constructor(props) {
        super(props);
        this.state = {
           isActive: false,
        }
    }

    componentDidMount = () =>{
      let {language}= this.props
      if(language === 'vi'){
        this.setState({isActive: true})
      }else{
        this.setState({isActive: false})
      }
    }
     

    handleClick = (Lang)=> {
      if(languages.EN === Lang){
        this.props.changeLanguageStart(languages.EN)
      }else{
        this.props.changeLanguageStart(languages.VI)
      }
      this.setState({
        isActive: !this.state.isActive
      })
    }


      
    render() {

      let {isActive} = this.state

        return (  
            <div className={cx('flag')}>

                <button id='Vi' className={cx(isActive ? 'active' : 'flag-btn')} onClick={() => this.handleClick('vi')}>
                  <img className={cx('img-flag')} src={VNFlag} alt='VN'/>
                </button>

                <button id='En' className={cx(isActive ? 'flag-btn' : 'active')} onClick={() => this.handleClick('en')}>
                  <img className={cx('img-flag')} src={ENFlag} alt='ENG'/>   
                </button>

            </div>
        )
    }
}


const mapStateToProps = (state) => {
  return { language: state.app.language }
}

const mapDispatchToProps = dispatch => {
  return {
    changeLanguageStart: (Lang) => dispatch(action.changeLanguageSuscess(Lang))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListLanguage);
