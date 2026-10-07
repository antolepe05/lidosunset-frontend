import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAttrezzatura } from './form-attrezzatura';

describe('FormAttrezzatura', () => {
  let component: FormAttrezzatura;
  let fixture: ComponentFixture<FormAttrezzatura>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAttrezzatura],
    }).compileComponents();

    fixture = TestBed.createComponent(FormAttrezzatura);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
