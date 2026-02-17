import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Avatar,
  Link,
  Alert,
} from "@mui/material";
import DentalIcon from "@mui/icons-material/MedicalServices";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./../../../store/index";
import { login } from "./../../../store/authSlice";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { formik, serverError } = useRegister({
    onSuccess: async (user) => {
      const loginResult = await dispatch(
        login({ email: user.email, password: formik.values.password })
      );

      if (login.fulfilled.match(loginResult)) {
        navigate("/dashboard");
      }
    },
  });

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #e0f7fa, #ffffff)",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 5,
          borderRadius: 3,
          width: "100%",
          maxWidth: 400,
          textAlign: "center",
        }}
      >
        <Avatar
          sx={{
            bgcolor: "#4dd0e1",
            width: 56,
            height: 56,
            margin: "0 auto",
          }}
        >
          <DentalIcon fontSize="large" />
        </Avatar>

        <Typography variant="h5" component="h1" sx={{ mt: 2, mb: 3 }}>
          Create Account
        </Typography>

        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          
          {serverError && <Alert severity="error">{serverError}</Alert>}

          <TextField
            label="Email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            required
            margin="normal"
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            required
            margin="normal"
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            required
            margin="normal"
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={formik.isSubmitting}
            sx={{
              mt: 3,
              py: 1.5,
              backgroundColor: "#26c6da",
              "&:hover": { backgroundColor: "#00acc1" },
            }}
          >
            {formik.isSubmitting ? "Registering..." : "Register"}
          </Button>

          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
              Already have an account?{" "}
              <Link component={RouterLink} to="/" underline="hover">
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
