import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeIstruttore } from './home-istruttore';

describe('HomeIstruttore', () => {
  let component: HomeIstruttore;
  let fixture: ComponentFixture<HomeIstruttore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeIstruttore],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeIstruttore);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
