import CategoryCard from "@components/categories/card";
import type { ICategoryListProps } from "@components/categories/list/interface";
import { Box } from "@mui/material";
import type { FC } from "react";
import style from "./style";

const CategoryList: FC<ICategoryListProps> = (props) => {
    return <Box sx={style}>
        {props.items.map((item) => (
            <CategoryCard key={item.id} item={item} {...props} />
        ))}
    </Box>
}

export default CategoryList;