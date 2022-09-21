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
    
    onHide = () => {
        const node = this.myRef.current;
        node.classList.remove('keyfame');
        setTimeout(() =>{
            node.style.display = 'none';
        },250)
    }

      
    render() {

        let {children,content,className,Location,Arrow,height} = this.props
        return (
       
            <div className='tippy' onMouseLeave={() => this.onHide()} onMouseOver={() => this.handleHover()}>
                {children}

               <div style={{bottom: `calc(-${height}% )`}} ref={this.myRef} className='contents'>
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
