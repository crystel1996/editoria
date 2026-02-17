import Title from "@components/common/title";
import ImportData from "@components/import";
import { Box } from "@mui/material";
import style from "./style";

const ImportPage = () => {
    return <Box sx={style}>
        <Title variant="h3">Import des données</Title>
        <ImportData />
    </Box>
}

export default ImportPage;