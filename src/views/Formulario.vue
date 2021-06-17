<template>
<div>
  <form class="md-layout md-alignment-top-center" v-on:submit.prevent = "sendForm">
    <md-card class="md-layout-item md-size-50 md-small-size-100 md-alignment-top-center">
        <div class="md-layout md-size-50 md-alignment-top-center">
          <md-card-header class="md-layout-item md-size-50" >
            <div class="md-title ">Usuario</div>
          </md-card-header>
        </div>
        <div class="md-layout  md-size-100 md-alignment-top-center">
          <div class="md-layout-item md-size-50 md-alignment-top-center">
            <md-field class="md-layout-item md-alignment-top-center" :class="errors.nombres ? 'md-invalid' : ''">
              <label>Nombres</label>
              <md-input type="text" v-model="usuario.nombres"></md-input>
              <span class="md-error">{{ errors.nombres ? errors.nombres[0]: "" }}</span>
            </md-field>
            <md-field class="md-layout-item  md-alignment-top-center" :class="errors.apellidos ? 'md-invalid' : ''">
              <label>Apellidos</label>
              <md-input type="text" v-model="usuario.apellidos"></md-input>
              <span class="md-error">{{ errors.apellidos ? errors.apellidos[0]: "" }}</span>
            </md-field>
            <md-field class="md-layout-item  md-alignment-top-center" :class="errors.cedula ? 'md-invalid' : ''">
              <label>Cedula</label>
              <md-input type="text" v-model="usuario.cedula"></md-input>
              <span class="md-error">{{ errors.cedula ? errors.cedula[0]: "" }}</span>
            </md-field>
            <md-field class="md-layout-item  md-alignment-top-center" :class="errors.correo ? 'md-invalid' : ''">
              <label>Correo</label>
              <md-input type="text" v-model="usuario.correo"></md-input>
              <span class="md-error">{{ errors.correo ? errors.correo[0]: "" }}</span>
            </md-field>
            <md-field  class="md-layout-item  md-alignment-top-center" :class="errors.telefono ? 'md-invalid' : ''">
              <label>Telefono</label>
              <md-input type="text" v-model="usuario.telefono"></md-input>
              <span class="md-error">{{ errors.telefono ? errors.telefono[0]: "" }}</span>
            </md-field>
          </div>
        </div> 
        <div class="md-layout md-alignment-top-center" >
          <md-button type="submit" class="md-layout-item md-raised md-primary md-size-50 ">{{ actionTitle }}</md-button>  
        </div>
    </md-card>
  </form>
  <md-dialog-alert
      :md-active.sync="message"
      md-title="Usuario Guardado!"
      md-content="EL usuario ha sido guardado" />
</div>
</template>

<script>
const apiURL = 'http://localhost:8000/api/';
export default {
  name: 'Formulario',
  props: {
    update: Object,
    action: String,
    ruta: String,
    closeDialog: Boolean

  },
  mounted() {
    if(this.update){
      this.usuario = this.update;
      this.actionTitle = this.action;
      this.path = this.ruta;
    }
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
      errors :{
        nombres: '',
        apellidos: '',
        cedula: '',
        correo: '',
        telefono: ''
      },
      message: false,
      actionTitle : 'Registrar',
      path: 'userformsave'
    }
  },
  methods: {
  sendForm(){
      fetch(apiURL + this.path, {
        method: 'POST', // or 'PUT'
        body:  JSON.stringify(this.usuario), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        if(response.error){
          this.error = true;
          this.errors = response.errors;
          console.log(this.errors)
        }else{
          Object.assign(this.$data, this.$options.data());
          this.message = true;
          this.$emit('finish')
        }
      });
  }
  }
}
</script>


<style >
  .md-title {
    text-align: center;
  }
</style>

