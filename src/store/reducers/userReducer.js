import actionTypes from '../action/actionTypes';


const initialState = {
    hi: [
        'Alooo'
    ]
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        
        default:
            return state;
    }
    
}

export default userReducer;