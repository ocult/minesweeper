import 'zone.js';
import 'zone.js/testing';
import 'zone.js/plugins/vitest-patch';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

import './app/app.component.spec';
import './app/definition/definition.component.spec';
import './app/definition/bootcamp.spec';
