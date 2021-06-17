<template>
  <div class="md-layout md-alignment-top-center">
      <md-table class="md-layout-item md-size-70 md-alignment-top-center" v-model="usuario" md-sort="nombres" md-sort-order="asc" md-card md-fixed-header>
        <md-table-toolbar>
          <h1 class="md-title">USUARIOS</h1>
        </md-table-toolbar>
        <md-table-empty-state
        md-label="No hay usuarios registrados"
        :md-description="`Por favor registre un usuario`">
        <md-button class="md-primary md-raised" @click="$router.push('crear')">Crear Usuario</md-button>
        </md-table-empty-state>
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="ID" md-numeric>{{ item.id}}</md-table-cell>
          <md-table-cell md-label="Nombres">{{ item.nombres}}</md-table-cell>
          <md-table-cell md-label="Apellidos">{{ item.apellidos}}</md-table-cell>
          <md-table-cell md-label="Cedula">{{ item.cedula}}</md-table-cell>
          <md-table-cell md-label="Correo">{{ item.correo}}</md-table-cell>
          <md-table-cell md-label="Telefono">{{ item.telefono}}</md-table-cell>
          <md-table-cell md-label="Telefono">
            <md-button class="md-fab md-mini md-plain" @click="openDialog(item)">
              <md-icon>edit</md-icon>
            </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>

      <md-dialog :md-active.sync="dialog" class="md-alignment-bottom-center" id="d-pricipal">
        <md-dialog-title>Editar Usuarios</md-dialog-title>
            <Formulario :update="usuarioSelec" :action="'actualizar'" :ruta="'editar'" @finish="finish()"></Formulario>
      </md-dialog>

      <md-dialog-alert class="md-layout-item md-size-small"
      :md-active.sync="confirmation"
      md-title="Usuario Guardado!"
      md-content="EL usuario ha sido guardado" />
      
  </div>
</template>

<script>
import Formulario from "../views/Formulario.vue"
const apiURL = 'http://localhost:8000/api/allsform';
export default {
  name: 'Listado',
  mounted() {
    this.getAllData();
  },
  components: {
    Formulario
  },
  data(){
    return {
      usuario :{
        id: '',
        nombres: '',
        apellidos: '',
        cedula: '',
        correo: '',
        telefono: ''
      },
      usuarioSelec: '',
      dialog : false,
      confirmation: false
    }
  },
   methods: {
    getAllData(){
        fetch(apiURL, {
          method: 'GET',
          headers:{
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then((response) => { 
          this.usuario = response
        });
    },
    openDialog(item){
      this.dialog = true
      this.usuarioSelec = item
    },
    finish(){
      console.log("emitio")
      this.dialog = false;
      this.confirmation = true
    }
   }
}
</script>

<style>
.md-table .md-table-cell.md-has-action .md-table-cell-container {
  justify-content: space-around;
}
.md-table .md-table-head {
  text-align: center;
}
.md-table .md-table-cell {
  text-align: center;
}
#d-pricipal {
  display: initial !important;
}
#d-pricipal > .md-dialog-container {
  height: 100%
}
@import url("https://fonts.googleapis.com/css?family=Material+Icons");
</style>
