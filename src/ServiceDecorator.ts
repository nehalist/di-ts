import {GenericClassDecorator, Type} from "./Util";
import {Injector} from "./Injector";

/**
 * Classes decorated with the `@Service` decorator are stored within the injector and can be resolved by it.
 * @returns {GenericClassDecorator<Type<any>>}
 * @constructor
 */
export const Service = () : GenericClassDecorator<Type<any>> => {
  return (target: Type<any>) => {
    Injector.set(target);
  };
};
