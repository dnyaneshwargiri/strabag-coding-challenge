import { TestBed } from '@angular/core/testing';
import { DocumentService } from './document.service';
import { EmployeeDocument } from '../types/employee-document';
import { MOCK_EMPLOYEE_DOCUMENTS } from '../assets/mock-data';

describe('DocumentService', () => {
  let service: DocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with mock data', (done) => {
    service.documents$.subscribe((documents) => {
      expect(documents).toEqual(MOCK_EMPLOYEE_DOCUMENTS);
      done();
    });
  });

  it('should add a new document', (done) => {
    const newDocument: EmployeeDocument = {
      id: 0,
      fullName: 'New Employee',
      salary: 60000,
      email: 'new.employee@example.com',
      position: 'Manager',
      creationDate: new Date(),
    };

    service.addDocument(newDocument);

    service.documents$.subscribe((documents) => {
      expect(documents.length).toBe(MOCK_EMPLOYEE_DOCUMENTS.length + 1);
      const addedDocument = documents[documents.length - 1];
      expect(addedDocument.fullName).toBe('New Employee');
      expect(addedDocument.salary).toBe(60000);
      expect(addedDocument.position).toBe('Manager');
      done();
    });
  });

  it('should update an existing document', (done) => {
    const updatedDocument: EmployeeDocument = {
      ...MOCK_EMPLOYEE_DOCUMENTS[0],
      fullName: 'Updated Name',
    };

    service.updateDocument(updatedDocument);

    service.documents$.subscribe((documents) => {
      const updatedDoc = documents.find((doc) => doc.id === updatedDocument.id);
      expect(updatedDoc).toBeTruthy();
      expect(updatedDoc?.fullName).toBe('Updated Name');
      done();
    });
  });

  it('should delete a document by ID', (done) => {
    const idToDelete = MOCK_EMPLOYEE_DOCUMENTS[0].id;

    service.deleteDocument(idToDelete);

    service.documents$.subscribe((documents) => {
      const deletedDoc = documents.find((doc) => doc.id === idToDelete);
      expect(deletedDoc).toBeUndefined();
      done();
    });
  });
});
