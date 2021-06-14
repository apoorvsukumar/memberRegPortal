import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitclaimComponent } from './submitclaim.component';

describe('SubmitclaimComponent', () => {
  let component: SubmitclaimComponent;
  let fixture: ComponentFixture<SubmitclaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitclaimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitclaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
