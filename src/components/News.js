import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticle] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, settotalResult] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticle(parsedData.articles);
    setLoading(false);
    settotalResult(parsedData.totalResults);

    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - News`;
    updateNews();
  }, []);

  //  const handlePrevClick=async ()=>{
  //    setPage(page-1)
  //    updateNews();
  //  }

  //  const handleNextClick=async ()=>{
  //    setPage(page+1)
  //   updateNews()
  //  }

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setPage(page + 1);
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();

    setArticle(articles.concat(parsedData.articles));
    setLoading(false);
    settotalResult(parsedData.totalResults);
  };

  return (
    <div className="container">
      <h2 className="text-center">News-Top Headlines</h2>
      {/* {loading && <Spinner/>} */}
      <InfiniteScroll
        dataLength={articles ? articles.length : 0}
        next={fetchMoreData}
        hasMore={true}
        loader={<Spinner />}
      >
        <div className="row">
          {articles &&
            articles.map((element) => {
              return (
                <div
                  className=" col-sm-6 col-md-4  col-xs-12"
                  key={element.url}
                >
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                  />
                </div>
              );
            })}
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  country: "ae",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
