import React, { useState } from "react";
import './diary.css';
import { firebase, firestore } from '../../firebase.js';
import 'firebase/storage';
import Topbar from "../../components/topbar/Topbar";
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ReactComponent as ImageIcon } from '../../assets/image.svg';
import { ReactComponent as Circle } from '../../assets/circle.svg';
import { ReactComponent as CheckedCircle } from '../../assets/check-circle.svg';


function Diary() {
  document.documentElement.style.setProperty('--main-color', 'var(--text-dark)');
  document.documentElement.style.setProperty('--loginbutton-color', 'var(--primary-green)');
  document.documentElement.style.setProperty('--logintext-color', '#FFFFFF');


  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Zero Waste");
  const [isPublic, setIsPublic] = useState(false);
  const [contents, setContents] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const [image, setImage] = useState(null);
  const [imgBase64, setImgBase64] = useState("");
  const [url, setUrl] = useState("");
  // const [progress, setProgress] = useState(0);

  // const [imageloading, setImageloading] = useState(false);
  const options = [
    'Zero Waste', 'Carbon Footprint', 'Food', 'Others'
  ];
  const defaultOption = options[0];

  var storageRef = firebase.storage().ref();

  var user = firebase.auth().currentUser;
  var name, uid;
  // var email, photoUrl, emailVerified;

  if (user != null) {

    name = user.displayName;
    // email = user.email;
    // photoUrl = user.photoURL;
    // emailVerified = user.emailVerified;
    uid = user.uid;

    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.

  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPostRef = firestore.collection("posts").doc();
    var uploadTask = storageRef.child(`images/${uid}_${image.name}`).put(image);
    uploadTask.on('state_changed', function (snapshot) {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function (error) {
      // Handle unsuccessful uploads
    }, function () {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log('File available at', downloadURL);
        setUrl(downloadURL);
        console.log("downloadURL:" + downloadURL, "url: " + url);
        newPostRef.set({
          title: title,
          contents: contents,
          timestamp: startDate.getTime(),
          date: startDate.toDateString(),
          category: category,
          isPublic: isPublic,
          writer: name,
          writerId: uid,
          image: downloadURL
        })
        .then(() => {
          alert("Succeeded in Uploading a Diary");
        })
        .catch((error) => {
          alert(error.message);
        });

        // console.log("check:" + newPostRef);
        // firestore.collection("users").doc(`${uid}`).update({
        //   posts: firebase.firestore.FieldValue.arrayUnion(newPostRef)
        // })
        // .then(() => {
        //   alert("Succeeded in Uploading a Diary");
        // })
        // .catch((error) => {
        //   alert(error.message);
        // });
      });
    });

    // add diary without image
    // firestore.collection("posts").add({
    //   title: title,
    //   contents: contents,
    //   date: date,
    //   category: category,
    //   isPublic: isPublic,
    //   writer: name,
    //   writerId: uid,
    // })
    //   .then(() => {
            // alert("Succeeded in Uploading a Diary");
    //   })
    //   .catch((error) => {
    //     alert(error.message);
    //   });

    setTitle("");
    setCategory("Zero Waste");
    setIsPublic(false);
    setContents("");
    setStartDate(new Date());
    
    setImage(null);
    setImgBase64("");
    setUrl("");
  }

  const hiddenFileInput = React.useRef(null);

  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  const uploadImage = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
      }
    }

    if (file) {
      setImage(file);
      reader.readAsDataURL(file);
    }
  }

  return (
    <form className="Diary" onSubmit=
      {(e) => handleSubmit(e)}>
      <Topbar />
      <div className="diaryinfo">
        <div className="date">
          <DatePicker className="datePicker" selected={startDate}
            onChange={function async(date) {
              setStartDate(date);
              console.log("date: " + date);
            }} />
        </div>
        <div className="d_category">
          <Dropdown
            options={options}
            onChange={function (e) {
              setCategory(e.value);
              console.log("category: " + e.value);
            }}
            value={defaultOption}
            placeholder="Select an option" />
        </div>
      </div>

      <div className="wrapper">
        <div className="d_title">
          <input
            type="text" required
            value={title}
            placeholder="Diary Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="underline"></div>
        </div>
      </div>
      <hr className="line" />

      <div className="contents_wrapper">
        <div className="d_contents">
          <textarea
            type="text" required
            placeholder="Diary Contents"
            value={contents}
            onChange={(e) => setContents(e.target.value)}
          />
        </div>
        {(image === "" || image === null) ?
          <br></br>
          : <img className="image_preview" src={imgBase64} alt="diary-write-upload" />}
      </div>

      <div className="d_buttons">
        <div className="image_button" >
          <button type="button" onClick={handleClick}>
            <ImageIcon width="40px" height="40px" />
          </button>
          <input
            type="file"
            style={{ display: 'none' }}
            ref={hiddenFileInput}
            onChange={uploadImage} />
        </div>
        <div className="isPublic">
          <button
            className="public_button"
            type="button"
            onClick={(e) => setIsPublic(!isPublic)}>
            {isPublic ? <CheckedCircle width="20px" /> : <Circle width="20px" />}
          </button>
          {isPublic ? <div style={{ color: 'var(--primary-green)' }}>public</div> : <div style={{ color: '#959595'}}>public</div>}
        </div>
        <div className="space"></div>
        <button className="done" type="submit">Done
        </button>
      </div>

    </form>
  );
}

export default Diary;
