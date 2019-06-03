import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaprofileComponent } from './mediaprofile.component';

describe('MediaprofileComponent', () => {
  let component: MediaprofileComponent;
  let fixture: ComponentFixture<MediaprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
