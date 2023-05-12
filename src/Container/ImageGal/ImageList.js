import React, { useLayoutEffect,useEffect,  useState } from 'react'
import Header from './Components/Header'
import List from './Components/List'
import { debounce, mangeLocalSearchQuery } from '../../utils/common';
import "./style.css";


const API_KEY="fd3d1e3633cbe0b2c34dba2853642bd"; 
const API_KEY_SEARCH="fd3d1e3633cbe0b2c34dba2853642bd8";
 
const ImageList = () => {
  const [data, setData]=useState({loading:false, data:[],error:null });
  const [searchquery, setSearch] = useState();
  const [total, setTotal] = useState();
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 20,
  })

  // handle search query change and click on suggestion; 
  const changeHandler = debounce((e)=>{
    setSearch(e?.target?.value||e);
    setData({loading:false,data:[],error:null });
    setPagination({page: 1,perPage:20});
  },1000)

  /// srcoll handler update page count when reaching the bottom of the page
  const handleScroll = () => {
    const isScrolledToBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight;

    if (isScrolledToBottom) {
      setPagination((prevPage) =>{
        return {...prevPage, page:prevPage.page+1}
      } );
    }
  };

  /// fetch data based on search or recent flicker
  const getData = async ()=>{
    const apiUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${API_KEY}8&per_page=${pagination.perPage}&page=${pagination.page}&format=json&nojsoncallback=1`
    const apiSearch = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY_SEARCH}&text=${searchquery}&per_page=${pagination.perPage}&page=${pagination.page}&format=json&nojsoncallback=1`
    setData(prev=>({...prev,loading:true}));
    // set new search query to local storage; 
    if(searchquery)mangeLocalSearchQuery(searchquery);
   try{
    const res = await fetch(searchquery?apiSearch:apiUrl).then(re=>re.json());
    setData(prev=>({...prev, data: [...prev.data, ...res?.photos?.photo]}));
    setTotal(res?.photos?.pages);
   }catch(err){
    setData(prev=>({...prev,error:err}));
   }finally{
    setData(prev=>({...prev, loading: false}));
   }
  }

  

  // Attach scroll event listener when the component mounts
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // fetch data on page load
  useLayoutEffect(()=>{
    if(!data.loading)getData();
  },[pagination])


  const render = ()=>{
    if(data?.data?.length===0) return <div>please wait....</div>
  if(data.error) return <div>error occured</div>
  return <List data={data.data}/>
  }
  return (
    <div >
       <Header searchquery={searchquery} changeHandler={changeHandler}/>
       {render()}
       {data?.loading && <div>loading.....</div>}
    </div>
  )
}

export default ImageList