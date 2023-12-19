import {Spinner} from "reactstrap";
import React, {useContext, useEffect} from "react";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    gray: {
        color: "#cecece",
        textAlign: "center",
        display: "block",
    },
    icon: {
        fontSize: "52px",
    },
    title: {
        fontSize: "30px",
    },
    content: {
        color: "#cecece"
    },
    card: {
        width: "100%",
        margin: "auto",
        padding: "15% 0px",
        background: "#fff",
        border: "1px solid #f2f2f2"
    }
    })
);


export function EmptyState({icon, title, content}){
    const classes = useStyles();
    return(
        <div>
            <div className={`${classes.card}`}>
                {icon}
                <div className={`${classes.title} ${classes.gray}`}>{title}</div>
                <p className={`${classes.content} ${classes.gray}`}>
                    {content}
                </p>
            </div>
        </div>
    )
}
