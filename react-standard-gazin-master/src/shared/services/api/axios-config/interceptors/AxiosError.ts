import { AxiosError } from "axios";

export const errorInterceptor = (error: AxiosError) => {

    if (error.message === "Network Error") {
       return Promise.reject("Erro de conexão com o servidor");
    }

    if (error.response?.status === 401) {
        return Promise.reject("Não autorizado");
    }

    if (error.response?.status === 403) {
        return Promise.reject("Proibido");
    }

    if (error.response?.status === 404) {
        return Promise.reject("Não encontrado");
    }

    if (error.response?.status === 500) {
        return Promise.reject("Erro interno do servidor");
    }

    return Promise.reject(error);
} 