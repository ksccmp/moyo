export const initialState = {
  progressModal: false,
};

export const PROGRESSMODAL_OPENMODAL = 'PROGRESSMODAL_OPENMODAL';
export const PROGRESSMODAL_CLOSEMODAL = 'PROGRESSMODAL_CLOSEMODAL';

export const openModalAction = () => {
  return {
    type: PROGRESSMODAL_OPENMODAL,
  };
};

export const closeModalAction = () => {
  return {
    type: PROGRESSMODAL_CLOSEMODAL,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PROGRESSMODAL_OPENMODAL: {
      return {
        ...state,
        progressModal: true,
      };
    }

    case PROGRESSMODAL_CLOSEMODAL: {
      return {
        ...state,
        progressModal: false,
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
