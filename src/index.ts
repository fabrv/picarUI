import app from './App'

const port: any = process.env.PORT || 80

app.server.listen(port, '0.0.0.0', (err: any) => {
  if (err){
    console.log(err)
  }
  console.log(`Servidor está en puerto ${port}`)

})