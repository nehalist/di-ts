import 'reflect-metadata';
import {Type} from "./Util";

/**
 * The Injector stores services and resolves requested instances.
 */
export const Injector = new class {
  /**
   * Map for all services
   * @type {Map<string, Type<any>>}
   */
  protected services: Map<string, Type<any>> = new Map<string, Type<any>>();

  /**
   * Resolves instances by injecting required services
   * @param {Type<any>} target
   * @returns {T}
   */
  resolve<T>(target: Type<any>): T {
    // tokens are required dependencies, while injections are resolved tokens from the Injector
    let tokens = Reflect.getMetadata('design:paramtypes', target) || [],
      injections = tokens.map(token => Injector.resolve<any>(token));

    return new target(...injections);
  }

  /**
   * Stores a service in the Injector
   * @param {Type<any>} target
   */
  set(target: Type<any>) {
    this.services.set(target.name, target);
  }
};
