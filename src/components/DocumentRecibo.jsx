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
        margin: 20,
        padding: 20,
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
        fontSize: 24
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
            <Page size={{ width: 300}} style={styles.page}>
            {/* <Page size={{ width: 162, height: 297 }} style={styles.page}> */}
                <View style={styles.section}>
                    <View style={styles.containerStyles}>
                        <Text style={{ fontSize: 12 }}>FERREREPUESTOS & ACCESORIOS</Text>
                        <Text style={{ fontSize: 24 }}>COQUITO S.A.C.</Text>
                        <Text style={{ fontSize: 10 }}>RUC: 20609883805</Text>
                        <Text style={{ fontSize: 9 }}>Dirección fiscal: AV. VICTOR RAUL 145 - CHAO - LA LIBERTAD</Text>
                        <Text style={{ fontSize: 12 }}>
                            {"\n"} RECIBO ELECTRONICO  - 00{props.recibo.nro_recibo} {"\n"}  {"\n"}
                        </Text>
                    </View>

                    <View>
                        <View style={styles.table}>
                            <View style={styles.tableRow}>
                                <View style={{ width: '45%' }}>
                                    <Text style={{ fontSize: 7 }}>FECHA Y HORA DE EMISION</Text>
                                </View>
                                <View style={{ width: '5%' }}>
                                    <Text style={{ fontSize: 7 }}>:</Text>
                                </View>
                                <View style={{ width: '50%' }}>
                                    <Text style={{ fontSize: 7 }}>{props.recibo.fecha_emision}</Text>
                                </View>
                            </View>

                            <View style={styles.tableRow}>
                                <View style={{ width: '45%' }}>
                                    <Text style={{ fontSize: 7 }}>RUC</Text>
                                </View>
                                <View style={{ width: '5%' }}>
                                    <Text style={{ fontSize: 7 }}>:</Text>
                                </View>
                                <View style={{ width: '50%' }}>
                                    <Text style={{ fontSize: 7 }}>{props.recibo.nro_doc}</Text>
                                </View>
                            </View>

                            <View style={styles.tableRow}>
                                <View style={{ width: '45%' }}>
                                    <Text style={{ fontSize: 7 }}>SEÑOR(ES)</Text>
                                </View>
                                <View style={{ width: '5%' }}>
                                    <Text style={{ fontSize: 7 }}>:</Text>
                                </View>
                                <View style={{ width: '50%' }}>
                                    <Text style={{ fontSize: 7 }}>{props.recibo.nombres_razon}</Text>
                                </View>
                            </View>

                            <View style={styles.tableRow}>
                                <View style={{ width: '45%' }}>
                                    <Text style={{ fontSize: 7 }}>DIRECCION</Text>
                                </View>
                                <View style={{ width: '5%' }}>
                                    <Text style={{ fontSize: 7 }}>:</Text>
                                </View>
                                <View style={{ width: '50%' }}>
                                    <Text style={{ fontSize: 7 }}>{props.recibo.direccion}</Text>
                                </View>
                            </View>

                            <View style={styles.tableRow}>
                                <View style={{ width: '45%' }}>
                                    <Text style={{ fontSize: 7 }}>MEDIO DE PAGO</Text>
                                </View>
                                <View style={{ width: '5%' }}>
                                    <Text style={{ fontSize: 7 }}>:</Text>
                                </View>
                                <View style={{ width: '50%' }}>
                                    <Text style={{ fontSize: 7 }}>{props.recibo.medio_pago}</Text>
                                </View>
                            </View>

                            <View style={styles.tableRow}>
                                <View style={{ width: '45%' }}>
                                    <Text style={{ fontSize: 7 }}>A CUENTA</Text>
                                </View>
                                <View style={{ width: '5%' }}>
                                    <Text style={{ fontSize: 7 }}>:</Text>
                                </View>
                                <View style={{ width: '50%' }}>
                                    <Text style={{ fontSize: 7 }}>S/. {props.recibo.a_cuenta}</Text>
                                </View>
                            </View>

                            <View style={styles.tableRow}>
                                <View style={{ width: '45%' }}>
                                    <Text style={{ fontSize: 7 }}>SALDO</Text>
                                </View>
                                <View style={{ width: '5%' }}>
                                    <Text style={{ fontSize: 7 }}>:</Text>
                                </View>
                                <View style={{ width: '50%' }}>
                                    <Text style={{ fontSize: 7 }}>S/. {props.recibo.saldo}</Text>
                                </View>
                            </View>

                            <View style={styles.tableRow}>
                                <View style={{ width: '45%' }}>
                                    <Text style={{ fontSize: 7 }}>OBSERVACIONES</Text>
                                </View>
                                <View style={{ width: '5%' }}>
                                    <Text style={{ fontSize: 7 }}>:</Text>
                                </View>
                                <View style={{ width: '50%' }}>
                                    <Text style={{ fontSize: 7 }}>{props.recibo.observaciones}</Text>
                                </View>
                            </View>

                            <View style={{ width: '50%' }}>
                                <Text style={{ fontSize: 7 }}> {"\n"} {"\n"}</Text>
                            </View>

                            <View style={styles.line} />

                            <View style={styles.containerStyles}>
                                <Text style={{ fontSize: 7 }}>DESCRIPCION</Text>
                            </View>

                            <View style={styles.tableRow}>
                                <View style={{ width: '25%' }}>
                                    <View style={styles.containerStyles}>
                                        <Text style={{ fontSize: 7 }}>CANT.</Text>
                                    </View>
                                </View>
                                <View style={{ width: '25%' }}>
                                    <View style={styles.containerStyles}>
                                        <Text style={{ fontSize: 7 }}>UM.</Text>
                                    </View>
                                </View>
                                <View style={{ width: '25%' }}>
                                    <View style={styles.containerStyles}>
                                        <Text style={{ fontSize: 7 }}>P.UNIT</Text>
                                    </View>
                                </View>
                                <View style={{ width: '25%' }}>
                                    <View style={styles.containerStyles}>
                                        <Text style={{ fontSize: 7 }}>TOTAL</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.line} />
                            {props.recibo.productos.map((item) => {
                                return (
                                    <View>
                                        <View>
                                            <Text style={{ fontSize: 7 }}>{item.descripcion_producto}</Text>
                                        </View>
                                        <View style={styles.tableRow}>
                                            <View style={{ width: '25%' }}>
                                                <View style={styles.containerStyles}>
                                                    <Text style={{ fontSize: 7 }}>{item.cantidad}</Text>
                                                </View>
                                            </View>
                                            <View style={{ width: '25%' }}>
                                                <View style={styles.containerStyles}>
                                                    <Text style={{ fontSize: 7 }}>UNID.</Text>
                                                </View>
                                            </View>
                                            <View style={{ width: '25%' }}>
                                                <View style={styles.containerStyles}>
                                                    <Text style={{ fontSize: 7 }}>S/. {item.precio_unit}</Text>
                                                </View>
                                            </View>
                                            <View style={{ width: '25%' }}>
                                                <View style={styles.containerStyles}>
                                                    <Text style={{ fontSize: 7 }}>S/. {(item.cantidad * item.precio_unit)}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View >
                                            <Text style={{ fontSize: 7 }}> {"\n"}</Text>
                                        </View>
                                    </View>

                                )
                            })
                            }

                            <View style={styles.line} />


                            <View style={styles.tableRow}>
                                <View style={{ width: '75%' }}>
                                    <View style={styles.totalStyles}>
                                        <Text style={{ fontSize: 7 }}>SUBTOTAL</Text>
                                    </View>
                                </View>
                                <View style={{ width: '25%' }}>
                                    <View style={styles.containerStyles}>
                                        <Text style={{ fontSize: 7 }}>S/. {props.recibo.sub_total}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.tableRow}>
                                <View style={{ width: '75%' }}>
                                    <View style={styles.totalStyles}>
                                        <Text style={{ fontSize: 7 }}>IGV 18%</Text>
                                    </View>
                                </View>
                                <View style={{ width: '25%' }}>
                                    <View style={styles.containerStyles}>
                                        <Text style={{ fontSize: 7 }}>S/. {props.recibo.igv} </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.tableRow}>
                                <View style={{ width: '75%' }}>
                                    <View style={styles.totalStyles}>
                                        <Text style={{ fontSize: 7 }}>TOTAL</Text>
                                    </View>
                                </View>
                                <View style={{ width: '25%' }}>
                                    <View style={styles.containerStyles}>
                                        <Text style={{ fontSize: 7 }}>S/. {props.recibo.total} </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.line} />
                            <View style={styles.containerStyles}>
                                <Text style={{ fontSize: 8 }}>Este documento es una representación impresa de la venta, no tiene valor tributario</Text>
                            </View>
                            <View style={styles.containerStyles}>
                                <Text style={{ fontSize: 8 }}>Conservar su recibo para devolución.</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
};

