import axios from 'axios';

class UserService {
    base_url = "https://ferrerepuestoscoquitoback.herokuapp.com";

    login = async (credentials) => {
        const url = this.base_url + "/login"
        const res = await axios.post(url,credentials).catch(function (error) {
            if (error.response) {
                return error.response;
            }
          });
        return res;
        
    }

}
export {UserService} ;