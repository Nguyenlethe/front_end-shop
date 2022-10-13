import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import withRouter from '../../../routes/withRouter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleRight,faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import SwitchLanguage from '../../../SwitchLanguage';


import './NumberPage.scss';
import { ITEMS } from '../../../utils/constant';
class NumberPage extends Component {
    constructor(props) {
        super(props);
        this.numberPage = React.createRef();
        this.LinkPage = React.createRef();
        this.state = {
            numberPageActive: 0,
            widthNumberPage: 0,
        }
    }

    // Mount
    componentDidMount = async ()=>  {
        this.handleGetOrSetItems()
    }

    // Update
    componentDidUpdate= async(prevProps, prevState)=> {
        if(prevProps.language !== this.props.language){

        }

        if(prevProps.params !== this.props.params){
            this.handleGetOrSetItems()
        }
    }


    // Handle get/Set data search
    handleGetOrSetItems = async (type) => {
        let page = Number(this.props.params.get('page'))
        let {arrayNumberPage} = this.props
        const nodeLink = this.LinkPage.current

        if(arrayNumberPage && page > arrayNumberPage.length ){
            page = 1
        }

        
        if(type === 'END_PAGE'){
            console.log(arrayNumberPage.length, page)
            
            if(page != arrayNumberPage.length) {
                page = arrayNumberPage.length
                page = page + 1

                setTimeout(() => {
                    this.setState({
                        numberPageActive: page,
                    })
                },0)
    
                setTimeout(() => {
                    nodeLink.click()
                },10)
            }
        }
        
        
        if(!type){
            this.setState({
                numberPageActive: page,
            })
        }
        
    }
      
    render() {

    let {language, arrayNumberPage,dataSearchItemsParams, value,limitSeeMore} = this.props
    let {numberPageActive} = this.state


    return (
        <>

        
            <div className='list-number-next-page '>
                <Link style={{display: 'contents'}} ref={this.LinkPage}
                    to={{search: `?idShop=${dataSearchItemsParams.idShop}&category=${dataSearchItemsParams.category}&type=${dataSearchItemsParams.type}&language=${language}&value=${value}&limit=${limitSeeMore}&page=${numberPageActive - 1 < 1 ? arrayNumberPage.length : numberPageActive - 1}`}}> 
                    <FontAwesomeIcon className='icon-left'
                        icon={faAngleLeft}
                    />          
                </Link>


                <div className='border-list-number-page'>

                    <ul className='list-number-page' style={{width: numberPageActive <  3  ? '160px' : `${(numberPageActive + 1) * 40}px`  }} > 
                        {arrayNumberPage.length > 0 &&
                            arrayNumberPage.map(page => {
                                if(page < numberPageActive + 6 ){

                                    return (
                                        <li key={page} className='number-page'
                                            style={{
                                                background: numberPageActive == page ? 'var(--color-BTN-manage)' : '',
                                               
                                            }}
                                        
                                        >
                                            <Link style={{color: numberPageActive == page ? 'var(--white)' : 'var(--color-text)'}}
                                                to={{ search: `?idShop=${dataSearchItemsParams.idShop}&category=${dataSearchItemsParams.category}&type=${dataSearchItemsParams.type}&language=${language}&value=${value}&limit=${limitSeeMore}&page=${page}`}}> 
                                                {page}
                                            </Link>
                                        </li>
                                    )

                                }
                            })
                        }
                    </ul>
                </div>

                {arrayNumberPage.length > ITEMS.LIMIT_SHOW_SEEMORE_CLICK_END &&
                    <>
                        <span style={{margin: '0 6px'}}>{'...'}</span>
                        <span className='endPage' onClick={() => this.handleGetOrSetItems('END_PAGE')}><SwitchLanguage id='manageAdmin.items.endPage'/></span>
                    </>
                }



                <Link style={{display: 'contents'}} 
                    to={{search: `?idShop=${dataSearchItemsParams.idShop}&category=${dataSearchItemsParams.category}&type=${dataSearchItemsParams.type}&language=${language}&value=${value}&limit=${limitSeeMore}&page=${numberPageActive + 1 > arrayNumberPage.length ? 1 : numberPageActive + 1 }`}}>      
                    <FontAwesomeIcon className='icon-right'
                        icon={faAngleRight}
                    />
                </Link>

            </div>
        
        


        </>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NumberPage));
