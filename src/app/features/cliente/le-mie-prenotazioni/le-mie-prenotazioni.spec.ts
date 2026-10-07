import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeMiePrenotazioni } from './le-mie-prenotazioni';

describe('LeMiePrenotazioni', () => {
  let component: LeMiePrenotazioni;
  let fixture: ComponentFixture<LeMiePrenotazioni>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeMiePrenotazioni],
    }).compileComponents();

    fixture = TestBed.createComponent(LeMiePrenotazioni);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
