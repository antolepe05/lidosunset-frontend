import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAcquistiRistorante } from './lista-acquisti-ristorante';

describe('ListaAcquistiRistorante', () => {
  let component: ListaAcquistiRistorante;
  let fixture: ComponentFixture<ListaAcquistiRistorante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaAcquistiRistorante],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaAcquistiRistorante);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
