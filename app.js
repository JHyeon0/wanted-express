import express from 'express';
import { generalErrorHandler } from './utils/error'

class App {
  #PORT
  #app

  constructor({ PORT, scaffoldingMiddlewares, controllers }) {
    this.#app = express();
    this.#PORT = PORT;
    if(!this.#PORT) throw Error('INVALID PORT');

    this.#applyScaffoldingMiddlewares(scaffoldingMiddlewares);

    this.#applyRouters(controllers);

    this.#app.use(generalErrorHandler);
  }

  #applyRouters(controllers) {
    controllers.forEach(controller => {
      this.#app.use(controller.path, controller.router);
    })
  }

  #applyScaffoldingMiddlewares(middlewares) {
    middlewares.forEach(middleware => {
      this.#app.use(middleware);
    })
  }

  listen() {
    this.#app.listen(this.#PORT, () => {
      console.log(`Server is listening on ${this.#PORT}`);
    })
  }
}

export default App