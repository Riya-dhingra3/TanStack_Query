import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import {BrowserRouter, Link,Route,Routes} from "react-router-dom";
import PostTraditional from './Components/PostTraditional';
import PostsRQ from './Components/PostsRQ';
import PostDetailsRq from './Components/PostDetailsRq';
import PaginatedQueries from './Components/PaginatedQueries';
import InfiniteQueries from './Components/InfiniteQueries';

function App() {
  return (
    <BrowserRouter>
   <div>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/posts">Traditional Posts</Link>
        </li>
        <li>
          <Link to="/rq-posts">RQ Posts</Link>
        </li>
      </ul>
    </nav>

    <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route exact path="/posts" element={<PostTraditional />}></Route>
      <Route exact path="/rq-posts" element={<PostsRQ /> }></Route>
      <Route exact path="/rq-posts/:postId" element={<PostDetailsRq />} ></Route>
      <Route exact path="/paginated-fruits" element={<PaginatedQueries />} ></Route>
      <Route exact path="/infinite-fruits" element={<InfiniteQueries />} ></Route>
    </Routes>
   </div>
   </BrowserRouter>
  );
}

export default App;
