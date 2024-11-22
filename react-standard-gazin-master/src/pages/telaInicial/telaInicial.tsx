import { Box } from "@mui/material";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDaListagem } from "../../shared/components";

export const TelaInicial = () => {
  return (
    <Box>
      <LayoutBaseDePagina
        titulo="Página Inicial"
        barrasDeFerramentas={<FerramentasDaListagem />}>
        <></>
      </LayoutBaseDePagina>
    </Box>
  );
};
