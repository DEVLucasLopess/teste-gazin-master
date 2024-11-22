import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { NiveisService } from "../../shared/services/api/niveis/NiveisService";
import Swal from "sweetalert2";
import { useDebouce } from "../../shared/hooks";
import { useField } from "@unform/core";

type IAutoCompleteNivel = {
  label: string;
  id: number;
};

type ISternalLoadingType = {
  sternalLoading: boolean;
};

export const AutoCompleteNiveis: React.FC<ISternalLoadingType> = ({
  sternalLoading = false,
}) => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField("nivelId");
  const [opcoes, setOpcoes] = useState<IAutoCompleteNivel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectValue, setSelectValue] = useState<number | undefined>(defaultValue);
  const [busca, setBusca] = useState<string>("");
  const { debounce } = useDebouce();

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectValue,
      setValue: (_, newSelectValue) => setSelectValue(newSelectValue),
    });
  }, [registerField, selectValue]);

  useEffect(() => {
    debounce(() => {
      setLoading(true);
      NiveisService.getAll(1, busca).then((result) => {
        if (result instanceof Error) {
          Swal.fire({
            title: "Erro!",
            text: result.message,
            icon: "error",
            confirmButtonText: "OK",
          });
          setLoading(false);
          return;
        } else {
          setOpcoes(
            result.data.map((nivel) => ({
              label: nivel.nome,
              id: nivel.id,
            }))
          );
          setLoading(false);
          return result;
        }
      });
    });
  }, [busca]);

  const autoCompleteSelectedOption = useMemo(() => {
    const selectedOption = opcoes.find((option) => option.id === selectValue);
    if (!selectValue) return null;
    return selectedOption;
  }, [selectValue, opcoes]);

  return (
    <>
      <Autocomplete
        noOptionsText="Nivel não encontrado"
        value={autoCompleteSelectedOption}
        loading={loading}
        popupIcon={
          loading || sternalLoading ? <CircularProgress size={28} /> : undefined
        }
        onInputChange={(_, newValue) => setBusca(newValue)}
        options={opcoes}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Nivel"
            error={!!error}
            helperText={error}
            variant="outlined"
            fullWidth
          />
        )}
        onChange={(_, value) => {
          setSelectValue(value?.id);
          setBusca("");
          clearError();
        }}
      />
    </>
  );
};
