import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameuserComponent } from './gameuser.component';

describe('GameuserComponent', () => {
  let component: GameuserComponent;
  let fixture: ComponentFixture<GameuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
