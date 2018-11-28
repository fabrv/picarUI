const app = io()
let sensorArray = [0,0,0,0,0]
let laps = 0
let lastPoint = [0,200]
let lastAngle = 0
let radius = 3
let threshold = 400
let readings = 4
let n = 0
let pPoint = [0,200]
let lastSensor = []

let maxLaps = 100
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
    if (data[i] > threshold){
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
  const c = document.getElementById('car-map')
  const ctx = c.getContext('2d')
  ctx.moveTo(lastPoint[0],lastPoint[1])
  console.log(sensorArray)
  if(sensorArray[0] == 0 && sensorArray[1] == 1){
    document.getElementById('direction-arrow').style.transform = 'rotate(-45deg)'
    lastAngle -= (1/108)*Math.PI
  }else if(sensorArray[4] == 0 && sensorArray[3] == 1){
    document.getElementById('direction-arrow').style.transform = 'rotate(45deg)'
    lastAngle += (1/108)*Math.PI
  }else if(sensorArray[0] == 0 && sensorArray[1] == 0){
    document.getElementById('direction-arrow').style.transform = 'rotate(-30deg)'
    lastAngle -= (1/216)*Math.PI
  }else if(sensorArray[3] == 0 && sensorArray[4] == 0){
    document.getElementById('direction-arrow').style.transform = 'rotate(30deg)'
    lastAngle += (1/216)*Math.PI
  }else if(sensorArray[1] == 0 && sensorArray[0] == 1 && sensorArray[2] == 1){
    document.getElementById('direction-arrow').style.transform = 'rotate(-20deg)'
    lastAngle -= (1/324)*Math.PI
  }else if(sensorArray[3] == 0 && sensorArray[2] == 1 && sensorArray[4] == 1){
    document.getElementById('direction-arrow').style.transform = 'rotate(20deg)'
    lastAngle += (1/324)*Math.PI
  }else if(sensorArray[1] == 0 && sensorArray[2] == 0){
    document.getElementById('direction-arrow').style.transform = 'rotate(-3deg)'
    lastAngle -= (1/2160)*Math.PI
  }else if(sensorArray[2] == 0 && sensorArray[3] == 0){
    document.getElementById('direction-arrow').style.transform = 'rotate(3deg)'
    lastAngle += (1/2160)*Math.PI
  }else if(sensorArray[2] == 0 && sensorArray[1] == 1 && sensorArray[3] == 1){
    document.getElementById('direction-arrow').style.transform = 'rotate(0deg)'
    lastAngle = lastAngle
  }
  if (n%readings == 0){
    lastPoint[0] += radius*Math.cos(lastAngle)
    lastPoint[1] += radius*Math.sin(lastAngle)
    ctx.lineTo(lastPoint[0], lastPoint[1])
    ctx.stroke()
  }

  n += 1
}

function readLap(){
  console.log('lastSensor', lastSensor);
  console.log('thisSensor', sensorArray)
  if (lastSensor[4] == 0 && sensorArray[4] == 1 && lastSensor[0] == 0 && sensorArray[0] == 1 && lastSensor[1] == 1 && lastSensor[2] == 1 && lastSensor[3] == 1){
    laps+=1
    console.log(`Nueva vuelta: ${laps}`)
    document.getElementById('lap-count').innerHTML = laps
    if (laps > maxLaps){
      onOff({checked: false})
    }
  }
  lastSensor = JSON.parse(JSON.stringify(sensorArray.valueOf()))
}
function changeMaxLap(obj){
  maxLaps = obj.value
}

function onOff(cb){
  console.log(cb.checked)
  app.emit('run-state', cb.checked)
}


function clearCanvas(){
  const c = document.getElementById('car-map')
  const context = c.getContext('2d')
  context.save();
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, c.width, c.height);
  context.restore();
}

function getRelativeCoords(event) {
  pPoint[0] = event.offsetX;
  pPoint[1] = event.offsetY;
  document.getElementById('init-pos').innerHTML = `(${pPoint[0]},${pPoint[1]})`
  console.log({ x: event.offsetX, y: event.offsetY });
}

function setLastPos(){
  lastPoint = pPoint.valueOf()
}