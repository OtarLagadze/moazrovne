import { Box } from "@mui/material";

export default function PdfIframe({ src }) {
  return (
    <Box
      className="viewerWrapper"
      sx={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#f2f2f2",
        minHeight: "100vh",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Box
        className="container"
        sx={{
          width: "100%",
          maxWidth: 1200,
        }}
      >
        <iframe
          src={`${src}#toolbar=0&view=FitH&zoom=100`}
          width="100%"
          height="100%"
          style={{
            border: 0,
            display: "block",
            backgroundColor: "white",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            borderRadius: 10,
            minHeight: "80vh",
          }}
        />
      </Box>
    </Box>
  );
}
