export const debounce = (cb, delay)=>{
    let timer ;
    return function (e){
        clearTimeout(timer);
        timer= setTimeout(()=>cb(e), delay);
    }
    }

export const getImageUrl = (item)=>{
    return `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`
}

export const mangeLocalSearchQuery = (newEntry=null)=>{
    
    const temp = JSON.parse(localStorage.getItem("search")||"[]");
    if(newEntry){
     temp.push(newEntry);
     localStorage.setItem("search",JSON.stringify(temp));
    }
    return temp; 
}