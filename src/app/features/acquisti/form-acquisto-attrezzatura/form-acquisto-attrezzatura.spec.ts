import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAcquistoAttrezzatura } from './form-acquisto-attrezzatura';

describe('FormAcquistoAttrezzatura', () => {
  let component: FormAcquistoAttrezzatura;
  let fixture: ComponentFixture<FormAcquistoAttrezzatura>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAcquistoAttrezzatura],
    }).compileComponents();

    fixture = TestBed.createComponent(FormAcquistoAttrezzatura);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
