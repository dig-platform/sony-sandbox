import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStateInspectorComponent } from './form-state-inspector.component';

describe('FormStateInspectorComponent', () => {
  let component: FormStateInspectorComponent;
  let fixture: ComponentFixture<FormStateInspectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormStateInspectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormStateInspectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
