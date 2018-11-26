# picarUI
## API
| Metodo                  | Uso y función                                                                                             |
|-------------------------|-----------------------------------------------------------------------------------------------------------|
| **POST** /sensors/:data | Hacer un pedido POST así `<ip>/sensors/[200,200,200,200,200]`, la variable tiene que estar en ese formato |
| **POST** /speed/:data   | Hacer un pedido POST así `<ip>/speed/200`, la variable tiene que ser un entero                            |
| **GET** /on             | Hacer un pedido GET así `<ip>/on`, esto retorna un buleano si hay que iniciar o terminar el proceso       |