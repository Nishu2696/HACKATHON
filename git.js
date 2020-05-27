let search = 0;


async function getrepos() {
    if (search === 0) {
        document.getElementById("search").disabled = true;
        search++;
    }
    let inp = document.getElementById("User").value;
    inp = inp.split(" ");
    let a, b;
    [a, b] = [inp[0], inp[1]];
    let headers = {
        "Authorization": `Token 74ccd1bd25d8aa5aaea28e5dd7603dd45bc3fb37`
    }
    console.log("a", a, "b", b);

    //sample git api response
    let url5 = "https://api.github.com/"
    let response5 = await fetch(url5);
    let result5 = await response5.json();
    console.log(result5);

    //sample response if username is given
    let url = `https://api.github.com/users/${a}/repos`
    let response = await fetch(url);
    let result = await response.json();
    //console.log(result);
    console.log(result["message"]);


    if (result["message"] !== "Not Found") {

        //getting the users
        let url2 = `https://api.github.com/users/${a}/repos`;
        let response1 = await fetch(url2, {
            "method": "GET",
            "headers": headers
        });
        let result1 = await response1.json();
        console.log(result1);

        //getting the followers
        let url3 = `https://api.github.com/users/${a}/followers`;
        let response2 = await fetch(url3, {
            "method": "GET",
            "headers": headers
        });
        let result2 = await response2.json();
        console.log("followers", result2.length);

        //getting the details of user follows
        let url4 = `https://api.github.com/users/${a}/following`;
        let response4 = await fetch(url4, {
            "method": "GET",
            "headers": headers
        });
        let result4 = await response4.json();
        console.log("following", result4);

        //console.log(result1["total_count"]);

        //showing total repositoriess of an user
        let total_count = document.getElementById("total");
        total_count.value = "" + result1.length + " repositories result";
        document.getElementById("totalrepo").appendChild(total_count);

        //showing the no of followers for a particuclar user
        let btn = document.createElement("button");
        btn.setAttribute("class", "btn btn-secondary dropdown-toggle");
        btn.setAttribute("type", "button");
        btn.setAttribute("id", "followers");
        btn.setAttribute("data-toggle", "dropdown");
        btn.setAttribute("aria-haspopup", "true");
        btn.setAttribute("aria-expanded", "false");
        btn.innerHTML = "No-of-followers:" + result2.length + "";
        document.getElementById("followedby").appendChild(btn);
        document.getElementById("followedby1").appendChild(document.getElementById("followedby"))
        document.getElementById("details").appendChild(document.getElementById("followedby1"));

        //showing the no of followers that a particuclar user follows
        let btn1 = document.createElement("button");
        btn1.setAttribute("class", "btn btn-secondary dropdown-toggle");
        btn1.setAttribute("type", "button");
        btn1.setAttribute("id", "followings");
        btn1.setAttribute("data-toggle", "dropdown");
        btn1.setAttribute("aria-haspopup", "true");
        btn1.setAttribute("aria-expanded", "false");
        btn1.innerHTML = "No-of-followers:" + result4.length + "";
        document.getElementById("follows").appendChild(btn1);
        document.getElementById("follows1").appendChild(document.getElementById("follows"))
        document.getElementById("details").appendChild(document.getElementById("follows"));

        //to get a particular repo of the user
        let search1 = document.createElement("input");
        search1.setAttribute("placeholder", "Find a Repositories");
        search1.setAttribute("style", "width: 300px; border:1px solid black; font-size: 20px; font: weight 10px;padding-left: 10px;padding-bottom: 10px;padding-top: 5px; color: black;");
        search1.setAttribute("type", "text");
        search1.setAttribute("class", "text-left");
        search1.setAttribute("id", "searchbar")
        document.getElementById("singlerepo").appendChild(search1);
        let inputElement = document.createElement('input');
        inputElement.type = "button";
        inputElement.setAttribute("class", "btn btn-primary");
        inputElement.value = "Search";
        /*let value1=document.getElementById("searchbar").value;
        console.log(value1,"value");*/
        inputElement.setAttribute("onclick", "searching()");
        /*inputElement.addEventListener('click', async function () {
            let url1 = `https://api.github.com/search/repositories?q=${search1.value}+in:file+user:${a}`;
            let response1 = await fetch(url1, {
                "method": "GET",
                "headers": headers
            });
            let result1 = await response1.json();
            console.log(result1);
            let div1 = document.createElement("div");
            div1.setAttribute("class", "pt-2");
            let link1 = document.createElement("a");
            console.log("url", result1["items"][0]["html_url"]);
            link1.setAttribute("href", "" + result1["items"]["" + 0 + ""]["html_url"] + "");
            link1.innerHTML = `${result1["items"]["" + 0 + ""]["full_name"]}`;
            div1.appendChild(link1);
            document.getElementById("repo").appendChild(div1);
        });*/
        document.getElementById("singlerepo").appendChild(inputElement);

        //to get all the repo of the user
        let total = result1.length;
        console.log(total);
        let total_pages = parseInt(total / 10);
        console.log(total_pages);

        for (let i = 1; i <= (total_pages + 1); i++) {
            let inputElement = document.createElement('input');
            inputElement.type = "button";
            inputElement.setAttribute("class", "btn btn-primary");
            inputElement.value = "" + i + "";
            inputElement.setAttribute("onclick", "pagination(" + i + ", "+total_pages+")");
            /*inputElement.addEventListener('click', function () {
                let div2 = document.createElement("div");
                div2.setAttribute("class", "row mb-3");
                div2.setAttribute("id", "repositories");
                document.getElementById("repo").appendChild(div2);
                if (i != 1) {
                    i = (i - 1) * 10;
                    i++;
                }
                let count = 10;
                if (i == total_pages) {
                    let count = parseInt(total % 10);
                }
                for (let j = 0, k = i - 1; j < count; k++, count--) {
                    count1++;
                    let div1 = document.createElement("div");
                    div1.setAttribute("class", "col-lg-12 pt-2");
                    let link1 = document.createElement("a");
                    console.log("url", result1[k]["html_url"]);
                    link1.setAttribute("href", "" + result1["" + k + ""]["html_url"] + "");
                    link1.innerHTML = `${result1["" + k + ""]["full_name"]}`;
                    div1.appendChild(link1);
                    document.getElementById("repositories").appendChild(div1);
                }
            });*/
            document.getElementById("totalrepo1").appendChild(inputElement);
        }
    }
    else {
        let url1 = "https://api.github.com/search/repositories?q=" + a + "+in:file";
        let response1 = await fetch(url1, {
            "method": "GET",
            "headers": headers
        });
        let result1 = await response1.json();
        console.log(result1);
        console.log(result1["total_count"]);

        let total_count = document.getElementById("total");
        total_count.value = "" + result1["total_count"] + " repositories result";
        document.getElementById("totalrepo").appendChild(total_count);
        let total = Object.keys(result1["items"]).length;
        let total_pages = total / 10;
        for (let i = 1; i <= total_pages; i++) {
            let inputElement = document.createElement('input');
            inputElement.type = "button";
            inputElement.setAttribute("class", "btn btn-primary");
            inputElement.value = "" + i + "";
            inputElement.setAttribute("onclick", "repositories( " + i + ", "+total_pages+")");
            /*inputElement.addEventListener('click', function () {
                if (i != 1) {
                    i = (i - 1) * 10;
                    i++;
                }
                let count = 10;
                for (let j = 0, k = i - 1; j < count; k++, count--) {
                    count1++;
                    let div1 = document.createElement("div");
                    div1.setAttribute("class", "pt-2");
                    let link1 = document.createElement("a");
                    console.log("url", result1["items"][k]["html_url"]);
                    link1.setAttribute("href", "" + result1["items"]["" + k + ""]["html_url"] + "");
                    link1.innerHTML = `${result1["items"]["" + k + ""]["full_name"]}`;
                    div1.appendChild(link1);
                    document.getElementById("repo").appendChild(div1);
                }
            });
            document.getElementById("repositories").appendChild(inputElement);
            if (count1 === 1) {
                inputElement.disabled = true;
            }*/
        }

    }
}


