import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFornitori } from './lista-fornitori';

describe('ListaFornitori', () => {
  let component: ListaFornitori;
  let fixture: ComponentFixture<ListaFornitori>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaFornitori],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaFornitori);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
