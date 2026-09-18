/// <reference types="vitest/globals" />
import 'zone.js';
import 'zone.js/testing';
import 'zone.js/plugins/vitest-patch';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting
} from '@angular/platform-browser/testing';

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting()
);

import './app/app.component.spec';
import './app/definition/definition.component.spec';
import './app/definition/bootcamp.spec';
