import { createReducer, on } from '@ngrx/store';
import { AssociateState } from './associate.state';
import {
  addAssociateSuccess,
  deleteAssociateSuccess,
  getAssociateSuccess,
  loadAssociateFailure,
  loadAssociateSuccess,
  openpopup,
  updateAssociateSuccess,
} from './associate.action';

const _associateReducer = createReducer(
  AssociateState,
  on(loadAssociateSuccess, (state, action) => {
    return {
      ...state,
      list: [...action.list],
      errorMessage: '',
    };
  }),
  on(loadAssociateFailure, (state, action) => {
    return {
      ...state,
      list: [],
      errorMessage: action.errorMessage,
    };
  }),
  on(addAssociateSuccess, (state, action) => {
    const maxId = Math.max(...state.list.map((o) => o.id));
    const _newdata = { ...action.inputdata };
    _newdata.id = maxId + 1;
    return {
      ...state,
      list: [...state.list, _newdata],
      errorMessage: '',
    };
  }),
  on(getAssociateSuccess, (state, action) => {
    return {
      ...state,
      associateObj: action.obj,
      errorMessage: '',
    };
  }),
  on(openpopup, (state, action) => {
    return {
      ...state,
      associateObj: {
        id: 0,
        name: '',
        email: '',
        phone: '',
        type: 'CUSTOMER',
        address: '',
        associategroup: 'level1',
        status: true,
      },
    };
  }),
  on(updateAssociateSuccess, (state, action) => {
    const _newdata = state.list.map((o) => {
      return o.id === action.inputdata.id ? action.inputdata : o;
    });

    return {
      ...state,
      list: _newdata,
      errorMessage: '',
    };
  }),
  on(deleteAssociateSuccess, (state, action) => {
    const _newdata = state.list.filter((o) => {
      return o.id !== action.code;
    });

    return {
      ...state,
      list: _newdata,
      errorMessage: '',
    };
  })
);

export function associateReducer(state: any, action: any) {
  return _associateReducer(state, action);
}
