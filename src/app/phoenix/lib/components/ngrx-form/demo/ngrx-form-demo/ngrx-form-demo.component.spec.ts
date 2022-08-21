import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxFormDemoComponent } from './ngrx-form-demo.component';

describe('NgrxFormDemoComponent', () => {
  let component: NgrxFormDemoComponent;
  let fixture: ComponentFixture<NgrxFormDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgrxFormDemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgrxFormDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
