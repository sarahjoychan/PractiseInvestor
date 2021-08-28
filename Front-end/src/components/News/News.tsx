/* eslint-disable */
import {useEffect, useState, ReactElement} from 'react';
import './News.css';
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
import PacmanLoader from "react-spinners/PacmanLoader";

import { ArticlesI } from '../../interfaces/News';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

//export default News;
export default function News(): ReactElement {
  const classes = useStyles();
  const [articles, setArticles] = useState<ArticlesI[]>([]);

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
      (articles && articles.length) ?
      <Box display="flex" flexWrap="wrap" justifyContent="center">
        {articles.map(article => ( article.source.name !== "Bloomberg" && //get rid of bloomberg they have some protection
          <Box m={1} width={0.3}>
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
                  <Typography gutterBottom variant="inherit" component="h2">
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
          </Box>
        ))}
      </Box>
      :
      <div className="loader-box">
        <PacmanLoader color={'blue'} size={45} />
      </div>
  )
}