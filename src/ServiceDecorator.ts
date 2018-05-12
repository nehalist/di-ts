import {GenericClassDecorator, Type} from "./Util";

/**
 * @returns {GenericClassDecorator<Type<any>>}
 * @constructor
 */
export const Service = () : GenericClassDecorator<Type<any>> => {
  return (target: Type<any>) => {
    // do something with `target`, e.g. some kind of validation or passing it to the Injector and store them
  };
};
