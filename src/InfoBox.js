import React from 'react'
import "./InfoBox.css"
import { Card, CardContent, Typography } from "@material-ui/core"

function InfoBox({ title, cases, isRed, active, activetored, total, ...props }) {
    return (
        <Card onClick={props.onClick}
            className={`infoBox ${active && "infoBox--selected"} 
            ${activetored && "infoBox--selectedtored"}
            ${isRed && "infoBox--red"} `} >
            <CardContent>

                {/* here comes titles */}
                <Typography className="infoBox__title" color="textSecondary">{title}</Typography>

                {/* here comes cases */}
                <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>{cases}</h2>
                {/* here comes total */}
                <Typography className="infoBox__total" color="textSecondary">{total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
