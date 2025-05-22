"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "@/app/libs/firebaseInit";
import { doc, getDoc } from "firebase/firestore";
import {
  selectUser_uid,
  selectUserCode,
} from "@/app/redux/userSlice";
import { useRouter } from "next/navigation";
import {
  Box,
  CircularProgress,
} from "@mui/material";
import HeaderComponent from "@/components/ui/header/HeaderComponent";
import ExportUsers from "@/components/export/ExportUsers";
import DataDisplay from "./dataDisplay";
import EventsList from "./eventsList";

export default function Profile() {
  const router   = useRouter();
  const uid      = useSelector(selectUser_uid);
  const userCode = useSelector(selectUserCode);
  
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <>
      <HeaderComponent text={'თქვენი პირადი პროფილი'}/>
      <Box sx={{ display: "flex", justifyContent: "center"}}>
        <CircularProgress />
      </Box>
    </>;
  }

  return <>
    <HeaderComponent text={'თქვენი პირადი პროფილი'}/>
    <DataDisplay />
    <EventsList />
    {
      (userCode == 743563 || userCode == 568092) && <ExportUsers />
    }
  </>;
}
