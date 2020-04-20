const express=require("express");
const redis=require("redis");

const app= express();
const client=redis.createClient({
    host:'redis-service',
    port:6379
});

client.set('visits',0);
app.get('/',(request,response)=>{
    client.get('visits',(err,visits)=>{
        response.send('Number of visit is '+visits);
        client.set('visits',parseInt(visits)+1);
    });
});

app.listen(8081,()=>{
    console.log('Listineing on port 8081');
});