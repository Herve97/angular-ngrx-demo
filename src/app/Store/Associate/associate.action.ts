import { createAction, props } from '@ngrx/store';
import { Associate } from '../Model/Associate.model';

export const LOAD_ASSOCIATE: string = '[associate page] load associate';
export const LOAD_ASSOCIATE_SUCCESS: string =
  '[associate page] load associate success';
export const LOAD_ASSOCIATE_FAILURE: string =
  '[associate page] load associate fail';

export const ADD_ASSOCIATE: string = '[associate page] add associate';
export const ADD_ASSOCIATE_SUCCESS: string =
  '[associate page] add associate success';

export const GET_ASSOCIATE: string = '[associate page] get associate';
export const GET_ASSOCIATE_SUCCESS: string =
  '[associate page] get associate success';

export const OPEN_POPUP = '[associate page] open popup';

export const UPDATE_ASSOCIATE: string = '[associate page] update associate';
export const UPDATE_ASSOCIATE_SUCCESS: string =
  '[associate page] update associate success';

export const DELETE_ASSOCIATE: string = '[associate page] delete associate';
export const DELETE_ASSOCIATE_SUCCESS: string =
  '[associate page] delete associate success';

export const loadAssociate = createAction(LOAD_ASSOCIATE);
export const loadAssociateSuccess = createAction(
  LOAD_ASSOCIATE_SUCCESS,
  props<{ list: Associate[] }>()
);
export const loadAssociateFailure = createAction(
  LOAD_ASSOCIATE_FAILURE,
  props<{ errorMessage: string }>()
);

export const addAssociate = createAction(
  ADD_ASSOCIATE,
  props<{ inputdata: Associate }>()
);
export const addAssociateSuccess = createAction(
  ADD_ASSOCIATE_SUCCESS,
  props<{ inputdata: Associate }>()
);

export const getAssociate = createAction(
  GET_ASSOCIATE,
  props<{ id: number }>()
);
export const getAssociateSuccess = createAction(
  GET_ASSOCIATE_SUCCESS,
  props<{ obj: Associate }>()
);

export const updateAssociate = createAction(
  UPDATE_ASSOCIATE,
  props<{ inputdata: Associate }>()
);
export const updateAssociateSuccess = createAction(
  UPDATE_ASSOCIATE_SUCCESS,
  props<{ inputdata: Associate }>()
);

export const openpopup = createAction(OPEN_POPUP);

export const deleteAssociate = createAction(
  DELETE_ASSOCIATE,
  props<{ code: number }>()
);
export const deleteAssociateSuccess = createAction(
  DELETE_ASSOCIATE_SUCCESS,
  props<{ code: number }>()
);
