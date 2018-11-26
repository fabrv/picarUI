import { createServer, Server } from 'http'
import express from 'express'
import cors from 'cors'
import * as path from 'path'

import chalk from 'chalk';


class App{  
  public server: Server
  public app: express.Application
  constructor () {
    // App Express
    this.app = express()
    // Carga los archivos estaticos del directorio 'client'
    this.app.use(express.static(path.resolve(__dirname, '../client')))
    // Mount extra routes
    this.mountRoutes()
    // Http Server
    this.server = createServer(this.app)
  }


  private mountRoutes(): void {
    const router: any = express.Router()

    // CORS module to allow cross origin resource sharing
    router.use(cors())

    router.post('/sensors/:data', (req: express.Request, res: express.Response) => {
      console.log(chalk.cyan(`Mapa sensonres ${req.params.data}`))
      res.status(200).send({'status': 200, 'data': req.params.data})
    })

    router.post('/speed/:speed', (req: express.Request, res: express.Response) => {
      console.log(chalk.cyan(`Velocidad del carro ${req.params.speed}`))
      res.status(200).send({'status': 200, 'data': req.params.speed})
    })

    // Set router location
    this.app.use('/', router)
  }
}

//Exportar app
export default new App()