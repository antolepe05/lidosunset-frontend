import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormManutenzione } from './form-manutenzione';

describe('FormManutenzione', () => {
  let component: FormManutenzione;
  let fixture: ComponentFixture<FormManutenzione>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormManutenzione],
    }).compileComponents();

    fixture = TestBed.createComponent(FormManutenzione);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
