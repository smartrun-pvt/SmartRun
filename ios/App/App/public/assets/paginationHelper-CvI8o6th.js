function h(f,i){return i<=7?Array.from({length:i},(r,n)=>n+1):f<=4?[1,2,3,4,5,"...",i]:f>=i-3?[1,"...",i-4,i-3,i-2,i-1,i]:[1,"...",f-1,f,f+1,"...",i]}export{h as g};
