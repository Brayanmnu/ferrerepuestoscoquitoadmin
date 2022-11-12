import axios from 'axios';

class Server {
    base_url_crud_p_one = "https://52yoxhpmve.execute-api.us-east-1.amazonaws.com/dev"
    base_url_module_p_one ="https://csre5knms6.execute-api.us-east-1.amazonaws.com/dev"

    getProductoById = async (idProduct) => {
        const url = this.base_url_crud_p_one + "/products/"+idProduct
        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
          });
        return res;
    };

    getProductoDetailById = async (idProduct) => {
        const url = this.base_url_crud_p_one + "/products/detail/"+idProduct
        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
          });
        return res;
    };
    
    getAllProducts = async (nroPag,productType,idSubProductType,deRequest,aRequest) => {
        var optional=""
        if (idSubProductType!=""){
            optional ="idSubProductType="+idSubProductType+"&"
        }
        if(deRequest!=""){
            optional +="deRequest="+deRequest+"&"
        }

        if(aRequest!=""){
            optional +="aRequest="+aRequest
        }

        const url = this.base_url_crud_p_one + "/products/v2/"+nroPag+"/"+productType+"?"+optional
        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
          });
        return res;
    };

    createProductBack = async (dataCreate) => {
        const url = this.base_url_crud_p_one + "/products/"
        const res = await axios.post(url,dataCreate).catch(function (error) {
            if (error.response) {
                return error.response;
            }
          });
        return res;
        
    }

    updateProductBack = async (dataUpdate, idProduct) => {
        const url = this.base_url_crud_p_one + "/products/"+idProduct
        const res = await axios.put(url,dataUpdate).catch(function (error) {
            if (error.response) {
                return error.response;
            }
          });
        return res;
        
    }

    deleteProductBack = async (idProduct) => {
        const url = this.base_url_crud_p_one + "/products/delete/"+idProduct
        const res = await axios.post(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
          });
        return res;
        
    }
    
    getQrById = async (idProduct) => {
        const url = this.base_url_module_p_one + "/products-qr/"+idProduct;
        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
          });
        return res;
    }

    getTipoProductoById = async (idTipoProducto) => {
        const url = this.base_url_crud_p_one + "/tipo-producto/"+idTipoProducto
        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
          });
        return res;
    };

    getUnidadMedidaById = async (idUnidadMedida) => {
        const url = this.base_url_crud_p_one + "/unidad-medida/"+idUnidadMedida
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
        const url = this.base_url_module_p_one + "/login/"
        const res = await axios.post(url,credentials).catch(function (error) {
            if (error.response) {
                return error.response;
            }
          });
        return res;
        
    }

    
    getAllSubProductType = async (productType) => {
        
        var url = this.base_url_crud_p_one + "/sub-product-type/"
        if (productType!=""){
            url +="?productType="+productType
        }
        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
          });
        return res;
    };

     
    getMedidaDe = async (subProductType) => {
        const url = this.base_url_crud_p_one + "/medida/de/"+subProductType;
        
        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
          });
        return res;
    };

     
    getMedidaA = async (subProductType) => {
        const url = this.base_url_crud_p_one + "/medida/a/"+subProductType;
        
        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
          });
        return res;
    };

    getMedidaAllByProduct = async (productType) => {
        const url = this.base_url_crud_p_one + "/medida/"+productType;
        
        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
          });
        return res;
    };

    
    getAllSocioClave = async (nroPag) => {
        const url = this.base_url_crud_p_one + "/socio-clave/"+nroPag
        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
          });
        return res;
    };

       
    getSocioClaveById = async (id) => {
        const url = this.base_url_crud_p_one + "/socio-clave/"+id
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
        const res = await axios.post(url,dataCreate).catch(function (error) {
            if (error.response) {
                return error.response;
            }
          });
        return res;
        
    }

    updateSocio = async (dataUpdate, idSocio) => {
        const url = this.base_url_crud_p_one + "/socio-clave/"+idSocio
        const res = await axios.put(url,dataUpdate).catch(function (error) {
            if (error.response) {
                return error.response;
            }
          });
        return res;
        
    }

    deleteSocio = async (idSocio) => {
        const url = this.base_url_crud_p_one + "/socio-clave/delete/"+idSocio
        const res = await axios.post(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
          });
        return res;
        
    }
    
    
    getAllVentas = async (nroPag) => {
        const url = this.base_url_module_p_one + "/ventas/"+nroPag
        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
          });
        return res;
    };

    
    anularRecibo = async (idRecibo) => {
        const url = this.base_url_module_p_one + "/ventas/"+idRecibo
        const res = await axios.post(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
          });
        return res;
        
    }

}
export {Server} ;