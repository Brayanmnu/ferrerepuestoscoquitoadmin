import axios from 'axios';

class ProductoService {
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

    getAllProducts = async () => {
        const url = this.base_url + "/products"
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
}
export {ProductoService} ;