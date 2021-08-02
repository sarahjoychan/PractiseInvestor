/* eslint-disable */
import React, {useEffect, useState} from 'react'
import { topNews } from '../../api/newsApi';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

const News = () => {
  const classes = useStyles();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function getArticles () {
      setArticles((await topNews()).data.articles);
    }
    getArticles();
    const interval = setInterval(() => getArticles(), 1800000 ); // every 30 mins

    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <Box display="flex" flexWrap="wrap">
      {articles.map(article => ( article.source.name !== "Bloomberg" && //get rid of bloomberg they have some protection
        <div>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="article"
                height="140"
                image={article.urlToImage}
                title="article"
              />
              <CardContent>
                <Typography gutterBottom variant="h10" component="h2">
                {article.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {article.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" target="_blank" href={article.url}>
                Learn More
              </Button>
            </CardActions>
          </Card>
        </div>
      ))}
    </Box>
  )
}

export default News;



