<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="600px" scrollable>
      <!--Botão para ativação do dialog-->
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark v-bind="attrs" v-on="on">
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </template>

      <v-card>
        <!--Toolbar fixada no topo do card-->
        <v-toolbar color="primary" dark>
          <v-toolbar-title>Configurações</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon @click="onFecharDialog()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <!--Form de edição-->

        <v-card-text>
          <v-form v-model="isFormValido" lazy-validation>
            <v-container>
              <v-row class="mt-10">
                <!--Taxa de Mutação-->
                <v-col cols="6" sm="6" md="6">
                  <v-text-field
                    outlined
                    required
                    type="number"
                    :rules="rulesGenerica"
                    label="Taxa de Mutação"
                    v-model="configForm.taxaMutacao"
                  ></v-text-field>
                </v-col>

                <!--Taxa de Crossover-->
                <v-col cols="6" sm="6" md="6">
                  <v-text-field
                    outlined
                    required
                    type="number"
                    :rules="rulesGenerica"
                    label="Taxa de Crossover"
                    v-model="configForm.taxaCrossover"
                  ></v-text-field>
                </v-col>

                <!--Tamanho da População-->
                <v-col cols="6" sm="6" md="6">
                  <v-text-field
                    outlined
                    required
                    type="number"
                    :rules="rulesGenerica"
                    label="Tamanho da População"
                    v-model="configForm.tamanhoPopulacao"
                  ></v-text-field>
                </v-col>

                <!--Tamanho da Geração-->
                <v-col cols="6" sm="6" md="6">
                  <v-text-field
                    outlined
                    required
                    type="number"
                    :rules="rulesGenerica"
                    label="Quantidade de Gerações"
                    v-model="configForm.quantidadeGeracoes"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="warning" dark @click="onResetarConfiguracoes()"
            >Resetar</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn color="error" @click="onFecharDialogConfiguracao()">
            Cancelar
          </v-btn>
          <v-btn
            dark
            color="blue darken-1"
            :disabled="!isFormValido"
            @click="onSalvarConfiguracoes()"
          >
            Salvar e Aplicar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      default: () => ({
        taxaMutacao: 0.01,
        taxaCrossover: 0.01,
        tamanhoPopulacao: 100,
        quantidadeGeracoes: 100
      })
    }
  },

  data: () => ({
    dialog: false,
    isFormValido: false,
    configForm: {
      taxaMutacao: 0.01,
      taxaCrossover: 0.01,
      tamanhoPopulacao: 100,
      quantidadeGeracoes: 100
    }
  }),

  computed: {
    rulesGenerica() {
      return [(v) => !!v || 'Campo obrigatório']
    }
  },

  watch: {
    config: {
      handler(newValue) {
        this.configForm = newValue
      },
      deep: true
    }
  },

  methods: {
    onFecharDialog() {
      this.dialog = false
    },

    onSalvarConfiguracoes() {
      this.dialog = false
      this.$emit('onSalvarConfiguracoes', this.configForm)
    },

    onFecharDialogConfiguracao() {
      this.dialog = false
    },

    onResetarConfiguracoes() {
      this.configForm = {
        taxaMutacao: 0.1,
        taxaCrossover: 0.01,
        tamanhoPopulacao: 100,
        quantidadeGeracoes: 100
      }
      this.$emit('onResetarConfiguracoes', this.configForm)
    }
  }
}
</script>
