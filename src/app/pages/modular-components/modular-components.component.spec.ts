import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModularComponentsComponent } from './modular-components.component';

describe('ModularComponentsComponent', () => {
  let component: ModularComponentsComponent;
  let fixture: ComponentFixture<ModularComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModularComponentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModularComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
