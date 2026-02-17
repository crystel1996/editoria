import type { SxProps } from "@mui/material";

const style: SxProps = {
    display: "flex",
    flexDirection: "column",
    gap: 3,
    "& .header": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "8px",
    },
};

export default style;
