import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AssociateModel } from '../Model/Associate.model';

const getAssociateState = createFeatureSelector<AssociateModel>('associate');

export const getAssociateList = createSelector(getAssociateState, (state) => {
  return state.list;
});

export const getassociate = createSelector(getAssociateState, (state) => {
  return state.associateObj;
});
