<template>
  <v-main>
    <div class="pa-5">
      <template>
        <v-row justify="space-between">
          <v-col cols="4">
            <v-btn color="secondary" @click="onCreate">Cadastrar</v-btn>
          </v-col>
          <v-col cols="6">
            <v-text-field
              class="input-search"
              flat
              appendIcon="mdi-magnify"
              v-model="search"
              label="Buscar..."
              hide-details
              single-line
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-data-table
              :headers="headers"
              :items="list"
              :items-per-page="10"
              class="elevation-1 app-list"
              :item-key="'id'"
              :item-class="() => classrow"
              :footer-props="{
                'items-per-page-text': 'Items por Página',
              }"
            >
              <template #[`item.phone`]="{ item }">
                <td>{{ item.phone }}</td>
              </template>
              <template #[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="read(item)">
                  mdi-eye
                </v-icon>
                <v-icon small class="mr-2" @click="edit(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="remove(item)"> mdi-delete </v-icon>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
        <v-dialog v-if="dialogActive" v-model="dialogActive" width="800">
          <app-form :dataform="formEdit" :mode="mode" @close="close" />
        </v-dialog>
      </template>
    </div>
  </v-main>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  components: {
    AppForm: () => import("@/components/FormPatient"),
  },
  data() {
    return {
      dialogActive: false,
      search: "",
      users: [],
      classrow: "",
      mode: "",
      dialog: false,
      formEdit: {},
      headers: [
        {
          text: "Nome do pasciente",
          width: "30%",
          value: "name",
        },
        { text: "Nome da mãe", value: "motherName" },
        { text: "CPF", value: "phone" },
        { text: "CNS", value: "cns" },
        {
          text: "Ações",
          value: "actions",
          sortable: false,
          align: "center",
          width: "150",
        },
      ],
    };
  },
  methods: {
    remove(remove) {
      this.mode = "remove";
      this.formEdit = remove;
      this.dialogActive = true;
    },
    onCreate() {
      this.mode = "create";
      this.dialogActive = true;
    },
    edit(edit) {
      this.mode = "edit";
      this.formEdit = edit;
      this.dialogActive = true;
    },
    read(read) {
      this.mode = "read";
      this.formEdit = read;
      this.dialogActive = true;
    },

    close() {
      this.formEdit = null;
      this.dialogActive = false;
    },

    ...mapActions({
      getList: "GET_PATIENT",
    }),
  },
  watch: {
    search(val) {
      this.$store.dispatch("GET_PATIENT", val);
    },
    notification(val) {
      if (val) {
        this.classrow = "classrow";
      }
    },
  },
  computed: {
    ...mapState({
      notification: (state) => state.notification.active,
      active: (state) => state.modalActive,
      list: (state) => state.patientList,
    }),
  },
  created() {
    this.getList();
    if (this.notification) this.classrow = "classrow";
  },
};
</script>
<style lang="scss">
.app-list {
  tbody {
    tr:hover {
      cursor: pointer;
      background-color: #fff3f2 !important;
    }
  }
}
tbody .classrow:last-child {
  background: #fce97f;
  animation: fadeBackground 10s;
  animation-fill-mode: forwards;
}

@keyframes fadeBackground {
  from {
    background-color: #fff3f2;
  }
  to {
    background-color: #ffff;
  }
}
</style>
