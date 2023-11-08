import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { emptyAlert, showAlert } from './app.action';
import { exhaustMap, map } from 'rxjs';

@Injectable()
export class AppEffects {
  constructor(private $action: Actions, private _snackbar: MatSnackBar) {}

  _showalert = createEffect(() =>
    this.$action.pipe(
      ofType(showAlert),
      exhaustMap((action) => {
        return this.showSnackBarAlert(action.message, action.resultType)
          .afterDismissed()
          .pipe(
            map(() => {
              return emptyAlert();
            })
          );
      })
    )
  );

  showSnackBarAlert(message: string, resultType: string = 'fail') {
    let _class = resultType == 'pass' ? 'green-snackbar' : 'red-snackbar';
    return this._snackbar.open(message, 'OK', {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 5000,
      panelClass: [_class],
    });
  }
}
