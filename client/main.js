const game = io()
let sensorArray = [0,0,0,0,0]
function socketEvents(){
  console.log('test')
  game.on('sensors', (data)=>{
    console.log(data)
    setChartVals(data)
  })

  game.on('speed', (data)=>{
    console.log(data)
  })
}

function setChartVals(data){
  let sensorsData = document.querySelectorAll('.sensor-data')
  let sensorValue = document.querySelectorAll('.sensor-value')
  let sensorTreshold = document.querySelectorAll('.sensor-threshold')
  for (let i = 0; i < sensorsData.length; i++){
    if (data[i] >= 350){
      sensorTreshold[i].innerHTML = 1
      sensorArray[i] = 1
    }else{
      sensorTreshold[i].innerHTML = 0
      sensorArray[i] = 0
    }
    sensorsData[i].style.height = ((data[i]/600)*100) + '%'
    sensorValue[i].innerHTML = data[i]
  }
}

function setDirection(){
  
}