import  {useState, useEffect, useMemo, useCallback} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios"
function Fetch() {
  const  [posts, setPosts] = useState([]);
  const [search,setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [debounced, setDebounced]= useState("");
  const postPerPage = 5; 

// debounce function
  const debounce = (func, delay) =>{
    let timer;
    return(...args) => {
      clearTimeout(timer);
      timer = setTimeout(()=> func(...args), delay)
    };
  };
debounce;

  //debounce optimization
const searchHandle = useCallback((value) =>{
  setDebounced(value);
},[setDebounced])

// reseting to page 1 on search
const searchChange = (e)=>{
  setSearch(e.target.value);
  searchHandle(e.target.value);
  setCurrentPage(1)
}


//memorization
const filteredData = useMemo(()=>{
  return posts.filter((post)=>
    post.title.toLowerCase().includes(debounced.toLowerCase())
  );
}, [posts, debounced]);



  useEffect(()=> {
      axios.get("https://jsonPlaceholder.typicode.com/posts")
      .then(response => setPosts(response.data))
      .catch(error => console.error(error));
  },[]);
// filtering users onsearch
 



//PAGINATION LOGIC
const totalPages = Math.ceil(filteredData.length / postPerPage);
const indexOfLastPost = currentPage * postPerPage;
const indexOfFirstPost = indexOfLastPost - postPerPage;
const currentPost = filteredData.slice(indexOfFirstPost, indexOfLastPost);


return(
<>

<div className="container">
<h2>Users List</h2>
<input 
type="text"
placeholder="Search By Title......"
value={search}
onChange={searchChange}
 name="" 
 id="search-input"
 />



 <table>
  <thead>
  <tr>
    <td>ID</td>
    <td>USER-ID</td>
    <td>TITLE</td>
    <td>BODY</td>
  </tr>
  </thead>
  <tbody>
  {
    posts && posts.length > 0 ?
    currentPost.map(usr =>
    <tr key={usr}>
      <td>{usr.id}</td>
      <td>{usr.userId}</td>
      <td>{usr.title}</td>
      <td>{usr.body}</td>
    </tr>
    )
  : `loading......check connection \u26A0`
  }
  </tbody>
</table>  

<div className="pagination">
<button onClick={() => setCurrentPage((prev)=> Math.max(prev - 1, 1))}
  disabled={currentPage === 1} className="page-btn">
  Previous
</button>
<span className="page-info">
  Page {currentPage} of {totalPages}
</span>
<button onClick={()=> setCurrentPage((prev)=> Math.min(prev + 1, totalPages))}
disabled={currentPage === totalPages} className="page-btn">Next</button>
</div>
</div>
</>

);

};


export default Fetch;