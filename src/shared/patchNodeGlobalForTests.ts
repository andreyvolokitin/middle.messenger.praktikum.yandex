/* eslint-disable import/no-extraneous-dependencies */
import { JSDOM } from 'jsdom';

// https://stackoverflow.com/a/42304473/718630
// type-safe решение не работает
const globalAny: any = global;

const { window } = new JSDOM(
  `<html>
       <body>
       </body>
     </html>`,
  { url: 'http://localhost' }
);

globalAny.window = window;
globalAny.document = window.document;
globalAny.XMLHttpRequest = window.XMLHttpRequest;
globalAny.CustomEvent = window.CustomEvent;

export default globalAny;
