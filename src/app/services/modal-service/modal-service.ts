import { ApplicationRef, ComponentRef, createComponent, Injectable, Type } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalRef: ComponentRef<any> | null = null;
  private modalClose = new Subject<any>();

  constructor(private appRef: ApplicationRef) {}

  public open<T>(component: Type<T>, data?: any): Observable<any> {
    if (this.modalRef) return this.modalClose.asObservable();

    this.modalRef = createComponent(component, {
      environmentInjector: this.appRef.injector,
    });

    if (data) Object.assign(this.modalRef.instance, data);

    this.appRef.attachView(this.modalRef.hostView);
    document.body.appendChild(this.modalRef.location.nativeElement);

    return this.modalClose.asObservable();
  }

  public close(result?: any): void {
    if (!this.modalRef) return;

    this.modalClose.next(result);
    this.appRef.detachView(this.modalRef.hostView);
    this.modalRef.destroy();
    this.modalRef = null;
  }
}
