import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface IListagemDePessoas {
  id: number;
  nivel_id: number;
  nome: string;
  sexo: string;
  data_nascimento: string;
  hobby: string;
  nivel: string;
  idade: number;
}

export interface IDetalhePessoas {
  id: number;
  nivel_id: number;
  nome: string;
}

type TPessoasComTotalCount = {
  data: IListagemDePessoas[];
  totalCount: number;
  dataTotalItems: number;
};

const getAll = async (
  page = 1,
  filter = ""
): Promise<TPessoasComTotalCount | Error> => {
  try {
    const url = `/desenvolvedores?pagina=${page}&limite=${Environment.LIMITE_DE_LINHAS}&nivel=${filter}`; 
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
    return new Error("Erro ao listar os registros!");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as Error).message || "Erro ao listar os registros!"
    );
  }
};

const getById = async (id: number): Promise<IDetalhePessoas | Error> => {
  try {
    const { data } = await Api.get(`/desenvolvedor/${id}`);
    if (data) {
      return data;
    }
    return new Error("Erro ao listar os registros!");
  } catch (error) {
    console.error(error);
    return new Error((error as Error).message || "Erro ao consultar registro!");
  }
};

const create = async ( dados: Omit<IDetalhePessoas, "id">): Promise<number | Error> => {
  try {
    const { data } = await Api.post(`/desenvolvedores`, dados);
    if (data) {
      return data.id;
    }
    return new Error("Erro ao criar registro!");
  } catch (error) {
    console.error(error);
    return new Error((error as Error).message || "Erro ao criar o registro!");
  }
};

const updateById = async (
  id: number,
  dados: IDetalhePessoas
): Promise<void | Error> => {
  try {
    console.log("dados>>>>>>>>>>>>>>>>>>>>>>>", dados);
    await Api.put(`/desenvolvedor/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as Error).message || "Erro ao atualizar o registro!"
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/desenvolvedores/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as Error).message || "Erro ao apagar o registro!");
  }
};

export const PessoasService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
