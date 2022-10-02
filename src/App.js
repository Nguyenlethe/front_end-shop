import React, { Component } from 'react';
import { Fragment } from 'react'; 
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import {routes} from './routes/routes'
import DefaultLayout from './layouts/DefaultLayout'
import appService from './services/appService';



class App extends Component {

    componentDidMount = async() => {
        setTimeout(async() => {
            await appService.deleteVoucherExpired()
        },0)

        setInterval(async() => {
            const minutes = new Date().getMinutes()
            if(minutes == 0 || minutes == 30){
                await appService.deleteVoucherExpired()
            }
        },40000)
    }

    render() {
    return ( 
        <>
        <div className="App">
            <Routes>
                { routes.map((route, index) => {
                    const Page = route.components;
                    let Layout = DefaultLayout; 
                    if (route.layout) {
                        Layout = route.layout; 
                    } else if (route.layout === null) {
                        Layout = Fragment; 
                    }
                    return (
                        <Route key={route.path} path={route.path} element={<Layout><Page/></Layout>}/>
                    )
                })}
            </Routes>
        </div>
        </>
      )
  }
}

const mapStateToProps = state => { 
    return {
        dataUser: state.app.loginUser
    }
}
const mapDispatchToProps = dispatch => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

