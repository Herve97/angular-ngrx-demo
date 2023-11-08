// handle HTTP Request

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AssociateService } from 'src/app/service/associate.service';
import {
  addAssociate,
  addAssociateSuccess,
  deleteAssociate,
  deleteAssociateSuccess,
  getAssociate,
  getAssociateSuccess,
  loadAssociate,
  loadAssociateFailure,
  loadAssociateSuccess,
  updateAssociate,
  updateAssociateSuccess,
} from './associate.action';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { showAlert } from '../Common/app.action';

@Injectable()
export class AssociateEffects {
  constructor(private action$: Actions, private service: AssociateService) {}

  _loadAssociate = createEffect(() =>
    this.action$.pipe(
      ofType(loadAssociate),
      exhaustMap((action) => {
        return this.service.getAll().pipe(
          map((data) => {
            return loadAssociateSuccess({ list: data });
          }),
          catchError((_error: any) =>
            of(
              loadAssociateFailure({
                errorMessage: _error.message ? _error.message : _error,
              })
            )
          )
        );
      })
    )
  );

  _addAssociate = createEffect(() =>
    this.action$.pipe(
      ofType(addAssociate),
      switchMap((action) => {
        return this.service.create(action.inputdata).pipe(
          switchMap((data) => {
            return of(
              addAssociateSuccess({ inputdata: action.inputdata }),
              showAlert({
                message: 'Created successfully',
                resultType: 'pass',
              })
            );
          }),
          catchError((_error: any) =>
            of(
              showAlert({
                message: 'Failed to create associate',
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _getAssociate = createEffect(() =>
    this.action$.pipe(
      ofType(getAssociate),
      exhaustMap((action) => {
        return this.service.getByCode(action.id).pipe(
          map((data) => {
            return getAssociateSuccess({ obj: data });
          }),
          catchError((_error: any) =>
            of(
              showAlert({
                message: 'Failed to fetch data ' + _error.message,
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _updateAssociate = createEffect(() =>
    this.action$.pipe(
      ofType(updateAssociate),
      switchMap((action) => {
        return this.service.update(action.inputdata).pipe(
          switchMap((data) => {
            return of(
              updateAssociateSuccess({ inputdata: action.inputdata }),
              showAlert({
                message: 'Updated successfully',
                resultType: 'pass',
              })
            );
          }),
          catchError((_error: any) =>
            of(
              showAlert({
                message: 'Failed to update associate',
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _deleteAssociate = createEffect(() =>
    this.action$.pipe(
      ofType(deleteAssociate),
      switchMap((action) => {
        return this.service.delete(action.code).pipe(
          switchMap((data) => {
            return of(
              deleteAssociateSuccess({ code: action.code }),
              showAlert({
                message: 'Deleted successfully',
                resultType: 'pass',
              })
            );
          }),
          catchError((_error: any) =>
            of(
              showAlert({
                message: 'Failed to delete associate',
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );
}
