"use client"

import { app } from "@/utils/firebase";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";
import { useEffect, useState } from "react";
 
export function useFileUploader( ) {
    const [uploadPercent, setUploadPercent] = useState(0);
    const [fileURL, setFileURL] = useState("");
    const [file, setFile] = useState("");


    const UploadFileToFirebase = (file) => {
        console.log("upload img file func invoked: ", file)
        const storage = getStorage(app);
        const storageRef = ref(storage, new Date().getTime() + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
     
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              
            console.log('Upload is ' + progress + '% done');
            setUploadPercent(()=>progress+"%")
            
            switch (snapshot.state) {
              case "paused":
                console.log('Upload is paused');
                // setUploadPercent(()=>"paused")

                break;
              case "running":
                console.log('Upload is running');
                // setUploadPercent(()=>"running")

                break;
            }
          },
          (error) => {
            alert(error);
           },
           () => {
             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              setFileURL((prev) => (downloadURL))
              // fileType === "video"
              //   ? setVideoData((prev) => ({ ...prev, videoURL: downloadURL }))
              //   : setVideoData((prev) => ({ ...prev, imgURL: downloadURL }));
            });
          }
        );
      };

      useEffect(()=>{
        if(file?.type)
            UploadFileToFirebase(file)
      }, [file])

  
    
    return {uploadPercent, fileURL, setFile, file}
}
