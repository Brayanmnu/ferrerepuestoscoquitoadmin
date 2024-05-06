import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Estilo para el documento PDF
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',

        width: 162, // Ancho en puntos (80 mm = 226.8 puntos aproximadamente)
    },
    section: {
        margin: 5,
        padding: 5,
    },
    containerStyles: {
        display: 'flex',
        textAlign: 'center', // Centrado del texto dentro de los elementos de texto
    },
    totalStyles: {
        display: 'flex',
        textAlign: 'right', // Centrado del texto dentro de los elementos de texto
    },
    textNameStyles: {
        fontSize: 6
    },
    table: {
        display: 'table',
        width: 'auto',
    },
    tableRow: {
        margin: 'auto',
        flexDirection: 'row',
    },
    line: {
        borderBottomWidth: 0.3,
        borderBottomColor: '#000000',
        marginBottom: 0.5,
    }
});

// Componente del PDF
export default function DocumentRecibo(props) {
    return (
        <Document>
            <Page size={{ width: 80}} style={styles.page}>
            {/* <Page size={{ width: 162, height: 297 }} style={styles.page}> */}
                <View style={styles.section}>
                    <View style={styles.containerStyles}>
                        <Text style={{ fontSize: 3.3 }}>FERREREPUESTOS & ACCESORRIOS</Text>
                        <Text style={{ fontSize: 6 }}>COQUITO S.A.C.</Text>
                        <Text style={{ fontSize: 2 }}>RUC: 20609883805</Text>
                        <Text style={{ fontSize: 2 }}>Dirección fiscal: AV. VICTOR RAUL 145 - CHAO - LA LIBERTAD</Text>
                        <Text style={{ fontSize: 3 }}>
                            {"\n"} RECIBO ELECTRONICO  - 00{props.recibo.nro_recibo} {"\n"}  {"\n"}
                        </Text>
                    </View>

                    <View>
                        <View style={styles.table}>
                            <View style={styles.tableRow}>
                                <View style={{ width: '45%' }}>
                                    <Text style={{ fontSize: 1.8 }}>FECHA Y HORA DE EMISION</Text>
                                </View>
                                <View style={{ width: '5%' }}>
                                    <Text style={{ fontSize: 1.8 }}>:</Text>
                                </View>
                                <View style={{ width: '50%' }}>
                                    <Text style={{ fontSize: 1.8 }}>{props.recibo.fecha_emision}</Text>
                                </View>
                            </View>

                            <View style={styles.tableRow}>
                                <View style={{ width: '45%' }}>
                                    <Text style={{ fontSize: 1.8 }}>RUC</Text>
                                </View>
                                <View style={{ width: '5%' }}>
                                    <Text style={{ fontSize: 1.8 }}>:</Text>
                                </View>
                                <View style={{ width: '50%' }}>
                                    <Text style={{ fontSize: 1.8 }}>{props.recibo.nro_doc}</Text>
                                </View>
                            </View>

                            <View style={styles.tableRow}>
                                <View style={{ width: '45%' }}>
                                    <Text style={{ fontSize: 1.8 }}>SEÑOR(ES)</Text>
                                </View>
                                <View style={{ width: '5%' }}>
                                    <Text style={{ fontSize: 1.8 }}>:</Text>
                                </View>
                                <View style={{ width: '50%' }}>
                                    <Text style={{ fontSize: 1.8 }}>{props.recibo.nombres_razon}</Text>
                                </View>
                            </View>

                            <View style={styles.tableRow}>
                                <View style={{ width: '45%' }}>
                                    <Text style={{ fontSize: 1.8 }}>DIRECCION</Text>
                                </View>
                                <View style={{ width: '5%' }}>
                                    <Text style={{ fontSize: 1.8 }}>:</Text>
                                </View>
                                <View style={{ width: '50%' }}>
                                    <Text style={{ fontSize: 1.8 }}>{props.recibo.direccion}</Text>
                                </View>
                            </View>

                            <View style={styles.tableRow}>
                                <View style={{ width: '45%' }}>
                                    <Text style={{ fontSize: 1.8 }}>MEDIO DE PAGO</Text>
                                </View>
                                <View style={{ width: '5%' }}>
                                    <Text style={{ fontSize: 1.8 }}>:</Text>
                                </View>
                                <View style={{ width: '50%' }}>
                                    <Text style={{ fontSize: 1.8 }}>{props.recibo.medio_pago}</Text>
                                </View>
                            </View>

                            <View style={styles.tableRow}>
                                <View style={{ width: '45%' }}>
                                    <Text style={{ fontSize: 1.8 }}>A CUENTA</Text>
                                </View>
                                <View style={{ width: '5%' }}>
                                    <Text style={{ fontSize: 1.8 }}>:</Text>
                                </View>
                                <View style={{ width: '50%' }}>
                                    <Text style={{ fontSize: 1.8 }}>S/. {props.recibo.a_cuenta}</Text>
                                </View>
                            </View>

                            <View style={styles.tableRow}>
                                <View style={{ width: '45%' }}>
                                    <Text style={{ fontSize: 1.8 }}>SALDO</Text>
                                </View>
                                <View style={{ width: '5%' }}>
                                    <Text style={{ fontSize: 1.8 }}>:</Text>
                                </View>
                                <View style={{ width: '50%' }}>
                                    <Text style={{ fontSize: 1.8 }}>S/. {props.recibo.saldo}</Text>
                                </View>
                            </View>

                            <View style={styles.tableRow}>
                                <View style={{ width: '45%' }}>
                                    <Text style={{ fontSize: 1.8 }}>OBSERVACIONES</Text>
                                </View>
                                <View style={{ width: '5%' }}>
                                    <Text style={{ fontSize: 1.8 }}>:</Text>
                                </View>
                                <View style={{ width: '50%' }}>
                                    <Text style={{ fontSize: 1.8 }}>{props.recibo.observaciones}</Text>
                                </View>
                            </View>

                            <View style={{ width: '50%' }}>
                                <Text style={{ fontSize: 1.8 }}> {"\n"} {"\n"}</Text>
                            </View>

                            <View style={styles.line} />

                            <View style={styles.containerStyles}>
                                <Text style={{ fontSize: 1.8 }}>DESCRIPCION</Text>
                            </View>

                            <View style={styles.tableRow}>
                                <View style={{ width: '25%' }}>
                                    <View style={styles.containerStyles}>
                                        <Text style={{ fontSize: 1.8 }}>CANT.</Text>
                                    </View>
                                </View>
                                <View style={{ width: '25%' }}>
                                    <View style={styles.containerStyles}>
                                        <Text style={{ fontSize: 1.8 }}>UM.</Text>
                                    </View>
                                </View>
                                <View style={{ width: '25%' }}>
                                    <View style={styles.containerStyles}>
                                        <Text style={{ fontSize: 1.8 }}>P.UNIT</Text>
                                    </View>
                                </View>
                                <View style={{ width: '25%' }}>
                                    <View style={styles.containerStyles}>
                                        <Text style={{ fontSize: 1.8 }}>TOTAL</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.line} />
                            {props.recibo.productos.map((item) => {
                                return (
                                    <View>
                                        <View>
                                            <Text style={{ fontSize: 1.8 }}>{item.descripcion_producto}</Text>
                                        </View>
                                        <View style={styles.tableRow}>
                                            <View style={{ width: '25%' }}>
                                                <View style={styles.containerStyles}>
                                                    <Text style={{ fontSize: 1.8 }}>{item.cantidad}</Text>
                                                </View>
                                            </View>
                                            <View style={{ width: '25%' }}>
                                                <View style={styles.containerStyles}>
                                                    <Text style={{ fontSize: 1.8 }}>UNID.</Text>
                                                </View>
                                            </View>
                                            <View style={{ width: '25%' }}>
                                                <View style={styles.containerStyles}>
                                                    <Text style={{ fontSize: 1.8 }}>S/. {item.precio_unit}</Text>
                                                </View>
                                            </View>
                                            <View style={{ width: '25%' }}>
                                                <View style={styles.containerStyles}>
                                                    <Text style={{ fontSize: 1.8 }}>S/. {(item.cantidad * item.precio_unit)}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View >
                                            <Text style={{ fontSize: 1.8 }}> {"\n"}</Text>
                                        </View>
                                    </View>

                                )
                            })
                            }

                            <View style={styles.line} />


                            <View style={styles.tableRow}>
                                <View style={{ width: '75%' }}>
                                    <View style={styles.totalStyles}>
                                        <Text style={{ fontSize: 1.8 }}>SUBTOTAL</Text>
                                    </View>
                                </View>
                                <View style={{ width: '25%' }}>
                                    <View style={styles.containerStyles}>
                                        <Text style={{ fontSize: 1.8 }}>S/. {props.recibo.sub_total}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.tableRow}>
                                <View style={{ width: '75%' }}>
                                    <View style={styles.totalStyles}>
                                        <Text style={{ fontSize: 1.8 }}>IGV 18%</Text>
                                    </View>
                                </View>
                                <View style={{ width: '25%' }}>
                                    <View style={styles.containerStyles}>
                                        <Text style={{ fontSize: 1.8 }}>S/. {props.recibo.igv} </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.tableRow}>
                                <View style={{ width: '75%' }}>
                                    <View style={styles.totalStyles}>
                                        <Text style={{ fontSize: 1.8 }}>TOTAL</Text>
                                    </View>
                                </View>
                                <View style={{ width: '25%' }}>
                                    <View style={styles.containerStyles}>
                                        <Text style={{ fontSize: 1.8 }}>S/. {props.recibo.total} </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.line} />
                            <View style={styles.containerStyles}>
                                <Text style={{ fontSize: 1.8 }}>Este documento es una representación impresa de la venta, no tiene valor tributario</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
};

