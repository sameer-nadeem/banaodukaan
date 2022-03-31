const initialAuthState = {
  collection: null,
  brand: null,
  sortBy: "newest",
  priceUpper: 99999999,
  priceLower: 0
}

export const filterReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case 'CLR_FLTR':
      return {
        collection: null,
        brand: null,
        sortBy: null,
        priceUpper: Number.MAX_VALUE,
        priceLower: 0
      }
    case 'SET_COLLECTION_FLTR':
      return { ...state, collection: action.payload }
    case 'SET_BRAND_FLTR':
      return { ...state, brand: action.payload }
    case 'SET_SORTBY_FLTR':
      return { ...state, sortBy: action.payload }
    case 'SET_PUPPER_FLTR':
      return { ...state, priceUpper: action.payload }
    case 'SET_PLOWER_FLTR':
      return { ...state, priceLower: action.payload }
    default:
      return { ...state };
  }
}


