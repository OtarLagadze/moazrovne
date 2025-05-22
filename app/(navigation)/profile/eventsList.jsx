"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { client } from "@/app/libs/sanity";
import { db } from "@/app/libs/firebaseInit";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { selectUser_uid } from "@/app/redux/userSlice";
import getDate from "@/app/libs/getDate";
import { useSelector } from "react-redux";

export default function DataDisplay() {
  const router   = useRouter();
  const uid      = useSelector(selectUser_uid);

  const [events, setEvents]               = useState([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState("");
  const [registrations, setRegistrations] = useState([]);

  const [openModal, setOpenModal]         = useState(false);
  const [activeEvent, setActiveEvent]     = useState(null);
  const [city, setCity]                   = useState("");
  const [grade, setGrade]                 = useState("");

  useEffect(() => {
    if (!uid) {
      router.push("/login");
      return;
    }

    getDoc(doc(db, "users", uid)).then(snap => {
      if (snap.exists()) {
        setRegistrations(snap.data().registrations || []);
      }
    });

    const q = `*[_type=="events"]{_id,name,cities,grades,dates[]{eventName,eventDate},deadline}`;
    client.fetch(q)
      .then(setEvents)
      .catch(() => setError("ღონისძიებების ჩამოტვირთვა ვერ ხერხდება"))
      .finally(() => setLoading(false));
  }, [uid, router]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Container sx={{ mt: 8 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  const today = new Date();

  const openModalFn = (evt) => {
    setActiveEvent(evt);
    const reg = registrations.find(r => r.eventName === evt.name);
    setCity(reg?.city || evt.cities[0] || "");
    setGrade(reg?.grade || evt.grades[0] || "");
    setOpenModal(true);
  };
  const closeModal = () => setOpenModal(false);

  const saveRegistration = async () => {
    const userRef = doc(db, "users", uid);
    const filtered = registrations.filter(r => r.eventName !== activeEvent.name);
    const newEntry = { eventName: activeEvent.name, city, grade };
    const updated = [...filtered, newEntry];
    await updateDoc(userRef, { registrations: updated });
    setRegistrations(updated);
    closeModal();
  };

  const discardRegistration = async () => {
    const userRef = doc(db, "users", uid);
    const filtered = registrations.filter(r => r.eventName !== activeEvent.name);
    await updateDoc(userRef, { registrations: filtered });
    setRegistrations(filtered);
    setCity("");
    setGrade("");
    setActiveEvent(null);
    closeModal();
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 3 }}>
      {events.map(evt => {
        const deadline = new Date(evt.deadline);
        const isOpen   = deadline >= today;
        const userReg  = registrations.some(r => r.eventName === evt.name);

        return (
          <Box
            key={evt._id}
            sx={{
              border: 1,
              borderColor: "grey.400",
              borderRadius: 2,
              p: 4,
              mb: 3
            }}
          >
            <Typography variant="h6" sx={{ fontSize: "1.5rem" }} gutterBottom>
              {evt.name}
            </Typography>

            {evt.dates?.map((d, i) => {
                const hasValidDate = d.eventDate && !isNaN(new Date(d.eventDate).getTime());
                const evDate = hasValidDate ? new Date(d.eventDate) : null;
                const displayDate = hasValidDate ? getDate(evDate, true) : "მალე გამოქვეყნდება";
                const color = hasValidDate ? evDate >= today? "success.main" : "error.main" : "text.secondary";
                return (
                  <Box key={i}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        py: 1,
                      }}
                    >
                      <Typography sx={{ fontSize: "1.15rem" }}>
                        {d.eventName}
                      </Typography>
                      <Typography sx={{ fontSize: "1.15rem", color }}>
                        {displayDate}
                      </Typography>
                    </Box>
                    {i < evt.dates.length - 1 && (
                      <Box
                        component="hr"
                        sx={{
                          border: 0,
                          borderTop: "1px dashed",
                          borderColor: "grey.400",
                        }}
                      />
                    )}
                  </Box>
                );
            })}

            <Box sx={{
              display: "flex",
              justifyContent: "space-between",
              pt: 1
            }}>
              <Typography sx={{ fontSize: "1.15rem", fontWeight: "bold" }}>
                {isOpen ? "რეგისტრაციის ბოლო დღე" : "რეგისტრაცია დასრულებულია"}
              </Typography>
              <Typography sx={{ fontSize: "1.15rem" }}>
                {getDate(deadline, true)}
              </Typography>
            </Box>

            {isOpen && (
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => openModalFn(evt)}
              >
                {userReg ? "რეგისტრაციის შეცვლა" : "რეგისტრაცია"}
              </Button>
            )}
          </Box>
        );
      })}

      <Dialog open={openModal} onClose={closeModal}>
        <DialogTitle>{activeEvent?.name}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1, display: "grid", gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>ქალაქი</InputLabel>
              <Select
                value={city}
                label="ქალაქი"
                onChange={(e) => setCity(e.target.value)}
              >
                {activeEvent?.cities.map((c) => (
                  <MenuItem key={c} value={c}>{c}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>კლასი</InputLabel>
              <Select
                value={grade}
                label="კლასი"
                onChange={(e) => setGrade(e.target.value)}
              >
                {activeEvent?.grades.map((g) => (
                  <MenuItem key={g} value={g}>{g}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions>
          {registrations.some(r => r.eventName === activeEvent?.name) && (
            <Button color="error" onClick={discardRegistration}>
              რეგისტრაციის გაუქმება
            </Button>
          )}
          <Button onClick={closeModal}>გაუქმება</Button>
          <Button
            onClick={saveRegistration}
            variant="contained"
            disabled={!city || !grade}
          >
            შენახვა
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
