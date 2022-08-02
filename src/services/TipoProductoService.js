import axios from 'axios';

class TipoProductoService {
    base_url = "https://ferrerepuestoscoquitoback.herokuapp.com";

    getTipoProductoById = async (idTipoProducto) => {
        const url = this.base_url + "/tipo-producto/"+idTipoProducto
        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
          });
        return res;
    };

    getAllTipoProducto = async () => {
        const url = this.base_url + "/tipo-producto"
        const res = await axios.get(url).catch(function (error) {
            if (error.response) {
                return error.response;
            }
          });
        return res;
    };
}
export {TipoProductoService} ;