import React, { Component } from 'react';
import { Fragment } from 'react'; 
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import {routes} from './routes/routes'
import DefaultLayout from './layouts/DefaultLayout'




class App extends Component {
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

