import { useEffect, useState } from "react";

function ImageUpload() {

    const [image, setImage] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [allImage, setAllImage] = useState([{image: '', model: '', year: ''}]);

    const convertToBase64 = (e) => {
        console.log(e);
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log(reader.result); //base64 encoded string to send to MongoDB 
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
            body: JSON.stringify({ base64: image, model: model, year: year } )
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
        <h2>Image Upload </h2><br />
        <input type="file" accept="image/*" onChange={convertToBase64} />
        {image=='' || image==null ? "" :  <img width={150} height={150} src={image} alt="file-image" />}
       
        <input type="text" placeholder="Car Model" value={model} onChange={(e) => setModel(e.target.value)}/>
      <input type="number" placeholder="Car Year" value={year} onChange={(e) => setYear(e.target.value)}/>
        
        <button onClick={uploadImage}>Upload</button>

        <br/>
        <br/>

        <h2>Cars Currently In the Database:</h2>
        {allImage.map((data) => {
            return (
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <img width={150} height={150} src={data.image} alt="file-image" />
                <p style={{margin: "10px"}}>Model: {data.model}</p>
                <p>Year: {data.year}</p>
                </div>
            )
        })}
       
    </div>
  )
}
export default ImageUpload