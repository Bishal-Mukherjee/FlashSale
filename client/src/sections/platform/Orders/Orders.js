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
  CardContent,
  CardActions,
} from '@mui/material';
import dayjs from 'dayjs';
import { getorders } from '../../../services/order';

const OrderItemCard = ({ orderItem }) => {
  const {
    product: { title, image, price },
  } = orderItem;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 180 }} image={image} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>

        <Grid container spacing={1} justifyContent={'center'}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Placed on
                </Typography>
              </Box>
              <Box>
                <Typography>{dayjs(orderItem.orderedOn).format('DD-MM-YYYY')}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Price
              </Typography>
            </Box>
            <Box>
              <Typography> ₹ {price}</Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small" color={'warning'}>
          Cancel
        </Button>
        <Button size="small">Track order</Button>
      </CardActions>
    </Card>
  );
};

const Orders = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [orderItems, setOrderItems] = useState([]);

  const handleGetOrders = async () => {
    try {
      setShowLoader(true);
      const response = await getorders();
      setOrderItems(response);
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
          {orderItems &&
            orderItems?.map((orderItem, index) => (
              <Grid item xs={12} md={3} key={index}>
                <OrderItemCard orderItem={orderItem} />
              </Grid>
            ))}
        </Grid>
      )}
    </Container>
  );
};

export default Orders;
