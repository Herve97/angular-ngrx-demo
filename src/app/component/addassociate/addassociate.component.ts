import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import {
  addAssociate,
  updateAssociate,
} from 'src/app/Store/Associate/associate.action';
import { getassociate } from 'src/app/Store/Associate/associate.selector';
import { Associate } from 'src/app/Store/Model/Associate.model';

@Component({
  selector: 'app-addassociate',
  templateUrl: './addassociate.component.html',
  styleUrls: ['./addassociate.component.scss'],
})
export class AddassociateComponent implements OnInit {
  title: string = 'Create Associate';

  isEdit: boolean = false;

  dialogData: any;

  associateForm = this.builder.group({
    id: this.builder.control(0),
    name: this.builder.control('', Validators.required),
    email: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    phone: this.builder.control('', Validators.required),
    address: this.builder.control('', Validators.required),
    type: this.builder.control('CUSTOMER', Validators.required),
    group: this.builder.control('level1', Validators.required),
    status: this.builder.control(true),
  });

  constructor(
    private builder: FormBuilder,
    private ref: MatDialogRef<AddassociateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.dialogData = this.data;
    this.title = this.dialogData.title;
    this.store.select(getassociate).subscribe((res) => {
      this.associateForm.setValue({
        id: res.id,
        name: res.name,
        email: res.email,
        phone: res.phone,
        type: res.type,
        address: res.address,
        group: res.associategroup,
        status: res.status,
      });
    });
  }

  closePopup() {
    this.ref.close();
  }

  saveAssociate() {
    if (this.associateForm.valid) {
      const _obj: Associate = {
        id: this.associateForm.value.id as number,
        name: this.associateForm.value.name as string,
        email: this.associateForm.value.email as string,
        phone: this.associateForm.value.phone as string,
        type: this.associateForm.value.type as string,
        address: this.associateForm.value.address as string,
        associategroup: this.associateForm.value.group as string,
        status: this.associateForm.value.status as boolean,
      };
      if (_obj.id === 0) {
        this.store.dispatch(addAssociate({ inputdata: _obj }));
      } else {
        this.store.dispatch(updateAssociate({ inputdata: _obj }));
      }
      this.closePopup();
    }
  }
}