async function searching() {
    let inp = document.getElementById("User").value;
    inp = inp.split(" ");
    let name, b;
    [name, b] = [inp[0], inp[1]];
    let value=document.getElementById("searchbar").value;
    let div2 = document.createElement("div");
    div2.setAttribute("class", "row mb-3");
    div2.setAttribute("id", "repositories");
    document.getElementById("repo").appendChild(div2);
    let headers = {
        "Authorization": `Token 74ccd1bd25d8aa5aaea28e5dd7603dd45bc3fb37`
    }
    let url1 = `https://api.github.com/search/repositories?q=${value}+in:file+user:${name}`;
    let response1 = await fetch(url1, {
        "method": "GET",
        "headers": headers
    });
    let result1 = await response1.json();
    console.log(result1);
    let div1 = document.createElement("div");
    div1.setAttribute("class", "pt-2");
    div1.innerHTML="";
    let link1 = document.createElement("a");
    console.log("url", result1["items"][0]["html_url"]);
    link1.setAttribute("href", "" + result1["items"]["" + 0 + ""]["html_url"] + "");
    link1.innerHTML = `${result1["items"]["" + 0 + ""]["full_name"]}`;
    div1.appendChild(link1);
    document.getElementById("repositories").appendChild(div1);
}

async function pagination(number, pages) {
    let inp = document.getElementById("User").value;
    inp = inp.split(" ");
    let name, b;
    [name, b] = [inp[0], inp[1]];
    let i=number;
    console.log("i", i);
    let total_pages=pages;
    console.log("total_pages", total_pages);
    //getting the users
    let url2 = `https://api.github.com/users/${name}/repos`;
    let headers = {
        "Authorization": `Token 74ccd1bd25d8aa5aaea28e5dd7603dd45bc3fb37`
    }
    let response2 = await fetch(url2, {
        "method": "GET",
        "headers": headers
    });
    let result2 = await response2.json();
    console.log("result2", result2);
    
    let div2 = document.createElement("div");
    div2.setAttribute("class", "row mb-3");
    div2.setAttribute("id", "repositories");
    div2.innerHTML="";
    document.getElementById("repo").appendChild(div2);
    if (i != 1) {
        i = (i - 1) * 10;
        i++;
    }
    let count = 10;
    if (i == total_pages) {
        let count = parseInt(total % 10);
    }
    for (let j = 0, k = i - 1; j < count; k++, count--) {
        console.log("k", k);
        let link=result2[""+k+""]["html_url"];
        console.log(link);
        let div1 = document.createElement("div");
        div1.setAttribute("class", "col-lg-12 pt-2");
        div2.innerHTML="";
        let link1 = document.createElement("a");
        //console.log("url", result2.k.html_url);
        link1.setAttribute("href", link);
        link1.innerHTML = `${result2["" + k + ""]["full_name"]}`;
        div1.appendChild(link1);
        document.getElementById("repositories").appendChild(div1);
    }
    
}

