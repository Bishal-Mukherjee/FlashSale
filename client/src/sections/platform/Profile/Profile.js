import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Paper,
  Typography,
  TextField,
  Grid,
  Button,
  Snackbar,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { getprofile, editprofile } from '../../../services/user';

const AddressSection = () => {
  const [showLoader, setShowLoader] = useState(false);
  const validationSchema = yup.object({
    apartment: yup.string().required('*required'),
    area: yup.string().required('*required'),
    landmark: yup.string(),
    pincode: yup.string().required('*required'),
  });
  const [alertMessage, setAlertMessage] = useState({
    text: '',
  });

  const formik = useFormik({
    validationSchema,
    initialValues: {
      apartment: '',
      area: '',
      landmark: '',
      pincode: '',
    },
    onSubmit: () => {
      setShowLoader(true);
      setTimeout(() => {
        editprofile({ address: { ...formik.values } });
        const user = JSON.parse(localStorage.getItem('user'));
        const newuser = {
          ...user,
          address: { ...formik.values },
        };
        localStorage.setItem('user', JSON.stringify(newuser));
        setShowLoader(false);
        setAlertMessage({ ...alertMessage, text: 'Address updated' });
        formik.handleReset();
      }, 2000);
    },
  });

  useEffect(() => {
    setTimeout(() => {
      setAlertMessage({ ...alertMessage, text: '' });
    }, 3000);
  }, [alertMessage]);

  return (
    <Container sx={{ mt: 5 }}>
      {showLoader ? (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={showLoader}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={6} md={6} sx={{ mt: 1 }}>
              <TextField
                name="apartment"
                label="Flat, House no., Building, Company, Apartment"
                value={formik.values.apartment}
                onChange={formik.handleChange}
                error={formik.touched.apartment && Boolean(formik.errors.apartment)}
                helperText={formik.touched.apartment && formik.errors.apartment}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={6} md={6} sx={{ mt: 1 }}>
              <TextField
                name="area"
                label="Area, Street, Sector, Village"
                value={formik.values.area}
                onChange={formik.handleChange}
                error={formik.touched.area && Boolean(formik.errors.area)}
                helperText={formik.touched.area && formik.errors.area}
                sx={{ width: '100%' }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={6} md={6} sx={{ mt: 1 }}>
              <TextField
                name="landmark"
                label="Landmark"
                value={formik.values.landmark}
                onChange={formik.handleChange}
                error={formik.touched.landmark && Boolean(formik.errors.landmark)}
                helperText={formik.touched.landmark && formik.errors.landmark}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={6} md={6} sx={{ mt: 1 }}>
              <TextField
                name="pincode"
                label="Pincode"
                value={formik.values.pincode}
                onChange={formik.handleChange}
                error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                helperText={formik.touched.pincode && formik.errors.pincode}
                sx={{ width: '100%' }}
              />
            </Grid>
          </Grid>
          <Button type="submit" sx={{ mt: 1 }} variant="contained">
            Add address
          </Button>
        </form>
      )}

      {alertMessage.text ? (
        <Snackbar open anchorOrigin={{ vertical: 'top', horizontal: 'right' }} message={alertMessage.text} />
      ) : null}
    </Container>
  );
};

const Profile = () => {
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);
  const [user, setUser] = useState({});
  const [addressVisibility, setAddressVisibility] = useState(false);

  const tabs = [
    {
      title: 'Orders',
      icon: <Icon icon={'icon-park-outline:ad-product'} width={80} />,
      subText: 'Track, return or buy things',
      action: () => navigate('/orders'),
    },
    {
      title: 'Cart',
      icon: <Icon icon={'mdi:cart'} width={80} />,
      subText: 'View your cart',
      action: () => navigate('/cart'),
    },
    {
      title: 'Address',
      icon: <Icon icon={'carbon:location-filled'} width={80} />,
      subText: 'Modify or add address',
      action: () => setAddressVisibility((a) => !a),
    },
  ];

  const handleGetUser = async () => {
    try {
      setShowLoader(true);
      const response = await getprofile();
      setUser(response);
      setShowLoader(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleNavigation = (pathname) => {
    try {
      navigate(pathname);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <div>
      {showLoader ? (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={showLoader}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Container component={Paper}>
          <Box mt={2} display={'flex'} justifyContent={'center'} alignItems={'center'} flexWrap={'wrap'}>
            {tabs.map((tab) => (
              <Box
                sx={{
                  width: 300,
                  height: 250,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  m: 2,
                  cursor: 'pointer',
                }}
                component={Paper}
                elevation={5}
                onClick={() => tab.action()}
              >
                <Box sx={{ height: 100, width: '100%', display: 'flex', justifyContent: 'center', mt: 2 }}>
                  {tab.icon}
                </Box>
                <Box>
                  <Typography variant="h5" component="div">
                    {tab.title}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {tab.subText}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      )}

      {addressVisibility ? <AddressSection /> : null}
    </div>
  );
};

export default Profile;
