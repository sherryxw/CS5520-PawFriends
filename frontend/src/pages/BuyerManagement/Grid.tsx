import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useParams } from "react-router-dom";
import { PostAddOutlined } from "@material-ui/icons";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

const getData = () =>
  axios
    .get("/offer")
    .then((response: any) => response.data)
    .catch(console.error); // TODO: GET endpoint

export default function ComplexGrid() {
  const classes = useStyles();
  const { postId: paramsPostId } = useParams<any>();
  const [offers, setOffers] = useState<any[]>([]);

  const getMockData = () => {
    setOffers(
      require("./data.json").filter(
        (offer: any) => offer.postId === paramsPostId
      )
    );
  };

  useEffect(() => {
    if (paramsPostId) {
      // getData().then((data) => setOffers(data).filter((offer: any) => offer.postId === paramsPostId));
      getMockData();
    }
  }, [paramsPostId]);

  const handleOffer = (index: number, status: string) => {
    setOffers((oldOffers: any[]) => {
      const temp = [...oldOffers];
      if(index === -1){
        temp.forEach(t => t.status = 'CANCEL');
        return temp;
      }
      temp[index].status = status;
      return temp;
    });
    //TODO: add PUT/PATCH endpoint
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <List disablePadding>
          {offers.map((offer: any, index: number) => {
            const {
              pic,
              title,
              model,
              color,
              maker,
              milleage,
              price,
              year,
              status,
            } = offer;
            return (
              <React.Fragment>
                <ListItem>
                  <Grid container spacing={2}>
                    <Grid item>
                      <ButtonBase className={classes.image}>
                        <ListItemText>
                          <img
                            className={classes.img}
                            alt='complex'
                            src={pic}
                          />
                        </ListItemText>
                      </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction='column' spacing={2}>
                        <Grid item xs>
                          <Typography gutterBottom variant='subtitle1'>
                            {title}
                          </Typography>

                          <Grid container item xs={12} spacing={3}>
                            <Grid item xs={6}>
                              Model: {model}
                            </Grid>
                            <Grid item xs={6}>
                              Color: {color}
                            </Grid>
                          </Grid>
                          <Grid container item xs={12} spacing={3}>
                            <Grid item xs={6}>
                              Maker: {maker}
                            </Grid>
                            <Grid item xs={6}>
                              Milleage: {milleage}
                            </Grid>
                          </Grid>
                          <Grid container item xs={12} spacing={3}>
                            <Grid item xs={6}>
                              Price: {price}
                            </Grid>
                            <Grid item xs={6}>
                              Year: {year}
                            </Grid>
                          </Grid>
                        </Grid>
                        {status && <Grid item>Status: {status}</Grid>}
                        {status === "PENDING" && (
                          <Grid item spacing={3}>
                            <Button
                              className='mr-3'
                              variant='contained'
                              id={title + "accept"}
                              onClick={() => handleOffer(index, "ACCEPT")}
                            >
                              Accept
                            </Button>

                            <Button
                              className='mr-3'
                              variant='contained'
                              id={title + "decline"}
                              onClick={() => handleOffer(index, "DECLINE")}
                            >
                              Decline
                            </Button>
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </ListItem>
              </React.Fragment>
            );
          })}
        </List>
        {offers.length > 0 && <Button
          variant='contained'
          id='cancel'
          onClick={() => handleOffer(-1, "CANCEL")}
        >
          Cancel
        </Button>}
      </Paper>
    </div>
  );
}
