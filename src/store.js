import { register } from '@wordpress/data';

const DEFAULT_STATE = {
  link: null,
};

const actions = {
  setLink(link) {
    return {
      type: 'SET_LINK',
      link,
    };
  },
};

const reducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'SET_LINK':
      return {
        ...state,
        link: action.link,
      };
    default:
      return state;
  }
};

const selectors = {
  getLink(state) {
    return state.link;
  },
};

register('my-blocks/transfer-links', {
  reducer,
  actions,
  selectors,
});
