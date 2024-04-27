import { Component } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table'
import { MatTableDataSource } from '@angular/material/table';
import { Movie } from '../../models/movies.model';
import { MoviesService } from '../../services/movies.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgForm } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-movie-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginator,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './movie-table.component.html',
  styleUrl: './movie-table.component.css'
})
export class MovieTableComponent {

  movieData!:Movie

  movieForm!:NgForm

  isEditMode = false;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name', 'photo', 'duracion', 'genero', 'actions']

  @ViewChild(MatPaginator,{static: true} ) 
  paginator!:MatPaginator;

  constructor(private MovieService: MoviesService){
    this.movieData = {} as Movie;
  }

  ngOnInit(): void{
/*     this.dataSource.paginator=this.paginator;
    this.dataSource.sort = this.sort; */
    this.getAllStudents();
  }

  getAllStudents(){
    this.MovieService.getList().subscribe((response:any) =>{ this.dataSource.data = response;      
    });
  }

  editItem(element:any){
/*     this.movieData = cloneDeep(element);
    this.isEditMode = true; */
  }

/*   cancelEdit(){
    this.isEditMode = false;
    this.studentForm.resetForm();
  } */

  deleteItem(id: string){
    this.MovieService.deleteItem(id).subscribe(()=>{
      this.dataSource.data = this.dataSource.data.filter((o:any) => o.id!==id);
    });
  }

  addMovie(){
    let maxID: number=0;
    maxID = this.dataSource.data.reduce((max:number, student:any)=> student.id > max ? student.id:max,0);

    this.movieData.id = (Number(maxID)+1).toString();

    this.MovieService.createItem(this.movieData).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map(o => o);
    });
  }

  updateMovie(){
    this.MovieService.updateItem(this.movieData.id, this.movieData).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o: any) => {
        if(o.id === response.id){
          o = response;
        }
        return o;
      });
    });
  }

/*   onSubmit(){
    if(this.studentForm.form.valid){
      if(this.isEditMode){
        this.updateMovie();
      }else{
        this.addMovie();
      }
      this.cancelEdit();
    }else{
      console.log('Invalid Data')
    }
  }*/
}
