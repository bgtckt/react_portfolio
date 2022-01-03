const defaultBooksState = {
  books: []
};

const defaultSearchFieldState = {
  searchField: ''
};

const defaultSortState = {
  sort: 'Сначала новые'
};

const defaultFilterState = {
  filter: 'All'
};

const defaultIsSearchDoneState = {
  isSearchDone: false
};

const defaultIsLoadingState = {
  isLoading: false
};

const defaultIsBookLoadingState = {
  isBookLoading: true
};

const defaultIsPagVisibleState = {
  isPagVisible: false
};

const defaultMessageState = {
  message: ''
};

const defaultAmountState = {
  amount: 6
};

const defaultErrorState = {
  error: ''
};

const defaultBookState = {
  book: {}
};

export function booksReducer (state = defaultBooksState, action) {
  switch (action.type) {
    case 'SET_BOOKS':
      return {...state, books: [...action.payload]};
    default:
      return state;
  }
}

export function searchFieldReducer (state = defaultSearchFieldState, action) {
  switch (action.type) {
    case 'SET_SEARCHFIELD':
      return {...state, searchField: action.payload};
    default:
      return state;
  }
}

export function sortReducer (state = defaultSortState, action) {
  switch (action.type) {
    case 'SET_SORT':
      return {...state, sort: action.payload};
    default:
      return state;
  }
}

export function filterReducer (state = defaultFilterState, action) {
  switch (action.type) {
    case 'SET_FILTER':
      return {...state, filter: action.payload};
    default:
      return state;
  }
}

export function isSearchDoneReducer (state = defaultIsSearchDoneState, action) {
  switch (action.type) {
    case 'SET_ISSEARCHDONE':
      return {...state, isSearchDone: action.payload};
    default:
      return state;
  }
}

export function isLoadingReducer (state = defaultIsLoadingState, action) {
  switch (action.type) {
    case 'SET_ISLOADING':
      return {...state, isLoading: action.payload};
    default:
      return state;
  }
}

export function isBookLoadingReducer (state = defaultIsBookLoadingState, action) {
  switch (action.type) {
    case 'SET_ISBOOKLOADING':
      return {...state, isBookLoading: action.payload};
    default:
      return state;
  }
}

export function isPagVisibleReducer (state = defaultIsPagVisibleState, action) {
  switch (action.type) {
    case 'SET_ISPAGVISIBLE':
      return {...state, isPagVisible: action.payload};
    default:
      return state;
  }
}

export function messageReducer (state = defaultMessageState, action) {
  switch (action.type) {
    case 'SET_MESSAGE':
      return {...state, message: action.payload};
    default:
      return state;
  }
}

export function amountReducer (state = defaultAmountState, action) {
  switch (action.type) {
    case 'SET_AMOUNT':
      return {...state, amount: state.amount + action.payload};
    default:
      return state;
  }
}

export function errorReducer (state = defaultErrorState, action) {
  switch (action.type) {
    case 'SET_ERROR':
      return {...state, error: action.payload};
    default:
      return state;
  }
}

export function bookReducer (state = defaultBookState, action) {
  switch (action.type) {
    case 'SET_BOOK':
      return {...state, book: action.payload};
    default:
      return state;
  }
}

export function setAction (type, payload) {
  const actionType = `SET_${type}`;
  return {type: actionType.toUpperCase(), payload: payload};
}