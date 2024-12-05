import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ColDef } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { DocumentModalComponent } from '../document-modal/document-modal.component';
import { DocumentService } from '../../services/document.service';
import { EmployeeDocument } from '../../types/employee-document';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CustomButtonComponent } from '../common/ag-grid/button-group.component';

@Component({
  selector: 'app-document-table',
  templateUrl: './document-table.component.html',
  styleUrls: ['./document-table.component.scss'],
  standalone: true,
  imports: [MatDialogModule, AgGridAngular, MatButtonModule, MatIconModule],
})
export class DocumentTableComponent implements OnInit, OnDestroy {
  rowData: EmployeeDocument[] = [];
  pageSizeOptions = [5, 10, 20, 50];
  columnDefs: ColDef[] = [
    {
      field: 'fullName',
      headerName: 'Full Name',
      sortable: true,
      filter: true,
      filterParams: {
        buttons: ['apply', 'cancel', 'reset'],
        closeOnApply: true,
        closeOnCancel: true,
        closeOnReset: true,
      },
    },
    {
      field: 'salary',
      headerName: 'Salary',
      sortable: true,
      filter: true,
      filterParams: {
        buttons: ['apply', 'cancel', 'reset'],
        closeOnApply: true,
        closeOnCancel: true,
        closeOnReset: true,
      },
    },
    {
      field: 'email',
      headerName: 'Email Address',
      sortable: true,
      filter: true,
      filterParams: {
        buttons: ['apply', 'cancel', 'reset'],
        closeOnApply: true,
        closeOnCancel: true,
        closeOnReset: true,
      },
    },
    {
      field: 'position',
      headerName: 'Position',
      sortable: true,
      filter: true,
      filterParams: {
        buttons: ['apply', 'cancel', 'reset'],
        closeOnApply: true,
        closeOnCancel: true,
        closeOnReset: true,
      },
    },
    {
      field: 'creationDate',
      headerName: 'Creation Date',
      sortable: true,
      filter: true,
      filterParams: {
        buttons: ['apply', 'cancel', 'reset'],
        closeOnApply: true,
        closeOnCancel: true,
        closeOnReset: true,
      },
      valueFormatter: ({ value }) => new Date(value).toLocaleDateString(),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      cellRenderer: CustomButtonComponent,
    },
  ];

  private documentService = inject(DocumentService);
  private dialog = inject(MatDialog);
  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    const documentDataSubscription = this.documentService.documents$.subscribe(
      (data) => (this.rowData = data)
    );
    this.subscriptions.push(documentDataSubscription);
  }
  createDocument() {
    this.dialog.open(DocumentModalComponent, { width: '400px' });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
