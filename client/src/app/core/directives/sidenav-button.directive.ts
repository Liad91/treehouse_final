import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[vnSidenavButton]'
})
export class SidenavButtonDirective implements AfterViewInit, OnDestroy {
  @Input() sidenav: string;
  private $button: JQuery;

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private zone: NgZone) { }

  ngAfterViewInit(): void {
    this.setAttribute();
    this.zone.runOutsideAngular(() => this.initialize());
  }

  private initialize(): void {
    this.$button = $(this.elementRef.nativeElement);
    this.$button.sideNav({
      edge: 'left',
      menuWidth: 350,
      draggable: true,
      closeOnClick: true
    });
  }

  private setAttribute(): void {
    this.renderer.setAttribute(this.elementRef.nativeElement, 'data-activates', this.sidenav);
  }

  public hide(): void {
    this.$button.sideNav('hide');
  }

  public show(): void {
    this.$button.sideNav('show');
  }

  ngOnDestroy(): void {
    this.$button.sideNav('destroy');
  }
}
