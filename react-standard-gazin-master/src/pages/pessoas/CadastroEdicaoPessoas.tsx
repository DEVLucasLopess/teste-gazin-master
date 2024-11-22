import React, { useEffect, useState } from "react";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useNavigate, useParams } from "react-router-dom";
import { FerramentasDeDetalhe } from "../../shared/components";
import * as yup from "yup";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasServices";
import Swal from "sweetalert2";
import { VTextField, VForm, useVForm } from "../../shared/forms";
import Grid from "@mui/material/Grid";
import { Box, Grid2, LinearProgress, Paper, Typography } from "@mui/material";
import { AutoCompleteNiveis } from "./AutoCompleteNiveis";

interface IHandleSalvar {
  nome: string;
  nivelId: number;
}

const formValidationSchema: yup.Schema<IHandleSalvar> = yup.object().shape({
  nivelId: yup
    .number()
    .typeError("")
    .required("Este campo é obrigatorio e deve ser um valor númerico!"),
  nome: yup
    .string()
    .required('O campo "Nome" é obrigatório!')
    .min(3, 'O campo "Nome" deve ter no mínimo 3 caracteres!'),
  sexo: yup.string().required("Campo sexo é obrigatorio!"),
  data_nascimento: yup
    .string()
    .required("Campo data de nascimento é obrigatorio!"),
  hobby: yup.string().required("Campo hobby é obrigatorio!"),
  idade: yup
    .number()
    .typeError("Este campo é obrigatorio e deve ser um valor númerico!")
    .required("Este campo é obrigatorio e deve ser um valor númerico!"),
});

export const CadastroEdicaoPessoas: React.FC = () => {
  const { id = "nova" } = useParams<"id">();
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");
  const navigate = useNavigate();
  const { formRef } = useVForm();

  useEffect(() => {
    if (id !== "nova") {
      setIsLoading(true);
      PessoasService.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          Swal.fire({
            title: "Erro!",
            text: result.message,
            icon: "error",
            confirmButtonText: "OK",
          });
          navigate("/desenvolvedores");
        } else {
          setNome(result.nome);
          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        nome: "",
        cidadeId: "",
        data_nascimento: "",
        hobby: "",
        idade: "",
        sexo: "",

      });
    }
  }, [id]);

  const handleDelete = (id: number) => {
    Swal.fire({
      title: `Você tem certeza que deseja apagar ${nome}?`,
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
            navigate("/desenvolvedores");
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
              title: `A pessoa ${nome} foi excluído com sucesso!`,
            });
            navigate("/desenvolvedores");
          }
        });
      }
    });
  };

  const handleSalvar = (dados: IHandleSalvar) => {
    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);
        if (id === "nova") {
          PessoasService.create(dadosValidados).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              Swal.fire({
                title: "Erro!",
                text: result.message,
                icon: "error",
                confirmButtonText: "OK",
              });
            } else {
              Swal.fire({
                title: "Sucesso!",
                text: "Registro criado com sucesso!",
                icon: "success",
                confirmButtonText: "OK",
              }).then(() => {
                navigate(`/desenvolvedores`);
              });
            }
          });
        } else {
          setIsLoading(true);
          PessoasService.updateById(Number(id), {
            id: Number(id),
            ...dadosValidados,
          }).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              Swal.fire({
                title: "Erro!",
                text: result.message,
                icon: "error",
                confirmButtonText: "OK",
              }).then(() => {
                navigate(`/desenvolvedores`);
              });
            } else {
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                },
              });
              Toast.fire({
                icon: "success",
                title: `Alteração feita com sucesso!`,
              }).then(() => {
                navigate(`/desenvolvedores`);
              });
            }
          });
        }
      })
      .catch((error: yup.ValidationError) => {
        const validationError: { [key: string]: string } = {};

        error.inner.forEach((error) => {
          if (!error.path) return;
          validationError[error.path] = error.message;
        });

        formRef.current?.setErrors(validationError);
      });
  };

  return (
    <LayoutBaseDePagina
      titulo={id === "nova" ? "Nova Pessoa" : nome}
      barrasDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoApagar={id !== "nova"}
          mostrarBotaoNovo={id !== "novo"}
          aoClicarSalvar={() => formRef.current?.submitForm()}
          aoClicarSalvarEFechar={() => formRef.current?.submitForm()}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => navigate("/desenvolvedores/nova")}
          aoClicarEmVoltar={() => navigate("/desenvolvedores")}
        />
      }
    >
      <>
        <VForm
          ref={formRef}
          onSubmit={handleSalvar}
          placeholder=""
          onPointerEnterCapture={null}
          onPointerLeaveCapture={null}
        >
          <Box
            margin={1}
            display="flex"
            flexDirection="column"
            component={Paper}
            variant="outlined"
            width="auto"
          >
            <Grid2
              container
              direction="column"
              padding={2}
              spacing={2}
              component="div"
            >
              <Grid2>
                {isLoading && (
                  <Box>
                    <LinearProgress variant="indeterminate" />
                  </Box>
                )}
              </Grid2>

              <Grid2>
                <Typography variant="h6"> Dados </Typography>
              </Grid2>

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={6} sm={12} md={6} lg={6} xl={4}>
                  <VTextField
                    fullWidth
                    name="nome"
                    label="Digite seu nome completo"
                    disabled={isLoading}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </Grid>
              </Grid>

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={6} sm={12} md={6} lg={6} xl={4}>
                  <VTextField
                    fullWidth
                    name="sexo"
                    label="Digite seu sexo"
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={6} sm={12} md={6} lg={6} xl={4}>
                  <VTextField
                    fullWidth
                    name="data_nascimento"
                    placeholder="Data Nascimento"
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={6} sm={12} md={6} lg={6} xl={4}>
                  <VTextField
                    fullWidth
                    name="hobby"
                    label="Digite seu hobby"
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={4}>
                  <VTextField
                    fullWidth
                    name="idade"
                    type="number"
                    label="Digite sua idade"
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={4}>
                  <AutoCompleteNiveis sternalLoading={isLoading} />
                </Grid>
              </Grid>
            </Grid2>
          </Box>
        </VForm>
      </>
    </LayoutBaseDePagina>
  );
};
