export const initialState = {
  postList: [],
  postListTop: [],
  postListExceptTop: [],
  pos: {},
  infoWindow: null,
  infoWindowCheck: false,
};

export const POSTMAP_GETPOSTLIST = 'POSTMAP_GETPOSTLIST';
export const POSTMAP_GETPOSTLISTTOP = 'POSTMAP_GETPOSTLISTTOP';
export const POSTMAP_GETPOSTLISTEXCEPTTOP = 'POSTMAP_GETPOSTLISTEXCEPTTOP';
export const POSTMAP_GETPOS = 'POSTMAP_GETPOS';
export const POSTMAP_GETINFOWINDOW = 'POSTMAP_GETINFOWINDOW';

export const getPostListAction = res => {
  return {
    type: POSTMAP_GETPOSTLIST,
    payload: res,
  };
};

export const getPostListTopAction = res => {
  return {
    type: POSTMAP_GETPOSTLISTTOP,
    payload: res,
  };
};

export const getPostListExceptTopAction = res => {
  return {
    type: POSTMAP_GETPOSTLISTEXCEPTTOP,
    payload: res,
  };
};

export const getPosAction = res => {
  return {
    type: POSTMAP_GETPOS,
    payload: res,
  };
};

export const getInfoWindow = res => {
  return {
    type: POSTMAP_GETINFOWINDOW,
    payload: res,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTMAP_GETPOSTLIST: {
      return {
        ...state,
        postList: action.payload,
      };
    }

    case POSTMAP_GETPOSTLISTTOP: {
      return {
        ...state,
        postListTop: action.payload,
      };
    }

    case POSTMAP_GETPOSTLISTEXCEPTTOP: {
      return {
        ...state,
        postListExceptTop: action.payload,
      };
    }

    case POSTMAP_GETPOS: {
      return {
        ...state,
        pos: action.payload,
      };
    }

    case POSTMAP_GETINFOWINDOW: {
      return {
        ...state,
        infoWindowCheck: action.payload ? true : false,
        infoWindow: action.payload,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducer;
