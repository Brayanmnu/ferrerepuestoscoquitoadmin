import axios from 'axios';

class UnidadMedidaService {
    base_url = "https://ferrerepuestoscoquitoback.herokuapp.com";

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

}
export {UnidadMedidaService} ;