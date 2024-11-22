import {
  Box,
  Icon,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Theme,
} from "@mui/material";
import { ReactNode } from "react";
import { useDrawerContext } from "../contexts";

interface LayoutBaseDePaginaProps {
  children: React.ReactNode;
  titulo: string;
  barrasDeFerramentas?: ReactNode;
}

export const LayoutBaseDePagina: React.FC<LayoutBaseDePaginaProps> = ({
  children,
  titulo,
  barrasDeFerramentas,
}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const theme = useTheme();
  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box
        padding={1}
        gap={1}
        height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}
        display="flex"
        alignItems="center"
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}

        <Typography whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'}>
          {titulo}
        </Typography>
      </Box>

      {barrasDeFerramentas && <Box>{barrasDeFerramentas}</Box>}

      <Box flex={1}>{children}</Box>
    </Box>
  );
};
