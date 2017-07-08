import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TinymceEditorComponent } from './tinymce-editor.component';

describe('TinymceEditorComponent', () => {
  let component: TinymceEditorComponent;
  let fixture: ComponentFixture<TinymceEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TinymceEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinymceEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
