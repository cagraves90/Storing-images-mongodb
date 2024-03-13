import { useEffect, useState } from "react";

function ImageUpload() {

    const [image, setImage] = useState('');
    const [allImage, setAllImage] = useState([{image: ''}]);

    const convertToBase64 = (e) => {
        console.log(e);
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log(reader.result); //base64 encoded string
            setImage(reader.result);
        };
        reader.onerror = (error) => {
            console.log('Error: ', error);
        }
    }

    const uploadImage = () => {
        fetch("http://localhost:4000/upload-image", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ base64: image}),
        }).then((res) => res.json()).then((data) => {
            console.log(data)
            });
    }

    const getImage = () => { 
        fetch("http://localhost:4000/get-image", {
            method: "GET",
            
        }).then((res) => res.json()).then((data) => {
        console.log(data) 
        setAllImage(data.data)
        });
    }

    useEffect(() => { 
        getImage();
    }, [])

  return (
    <div>
        Image Upload <br />
        <input type="file" accept="image/*" onChange={convertToBase64} />
        {image=='' || image==null ? "" :  <img width={100} height={100} src={image} alt="file-image" />}
        <button onClick={uploadImage}>Upload</button>

        <br/>
        <br/>

        {allImage.map((data) => {
            return (
                <img width={100} height={100} src={data.image} alt="file-image" />
            )
        })}
       
    </div>
  )
}
export default ImageUpload