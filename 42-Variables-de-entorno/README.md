![image](https://user-images.githubusercontent.com/39509244/135268776-9b756113-497f-43f4-b658-73e350f33854.png)

## Uso
Utilizar los scripts de package json

### Los parametros que se pueden recibir son:
- collection: users o messages
- cmd: create, findall, findbbyid, delete
- ...args: las propiedades del objeto users o messages

### Comando de ejemplo:
$ npm run execute:dev -- --collection=users --cmd=findall
