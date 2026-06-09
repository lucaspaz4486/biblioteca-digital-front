import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeitorOnline } from './leitor-online';

describe('LeitorOnline', () => {
  let component: LeitorOnline;
  let fixture: ComponentFixture<LeitorOnline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeitorOnline]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeitorOnline);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
