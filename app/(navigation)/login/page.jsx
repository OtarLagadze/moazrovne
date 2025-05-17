"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setActiveUser } from "@/app/redux/userSlice";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "@/app/libs/firebaseInit";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import HeaderComponent from "@/components/ui/header/HeaderComponent";


export default function Login() {
  const dispatch = useDispatch();
  const router   = useRouter();

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: "", severity: "info" });

  const handleCloseSnack = () => {
    setSnack((s) => ({ ...s, open: false }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const snap = await getDoc(doc(db, "users", user.uid));
      if (!snap.exists()) throw new Error("მონაცემები არ მოიძებნა");

      const data = snap.data();
      dispatch(setActiveUser({
        user_uid:        user.uid,
        userEmail:       data.email,
        userId:          data.id,
        userCode:        data.code,
        userFirstName:   data.firstName,
        userLastName:    data.lastName,
        userDisplayName: data.displayName,
      }));

      router.push("/profile");
    } catch (err) {
      console.error(err);
      let msg = "შესვლა ვერ განხორციელდა";
      if (err.code === "auth/user-not-found") {
        msg = "ამ მეილით მომხმარებელი ვერ მოიძებნა";
      } else if (err.code === "auth/wrong-password") {
        msg = "პაროლი არასწორია";
      } else if (err.code === "auth/invalid-email") {
        msg = "ელ.ფოსტის ფორმატი არასწორია";
      } else if (err.code === "auth/invalid-credential") {
        msg = "მეილი ან პაროლი არასწორია";
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setSnack({ open: true, message: "პირველად მიუთითეთ თქვენი ელ.ფოსტა", severity: "warning" });
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setSnack({ open: true, message: "პაროლის აღდგენის ბმული გამოიგზავნა", severity: "success" });
    } catch (err) {
      console.error(err);
      setSnack({ open: true, message: "შეცდომა პაროლის აღდგენის დროს, დარწმუნდით რომ მითითებული მეილი დარეგისტრირებულია", severity: "error" });
    }
  };

  return <>
    <HeaderComponent text={'ავტორიზაცია'}/>
    <Container maxWidth="sm" sx={{mt: 8}}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontSize: "1.75rem" }}
      >
        შესვლა
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{ display: "grid", gap: 3 }}
      >
        <TextField
          label="ელექტრონული ფოსტა"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          size="medium"
          sx={{
            "& .MuiInputLabel-root": { fontSize: "1.15rem" },
            "& .MuiInputBase-input": { fontSize: "1.25rem" },
          }}
        />
        <TextField
          label="პაროლი"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          size="medium"
          sx={{
            "& .MuiInputLabel-root": { fontSize: "1.15rem" },
            "& .MuiInputBase-input": { fontSize: "1.25rem" },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPassword((v) => !v)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} />}
          sx={{ fontSize: "1.2rem", py: 1.5 }}
        >
          {loading ? "შედიხართ..." : "შესვლა"}
        </Button>

        <Button
          variant="text"
          size="medium"
          onClick={() => router.push("/register")}
          sx={{ fontSize: "1rem" }}
        >
          რეგისტრაცია
        </Button>
        <Button
          variant="text"
          size="medium"
          onClick={handleForgotPassword}
          sx={{ fontSize: "1rem" }}
        >
          პაროლის აღდგენა
        </Button>
      </Box>

      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={handleCloseSnack}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnack}
          severity={snack.severity}
          sx={{ width: "100%", fontSize: "1rem" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Container>
  </>;
}
