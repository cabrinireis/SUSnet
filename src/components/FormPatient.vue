<template>
  <div class="text-center">
    <v-card>
      <v-card-title class="text-h7 app-ModalTitle">
        {{ setTitle }}
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-container v-if="mode !== 'remove'">
          <v-row>
            <v-col class="text-left" cols="6">
              <label> Foto* </label>
              <v-img
                :src="form.photo_url"
                width="100%"
                height="300px"
                class="preview"
                @error="getErrors('photo_url', $v.form.photo_url)"
              >
              </v-img>
              <span
                class="text-left red--text ml-4"
                v-if="!getErrors('photo_url', $v.form.photo_url)"
              >
                Foto obrigatória
              </span>
              <div class="upload" v-if="mode !== 'read'">
                <v-btn
                  color="secondary"
                  block
                  @click="$refs.file.$refs.input.click()"
                  >Adicionar Foto</v-btn
                >
                <v-file-input
                  ref="file"
                  v-show="false"
                  hide-details
                  @change="Preview_image"
                  v-model="image"
                >
                </v-file-input>
              </div>
            </v-col>
            <v-col cols="6">
              <v-col class="text-left" cols="12" sm="12" md="12">
                <label> Nome Completo do Paciente*</label>
                <v-text-field
                  v-model="form.name"
                  dense
                  outlined
                  :readonly="readonly"
                  :error-messages="getErrors('name', $v.form.name)"
                ></v-text-field>
              </v-col>
              <v-col class="text-left" cols="12" sm="12" md="12">
                <label> Nome Completo da Mãe*</label>
                <v-text-field
                  v-model="form.motherName"
                  dense
                  outlined
                  :readonly="readonly"
                  :error-messages="getErrors('motherName', $v.form.motherName)"
                ></v-text-field>
              </v-col>
              <v-col class="text-left" cols="12" sm="12" md="12">
                <label> Data de Nascimento*</label>
                <v-menu
                  ref="menu1"
                  v-model="menu1"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.birthday"
                      v-mask="'##/###/###-##'"
                      v-bind="attrs"
                      v-on="on"
                      dense
                      outlined
                      :readonly="readonly"
                      :error-messages="getErrors('birthday', $v.form.birthday)"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    no-title
                    @input="menu1 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-left" cols="6">
              <label>CPF*</label>
              <v-text-field
                v-model="form.cpf"
                v-mask="'###.###.###-##'"
                dense
                outlined
                :readonly="readonly"
                :error-messages="getErrors('cpf', $v.form.cpf)"
              ></v-text-field>
            </v-col>
            <v-col class="text-left" cols="6">
              <label>CNS*(cartão nacional de saúde)</label>
              <v-text-field
                v-model="form.cns"
                dense
                outlined
                :readonly="readonly"
                :error-messages="getErrors('cns', $v.form.cns)"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="text-left">
              <h3>Endereço*</h3>
            </v-col>
            <v-col class="text-left" cols="4">
              <label>CEP</label>
              <v-text-field
                v-model="form.cep"
                dense
                max-leng
                v-mask="'#####-###'"
                outlined
                :readonly="readonly"
                :error-messages="getErrors('cep', $v.form.cep)"
              ></v-text-field>
            </v-col>
            <v-col class="text-left" cols="5">
              <label>Cidade</label>
              <v-text-field
                v-model="form.adress.city"
                dense
                outlined
                :readonly="readonly"
                :error-messages="getErrors('city', $v.form.adress.city)"
              ></v-text-field>
            </v-col>
            <v-col class="text-left" cols="3">
              <label>Estado</label>
              <v-text-field
                v-model="form.adress.state"
                dense
                outlined
                :readonly="readonly"
                :error-messages="getErrors('state', $v.form.adress.state)"
              ></v-text-field>
            </v-col>
            <v-col class="text-left" cols="6">
              <label>Bairro</label>
              <v-text-field
                v-model="form.adress.ville"
                dense
                outlined
                :readonly="readonly"
                :error-messages="getErrors('ville', $v.form.adress.ville)"
              ></v-text-field>
            </v-col>

            <v-col class="text-left" cols="6">
              <label>Endereço</label>
              <v-text-field
                v-model="form.adress.addr"
                dense
                outlined
                :readonly="readonly"
                :error-messages="getErrors('addr', $v.form.adress.addr)"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-container v-else class="text-left pt-0 pb-13">
          <h3 class="orange--text">Deseja realmente excluir este Registro?</h3>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn id="app-btnCancel" color="error" text @click="close">
          Cancelar
        </v-btn>
        <v-btn
          :disabled="readonly"
          class="app-btnSave"
          color="error"
          light
          rounded
          @click="action"
        >
          {{ mode === "remove" ? "Excluir" : "Salvar" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { required, minLength, numeric } from "vuelidate/lib/validators";
import { validationMessages } from "@/ultils/index";
export default {
  mixins: [validationMessages()],
  props: {
    dataform: {
      type: Object,
      default: () => {},
    },
    mode: {
      type: String,
      default: "read",
    },
  },
  data() {
    return {
      photo_urlValid: false,
      date: "",
      menu1: false,
      active: false,
      url: null,
      image: null,
      cep: "",
      response: null,
      form: {
        cns: "",
        src: "",
        name: "",
        motherName: "",
        photo_url: null,
        cep: "",
        birthday: "",
        adress: {
          city: "",
          state: "",
          ville: "",
          addr: "",
        },
      },
      filter: {
        edit: "Editar Paciente",
        remove: "Excluir Paciente",
        new: "Cadastrar novo Paciente",
      },
    };
  },
  validations: {
    form: {
      name: { required },
      motherName: { required },
      birthday: { required },
      photo_url: { required },
      cpf: {
        required,
        minLength: minLength(14),
      },
      cns: { required, minLength: minLength(15), numeric },
      cep: { required, minLength: minLength(9) },
      adress: {
        city: { required },
        state: { required },
        ville: { required },
        addr: { required },
      },
    },
  },
  watch: {
    date() {
      this.form.birthday = this.formatDate(this.date);
    },
    adress(val) {
      if (val) {
        this.form.adress = { ...val };
      }
    },
    "form.cep"(val) {
      if (val.length === 9) {
        this.getCep(val);
      } else this.response = null;
    },
  },
  computed: {
    ...mapState({
      adress: (state) => state.adress,
    }),
    readonly() {
      return this.mode === "read";
    },
    setTitle() {
      return this.filter?.[this.mode] || this.filter?.["new"];
    },
    validarCNS() {
      let cns = this.form.cns;
      // Verifica se o CNS tem 15 dígitos
      if (cns.length !== 15) {
        return false;
      }

      //const cnsSemDV = cns.substring(0, 14);
      //const dv = parseInt(cns.charAt(14));

      // Calcula o dígito verificador
      let soma = 0;
      for (let i = 0; i < 15; i++) {
        let peso = 15 - i;
        soma += parseInt(cns.charAt(i)) * peso;
      }

      let resto = soma % 11;
      if (resto != 0) {
        return false;
      } else {
        return true;
      }
    },
  },
  mounted() {
    this.form = { ...this.dataform };
  },
  methods: {
    getErrors(name, model) {
      const isRequired = "é obrigatório";
      const errors = [];
      if (!model.$dirty) return errors;
      switch (name) {
        case "name":
          !model.required && errors.push(`name ${isRequired}`);
          break;
        case "motherName":
          !model.required && errors.push(`nome da mae ${isRequired}`);
          break;
        case "birthday":
          !model.required && errors.push(`Data ${isRequired}`);
          break;
        case "cpf":
          !model.minLength && errors.push(`CPF incompleto`);
          !model.required && errors.push(`CPF ${isRequired}`);
          break;
        case "cns":
          if (!this.validarCNS) errors.push(`CNS inválido`);
          !model.numeric && errors.push(`CNS deve ser numérico`);
          !model.minLength && errors.push(`CNS incompleto`);
          !model.required && errors.push(`CNS ${isRequired}`);
          break;
        case "cep":
          !model.minLength && errors.push(`CEP incompleto`);
          !model.required && errors.push(`CEP ${isRequired}`);
          break;
        case "city":
          !model.required && errors.push(`Cidade ${isRequired}`);
          break;
        case "state":
          !model.required && errors.push(`Estado ${isRequired}`);
          break;
        case "ville":
          !model.required && errors.push(`Cidade ${isRequired}`);
          break;
        case "addr":
          !model.required && errors.push(`Endereço ${isRequired}`);
          break;
        default:
          break;
      }
      return errors[0];
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    getCep(cep) {
      this.$store.dispatch("GET_CEP", cep);
    },
    Preview_image() {
      this.form.photo_url = URL.createObjectURL(this.image);
    },
    action() {
      if (this.mode === "edit") {
        this.$store.dispatch("UPDATE", this.form);
        this.$emit("close");
      } else if (this.mode === "remove") {
        this.$store.dispatch("DELETE", this.dataform);
      } else {
        this.$v.$touch();
        if (this.$v.$invalid) return;
        this.$store.dispatch("SAVE", this.form);
        this.$emit("close");
      }
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/styles/variables.scss";
.preview {
  border: 1px solid #ccc;
}
.upload {
  padding-top: 1rem;
  width: 100%;
}
.app-btnSave.v-btn.v-btn--disabled.v-btn--has-bg {
  background-color: $text-primary !important;
  opacity: 32%;
  color: #fff !important;
  span {
    text-transform: initial;
    margin-right: 12px !important;
    margin-left: 12px !important;
  }
}
.app-ModalTitle {
  color: $text-dark !important;
  font-size: 16px !important;
  font-weight: normal;
}
</style>
