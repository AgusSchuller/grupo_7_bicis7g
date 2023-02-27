window.onload = function () {
  alert(
    "Hola, vamos a validar tus datos para que tu experiencia sea la mejor!"
  );

  let form = document.querySelector(".form-register");

  form.addEventListener("submit", (evento) => {
    if (!validaciones(evento)) {
      evento.preventDefault();
    } else {
      form.submit();
    }

    function validaciones(evento) {
      let name = document.getElementById("name");
      let lastName = document.getElementById("lastName");
      let email = document.getElementById("email");
      let password = document.getElementById("password");
      let confirmPassword = document.getElementById("confirm_password");
      let imagen = document.getElementById("imageusers");
      let errores = [];

      //Validamos nombre:

      let regName = /^[a-z ,.'-]{2,}$/i;

      if (name.value == "") {
        errores.push("El campo nombre no puede estar vacio");
        name.classList.add("is-invalid");
      } else if (!regName.test(name.value)) {
        errores.push(
          "El formato de nombre debe tener mínimo 2 caracteres y sin números"
        );
        name.classList.add("is-invalid");
      } else {
        name.classList.add("is-valid");
        name.classList.remove("is-invalid");
      }

      //Validamos apellido:

      let regLastName = /^[a-z ,.'-]{2,}$/i;

      if (lastName.value == "") {
        errores.push("El campo apellido no puede estar vacio");
        lastName.classList.add("is-invalid");
      } else if (!regName.test(lastName.value)) {
        errores.push(
          "El formato de apellido debe tener mínimo 2 caracteres y sin números"
        );
        lastName.classList.add("is-invalid");
      } else {
        lastName.classList.add("is-valid");
        lastName.classList.remove("is-invalid");
      }

      //Validamos email:

      let regEmail =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (email.value == "") {
        errores.push("El campo email no puede estar vacio");
        email.classList.add("is-invalid");
      } else if (!regEmail.test(email.value)) {
        errores.push("El formato de email es inválido...");
        email.classList.add("is-invalid");
      } else {
        email.classList.add("is-valid");
        email.classList.remove("is-invalid");
      }

      //Validamos password:

      let regPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

      if (password.value == "") {
        errores.push("Debes introducir una contraseña");
        password.classList.add("is-invalid");
      } else if (!regPassword.test(password.value)) {
        errores.push(
          "La contraseña como mínimo debe tener seis caracteres, al menos una letra y un número"
        );
        password.classList.add("is-invalid");
      } else {
        password.classList.remove("is-invalid");
        password.classList.add("is-valid");
      }

      //Validamos confirmacion de contraseña:

      if (confirmPassword.value == "") {
        errores.push("Debes confirmar la contraseña");
        confirmPassword.classList.add("is-invalid");
      } else if (confirmPassword.value !== password.value) {
        errores.push("Las contraseñas no coinciden");
        confirmPassword.classList.add("is-invalid");
      } else {
        confirmPassword.classList.remove("is-invalid");
        confirmPassword.classList.add("is-valid");
      }

      //Validacion de la extension de la imagen de perfil

      var isValidImg = /[\/.](gif|jpg|jpeg|tiff|png)$/i.test(imagen.value);
      if (!isValidImg) {
        errores.push(
          "Debes seleccionar un archivo válido (JPG, JPEG, PNG, GIF)"
        );
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
