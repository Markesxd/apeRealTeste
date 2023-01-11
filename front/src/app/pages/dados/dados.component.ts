import { TransferService } from './../../services/transfer/transfer.service';
import { Router } from '@angular/router';
import { DataResponse } from './../../model/dataResponse';
import { Observatory } from './../../model/observarory';
import { ApiService } from './../../services/api/api.service';
import { Component, Input, OnInit } from '@angular/core';
import { SortEnum } from 'src/app/model/sortEnun';

@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.css']
})
export class DadosComponent{

    data: any;
    page = 0;
    year = 2010;
    size = 10;
    sort = 'municipio';
    description = false;

    constructor(private service: ApiService, private router: Router, private transfer: TransferService) {
    }

    ngOnInit(): void {
      this.fetchData();
    }

    fetchData(){
      this.service.dataByYear(this.page, this.size, this.year, this.sort).subscribe(
        data => {this.data = data}
      );
    }

    setYear($event: any) {
      const year = $event.target.value;
      if(year > 2019 || year < 2010) return;
      this.year = year;
      this.fetchData();
    }

    setSize($event: any) {
      const size = $event.target.value;
      if(size < 0) return;
      this.size = size;
      this.fetchData();
    }

    setPage($event: any) {
      const page = $event.target.value - 1;
      if(page < 0 || page > this.data.totalPages - 1) return;
      this.page = page;
      this.fetchData();
    }

    setSort(sort: string) {
      if(this.sort === sort){
        this.sort = sort + ',desc';
      } else {
        this.sort = sort;
      }
      this.fetchData();
    }

    navigate(url: string) {
      const data = [] as number[];
      document.querySelectorAll('.t_checkbox').forEach((checkbox: any) => {

        if(checkbox.checked){
          data.push(checkbox.value);
        }
      });
      if(data.length === 0) {
        alert("Selecione pelo menos um municíopio")
        return
      };
      this.transfer.setData(data);
      this.router.navigateByUrl(url);
    }

    toggleText() {
      const icon = document.querySelector("#description_icon") as HTMLElement;
      icon?.classList.toggle('rotate');
      this.description = !this.description;

    }
}
