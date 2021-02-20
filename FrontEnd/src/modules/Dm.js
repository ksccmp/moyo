export const initialState = {
  MAKEID_CHAR: '@make@',
  DATETIME_CHAR: '@time@',
  lastMessageUser: '',
  goProfileBlock: false,
};

export const DM_LASTMESSAGEUSER = 'DM_LASTMESSAGEUSER';
export const DM_GOPROFILEBLOCK = 'DM_GOPROFILEBLOCK';
export const DM_GOPROFILEUNBLOCK = 'DM_GOPROFILEUNBLOCK';

export const changeLastMessageUserAction = res => {
  return {
    type: DM_LASTMESSAGEUSER,
    payload: res,
  };
};

export const goProfileBlockAction = () => {
  return {
    type: DM_GOPROFILEBLOCK,
  };
};

export const goProfileUnBlockAction = () => {
  return {
    type: DM_GOPROFILEUNBLOCK,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DM_LASTMESSAGEUSER: {
      return {
        ...state,
        lastMessageUser: action.payload,
      };
    }

    case DM_GOPROFILEBLOCK: {
      return {
        ...state,
        goProfileBlock: true,
      };
    }

    case DM_GOPROFILEUNBLOCK: {
      return {
        ...state,
        goProfileBlock: false,
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
