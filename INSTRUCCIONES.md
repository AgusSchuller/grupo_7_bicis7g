--GIT--

--Comandos básicos--

1) git --version (enter) ó git -v (enter)
-> me devuelve la version de git que estoy usando.

2) git init (enter)
-> crea un repositorio git vacio ó reinicia uno existente que se haya cerrado.

3) git config user.name "nombre de usuario GitHub" (enter)
-> configura mi nombre de usuario de github para el repositorio vacio que cree anteriormente.

4) git config user.email "dirección de correo GitHub" (enter)
-> configura mi email con el que tengo creada la cuenta en github con el repositorio que cree anteriormente.

5) git config -- global user.name "nombre de usuario GitHub" (enter)
-> configura mi nombre de usuario de github para todos los proyectos que tenga en mi computadora.

6) git config --global user.email "dirección de correo GitHub" (enter)
-> configura mi email con el que tengo creada la cuenta en github con todos los proyectos que tenga en mi computadora.

7) git remote add origin https://github.com/mi-usuario/nombre-repositorio-en-github.git
-> conecta mi repositorio local (el que está en mi computadora) con el respositorio de GitHub (el que esta en la nube). Para hacer esto, tenes que tener un repositorio creado en GitHub y copiar el URL de ese repositorio y esa URL es la que se pega después del "add origin".

8) git remote -v (enter)
-> te va a mostar origin y la URL del respositorio en GitHub. Esto solo sirve para chequear que estas bien conectado con el respositorio de GitHub.

9) git add "nombre del archivo" (enter)
-> agrega al repositorio local el archivo que queremos agregar que esta en la carpeta en la cual estamos trabajando. OJO, solo agrega ese archivo.

10) git add . (enter)
-> agrega todos los archivos de la carpeta en la que estamos trabajando al repositorio.

11) git status (enter)
-> te da el estatus del repositorio local. En el vas a ver si hay archivos modificados agregados o no al repositorio y si los mismos estan comentados (commit) o no. Tambien te va a decir si estas al dia o no con los archivos que tenes en el repositorio local y los que estan en GitHub.

12) git commit -m "mensaje que enviamos para comentar que le hicimos al repositorio" (enter)
-> crea nuevo punto de referencia en la linea del tiempo del o los archivos que acabamos de hacer "add". Es importante hacer el commit para que el archivo tenga punto de modificaciones en la linea de tiempo.

13) git log (enter)
-> te muestra el historia del commits que se hayan hecho al respositorio.

14) git push origin master (enter)
-> envio todos mis archivos de mi repositorio local a GitHub. ¿A donde los manda? Los manda a la rama "master". Si yo en vez de poner "master" pongo "dev" o cualquier nombre de rama que tenga creado en mi repositorio de GitHub me lo mandará todo para esa rama.

15) git clone https://github.com/usuario/repositorio.git (enter)
-> descarga el repositorio remoto, el que esta en Github, en mi computadora. Se realiza una sola vez, para descargar el repositorio.

16) git pull origin master
-> actualiza los archivos del repositorio remoto, el que esta e GitHub, al repositorio local, el que está en nuestra computadora. Si quiseria hacer un "pull" de otra rama del repositorio remoto debo cambiar "master" por el nombre de la rama de la cual quiero actualizar los archivos.

17) 

--Reglas de convivencia--

-Cada vez que empezamos a trabajar en el proyecto debemos hacer un pull, asi actualizamos y trabajamos con los últimos archivos actualizados.
-Ese pull que vamos hacer día a día los vamos a realizar desde la rama "dev".
-Cada miembro trabjará en su propia rama actualizada diariamente de "dev".
-Cada vez que se acumule una cantidad significativa, o se haga un cambio en algun archivo que sea de uso multiple, vamos a avisar y hacer un push directamente a la rama "dev". 
-Realizado e informado al grupo ese push a rama "dev", cada uno a hacer un pull de "dev" para asegurarse de vuelta de estar en la última versión.
-Todos los archivos actualizados en repositorios locales deben ser actualizados a su vez en el repositorio remoto en la rama asiganada a cada uno.
-Siempre que vayamos hacer algún cambio en "dev" debemos avisar al grupo.
-La rama "master" va a ser nuestra rama maestra que se va a ir actualizando una vez que comprobemos que todo lo que esta en "dev" esta funcionando bien. 
-Esa actualización se realizará solo por un miembro del equipo, el cual informará día y hora de dicha actualización. 
-Una vez realizada la actualización de master, cada miembro volverá hacer un pull origin master para tener la ultima versión actualizada.
-Cualquier duda o comentario se deberá realizar antes de hacer cambios. Si no se está seguro de algo, se conversa por Whatsapp y los resolvemos en equipo.
