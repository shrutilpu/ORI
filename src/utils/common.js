// utility function for debouncing
export const debounce = (cb, delay)=>{
    let timer ;
    return function (e){
        clearTimeout(timer);
        timer= setTimeout(()=>cb(e), delay);
    }
    }

// get image url based on data
export const getImageUrl = (item)=>{
    return `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`
}

// get and update suggestions from localstorgae
export const mangeLocalSearchQuery = (newEntry=null)=>{
    // get data from local storgae and parse
    const temp = JSON.parse(localStorage.getItem("search")||"[]");
    if(newEntry){
        // if new query is added push it to cuurent array and update local storage
     temp.push(newEntry);
     localStorage.setItem("search",JSON.stringify(temp));
    }
    return temp; 
}