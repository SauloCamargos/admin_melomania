import {Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges} from '@angular/core';
declare let $: any;

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {


  @Input() config: any;
  @Output() activatedPage = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    if (this.config) {
      const params = this.filterParams();
      this.config = Object.assign(this.config, params);
    }
  }

  constructor() {}

  ngOnInit() {

  }

  filterParams() {
    let paramsFirstPage, paramsLastPage, paramsNextPage, paramsPrevPage;
    paramsFirstPage = this.config.first_page_url;
    paramsLastPage = this.config.last_page_url;
    paramsNextPage = this.config.next_page_url;
    paramsPrevPage = this.config.prev_page_url;
    const elements = [paramsFirstPage, paramsLastPage, paramsNextPage, paramsPrevPage];
    const elementsIndex = ['params_first_page', 'params_last_page', 'params_next_page', 'params_prev_page'];
    const arrayReturn = [];
    const $this = this;
    elements.forEach((item, index) => {
      if (item) {
        const obj = {
          query_uri: undefined,
          qtd: undefined,
          page: undefined
        };
        obj.query_uri = item.replace($this.config.path, '');
        const myRe = /qtd=(.*)&page=(.*)/;
        const myArray = myRe.exec(obj.query_uri);
        obj.qtd = myArray[1];
        obj.page = myArray[2];
        arrayReturn[elementsIndex[index]] = obj;
      }
    });
    return arrayReturn;
  }

  getPages() {
    if (this.config) {
      const per_page = parseInt(this.config.per_page.toString());
      const total = (this.config.total.toString());
      const rest = total % per_page;
      let numberPages = parseInt((total / per_page).toString());
      if (rest > 0) {
        numberPages = numberPages + 1;
      }
      const variavel = []
      for (let i = 1; i <= numberPages; i++) {
        const aux = {
          page_number: i
        };
        variavel.push(aux);
      }
      return variavel;
    }
  }

  setPage(page, qtd? ) {
    if (!this.hasCurrent(page)) {
      const qtd = (this.config.per_page) ? this.config.per_page : undefined;
      this.activatedPage.emit({
        page: page,
        qtd: qtd
      });
    }
  }

  hasCurrent(page) {
    return page === this.config.current_page;
  }

}
