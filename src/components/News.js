import React, { Component } from 'react'
import PropTypes from 'prop-types';
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general"
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor(props) {
    console.log("constructor")
    super(props)
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults:0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - MyNewsToday`
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  async updateNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=00947fc6db934f6b845083ac6de6ba3a&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({ loading: true })
    let data = await fetch(url);
    let parseData = await data.json()
    console.log(parseData)
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false
    })
  }
  async componentDidMount() {
    console.log("cdm")
    this.updateNews()
  }
  fetchMoreData = async() => {
    this.setState({
      page:this.state.page+1
    })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=00947fc6db934f6b845083ac6de6ba3a&page=${this.state.page}&pageSize=${this.props.pageSize}`
    // this.setState({ loading: true })
    let data = await fetch(url);
    let parseData = await data.json()
    console.log(parseData)
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
      // loading: false
    })
  };
  render() {
    console.log("render")
    return (
      <div className="container my-5">
        <h2 className="text-center my-4">MyNewsToday - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!=this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row">
            {this.state.articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
          </div>
        </InfiniteScroll>
      </div>
    )
  }
}
