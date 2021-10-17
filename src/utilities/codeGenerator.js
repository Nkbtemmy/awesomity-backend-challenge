import { User } from "../database/schema/employee";
export const codeGenerator = async()=>{
    let a = 1;
    do{
        let arr = [];
        for(let i=0;i<11;++i){
         let x = Math.floor(Math.random() * 11);
         if(!arr.includes(x)){arr.push(x)};
         if(arr.length == 4){break}
        }
        let txt = "EMP"+arr.join('');
        const codes = await User.find({code:txt})
        if(codes.length<1){
                a = 0;    
                return txt;
            }
    }while(a)   
}
