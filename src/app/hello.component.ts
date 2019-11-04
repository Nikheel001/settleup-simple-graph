import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<h2>Welcome to {{name}}!</h2>`,
  styles: [`h2 { font-family: Lato;
  color: #3333ff;
   }`]
})
export class HelloComponent  {
  @Input() name: string;
}
