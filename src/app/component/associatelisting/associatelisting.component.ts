import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddassociateComponent } from '../addassociate/addassociate.component';
import { Store } from '@ngrx/store';
import { Associate } from 'src/app/Store/Model/Associate.model';
import { getAssociateList } from 'src/app/Store/Associate/associate.selector';
import {
  deleteAssociate,
  getAssociate,
  loadAssociate,
  openpopup,
} from 'src/app/Store/Associate/associate.action';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-associatelisting',
  templateUrl: './associatelisting.component.html',
  styleUrls: ['./associatelisting.component.scss'],
})
export class AssociatelistingComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  associateList!: Associate[];
  displayedColumns: string[] = [
    'code',
    'name',
    'email',
    'phone',
    'type',
    'address',
    'associategroup',
    'status',
    'action',
  ];

  datasource: any;

  constructor(private dialog: MatDialog, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadAssociate());
    this.store.select(getAssociateList).subscribe((item) => {
      this.associateList = item;
      this.datasource = new MatTableDataSource<Associate>(this.associateList);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    });
  }

  functionAdd() {
    this.openPopup(0, 'Create Associate');
  }

  functioEdit(code: number) {
    this.openPopup(code, 'Update Associate');
    this.store.dispatch(getAssociate({ id: code }));
  }

  functioDelete(code: number) {
    if (confirm('Do you want to remove?')) {
      this.store.dispatch(deleteAssociate({ code: code }));
    }
  }

  openPopup(code: number, title: string) {
    this.store.dispatch(openpopup());
    this.dialog.open(AddassociateComponent, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        code,
        title,
      },
    });
  }
}
