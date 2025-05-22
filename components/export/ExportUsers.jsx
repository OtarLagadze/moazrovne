"use client";

import React, { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/libs/firebaseInit";
import * as XLSX from "xlsx";
import { Button, Container } from "@mui/material";

export default function ExportUsersExcel() {
  const [loading, setLoading] = useState(false);

  const exportUsersToExcel = async () => {
    setLoading(true);
    try {
      const usersSnapshot = await getDocs(collection(db, "users"));

      const data = usersSnapshot.docs.map((docSnap) => {
        const {
          code = "",
          displayName = "",
          email = "",
          id = "",
          registrations = []
        } = docSnap.data();

        const formattedRegs = registrations
          .map(({ city = "", grade = "" }) => `${city} ${grade} კლასი`)
          .join('; ');

        return { code, displayName, email, id, registrations: formattedRegs };
      });

      const worksheet = XLSX.utils.json_to_sheet(data, {
        header: ["code", "displayName", "email", "id", "registrations"],
      });

      const headerRow = [
        "კოდი",
        "სახელი გვარი",
        "მეილი",
        "პირადი ნომერი",
        "რეგისტრაციები"
      ];
      XLSX.utils.sheet_add_aoa(worksheet, [headerRow], { origin: "A1" });

      worksheet['!cols'] = [
        { wch: 10 }, // კოდი
        { wch: 30 }, // სახელი გვარი
        { wch: 35 }, // მეილი
        { wch: 15 }, // პირადი ნომერი
        { wch: 20 }  // რეგისტრაციები
      ];

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
      XLSX.writeFile(workbook, "მონაწილეთა_სია.xlsx");
    } catch (err) {
      console.error("Error exporting users:", err);
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Button
        variant="contained"
        size="large"
        sx={{ mt: 3, fontSize: "1.1rem" }}
        onClick={exportUsersToExcel}
        disabled={loading}
      >
        {loading ? "იტვირთება..." : "მონაწილეთა სიის გადმოწერა"}
      </Button>
    </Container>
  );
}
