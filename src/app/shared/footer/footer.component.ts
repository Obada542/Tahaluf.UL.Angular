import { Component, OnInit } from '@angular/core';
import { WebsitePartsService } from 'src/app/Services/website-parts.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public website:WebsitePartsService) { }

  ngOnInit(): void {
    jarallax(document.querySelectorAll('.jarallax'), {
      speed: 0.4
    });
    this.website.getAbout();
    this.website.getContact();
    this.website.updateFooter
  }
  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
