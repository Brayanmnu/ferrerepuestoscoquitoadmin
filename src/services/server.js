import axios from 'axios';

class Server {
    base_url_crud_p_one = "https://52yoxhpmve.execute-api.us-east-1.amazonaws.com/dev"
    base_url_module_p_one = "https://csre5knms6.execute-api.us-east-1.amazonaws.com/dev"

    getProductoById = async (idProduct) => {
        const url = this.base_url_crud_p_one + "/products/" + idProduct
        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
        });
        return res;
    };

    getProductoDetailById = async (idProduct) => {
        const url = this.base_url_crud_p_one + "/products/detail/" + idProduct
        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
        });
        return res;
    };

    getAllProducts = async (nroPag, qrCode, productType, idSubProductType, deRequest, aRequest) => {
        var url = ""
        if (qrCode != undefined) {
            url = this.base_url_module_p_one + "/products-list-qr/" + nroPag + "/" + qrCode
        } else {
            var optional = ""
            if (idSubProductType != "") {
                optional = "idSubProductType=" + idSubProductType + "&"
            }
            if (deRequest != "") {
                optional += "deRequest=" + deRequest + "&"
            }

            if (aRequest != "") {
                optional += "aRequest=" + aRequest
            }

            url = this.base_url_crud_p_one + "/products/v2/" + nroPag + "/" + productType + "?" + optional
        }
        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
        });
        return res;
    };

    createProductBack = async (dataCreate) => {
        const url = this.base_url_crud_p_one + "/products/"
        const res = await axios.post(url, dataCreate).catch(function (error) {
            if (error.response) {
                return error.response;
            }
        });
        return res;

    }

    updateProductBack = async (dataUpdate, idProduct) => {
        const url = this.base_url_crud_p_one + "/products/" + idProduct
        const res = await axios.put(url, dataUpdate).catch(function (error) {
            if (error.response) {
                return error.response;
            }
        });
        return res;

    }

    deleteProductBack = async (idProduct) => {
        const url = this.base_url_crud_p_one + "/products/delete/" + idProduct
        const res = await axios.post(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
        });
        return res;

    }

    getQrById = async (idProduct) => {
        const url = this.base_url_module_p_one + "/products-qr/" + idProduct;
        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
        });
        return res;
    }

    getTipoProductoById = async (idTipoProducto) => {
        const url = this.base_url_crud_p_one + "/tipo-producto/" + idTipoProducto
        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
        });
        return res;
    };

    getUnidadMedidaById = async (idUnidadMedida) => {
        const url = this.base_url_crud_p_one + "/unidad-medida/" + idUnidadMedida
        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
        });
        return res;
    };

    getAllUnidadMedida = async () => {
        const url = this.base_url_crud_p_one + "/unidad-medida/"
        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
        });
        return res;
    };


    login = async (credentials) => {
        const url = this.base_url_module_p_one + "/loginv2/init" //"/login/"
        const res = await axios.post(url, credentials).catch(function (error) {
            if (error.response) {
                return error.response;
            }
        });
        return res;

    }


    getAllSubProductType = async (productType) => {

        var url = this.base_url_crud_p_one + "/sub-product-type/"
        if (productType != "") {
            url += "?productType=" + productType
        }
        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
        });
        return res;
    };


    getMedidaDe = async (subProductType) => {
        const url = this.base_url_crud_p_one + "/medida/de/" + subProductType;

        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
        });
        return res;
    };


    getMedidaA = async (subProductType) => {
        const url = this.base_url_crud_p_one + "/medida/a/" + subProductType;

        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
        });
        return res;
    };

    getMedidaAllByProduct = async (productType) => {
        const url = this.base_url_crud_p_one + "/medida/" + productType;

        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
        });
        return res;
    };


    getAllSocioClave = async (nroPag) => {
        const url = this.base_url_crud_p_one + "/socio-clave/" + nroPag
        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
        });
        return res;
    };


    getSocioClaveById = async (id) => {
        const url = this.base_url_crud_p_one + "/socio-clave/" + id
        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
        });
        return res;
    };


    getAllTipoSocio = async () => {
        const url = this.base_url_crud_p_one + "/tipo-socio/"
        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
        });
        return res;
    };


    getAllTipoDocumento = async () => {
        const url = this.base_url_crud_p_one + "/tipo-documento/"
        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
        });
        return res;
    };

    createSocio = async (dataCreate) => {
        const url = this.base_url_crud_p_one + "/socio-clave/"
        const res = await axios.post(url, dataCreate).catch(function (error) {
            if (error.response) {
                return error.response;
            }
        });
        return res;

    }

    updateSocio = async (dataUpdate, idSocio) => {
        const url = this.base_url_crud_p_one + "/socio-clave/" + idSocio
        const res = await axios.put(url, dataUpdate).catch(function (error) {
            if (error.response) {
                return error.response;
            }
        });
        return res;

    }

    deleteSocio = async (idSocio) => {
        const url = this.base_url_crud_p_one + "/socio-clave/delete/" + idSocio
        const res = await axios.post(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
        });
        return res;

    }


    getAllVentas = async (nroPag, fechaEmision, cliente, tipoComprobante, sunat, pagado) => {
        var url = this.base_url_crud_p_one + "/ventas?nroPag=" + nroPag
        if (fechaEmision != "") {
            url += "&fechaEmision=" + fechaEmision
        }

        if (cliente != "") {
            url += "&cliente=" + cliente
        }

        if (tipoComprobante != "") {
            url += "&tipoComprobante=" + tipoComprobante
        }

        if (sunat != "") {
            url += "&sunat=" + sunat
        }

        if (pagado != "") {
            url += "&pagado=" + pagado
        }
        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
        });
        return res;
    };


    updateVenta = async (dataUpdate, idVenta) => {
        const url = this.base_url_crud_p_one + "/ventas/" + idVenta
        const res = await axios.put(url, dataUpdate).catch(function (error) {
            if (error.response) {
                return error.response;
            }
        });
        return res;

    }



    getDetailVenta = async (id) => {
        const url = this.base_url_crud_p_one + "/ventas/detail/" + id
        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
        });
        return res;
    };


    devolucionRecibo = async (dataDevolucion) => {
        // console.log(dataDevolucion)
        const url = this.base_url_crud_p_one + "/devolucion/"
        const res = await axios.post(url, dataDevolucion).catch(function (error) {
            if (error.response) {
                return error.response;
            }
          });
        return res;
        // return {
        //     status: 200,
        //     data: {
        //         fecha_registro: "09/09/2024",
        //         nro_devolucion: "11",
        //         productos: [
        //             {
        //                 descripcion_producto: "PRUEBA 1",
        //                 cantidad: 1,
        //                 precio_unit: 10
        //             }
        //         ],
        //         total: 500
        //     }
        // }

    }

    anulacionRecibo = async (idVenta) => {
        const url = this.base_url_crud_p_one + "/devolucion/anulacion-total/" + idVenta
        const res = await axios.put(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
        });
        return res;

    }

    generateRecibo = async (dataRecibo) => {
        const url = this.base_url_module_p_one + "/recibo/finalizar"
        const res = await axios.post(url, dataRecibo).catch(function (error) {
            if (error.response) {
                return error.response;
            }
        });
        return res;

    }

    getNombresRazonByNroDoc = async (tipoDoc, nroDoc) => {
        const url = this.base_url_module_p_one + "/recibo/consulta-ruc/" + tipoDoc + "/" + nroDoc
        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
        });
        return res;
    };

}
export { Server };