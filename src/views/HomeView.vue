<template>
  <div class="container mt-3">
    <h1>Agenda de contactos</h1>
    <div v-html="alert"></div>
    <div class="alert"></div>
    <button
      type="button"
      class="btn btn-outline-primary"
      data-toggle="modal"
      data-target="#NuevoContacto"
    >
      Agregar contacto
    </button>
    <div class="row mt-3">
      <input
        class="form-control mr-sm-2 col-md-2"
        type="search"
        placeholder="Nombre"
        @keyup="filtrarNombre"
        v-model="nombre_filtro"
      />
      <input
        class="form-control mr-sm-2 col-md-2"
        type="search"
        placeholder="Correo"
        @keyup="filtrarCorreo"
        v-model="correo_filtro"
      />
    </div>
    <table class="table mt-3">
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Teléfono</th>
          <th scope="col">Fecha de nacimiento</th>
          <th scope="col">Edad</th>
          <th scope="col">Dirección</th>
          <th scope="col">Correo electrónico</th>
          <th scope="col">Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(persona, index) in personas" :key="index">
          <td>{{ persona.nombre }}</td>
          <td>{{ persona.telefono }}</td>
          <td>{{ persona.fecha_nacimiento }}</td>
          <td>{{ persona.edad }}</td>
          <td>{{ persona.direccion }}</td>
          <td>{{ persona.correo }}</td>
          <td class="row">
            <button
              class="btn btn-outline-primary col-md-5 offset-sm-1"
              data-toggle="modal"
              data-target="#EditarContacto"
              @click="this.id = persona.id"
              type="button"
            >
              Editar
            </button>

            <button
              class="btn btn-outline-danger col-md-5 offset-sm-1"
              @click="eliminarContacto(persona.id)"
              type="button"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      class="modal fade"
      id="NuevoContacto"
      tabindex="-1"
      aria-labelledby="NuevoContactoLabel"
      aria-hidden="true"
      v-if="id"
    >
      <Agregar v-on:agregarContacto="actualizarLista" />
    </div>
    <div
      class="modal fade"
      id="EditarContacto"
      tabindex="-1"
      aria-labelledby="EditarContactoLabel"
      aria-hidden="true"
    >
      <Editar v-on:editarContacto="actualizarLista" :id="id" />
    </div>
  </div>
</template>

<script>
import Agregar from "@/components/Agregar.vue";
import Editar from "@/components/Editar.vue";
import { mapActions } from "vuex";
var datos = [];
export default {
  name: "Agenda",
  components: {
    Agregar,
    Editar,
  },
  data() {
    return {
      personas: datos,
      alert: "",
      id: null,
      nombre_filtro: "",
      telefono_filtro: "",
      correo_filtro: "",
    };
  },
  methods: {
    ...mapActions(["getAxios", "deteleAxios"]),
    calcularFecha(fecha) {
      var hoy = new Date();
      var cumpleanos = new Date(fecha);
      var edad = hoy.getFullYear() - cumpleanos.getFullYear();
      var m = hoy.getMonth() - cumpleanos.getMonth();

      if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
      }
      return edad;
    },
    eliminarContacto(id) {
      this.deteleAxios({ data: id }).then((response) => {
        this.actualizarLista("Se eleminó el contacto");
      });
    },
    actualizarLista(mensaje) {
      this.alert =
        '<div class="alert alert-success" role="alert">' + mensaje + "</div>";
      this.getPersonas();
    },
    getPersonas() {
      datos = [];
      this.getAxios().then((response) => {
        response.data.forEach((persona) => {
          persona.edad = this.calcularFecha(persona.fecha_nacimiento);
          datos.push(persona);
        });
        this.personas = datos;
      });
    },
    filtrarNombre() {
      this.nombre_filtro
        ? (this.personas = datos.filter((persona) =>
            persona.nombre.includes(this.nombre_filtro)
          ))
        : (this.personas = datos);
    },
    filtrarCorreo() {
      this.correo_filtro
        ? (this.personas = datos.filter((persona) =>
            persona.correo.includes(this.correo_filtro)
          ))
        : (this.personas = datos);
    },
  },
  mounted() {
    this.getPersonas();
    /*  this.$swal("Heading", "Se cargo correctamente", "OK"); */
  },
};
</script>
