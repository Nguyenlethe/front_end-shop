import React, { Component } from 'react';
import { connect } from "react-redux";
import * as action from '../../store/action'
import SwitchLanguage from '../../SwitchLanguage';
import {languages, path,SEARCH} from '../../utils/constant'
import ListLanguage from '../../components/ListLanguage';
import { Link ,Navigate} from 'react-router-dom';
import img from '../..//assets/image/LOGO.png'

import styles from './DefaultLayout.scss';
import NavBar from './Navbar/NavBar';
import InputSearch from '../../components/SearchInput/InputSearch';
import InputSearchNav from '../../components/SearchInput/InputSearchNav';

class DefaultLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }

   
    // Mount 
    componentDidMount = async ()=>  {
      // this.props.addDataOptionsSearchNav({
      //   value: 'All2',
      //   valueTextInputEN: 'Full floor 2',
      //   valueTextInputVI: 'Toàn sàn 2'
      // })
    }

    // Update
    componentDidUpdate= async(prevProps, prevState)=> {
        if(prevProps.language !== this.props.language){

        }
    }

      
    render() {
    let {children} = this.props
    return (
      <>
        <NavBar />
        <div className='grid nav-center'>
          <div className='grid wide'>
            <div className='row'>

              <div className='list_nav-center'>

                <div className='col l-2'>
                  <Link to={path.HOME}  className=' hug-img-logo'>
                    <img src={img} alt='' />
                  </Link>
                </div>


                <div className='col l-7'>
                  <InputSearchNav />
                </div>


                <div className='col l-3'>
                    Giỏ hàng - Tin nhắn - User + menu
                </div>

              </div>


            </div>
          </div>
        </div>
        {children}
      </>
    )}
}


const mapStateToProps = (state) => {
  return { 
    language: state.app.language 

  }
}


const mapDispatchToProps = dispatch => {
  return {
    addDataOptionsSearchNav: (data) => dispatch(action.addDataOptionsSearchNav(data))
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
