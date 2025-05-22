"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "@/app/libs/firebaseInit";
import { doc, getDoc } from "firebase/firestore";
import {
  setLogOutUser,
  selectUser_uid,
  selectUserDisplayName,
  selectUserEmail,
  selectUserId,
  selectUserCode,
} from "@/app/redux/userSlice";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert,
  Paper,
} from "@mui/material";

export default function DataDisplay() {
  const dispatch = useDispatch();
  const router   = useRouter();
  const uid      = useSelector(selectUser_uid);

  const displayName = useSelector(selectUserDisplayName);
  const email       = useSelector(selectUserEmail);
  const personalId  = useSelector(selectUserId);
  const userCode    = useSelector(selectUserCode);

  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  useEffect(() => {
    if (!uid) {
      router.push("/login");
      return;
    }
    getDoc(doc(db, "users", uid))
      .then((snap) => {
        if (!snap.exists()) throw new Error("მონაცემები არ მოიძებნა");
      })
      .catch((err) => {
        console.error(err);
        setError("მომხმარებლის მონაცემები ვერ მოიძებნა");
      })
      .finally(() => setLoading(false));
  }, [uid, router]);

  const handleSignOut = () => {
    auth.signOut().then(() => {
      dispatch(setLogOutUser());
      router.push("/login");
    });
  };

  if (loading) {
    return <>
      <Box sx={{ display: "flex", justifyContent: "center"}}>
        <CircularProgress />
      </Box>
    </>;
  }

  return <>
    <Container maxWidth="sm" sx={{mt: 6}}>
      {error && <Alert severity="error">{error}</Alert>}

      <Box sx={{ p: 4, border: 1, borderColor: "grey.400", borderRadius: 2}}>
        <Typography 
          variant="h5" 
          gutterBottom 
          sx={{ fontSize: "1.75rem" }}
        >
          {displayName}
        </Typography>

        <Box sx={{ display: "grid", gap: 3, mt: 2 }}>
          <TextField
            label="ელექტრონული ფოსტა"
            value={email ?? ""}
            InputProps={{ readOnly: true }}
            sx={{ 
              "& .MuiInputBase-input": { fontSize: "1.25rem" },
              "& .MuiInputLabel-root": { fontSize: "1.1rem" },
            }}
          />
          <TextField
            label="თქვენი კოდი"
            value={userCode ?? ""}
            InputProps={{ readOnly: true }}
            sx={{ 
              "& .MuiInputBase-input": { fontSize: "1.25rem" },
              "& .MuiInputLabel-root": { fontSize: "1.1rem" },
            }}
          />
          <TextField
            label="პირადი ნომერი"
            value={personalId ?? ""}
            InputProps={{ readOnly: true }}
            sx={{ 
              "& .MuiInputBase-input": { fontSize: "1.25rem" },
              "& .MuiInputLabel-root": { fontSize: "1.1rem" },
            }}
          />
        </Box>

        <Button
          variant="contained"
          size="large"
          sx={{ mt: 3, fontSize: "1.1rem", py: 1.5 }}
          onClick={handleSignOut}
        >
          გასვლა
        </Button>
      </Box>
    </Container>
  </>;
}
