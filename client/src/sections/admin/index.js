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
  Backdrop,
  CircularProgress,
  Box,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { getallusers } from '../../services/user';
import UserOrdersDialog from './orders';

const UserCard = ({ user }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <Box display={'flex'} justifyContent={'center'}>
          <Box sx={{ minHeight: 150 }}>
            <Icon icon={'solar:user-bold-duotone'} width={150} />
          </Box>
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => setOpen(true)}>
            View Orders
          </Button>
        </CardActions>
      </Card>

      {open ? <UserOrdersDialog orders={user.orders} open={open} setOpen={setOpen} /> : null}
    </>
  );
};

const AdminIndex = () => {
  const [users, setUsers] = useState([]);
  const [alertMessage, setAlertMessage] = useState({
    text: '',
  });
  const [showLoader, setShowLoader] = useState(false);

  const handleGetUsers = async () => {
    try {
      setShowLoader(true);
      const response = await getallusers();
      if (response.users.length > 0) {
        setUsers(response.users);
      } else {
        setAlertMessage({ ...alertMessage, text: 'Access denied' });
      }
      setShowLoader(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetUsers();
  }, []);

  return (
    <div>
      <Container>
        {showLoader ? (
          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={showLoader}>
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <Grid container spacing={1}>
            {users ? (
              <>
                {users.map((user, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <UserCard user={user} />
                  </Grid>
                ))}
              </>
            ) : null}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default AdminIndex;
