import React, { useState } from "react";

function App() {
  const dataList = [
    {
      createdFor: "62429fd5f7db3912fea7a716",
      itemName: "a",
      totalQty: 100,
      createAt: "2022-04-05T08:05:41.653+00:00",
    },
    {
      createdFor: "62429fd5f7db3912fea7a716",
      itemName: "b",
      totalQty: 80,
      createAt: "2022-04-08T08:05:41.653+00:00",
    },
    {
      createdFor: "62429fd5f7db3912fea7a716",
      itemName: "b",
      totalQty: 70,
      createAt: "2022-04-07T08:05:41.653+00:00",
    },
    {
      createdFor: "62223a3f43e080995d5b46bc",
      itemName: "c",
      totalQty: 110,
      createAt: "2022-04-09T08:05:41.653+00:00",
    },
    {
      createdFor: "62223a3f43e080995d5b46bc",
      itemName: "c",
      totalQty: 30,
      createAt: "2022-04-06T08:05:41.653+00:00",
    },
    {
      createdFor: "62223a3f43e080995d5b46bc",
      itemName: "c",
      totalQty: 100,
      createAt: "2022-12-30T08:05:41.653+00:00",  // here this data excludes because out range of date
    },
  ];
}

i want to sort data base by date and createdfor adter that i want sum in group of createdFor and itemName

date =  [Tue Apr 05 2022 11:10:41 GMT-0400 (Eastern Daylight Time), Sat Apr 09 2022 11:10:41 GMT-0400 (Eastern Daylight Time)]


{
  result: [
    {
      createdFor: 62429fd5f7db3912fea7a716,
      stockInfo: [
        { itemName: "a", totalQty: 100 },
        { itemName: "b", totalQty: 150 },
      ],
    },
    {
      createdFor: 62223a3f43e080995d5b46bc,
      stockInfo: [
        { itemName: "c", totalQty: 140 },
      ],
    },
    
  ];
}
