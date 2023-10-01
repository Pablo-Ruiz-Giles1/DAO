# Contratos Inteligentes

Este repositorio contiene el código fuente de seis contratos inteligentes desarrollados para la DAO (Organización Autónoma Descentralizada).

## Contrato Inteligente 'GovernanceToken'

- Implementa un token de gobernanza utilizando ERC20Votes de OpenZeppelin.
- Permite la creación, quema y administración de tokens.
- Requiere roles de propietario o NFT para ciertas funciones.
- Emite eventos para rastrear las operaciones de tokens.

## Contrato Inteligente 'Traductores'

- Administra traductores y compañías en un sistema.
- Permite la creación y gestión de traductores y compañías.
- Puede ajustar los valores de tokens y transferir tokens entre compañías.

## Contrato Inteligente 'Gestor'

- Interactúa con el contrato 'Traductores' para modificar los valores de tokens.
- Puede minar o quemar tokens para traductores.
- Propiedad del administrador y permite ajustes de tokens.

## Contrato Inteligente 'NFTContract'

- Implementa un contrato ERC-721 para NFTs.
- Permite la creación de NFTs con metadatos asociados.
- Los usuarios pueden intercambiar NFTs y recuperarlos si una empresa es eliminada.

## Contrato Inteligente 'GovernorContract'

- Implementa un sistema de gobernanza para proponer y votar en propuestas.
- Utiliza extensiones de OpenZeppelin para gestionar el proceso de votación.
- Permite a los usuarios proponer acciones ejecutables y votar en propuestas.

## Contrato Inteligente 'TimeLock'

- Implementa un controlador de Timelock basado en 'TimelockController' de OpenZeppelin.
- Programa transacciones para ejecutarse después de un tiempo.
- Define quiénes pueden proponer y ejecutar transacciones.
