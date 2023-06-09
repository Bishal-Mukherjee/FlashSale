import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Box,
  Paper,
  Backdrop,
  CircularProgress,
  Typography,
  Button,
  Card,
  CardMedia,
  Link,
  Stack,
} from '@mui/material';

import { Icon } from '@iconify/react';
import { getcart } from '../../../services/cart';

const CartItemCard = ({ cartItem }) => {
  const {
    product: {
      title,
      image,
      price,
      id,
      rating: { rate, count },
    },
  } = cartItem;

  return (
    <Card sx={{ m: 1 }}>
      <CardMedia sx={{ height: 180, width: 'auto' }} image={image} title={title} />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">₹ {price}</Typography>
          <Box display={'flex'}>
            <Box m={0.5} display={'flex'} alignItems={'center'}>
              <Icon icon={'ic:round-star'} width={20} />
              <Typography variant="subtitle1">{rate}</Typography>
            </Box>
            <Box m={0.5} display={'flex'} alignItems={'center'}>
              <Icon icon={'mdi:users'} width={20} />
              <Typography variant="subtitle1">{count}</Typography>
            </Box>
          </Box>
        </Stack>

        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              sx={{
                width: '100%',
                bgcolor: '#fb4b4e',
                ':hover': {
                  backgroundColor: '#fb4b4e',
                },
              }}
            >
              Remove
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button variant="contained" sx={{ width: '100%' }}>
              View
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Card>
  );
};

const Cart = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleGetOrders = async () => {
    try {
      setShowLoader(true);
      const response = await getcart();
      setCartItems(response);
      setShowLoader(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetOrders();
  }, []);

  return (
    <Container maxWidth>
      {showLoader ? (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={showLoader}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Grid container spacing={1}>
          {cartItems &&
            cartItems?.map((cartItem, index) => (
              <Grid item xs={12} md={3} key={index}>
                <CartItemCard cartItem={cartItem} />
              </Grid>
            ))}
        </Grid>
      )}
    </Container>
  );
};

export default Cart;
