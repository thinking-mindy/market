use axum::response::Json;
use mongodb::{bson::Document, Client};
use futures::stream::TryStreamExt;
use serde_json::{json, Value};

fn con_str()->String{
    let rhost="your_database_url";
    rhost.to_string()
}

pub async fn add_to_db(c:&str,v:Document)->Json<serde_json::Value>{
    let client = Client::with_uri_str(con_str()).await.expect("err");
    println!("Adding to collection:{c}");
    let info = match client.database("market").collection(c).insert_one(v, None).await{Ok(_)=>true,Err(_)=>false};
    Json(serde_json::json!({"aye":info}))
}

pub async fn add_many_db(c:&str,v:Vec<Document>)->Json<serde_json::Value>{
    let client = Client::with_uri_str(con_str()).await.expect("err");
    println!("Adding to collection:{c}");
    let info = match client.database("market").collection(c).insert_many(v, None).await{Ok(_)=>true,Err(_)=>false};
    Json(serde_json::json!({"aye":info}))
}

pub async fn update_one_db(c:&str,v:Document,u:Document,)->Json<serde_json::Value>{
    let client = Client::with_uri_str(con_str()).await.expect("err");
    println!("Adding to collection:{c}");
    let info = match client.database("market").collection::<Value>(c).update_one(v,u,None).await{Ok(_)=>true,Err(_)=>false};
    Json(serde_json::json!({"aye":info}))
}

pub async fn get_all_db(c:&str)->Json<serde_json::Value>{
    let client = Client::with_uri_str(con_str()).await.expect("err");
    let mut info = client.database("market").collection::<Value>(c).find(None,None).await.expect("erro");
    let mut docs=Vec::new();
    while let Some(stat) = info.try_next().await.expect("err"){
        docs.push(stat);
    }
    Json(serde_json::json!({"data":docs}))
}

pub async fn get_all_specific(c:&str,v:Document)->Json<serde_json::Value>{
    let client = Client::with_uri_str(con_str()).await.expect("err");
    let mut info = client.database("market").collection::<Value>(c).find(v,None).await.expect("erro");
    let mut docs=Vec::new();
    while let Some(stat) = info.try_next().await.expect("err"){
        docs.push(stat);
    }
    Json(serde_json::json!({"data":docs}))
}

pub async fn get_one_specific(c:&str,v:Document)->Json<serde_json::Value>{
    let client = Client::with_uri_str(con_str()).await.expect("err");
    let info = client.database("market").collection::<Value>(c).find_one(v,None).await.expect("erro");
    let res=match info{
        Some(found)=>found,
        None=>json!({"data":false})
    };
    Json(serde_json::json!({"data":res}))
}

pub async fn get_one_db(c:&str,v:Document)->Json<serde_json::Value>{
    let client = Client::with_uri_str(con_str()).await.expect("err");
    let info= client.database("market").collection::<Value>(c).find_one(v,None).await.expect("erro");
    let res=match info{
        Some(found)=>found,
        None=>json!({"data":false})
    };
    Json(serde_json::json!({"data":res}))
}

pub async fn rm_one_db(c:&str,v:Document)->Json<serde_json::Value>{
    let client = Client::with_uri_str(con_str()).await.expect("err");
    let res=match client.database("market").collection::<Value>(c).delete_one(v,None).await{
        Ok(_)=>true,
        Err(_)=>false
    };
    Json(serde_json::json!({"aye":res}))
}