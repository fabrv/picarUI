import app from './App'
import chalk from 'chalk';
import fs from 'fs'

let t = 0
let s = 0
const port: any = process.env.PORT || 3000

app.server.listen(port, '0.0.0.0', (err: any) => {
  if (err){
    console.log(err)
  }
  console.log(`Servidor está en puerto ${port}`)

  app.io.on('connect', (socket: SocketIO.Socket) => {
    socket.on('run-state', (data)=>{
      let i = data ? 1 : 0;
      s = data ? 1 : 0;
      fs.writeFile('../init.yml',`s: ${s} \n t: ${t}`,()=>{
        // throws an error, you could also catch it here
        if (err) throw err;

        // success case, the file was saved
        console.log('INIT YML guardado');
      })
      app.on = data
      console.log(chalk.red(`Iniciando/apagando piCAR-S, ${data}`))
    })
    socket.on('turbo-state', (data)=>{
      let i = data ? 1 : 0;
      t = data ? 1 : 0;
      fs.writeFile('../init.yml',`s: ${s} \n t: ${t}`,()=>{
        // throws an error, you could also catch it here
        if (err) throw err;

        // success case, the file was saved
        console.log('INIT YML guardado');
      })
      app.on = data
      console.log(chalk.red(`Iniciando/terminando TURBO, ${data}`))
    })
  })
})