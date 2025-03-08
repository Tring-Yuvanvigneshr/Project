import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_WORKERS } from "../../graphQl/queries/userQueries.js";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Box, Button, Rating, Chip, TextField, Pagination, FormControlLabel, Checkbox } from '@mui/material';
import { notify } from "../../utils/CreateToast.jsx";
import placeholder from './../../assets/Images/placeholder.jpg';

const Services = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_ALL_WORKERS);

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    availableOnly: false,
    highRatingOnly: false,
    nearbyOnly: false,
  });
  const workersPerPage = 8;
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error("Error getting location", error)
      );
    }
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleFilterChange = (filterName) => {
    setFilters({
      ...filters,
      [filterName]: !filters[filterName],
    });
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const filteredWorkers = data?.workers
    .filter(worker =>
      worker.profession.toLowerCase().includes(searchQuery)
    )
    .filter(worker =>
      filters.availableOnly ? worker.is_available : true
    )
    .filter(worker =>
      filters.highRatingOnly ? (worker.rating >= 4) : true
    )
    .filter(worker => {
      if (filters.nearbyOnly && userLocation && worker.latitude && worker.longitude) {
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          worker.latitude,
          worker.longitude
        );
        return distance <= 10;
      }
      return true;
    });

  const indexOfLastWorker = page * workersPerPage;
  const indexOfFirstWorker = indexOfLastWorker - workersPerPage;
  const currentWorkers = filteredWorkers?.slice(indexOfFirstWorker, indexOfLastWorker);

  if (loading) return <p className="loading">Loading services...</p>;
  if (error) {
    console.error("Failed to fetch services", error);
    notify({ message: "Failed to fetch services.", type: "error" });
    return <p className="error">Error loading services</p>;
  }

  return (
    <div style={{ padding: "20px", marginLeft: "270px" }}>

      {/* Search and Filters */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <TextField
          variant="outlined"
          placeholder="Search by Profession..."
          size="small"
          value={searchQuery}
          onChange={handleSearch}
          style={{ width: '300px' }}
        />

        <Box>
          <FormControlLabel
            control={<Checkbox checked={filters.availableOnly} onChange={() => handleFilterChange('availableOnly')} />}
            label="Available Only"
          />
          <FormControlLabel
            control={<Checkbox checked={filters.highRatingOnly} onChange={() => handleFilterChange('highRatingOnly')} />}
            label="4+ Star Rating"
          />
          <FormControlLabel
            control={<Checkbox checked={filters.nearbyOnly} onChange={() => handleFilterChange('nearbyOnly')} />}
            label="Nearby (10km)"
          />
        </Box>
      </div>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(250px, 1fr))',
          gap: '20px',
        }}
      >
        {currentWorkers.map((worker) => (
          <Card
            key={worker.id}
            sx={{
              maxWidth: 250,
              boxShadow: 2,
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'transform 0.3s',
              '&:hover': { transform: 'scale(1.05)' }
            }}
            onClick={() => navigate(`/workerDetails/${worker.id}`)}
          >
            <CardMedia
              component="img"
              height="130"
              image={worker.profile_image || placeholder}
              alt={worker.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {worker.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Profession:</strong> {worker.profession}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '8px' }}>
                <Rating value={worker.rating || 0} readOnly size="small" />
                <Typography variant="body2">
                  {worker.rating || "No rating yet"}
                </Typography>
              </Box>
              <Box sx={{ marginTop: '10px' }}>
                <Chip
                  label={worker.is_available ? '✅ Available' : '❌ Not Available'}
                  color={worker.is_available ? 'success' : 'error'}
                  size="small"
                />
              </Box>
              <Button
                size="small"
                fullWidth
                variant="outlined"
                sx={{ marginTop: '12px' }}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Pagination */}
      <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={Math.ceil(filteredWorkers.length / workersPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </div>
  );
};

export default Services;
