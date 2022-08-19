import React, { useState, useEffect, Fragment, Image} from "react";

import { ProductoService } from "../../services/ProductoService";

export default function ProductAdminQrModal(props) {

    const productoService = new ProductoService();
    const [imgDisplay, setImgDisplay] = useState('');
    async function getBase64ById(idProduct) {
        const productoBase64 =  await productoService.getQrById(idProduct);
        if(productoBase64.status=200){
            const productoBase64Json = await productoBase64.data;
            var base64Data = productoBase64Json.result;
            base64Data = "data:image/jpg;base64,"+base64Data;
            setImgDisplay(
                <img class="card-img-top" src={base64Data}  />
            )
        }
    }

    useEffect(() => {
        getBase64ById(props.idProductoQr);
    }, [,]);
    

    return(
        <Fragment>
            {imgDisplay}
        </Fragment>);
}