import { Routes, Route } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts";
import { useEffect } from "react";
import { ListagemDePessoas, CadastroEdicaoPessoas, CadastroEdicaoNiveis, ListagemDeNiveis } from "../pages";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'people',
        label: 'Programadores',
        path: '/pessoas',
        onClick: undefined,
      },
      {
        icon: 'home',
        label: 'Nivel de Conhecimento',
        path: '/niveis',
        onClick: undefined,
      },
    ]);
  }, [setDrawerOptions]);

  return (
    <Routes>
      <Route path="/pessoas" element={<ListagemDePessoas />} />
      <Route path="/desenvolvedores/:id" element={<CadastroEdicaoPessoas />} />

      <Route path="/niveis" element={< ListagemDeNiveis />} />
      <Route path="/nivel/:id" element={<CadastroEdicaoNiveis />} />

      <Route path="*" element={<ListagemDePessoas />} />
    </Routes>
  );
};