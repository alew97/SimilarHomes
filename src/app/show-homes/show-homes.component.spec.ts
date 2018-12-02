import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHomesComponent } from './show-homes.component';

describe('ShowHomesComponent', () => {
  let component: ShowHomesComponent;
  let fixture: ComponentFixture<ShowHomesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowHomesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowHomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
