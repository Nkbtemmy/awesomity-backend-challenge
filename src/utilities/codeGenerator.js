export const codeGenerator = ()=>{
    let arr = [];
    for(let i=0;i<11;++i){
     let x = Math.floor(Math.random() * 11);
     if(!arr.includes(x)){arr.push(x)};
     if(arr.length == 4){break}
    }
    let txt = "EMP"+arr.join('');
    return txt;
}