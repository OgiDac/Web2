import classes from "./helpers.module.css";

export const tableColumns = (key, item) => {
  switch (key) {
    case "image":
      return <img className={classes.image} alt="Profile pic" width={40} height={20} src={convertImage(item[key])} />;
    case "birthday":
      return dateToString(item[key]);
    default:
      return item[key];
  }
};

export const dateToString = (date) => {
  return new Date(date).toLocaleDateString("en-GB");
};

export const dateTimeToString = (date) => {
  return new Date(date).toLocaleString("en-GB");
};

export const convertImage = (img) => {
  return `data:image/jpg;base64,${img}`;
};
