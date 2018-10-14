export const arrayAverage = (arr) =>{
  let arr_length = arr.length
  let sum = 0;
  arr.map((data) => sum+=data)
  return sum/arr_length
}
