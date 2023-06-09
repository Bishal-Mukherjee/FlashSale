import React, { useState, useEffect } from 'react';
import { Backdrop, CircularProgress, Container, Grid, Snackbar, Box } from '@mui/material';
import ProductCard, { ProductDialog } from './Product/Product';
import { addtocart } from '../../../services/cart';
import { getcategories, getproducts } from '../../../services/product';
import ProductCartWidget from '../../@dashboard/products/ProductCartWidget';

const Catalog = () => {
  const [showProductDialog, setShowProductDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [products, setProducts] = useState([]);

  const [showLoader, setShowLoader] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    text: '',
  });

  const handleGetProducts = async () => {
    try {
      setShowLoader(true);
      const response = await getproducts();
      setProducts(response);
      setShowLoader(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleProductSelection = async (product) => {
    try {
      setSelectedProduct(product);
      setShowProductDialog(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      setShowLoader(true);
      const response = await addtocart({ product });
      setShowLoader(false);

      if (response) {
        setAlertMessage({ ...alertMessage, text: 'Added to cart' });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setAlertMessage({ ...alertMessage, text: '' });
    }, 3000);
  }, [alertMessage]);

  return (
    <Container maxWidth>
      {showLoader ? (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={showLoader}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Box>
          <Grid container spacing={1} sx={{ mt: 2 }}>
            {products?.map((product) => (
              <Grid item xs={12} md={3}>
                <ProductCard
                  product={product}
                  handleProductSelection={() => handleProductSelection(product)}
                  handleAddToCart={() => handleAddToCart(product)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {showProductDialog ? (
        <ProductDialog
          open={showProductDialog}
          setOpen={setShowProductDialog}
          selectedProduct={selectedProduct}
          handleAddToCart={() => handleAddToCart(selectedProduct)}
        />
      ) : null}

      <ProductCartWidget />

      {alertMessage.text ? (
        <Snackbar open anchorOrigin={{ vertical: 'top', horizontal: 'right' }} message={alertMessage.text} />
      ) : null}
    </Container>
  );
};

export default Catalog;
