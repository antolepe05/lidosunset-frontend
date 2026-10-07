import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaVenditeRistorante } from './lista-vendite-ristorante';

describe('ListaVenditeRistorante', () => {
  let component: ListaVenditeRistorante;
  let fixture: ComponentFixture<ListaVenditeRistorante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaVenditeRistorante],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaVenditeRistorante);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
