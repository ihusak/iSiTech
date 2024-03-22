import { Component, OnInit } from '@angular/core';
import { ToasterInterrface, ToasterService } from './toaster.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss'
})
export class ToasterComponent implements OnInit {
  public toasterProp: ToasterInterrface;
  constructor(private toasterService: ToasterService){}
  ngOnInit(): void {
    this.toasterService.toasterProp$.subscribe((props: ToasterInterrface) => {
      this.toasterProp = props;
      setTimeout(() => {
        this.toasterProp.show = false;
      }, props.delay)
    })
  }
}
