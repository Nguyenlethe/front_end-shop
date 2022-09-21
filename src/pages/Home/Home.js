import React, { Component } from 'react';
import { connect } from "react-redux";


import classNames from 'classnames/bind';
import styles from './Home.module.scss';
const cx = classNames.bind(styles);

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }


    componentDidMount = async ()=>  {
      
    }


    componentDidUpdate= async(prevProps, prevState)=> {
        if(prevProps.language !== this.props.language){

        }
    }

      
    render() {



    return (
        <>
            <div className="l-5">Home</div>
        </>
    )
    }
}


const mapStateToProps = state => {
    return {
        dataUser: state.app.loginUser,
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
