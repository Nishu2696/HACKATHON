//let btn=document.getElementById("user");
//btn.addEventListener("onclick", getrepos);


async function getrepos(){
    let inp=document.getElementById("User").value;
    console.log(inp);
    let name=document.getElementById("name").value;
    let headers = {
        "Authorization" : `Token 75754350b3ea47492b7afcb874ceb43fad7d823c`
    }
    let url="https://api.github.com/"
    let response=await fetch(url);
    let result=await response.json();
    console.log(result);
    console.log(result["user_url"]);
    let  url1=`https://api.github.com/search/repositories?q=${inp}+in:file+user:${name}`;
    let response1=await fetch(url1, {
        "method": "GET",
        "headers": headers
    });
    let result1=await response1.json();
    console.log(result1);
}