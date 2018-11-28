const app = io()
let sensorArray = [0,0,0,0,0]
let laps = 0
let lastPoint = [100,100]
let lastAngle = 0
let radius = 1
function socketEvents(){
  console.log('test')
  /*app.on('sensors', (data)=>{
    console.log(data)
    setChartVals(data)
    setDirection()
  })

  app.on('speed', (data)=>{
    console.log(data)
    document.getEleme0ntById('speed').innerHTML = data
  })*/

  app.on('data', (data)=>{
    console.log(data)
    setChartVals(data.sensors)
    setDirection()
    readLap()
    document.getElementById('speed').innerHTML = `${data.speed} cm/s`
  })
}

function setChartVals(data){
  let sensorsData = document.querySelectorAll('.sensor-data')
  let sensorValue = document.querySelectorAll('.sensor-value')
  let sensorTreshold = document.querySelectorAll('.sensor-threshold')
  for (let i = 0; i < sensorsData.length; i++){
    if (data[i] >= 350){
      sensorTreshold[i].innerHTML = 0
      sensorArray[i] = 1
    }else{
      sensorTreshold[i].innerHTML = 1
      sensorArray[i] = 0
    }
    sensorsData[i].style.height = ((data[i]/600)*100) + '%'
    sensorValue[i].innerHTML = data[i]
  }
}

function setDirection(){
  let c = document.getElementById('car-map')
  let ctx = c.getContext('2d')
  ctx.moveTo(lastPoint[0],lastPoint[1])
  console.log(sensorArray)
  if(sensorArray[0] == 0 && sensorArray[1] == 1){
    document.getElementById('direction-arrow').style.transform = 'rotate(-45deg)'
    lastAngle -= (1/4)*Math.PI
  }else if(sensorArray[4] == 0 && sensorArray[3] == 1){
    document.getElementById('direction-arrow').style.transform = 'rotate(45deg)'
    lastAngle += (1/4)*Math.PI
  }else if(sensorArray[0] == 0 && sensorArray[1] == 0){
    document.getElementById('direction-arrow').style.transform = 'rotate(-30deg)'
    lastAngle -= (1/6)*Math.PI
  }else if(sensorArray[3] == 0 && sensorArray[4] == 0){
    document.getElementById('direction-arrow').style.transform = 'rotate(30deg)'
    lastAngle += (1/6)*Math.PI
  }else if(sensorArray[1] == 0 && sensorArray[0] == 1 && sensorArray[2] == 1){
    document.getElementById('direction-arrow').style.transform = 'rotate(-20deg)'
    lastAngle -= (1/9)*Math.PI
  }else if(sensorArray[3] == 0 && sensorArray[2] == 1 && sensorArray[4] == 1){
    document.getElementById('direction-arrow').style.transform = 'rotate(20deg)'
    lastAngle += (1/9)*Math.PI
  }else if(sensorArray[1] == 0 && sensorArray[2] == 0){
    document.getElementById('direction-arrow').style.transform = 'rotate(-3deg)'
    lastAngle -= (1/60)*Math.PI
  }else if(sensorArray[2] == 0 && sensorArray[3] == 0){
    document.getElementById('direction-arrow').style.transform = 'rotate(3deg)'
    lastAngle += (1/60)*Math.PI
  }else if(sensorArray[2] == 0 && sensorArray[1] == 1 && sensorArray[3] == 1){
    document.getElementById('direction-arrow').style.transform = 'rotate(0deg)'
    lastAngle = lastAngle
  }
  lastPoint[0] += Math.floor(radius*Math.cos(lastAngle))
  lastPoint[1] += Math.floor(radius*Math.sin(lastAngle))
  ctx.lineTo(lastPoint[0], lastPoint[1])
  ctx.stroke()
}

function readLap(){
  if (sensorArray[4] == 1 && sensorArray[0] == 1 && sensorArray[1] == 0 && sensorArray[2] == 0 && sensorArray[3] == 0){
    laps+=1
    document.getElementById('lap-count').innerHTML = laps
  }
}

function onOff(cb){
  console.log(cb.checked)
  app.emit('run-state', cb.checked)
}