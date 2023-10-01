# Scripts

Este repositorio incluye una serie de scripts que facilitan la interacción con los contratos inteligentes. 

## Script 'crearTraductores'

- Utilizado para crear traductores y asignarles tokens en los contratos 'Traductores' y 'GovernanceToken'.
- Obtiene las instancias de los contratos y las cuentas de usuario.
- Crea traductores y muestra los balances de tokens.
- Muestra la cantidad de traductores y sus ID.

## Script 'mirarToken'

- Permite observar los tokens en posesión de los holders en los contratos 'Traductores' y 'GovernanceToken'.
- Obtiene las instancias de los contratos y las cuentas de usuario.
- Realiza operaciones para obtener información de direcciones, balances y transacciones.
- Muestra información sobre la cantidad de holders y las propuestas realizadas.

## Script 'Probar-traductores'

- Crea y ejecuta una propuesta de modificación de tokens de traductores en los contratos 'GovernorContract' y 'Gestor'.
- Obtiene las instancias de los contratos y las cuentas de usuario.
- Propone una transacción y emite votos a favor.
- Avanza en el tiempo para completar el período de votación.
- Verifica y ejecuta la propuesta si es aprobada.

## Script 'Probar-gobernanza'

- Muestra un listado de todas las propuestas en la DAO.
- Importa los contratos necesarios y obtiene sus instancias.
- Obtiene cuentas de usuario y muestra las direcciones de los contratos.
- Obtiene la longitud del array de propuestas y muestra información detallada de cada propuesta.

## Script 'CrearNFT'

- Crea un NFT y realiza una compra con otra cuenta, mostrando los cambios en los balances.
- Obtiene instancias de los contratos 'NFT' y 'GovernanceToken'.
- Obtiene cuentas de usuario y crea un NFT asignándolo a una cuenta.
- Realiza intercambios de NFT y muestra los balances antes y después de las transacciones.
