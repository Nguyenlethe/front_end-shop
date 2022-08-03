import React, { Component } from 'react';
import { Fragment } from 'react'; 
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import {publicRoutes , adminRoutes} from './routes/routes'
import DefaultLayout from './layouts/DefaultLayout'

class App extends Component {



  render() {

    let AdminLogin = true

    

      return ( 
        <>
            <div className="App">
                <Routes>

                    {publicRoutes.map((route, index) => {
                        const Page = route.components;

                        let Layout = DefaultLayout; 
                        
                        if (route.layout) {
                            Layout = route.layout; 
                        } else if (route.layout === null) {
                            Layout = Fragment; 
                        }

                        return (
                            <Route key={route.path} path={route.path} element={<Layout><Page /></Layout>}/>
                        );
                    })}

                    {AdminLogin && adminRoutes && adminRoutes.length > 0 &&
                        adminRoutes.map(route => {
                            const Page = route.components;
                            return (
                                <Route key={route.path} path={route.path} element={<><Page /></>}/>
                            )
                        })
                    }



                </Routes>
            </div>
        </>
      )
  }
}

const mapStateToProps = state => { 
  return {
  }
}
const mapDispatchToProps = dispatch => {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

