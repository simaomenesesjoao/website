import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicNavbarService {
  private _title = signal('');
  private _prev = signal<string[]>([]);
  private _next = signal<string[]>([]);

  readonly title = this._title.asReadonly();
  readonly prev = this._prev.asReadonly();
  readonly next = this._next.asReadonly();

  setTitle(newTitle: string) {
    this._title.set(newTitle);
    this._next.set([]);
    this._prev.set([]);
  }

  setNext(newNext: string[]){
    this._next.set(newNext);
  }

  setPrev(newPrev: string[]){
    this._prev.set(newPrev);
  }
}
