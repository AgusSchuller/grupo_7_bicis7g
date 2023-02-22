window.onload = function () {
  let form = document.querySelector(".form-edit");
  form.addEventListener("submit", (evento) => {
    let errores = [];
    let nombreProducto = document.getElementById("nombreProducto");
    let descripcion = document.getElementById("descripcion");
    //let imagen = document.getElementById("imagen");

    if (nombreProducto.value == "") {
      errores.push("El campo nombre no puede estar vacio");
      nombreProducto.classList.add("is-invalid");
    } else {
      nombreProducto.classList.remove("is-invalid");
      nombreProducto.classList.add("is-valid");
    }
    if (descripcion.value == "") {
      errores.push("El campo descripcion no puede estar vacio");
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
