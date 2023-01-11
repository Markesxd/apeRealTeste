import { DataResponse } from './../../model/dataResponse';
import { Observatory } from './../../model/observarory';
import { TransferService } from './../../services/transfer/transfer.service';
import { ChartData } from './../../model/chartData';
import { ApiService } from './../../services/api/api.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Chart, ChartItem, registerables } from 'chart.js';

Chart.register(...registerables)

@Component({
  selector: 'app-municipio',
  templateUrl: './municipio.component.html',
  styleUrls: ['./municipio.component.css']
})
export class MunicipioComponent {

  private taxLiqData = [] as ChartData[];
  private numberLiqData = [] as ChartData[];
  private numberRawData = [] as ChartData[];
  private taxRawData = [] as ChartData[];
  private curChart = 0;
  private chart: Chart|undefined;
  public title = 'Taxa Bruta de Matrículas';
  constructor(private router: Router, private api: ApiService, private transfer: TransferService) { }

  ngOnInit() {
    this.api.dataByCity(this.transfer.getData()).subscribe(
      (data: any) => {
          this.processData(data);
          this.renderChart();
      });
  }

  navegate(url: string) {
    this.router.navigateByUrl(url);
  }

  switchChart() {
    this.curChart++;
    this.renderChart();
  }

  getData() {
    switch(this.curChart % 4){
      case 0:
        this.title = 'Taixa Bruta de Matrículas'
        return this.taxRawData;
      case 1:
        this.title = 'Número Bruto de Matrículas'
        return this.numberRawData;
      case 2 :
        this.title = 'Taxa Líquida de Matrículas'
        return this.taxLiqData;
      default:
        this.title = 'Número Líquido de Matrículas'
        return this.numberLiqData;
    }
  }

  processData(rawData: Observatory[]){
    const data = {} as any;
    for(let city of this.transfer.getData()){
      data[city] = [];
    }
    for(let row of rawData){
      data[row.id_municipio].push(row);
    }
    for(let city of this.transfer.getData()){
      this.formatData(data[city]);
    }
  }

  formatData(data: Observatory[]){
    const processedRawTaxData = {
      label: `${data[0].id_municipio}`,
      data: [],
      borderWidth: 1
    }
    const processedLiqTaxData = {
      label: `${data[0].id_municipio}`,
      data: [],
      borderWidth: 1
    }
    const proccessedRawNumberData = {
      label: `${data[0].id_municipio}`,
      data: [],
      borderWidth: 1
    }
    const proccessedLiqNumberData = {
      label: `${data[0].id_municipio}`,
      data: [],
      borderWidth: 1
    }

      data.forEach( (data) => {
      processedRawTaxData.data.push(data.taxa_bruta_matricula_pre_escola as never);
      processedLiqTaxData.data.push(data.taxa_liquida_matricula_pre_escola as never);
      proccessedRawNumberData.data.push(data.numero_absoluto_bruto_matricula_pre_escola as never);
      proccessedLiqNumberData.data.push(data.numero_absoluto_liquido_matricula_pre_escola as never);
    });
    this.taxRawData.push(processedRawTaxData);
    this.taxLiqData.push(processedLiqTaxData);
    this.numberRawData.push(proccessedRawNumberData);
    this.numberLiqData.push(proccessedLiqNumberData);
  }

  renderChart() {
    const data = this.getData();
    const ctx = document.getElementById('lineChart') as ChartItem;
    this.chart?.destroy();
    this.chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
      datasets: data
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          }
        }
      }
     });
  }

}
