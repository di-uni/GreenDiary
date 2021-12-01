import React, {useState, useEffect} from "react";
import Topbar from "../../components/topbar/Topbar";
import { firebase, firestore } from '../../firebase.js';
import { Loading } from "../../components/Loading.jsx";
import { Card } from "../../components/card/Card.jsx";
import { Heart } from "react-spinners-css";
import GreenBall from "../../assets/green_circle.png";
import LightgreenBall from "../../assets/lightgreen_circle.png";
import YellowBall from "../../assets/yellow_circle.png";
import BlueBall from "../../assets/blue_circle.png";
import "./my.css";


export default function My() {
    document.documentElement.style.setProperty('--main-color', '#FFFFFF');

    var user = firebase.auth().currentUser;
    var name, uid;
    var [zero, setZero] = useState(0);
    var [carbon, setCarbon] = useState(0);
    var [food, setFood] = useState(0);
    var [others, setOthers] = useState(0); 
    var tot = zero + carbon + food + others;

    if (user != null) {
        name = user.displayName;
        uid = user.uid;
    }

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    // const postId = firestore.collection(`users/${uid}`);
    const ref = firestore.collection("posts");

    function getPosts(){
        setLoading(true);
        ref.get().then((item) => {
          var items = item.docs.map((doc) => doc.data());
          console.log(items);
          items = items.filter(function (a) {
            console.log(a.writerId, uid);
            if ((a.writerId == uid)){
                switch(a.category) {
                    case 'Zero Waste':
                        zero++;
                        break;
                    case 'Carbon Footprint':
                        carbon++;
                        break;
                    case 'Food':
                        food++;
                        break;
                    case 'Others':
                        others++;
                        break;
                }
                return a;
            }
          });
          console.log(items);
          console.log(zero, carbon, food, others);

          setZero(zero);
          setCarbon(carbon);
          setFood(food);
          setOthers(others);

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

    return (
        <div style={{ backgroundColor: "var(--primary-green)" }}>
            <form> 
            <Topbar/>
            <div className="all">
                <div className="categoryName">Hello, {name}</div>
                <div className="my_container">
                    <div className="overview">
                        <div className="overview_circles">
                            <div className="overview_zero">
                                {/* <Heart color="var(--primary-green)" size="100"/> */}
                                <img src={GreenBall} width={zero/tot * 400}/>
                            </div>
                            <div className="overview_carbon">
                                {/* <Heart color="var(--primary-lightgreen)" size="100"/> */}
                                <img src={LightgreenBall} width={carbon/tot * 400}/>
                            </div>
                            <div className="overview_food">
                                {/* <Heart color="var(--primary-yellow)" size="100"/> */}
                                <img src={YellowBall} width={food/tot * 400}/>
                            </div>
                            <div className="overview_others">
                                {/* <Heart color="var(--primary-blue)" size="100"/> */}
                                <img src={BlueBall} width={others/tot * 400}/>
                            </div>
                        </div>
                        <div className="overview_text">
                            <p>Until now, you wrote {zero} Zero Waste, </p>
                            <p>{carbon} Carbon Footprint, {food} Food, {others} Others diaries.</p>
                        </div>
                    </div>
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
            </div>
            </form>
        </div>
  );

    
}
