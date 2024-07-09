import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { OnInit } from '@angular/core';
import { UserHelpersService } from '../../services/user-helpers.service';
@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrl: './search-product.component.css'
})
export class SearchProductComponent implements OnInit {
  searchMovieList: any = [];
  searchString: any;
  constructor( private router: ActivatedRoute,private usersrv:UserHelpersService) {
    const routeParams = this.router.snapshot.paramMap;
    const searchString = String(routeParams.get('searchString'));
  }
  ngOnInit(): void {
    this.router.paramMap.subscribe({
      next: (params: ParamMap) => {
        this.searchString = params.get('searchString');
        this.usersrv.searchMovie(this.searchString.trim()).subscribe((res: any) => {
          // console.log(res)
          this.searchMovieList = res;
         
        });
      },
      error: (error) => {
        alert("error while feching products " + error);
      }
    }

    );
  }


}
