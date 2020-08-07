<template>
  <v-dialog v-model="dialog">
    <v-card class="mx-auto text-center" max-width="auto">
      <v-row justify="center" align="center">
        <v-col cols="12" md="6" >
          <plotly
            :data="data"
            :layout="layout"
            :responsive="true"
            :display-mode-bar="true"
            :scrollZoom="true"
          />
        </v-col>
        <v-col cols="12" md="6" >
          <v-list disabled class="text-start">
            <v-list-item>
              <v-list-item-title
                ><h3>Informações da consulta</h3>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  >Data de Inicio:
                  {{ this.info.investmentDate }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  >Data Final: {{ this.info.currentDate }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  >Taxa do CDB: {{ this.info.cdbRate }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  >Valor Calculado: R$ {{ this.info.currentValue }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
      <v-card-actions class="justify-center">
        <v-btn @click="close" text color="error">Fechar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { Plotly } from "vue-plotly";
export default {
  components: {
    Plotly,
  },
  computed:{
    isMobile(){
      return this.$vuetify.breakpoint.smAndDown
    }
  },
  data: () => ({
    dialog: false,
    info: {},
    data: [
      {
        x: [],
        y: [],
        type: "scatter",
      },
    ],
    layout: {
      title: "Preço Unitário CDB",
    },
    config: {
      scrollZoom: true,
      responsive: true,
    },
  }),
  mounted() {},
  methods: {
    open(item) {
      this.data[0].y = this.getDataset(item);
      this.data[0].x = this.getLabels(item);
      this.info = item.info;
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.data[0].y = [];
      this.data[0].x = [];
      this.info = {};
    },
    getDataset(item) {
      return item.prices.map((i) => Number(i.unitPrice));
    },
    getLabels(item) {
      return item.prices.map((i) => {
        const [year, month, day] = i.date.split("-");
        return `${day}/${month}/${year}`;
      });
    },
  },
};
</script>
<style scoped>
.chart-container {
  display: flex;
  flex-direction: row;
  height: 500px;
}
.landscape-mode {
  -webkit-transform: rotate(90deg); /* Safari and Chrome */
  -moz-transform: rotate(90deg); /* Firefox */
  -ms-transform: rotate(90deg); /* IE 9 */
  -o-transform: rotate(90deg); /* Opera */
  transform: rotate(90deg);
}
</style>
