
const makeCopy = obj => JSON.parse(JSON.stringify(obj))

const DotInArray = (item, arr) => {
    for (var i = 0; i < arr.length; i++){
        if (arr[i][0] == item[0] && arr[i][1] == item[1])
        {
            return true;
        }
    }
    return false;
}

const AllDotIn = (arr, arr2) => {
    var result = arr.filter((i)=>{
        if (DotInArray(i, arr2))
        {
            return true;
        }
        else return false;
    }).length ;
    return result== arr.length;;
}


module.exports.makeCopy = makeCopy;
module.exports.DotInArray = DotInArray;
module.exports.AllDotIn = AllDotIn;

