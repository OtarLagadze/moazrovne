"use client";

import { useState } from "react";
import { auth, db } from "@/app/libs/firebaseInit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import HeaderComponent from "@/components/ui/header/HeaderComponent";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData]   = useState({});
  const [loading, setLoading]     = useState(false);
  const [errorMsg, setErrorMsg]   = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const makeRandom6 = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

  const generateUniqueUserCode = async () => {
    let candidate, exists = true;
    while (exists) {
      candidate = makeRandom6();
      const snap = await getDocs(
        query(collection(db, "users"), where("userId", "==", candidate))
      );
      if (snap.empty) exists = false;
    }
    return candidate;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (loading) return;
    setErrorMsg("");
    setLoading(true);

    try {
      const idQuery = query(
        collection(db, "users"),
        where("id", "==", formData.id)
      );
      const idSnap = await getDocs(idQuery);
      if (!idSnap.empty) {
        setErrorMsg("მომხმარებელი ამ პირადი ნომრით უკვე არსებობს");
        setLoading(false);
        return;
      }
    } catch (checkErr) {
      console.error("Error checking ID uniqueness:", checkErr);
      setErrorMsg("შეცდომა პირადი ნომრის შემოწმებისას");
      setLoading(false);
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const userCode = await generateUniqueUserCode();

      await setDoc(doc(db, "users", user.uid), {
        user_uid:   user.uid,
        code:       userCode,
        id:         formData.id,
        firstName:  formData.firstName.trim(),
        lastName:   formData.lastName.trim(),
        email:      formData.email,
        displayName:`${formData.firstName.trim()} ${formData.lastName.trim()}`,
        createdAt:  serverTimestamp(),
      });

      router.push("/profile");
    } catch (err) {
      console.error(err);
      let msg = "რეგისტრაციისას დაფიქსირდა შეცდომა";
      if (err.code === "auth/weak-password") {
        msg = "პაროლი ძალიან სუსტია (უნდა იყოს მინიმუმ 6 სიმბოლო)";
      } else if (err.code === "auth/email-already-in-use") {
        msg = "ეს მეილი უკვე გამოყენებაშია";
      } else if (err.code === "auth/invalid-email") {
        msg = "საჭიროა ვალიდური ელ.ფოსტა";
      }
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return <>
    <HeaderComponent text={'ავტორიზაცია'}/>
    <Container maxWidth="sm" sx={{mt: 8}}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontSize: "2rem" }}
      >
        რეგისტრაცია
      </Typography>

      {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <Box
        component="form"
        onSubmit={handleRegister}
        sx={{ display: "grid", gap: 3, mt: 2 }}
      >
        {["firstName","lastName","id","email"].map((field) => (
          <TextField
            key={field}
            label={{
              firstName: "მოსწავლის სახელი",
              lastName: "მოსწავლის გვარი",
              id: "მოსწავლის პირადი ნომერი",
              email: "ელექტრონული ფოსტა",
              password: "პაროლი",
            }[field]}
            name={field}
            type={field === "id" ? "number" : field === "email" ? "email" : field === "password" ? "password" : "text"}
            onChange={handleChange}
            required
            size="medium"
            sx={{
              "& .MuiInputLabel-root": { fontSize: "1.15rem" },
              "& .MuiInputBase-input": { fontSize: "1.25rem" },
            }}
          />
        ))}

        <TextField
          label="პაროლი"
          name="password"
          type={showPassword ? "text" : "password"}
          onChange={handleChange}
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
          {loading ? "მიმდინარეობს რეგისტრაცია..." : "რეგისტრაცია"}
        </Button>

        <Button
          variant="text"
          size="medium"
          onClick={() => router.push("/login")}
          sx={{ fontSize: "1rem" }}
        >
          უკვე გაქვთ ანგარიში? შედით
        </Button>
      </Box>
    </Container>
  </>;
}
