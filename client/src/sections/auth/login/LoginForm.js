import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Iconify from '../../../components/iconify';
import { login } from '../../../services/user';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email')
      .required('Please enter email'),
    password: yup
      .string()
      .matches(/^.{6,}$/, 'Password must be of six characters')
      .required('Please enter password'),
  });

  const formik = useFormik({
    validationSchema,
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async () => {
      const response = await login({ ...formik.values });
      if (response.designation === 'admin') {
        navigate('/admin');
      } else {
        navigate('/catalog');
      }
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3} mt={2}>
          <TextField
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            label="Enter email address"
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={formik.values.password}
            onChange={formik.handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <Checkbox name="remember" label="Remember me" />
          <Link variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          Login
        </LoadingButton>
      </form>
    </>
  );
}
