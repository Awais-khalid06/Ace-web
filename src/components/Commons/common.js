export const RemoveItemFromArray = (array, item, callbackforSetState) => {
  let tempArray = Object.assign([], array);
  let index = tempArray.indexOf(item);
  if (index > -1) {
    tempArray.splice(index, 1);
  }
  callbackforSetState(tempArray);
};
export const AddItemtoArray = (array, item, callbackforSetState) => {
  let facility = item.trim();
  let tempArray = Object.assign([], array);
  let length = array.length;
  let index = array.indexOf(facility);
  // console.log("index-->  ", index)
  length < 1
    ? tempArray.push(facility)
    : index == -1
    ? tempArray.push(facility)
    : // FlashMessage("Already added!")
      console.log("Already added!");
  callbackforSetState(tempArray);
};
