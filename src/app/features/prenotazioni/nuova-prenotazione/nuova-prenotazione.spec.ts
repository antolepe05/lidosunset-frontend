import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuovaPrenotazione } from './nuova-prenotazione';

describe('NuovaPrenotazione', () => {
  let component: NuovaPrenotazione;
  let fixture: ComponentFixture<NuovaPrenotazione>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuovaPrenotazione],
    }).compileComponents();

    fixture = TestBed.createComponent(NuovaPrenotazione);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
