import React, { Component } from 'react';
import { connect } from "react-redux";
import {DISCOUNTTEXT, path,languages,ITEMS} from '../../../utils/constant'
import SwitchLanguage from '../../../SwitchLanguage';
import notItems from '../../../assets/image/NOT_PRODUCT.png'
import withRouter from '../../../routes/withRouter';
import * as actions from '../../../store/action'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleRight,faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import { FaFacebook,FaFacebookMessenger,FaTwitter,FaTelegram,FaRegHeart,FaHeart,FaStar,FaStarHalfAlt,FaRegStar} from 'react-icons/fa';

import './ListStar.scss';
class ListStar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          starEmpty: [],
          lengthStar: [],
          lengthDefaultStar: 5,
          starHalf: false,
        }
    }


    // Mount
    componentDidMount = async ()=>  {
      this.handleSetStar()
    }

   
    // Update
    componentDidUpdate= async(prevProps, prevState)=> {
      let {evaluate, lengthStar} = this.props
      let {lengthDefaultStar,starHalf,starEmpty} = this.state

      // Language change
      if(prevProps.language !== this.props.language){

      }

      // ADD data items
      if(prevProps.evaluate !== this.props.evaluate){
        this.handleSetStar()
      }
    }

    // Set star show
    handleSetStar = () => {
      let {evaluate} = this.props
      let {lengthDefaultStar} = this.state
      let arrayStar = []
      let starHalf = false
      let starEmpty = []
      const numberStarHalf = (Number(lengthDefaultStar) - Number(evaluate)).toString().split(".")
      
      for(let i = 0; i < Number(Math.floor((evaluate))); i++){
        arrayStar.push(`${i}`)
      }
      
      starEmpty = lengthDefaultStar - arrayStar.length
      
      
      // console.log('HALF',numberStarHalf[1])
      if(numberStarHalf[1]){
        starEmpty = (lengthDefaultStar - arrayStar.length) - 1
        starHalf = true
      }
   
      
      let arrayStarEmpty = []
      for(let i = 0; i < Number(Math.floor((starEmpty))); i++){
        arrayStarEmpty.push(`${i}`)
      }


      this.setState({
        starHalf: starHalf,
        lengthStar: arrayStar,
        starEmpty: arrayStarEmpty
      })
    }

    // Trước khi chết 
    componentWillUnmount = () => {
    
    }

    render() {

    let {lengthStar,starEmpty,starHalf} = this.state
    let {evaluate, clas} = this.props
 
    return (
      <div className={`list-star-items ${clas}`}>
        {/* <SwitchLanguage id='manageAdmin.items.evaluate'/> */}

        <span>{evaluate.toString().length == 1 ? evaluate+'.0' : evaluate}</span>
        {lengthStar.length > 0 && lengthStar.map(star => {
          return (
            <FaStar key={star} />
          )
        })}
         
        {starHalf == true &&
          <FaStarHalfAlt/>
        }

        {starEmpty && starEmpty.length > 0 && starEmpty.map(star => {
            return (
              <FaRegStar key={star} />
            )
          })
        }
      </div>
    )}
}


const mapStateToProps = state => {
    return {
        language: state.app.language,
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListStar);

