import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import DestinationService from "../../services/DestinationService";
import Destination from "../../shared/models/DestinationModel";
import DestinationItems from "./DestinationItems";

import {
  Routes,
  Route,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import DestinationDetails from "./DestinationDetails";
import IconList from "../../ui/lists/IconList";

import HistoryIcon from "@mui/icons-material/History";
import BeachIcon from "@mui/icons-material/BeachAccess";
import GardenIcon from "@mui/icons-material/Nature";
import HillIcon from "@mui/icons-material/TempleHindu";
import NatureIcon from "@mui/icons-material/NaturePeople";
import DevotionalIcon from "@mui/icons-material/TempleHinduSharp";
import { TextField } from "@mui/material";

const categories = [
  {
    label: "Historical",
    icon: <HistoryIcon />,
  },
  {
    label: "Devotional",
    icon: <DevotionalIcon />,
  },
  {
    label: "Beach",
    icon: <BeachIcon />,
  },
  {
    label: "Nature",
    icon: <NatureIcon />,
  },
  {
    label: "Garden",
    icon: <GardenIcon />,
  },
  {
    label: "Hills",
    icon: <HillIcon />,
  },
];

interface IDestinationsPageProps {}

const DestinationsPage: React.FunctionComponent<IDestinationsPageProps> = (
  props
) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = React.useState<Destination[]>([]);
  const [searchValue, setSearchValue] = React.useState<String>("");

  const handleCategoryChange = (cat: string) => {
    if (pathname != "/destinations") {
      navigate(`/destinations?category=${cat}`);
    } else {
      searchParams.set("category", cat);
      setSearchParams(searchParams);
    }
  };

  const loadDestinations = async (query = "") => {
    if (!query) {
      query = `?perPage=${15}$pageNo=${1}`;
    }

    const response = await DestinationService?.getAllDestinations(query);
    setData(response?.data?.data);
  };

  const loadQuery = () => {
    let query = "?";
    const perPage = searchParams.get("perPage");
    const pageNo = searchParams.get("pageNo");
    const category = searchParams.get("category");
    const q = searchParams.get("q");
    if (perPage) query += "perPage=" + perPage;
    if (pageNo) query += "&pageNo=" + pageNo;
    if (category) query += "&category=" + category;
    if (q) query += "&q=" + q;
    return query;
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e?.target?.value;
    setSearchValue(val);

    if (!val || val?.length == 0) {
      searchParams.delete("q");
      setSearchParams(searchParams);
    } else if (val?.length > 2) {
      searchParams.set("q", val);
      setSearchParams(searchParams);
    }
  };

  React.useEffect(() => {
    loadDestinations();
  }, []);

  React.useEffect(() => {
    loadDestinations(loadQuery());
  }, [searchParams]);

  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          {/* filter/categories */}
          <Card>
            <h4>Filter by categories</h4>
            <IconList items={categories} onChange={handleCategoryChange} />
          </Card>
        </Grid>
        <Grid item container xs={12} md={9}>
          <Grid item xs={12} sx={{ padding: 1 }}>
            <TextField
              size="small"
              type="search"
              fullWidth
              variant="outlined"
              placeholder="Search destinations..."
              onChange={handleSearch}
            />
          </Grid>
          {/* Listing */}
          <Grid item xs={12} sx={{ padding: 1 }}>
            <Routes>
              <Route path="" element={<DestinationItems data={data} />} />
              <Route path="details/:id" element={<DestinationDetails />} />
            </Routes>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DestinationsPage;

//tsrsfc
