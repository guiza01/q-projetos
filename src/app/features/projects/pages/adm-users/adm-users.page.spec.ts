import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmUsersPage } from './adm-users.page';

describe('AdmUsersPage', () => {
  let component: AdmUsersPage;
  let fixture: ComponentFixture<AdmUsersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
