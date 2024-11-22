import {
  useMediaQuery,
  Box,
  Button,
  Divider,
  Icon,
  Paper,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";

interface IFerramentasDeDetalheProps {
  textoBotaoNovo?: string;

  mostrarBotaoNovo?: boolean;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoApagar?: boolean;
  mostrarBotaoSalvar?: boolean;
  mostrarBotaoSalvarEFechar?: boolean;

  mostrarBotaoSalvarCarregando?: boolean;
  mostrarBotaoApagarCarregando?: boolean;
  mostrarBotaoVoltarCarregando?: boolean;
  mostrarBotaoNovoCarregando?: boolean;
  monstrarBotaoSalvarEFecharCarregando?: boolean;

  aoClicarEmNovo?: () => void;
  aoClicarEmVoltar?: () => void;
  aoClicarEmApagar?: () => void;
  aoClicarSalvar?: () => void;
  aoClicarSalvarEFechar?: () => void;
}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
  textoBotaoNovo = "Novo",

  mostrarBotaoNovo = true,
  mostrarBotaoVoltar = true,
  mostrarBotaoApagar = true,
  mostrarBotaoSalvar = true,
  mostrarBotaoSalvarEFechar = false,

  mostrarBotaoSalvarCarregando = false,
  mostrarBotaoApagarCarregando = false,
  mostrarBotaoVoltarCarregando = false,
  mostrarBotaoNovoCarregando = false,
  monstrarBotaoSalvarEFecharCarregando = false,

  aoClicarEmNovo,
  aoClicarSalvar,
  aoClicarSalvarEFechar,
  aoClicarEmApagar,
  aoClicarEmVoltar,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  
  textoBotaoNovo = "Novo";

  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      alignItems="center"
      height={theme.spacing(5)}
      component={Paper}
      display="flex"
    >
      {mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando && (
        <Button
          variant="contained"
          onClick={aoClicarSalvar}
          color="primary"
          disableElevation
          startIcon={<Icon>save</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Salvar
          </Typography>
        </Button>
      )}
      {mostrarBotaoSalvarCarregando && <Skeleton width={110} height={60} />}

      {(mostrarBotaoSalvarEFechar && !monstrarBotaoSalvarEFecharCarregando && !smDown && !mdDown) && (
        <Button
          onClick={aoClicarSalvarEFechar}
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>save</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Salvar e fechar
          </Typography>
        </Button>
      )}

      {monstrarBotaoSalvarEFecharCarregando && !smDown && !mdDown && (
        <Skeleton width={180} height={60} />
      )}

      {mostrarBotaoApagar && !mostrarBotaoApagarCarregando && (
        <Button
          onClick={aoClicarEmApagar}
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>delete</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Apagar
          </Typography>
        </Button>
      )}

      {mostrarBotaoApagarCarregando && <Skeleton width={110} height={60} />}

      {mostrarBotaoNovo && !mostrarBotaoVoltarCarregando && !smDown && (
        <Button
          onClick={aoClicarEmNovo}
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>add</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            { textoBotaoNovo }
          </Typography>
        </Button>
      )}

      {mostrarBotaoNovoCarregando && !smDown && (
        <Skeleton width={110} height={60} />
      )}
      
      {mostrarBotaoVoltar && (mostrarBotaoApagar || mostrarBotaoSalvarEFechar || mostrarBotaoNovo || mostrarBotaoSalvar) && (<Divider variant="middle" orientation="vertical" flexItem />)}

      {mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando && (
        <Button
          onClick={aoClicarEmVoltar}
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>arrow_back</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Voltar
          </Typography>
        </Button>
      )}

      {mostrarBotaoVoltarCarregando && <Skeleton width={110} height={60} />}
    </Box>
  );
};
