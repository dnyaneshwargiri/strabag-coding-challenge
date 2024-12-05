import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { DocumentModalComponent } from '../document-modal/document-modal.component';
import { DocumentService } from '../../services/document.service';
import { EmployeeDocument } from '../../types/employee-document';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CustomButtonComponent } from '../common/ag-grid/button-group.component';
import { ActivatedRoute, Router } from '@angular/router';

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
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private subscriptions: Subscription[] = [];
  private gridApi!: GridApi;

  ngOnInit(): void {
    const documentDataSubscription = this.documentService.documents$.subscribe(
      (data) => (this.rowData = data)
    );
    this.subscriptions.push(documentDataSubscription);
    this.subscriptions.push(
      this.route.paramMap.subscribe((params) => {
        const page = Number(params.get('page')) || 1;
        if (this.gridApi) {
          const totalPages = this.gridApi.paginationGetTotalPages();
          const isValidPage = page > 0 && page <= totalPages;
          this.gridApi.paginationGoToPage(isValidPage ? page - 1 : 0);
        }
      })
    );
  }

  createDocument() {
    this.dialog.open(DocumentModalComponent, { width: '400px' });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    const pageParam = this.route.snapshot.paramMap.get('page');
    const page = Number(pageParam);
    const totalPages = this.gridApi.paginationGetTotalPages();
  
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      this.gridApi.paginationGoToPage(page - 1);
    } else {      
      this.router.navigate(['/page', 1], { replaceUrl: true });
    }
  }

  onPaginationChanged() {
    if (this.gridApi) {
      const currentPage = this.gridApi.paginationGetCurrentPage() + 1;
      this.router.navigate(['/page', currentPage]);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
