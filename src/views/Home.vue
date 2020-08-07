<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row justify="center" align="center">
            <v-col cols="12">
              <h4 class="text-center">Os calculos são feitos com base nos dados entre as datas 04/01/2010 e 03/12/2019 </h4>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                :loading="loading"
                v-model="dataToCalc.investmentDate"
                v-mask="dateMask"
                :rules="rules"
                label="Data de Inicial"
                append-icon="mdi-calendar"
                filled
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                :loading="loading"
                v-model="dataToCalc.currentDate"
                v-mask="dateMask"
                :rules="rules"
                label="Data Final"
                append-icon="mdi-calendar"
                filled
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="dataToCalc.cdbRate"
                :rules="rules"
                label="Taxa do CDB"
                type="number"
                :loading="loading"
                filled
              />
            </v-col>

            <v-col cols="11" md="3">
              <v-btn
                :loading="loading"
                :disabled="!valid"
                @click="calculate"
                color="success"
                block
                dark
                >Calcular
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
      <v-col cols="12">
        <h4 class="text-center">Historico de consulta</h4></v-col
      >
      <v-col cols="12">
        <v-timeline dense>
          <v-timeline-item v-for="(item, i) in items" :key="i" small fill-dot>
            <v-list rounded>
              <v-list-item class="px-0 mx-0 d-flex flex-sm-wrap">
                <v-list-item-content class="px-0 mx-0">
                  <v-row>
                    <v-col cols="12" md="3">
                      <v-list-item-title>Data Inicial</v-list-item-title>
                      <v-list-item-subtitle>{{
                        item.info.investmentDate
                      }}</v-list-item-subtitle>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-list-item-title>Data Final</v-list-item-title>
                      <v-list-item-subtitle>{{
                        item.info.currentDate
                      }}</v-list-item-subtitle>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-list-item-title>Taxa do CDB</v-list-item-title>
                      <v-list-item-subtitle>{{
                        item.info.cdbRate
                      }}</v-list-item-subtitle>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-list-item-title>Valor Calculado</v-list-item-title>
                      <v-list-item-subtitle>R$ {{
                        item.info.currentValue
                      }}</v-list-item-subtitle>
                    </v-col>
                  </v-row>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon @click="info(item)">
                    <v-icon color="info">mdi-chart-areaspline-variant </v-icon>
                  </v-btn>
                </v-list-item-action>
                <v-list-item-action>
                  <v-btn  icon @click="info(item)">
                    <v-icon color="error">mdi-delete </v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-timeline-item>
        </v-timeline>
      </v-col>
      <graphic ref="graph" />
    </v-row>
  </v-container>
</template>

<script>
import CalculateService from "../services/CalculateCDBService";
import Graphic from "../components/Graphic";
export default {
  components: {
    Graphic,
  },
  data: () => ({
    items: [],
    dateMask: "##/##/####",
    dataToCalc: {
      investmentDate: "20/05/2015",
      cdbRate: 100,
      currentDate: "20/06/2018",
    },
    loading: false,
    rules: [(v) => !!v || "Campo Obrigatório!"],
    valid: true,
  }),
  

  methods: {
    async calculate() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          const obj = this.getObjToCalc();
          const prices = await CalculateService.calculate(obj);
          const info = this.getObjToList(prices[prices.length-1].unitPrice);
          this.items.push({ info, prices });
          this.clear();
        } catch (error) {
          console.log(error);
        }
        this.loading = false;
      }
    },
    info(item) {
      this.$refs.graph.open(item);
    },
    clear() {
      this.dataToCalc.investmentDate = "";
      this.dataToCalc.currentDate = "";
      this.dataToCalc.cdbRate = 0;
      this.$refs.form.reset();
    },
    parseDate(date = "") {
      const [day, month, year] = date.split("/");
      return `${year}-${month}-${day}`;
    },

    getObjToCalc() {
      return {
        investmentDate: this.parseDate(this.dataToCalc.investmentDate),
        cdbRate: this.dataToCalc.cdbRate,
        currentDate: this.parseDate(this.dataToCalc.currentDate),
      };
    },
    getObjToList(item) {
      return {
        investmentDate: this.dataToCalc.investmentDate,
        cdbRate: this.dataToCalc.cdbRate,
        currentDate: this.dataToCalc.currentDate,
        currentValue:item
      };
    },
  },
};
/* 03/12/2019 - 04/01/2010 */
</script>
