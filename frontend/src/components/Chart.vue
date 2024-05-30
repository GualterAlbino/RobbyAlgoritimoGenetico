<template>
  <div>
    <canvas ref="chart"></canvas>
  </div>
</template>

<script lang="js">
import Chart from 'chart.js/auto';

export default {
  props: {
    type: {
      type: String,
      required: true
    },
    labels: {
      type: Array,
      required: true
    },
    labelsMarcados: {
      type: Array,
      required: false,
      default: () => []
    },
    datasets: {
      type: Array,
      required: true
    },
    options: {
      type: Object,
      required: false
    },
    height: {
      type: String,
      default: "400px"
    }
  },
  data() {
    return {
      chart: null,
      chartData: {
        type: "",
        data: {
          labels: [],
          datasets: []
        },
        options: {}
      }
    };
  },
  methods: {
    onClickItem(item) {
      this.$emit("onCheckBoxClick", item);
    },

    createChart() {
      const context = this.$refs.chart.getContext("2d");
      this.chart = new Chart(context, {
        type: this.type,
        data: {
          labels: this.labels,
          datasets: this.datasets
        },
        options: {
          ...this.options,
          onClick: this.handleClick
        }
      });
      this.addLegendClickEvent();
    },

    loadDataChart() {
      this.chartData.type = this.type;
      this.chartData.data.labels = this.labels;
      this.chartData.data.datasets = this.datasets;
      this.chartData.options = this.options;
    },

    update() {
      this.loadDataChart();
      this.chart.update();
      this.addLegendClickEvent();
    },

    handleClick(event) {
      const activePoints = this.chart.getElementsAtEvent(event);
      if (activePoints.length > 0) {
        const clickedLabel = this.labels[activePoints[0]._index];
        this.$emit("onLabelClick", clickedLabel);
      }
    },

    addLegendClickEvent() {
      if (!this.chart || !this.chart.legend) return;

      const legendItems = this.chart.legend.legendItems;
      legendItems.forEach((item, index) => {
        const legendItem = this.chart.legend.legendHitBoxes[index];

        if (legendItem) {
          const legendCanvas = this.$refs.chart;
          const clickArea = legendCanvas.getContext("2d");

          clickArea.canvas.addEventListener("click", event => {
            const x = event.clientX - legendCanvas.getBoundingClientRect().left;
            const y = event.clientY - legendCanvas.getBoundingClientRect().top;
            if (
              x >= legendItem.left &&
              x <= legendItem.left + legendItem.width &&
              y >= legendItem.top &&
              y <= legendItem.top + legendItem.height
            ) {
              this.$emit("onLegendClick", this.labels[index]);
            }
          });
        }
      });
    }
  },
  watch: {
    type() {
      this.update();
    },
    labels() {
      this.update();
    },
    datasets() {
      this.update();
    },
    options() {
      this.update();
    },
    height() {
      this.update();
    }
  },
  created() {
    this.loadDataChart();
  },
  mounted() {
    this.createChart();
  }
};
</script>
