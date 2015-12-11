/// <reference path="typings/angular2.d.ts" />
/// <reference path="typings/meteor/meteor.d.ts" />

'use strict';

import {TypeDecorator} from 'angular2/core';

import {makeDecorator} from 'angular2/decorators';

import {CanActivate, ComponentInstruction} from 'angular2/router';

class InjectUserAnnotation {
  constructor(public propName: string = 'user') {}
}

export function InjectUser(propName: string): (cls: any) => any {
  var annInstance = new InjectUserAnnotation(propName);
  var TypeDecorator: TypeDecorator = <TypeDecorator>function TypeDecorator(cls) {
    var propName = annInstance.propName;
    var fieldName = `_${propName}`;
    var injected = `${fieldName}Injected`;
    Object.defineProperty(cls.prototype, propName, {
      get: function() {
        if (!this[injected]) {
          this[fieldName] = Meteor.user();
          if (this.autorun) {
            Meteor.setTimeout(() => {
              this.autorun(() => {
                this[fieldName] = Meteor.user();
              }, true)
            }, 0);
          }
          this[injected] = true;
        }
        return this[fieldName];
      },
      enumerable: true,
      configurable: false
    });
    return cls;
  };
  return TypeDecorator;
};

class RequireUserAnnotation {
  canProceed(prev: ComponentInstruction,
             next: ComponentInstruction) {
    return !!Meteor.user();
  }
}

export const RequireUser = makeDecorator(RequireUserAnnotation);
