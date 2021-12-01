import React, {useState, useEffect} from "react";
import { Loading } from "../../components/Loading.jsx";
import {firestore} from '../../firebase.js';
import Topbar from "../../components/topbar/Topbar";
import { Card } from "../../components/card/Card.jsx";
import "./share.css"; 

export default function CarbonFootprint() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const ref = firestore.collection("posts");

  function getPosts(){
    setLoading(true);
    ref.get().then((item) => {
      var items = item.docs.map((doc) => doc.data());
      items = items.filter(function (a) {
        if ((a.category == "Carbon Footprint") && a.isPublic)
          return a;
      });
      items.sort(function (a, b) {
        if (a.timestamp < b.timestamp) {
          return 1;
        }
        if (a.timestamp > b.timestamp) {
          return -1;
        }
        return 0;
      });
      setPosts(items);
      setLoading(false);
    })
  }

  useEffect(() => {
    getPosts();
  }, []);

  if (loading){
    return <Loading/>;
  }


  return(
    // read fierbase info
    <div style={{ backgroundColor: "var(--primary-lightgreen)" }}>
    <form>
        <Topbar/>
        <div className="all">
          <div className="categoryName">Carbon Footprint</div>
          {(posts.length === 0) ? 
          <div style={{ color:"white", 
                        height: '75.7vh',
                        display: 'flex',  
                        justifyContent:'center', 
                        alignItems:'center',
                        fontSize: '20px'
          }}> No posts </div>: 
          <div className="post_cards">
            {posts.map((post) => (
              <Card 
                date={post.date}
                title={post.title}
                writer={post.writer}
                image={post.image}
                contents={post.contents}
              />
            ))}
          </div>
          } 
        </div>
    </form>
    </div>
    
  );
}
