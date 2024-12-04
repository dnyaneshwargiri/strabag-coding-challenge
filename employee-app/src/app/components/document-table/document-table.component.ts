import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ColDef } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { DocumentModalComponent } from '../document-modal/document-modal.component';
import { DocumentService } from '../../services/document.service';
import { EmployeeDocument } from '../../types/employee-document';

@Component({
  selector: 'app-document-table',
  templateUrl: './document-table.component.html',
  styleUrls: ['./document-table.component.scss'],
  standalone: true,
  imports: [MatDialogModule, AgGridAngular],
})
export class DocumentTableComponent {
  rowData: EmployeeDocument[] = [];
  pageSizeOptions = [5, 10, 20, 50];
  columnDefs: ColDef[] = [
    {
      field: 'fullName',
      headerName: 'Full Name',
      sortable: true,
      filter: true,
    },
    { field: 'salary', headerName: 'Salary', sortable: true, filter: true },
    {
      field: 'email',
      headerName: 'Email Address',
      sortable: true,
      filter: true,
    },
    { field: 'position', headerName: 'Position', sortable: true, filter: true },
    {
      field: 'creationDate',
      headerName: 'Creation Date',
      sortable: true,
      filter: true,
      valueFormatter: ({ value }) => new Date(value).toLocaleDateString(),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      cellRenderer: (params: any) => {
        return `
          <button class="mat-button" (click)="editDocument(${params.data.id})">Edit</button>
          <button class="mat-button" (click)="deleteDocument(${params.data.id})">Delete</button>
        `;
      },
    },
  ];

  constructor(
    private documentService: DocumentService,
    private dialog: MatDialog
  ) {
    this.documentService.documents$.subscribe((data) => (this.rowData = data));
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
}
