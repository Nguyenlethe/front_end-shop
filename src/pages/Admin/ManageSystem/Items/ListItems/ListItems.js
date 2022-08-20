
import React, { Component } from 'react';
import { connect } from "react-redux";
import SwitchLanguage from '../../../../../SwitchLanguage';
import * as actions from '../../../../../store/action';


import classNames from 'classnames/bind';
import styles from './ListItems.module.scss';
const cx = classNames.bind(styles);

class ListItems extends Component {
    constructor(props){
        super(props);
        this.state = {
            listAllItems: []
        }
    }

    componentDidMount = async() => {
        await this.props.getDataItems('All')
    }


    componentDidUpdate = async(prevProps, prevState) => {
        let {itemsAll} = this.props

        if(prevProps.itemsAll !== this.props.itemsAll){
            
            this.setState({
                listAllItems: itemsAll
            })
        }

    }


    render() {

        let {listAllItems} = this.state

        console.log(listAllItems)

    return (
        <>
            <div className={cx('col l-12')}>
                <div className={cx('tabel')}>
                    <table id={cx('customers')}>
                        <tbody>

                            <tr>
                                <th>STT</th>
                                <th><SwitchLanguage id='manageAdmin.form.nameItemsListItems' /></th>
                                <th><SwitchLanguage id='manageAdmin.form.codeItems' /></th>
                                <th><SwitchLanguage id='manageAdmin.form.category' /></th>
                                <th><SwitchLanguage id='manageAdmin.form.type' /></th>
                                <th><SwitchLanguage id='manageAdmin.form.Detail' /></th>
                                <th><SwitchLanguage id='manageAdmin.form.Actions' /></th>
                            </tr>

                         
                            <tr>

                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>

                            </tr>
                             
                            
                        </tbody>
                    </table>
            
                </div> 
            </div>   
        </>
    )}
} 


const mapStateToProps = state => {
    
    return {
        itemsAll: state.admin.items.itemsAll,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDataItems: (type) => dispatch(actions.getDataItemsStart(type)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItems);