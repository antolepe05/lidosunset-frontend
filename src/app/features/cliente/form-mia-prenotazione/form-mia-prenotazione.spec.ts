import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMiaPrenotazione } from './form-mia-prenotazione';

describe('FormMiaPrenotazione', () => {
  let component: FormMiaPrenotazione;
  let fixture: ComponentFixture<FormMiaPrenotazione>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormMiaPrenotazione],
    }).compileComponents();

    fixture = TestBed.createComponent(FormMiaPrenotazione);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
