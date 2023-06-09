import PropTypes from 'prop-types';
// @mui
import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  Link,
  Typography,
  Stack,
  IconButton,
  Button,
  CardMedia,
  Tooltip,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Icon } from '@iconify/react';
import { placeorder } from '../../../../services/order';

// utils
// components

// ----------------------------------------------------------------------

const trimText = (text) => {
  if (text) {
    if (text.length > 35) {
      return `${text.substring(0, 36)}...`;
    }
    return text;
  }
  return '';
};

// ----------------------------------------------------------------------

ProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ProductCard({ product, handleProductSelection, handleAddToCart }) {
  const {
    title,
    image,
    price,
    description,
    id,
    rating: { rate, count },
  } = product;

  return (
    <Card>
      <Box m={0.5} display={'flex'} justifyContent={'flex-end'}>
        <Tooltip title={'Add to cart'}>
          <IconButton onClick={() => handleAddToCart()}>
            <Icon icon={'mdi:cart'} />
          </IconButton>
        </Tooltip>
      </Box>

      <CardMedia sx={{ height: 200 }} image={image} title={title} />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Link>

        <Typography variant="subtitle2">{trimText(description)}</Typography>

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
          <Grid item xs={12} md={12}>
            <Button
              variant="contained"
              sx={{
                width: '100%',
              }}
              onClick={() => handleProductSelection()}
            >
              View
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Card>
  );
}

export const ProductDialog = ({ open, setOpen, selectedProduct, handleAddToCart }) => {
  const {
    title,
    description,
    price,
    image,
    rating: { rate, count },
  } = selectedProduct;
  const [showLoader, setShowLoader] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    text: '',
  });
  const [allowBuy, setAllowBuy] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handlePlaceOrder = async () => {
    try {
      setShowLoader(true);
      const response = await placeorder({ product: selectedProduct });
      setShowLoader(false);
      if (response) {
        setAlertMessage({ ...alertMessage, text: 'Order placed' });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckAddress = () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user.address) {
        setAllowBuy(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setAlertMessage({ ...alertMessage, text: '' });
    }, 3000);
  }, [alertMessage]);

  useEffect(() => {
    handleCheckAddress();
  }, []);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <Box sx={{ m: 2, display: 'flex', justifyContent: 'center' }}>
          {showLoader ? (
            <CircularProgress sx={{ color: 'black' }} />
          ) : (
            <Box sx={{ width: '65%', height: 360 }}>
              <img style={{ width: '100%', height: '100%' }} src={image} alt={title} />
            </Box>
          )}
        </Box>
        <DialogContentText id="alert-dialog-description">
          <Typography variant="subtitle1" noWrap>
            {title}
          </Typography>
          <Typography mt={1} variant="subtitle2" flexWrap>
            {description}
          </Typography>
        </DialogContentText>

        <Stack mt={2} direction="row" alignItems="center" justifyContent="space-between">
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
      </DialogContent>

      {!allowBuy ? (
        <Box display={'flex'} alignItems={'center'} p={2}>
          <Icon icon={'tabler:circle-letter-i'} />
          <Typography ml={1} component={Link} href="/profile">
            Please add address
          </Typography>
        </Box>
      ) : null}

      <DialogActions>
        <Button onClick={() => handleAddToCart()}>Add to Cart</Button>
        <Button onClick={() => handlePlaceOrder()} disabled={!allowBuy}>
          Buy now
        </Button>
      </DialogActions>

      {alertMessage.text ? (
        <Snackbar open anchorOrigin={{ vertical: 'top', horizontal: 'right' }} message={alertMessage.text} />
      ) : null}
    </Dialog>
  );
};
