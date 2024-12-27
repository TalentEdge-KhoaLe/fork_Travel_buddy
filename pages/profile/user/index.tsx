import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/libs/services/user/profile";

interface ProfileFormInputs {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  facebook: string;
  instagram: string;
  x: string;
  phone: string;
}

const ProfileForm = () => {
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const defaultValues = {
    username: "",
    email: "",
    firstname: "",
    lastname: "",
    facebook: "",
    instagram: "",
    x: "",
    phone: "",
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<ProfileFormInputs>({ defaultValues });

  const { data: profile, error: profileError } = useGetProfileQuery();

  useEffect(() => {
    if (profile) {
      for (const [key, value] of Object.entries(profile.data)) {
        if (key in defaultValues) {
          setValue(key as any, value || "");
        }
      }
    }
  }, [profile, setValue]);

  const onSubmit = async (profileData: ProfileFormInputs) => {
    try {
      const result = await updateProfile(profileData).unwrap();
      setSnackbar({
        open: true,
        message: "Profile updated successfully!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to update profile. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100%",
        backgroundColor: "#f4f4f4",
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 2,
          width: "100%",
          maxWidth: 800,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Profile Information
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            {[
              { name: "username", label: "Username", required: true },
              { name: "email", label: "Email", required: true },
              { name: "firstname", label: "Firstname", required: true },
              { name: "lastname", label: "Lastname", required: true },
              { name: "facebook", label: "Facebook", required: false },
              { name: "instagram", label: "Instagram", required: false },
              { name: "x", label: "X", required: false },
              { name: "phone", label: "Phone", required: true },
            ].map((field) => (
              <Box
                key={field.name}
                sx={{
                  flex: "1 1 calc(50% - 16px)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ marginBottom: 0.5, fontWeight: 500 }}
                >
                  {field.label}
                  {field.required && (
                    <Typography
                      component="span"
                      color="error"
                      sx={{ marginLeft: 0.5 }}
                    >
                      *
                    </Typography>
                  )}
                </Typography>
                <Controller
                  name={field.name as keyof ProfileFormInputs}
                  control={control}
                  rules={
                    field.required
                      ? { required: `${field.label} is required` }
                      : undefined
                  }
                  render={({ field: controllerField }) => (
                    <TextField
                      {...controllerField}
                      fullWidth
                      variant="outlined"
                      error={!!errors[field.name as keyof ProfileFormInputs]}
                      helperText={
                        errors[field.name as keyof ProfileFormInputs]?.message
                      }
                    />
                  )}
                />
              </Box>
            ))}
          </Box>
          <Box sx={{ marginTop: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ textTransform: "none", width: "250px", padding: 1.5 }}
              disabled={isLoading}
            >
              Save Changes
            </Button>
          </Box>
        </form>
      </Paper>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfileForm;
