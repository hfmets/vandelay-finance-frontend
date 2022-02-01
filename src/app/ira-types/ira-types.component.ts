import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: string;
  weight: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 'Key Tax Benefits',
    name: 'Contributions are generally made with after-tax money, but may be tax-deductible if you meet income eligibility.1 Any potential earnings grow tax-deferred, and are not taxed until you withdraw them after age 59½.',
    weight: `Contributions are made with after-tax money and any potential earnings grow tax-free. Additionally, you're able to withdraw your contributions tax-free and penalty-free at any time, for any reason. Earnings can be withdrawn without taxes or penalties as long as they are eligible. (See information on withdrawals below.)`,
  },
  {
    position: 'Income Requirements',
    name: 'Anyone 18 or over with earned income can contribute to a traditional IRA. However, there are specific income limits for how much might be tax-deductible.',
    weight: `There are specific IRS income limits for contributions to a Roth IRA. For example, in 2021, the upper limits are:
  $125,000 for single
  $198,000 for married filing jointly`,
  },
  {
    position: 'Withdawls',
    name: 'You will pay taxes on your earnings and contributions when you make withdrawals.',
    weight: `Earnings from a Roth IRA can be withdrawn federally tax-free and penalty-free provided that it's been 5 years since your first contribution.`,
  },
  {
    position: 'Early Withdrawl Penalties',
    name: 'If you make withdrawals before you are 59½, you might have to pay taxes on your earnings, plus an additional 10% tax.',
    weight:
      'If you make withdrawals before you are 59½, you might have to pay taxes on your earnings, plus an additional 10% tax.',
  },
];

@Component({
  selector: 'app-ira-types',
  templateUrl: './ira-types.component.html',
  styleUrls: ['./ira-types.component.css'],
})
export class IraTypesComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight'];
  dataSource = ELEMENT_DATA;

  constructor() {}

  ngOnInit(): void {}
}
