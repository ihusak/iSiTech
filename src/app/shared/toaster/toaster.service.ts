import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToasterInterrface {
  show: boolean;
  text: string;
  status: 'error' | 'success',
  delay: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  public toasterProp$: Subject<ToasterInterrface> = new Subject();
  constructor() {}
}
