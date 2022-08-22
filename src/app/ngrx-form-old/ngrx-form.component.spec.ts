import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxFormComponent } from './ngrx-form.component';

describe('NgrxFormComponent', () => {
  let component: NgrxFormComponent;
  let fixture: ComponentFixture<NgrxFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgrxFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgrxFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
