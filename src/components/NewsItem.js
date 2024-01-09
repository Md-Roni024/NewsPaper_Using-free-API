import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let { title, description, imageUrl, newsUrl, author, date,source } = this.props
    return (
      <div>
        <div className="card">
          <img src={!imageUrl ? "https://static.seekingalpha.com/cdn/s3/uploads/getty_images/681242642/image_681242642.jpg?io=getty-c-w1536" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}
            {/* <span className="position-absolute top-0 translate-middle p-2 bg-danger border border-light rounded-pill" style={{left:"90%",zIndex:"1"}}>
              {source}</span> */}
              </h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
            <a rel="noopener" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more...</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
