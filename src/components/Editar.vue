<template v-if="id">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">EDITAR CONTACTO</h5>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form class="row" @submit.prevent="registrarContacto" id="agendar">
          <div class="form-group col-md-6">
            <label for="nombre">Nombre</label>
            <input
              type="text"
              class="form-control"
              id="nombre"
              v-model="nombre"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="telefono">Teléfono</label>
            <input
              type="number"
              class="form-control"
              id="telefono"
              v-model="telefono"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="fecha">Fecha de nacimiento</label>
            <input
              type="date"
              class="form-control"
              id="fecha"
              v-model="fecha"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="direccion">Dirección</label>
            <input
              type="type"
              class="form-control"
              id="direccion"
              v-model="direccion"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="correo">Correo electrónico</label>
            <input
              type="email"
              class="form-control"
              id="correo"
              v-model="correo"
            />
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="submit" class="btn btn-primary" form="agendar">
          Agendar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "HelloWorld",
  props: {
    id: Number,
  },
  data() {
    return {
      nombre: "",
      telefono: "",
      fecha: "",
      direccion: "",
      correo: "",
    };
  },
  methods: {
    ...mapActions(["editAxios", "getOneAxios"]),
    registrarContacto() {
      this.editAxios({
        id: this.id,
        data: {
          nombre: this.nombre,
          telefono: this.telefono,
          fecha_nacimiento: this.fecha,
          direccion: this.direccion,
          correo: this.correo,
        },
      }).then((response) => {
        this.$emit("agregarContacto", "Se edito correctamente");
      });
    },
  },
  mounted() {
    this.getOneAxios({
      data: this.id,
    }).then((response) => {
      console.log(response);
      this.nombre = response.data.nombre;
      this.telefono = response.data.telefono;
      this.fecha = response.data.fecha_nacimiento;
      this.direccion = response.data.direccion;
      this.correo = response.data.correo;
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
