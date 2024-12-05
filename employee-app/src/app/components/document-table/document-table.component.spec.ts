import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentService } from '../../services/document.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DocumentTableComponent } from '../document-table/document-table.component';

describe('DocumentTableComponent', () => {
  let component: DocumentTableComponent;
  let fixture: ComponentFixture<DocumentTableComponent>;
  let mockDocumentService: any;
  let mockMatDialog: any;

  beforeEach(() => {
    mockDocumentService = {
      documents$: of([
        {
          id: 1,
          fullName: 'John Doe',
          salary: 50000,
          email: 'john.doe@example.com',
          position: 'Developer',
          creationDate: new Date(),
        },
      ]),
    };

    mockMatDialog = {
      open: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [DocumentTableComponent],
      providers: [
        { provide: DocumentService, useValue: mockDocumentService },
        { provide: MatDialog, useValue: mockMatDialog },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    fixture = TestBed.createComponent(DocumentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with data from DocumentService', () => {
    expect(component.rowData).toEqual([
      {
        id: 1,
        fullName: 'John Doe',
        salary: 50000,
        email: 'john.doe@example.com',
        position: 'Developer',
        creationDate: expect.any(Date),
      },
    ]);
  });

  it('should open the document modal when createDocument is called', () => {
    component.createDocument();
    expect(mockMatDialog.open).toHaveBeenCalledWith(expect.any(Function), {
      width: '400px',
    });
  });

  it('should unsubscribe from subscriptions on destroy', () => {
    const unsubscribeSpy = jest.spyOn(
      component['subscriptions'][0],
      'unsubscribe'
    );
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('should define column definitions', () => {
    expect(component.columnDefs).toBeDefined();
    expect(component.columnDefs.length).toBeGreaterThan(0);
  });
});
