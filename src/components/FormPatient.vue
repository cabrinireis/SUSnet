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
              <label> Foto*</label>
              <v-img
                :src="form.photo_url"
                width="100%"
                height="200"
                class="preview"
              ></v-img>
              <div class="upload">
                <v-btn block @click="$refs.file.$refs.input.click()">add</v-btn>
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
                  hide-details
                  single-line
                ></v-text-field>
              </v-col>
              <v-col class="text-left" cols="12" sm="12" md="12">
                <label> Nome Completo da Mãe*</label>
                <v-text-field
                  v-model="form.motherName"
                  dense
                  outlined
                  hide-details
                  single-line
                ></v-text-field>
              </v-col>
              <v-col class="text-left" cols="12" sm="12" md="12">
                <label> Data de Nascimento*</label>
                <v-text-field
                  v-model="form.birthday"
                  dense
                  outlined
                  hide-details
                  single-line
                ></v-text-field>
              </v-col>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-left" cols="6">
              <label>CPF*</label>
              <v-text-field
                v-model="form.cpf"
                dense
                outlined
                hide-details
                single-line
              ></v-text-field>
            </v-col>
            <v-col class="text-left" cols="6">
              <label>CNS*(cartão nacional de saúde, com validação)</label>
              <v-text-field
                v-model="form.cns"
                dense
                outlined
                hide-details
                single-line
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
                v-model="form.adress.cep"
                type="email"
                dense
                outlined
                hide-details
                single-line
              ></v-text-field>
            </v-col>
            <v-col class="text-left" cols="5">
              <label>Cidade</label>
              <v-text-field
                v-model="form.adress.city"
                type="email"
                dense
                outlined
                hide-details
                single-line
              ></v-text-field>
            </v-col>
            <v-col class="text-left" cols="3">
              <label>Estado</label>
              <v-text-field
                v-model="form.adress.state"
                type="email"
                dense
                outlined
                hide-details
                single-line
              ></v-text-field>
            </v-col>
            <v-col class="text-left" cols="6">
              <label>Bairro</label>
              <v-text-field
                v-model="form.adress.ville"
                type="email"
                dense
                outlined
                hide-details
                single-line
              ></v-text-field>
            </v-col>

            <v-col class="text-left" cols="6">
              <label>Endereço</label>
              <v-text-field
                v-model="form.adress.addr"
                type="email"
                dense
                outlined
                hide-details
                single-line
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-container v-else class="text-left pt-0 pb-13">
          <span>Deseja realmente excluir o contato?</span>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn id="app-btnCancel" color="error" text @click="close">
          Cancelar
        </v-btn>
        <v-btn
          class="app-btnSave"
          color="error"
          light
          rounded
          :disabled="valid"
          @click="action"
        >
          {{ mode === "remove" ? "Excluir" : "Salvar" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  props: {
    dataform: {
      type: Object,
      default: () => {},
    },
    mode: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      active: false,
      url: null,
      image: null,
      form: {
        src: "",
        name: "",
        phone: "",
        photo_url: null,
        adress: {
          cep: 74922330,
          adress: "",
          city: "",
          state: "",
          ville: "",
          addr: "",
        },
      },
      filter: {
        edit: "Editar contato",
        remove: "Excluir contato",
        new: "Criar novo contato",
      },
    };
  },
  watch: {
    "form.phone"() {
      let v = this.form.phone;
      v = v.replace(/\D/g, "");
      v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
      v = v.replace(/(\d)(\d{4})$/, "$1-$2");
      return (this.form.phone = v);
    },
  },
  computed: {
    setTitle() {
      return this.filter?.[this.mode] || this.filter?.["new"];
    },
    valid() {
      if (this.mode === "remove") {
        return false;
      } else {
        return this.form.name || this.form.email || this.form.phone
          ? false
          : true;
      }
    },
  },
  mounted() {
    if (this.mode === "edit") this.form = { ...this.dataform };
  },
  methods: {
    Preview_image() {
      console.log(this.$refs.file.$refs.input);
      this.form.photo_url = URL.createObjectURL(this.image);
    },
    action() {
      if (this.mode === "edit") {
        this.$store.dispatch("UPDATE", this.form);
        this.$emit("close");
      } else if (this.mode === "remove") {
        this.$store.dispatch("DELETE", this.dataform);
      } else {
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
