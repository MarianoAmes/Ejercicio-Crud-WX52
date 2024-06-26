import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTableComponent } from './movie-table.component';

describe('MovieTableComponent', () => {
  let component: MovieTableComponent;
  let fixture: ComponentFixture<MovieTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
