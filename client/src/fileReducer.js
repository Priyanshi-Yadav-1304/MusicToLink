const handleUserContactModal = (state = false, action) => {
    switch(action.type){
        case 'true':
            return true;
        case 'false':
            return false;
        case 'toggle':
            return !state;
        default :
        return state;
    }
}

export default handleUserContactModal
