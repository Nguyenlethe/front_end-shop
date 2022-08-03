import React, { Component } from 'react';
import { connect } from "react-redux";
import * as action from '../../store/action'
import SwitchLanguage from '../../SwitchLanguage';
import {languages} from '../../utils/constant'
import ListLanguage from '../../components/ListLanguage';



import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
const cx = classNames.bind(styles);

class DefaultLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }

    handleClick = (Lang)=> {
        if(languages.EN === Lang){
          this.props.changeLanguageStart(languages.EN)
        }else{
          this.props.changeLanguageStart(languages.VI)
        }
      }

    componentDidMount = async ()=>  {
      
    }


    componentDidUpdate= async(prevProps, prevState)=> {
        if(prevProps.language !== this.props.language){

        }
    }

      
    render() {

        let {children} = this.props


        return (
            <>
            <h1>DefaultLayout</h1>

            <div className="App">
                <ListLanguage/>

                <SwitchLanguage id='nav.home'/>
                
                <br></br>

            </div>



              <>{children}</>
            </>
        )
    }
}


const mapStateToProps = (state) => {
  return { language: state.app.language }
}


const mapDispatchToProps = dispatch => {
  return {
    changeLanguageStart: (Lang) => dispatch(action.changeLanguageSuscess(Lang))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
