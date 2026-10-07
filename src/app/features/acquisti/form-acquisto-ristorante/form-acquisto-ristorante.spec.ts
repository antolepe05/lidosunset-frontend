import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAcquistoRistorante } from './form-acquisto-ristorante';

describe('FormAcquistoRistorante', () => {
  let component: FormAcquistoRistorante;
  let fixture: ComponentFixture<FormAcquistoRistorante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAcquistoRistorante],
    }).compileComponents();

    fixture = TestBed.createComponent(FormAcquistoRistorante);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
