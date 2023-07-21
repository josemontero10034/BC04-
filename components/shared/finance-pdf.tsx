import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { createTranslator } from "next-intl";

import * as messages from "../../../messages/en.json";
import { Invoice } from "./types";

interface FinancePdfProps {
  invoices: Invoice[];
}

const FinancePdf = (props: FinancePdfProps) => {
  const t = createTranslator({ locale: "en", messages });

  Font.register({
    family: "Poppins",
    fonts: [
      {
        src: "http://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrFJDUc1NECPY.ttf",
      },
      {
        src: "http://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLEj6V1tvFP-KUEg.ttf",
        fontWeight: 600,
      },
    ],
  });

  const styles = StyleSheet.create({
    table: {
      width: "100%",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      borderBottom: "1px solid #242424",
      paddingTop: 8,
      paddingBottom: 8,
    },
    rowContent: {
      display: "flex",
      flexDirection: "row",
      paddingTop: 8,
      paddingBottom: 8,
    },
    header: {
      borderTop: "none",
    },
    bold: {
      fontWeight: "bold",
    },
    row1: {
      width: "50%",
    },
    row2: {
      width: "20%",
    },
    row3: {
      width: "15%",
    },
    row4: {
      width: "15%",
    },
  });

  const objTest = [
    {
      descripcion: "reparacion mueble",
      costo: 10000,
      cantidad: 4,
      total: 4000,
    },
    {
      descripcion: "descuento por levantamiento",
      costo: -2000,
      cantidad: "-",
      total: -2000,
    },
  ];

  return (
    <Document>
      {props.invoices.map((invoice) => (
        <Page
          key={invoice.id}
          size="A4"
          style={{
            paddingHorizontal: 40,
            paddingVertical: 25,
            fontFamily: "Poppins",
          }}
        >
          <View>
            <Text
              style={{
                color: "#1850BC",
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 20,
              }}
            >
              {t("financeProvider.financePdf.header")}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                fontSize: 10,
                columnGap: 40,
              }}
            >
              <View style={{ width: 135 }}>
                <Text style={{ fontWeight: "bold" }}>
                  {t("financeProvider.financePdf.billNumber")}
                </Text>
                <Text>{invoice.number}</Text>
                <Text>Tarjeta de Credito/Debito</Text>
              </View>
              <View style={{ width: 120 }}>
                <Text style={{ fontWeight: "bold" }}>
                  {t("financeProvider.financePdf.date")}
                </Text>
                <Text>{invoice.date}</Text>
              </View>
              <View style={{ width: 140 }}>
                <Text style={{ fontWeight: "bold" }}>
                  {t("financeProvider.financePdf.expirationDate")}
                </Text>
                <Text>{invoice.expireDate}</Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                fontSize: 10,
                marginTop: 15,
                columnGap: 40,
              }}
            >
              <View style={{ width: 135 }}>
                <Text style={{ fontWeight: "bold" }}>
                  {t("financeProvider.financePdf.from")}
                </Text>
                <Text>{invoice.provider}</Text>
                <Text>Ebanisteria</Text>
                <Text>Reparacion de Muebles</Text>
              </View>
              <View style={{ width: 120 }}>
                <Text style={{ fontWeight: "bold" }}>
                  {t("financeProvider.financePdf.to")}
                </Text>
                <Text>{invoice.client}</Text>
                <Text>flora@neural.com.do</Text>
                <Text>Santo Domingo Oeste, C/Pablo Pumraol no.1</Text>
              </View>
              <View style={{ width: 140 }}>
                <Text style={{ fontWeight: "bold" }}>
                  {t("financeProvider.financePdf.rncDetail")}
                </Text>
                <Text>{t("financeProvider.financePdf.rnc")}</Text>
                <Text>{invoice.rnc}</Text>
              </View>
            </View>
            {/* //table  */}
            <View
              style={{
                marginTop: 45,
                fontSize: 10,
                width: "100%",
              }}
            >
              <View style={[styles.row, styles.bold]}>
                <Text style={styles.row1}>
                  {t("financeProvider.financePdf.description")}
                </Text>
                <Text style={styles.row2}>
                  {t("financeProvider.financePdf.cost")}
                </Text>
                <Text style={styles.row3}>
                  {t("financeProvider.financePdf.quantity")}
                </Text>
                <Text style={styles.row4}>
                  {t("financeProvider.financePdf.total")}
                </Text>
              </View>
              {objTest.map((info, x) => (
                <View key={x} style={styles.rowContent} wrap={false}>
                  <Text style={styles.row1}>
                    <Text style={styles.bold}>{info.descripcion}</Text>
                  </Text>
                  <Text style={styles.row2}>{info.costo}</Text>
                  <Text style={styles.row3}>{info.cantidad}</Text>
                  <Text style={styles.row4}>
                    <Text>{info.total}</Text>
                  </Text>
                </View>
              ))}
              <View style={styles.rowContent}>
                <View style={styles.row1}></View>
                <View style={{ width: "50%" }}>
                  <View
                    style={{
                      borderTop: "1px solid black",
                      borderBottom: "1px solid black",
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      paddingTop: 4,
                      paddingBottom: 20,
                    }}
                  >
                    <View style={{ rowGap: 10, width: "70%" }}>
                      <Text style={styles.bold}>
                        {t("financeProvider.financePdf.subtotal")}
                      </Text>
                      <Text>
                        <Text style={styles.bold}>
                          {t("financeProvider.financePdf.itbis")}
                        </Text>{" "}
                        (18%)
                      </Text>
                      <Text>
                        <Text style={styles.bold}>
                          {t("financeProvider.financePdf.isr")}
                        </Text>{" "}
                        (2%)
                      </Text>
                    </View>
                    <View style={{ rowGap: 10 }}>
                      <Text style={styles.bold}>$10,000</Text>
                      <Text>$0.00</Text>
                      <Text>$0.00</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Text style={{ fontWeight: "bold" }}>
                        {t("financeProvider.financePdf.total")}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          color: "#1850BC",
                          fontSize: 16,
                          fontWeight: "bold",
                        }}
                      >
                        $10,000.00
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View>
              <Text style={{ fontSize: 12, fontWeight: "bold", marginTop: 30 }}>
                {t("financeProvider.financePdf.jobDescription")}
              </Text>
              <Text style={{ width: 270, fontSize: 10, marginTop: 5 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                aliquam pulvinar dolor urna enim vitae vel. Ultrices eget ut.
              </Text>
            </View>
            {!invoice.isPaid && (
              <View>
                <Text
                  style={{ fontSize: 12, fontWeight: "bold", marginTop: 30 }}
                >
                  {t("financeProvider.financePdf.note")}
                </Text>
                <Text style={{ width: 270, fontSize: 10, marginTop: 5 }}>
                  {t("financeProvider.financePdf.noteDescription")}
                </Text>
              </View>
            )}
          </View>
          <View
            style={{
              position: "absolute",
              fontSize: 12,
              bottom: 30,
              left: 0,
              right: 0,
              textAlign: "center",
              borderTop: "1px solid #1850BC",
            }}
            fixed
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 40,
                paddingTop: 10,
                columnGap: 45,
                fontSize: 10,
              }}
            >
              <Image
                style={{ width: 122, height: 87 }}
                src="/assets/images/logo.png"
              />
              <View style={{ width: 172, textAlign: "left", rowGap: 6 }}>
                <Text>809-555-4444</Text>
                <Text>
                  C/Pablo Pumarol No. 1, Los Prados, Santo Domingo Oeste.
                </Text>
                <Text>info@bluepages.com.do</Text>
              </View>
            </View>
            <Text
              style={{ color: "grey", textAlign: "right", right: 40 }}
              render={({ pageNumber, totalPages }) =>
                `${pageNumber} / ${totalPages}`
              }
              fixed
            />
          </View>
        </Page>
      ))}
    </Document>
  );
};

export default FinancePdf;
