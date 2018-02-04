import {Service} from "../src/ServiceDecorator";
import {Injector} from "../src/Injector";

@Service()
class Foo {
  doFooStuff() {
    console.log('foo');
  }
}

@Service()
class Bar {
  constructor(public foo: Foo) {
  }

  doBarStuff() {
    console.log('bar');
  }
}

@Service()
class Foobar {
  constructor(public foo: Foo, public bar: Bar) {
  }
}

const foobar = Injector.resolve<Foobar>(Foobar);
foobar.bar.doBarStuff();
foobar.foo.doFooStuff();
foobar.bar.foo.doFooStuff();

//
// A more "real world" example
//

@Service()
class DatabaseHandler {
  insert(table: string, data: { [column: string]: string|number }) {
    console.log(`writing to ${table}:`);
    console.log(data)
  }
}

@Service()
class Logger {
  constructor(protected dbHandler: DatabaseHandler) {
  }

  info(message: string) {
    this.dbHandler.insert('log', {
      level: 200,
      message: message
    });
  }
}

//  Classes without decorators do NOT emit metadata, hence we need to decorate the controller class.
const Controller = () : ClassDecorator => {
  return target => {
    // maybe do something with controller here
  };
};

@Controller()
class UserController {
  constructor(protected logger: Logger) {
  }

  editUser(userId: number) {
    // edit user ...
    this.logger.info(`User ${userId} has been edited`);
  }
}

const userControllerInstance = Injector.resolve<UserController>(UserController);
userControllerInstance.editUser(3);
