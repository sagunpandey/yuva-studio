---
title: Your Own Angular 8 Dynamic Modal Library
date: 2019-06-29
category: programmer
excerpt: Build a customizable Angular 8 dynamic modal library using dynamic component loading and Bootstrap modal APIs.
author: Sagun Pandey
tags: angular, javascript, typescript, dynamic-components
---

# Your Own Angular 8 Dynamic Modal Library

![Angular 8 dynamic modal](/assets/blogs/programmer/images/angular-8-dynamic-modal.jpeg)

Who does not need a modal that supports dynamic components? There are many third-party libraries, but customization and data sharing between modal and base components can get limiting.

This post walks through building a custom dynamic modal solution using Angular dynamic components and Bootstrap modal.

## Modal Component

```typescript
import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { IDynamicModalContent } from './dynamic-modal-content';

declare var $: any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, AfterViewInit {
  header: string;
  modalId: string;
  component: any;
  modalElement: any;
  submitCallback: (arg: any) => void;

  @ViewChild('modalContent', { static: true, read: ViewContainerRef })
  viewContainerRef: ViewContainerRef;

  componentRef: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.component);
    this.componentRef = this.viewContainerRef.createComponent(componentFactory);
  }

  ngAfterViewInit(): void {
    this.modalElement = $('#' + this.modalId);
    this.modalElement.modal('show');
  }

  onSubmit(): void {
    (this.componentRef.instance as IDynamicModalContent).submit(this.submitCallback);
    this.modalElement.modal('hide');
  }
}
```

The modal creates a dynamic component and injects it into `#modalContent`.

## Modal Template

```html
<div id="{{modalId}}" class="modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div *ngIf="header" class="modal-header">
        <h5>{{header}}</h5>
      </div>
      <div class="modal-body">
        <div #modalContent></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" (click)="onSubmit()" class="btn btn-primary">OK</button>
      </div>
    </div>
  </div>
</div>
```

## Dynamic Content Interface

```typescript
export interface IDynamicModalContent {
  submit(callback: (arg: any) => void): void;
}
```

All injected content components implement this interface, so submit events/data flow back to the caller consistently.

## Modal Service

```typescript
import { ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { ModalComponent } from './modal.component';

@Injectable({ providedIn: 'root' })
export class ModalService {
  viewRefs = new Map<ViewContainerRef, ComponentRef<ModalComponent>>();

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  createModal(id: string, header: string, viewContainerRef: ViewContainerRef, component, submitCallback: (arg: any) => void) {
    if (this.viewRefs.has(viewContainerRef)) {
      viewContainerRef.clear();
      this.viewRefs.delete(viewContainerRef);
    }

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
    const componentRef = viewContainerRef.createComponent(componentFactory);

    (componentRef.instance as ModalComponent).modalId = id;
    (componentRef.instance as ModalComponent).header = header;
    (componentRef.instance as ModalComponent).component = component;
    (componentRef.instance as ModalComponent).submitCallback = submitCallback;

    this.viewRefs.set(viewContainerRef, componentRef);
  }
}
```

## Wrap in a Reusable Module

```typescript
import { ModalService } from './modal.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ModalComponent],
  exports: [ModalComponent]
})
export class CustomModalModule {
  static forRoot() {
    return {
      ngModule: CustomModalModule,
      providers: [ModalService]
    };
  }
}
```

## Source Code

- https://github.com/sagunpandey/angular-dynamic-modal

