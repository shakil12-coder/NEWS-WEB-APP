import React from 'react';

const NewsItem=(props)=> {

    let {title,description,imageUrl,newsUrl,author,date}=props
    let defaultImg='https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    return <div className='my-3'>
            <div className="card" >
            
                <img src={!imageUrl?defaultImg:imageUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                  <h5 className='card-title'>{title}</h5>
                  <p className="card-text">{description}</p>
                  <p className="card-text"><small className="text-muted">by {author? author:"UNKNOWN"} on {new Date(date).toDateString()}</small></p>

                  <a href={newsUrl} rel="noreferrer noopener" target="_blank" className='btn btn-sm btn-primary'>Read More</a>
                </div>
            </div>
    </div>
  
}


export default NewsItem;
