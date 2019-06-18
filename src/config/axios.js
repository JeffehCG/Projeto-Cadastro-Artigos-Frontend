//Arquivo para verificação de erros de requisições axios (token expirado)
import axios from 'axios'

const success = res => res
const error = err => {
    if(401 === err.response.status){ //Se for erro 401 (acesso não autorizado, ou token expirado)
        window.location = '/' //Recarega a pagina ,e volta para login
    }else{
        return Promise.reject(err)
    }
}

axios.interceptors.response.use(success, error) //Interceptando erros e executando os metodos acima