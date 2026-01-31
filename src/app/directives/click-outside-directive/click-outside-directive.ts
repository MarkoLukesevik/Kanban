import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective {
  constructor(private _elementRef: ElementRef<HTMLElement>) {}

  @Output()
  public appClickOutside: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  @HostListener('document:click', ['$event'])
  public onClick(event: MouseEvent): void {
    const target: EventTarget | null = event.target;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    const clickedInside: boolean = this._elementRef.nativeElement.contains(target);

    if (!clickedInside) {
      this.appClickOutside.emit(event);
    }
  }
}
