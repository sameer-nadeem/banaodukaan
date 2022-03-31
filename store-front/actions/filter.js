export const clearFilters = () => dispatch => {
  dispatch({
    type: "CLR_FLTR"
  })
}
export const setCollectionFltr = (c_id) => dispatch => {
  dispatch({
    payload: c_id,
    type: "SET_COLLECTION_FLTR"
  })
}

export const setBrandFltr = (b_id) => dispatch => {
  dispatch({
    payload: b_id,
    type: "SET_BRAND_FLTR"
  })
}

export const setSortbyFltr = (sortBy) => dispatch => {
  dispatch({
    payload: sortBy,
    type: "SET_SORTBY_FLTR"
  })
}

export const setPupperFltr = (p_up) => dispatch => {
  dispatch({
    payload: p_up,
    type: "SET_PUPPER_FLTR"
  })
}

export const setPlowerFltr = (p_lo) => dispatch => {
  dispatch({
    payload: p_lo,
    type: "SET_PLOWER_FLTR"
  })
}
