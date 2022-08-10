import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MdFastfood,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import { IoMdCloudUpload } from "react-icons/io";
import { categories } from "../utils/data";
import Loader from "./Loader";
import { storage } from "../firebase.config";
import "firebase/compat/storage";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { getAllFoodItem, saveItem } from "../utils/firebaseFunctions";
import { actionType } from "../context/reducer";
import { UseStateValue } from '../context/stateProvider';


const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageAsset, setImageAsset] = useState(null);
  const [{ foodItems }, dispatch] = UseStateValue();

  const fetchData = async () => {
    await getAllFoodItem().then((data) => {
      dispatch({
        type : actionType.SET_FOOD_ITEMS,
        foodItems : data,
      })
    });
  }

  const uploadImage = async (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    await uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
        setFields(true);
        setMsg("Error while uploading ! Try again");
        setAlertStatus("Danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log("File available at", downloadURL);
          setImageAsset(downloadURL);
          setIsLoading(false);
          setFields(true);
          setMsg("Image is uploaded successfully!");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };

  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(()=>{
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setMsg("Image deleted successfully");
      setAlertStatus("success");
      setTimeout(()=>{
        setFields(false);
      },4000);
    })
  };

  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!title || !calories || !imageAsset || !price || !category) {
        setFields(true);
        setMsg("Requires fields can't be empty");
        setImageAsset("");
        setIsLoading(false);
        setAlertStatus("Danger");
        setTimeout(() => {
          setFields(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          calories: calories,
          qty: 1,
          price: price,
        }
        saveItem(data);
        
        setImageAsset(null);
        setIsLoading(false);
        setFields(true);
        setMsg("Item create successfully");
        clearData();
        setAlertStatus("success");
        setTimeout(()=>{
          setFields(false);
        },4000);
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading ! Try again");
      setAlertStatus("Danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }
  };

  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setCalories("");
    setPrice("");
    setCategory("");
  }

  return (
    <div className="min-h-screen w-auto flex items-center justify-center">
      <div
        className="w-[90%] md:w-[70%] bg-gray-200 border-gray-300 rounded-lg p-4
       flex flex-col items-center justify-center gap-4"
      >
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "Danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}

        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give me a title..."
            className="w-full h-full text-lg bg-transparent 
            outline-none 
            border-none 
            placeholder:text-gray-500
            text-textColor"
          />
        </div>

        <div className="w-full">
          <select
            placeholder="Select Category"
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none w-full text-base border-b-2
           border-gray-200 p-2
            rounded-md cursor-pointer"
          >
            {!category && <option value="other" className="bg-white">
              Select Category
            </option>}
            {categories &&
              categories.map((category) => (
                <option
                  key={category.id}
                  value={category.urlParamName}
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                >
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        <div
          className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full
        h-225 md:h-420 cursor-pointer rounded-lg"
        >
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <IoMdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadImage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center relative">
                    <img
                      src={imageAsset}
                      alt="uploaded image"
                      className="max-w-[140px] md:max-w-[210px] object-cover"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full
                    bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 
                    transition-all ease-in-out
                    "
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center justify-center">
            <MdFoodBank className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              placeholder="Calories"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400"
            />
          </div>

          <div className="w-full py-2 border-b border-gray-300 flex items-center justify-center">
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="flex items-center w-full">
          <button
            className="ml-0 md:ml-auto w-full md:w-auto border-none
          outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg 
          text-white font-semibold"
            onClick={saveDetails}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
