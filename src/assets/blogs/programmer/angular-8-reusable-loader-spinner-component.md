---
title: Angular 8 Reusable Loader/Spinner Component
date: 2019-07-03
category: programmer
excerpt: Create a reusable Angular 8 loader/spinner that overlays any host element using a structural directive and dynamic component rendering.
author: Sagun Pandey
tags: angular, javascript, typescript, loader, spinner
---

# Angular 8 Reusable Loader/Spinner Component

![Angular reusable loader spinner](/assets/blogs/programmer/images/angular-8-reusable-loader-spinner.jpeg)

A good UI always acknowledges user actions. A reusable spinner overlay helps indicate in-progress operations clearly.

This implementation uses:
- CSS spinner animations from `load-awesome`
- a dedicated `SpinnerComponent`
- a structural directive that injects the spinner dynamically

## Install load-awesome

```bash
npm install load-awesome --save
```

Add spinner CSS in `angular.json`:

```json
"styles": [
  "node_modules/load-awesome/css/line-spin-fade-rotating.css",
  "src/styles.scss"
]
```

## Spinner Component

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  message: string;
  ngOnInit() {}
}
```

Template:

```html
<div class="spinner-container">
  <div class="spinner-content">
    <div class="spinner-icon-container">
      <div class="la-line-spin-fade-rotating la-2x spinner-icon">
        <div></div><div></div><div></div><div></div>
        <div></div><div></div><div></div><div></div>
      </div>
    </div>
    <div *ngIf="message" class="spinner-message">{{message}}</div>
  </div>
</div>
```

Styles:

```css
.spinner-container {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, .8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.spinner-icon-container {
  display: flex;
  justify-content: center;
}

.spinner-message {
  margin-top: 10px;
  color: white;
  font-size: 14px;
  font-weight: bold;
}
```

## Structural Directive

```typescript
import {
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  HostListener,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { SpinnerComponent } from '../components/spinner/spinner.component';

@Directive({ selector: '[appSpinner]' })
export class AppSpinnerDirective implements OnInit {
  private message: string;

  @Input('appSpinner')
  set showSpinner(spinning: boolean) {
    this.container.clear();

    if (spinning) {
      this.container.createEmbeddedView(this.template);
      this.spinnerComponent = this.container.createComponent(this.componentFactory);
      this.spinnerComponent.instance.message = this.message;
    } else {
      this.container.createEmbeddedView(this.template);
    }
  }

  @Input('appSpinnerMessage')
  set spinnerMessage(message: string) {
    this.message = message;
  }

  componentFactory: ComponentFactory<SpinnerComponent>;
  spinnerComponent: ComponentRef<SpinnerComponent>;

  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<any>,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(SpinnerComponent);
  }

  ngOnInit(): void {}

  @HostListener('click', ['$event'])
  onClick(event: any): void {
    event.stopPropagation();
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: any): void {
    event.stopPropagation();
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: any): void {
    event.stopPropagation();
  }
}
```

## Module Setup

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AppSpinnerDirective } from './directives/app-spinner.directive';

@NgModule({
  declarations: [AppComponent, SpinnerComponent, AppSpinnerDirective],
  imports: [BrowserModule],
  providers: [],
  entryComponents: [SpinnerComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

## Usage

```html
<div *appSpinner="isLoading; message: 'Division is Loading'">
  Some Content
</div>
```

## Source Code

- https://github.com/sagunpandey/angular-loader-component

