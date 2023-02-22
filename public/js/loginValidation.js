window.onload = function () {

    alert ("Hola, vamos a validar tus datos para que tu experiencia sea la mejor!")

    let form = document.querySelector(".form-login");


    form.addEventListener("submit", (evento) => {
      if(!validaciones(evento)){
        evento.preventDefault();
    }else{
        form.submit();
    };

    function validaciones (evento){
      let email = document.getElementById("email");
      let password = document.getElementById("password");
      let errores = [];

      //Vamos a validar el formato del email con una expresion regular

      let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      if (email.value == ""){
        errores.push("El campo email no puede estar vacio");
        email.classList.add("is-invalid");
      }else if (!regEmail.test(email.value)){ 
        errores.push('El formato de email es inválido...');
        email.classList.add('is-invalid');       
      }else{
        email.classList.add('is-valid');
        email.classList.remove('is-invalid');
    };

    //Vamos a validar el formato del password con una expresion regular

    /*let regPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    if (!regPassword.test(password.value)){
      errores.push('La contraseña como mínimo debe tener seis caracteres, al menos una letra y un número');
            password.classList.add('is-invalid');
        }else{
            password.classList.add('is-valid');
            password.classList.remove('is-invalid');
        };*/

        if (password.value == "") {
          errores.push("Debes introducir una contraseña");
          password.classList.add("is-invalid");
        } else {
          password.classList.remove("is-invalid");
          password.classList.add("is-valid");
        }

        //Aquí enviamos los errores al usuario

        if (errores.length > 0) { 
          evento.preventDefault();
          let ulErrores = document.querySelector(".errores");
          ulErrores.innerHTML = "";
          ulErrores.classList.add("alert-warning");
          for (let i = 0; i < errores.length; i++) {
            ulErrores.innerHTML += `<li>${errores[i]} </li>`;
          }
        } else {
          //alert("Validaciones exitosas!!!");
          form.submit();
        } 
    }
    });
};
  