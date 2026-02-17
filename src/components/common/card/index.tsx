import { Card, CardActions, CardContent, CardHeader, CardMedia } from "@mui/material";
import type { ICustomCardProps } from "./interface";
import type { FC } from "react";

const CustomCard: FC<ICustomCardProps> = (props) => {
    return <Card {...props.cardProps}>
                {props.cardHeaderProps && (
                    <CardHeader 
                        {...props.cardHeaderProps} 
                    />
                )}
                {props.withCardMedia && (
                    <CardMedia
                        component="img"
                        src={props.cardMediaProps?.src}
                        alt={props.cardMediaProps?.title}
                        {...props.cardMediaProps}
                    />
                )}
                <CardContent {...props.cardContent.attribute}>
                    {props.cardContent.children}
                </CardContent>
                {props.cardAction && (
                    <CardActions {...props.cardAction.attribute}>
                        {props.cardAction.children}  
                    </CardActions>
                )}
            </Card>
}

export default CustomCard;