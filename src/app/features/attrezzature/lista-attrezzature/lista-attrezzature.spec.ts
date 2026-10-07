import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAttrezzature } from './lista-attrezzature';

describe('ListaAttrezzature', () => {
  let component: ListaAttrezzature;
  let fixture: ComponentFixture<ListaAttrezzature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaAttrezzature],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaAttrezzature);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
