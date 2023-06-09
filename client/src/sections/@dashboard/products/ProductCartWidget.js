import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Badge,
  Box,
  Card,
  Link,
  Typography,
  Stack,
  Drawer,
  Button,
  CardMedia,
  Grid,
  List,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { ProductDialog } from '../../platform/Catalog/Product/Product';
import { getcart } from '../../../services/cart';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: 'flex',
  cursor: 'pointer',
  position: 'fixed',
  alignItems: 'center',
  top: theme.spacing(20),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  boxShadow: theme.customShadows.z20,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
  borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
  transition: theme.transitions.create('opacity'),
  '&:hover': { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

const CartItem = ({ product, handleProductSelection }) => {
  const {
    title,
    image,
    price,
    id,
    rating: { rate, count },
  } = product;
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
            <Button variant="contained" onClick={() => handleProductSelection()} sx={{ width: '100%' }}>
              View
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Card>
  );
};

function CartDrawer({ open, setOpen }) {
  const [cartItems, setCartItems] = useState([]);
  const [showProductDialog, setShowProductDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [showLoader, setShowLoader] = useState(false);

  const handleProductSelection = async (product) => {
    try {
      setSelectedProduct(product);
      setShowProductDialog(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetCart = async () => {
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
    handleGetCart();
  }, []);

  return (
    <Box>
      <Drawer anchor={'right'} open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 320, height: '100%' }}>
          {showLoader ? (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CircularProgress sx={{ color: 'black' }} />
            </Box>
          ) : (
            <Box sx={{ width: '100%', height: '100%' }}>
              {cartItems ? (
                <List sx={{ mt: 5 }}>
                  {cartItems?.map((cartItem, index) => (
                    <Box key={index}>
                      <CartItem
                        product={cartItem.product}
                        handleProductSelection={() => handleProductSelection(cartItem.product)}
                      />
                    </Box>
                  ))}
                </List>
              ) : null}
            </Box>
          )}
        </Box>
      </Drawer>

      {showProductDialog ? (
        <ProductDialog open={showProductDialog} setOpen={setShowProductDialog} selectedProduct={selectedProduct} />
      ) : null}
    </Box>
  );
}

export default function CartWidget() {
  const [showCart, setShowCart] = useState(false);

  return (
    <StyledRoot>
      <Box onClick={() => setShowCart(true)}>
        <Tooltip title={'View Cart'}>
          <Icon icon="eva:shopping-cart-fill" width={24} height={24} />
        </Tooltip>
      </Box>

      {showCart ? <CartDrawer open={showCart} setOpen={setShowCart} /> : null}
    </StyledRoot>
  );
}
