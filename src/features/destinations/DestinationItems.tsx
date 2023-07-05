import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import PlaceIcon from "@mui/icons-material/Place";

import ReactPaginate from "react-paginate";

import { Link } from "react-router-dom";

import Rating from "@mui/material/Rating";

import { endpoints } from "../../api";
import Destination from "../../shared/models/DestinationModel";

import "./DestinationItems.css";

interface IDestinationItemsProps {
  data: Destination[];
}

const DestinationItems: React.FunctionComponent<IDestinationItemsProps> = ({
  data,
}) => {
  const perPage = 2;

  const [currentPage, setCurrentPage] = React.useState(0);
  const endOffset = currentPage + perPage;
  console.log(`Loading items from ${currentPage} to ${endOffset}`);
  const currentItems = data.slice(currentPage, endOffset);

  const ratings = [
    {
      rating: 2,
      review: "sdsd",
    },
  ];

  const handlePageClick = (event: any) => {
    console.log("HandlePageClick: ", event);
    setCurrentPage(event?.selected + 1);
  };

  return (
    <>
      <Paper variant="elevation">
        <Grid container spacing={2}>
          {Array.isArray(currentItems) &&
            currentItems?.map((item, i) => {
              const sum =
                Array.isArray(item?.ratings) &&
                item?.ratings?.reduce((prev: number, rating: any) => {
                  return rating?.rating ? prev + rating?.rating : prev;
                }, 0);

              const avg = (sum ? sum : 0) / item?.ratings?.length;

              return (
                <Grid item xs={3} key={i}>
                  <Card>
                    <Link
                      to={`details/${item?._id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <img
                        style={{ width: "100%", height: 200 }}
                        src={
                          item?.images[0]
                            ? `${endpoints?.serverBaseURL}/${item?.images[0]}`
                            : "https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg"
                        }
                      />

                      <Box sx={{ padding: 1 }}>
                        <h3 style={{ marginBottom: 0 }}>{item?.name}</h3>
                        <p style={{ color: "#0006", marginTop: 0 }}>
                          {item?.category}
                        </p>

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span
                            style={{
                              display: "inline-flex",
                              fontSize: "0.7em",
                              alignItems: "center",
                            }}
                          >
                            <PlaceIcon sx={{ height: "0.7em" }} />
                            {item?.address?.city}
                          </span>
                          <Rating
                            name="read-only"
                            size="small"
                            value={avg}
                            readOnly
                          />
                        </Box>
                      </Box>
                    </Link>
                  </Card>
                </Grid>
              );
            })}

          <Grid item xs={12} className="paginate">
            <Card variant="elevation" sx={{ padding: 1, margin: 2 }}>
              <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={Math.ceil(data?.length / perPage)}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
              />
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default DestinationItems;
