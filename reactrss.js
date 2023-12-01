import React, { useState, useEffect } from 'react';

const RSSFeedComponent = ({ feedUrl }) => {
  const [feedData, setFeedData] = useState([]);

  useEffect(() => {
    fetchRSSFeed();
  }, []);

  const fetchRSSFeed = async () => {
    try {
      const response = await fetch(feedUrl);
      const data = await response.text();

      const parsedData = parseXMLtoJSON(data);
      
      setFeedData(parsedData);
    } catch (error) {
      console.error('Error fetching RSS feed:', error);
    }
  };

  const parseXMLtoJSON = (xml) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xml, "text/xml");
    const items = Array.from(xml.querySelectorAll("item"));
    return items.map(item => {
      return {
        title: item.querySelector("title").textContent,
        link: item.querySelector("link").textContent,
        description: item.querySelector("description").textContent,
        pubDate: new Date(item.querySelector("pubDate").textContent),
      };
    });
  };

  return (
    <div>
      {feedData.length > 0 ? (
        feedData.map(item => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RSSFeedComponent;
