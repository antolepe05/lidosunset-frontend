import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPrenotazioni } from './lista-prenotazioni';

describe('ListaPrenotazioni', () => {
  let component: ListaPrenotazioni;
  let fixture: ComponentFixture<ListaPrenotazioni>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPrenotazioni],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaPrenotazioni);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
