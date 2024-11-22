import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface IListagemDeNivel {
  id: number;
  nome: string;
}

export interface IDetalheNivel {
  id: number;
  nome: string;
}

type TNivelComTotalCount = {
  data: IListagemDeNivel[];
  totalCount: number;
  dataTotalItems: number;
};

const getAll = async (
  page = 2,
  filter = ""
): Promise<TNivelComTotalCount | Error> => {
  try {
    const url = `/niveis?pagina=${page}&limite=${Environment.LIMITE_DE_LINHAS}&nivel=${filter}`;  
    const { data, headers } = await Api.get(url);
    const dataValue = data.data;
    const dataTotalItems = data.total;
    if (dataValue) {
      return {
        data: dataValue,
        dataTotalItems,
        totalCount: Number(
          headers["x-total-count"] || Environment.LIMITE_DE_LINHAS
        ),
      };
    }
    return new Error("Erro ao listar os registros! 1");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as Error).message || "Erro ao listar os registros! "
    );
  }
};

const getById = async (id: number): Promise<IDetalheNivel | Error> => {
  try {
    const { data } = await Api.get(`/nivel/${id}`);
    if (data) {
      return data;
    }
    return new Error("Erro ao listar os registros! 3");
  } catch (error) {
    console.error(error);
    return new Error((error as Error).message || "Erro ao consultar registro! 4");
  }
};

const create = async (
  dados: Omit<IDetalheNivel, "id">
): Promise<number | Error> => {
  try {
    const { data } = await Api.post(`/nivel`, dados);
    if (data) {
      return data.id;
    }
    return new Error("Erro ao criar registro! 5");
  } catch (error) {
    console.error(error);
    return new Error((error as Error).message || "Erro ao criar o registro! 6");
  }
};

const updateById = async (
  id: number,
  dados: IDetalheNivel
): Promise<void | Error> => {
  try {
    await Api.put(`/nivel/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as Error).message || "Erro ao atualizar o registro! 7"
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/nivel/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as Error).message || "Erro ao apagar o registro! 8");
  }
};

export const NiveisService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
