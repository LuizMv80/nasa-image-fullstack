## 📱 NASA IMAGES FRONTEND

Aplicación de prueba realiza con React.js

## 🧰 Pre-requisitos

Para poder iniciar el siguiente proyecto se necesita contar las siguientes instalaciones:

-   **[NodeJS](https://nodejs.org/en/download/) :** Es un entorno en tiempo de ejecución multiplataforma, de código abierto, para la capa del servidor basado en el lenguaje de programación, la versión LTS actual es 20.15.1 _ECMAScript_.


-   **[IDE]:** Se recomienda el uso de [VisualCode](https://code.visualstudio.com/) con la instalación de los siguientes plugins. [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) y [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## ⚙️ Instalación

### 👟 Paso 1

Iniciaremos clonando el repositorio, esto lo podemos hacer se la siguiente manera.

```shell
    git@github.com:LuizMv80/nasa-image-fullstack.git
```

> **🔖 Nota :** Es importante recordar que para clonar el repo se tiene que hacer mediante `SSH`, en caso de no saber cómo se pueden seguir las siguiente guía [Connecting to GitHub with SSH](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh).

### 👟 Paso 2

Procederemos a realizar la instalación de las dependencias que utiliza el proyecto. Entra a la rutaa cd ./nasa-images-frontend y corre el siguiente comando:

```shell
    $ npm install
```

### 👟 Paso 4

Genere un archivo .env.local en donde agregue las siguientes variables de entorno.

```shell
VITE_API_URL=
VITE_NASA_KEY= (Obtenla de la pagina web https://api.nasa.gov)

```
### 👟 Paso 3

Procederemos a ejecutar el siguiente comando:

```shell
    $ npm run dev

```

### 👟 Paso 5

Al levantar el proyecto, podremos ver la `Prueba` en la siguiente `url`, [http://localhost:3000](http://localhost:3000).


## 📱 NASA IMAGES Backend

Aplicación de prueba realiza con Fastapi

## Requisitos previos

Antes de comenzar, asegúrate de tener lo siguiente instalado en tu sistema:

- Python (versión 3.10)
- pip (gestor de paquetes de Python)

## Configuración del entorno virtual (venv)

Se recomienda utilizar un entorno virtual para gestionar las dependencias del proyecto. Sigue estos pasos para configurar el entorno virtual:

1. Abre una terminal y navega hasta la carpeta del proyecto (cd nasa-images-fullstack/nasa-images-backend).
2. Crea un nuevo entorno virtual ejecutando el siguiente comando:
	
	`python -m venv venv` 
	
3. Activa el entorno virtual:

	- En Windows:

	`venv\Scripts\activate`

	- En macOS/Linux:

	`source venv/bin/activate`

4. installa las librerías necesarias para que corra el proyecto

  `pip install requirements.txt`

  5. crea una carpeta llamada static en la raiz del proyecto backend

     `mkdir satatic`
  
6. Configura tu archivo .env con las variables de entorno indicadas en dicho archivo
7. Corre el proyecto
   `uvicorn app:app --reload`

8. Puedes acceder al Swagger para ver la documentación de las APIS [http://localhost:puerto/docs](http://localhost:puerto/docs)
   


