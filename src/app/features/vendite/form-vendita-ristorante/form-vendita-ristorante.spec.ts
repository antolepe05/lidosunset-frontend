import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVenditaRistorante } from './form-vendita-ristorante';

describe('FormVenditaRistorante', () => {
  let component: FormVenditaRistorante;
  let fixture: ComponentFixture<FormVenditaRistorante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormVenditaRistorante],
    }).compileComponents();

    fixture = TestBed.createComponent(FormVenditaRistorante);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
