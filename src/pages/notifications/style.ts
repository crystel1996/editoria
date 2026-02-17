import type { SxProps } from "@mui/material";

const style: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    "& .header": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "24px",
    }
}

export default style;