import axios from 'axios';

class Server {
    base_url = "https://ferrerepuestoscoquitoback.herokuapp.com";

    getProductoById = async (idProduct) => {
        const url = this.base_url + "/products/"+idProduct
        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
          });
        return res;
    };

    getProductoDetailById = async (idProduct) => {
        const url = this.base_url + "/products/detail/"+idProduct
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

        const url = this.base_url + "/products/v2/"+nroPag+"/"+productType+"?"+optional
        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
          });
        return res;
    };

    createProductBack = async (dataCreate) => {
        const url = this.base_url + "/products"
        const res = await axios.post(url,dataCreate).catch(function (error) {
            if (error.response) {
                return error.response;
            }
          });
        return res;
        
    }

    updateProductBack = async (dataUpdate, idProduct) => {
        const url = this.base_url + "/products/"+idProduct
        const res = await axios.put(url,dataUpdate).catch(function (error) {
            if (error.response) {
                return error.response;
            }
          });
        return res;
        
    }

    deleteProductBack = async (idProduct) => {
        const url = this.base_url + "/products/delete/"+idProduct
        const res = await axios.post(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
          });
        return res;
        
    }
    
    getQrById = async (idProduct) => {
        const url = this.base_url + "/products-qr/"+idProduct;
        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
          });
        return res;
    }

    getTipoProductoById = async (idTipoProducto) => {
        const url = this.base_url + "/tipo-producto/"+idTipoProducto
        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
          });
        return res;
    };

    getUnidadMedidaById = async (idUnidadMedida) => {
        const url = this.base_url + "/unidad-medida/"+idUnidadMedida
        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
          });
        return res;
    };

    getAllUnidadMedida = async () => {
        const url = this.base_url + "/unidad-medida"
        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
          });
        return res;
    };

    
    login = async (credentials) => {
        const url = this.base_url + "/login"
        const res = await axios.post(url,credentials).catch(function (error) {
            if (error.response) {
                return error.response;
            }
          });
        return res;
        
    }

    
    getAllSubProductType = async (productType) => {
        
        var url = this.base_url + "/sub-product-type"
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
        const url = this.base_url + "/medida/de/"+subProductType;
        
        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
          });
        return res;
    };

     
    getMedidaA = async (subProductType) => {
        const url = this.base_url + "/medida/a/"+subProductType;
        
        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
          });
        return res;
    };

    getMedidaAllByProduct = async (productType) => {
        const url = this.base_url + "/medida/"+productType;
        
        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
          });
        return res;
    };
}
export {Server} ;