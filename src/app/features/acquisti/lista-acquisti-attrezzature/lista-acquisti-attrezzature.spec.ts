import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAcquistiAttrezzature } from './lista-acquisti-attrezzature';

describe('ListaAcquistiAttrezzature', () => {
  let component: ListaAcquistiAttrezzature;
  let fixture: ComponentFixture<ListaAcquistiAttrezzature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaAcquistiAttrezzature],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaAcquistiAttrezzature);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
