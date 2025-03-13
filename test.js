
console.log(1);

const fn = (a) => {
    console.log(a)
}

setTimeout(function(){
    fn(2)
}, 2000) 

function resolve(b){
console.log("resolve >>", b);
}

function reject(b){
    console.log("reject >>", b);
    }

const p = new Promise(function(res, rej){
    
    //res(12)
   

    // setTimeout(function(){
    //     rej('error')
    // }, 2000) 

}); 



p.then(resolve).catch(reject);


fn(3);

console.log(4);