# Colony Starter Kit

Este repositorio es un kit de inicio para desarrollar aplicaciones descentralizadas (Dapps) utilizando la plataforma Colony. La plataforma Colony permite crear organizaciones autónomas descentralizadas (DAO) con capacidades de gestión y gobernanza.

## Instrucciones de Uso

1. Clona este repositorio a tu máquina local:

```bash
git clone https://github.com/YOURUSERNAME/colonyStarter
```
Dentro del repositorio, realiza las siguientes acciones:
```
nvm install # O, si ya tienes la versión instalada
nvm use
npm install
```
Para ejecutar el código de la plantilla en el navegador:
```
npm start
```

## Personalización del Proyecto

Se realizó una modificación en uno de los scripts para visualizar los tokens de una DAO personalizada. Abre el archivo index.js y reemplaza la línea de conexión con 'MetaColony' con la siguiente línea:
```
const metaColony = await colonyNetwork.getColony('0x84CfE356F9DcB9bA0D58778a993F436B5eA3aB67');
```

Esta modificación permite conectar con la DAO a través de su dirección. Luego, ajusta la línea que muestra la información de la siguiente manera:

```
document.querySelector('#funding').innerHTML = `Tradutores Colony native token balance is ${formatUnits(funding)} TDAO`;
```

El script modificado se utiliza para mostrar los datos de la DAO personalizada.

You can find more information here [here](https://colony.gitbook.io/colony-sdk/quickstart)

# Contribute

_Are you interested in contributing?_ Check out the following document for more information:

- [Contributing](CONTRIBUTING.md)

# LICENSE

GPL-3.0-only (see [LICENSE](LICENSE))" para añadir la siguiente info
