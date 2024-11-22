import { useNavigate, useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import Swal from 'sweetalert2'
import { useEffect, useMemo, useState } from "react";
import {
  IListagemDePessoas,
  PessoasService,
} from "../../shared/services/api/pessoas/PessoasServices";
import { useDebouce } from "../../shared/hooks";
import {
  Icon,
  IconButton,
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { Environment } from "../../shared/environment";
import { format } from "date-fns";

export const ListagemDePessoas: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rows, setRows] = useState<IListagemDePessoas[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { debounce } = useDebouce();

  const busca = useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get("pagina") || "1");
  }, [searchParams]);

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Você tem certeza?",
      text: "Essa ação não poderá ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#1e2733",
      confirmButtonText: "Sim, apagar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        PessoasService.deleteById(id).then((result) => {
          if (result instanceof Error) {
            Swal.fire({
              title: "Erro!",
              text: result.message,
              icon: "error",
              confirmButtonText: "OK",
            });
          } else {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            });
            Toast.fire({
              icon: "success",
              title: "O registro foi excluído com sucesso!",
            });
            setRows(rows.filter((row) => row.id !== id));
          }
        });
      } 
    });
  };

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      PessoasService.getAll(pagina, busca).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setTotalCount(result.dataTotalItems);
          setRows(result.data);
        }
      });
    });
  }, [busca, pagina]);

  return (
    <LayoutBaseDePagina
      titulo="Listagem de programadores"
      barrasDeFerramentas={
        <FerramentasDaListagem
          textoBotaoNovo="Nova"
          mostarInputBusca
          aoClicarNoBotaoNovo={() => navigate('/desenvolvedores/nova')}
          textoDaBusca={busca}
          aoMudarTextoDeBusca={(texto) =>
            setSearchParams({ busca: texto, pagina: "1" }, { replace: true })
          }
        />
      }
    >
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ m: 1, width: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Nome completo</TableCell>
              <TableCell>sexo</TableCell>
              <TableCell>data de nascimento</TableCell>
              <TableCell>idade</TableCell>
              <TableCell>hobby</TableCell>
              <TableCell>nivel</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton size="small" onClick={() => handleDelete(row.id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton size="small" onClick={() => navigate(`/desenvolvedores/${row.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.nome}</TableCell>
                <TableCell>{row.sexo}</TableCell>
                <TableCell>{format(new Date(row.data_nascimento), 'dd/MM/yyyy')}</TableCell>
                <TableCell>{row.idade} anos</TableCell>
                <TableCell>{row.hobby}</TableCell>
                <TableCell>{row.nivel}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          {totalCount === 0 && !isLoading && (
            <caption>{Environment.LISTAGEM_VAZIA}</caption>
          )}

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={8}>
                  <LinearProgress
                    variant="indeterminate"
                    sx={{ width: "auto" }}
                  />
                </TableCell>
              </TableRow>
            )}

            {totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    page={pagina}
                    count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                    onChange={(_, newPage) => {
                      setSearchParams(
                        { busca, pagina: newPage.toString() },
                        { replace: true }
                      );
                    }}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBaseDePagina>
  );
};