async function repositories(number, pages){
    let inp = document.getElementById("User").value;
    inp = inp.split(" ");
    let name, b;
    [name, b] = [inp[0], inp[1]];
    let i=number;
    let total_pages=pages;
    let url3 = `https://api.github.com/search/repositories?q=${name}+in:file`;
    let headers = {
        "Authorization": `Token 74ccd1bd25d8aa5aaea28e5dd7603dd45bc3fb37`
    }
    let response2 = await fetch(url3, {
        "method": "GET",
        "headers": headers
    });
    let result2 = await response2.json();
    console.log(result2);
    let div2 = document.createElement("div");
    div2.setAttribute("class", "row mb-3");
    div2.setAttribute("id", "repositories");
    div2.innerHTML="";
    document.getElementById("repo").appendChild(div2);
    if (i != 1) {
        i = (i - 1) * 10;
        i++;
    }
    let count = 10;
    if (i == total_pages) {
        let count = parseInt(total % 10);
    }
    for (let j = 0, k = i - 1; j < count; k++, count--) {
        count1++;
        let div1 = document.createElement("div");
        div1.setAttribute("class", "col-lg-12 pt-2");
        let link1 = document.createElement("a");
        console.log("url", result1[k][html_url]);
        link1.setAttribute("href", "" + result1[""+k+""][""+html_url+""] + "");
        link1.innerHTML = `${result1["" + k + ""]["full_name"]}`;
        div1.appendChild(link1);
        document.getElementById("repositories").appendChild(div1);
    }
}
