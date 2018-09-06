import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsItemComponent } from './comments-item.component';

describe('CommentsItemComponent', () => {
  let component: CommentsItemComponent;
  let fixture: ComponentFixture<CommentsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
