import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmProjectsPage } from './adm-projects.page';

describe('AdmProjectsPage', () => {
  let component: AdmProjectsPage;
  let fixture: ComponentFixture<AdmProjectsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmProjectsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
