import ArticleList from './index';
import { firebaseDB } from '../../firebase';

const blogRef = firebaseDB.ref('blogs');

export const ArticleActions = {
    FETCH_ARTICLES,
    SHOW_ARTICLES,
}

/*function fetchArticles() {
    blogRef.off();
    blogRef.on("child_changed", (snapshot) => {

    });
}*/