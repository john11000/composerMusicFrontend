import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { InvoicesEditDialogCustumer } from "../components/InvoicesEditDialogCustomer";
import { useForm } from "react-hook-form";
import { Iinvoices, User } from "../models/Invoices.type";
import { InvoicesFormEdit } from "../components/InvoicesFormEdit";
import { InvoicesEditDialogReferences } from "../components/InvoicesEditDialogReferences";
import { useInvoicesContext } from "../context/Invoices.context";
import { useEffect } from "react";

const steps = [
  "Información del cliente",
  "Información básica de la factura",
  "Referencias de la factura",
];
type props = {
  setActiveButton?: React.Dispatch<React.SetStateAction<boolean>>;
  openEditInvoiceDialogState: boolean;
};
export const CreateinvoiceContainer: React.FC<props> = ({
  setActiveButton,
  openEditInvoiceDialogState,
}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const { setInvoiceToEdit, isEdit, invoiceToEdit } = useInvoicesContext();
  const [StepChange, setStepChange] = React.useState<number | undefined>(
    undefined
  );
  const [completed, setCompleted] = React.useState<boolean>(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    reset,
  } = useForm<Iinvoices>();

  const {
    control: controlCustomer,
    watch: watchCustomer,
    handleSubmit: handleSubmitCustomer,
    setValue: setValueCustomer,
  } = useForm<User>();

  const isStepOptional = (step: number) => {
    return step === -1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleSubmitCustomerForm = (data: User) => {
    setActiveButton && setActiveButton(false);
    if (invoiceToEdit) {
      setActiveButton && isEdit && setActiveButton(true);
      setInvoiceToEdit({
        ...invoiceToEdit,
        userId: parseInt(data?.drpSelectCustomer?.value || "0") || 0,
      });
    }
    validateIsStepChange();
  };

  const handleSubmitInovicesForm = (data: Iinvoices) => {
    setActiveButton && setActiveButton(true);
    if (invoiceToEdit) {
      setInvoiceToEdit({
        ...invoiceToEdit,
        ...data,
        dateOfPurchase: data?.dateOfPurchase
          ? new Date(data?.dateOfPurchase).toISOString()
          : new Date().toISOString(),
        distributorId: parseInt(data?.auxDrpDistributor?.value || "0") || 0,
      });
    }
    validateIsStepChange();
  };

  const handleNext = (step?: number) => {
    if (step) {
      setActiveStep(step);
    } else {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleStep = (step: number) => () => {
    setStepChange(step);
    if ((StepChange !== undefined && StepChange < activeStep) || completed) {
      setActiveStep(step);
      setStepChange(undefined);
    } else {
      validate();
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const validate = () => {
    if (activeStep === 0) {
      return handleSubmitCustomer(handleSubmitCustomerForm)();
    } else if (activeStep === 1) {
      return handleSubmit(handleSubmitInovicesForm)();
    }
    setCompleted(true);
  };

  const validateIsStepChange = () => {
    if (StepChange !== undefined && (StepChange < activeStep || completed)) {
      setActiveStep(StepChange);
      setStepChange(undefined);
    } else {
      handleNext();
    }
  };

  useEffect(() => {
    reset();
    if (!invoiceToEdit) {
      setInvoiceToEdit({} as Iinvoices);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (openEditInvoiceDialogState) {
      reset();
      setActiveStep(0);
      setCompleted(false);
      setStepChange(undefined);
    } else {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openEditInvoiceDialogState]);

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel nonLinear>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Opcional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step
              key={label}
              {...stepProps}
              sx={{ cursor: "pointer" }}
              onClick={handleStep(index)}
            >
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Todos los datos han sido completados, de en guardar para almacenar
            la factura.
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Volver a iniciar</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep === 0 && (
            <InvoicesEditDialogCustumer
              control={controlCustomer}
              watch={watchCustomer}
              setValue={setValueCustomer}
            />
          )}
          {activeStep === 1 && (
            <InvoicesFormEdit
              register={register}
              errors={errors}
              setValue={setValue}
              watch={watch}
              control={control}
            />
          )}
          {activeStep === 2 && (
            <InvoicesEditDialogReferences getValues={getValues} />
          )}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              variant="contained"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Atras
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Saltar
              </Button>
            )}
            {activeStep !== steps.length - 1 && (
              <Button variant="contained" onClick={() => validate()}>
                {activeStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
              </Button>
            )}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};
