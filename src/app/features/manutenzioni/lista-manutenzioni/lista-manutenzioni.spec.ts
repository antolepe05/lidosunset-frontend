import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaManutenzioni } from './lista-manutenzioni';

describe('ListaManutenzioni', () => {
  let component: ListaManutenzioni;
  let fixture: ComponentFixture<ListaManutenzioni>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaManutenzioni],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaManutenzioni);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
