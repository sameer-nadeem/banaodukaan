const initialAuthState = {
    refresh:true
  }
  
  export const cartReducer = (state = initialAuthState, action) => {
    switch (action.type) {
      case 'REFRESH_CART':
        return {refresh:!state.refresh}
      default:
        return { ...state };
    }
  }
  
  
  