import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import DestinationBasicDetails from "./DestinationBasicDetails";
import DestinationLocation from "./DestinationLocation";
import DestinationImages from "./DestinationImages";

import { FieldValues, useForm } from "react-hook-form";
import Destination from "../../shared/models/DestinationModel";
import DestinationService from "../../services/DestinationService";
import { errorToast, successToast } from "../../ui/toast/Toast";

const steps = ["Basic Details", "Locations", "Images"];

interface IAddEditDestinationProps {}

export interface IInput {
  label: string;
  name: string;
}

const AddEditDestination: React.FunctionComponent<IAddEditDestinationProps> = (
  props
) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = useForm();

  const [activeStep, setActiveStep] = React.useState(0);
  const [imagesList, setImagesList] = React.useState([]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handelDestination = (data: FieldValues) => {
    console.log("Data: ", { ...data, images: imagesList });

    const fd = new FormData();
    if (data?.name) fd.append("name", data?.name);
    if (data?.category) fd.append("category", data?.category);
    if (data?.eateries) fd.append("eateries", data?.eateries);
    if (data?.explanation) fd.append("explanation", data?.explanation);
    if (data?.guides) fd.append("guides", data?.guides);
    if (data?.nearBy) fd.append("nearBy", data?.nearBy);
    if (data?.status) fd.append("status", data?.status);
    if (data?.stay) fd.append("stay", data?.stay);
    if (data?.timeToVisit) fd.append("timeToVisit", data?.timeToVisit);
    if (data?.travelMode) fd.append("travelMode", data?.travelMode);

    if (data?.address?.street)
      fd.append("address.street", data?.address.street);
    if (data.address?.city) fd.append("address.city", data?.address.city);
    if (data.address?.state) fd.append("address.state", data?.address.state);
    if (data.address?.country)
      fd.append("address.country", data?.address.country);
    if (data.address?.pincode)
      fd.append("address.pincode", data?.address.pincode);
    if (data.address?.latitude)
      fd.append("address.latitude", data?.address.latitude);
    if (data.address?.longitude)
      fd.append("address.longitude", data?.address.longitude);

    for (let i = 0; i < imagesList?.length; i++)
      fd.append(`images`, imagesList[i]);

    DestinationService?.createDestination(fd)
      .then((response) => {
        console.log("Response: ", response);
        successToast("created the destination");
        reset();
        handleReset();
      })
      .catch((err) => {
        console.error(err);
        errorToast("Could not created...");
      });
  };

  const Input: React.FunctionComponent<IInput> = ({ label, name }: IInput) => (
    <TextField
      variant="outlined"
      fullWidth
      label={label}
      {...register(name)}
      error={touchedFields[name] && errors[name] ? true : false}
      helperText={touchedFields[name] && errors[name]?.message}
    />
  );

  return (
    <Container>
      <Paper
        variant="elevation"
        sx={{ padding: 5 }}
        component="form"
        onSubmit={handleSubmit(handelDestination)}
      >
        <Stepper activeStep={activeStep}>
          <Step>
            <StepLabel>Basic Details</StepLabel>
          </Step>
          <Step>
            <StepLabel>Locations</StepLabel>
          </Step>
          <Step>
            <StepLabel>Images</StepLabel>
          </Step>
        </Stepper>

        <React.Fragment>
          <Box sx={{ marginTop: 3, marginBottom: 3 }}>
            {activeStep == 0 && (
              <DestinationBasicDetails
                errors={errors}
                touchedFields={touchedFields}
                register={register}
                Input={Input}
              />
            )}
            {activeStep == 1 && (
              <DestinationLocation register={register} Input={Input} />
            )}
            {activeStep == 2 && (
              <DestinationImages
                register={register}
                setImagesList={setImagesList}
              />
            )}
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
              variant="contained"
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            {activeStep === steps.length - 1 && (
              <Button variant="contained" type="submit">
                Finish
              </Button>
            )}

            {activeStep < steps.length - 1 && (
              <Button onClick={handleNext} type="button" variant="contained">
                Next
              </Button>
            )}
          </Box>
        </React.Fragment>
      </Paper>
    </Container>
  );
};

export default AddEditDestination;
