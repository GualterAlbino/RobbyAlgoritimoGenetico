<template>
  <div class="div-container">
    <v-app-bar app color="primary" dark>
      <!--Titulo -->
      <v-toolbar-title>Algoritmo Genético de Robby</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Botões -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-on="on"
            v-bind="attrs"
            class="mx-2"
            @click="onAtualizarVisualizacao()"
            ><v-icon>mdi-refresh</v-icon></v-btn
          >
        </template>

        <span>Apenas força a atualização visual do gráfico</span>
      </v-tooltip>

      <v-btn class="mx-2" @click="onExecutarAlgoritimo()"
        ><v-icon>mdi-play</v-icon></v-btn
      >
      <DialogConfig
        class="mx-2"
        :config="config"
        @onSalvarConfiguracoes="onSalvarConfiguracoes($event)"
        @onResetarConfiguracoes="onResetarConfiguracoes($event)"
      />
    </v-app-bar>

    <v-alert v-if="loading" type="warning">{{ tempoFormatado }}</v-alert>

    <v-card v-else-if="labels.length > 0" class="grafico-chart">
      <Chart
        :key="'chart_' + countAtualizacaoGrafico"
        :type="'bar'"
        :ref="'RefChart'"
        :labels="labels"
        :datasets="datasets"
        :options="options"
      >
      </Chart>
    </v-card>

    <div v-else class="d-flex flex-column text-center my-2">
      <v-icon size="140"> mdi-alert-circle-outline </v-icon>
      <span>Sem dados! Execute o algoritimo</span>
    </div>
  </div>
</template>

<script>
import Chart from './Chart.vue'
import DialogConfig from './DialogConfig.vue'
import RobbyController from '@/services/RobbyController'

export default {
  components: {
    Chart,
    DialogConfig
  },

  created() {
    this.robbyController = new RobbyController()
  },

  data() {
    return {
      labels: [],
      options: {},
      datasets: [],
      loading: false,
      exibirDialogConfig: false,
      countAtualizacaoGrafico: 0,

      //Cronometro
      horas: 0,
      minutos: 0,
      segundos: 0,
      intervalo: null,

      //Configurações
      config: {
        taxaMutacao: 0.01,
        taxaCrossover: 0.01,
        tamanhoPopulacao: 100,
        quantidadeGeracoes: 100
      }
    }
  },

  computed: {
    chart() {
      return this.$refs.chart
    },

    display() {
      return this.$vuetify.breakpoint.name
    },

    tempoFormatado() {
      return `${this.pad(this.horas)}:${this.pad(this.minutos)}:${this.pad(
        this.segundos
      )}`
    }
  },

  methods: {
    //-------------------
    // Eventos
    //-------------------

    async onExecutarAlgoritimo() {
      await this.executarAlgoritomo()
    },

    onSalvarConfiguracoes(pConfig) {
      this.config = pConfig
      this.onExecutarAlgoritimo()
    },

    onResetarConfiguracoes(pConfig) {
      this.config = pConfig
    },

    onAtualizarVisualizacao() {
      this.countAtualizacaoGrafico++
    },

    onAlterarLoading(pLoading) {
      if (pLoading) {
        this.loading = true
        this.iniciarCronometro()
      } else {
        this.loading = false
        this.pararCronometro()
        this.resetarCronometro()
      }
    },

    //-------------------
    // Metodos
    //-------------------
    async executarAlgoritomo() {
      try {
        this.onAlterarLoading(true)
        const { data } = await this.robbyController.executarAlgoritimoGenetico(
          this.config
        )

        this.labels = Array.from(
          { length: data.melhoresPontuacoes.length },
          (_, i) => `Geração ${i + 1}`
        )
        this.datasets = [
          {
            label: 'Melhores Pontuações',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data: data.melhoresPontuacoes
          }
        ]

        this.countAtualizacaoGrafico++
      } catch (error) {
        console.error('Erro ao executar o algoritmo genético:', error)
      } finally {
        this.onAlterarLoading(false)
      }
    },

    //-------------------
    // Cronômetro
    //-------------------
    iniciarCronometro() {
      if (!this.intervalo) {
        this.intervalo = setInterval(this.atualizarCronometro, 1000)
      }
    },

    pararCronometro() {
      clearInterval(this.intervalo)
      this.intervalo = null
    },

    resetarCronometro() {
      this.pararCronometro()
      this.horas = 0
      this.minutos = 0
      this.segundos = 0
    },

    atualizarCronometro() {
      this.segundos++
      if (this.segundos === 60) {
        this.segundos = 0
        this.minutos++
        if (this.minutos === 60) {
          this.minutos = 0
          this.horas++
        }
      }
    },

    pad(unit) {
      return unit < 10 ? '0' + unit : unit
    }
  },

  watch: {
    display() {
      this.countAtualizacaoGrafico++
    }
  }
}
</script>

<style scoped>
.div-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.grafico-chart {
  width: 85%;
}
</style>
