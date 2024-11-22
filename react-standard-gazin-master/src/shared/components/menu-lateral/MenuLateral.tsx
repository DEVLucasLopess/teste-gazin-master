import {
  Box,
  Divider,
  Drawer,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ReactNode } from "react";
import { useAppThemeContext, useDrawerContext } from "../../contexts";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import img from "../../../assets/gazinDark.svg";

interface MenuLateralProps {
  children: ReactNode;
}

interface ListItemLinkProps {
  icon: string;
  label: string;
  to: string;
  onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<ListItemLinkProps> = ({
  icon,
  label,
  onClick,
  to,
}) => {
  const resolvePath = useResolvedPath(to);
  const macth = useMatch({ path: resolvePath.pathname, end: false });

  const navigate = useNavigate();
  const HandleClick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <ListItemButton selected={!!macth} onClick={HandleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export const MenuLateral = ({ children }: MenuLateralProps) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();
  const { toggleTheme } = useAppThemeContext();

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        onClose={toggleDrawerOpen}
        variant={smDown ? "temporary" : "permanent"}
      >
        <Box
          width={theme.spacing(28)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              component="img"
              sx={{
                width: 180,
                height: 180,
              }}
              sizes="10"
              src={img}
              alt="Minha imagem"
            />
          </Box>

          <Divider />

          <Box flex={1}>
            <List component="nav">
              {drawerOptions.map((drawerOption) => (
                <ListItemLink
                  key={drawerOption.path}
                  icon={drawerOption.icon}
                  label={drawerOption.label}
                  to={drawerOption.path}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>
          <Box>
            <ListItemButton onClick={toggleTheme}>
              <ListItemIcon>
                <Box marginBottom="0.5">
                  <Icon>dark_mode</Icon>
                </Box>
              </ListItemIcon>
              <ListItemText primary="Alternar tema" />
            </ListItemButton>
          </Box>
        </Box>
      </Drawer>
      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
