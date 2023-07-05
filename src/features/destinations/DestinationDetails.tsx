import * as React from "react";
import { useParams } from "react-router-dom";
import Destination from "../../shared/models/DestinationModel";
import DestinationService from "../../services/DestinationService";

import ImageGallery from "react-image-gallery"; //npm i react-image-gallery
// npm i --save-dev @types/react-image-gallery

import { endpoints } from "../../api";
import { Box, Card, Container, Grid, Paper, Typography } from "@mui/material";

import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";

interface IDestinationDetailsProps {}

const DestinationDetails: React.FunctionComponent<IDestinationDetailsProps> = (
  props
) => {
  const { id } = useParams();

  const [destinationData, setDestinationData] = React.useState<Destination>();

  const loadDestination = async () => {
    const response = await DestinationService.getOneDestination(id as string);
    setDestinationData(response?.data?.data);
  };

  React.useEffect(() => {
    loadDestination();
  }, [id]);

  const images = React.useMemo(() => {
    return (
      destinationData?.images?.map((img) => ({
        original: `${endpoints?.serverBaseURL}/${img}`,
        thumbnail: `${endpoints?.serverBaseURL}/${img}`,
      })) || []
    );
  }, [destinationData]); //useMemo used when the value is changes / it helps to improve performance improvement

  var {
    address,
    category,
    eateries,
    explanation,
    guides,
    name,
    nearBy,
    ratings,
    status,
    stay,
    travelMode,
    timeToVisit,
  } = destinationData || {};

  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Box>
            <ImageGallery items={images} />
          </Box>
        </Grid>
      </Grid>
      <hr />
      <Grid container>
        <Grid item xs={12}>
          <Typography>{name}</Typography>
          <Typography>Type: {category}</Typography>
          <Typography>Accomodation: {stay}</Typography>
          <Typography>Best Time to visit: {timeToVisit}</Typography>
          <Typography>Hotels to eat: {eateries}</Typography>
          <Typography>Status: {status}</Typography>
          <Typography>City: {address?.city}</Typography>
          <Typography>Country: {address?.country}</Typography>
          <Typography>TravelMode:{travelMode}</Typography>
          <Typography>Guides:{guides}</Typography>
          <Typography>Explanations:{explanation}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DestinationDetails;
