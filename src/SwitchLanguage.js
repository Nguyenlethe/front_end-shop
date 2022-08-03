import React from 'react';
import { connect } from "react-redux"
import en from'./languages/en/translation.json'
import vi from'./languages/vi/translation.json'


class SwitchLanguage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            languages: true,
            data: ''
        }
    }

    componentDidMount(){
        this.handleCheckOrSetState()
    }


    handleCheckOrSetState = () => {
        let dataLanguage = this.props.language
        if(dataLanguage === 'vi'){
            dataLanguage = vi
        }
        if(dataLanguage === 'en'){
            dataLanguage = en
        }
        let props = this.props.id.split('.');
      

        const [one, tow, three, four, five, six, seven] = props

            let data
            if(dataLanguage[one]){
                data = dataLanguage[one]
                // console.log('Data 1:', data)
                if(tow){
                    if(dataLanguage[one][tow]){
                        data = dataLanguage[one][tow]
                        // console.log('Data 2:', data)
                    }
                    if(three){
                        if(dataLanguage[one][tow][three]){
                            data = dataLanguage[one][tow][three]
                            // console.log('Data 3:', data)
                        }
                        if(four){
                            if(dataLanguage[one][tow][three][four]){
                                data = dataLanguage[one][tow][three][four]
                                // console.log('Data 4:', data)
                            }
                            if(five){
                                if(dataLanguage[one][tow][three][four][five]){
                                    data = dataLanguage[one][tow][three][four][five]
                                    // console.log('Data 5:', data)
                                }
                                if(six){
                                    if(dataLanguage[one][tow][three][four][five][six]){
                                        data = dataLanguage[one][tow][three][four][five][six]
                                        // console.log('Data 6:', data)
                                    }
                                    if(seven){
                                        console.warn('Maximum only is 6 children')
                                    }else{
                                        if(typeof data == 'string'){
                                            this.setState({data: data})
                                        }else{
                                            console.warn(data + ' is not a string')
                                        }
                                    }
                                }else{
                                    if(typeof data == 'string'){
                                        this.setState({data: data})
                                    }else{
                                        console.warn(data + ' is not a string')
                                    }
                                }
                            }else{
                                if(typeof data == 'string'){
                                    this.setState({data: data})
                                }else{
                                    console.warn(data + ' is not a string')
                                }
                            }
                        }else{
                            if(typeof data == 'string'){
                                 this.setState({data: data})
                            }else{
                                console.warn(data + ' is not a string')
                            }
                        }
                    }else{
                        if(typeof data == 'string'){
                            this.setState({data: data})
                        }else{
                            console.warn(data + ' is not a string')
                        }
                    }
                }else{
                    if(typeof data == 'string'){
                        this.setState({data: data})
                    }else{
                        console.warn(data + ' is not a string')
                    }
                }
            }else{
                console.log('Not data :'+one)
            }
    }


    componentDidUpdate(prevProps) {
        if(prevProps.language !== this.props.language){
            this.handleCheckOrSetState()
        }
    }

    render() {
        return ( <>{this.state.data}</> )
    }
}

const mapStateToProps = (state) => {
    return { language: state.app.language }
}

export default connect(mapStateToProps)(SwitchLanguage);