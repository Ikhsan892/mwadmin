import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import axios from 'utils/axios';
import { Page } from 'components';
import { Header } from './components';
import {
  AboutAuthor,
  AboutProject,
  Preferences,
  ProjectCover,
  ProjectDetails
} from './components';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3, 3, 6, 3)
  },
  aboutAuthor: {
    marginTop: theme.spacing(3)
  },
  aboutProject: {
    marginTop: theme.spacing(3)
  },
  projectCover: {
    marginTop: theme.spacing(3)
  },
  projectDetails: {
    marginTop: theme.spacing(3)
  },
  preferences: {
    marginTop: theme.spacing(3)
  },
  actions: {
    marginTop: theme.spacing(3)
  }
}));

const TambahTeam = () => {
  const classes = useStyles();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchPosts = () => {
      axios.get('/api/social-feed').then(response => {
        if (mounted) {
          setPosts(response.data.posts);
        }
      });
    };

    fetchPosts();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Page className={classes.root} title="Tambah Team">
      <Header />
      {/* <AddPost className={classes.newPost} /> */}
      <AboutAuthor className={classes.aboutAuthor} />
      <AboutProject className={classes.aboutProject} />
      <ProjectCover className={classes.projectCover} />
      <ProjectDetails className={classes.projectDetails} />
      <Preferences className={classes.preferences} />
      <div className={classes.actions}>
        <Button color="primary" variant="contained">
          Tambah Team
        </Button>
      </div>
    </Page>
  );
};

export default TambahTeam;
