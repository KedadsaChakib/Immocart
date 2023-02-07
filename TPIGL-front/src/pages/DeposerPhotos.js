import React, { useState, useEffect,useCallback ,useRef} from "react";
import {useDropzone} from 'react-dropzone';

import plus from "../images/plus.svg";
import trashBin from "../images/delete.svg";

function Dropzone({ onDrop, accept}) {
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
      useDropzone({
        accept,
        onDrop,
      });

    return (
        <div className="image-container">
            <div {...getRootProps({ className: "dropzone" })}>
                <input className="input-zone" {...getInputProps()} />
                <div className="text-center">
                    {isDragActive ? (
                    <p className="dropzone-content">
                        Relachez pour deposer les photos
                    </p>
                    ) : (
                        <>
                            <p>Faites glisser une ou plusieurs photos </p>
                            <p>ou cliquez ici</p>
                            <img src={plus} alt=""/>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

  // ImageList Component//

const ImageGrid = ({stateChanger,images }) => {
    // render each image by calling Image component
    // Return the list of files //
    const dragItem = useRef();
    const dragOverItem = useRef();
    const dragStart = (e, position) => {
        dragItem.current = position;
        console.log(e.target.innerHTML);
      };
     
      const dragEnter = (e, position) => {
        dragOverItem.current = position;
        console.log(e.target.innerHTML);
      };
     
      const drop = (e) => {
        const copyListItems = [...images];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        stateChanger(copyListItems);
      };
      const removeElement = (index) => {
        const newFruits = images.filter((_, i) => i !== index);
        stateChanger(newFruits);
      };
    return (
        <div className="file-list">{
        images.map((image ,index) => {
        return (
            <>
            <div className="image-view" 
            onDragStart={(e) => dragStart(e, index)}
            onDragEnter={(e) => dragEnter(e, index)}
            onDragEnd={drop}
            key={index}
            draggable>
                <img className="file-img" src={image.src} alt= "" />
                <div className="image-position">
                    Position {image.id = index+1}
                    <div className="image-position-delete" onClick={() => removeElement(index)}>
                    <img src={trashBin} alt=""/>
                    </div>
                </div>
            </div>
            </>
        )
    })}
        </div>
    );
};  


function DeposerPhotos() {
    const [inputs, setInputs] = useState({});
    const [images, setImages] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
        const reader = new FileReader();
        reader.onload = function (e) {
        setImages((prevState) => [
            ...prevState,
            {src: e.target.result },
            ]);
        };
        reader.readAsDataURL(file);
        return file;
    });
    }, []);

    const handleSubmit = (event) => {
    event.preventDefault();
    alert(inputs);
    }

    return (
    <>
    <div className="loading">
        <div className="rectangle"></div>
        <div className="circle1">
            <div className="numero1">1</div>
            <div className="circle-text1">Caracteristiques principales</div>
        </div>
        <div className="rectangle2"></div>
        <div className="circle1">
            <div className="numero1">2</div>
            <div className="circle-text3">Photos de mon annonce</div>
        </div>
    </div>
    <div className="large-container-image">
        <form className="form-image" onSubmit={handleSubmit}>
            <div className="image-container-section">
                <Dropzone onDrop={onDrop} accept={"image/*"} />
                {console.log(images)}
                <ImageGrid stateChanger={setImages} images={images} />
            </div>
        </form>
    </div>
    </>)
}

export default DeposerPhotos;