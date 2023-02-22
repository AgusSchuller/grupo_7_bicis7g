window.onload = function () {
    alert ("Hola, vamos a validar tus datos para que tu experiencia sea la mejor!")
    let form = document.querySelector(".form-login");
    form.addEventListener("submit", (evento) => {
      let errores = [];
      let nombreProducto = document.getElementById("email");
      let descripcion = document.getElementById("password");
      //let imagen = document.getElementById("imagen");
  
      if (email.value == "") {
        errores.push("El email no puede estar vacio");
        nombreProducto.classList.add("is-invalid");
      } else {
        nombreProducto.classList.remove("is-invalid");
        nombreProducto.classList.add("is-valid");
      }
      if (password.value == "") {
        errores.push("El campo password no puede estar vacio");
        descripcion.classList.add("is-invalid");
      } else {
        descripcion.classList.remove("is-invalid");
        descripcion.classList.add("is-valid");
      }
  
      if (errores.length > 0) {
        evento.preventDefault();
        let ulErrores = document.querySelector(".errores");
        ulErrores.innerHTML = "";
        ulErrores.classList.add("alert-warning");
        for (let i = 0; i < errores.length; i++) {
          ulErrores.innerHTML += `<li>${errores[i]} </li>`;
        }
      } else {
        alert("Validaciones exitosas!!!");
        form.submit();
      }
    });
  };
  