import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentuserComponent } from './segmentuser.component';

describe('SegmentuserComponent', () => {
  let component: SegmentuserComponent;
  let fixture: ComponentFixture<SegmentuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegmentuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SegmentuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
