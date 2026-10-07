import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaClienti } from './lista-clienti';

describe('ListaClienti', () => {
  let component: ListaClienti;
  let fixture: ComponentFixture<ListaClienti>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaClienti],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaClienti);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
