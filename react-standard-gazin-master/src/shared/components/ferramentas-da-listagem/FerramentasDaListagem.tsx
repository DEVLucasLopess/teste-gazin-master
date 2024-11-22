import { Box, Button, Icon, Paper, TextField, useTheme } from "@mui/material";
import FindInPageIcon from '@mui/icons-material/Search';
import { Environment } from "../../environment";

interface IFerramentasDaListagemProps {
    textoDaBusca?: string;
    mostarInputBusca?: boolean;
    aoMudarTextoDeBusca?: (novoTexto: string) => void;
    textoBotaoNovo?: string;
    mostrarBotaoNovo?: boolean;
    aoClicarNoBotaoNovo?: () => void;
}

export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({
    textoDaBusca = '', 
    mostarInputBusca = false,
    aoMudarTextoDeBusca,
    textoBotaoNovo = 'Novo',
    mostrarBotaoNovo = true,
    aoClicarNoBotaoNovo,
}) => {
  const theme = useTheme();
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
      {mostarInputBusca && (
        <TextField
        value={textoDaBusca}
        onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <Box marginTop="1" color="#c4c4c4" marginRight={1}>
                <FindInPageIcon />
              </Box>
            ),
          },
        }}
        size="small"
        placeholder={Environment.INPUT_DE_BUSCA}
      />
      )}
      <Box flex={1} display="flex" justifyContent="end">
        {mostrarBotaoNovo && (
            <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={aoClicarNoBotaoNovo}
            endIcon={<Icon>add</Icon>}
          >
            {textoBotaoNovo}
          </Button>
        )}
      </Box>
    </Box>
  );
};
