import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  Typography,
  Container,
  Grid,
  Dialog,
  DialogContent,
} from '@mui/material';
import dayjs from 'dayjs';

const OrderCard = ({ orderItem }) => {
  const {
    product: { title, image },
  } = orderItem;
  return (
    <Card sx={{ maxWidth: 345, minHeight: 250 }}>
      <CardMedia sx={{ height: 250 }} image={image} title={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Placed on {dayjs(orderItem.orderedOn).format('DD/MM/YYYY')}
        </Typography>
      </CardContent>
    </Card>
  );
};

const UserOrdersDialog = ({ open, setOpen, orders }) => {
  return (
    <Dialog maxWidth={'lg'} fullWidth open={open} onClose={() => setOpen(false)}>
      <DialogContent sx={{ margin: 10 }}>
        <Container>
          <Grid container spacing={1}>
            {orders.map((order, index) => (
              <Grid item xs={12} md={4} key={index}>
                <OrderCard orderItem={order} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default UserOrdersDialog;
