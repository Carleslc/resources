# Recursos

_Lista colaborativa de herramientas y servicios para prototipado, diseño, análisis y desarrollo._

### Tabla de contenidos

<!-- MarkdownTOC -->

- [Introducción](#introducción)
- [Añadir recursos](#añadir-recursos)
- [Extensión de Google Chrome](#extensión-de-google-chrome)
- [Script](#script)
  - [Hammerspoon Keybinding (Mac OSX)](#hammerspoon-keybinding-macos)
- [Cómo crear tu propia página de recursos](#cómo-crear-tu-propia-página-de-recursos)
- [Agradecimientos](#agradecimientos)

<!-- MarkdownTOC -->

## Introducción

Esta página web ha sido creada con [Airtable](https://airtable.com/) y [Table2Site](https://table2site.com/) para mantener una lista de herramientas y servicios de utilidad de forma más elegante y práctica que en marcadores del navegador o como notas en otros servicios. Además se puede compartir públicamente y es colaborativa.

## Añadir recursos

Puedes añadir nuevos recursos a la lista usando [este formulario](https://airtable.com/shrnzLIolsKJMD9Ql).

Cuando se necesitan añadir varias páginas web puede resultar cansado rellenar todo el formulario, así que a continuación tienes algunas herramientas que te ofrecen sugerencias y autocompletan parte del formulario para añadir recursos más rápido.

## Extensión de Google Chrome

![En desarrollo](https://img.shields.io/badge/status-in%20development-red.svg)

## Script

Si lo prefieres, puedes utilizar el script [get_info.py](https://raw.githubusercontent.com/Carleslc/resources/master/get_info.py) para obtener información de una página web mediante sus [meta-etiquetas sociales](http://ogp.me/) y autorellenar el formulario.

#### Instalación

1. Instala [Python 3.6 o superior](https://www.python.org/downloads/).
2. Instala las siguientes dependencias:

```
pip3 install pyperclip
pip3 install bs4
pip3 install colorama
pip3 install requests
pip3 install Pillow
```

#### Uso

```
usage: get_info.py [-h] [--display] [--add] [--colorless] url

positional arguments:
  url          website URL

optional arguments:
  -h, --help   show this help message and exit
  --display    set if you want to show website og:image
  --add        open the resource list form to add this website
  --colorless  set for non-color console displays
```

Ejemplo: `python3 get_info.py --add https://github.com`

Este comando mostrará el siguiente resultado por consola y copiará el enlace de la imagen etiquetada como `og:image` si la hubiera o de una vista previa de la página en caso de que no disponga de imagen social. Utiliza la opción adicional `--display` si quieres visualizar la imagen en tu ordenador.

```
https://github.com
GitHub
The world’s leading software development platform · GitHub
Build software better, together
GitHub is where people build software. More than 36 million people use GitHub to discover, fork, and contribute to over 100 million projects.
https://github.githubassets.com/images/modules/open_graph/github-logo.png
Image URL copied to clipboard!
```

También se abrirá el formulario para añadir recursos en el navegador con algunos parámetros rellenados. Puedes utilizar la imagen que se ha copiado como URL en el portapapeles para rellenar el parámetro _Imagen_ del formulario. De esta forma solo tendrás que acabar de rellenar los campos _Modelo_ y _Categorías_.

![Ejemplo de formulario autocompletado](https://i.imgur.com/0kjLPhM.png)

### Hammerspoon Keybinding (macOS)

![En desarrollo](https://img.shields.io/badge/status-in%20development-red.svg)

Si utilizas OS X puedes añadir un atajo de teclado que ejecute el script con un enlace que copies en el portapapeles utilizando [Hammerspoon](http://hammerspoon.org). Instala [Hammerspoon](http://hammerspoon.org) primero si no lo tienes instalado.

Para configurar el atajo de teclado debes descargar [este plugin](https://github.com/Carleslc/Spoons/blob/master/Spoons/Resources.spoon/markdown/Resources.md). Descomprime el fichero `Resources.zip` y haz doble click en `Resources.spoon` para que se mueva al directorio de [Spoons](https://github.com/Hammerspoon/hammerspoon/blob/master/SPOONS.md) de Hammerspoon.

Luego, en el fichero de configuración `~/.hammerspoon/init.lua` copia el siguiente código:

```lua
-- Añade un recurso con la URL que hayas copiado en el portapapeles

hs.loadSpoon("Resources") -- Carga el plugin

spoon.Resources.python = 'python3' -- Comando de python
spoon.Resources.path = '/Users/carleslc/Git/GitHub/resources/get_info.py' -- Cambia el directorio donde se encuentra el script

spoon.Resources:bindHotkeys({ add = {{"ctrl", "alt", "cmd"}, "W"}) -- Atajo de teclado Ctrl + Alt + Cmd + W
```

Haz click en `Reload Config` en el menú de Hammerspoon. Copia una URL y utiliza el atajo de teclado para abrir el formulario con los campos autocompletados.

## Cómo crear tu propia página de recursos

Si quieres crear tu propia página para visualizar solo tus propios recursos, con tu propio formulario, tu propio enlace opcional para que otras personas colaboren y poder personalizar la página sigue los siguientes pasos:

1. Visita [esta base de Airtable](https://airtable.com/shr1jTThqSwdL3ZWN) en la que se almacenan los recursos.
2. Haz click en ![Copy base](https://i.imgur.com/vTfzOJp.png) para duplicar la base de datos en tu cuenta de Airtable. Si no tienes cuenta de Airtable tendrás que crear una. El plan gratuito permite tener hasta 1200 recursos (filas de la tabla).
3. Visita la página [Getting started: Table2Site](https://table2site.com/documentation/getting-started) y sigue los pasos que allí se indican para tener tu propia página gratuita enlazada con la base de Airtable que has copiado en el paso anterior.

## Agradecimientos

El [logo.png](https://github.com/Carleslc/resources/blob/master/ChromeExtension/logo.png) ha sido creado por [Freepik](https://www.freepik.com/ "Freepik") como se puede ver [aquí](https://www.flaticon.com/free-icon/attachment_1717697) y está licenciado por [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/ "Creative Commons BY 3.0").