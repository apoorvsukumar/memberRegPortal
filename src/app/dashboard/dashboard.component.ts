import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  claimDetailsArray: Array<Object> = [{"name":"Max, Smith","dob":"06/09/1986","providerName":"ABC Healthcare"},
  {"name":"Down, Ashley","dob":"05/05/1975","providerName":"Glenmark Pharma"},
  {"name":"Jill, Robert","dob":"12/22/1990","providerName":"Apollo Network"},
  {"name":"Dave, Mike","dob":"09/30/1989","providerName":"Zydus Cadella"},
  {"name":"Smith, Will","dob":"11/19/1991","providerName":"Sun Pharma"},
  {"name":"Ina, Rose","dob":"04/04/1981","providerName":"Practo Hospitals"}];

  constructor() { }

  ngOnInit(): void {
  }

}
