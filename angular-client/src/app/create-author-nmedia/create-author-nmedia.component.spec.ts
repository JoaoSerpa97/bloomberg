import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAuthorNMediaComponent } from './create-author-nmedia.component';

describe('CreateAuthorNMediaComponent', () => {
  let component: CreateAuthorNMediaComponent;
  let fixture: ComponentFixture<CreateAuthorNMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAuthorNMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAuthorNMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
