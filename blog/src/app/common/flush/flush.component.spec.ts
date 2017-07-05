import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlushComponent } from './flush.component';

describe('FlushComponent', () => {
  let component: FlushComponent;
  let fixture: ComponentFixture<FlushComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlushComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
