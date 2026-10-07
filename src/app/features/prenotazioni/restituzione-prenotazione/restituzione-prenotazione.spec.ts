import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestituzionePrenotazione } from './restituzione-prenotazione';

describe('RestituzionePrenotazione', () => {
  let component: RestituzionePrenotazione;
  let fixture: ComponentFixture<RestituzionePrenotazione>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestituzionePrenotazione],
    }).compileComponents();

    fixture = TestBed.createComponent(RestituzionePrenotazione);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
