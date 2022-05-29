

document.querySelector("#show").addEventListener("click",Myfun)


function Myfun()
{
    let arr;
    var selected=document.querySelector("#movie").value;
    console.log(selected);

     let url=`https://www.omdbapi.com/?s=${selected}&apikey=fc8dd57d`

    getData()
    
    async function getData()
    {
        try{

            let response=await fetch(url);
            
            let data=await response.json();

            if(data.Search==undefined)
            {
                document.querySelector("#container").innerHTML=null;
                var container=document.querySelector("#error");
                var img=document.createElement("img");
                img.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAeFBMVEUAAAD////o6OiIiIiurq6Ojo5+fn7u7u6CgoL7+/vT09Pr6+vz8/PJycnm5uaMjIwhISFQUFB3d3dtbW2WlpahoaHd3d02NjbFxcVvb29CQkJZWVnW1tYQEBBiYmIXFxctLS26uro+Pj4mJia1tbVVVVUyMjJMTEwHsPAiAAAELElEQVR4nO3ZaXPaMBCAYQtzGGxucxiXq2ng///DSiaxdkVIKUMHT+d9PgGKXHu1klZuFAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADxuslodXn0P95v3WlLmW9bpx29pu9B9up990sFif33J6SI1VrbsBA0b0W/19Cd5XGI03zKSP6vHGcuWQRiFo2icqZZS9vux+VeP9NdmxqQ9r+9blpeWLKtuuS36xHaQqz/uV00/1QWX7qflcLisYvhLNp3tD5d/5Yt+L2SfJ/66ZfSZFNvdQA+p7TO+fJq2XSbIXi4E7W31ceWikIi2XR3Kfe4myzPu/xmKIM+9H2Ji2FtOfUssIuLGtlRNxif5Wk2uaCPTKYjPK3VuxiANFodd/cU+aF5/sZPp6P/OZvlcXGNozMJ/m8sYTFVYX2p+MwYDGYNcjlqsZoYxLdmyltfYqkT4qZaVXmMmw/i+PJjJAY1Vn54Z1Z/t/NH76FrmxU7FwK4ck8fu+dlmd60HVzEQeSBjkBmxsTiFnCmbhsYgvhmDkYzBwpiu7DOuv9h0r2MwsbticBVbCNSfdR5kjZkLs5t741LGoGWMr+xiuTiMRYaUcrG8kAvCVMbALkTDB+/52br2VuJ4MR7HeR53ZM0nY9AWg61jYMfWnD+/dK5jMBSz413E4NAPq8jX0bWynKBuLpz2h8lqmrhS0W+N1fzZTw7707Swm5+Y8Au1FVZkDEpXPr1NTtvp2fVrytbo5sKNGNg86H99YIhVH5EguQpVZShq4vNHj8tls4asiJcdfdz5kG9FS0s8Z68I+tT68kSQfz8XdjJ0x7fnP8yDCrnGK3ZvHFhLczW4NgY915SF+fyHuWD3xvTLfi/251rZrod9PWbxR+FThOHZXedBX8Tgs1be9lV9/XJ31MqtcNjqmmIeBOEUHCIjtzf69aKulYsGHZii72rlVr03prLQieSZKTgY7tUK6ZRyxH2N5II3j5rinlrZ7utqnotzo132M1FU2P30oC6Sy55nXx+44G2jhkjuqZVtgSdXThGDfabS/2pjGMn6shQ10rFBm2P3ZgxknWgXfOOHOxaD69Y3/9gn9XdV9vuDta6Vs+CY/UL3xcAtkOq84BM8UfNkoJaOjZ72slaODs05LyQ36wN1bhzKia7eI+1UDOyT+Udz75HlOVLOBXfGbEoeuFdh3UU3T3JbLca5OEMugxj418CxPEgXer2sau92WU7KsVv3zEG0nWUM3pqTB7r2D47L/stQniXUO4cyqA3VASRT7893QQyaUifNbsYgXA/86+KOPPZ2w/r4cKwv1lYNbnnwp4u3oOh4ofekK4nqTX3ZJT77o02S+Nfp2ySZhhdNFoPhOr/6jyTb7/3bfgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/Ld+A+aOKQJHJiVAAAAAAElFTkSuQmCC";

                container.append(img);
                return;
            }

            else{

                console.log(data)

                arr=data.Search;
                
                display(arr)
            }
            
        }
      
        catch(err)
        {
            console.log(err)
        }
        

    }

function display(arr)
{

    document.querySelector("#container").innerHTML=null;
    document.querySelector("#error").innerHTML=null;
        arr.forEach(async function(elem)
        {
            let div=document.createElement("div");

            let image=document.createElement("img");
            image.src=elem.Poster;

            let h2=document.createElement("h2")
            h2.innerText=elem.Title;

            let sub=document.createElement("div");


            let p2=document.createElement("p");
            p2.innerText=elem.Year;

           
            let id=elem.imdbID;
            var val=await Imdb(id);
            
            let reco;

            if(Number(val.imdbRating)>8.5)
            {
                 reco=document.createElement("div");
                 reco.setAttribute("id","flow")

                 let p4=document.createElement("p");
                 p4.innerText="Recommended";

                 reco.append(p4)

                 div.append(reco); 
            }
                 
            
            var p3=document.createElement("p");
            p3=`IMDb :${val.imdbRating}`;

            sub.append(p2,p3)

            div.append(image,h2,sub);

            document.querySelector("#container").append(div)
        })
}

}

async function Imdb(id)
{
    let urlId=`https://www.omdbapi.com/?i=${id}&apikey=fc8dd57d`;

    try
    {
        let res=await fetch(urlId);
       
        let data=await res.json();
        
        return data;
    }

    catch(err)
    {
        console.log(err)
    }
} 
    
   
