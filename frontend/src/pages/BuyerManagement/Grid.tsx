import React from "react";
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

const offers = [
  {
    PostId: "post01",
    OfferId: "offer02",
    title: "2015 accord",
    status: null,
    model: "Accord",
    color: "black",
    maker: "Honda",
    milleage: "10000",
    price: "13000",
    year: "2019",
    pic:
      "https://static.cargurus.com/images/site/2020/08/21/23/00/2020_honda_accord-pic-15568266872342325892-640x480.jpeg",
  },
  {
    PostId: "post03",
    OfferId: "offer01",
    title: "2016 accord",
    status: null,
    model: "Accord",
    color: "black",
    maker: "Honda",
    milleage: "10000",
    price: "13000",
    year: "2013",
    pic:
      "https://static.cargurus.com/images/site/2020/08/21/23/00/2020_honda_accord-pic-15568266872342325892-640x480.jpeg",
  },
  {
    PostId: "post03",
    OfferId: "offer01",
    title: "2016 accord",
    status: null,
    model: "Accord",
    color: "black",
    maker: "Honda",
    milleage: "10000",
    price: "13000",
    year: "2013",
    pic:
      "https://static.cargurus.com/images/site/2020/08/21/23/00/2020_honda_accord-pic-15568266872342325892-640x480.jpeg",
  },
];

export default function ComplexGrid() {
  const classes = useStyles();
  const [showStatus, setShowStatus] = React.useState(false);
  const Status = (status: any) => <Grid item>Status: {status}</Grid>;
  const flag = false;

  const handleOffer = (offer: any, accept: any) => {
    offer.status = accept;
  };

  const PostForm = () => {
    const postId: any = useParams();
    console.log(postId.postId);
    return postId.postId;
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <List disablePadding>
          {offers.map((offer) =>
            offer.PostId === PostForm() ? (
              <React.Fragment>
                <ListItem>
                  <Grid container spacing={2}>
                    <Grid item>
                      <ButtonBase className={classes.image}>
                        <ListItemText>
                          <img
                            className={classes.img}
                            alt='complex'
                            src={offer.pic}
                          />
                        </ListItemText>
                      </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction='column' spacing={2}>
                        <Grid item xs>
                          <Typography gutterBottom variant='subtitle1'>
                            {offer.title}
                          </Typography>

                          <Grid container item xs={12} spacing={3}>
                            <Grid item xs={6}>
                              Model: {offer.model}
                            </Grid>
                            <Grid item xs={6}>
                              Color: {offer.color}
                            </Grid>
                          </Grid>
                          <Grid container item xs={12} spacing={3}>
                            <Grid item xs={6}>
                              Maker: {offer.maker}
                            </Grid>
                            <Grid item xs={6}>
                              Milleage: {offer.milleage}
                            </Grid>
                          </Grid>
                          <Grid container item xs={12} spacing={3}>
                            <Grid item xs={6}>
                              Price: {offer.price}
                            </Grid>
                            <Grid item xs={6}>
                              Year: {offer.year}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item spacing={3}>
                          <Button
                            variant='contained'
                            id={offer.title + "accept"}
                            onClick={() => handleOffer(offer, "Accepted")}
                          >
                            Accept
                          </Button>

                          <Button
                            variant='contained'
                            id={offer.title + "decline"}
                            onClick={() => handleOffer(offer, "Declined")}
                          >
                            Decline
                          </Button>
                        </Grid>
                        {showStatus ? <Status status={offer.status} /> : null}
                      </Grid>
                    </Grid>
                  </Grid>
                </ListItem>
              </React.Fragment>
            ) : null
          )}
        </List>
      </Paper>
    </div>
  );
}
