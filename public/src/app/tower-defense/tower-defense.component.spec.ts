import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TowerDefenseComponent } from './tower-defense.component';

describe('TowerDefenseComponent', () => {
  let component: TowerDefenseComponent;
  let fixture: ComponentFixture<TowerDefenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TowerDefenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TowerDefenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
