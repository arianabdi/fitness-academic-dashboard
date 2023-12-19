import User from "../../../images/avatar/b-sm.jpg";
import User2 from "../../../images/avatar/c-sm.jpg";
import User3 from "../../../images/avatar/d-sm.jpg";
import User4 from "../../../images/avatar/a-sm.jpg";

export const chatUserData = [
  {
    id: 1,
    user: "Illiash Hossain",
    active: true,
    theme: "primary",
  },
  {
    id: 2,
    user: "Abu Bin Ishtiak",
    active: true,
    theme: "blue",
  },
  {
    id: 3,
    user: "George Phillips",
    active: true,
    image: User,
    theme: "pink",
  },
  {
    id: 4,
    name: "Larry Hughes",
    image: User2,
    active: true,
    theme: "purple",
  },
  {
    id: 5,
    name: "Tammy Wilson",
    theme: "purple",
    active: true,
  },
  {
    id: 6,
    name: "Softnio Group",
    group: true,
    theme: "purple",
    active: false,
  },
  {
    id: 7,
    user: "Emile Clarke",
    active: true,
    image: User4,
  },
  {
    id: 8,
    user: "Shakel Krosser",
    theme: "info",
    active: true,
  },
  {
    id: 9,
    user: "Kumar Kamal",
    theme: "info",
    active: true,
  },
];


const sortedDataFunc = (array) => {
  chatData.sort(function (a, b) {
    return a.name === b.name ? 0 : a.name < b.name ? -1 : 1;
  });
  return chatData.filter((item) => array.includes(item.name.split("")[0].toUpperCase()) && !item.group);
};

const sortedDataNotFavFunc = (array) => {
  chatData.sort(function (a, b) {
    return a.name === b.name ? 0 : a.name < b.name ? -1 : 1;
  });
  return chatData.filter((item) => array.includes(item.name.split("")[0].toUpperCase()) && item.fav === false);
};

export const contacts = [
  {
    id: 1,
    title: "A",
    contacts: sortedDataFunc(["A"]),
  },
  {
    id: 2,
    title: "B",
    contacts: sortedDataFunc(["B"]),
  },
  {
    id: 3,
    title: "C",
    contacts: sortedDataFunc(["C"]),
  },
  {
    id: 3,
    title: "D",
    contacts: sortedDataFunc(["D"]),
  },
  {
    id: 4,
    title: "E-k",
    contacts: sortedDataFunc(["E", "F", "G", "H", "I", "J", "K"]),
  },
  {
    id: 5,
    title: "L-T",
    contacts: sortedDataFunc(["L", "M", "N", "O", "P", "Q", "R", "S", "T"]),
  },
  {
    id: 6,
    title: "U-Z",
    contacts: sortedDataFunc(["U", "V", "W", "X", "Y", "Z"]),
  },
];

export const addUserData = [
  {
    id: 50,
    role: "User",
    name: "Alissa Kate",
    theme: "purple",
  },
  {
    id: 51,
    role: "User",
    name: "Jasper Jordan",
    theme: "orange",
  },
  {
    id: 52,
    role: "User",
    name: "Winter Rays",
    theme: "pink",
  },
];

export const nonFavContacts = [
  {
    id: 1,
    title: "A",
    contacts: sortedDataNotFavFunc(["A"]),
  },
  {
    id: 2,
    title: "B",
    contacts: sortedDataNotFavFunc(["B"]),
  },
  {
    id: 3,
    title: "C",
    contacts: sortedDataNotFavFunc(["C"]),
  },
  {
    id: 3,
    title: "D",
    contacts: sortedDataNotFavFunc(["D"]),
  },
  {
    id: 4,
    title: "E-k",
    contacts: sortedDataNotFavFunc(["E", "F", "G", "H", "I", "J", "K"]),
  },
  {
    id: 5,
    title: "L-T",
    contacts: sortedDataNotFavFunc(["L", "M", "N", "O", "P", "Q", "R", "S", "T"]),
  },
  {
    id: 6,
    title: "U-Z",
    contacts: sortedDataNotFavFunc(["U", "V", "W", "X", "Y", "Z"]),
  },
];
