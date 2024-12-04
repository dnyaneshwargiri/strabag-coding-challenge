import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ColDef } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { DocumentModalComponent } from '../document-modal/document-modal.component';
import { DocumentService } from '../../services/document.service';
import { EmployeeDocument } from '../../types/employee-document';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-document-table',
  templateUrl: './document-table.component.html',
  styleUrls: ['./document-table.component.scss'],
  standalone: true,
  imports: [MatDialogModule, AgGridAngular],
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

      cellRenderer: (params: { data: { id: number } }) => {
        return `
          <button class="mat-button" (click)="editDocument(${params.data.id})">Edit</button>
          <button class="mat-button" (click)="deleteDocument(${params.data.id})">Delete</button>
        `;
      },
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

  editDocument(document: EmployeeDocument) {
    this.dialog.open(DocumentModalComponent, {
      width: '400px',
      data: document,
    });
  }

  deleteDocument(id: number) {
    if (confirm('Are you sure you want to delete this document?')) {
      this.documentService.deleteDocument(id);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
