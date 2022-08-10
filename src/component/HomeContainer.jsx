import React from "react";
import Delivery from "../img/delivery.png";
import Hero from "../img/heroBg.png";
import {heroData} from "../utils/data";

const HomeContainer = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-screen">
      <div className="py-2 flex flex-col items-start justify-center gap-4">
        <div className="flex items-center gap-2 rounded-full justify-center bg-orange-100 px-4 py-2">
          <p className="text-base text-orange-500 font-semibold">
            Bike delivery
          </p>
          <div className="w-6 h-6 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <img
              className="w-full h-full object-contain rounded-full"
              src={Delivery}
              alt="Delivery Bike"
            />
          </div>
        </div>

        <p className="font-extrabold tracking-wide text-headingColor text-[2.5rem] lg:text-[4.5rem] mt-4">
          The Fastest Delivery in {"  "}
          <span className="text-orange-600 font-bold text-[3rem] lg:text-[5rem]">
            Your city
          </span>
        </p>

        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          dignissimos voluptas, iure optio quas facilis facere deserunt.
          Debitis, ipsum. Ratione, cupiditate. Temporibus expedita beatae maxime
          natus nemo, nobis et dolorem. Illum assumenda id consectetur. Autem,
          laboriosam perferendis doloribus rem minima ab cumque odio id sit
          eaque, dolores dignissimos maiores facere. Recusandae error, delectus
          totam quidem fugiat illum, perspiciatis alias adipisci in deleniti
          cumque omni.
        </p>

        <button
          className="bg-gradient-to-r from-orange-400 to-orange-500 w-full p-3 rounded-2xl text-textColor text-[1.1rem]
        hover:shadow-lg transition-all ease-in-out duration-100 md:w-auto"
        >
          Order now
        </button>
      </div>
      <div className="relative py-2 flex-1 flex items-center">
        <img
          className="ml-auto h-685 w-full lg:w-auto lg:h-650"
          src={Hero}
          alt="hero"
        />

        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-around lg:px-36 py-20
         flex-wrap ">
          {heroData &&
            heroData.map((data) => (
              <div
                key={data.id}
                className="lg:w-190 p-4 bg-cardOverlay backdrop:blur-md 
                drop-shadow-2xl rounded-3xl flex flex-col
                items-center justify-center"
              >
                <img src={data.imageSrc} className="w-20 lg:w-40 -mt-10 lg:-mt-20" alt="food1" />
                <p className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">
                  {data.name}
                </p>
                <p className="text-[12px] lg:text-sm text-gray-500 font-semibold my-1 lg:my-3">
                  {data.decp}
                </p>
                <p className="text-sm text-headingColor font-semibold">
                  <span className="text-sm text-red-500">$ </span>
                  {data.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomeContainer;
