import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      lat: "",
      lng: "",
      name: "",
      catchPhrase: "",
      bs: "",
      phone: "",
      posts: [],
      temp_post: [],
      comments: [],
      temp_comment: [],
      albums: [],
      temp_album: [],
      temp_photo: [],
      photos: [],
      showResult: false
    };
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(
        //handle the result
        user_info => {
          this.setState({
            users: user_info
          });
        }
      );
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(post => {
        this.setState({
          posts: post
        });
      });
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then(response => response.json())
      .then(comment => {
        this.setState({
          comments: comment
        });
      });
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then(response => response.json())
      .then(album => {
        this.setState({
          albums: album
        });
      });
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then(response => response.json())
      .then(photo => {
        this.setState({
          photos: photo
        });
      });
  }

  displayUserInfo = userId => {
    this.setState({
      showResult: true
    });
    fetch("https://jsonplaceholder.typicode.com/users/" + userId)
      .then(response => response.json())
      .then(result => {
        this.setState({
          street: result.address.street,
          suite: result.address.suite,
          city: result.address.city,
          zipcode: result.address.zipcode,
          lat: result.address.geo.lat,
          lng: result.address.geo.lng,
          name: result.company.name,
          catchPhrase: result.company.catchPhrase,
          bs: result.company.bs,
          phone: result.phone
        });
      });
    this.displayPostInfo(userId);
    this.displayAlbum(userId);
  };

  displayPostInfo = userId => {
    this.setState({
      showResult: true
    });
    fetch("https://jsonplaceholder.typicode.com/posts/?userId=" + userId)
      .then(response => response.json())
      .then(res => {
        this.setState({
          temp_post: res
        });
      });
  };

  displayComments = postId => {
    this.setState({
      showResult: true
    });
    fetch("https://jsonplaceholder.typicode.com/comments/?postId=" + postId)
      .then(response => response.json())
      .then(comment => {
        // console.log(comment)
        this.setState({
          temp_comment: comment
        });
      });
  };

  displayAlbum = userId => {
    this.setState({
      showResult: true
    });
    fetch("https://jsonplaceholder.typicode.com/albums/?userId=" + userId)
      .then(response => response.json())
      .then(album => {
        // console.log(album)
        this.setState({
          temp_album: album
        });
      });
  };

  displayPhotos = albumId => {
    this.setState({
      showResult: true
    });
    fetch("https://jsonplaceholder.typicode.com/photos/?albumId=" + albumId)
      .then(response => response.json())
      .then(photo => {
        // console.log(photo)
        this.setState({
          temp_photo: photo
        });
      });
  };
  render() {
    return (
      <div>
        <h1>USER INFORMATION</h1>
        <table border="1">
          <thead>
            <tr>
              <td>SR.NO</td>
              <td>USER NAME</td>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <span onClick={() => this.displayUserInfo(user.id)}>
                    {user.name}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {this.state.showResult ? (
          <div className="personal">
            <h1>PERSONAL DETAILS</h1>
            <div>
              <b>ADDRESS</b>
              <br />
              <ul>
                <li>STREET :{this.state.street}</li>
                <li>SUITE :{this.state.suite}</li>
                <li>CITY :{this.state.city}</li>
                <li>ZIPCODE :{this.state.zipcode}</li>
                <li>
                  GEO :<br />
                  <ul>
                    <li>{this.state.lat}</li>
                    <li>{this.state.lng}</li>
                  </ul>
                </li>
              </ul>
            </div>
            <div>
              <b>COMPANY</b>
              <br />
              <ul>
                <li>NAME :{this.state.name}</li>
                <li>CATCHPHRASE:{this.state.catchPhrase}</li>
                <li>BS:{this.state.bs}</li>
              </ul>
              <b>PHONE: </b>
              {this.state.phone}
            </div>

            <div>
              <h1>POSTS</h1>
              <table border="1">
                <thead>
                  <tr>
                    <td>POST ID</td>
                    <td>TITLE</td>
                    <td>BODY</td>
                  </tr>
                </thead>
                <tbody>
                  {this.state.temp_post.map(post => (
                    <tr key={post.id}>
                      <td>
                        <span onClick={() => this.displayComments(post.id)}>
                          {post.id}
                        </span>
                      </td>
                      <td>{post.title}</td>
                      <td>{post.body}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h1>COMMENTS</h1>
              <table border="1">
                <thead>
                  <tr>
                    <td>COMMENT ID</td>
                    <td>NAME</td>
                    <td>EMAIL</td>
                    <td>BODY</td>
                  </tr>
                </thead>
                <tbody>
                  {this.state.temp_comment.map(comment => (
                    <tr key={comment.id}>
                      <td>{comment.id}</td>
                      <td>{comment.name}</td>
                      <td>{comment.email}</td>
                      <td>{comment.body}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h1>ALBUMS</h1>
              <table border="1">
                <thead>
                  <tr>
                    <td>ALBUM ID</td>
                    <td>TITLE</td>
                  </tr>
                </thead>
                <tbody>
                  {this.state.temp_album.map(album => (
                    <tr key={album.id}>
                      <td>
                        <span onClick={() => this.displayPhotos(album.id)}>
                          {album.id}
                        </span>
                      </td>
                      <td>{album.title}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h1>PHOTOS</h1>
              <table border="1">
                <thead>
                  <tr>
                    <td>TITLE</td>
                    <td>PHOTO</td>
                  </tr>
                </thead>
                <tbody>
                  {this.state.temp_photo.map(photo => (
                    <tr key={photo.id}>
                      <td>{photo.title}</td>
                      <td>
                        {" "}
                        <img src={photo.url} alt={photo.title}></img>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
