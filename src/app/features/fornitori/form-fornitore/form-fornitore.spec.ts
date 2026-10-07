import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFornitore } from './form-fornitore';

describe('FormFornitore', () => {
  let component: FormFornitore;
  let fixture: ComponentFixture<FormFornitore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFornitore],
    }).compileComponents();

    fixture = TestBed.createComponent(FormFornitore);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
