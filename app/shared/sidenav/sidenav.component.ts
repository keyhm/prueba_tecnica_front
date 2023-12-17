import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {MediaMatcher} from "@angular/cdk/layout";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

export class SidenavComponent  implements OnDestroy {
  mobileQuery: MediaQueryList;


  fillerNav = [
    {
      name: "Clients",
      route: "client",
      icon: "person"
    },
    {
      name: "Clients look history",
      route:"client-look-history",
      icon: ""
    },
    {
      name: "Emergency PIN configuration",
      route:"emergency-pin-configuration",
      icon: ""
    },
    {
      name: "Emergency PIN history",
      route:"emergency-pin-history",
      icon: ""
    }
  ];

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = true;
}
