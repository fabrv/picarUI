const game = io()
function socketEvents(){
  console.log('test')
  game.on('sensors', (data)=>{
    console.log(data)
  })

  game.on('speed', (data)=>{
    console.log(data)
  })
}