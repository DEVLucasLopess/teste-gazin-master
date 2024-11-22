import { FormHandles } from "@unform/core";
import { useCallback, useRef } from "react";

export const useVForm = () => {
  const formRef = useRef<FormHandles>(null);
  
  const isSavingAndNew = useRef(false);
  const isSavingAndClose = useRef(false);

  const handleSava = useCallback(() => {
    formRef.current?.submitForm();
    isSavingAndNew.current = false;
    formRef.current?.submitForm();
  }, []);

  const handleSavaAndNew = useCallback(() => {
    isSavingAndNew.current = true;
    isSavingAndClose.current = false;
    formRef.current?.submitForm();
  }, []);

  const handleSavaAndClose = useCallback(() => {
    isSavingAndNew.current = true;
    isSavingAndClose.current = false;
    formRef.current?.submitForm();
  }, []);


  const handleIsSaveAndNew = useCallback(() => {
    return isSavingAndNew.current;
  }, []);

  const handleisSaveAndClose = useCallback(() => {
    return isSavingAndClose.current;
  }, []);

  return {
    formRef,
    save: handleSava,
    saveAndNew: handleSavaAndNew,
    saveEnClose: handleSavaAndClose,

    isSaveAndNew: handleIsSaveAndNew,
    isSaveAndClose: handleisSaveAndClose,
  };
};
