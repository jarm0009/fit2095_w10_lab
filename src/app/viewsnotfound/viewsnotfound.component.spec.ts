import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsnotfoundComponent } from './viewsnotfound.component';

describe('ViewsnotfoundComponent', () => {
  let component: ViewsnotfoundComponent;
  let fixture: ComponentFixture<ViewsnotfoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewsnotfoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsnotfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
