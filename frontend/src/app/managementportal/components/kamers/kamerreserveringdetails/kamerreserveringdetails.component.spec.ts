import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KamerreserveringdetailsComponent } from './form-kamerreserveringdetails.component';

describe('FormKamerreserveringDetailsComponent', () => {
  let component: KamerreserveringdetailsComponent;
  let fixture: ComponentFixture<KamerreserveringdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KamerreserveringdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KamerreserveringdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
