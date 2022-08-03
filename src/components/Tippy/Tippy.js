import React, { Component } from 'react';
import { connect } from "react-redux";


import './Tippy.scss';

class Tippy extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            isShowSubItem: true,
        }
    }

   

    componentDidMount = async ()=>  {
    }
    
    
    componentDidUpdate= async(prevProps, prevState)=> {
        if(prevProps.language !== this.props.language){
            
        }
        
    }
    
    handleHover = () => {
        const { innerWidth: width} = window;
        const node = this.myRef.current;
        if(width < 1200){
            node.classList.remove('keyfame');
            node.style.display = 'none';
        }else{

            node.style.display = 'block';
            node.classList.add('keyfame');
        }

    }
    
    onHover = () => {
        const node = this.myRef.current;
        node.classList.remove('keyfame');
        setTimeout(() =>{
            node.style.display = 'none';
        },250)
    }

      
    render() {

        let {children,content,className,Location,Arrow,height} = this.props
        let {isShowSubItem} = this.state
        return (
       
            <div className='tippy' onMouseLeave={() => this.onHover()} onMouseOver={() => this.handleHover()}>
                {children}

               <div style={{bottom: `calc(-${height}% )`}} ref={this.myRef} className='content'>
                    <span>{content}</span>
                </div>

            </div>
        
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

export default connect(mapStateToProps, mapDispatchToProps)(Tippy);
