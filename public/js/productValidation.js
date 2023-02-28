window.onload = function () {
  alert(
    "Hola, vamos a validar tus datos para que tu experiencia sea la mejor!"
  );
  let form = document.querySelector(".form-edit");
  form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    let errores = [];
    let nombreProducto = document.getElementById("nombreProducto");
    let descripcion = document.getElementById("descripcion");
    let precio = document.getElementById("precio");
    let descuento = document.getElementById("descuento");
    let modelo = document.getElementById("modelo");
    let talla = document.getElementById("talla");
    let imagen = document.getElementById("imagen");

    // console.log(imagen.value);

    //Validamos campo nombre del producto:

    let regNameProd = /(\s*?[\w\.]\s*?){6,}$/;

    if (nombreProducto.value == "") {
      errores.push("El campo nombre no puede estar vacio");
      nombreProducto.classList.add("is-invalid");
    } else if (!regNameProd.test(nombreProducto.value)) {
      errores.push(
        "El campo nombre de producto debe contener minimo 6 caracteres"
      );
      nombreProducto.classList.add("is-invalid");
    } else {
      nombreProducto.classList.remove("is-invalid");
      nombreProducto.classList.add("is-valid");
    }

    //Validamos campo de descripción:

    //let regDescription = /(\s*?[\w\.]\s*?){20,}$/;
   let regDesc = /.{20,}/

    if (descripcion.value == "") {
      errores.push("El campo descripcion no puede estar vacio");
      descripcion.classList.add("is-invalid");

    } else if (!regDesc.test(descripcion.value)){
      errores.push("El campo descripcion debe tener minimo 20 caracteres");
      descripcion.classList.add("is-invalid");

    } else {
      descripcion.classList.remove("is-invalid");
      descripcion.classList.add("is-valid");
    }

    //Validamos el campo precio:

    let regPrice = /^[0-9]+(\.[0-9]+)?$/;

    if (precio.value == "") {
      errores.push("El campo precio no puede estar vacio");
      precio.classList.add("is-invalid");
    } else if (!regPrice.test(precio.value)) {
      errores.push("El campo precio solo admite numeros");
      precio.classList.add("is-invalid");
    } else {
      precio.classList.remove("is-invalid");
      precio.classList.add("is-valid");
    }

    //Validamos el campo descuento:

    let regDiscount = /^[0-9]+(\.[0-9]+)?$/;

    if (descuento.value == "") {
      errores.push("El campo descuento no puede estar vacio");
      descuento.classList.add("is-invalid");
    } else if (!regDiscount.test(descuento.value)) {
      errores.push("El campo descuento solo admite numeros");
      descuento.classList.add("is-invalid");
    } else {
      descuento.classList.remove("is-invalid");
      descuento.classList.add("is-valid");
    }

    //Validamos el modelo:

    //console.log(modelo.value);

    if (modelo.value == "") {
      errores.push("El campo modelo no puede estar vacio");
      modelo.classList.add("is-invalid");
    } else if (modelo.value == "#") {
      errores.push("Selecciona un modelo");
    } else {
      modelo.classList.remove("is-invalid");
      modelo.classList.add("is-valid");
    }

    //Validamos la talla:

    console.log(talla.value);
    if (talla.value == "") {
      errores.push("El campo talla no puede estar vacio");
      talla.classList.add("is-invalid");
    } else if (talla.value == "#") {
      errores.push("Selecciona una talla");
    } else {
      talla.classList.remove("is-invalid");
      talla.classList.add("is-valid");
    }

    //Validamos la extension de la imagen

    var isValidImg = /[\/.](gif|jpg|jpeg|tiff|png)$/i.test(imagen.value);
    if (!isValidImg) {
      errores.push("Debes seleccionar un archivo válido (JPG, JPEG, PNG, GIF)");
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
